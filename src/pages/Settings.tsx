import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Zap, ArrowLeft, User } from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pb_user") || "null");
    if (!stored) { navigate("/auth"); return; }
    setUser(stored);
    setName(stored.name);
    setEmail(stored.email);
  }, []);

  const handleSave = () => {
    const updated = { ...user, name, email };
    localStorage.setItem("pb_user", JSON.stringify(updated));
    setUser(updated as { email: string; name: string });
    toast({ title: "Settings saved!" });
  };

  if (!user) return null;

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

      <div className="container max-w-lg py-8">
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" /> Account Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile and preferences.</p>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1" />
          </div>
          <Button variant="gradient" onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <h2 className="font-heading font-semibold">Plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">You are currently on the <strong>Free</strong> plan.</p>
          <Link to="/pricing" className="mt-3 inline-block">
            <Button variant="outline" size="sm">Upgrade Plan</Button>
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-destructive/20 bg-card p-6">
          <h2 className="font-heading font-semibold text-destructive">Danger Zone</h2>
          <p className="mt-1 text-sm text-muted-foreground">Permanently delete your account and all data.</p>
          <Button variant="destructive" size="sm" className="mt-3" onClick={() => {
            localStorage.removeItem("pb_user");
            localStorage.removeItem("pb_history");
            navigate("/");
            toast({ title: "Account deleted" });
          }}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
