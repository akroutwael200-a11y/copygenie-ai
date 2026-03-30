import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Zap, Copy, LogOut, History, Settings, Loader2 } from "lucide-react";

interface GeneratedContent {
  seoTitle: string;
  shortDescription: string;
  longDescription: string;
  bulletPoints: string[];
  seoKeywords: string[];
  adCopy: string[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("pb_user") || "null");

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [price, setPrice] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleGenerate = () => {
    if (!productName.trim()) {
      toast({ title: "Please enter a product name", variant: "destructive" });
      return;
    }

    setLoading(true);

    // Mock generation — replace with Lovable Cloud + AI when connected
    setTimeout(() => {
      const generated: GeneratedContent = {
        seoTitle: `${productName} - Premium ${category || "Product"} | Best ${tone === "luxury" ? "Luxury" : "Quality"} ${category || "Item"} for ${targetAudience || "Everyone"}`,
        shortDescription: `Discover the ${productName}, a ${tone} ${category || "product"} designed for ${targetAudience || "modern consumers"}. ${features ? `Featuring ${features.split(",")[0]?.trim()}.` : ""} ${price ? `Available at $${price}.` : ""}`,
        longDescription: `Introducing the ${productName} — your ultimate ${category || "product"} solution. Crafted with precision and designed for ${targetAudience || "discerning customers"}, this ${tone} product delivers exceptional value.\n\n${features ? `Key highlights include: ${features}. Each feature has been carefully engineered to exceed your expectations.` : ""}\n\nWhether you're looking for reliability, performance, or style, the ${productName} checks every box. Join thousands of satisfied customers who have already made the switch.\n\n${price ? `At just $${price}, it's an investment that pays for itself.` : "Competitively priced for maximum value."}`,
        bulletPoints: [
          `Premium ${category || "product"} with superior quality materials`,
          features ? `Features: ${features.split(",").slice(0, 2).join(", ")}` : "Advanced design with modern aesthetics",
          `Perfect for ${targetAudience || "all users"} — versatile and reliable`,
          `${tone === "luxury" ? "Luxury" : "Professional"} grade construction`,
          price ? `Exceptional value at $${price}` : "Competitive pricing",
        ],
        seoKeywords: [
          productName.toLowerCase(),
          `best ${(category || "product").toLowerCase()}`,
          `${(category || "product").toLowerCase()} for ${(targetAudience || "everyone").toLowerCase()}`,
          `buy ${productName.toLowerCase()} online`,
          `${tone} ${(category || "product").toLowerCase()}`,
          `top rated ${(category || "product").toLowerCase()}`,
        ],
        adCopy: [
          `🚀 ${productName} is HERE! ${features ? features.split(",")[0]?.trim() + "." : ""} Perfect for ${targetAudience || "you"}. ${price ? `Only $${price}!` : "Shop now!"} #${(category || "Product").replace(/\s/g, "")}`,
          `Looking for the best ${(category || "product").toLowerCase()}? The ${productName} delivers ${tone} quality at an unbeatable price. Try it today! ✨`,
          `Why settle for less? The ${productName} combines ${features ? features.split(",")[0]?.trim() : "top features"} with ${tone} design. ${targetAudience ? `Made for ${targetAudience}.` : ""} Order now →`,
        ],
      };

      setResult(generated);

      // Save to history
      const history = JSON.parse(localStorage.getItem("pb_history") || "[]");
      history.unshift({
        id: Date.now().toString(),
        productName,
        category,
        createdAt: new Date().toISOString(),
        result: generated,
      });
      localStorage.setItem("pb_history", JSON.stringify(history));

      setLoading(false);
      toast({ title: "Description generated!" });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const handleLogout = () => {
    localStorage.removeItem("pb_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary">
              <Zap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            ProductBoost AI
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/history">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <History className="h-4 w-4" /> History
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Settings className="h-4 w-4" /> Settings
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Product Description Generator</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fill in your product details and let AI craft the perfect copy.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Input form */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading font-semibold mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <Label>Product Name *</Label>
                <Input value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g. UltraComfort Running Shoes" className="mt-1" />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Footwear, Electronics" className="mt-1" />
              </div>
              <div>
                <Label>Key Features (comma separated)</Label>
                <Textarea value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="e.g. Breathable mesh, Memory foam insole, Lightweight" className="mt-1" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Target Audience</Label>
                  <Input value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g. Athletes, Parents" className="mt-1" />
                </div>
                <div>
                  <Label>Price ($)</Label>
                  <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="99.99" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="playful">Playful</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="portuguese">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button variant="gradient" className="w-full gap-2" onClick={handleGenerate} disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating...</> : <><Zap className="h-4 w-4" /> Generate Description</>}
              </Button>
            </div>
          </div>

          {/* Output */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-heading font-semibold mb-4">Generated Content</h2>
            {!result ? (
              <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
                <div>
                  <Zap className="mx-auto h-10 w-10 mb-3 opacity-20" />
                  <p className="text-sm">Fill in product details and click Generate to see your AI-powered descriptions here.</p>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="seo-title">
                <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="seo-title" className="text-xs">Title</TabsTrigger>
                  <TabsTrigger value="short" className="text-xs">Short</TabsTrigger>
                  <TabsTrigger value="long" className="text-xs">Long</TabsTrigger>
                  <TabsTrigger value="bullets" className="text-xs">Bullets</TabsTrigger>
                  <TabsTrigger value="keywords" className="text-xs">SEO</TabsTrigger>
                  <TabsTrigger value="ads" className="text-xs">Ads</TabsTrigger>
                </TabsList>

                <TabsContent value="seo-title" className="mt-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm">{result.seoTitle}</p>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.seoTitle)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="short" className="mt-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm">{result.shortDescription}</p>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.shortDescription)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="long" className="mt-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="whitespace-pre-line text-sm">{result.longDescription}</p>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.longDescription)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="bullets" className="mt-4">
                  <div className="flex items-start justify-between gap-2">
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      {result.bulletPoints.map((bp, i) => <li key={i}>{bp}</li>)}
                    </ul>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.bulletPoints.join("\n"))}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="keywords" className="mt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {result.seoKeywords.map((kw, i) => (
                        <span key={i} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">{kw}</span>
                      ))}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.seoKeywords.join(", "))}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="ads" className="mt-4 space-y-4">
                  {result.adCopy.map((ad, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 rounded-lg border border-border p-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Variation {i + 1}</p>
                        <p className="text-sm">{ad}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(ad)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
