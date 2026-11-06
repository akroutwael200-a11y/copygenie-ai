import { createResponsesCall } from "../_shared/responses.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const LANGUAGE_NAMES: Record<string, string> = {
  english: "English",
  spanish: "Spanish",
  french: "French",
  german: "German",
  portuguese: "Portuguese",
};

// The exact JSON shape the model must return. Embedded in the system prompt and
// enforced again by validateOutput on the parsed result.
const OUTPUT_CONTRACT = `Respond with ONLY a single JSON object (no markdown, no code fences, no commentary) with exactly these keys:
{
  "seoTitle": "One professional, attractive, SEO-friendly product title optimized for e-commerce conversion. Natural and readable, under 70 characters.",
  "shortDescription": "A concise, persuasive product description (2-3 sentences) highlighting the most important benefits, explaining the product's value, and encouraging purchase. No generic marketing phrases.",
  "longDescription": "A professional e-commerce description (150-250 words) with an engaging introduction, product features, customer benefits, practical use cases, a persuasive conclusion and a natural call to action. Paragraphs separated by blank lines.",
  "bulletPoints": ["Exactly 5 clear, persuasive bullet points highlighting key features, practical benefits, product advantages, and reasons to choose the product."],
  "seoKeywords": ["8-10 relevant search keywords or short phrases real shoppers would type. Natural, no keyword stuffing."],
  "adCopy": ["Exactly 3 advertising texts, each prefixed with its platform label: 'Facebook Ad: ...', 'Instagram Ad: ...', 'TikTok Ad: ...'. Each adapted to the platform's style with an attention-grabbing hook, persuasive copy, and an appropriate call to action."]
}`;

const SYSTEM_PROMPT = `You are an elite e-commerce copywriter and SEO specialist. You generate high-converting, product-specific sales copy.

STRICT RULES:
1. Use ONLY the product information provided by the user. Never invent specifications, materials, certifications, ingredients, dimensions, warranties, or benefits the user did not provide or that cannot be reasonably inferred from the given information.
2. If information is missing, write around it — never fill gaps with fabricated claims.
3. Every sentence must be specific to THIS product. No generic filler like "best quality product on the market" or "you won't be disappointed".
4. Respect the requested tone exactly (professional, casual, luxury, playful, or technical) and write for the stated target audience.
5. Write the ENTIRE output fluently and naturally in the requested language, including titles, descriptions, bullets, keywords, and ad copy.
6. When a price is given, you may reference it as a value point, but never discount it or invent promotions.
7. Grammar must be perfect; copy must be ready to publish in an online store with zero editing.
8. Avoid repetitive sentence structures and artificial-sounding marketing language.
9. For SEO: place keywords naturally; never stuff them.
10. For ads: adapt style per platform — Facebook (conversational, benefit-led), Instagram (visual, aspirational, hashtag-friendly), TikTok (bold, trend-aware, punchy hook).

OUTPUT FORMAT:
${OUTPUT_CONTRACT}`;

function buildPrompt(input: {
  productName: string;
  category?: string;
  features?: string;
  targetAudience?: string;
  price?: string;
  tone?: string;
  language?: string;
}) {
  const lines = [
    `Product name: ${input.productName}`,
    input.category ? `Category: ${input.category}` : null,
    input.features ? `Key features (provided by the seller): ${input.features}` : null,
    input.targetAudience ? `Target audience: ${input.targetAudience}` : null,
    input.price ? `Price: $${input.price}` : null,
    `Writing tone: ${input.tone || "professional"}`,
    `Output language: ${LANGUAGE_NAMES[input.language || "english"] || "English"}`,
  ].filter(Boolean);

  return lines.join("\n");
}

interface GeneratedCopy {
  seoTitle: string;
  shortDescription: string;
  longDescription: string;
  bulletPoints: string[];
  seoKeywords: string[];
  adCopy: string[];
}

function validateOutput(data: unknown): GeneratedCopy {
  const d = data as Record<string, unknown>;
  const asStringArray = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

  const output: GeneratedCopy = {
    seoTitle: typeof d.seoTitle === "string" ? d.seoTitle : "",
    shortDescription: typeof d.shortDescription === "string" ? d.shortDescription : "",
    longDescription: typeof d.longDescription === "string" ? d.longDescription : "",
    bulletPoints: asStringArray(d.bulletPoints),
    seoKeywords: asStringArray(d.seoKeywords),
    adCopy: asStringArray(d.adCopy),
  };

  if (!output.seoTitle || !output.shortDescription || output.bulletPoints.length === 0) {
    throw new Error("AI returned an incomplete result.");
  }
  return output;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI service is not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const productName = typeof body.productName === "string" ? body.productName.trim() : "";
    if (!productName) {
      return new Response(
        JSON.stringify({ error: "Product name is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { result } = createResponsesCall(
      req,
      { baseURL: GATEWAY_URL, apiKey, model: MODEL },
      [{ role: "user", content: buildPrompt(body) }],
      SYSTEM_PROMPT,
    );

    // One-shot feature: the gateway leg streams; we consume the final text
    // server-side, parse the JSON object and return it.
    const text = await result.text;
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("generate-copy: unparseable model output:", text.slice(0, 500));
      throw new Error("AI returned an invalid result.");
    }

    const output = validateOutput(parsed);

    return new Response(JSON.stringify(output), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-copy error:", error);
    const message = error instanceof Error && error.message ? error.message : "";
    const status = /402|insufficient|credits/i.test(message)
      ? 402
      : /429|rate.?limit/i.test(message)
        ? 429
        : 500;
    const clientMessage =
      status === 402
        ? "AI credits exhausted. Please top up to continue."
        : status === 429
          ? "Too many requests. Please wait a moment and try again."
          : "Generation failed. Please try again.";
    return new Response(JSON.stringify({ error: clientMessage }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
