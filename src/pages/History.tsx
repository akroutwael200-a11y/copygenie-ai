import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Zap, Copy, Trash2, ArrowLeft, History as HistoryIcon } from "lucide-react";

interface HistoryItem {
  id: string;
  productName: string;
  category: string;
  createdAt: string;
  result: {
    seoTitle: string;
    shortDescription: string;
    longDescription: string;
    bulletPoints: string[];
    seoKeywords: string[];
    adCopy: string[];
  };
}

const HistoryPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = JSON.parse(localStorage.getItem("pb_user") || "null");
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    setItems(JSON.parse(localStorage.getItem("pb_history") || "[]"));
  }, []);

  const deleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    localStorage.setItem("pb_history", JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
    toast({ title: "Generation deleted" });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary">
              <Zap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            ProductBoost AI
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container py-8">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <HistoryIcon className="h-6 w-6" /> Generation History
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">View and manage your previously generated descriptions.</p>

        {items.length === 0 ? (
          <div className="mt-16 text-center text-muted-foreground">
            <HistoryIcon className="mx-auto h-12 w-12 mb-3 opacity-20" />
            <p>No generations yet. Create your first one from the dashboard.</p>
            <Link to="/dashboard" className="mt-4 inline-block">
              <Button variant="gradient" size="sm">Go to Dashboard</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* List */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`cursor-pointer rounded-lg border p-4 transition-all ${
                    selected?.id === item.id ? "border-primary bg-primary/5" : "border-border bg-card hover:shadow-card"
                  }`}
                  onClick={() => setSelected(item)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-heading text-sm font-semibold">{item.productName}</p>
                      {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-2">
              {!selected ? (
                <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground text-sm">
                  Select a generation to view its content
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="font-heading text-lg font-semibold">{selected.productName}</h2>
                  <Tabs defaultValue="seo-title" className="mt-4">
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
                        <p className="text-sm">{selected.result.seoTitle}</p>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selected.result.seoTitle)}><Copy className="h-4 w-4" /></Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="short" className="mt-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm">{selected.result.shortDescription}</p>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selected.result.shortDescription)}><Copy className="h-4 w-4" /></Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="long" className="mt-4">
                      <div className="flex items-start justify-between gap-2">
                        <p className="whitespace-pre-line text-sm">{selected.result.longDescription}</p>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selected.result.longDescription)}><Copy className="h-4 w-4" /></Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="bullets" className="mt-4">
                      <div className="flex items-start justify-between gap-2">
                        <ul className="list-disc pl-4 space-y-1 text-sm">{selected.result.bulletPoints.map((bp, i) => <li key={i}>{bp}</li>)}</ul>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selected.result.bulletPoints.join("\n"))}><Copy className="h-4 w-4" /></Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="keywords" className="mt-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-2">{selected.result.seoKeywords.map((kw, i) => <span key={i} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs">{kw}</span>)}</div>
                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard(selected.result.seoKeywords.join(", "))}><Copy className="h-4 w-4" /></Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="ads" className="mt-4 space-y-4">
                      {selected.result.adCopy.map((ad, i) => (
                        <div key={i} className="flex items-start justify-between gap-2 rounded-lg border border-border p-3">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Variation {i + 1}</p>
                            <p className="text-sm">{ad}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => copyToClipboard(ad)}><Copy className="h-4 w-4" /></Button>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
