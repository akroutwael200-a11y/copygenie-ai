import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          ProductBoost AI
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {isLanding && (
            <>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </>
          )}
          <Link to="/auth">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/auth?mode=signup">
            <Button variant="gradient" size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {isLanding && (
              <>
                <a href="#features" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</a>
                <a href="#pricing" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Pricing</a>
                <a href="#faq" className="text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>FAQ</a>
              </>
            )}
            <Link to="/auth" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full">Log in</Button>
            </Link>
            <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)}>
              <Button variant="gradient" size="sm" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
