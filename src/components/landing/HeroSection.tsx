import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-hero">
    <div className="container relative py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI-Powered Product Descriptions
        </div>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
          Turn Products Into{" "}
          <span className="text-gradient">Sales Machines</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          Generate high-converting, SEO-optimized product descriptions in seconds.
          Boost your e-commerce revenue with AI that understands what sells.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/auth?mode=signup">
            <Button variant="gradient" size="lg" className="gap-2">
              Start Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button variant="outline" size="lg">See How It Works</Button>
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">No credit card required · 5 free generations</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 text-left">
  <div className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm">
    <p className="text-sm font-semibold text-muted-foreground mb-3">
      Example Input
    </p>
    <div className="space-y-3 text-sm">
      <div>
        <span className="font-semibold">Product:</span> Wireless Earbuds Pro
      </div>
      <div>
        <span className="font-semibold">Category:</span> Electronics
      </div>
      <div>
        <span className="font-semibold">Key Features:</span> Noise cancelling, 30h battery, fast charging, Bluetooth 5.3
      </div>
      <div>
        <span className="font-semibold">Audience:</span> Students
      </div>
      <div>
        <span className="font-semibold">Tone:</span> Professional
      </div>
    </div>
  </div>

  <div className="rounded-2xl border border-border bg-background/70 p-6 shadow-sm">
    <p className="text-sm font-semibold text-muted-foreground mb-3">
      Example Output
    </p>
    <div className="space-y-3 text-sm">
      <div>
        <span className="font-semibold">Title:</span> Wireless Earbuds Pro – Premium Sound & Comfort
      </div>
      <div>
        <span className="font-semibold">Short Description:</span> Enjoy crystal-clear audio with noise cancellation and 30-hour battery life — perfect for studying and daily use.
      </div>
      <div>
        <span className="font-semibold">SEO Keywords:</span> wireless earbuds, noise cancelling earbuds, bluetooth earbuds, earbuds for students
      </div>
      <div>
        <span className="font-semibold">Ad Copy:</span> Upgrade your sound today. Lightweight, powerful, and built for everyday life.
      </div>
    </div>
  </div>
</div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
