import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Try it out",
    features: ["5 generations/month", "Basic SEO title", "Short description", "Community support"],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    desc: "For growing stores",
    features: ["100 generations/month", "Full SEO suite", "Ad copy variations", "Bulk generation", "Priority support"],
    cta: "Start Pro Trial",
    featured: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    desc: "For teams & agencies",
    features: ["Unlimited generations", "API access", "Team collaboration", "Custom brand voice", "Dedicated support"],
    cta: "Contact Sales",
    featured: false,
  },
];

const PricingPreview = () => (
  <section id="pricing" className="py-20">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Simple, Transparent <span className="text-gradient">Pricing</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Start free, upgrade when you're ready.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl border p-6 ${
              p.featured
                ? "border-primary bg-card shadow-glow relative"
                : "border-border bg-card"
            }`}
          >
            {p.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                Most Popular
              </div>
            )}
            <h3 className="font-heading text-lg font-semibold">{p.name}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-4">
              <span className="font-heading text-4xl font-bold">{p.price}</span>
              {p.period && <span className="text-muted-foreground">{p.period}</span>}
            </div>
            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/auth?mode=signup" className="mt-6 block">
              <Button variant={p.featured ? "gradient" : "outline"} className="w-full">
                {p.cta}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to="/pricing" className="text-sm text-primary hover:underline">
          View full pricing comparison →
        </Link>
      </div>
    </div>
  </section>
);

export default PricingPreview;
