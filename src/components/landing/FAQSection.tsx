import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How does ProductBoost AI generate descriptions?", a: "We use advanced AI models trained on high-converting e-commerce copy. Simply input your product details and our AI creates optimized descriptions, titles, bullet points, and ad copy." },
  { q: "Can I edit the generated content?", a: "Absolutely! All generated content is fully editable. Use it as-is or customize it to match your brand voice perfectly." },
  { q: "What languages are supported?", a: "We currently support English, Spanish, French, German, Portuguese, Italian, and more languages are being added regularly." },
  { q: "Is there a free plan?", a: "Yes! Our free plan includes 5 generations per month so you can try the tool before committing." },
  { q: "Can I use this for Amazon, Shopify, or other platforms?", a: "Yes, our generated content works for any e-commerce platform including Amazon, Shopify, WooCommerce, Etsy, and more." },
];

const FAQSection = () => (
  <section id="faq" className="bg-secondary/50 py-20">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-heading text-sm font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
