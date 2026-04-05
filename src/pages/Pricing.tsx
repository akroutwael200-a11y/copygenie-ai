import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Perfect for trying it out",
    features: {
      "Generations per day": "5",
      "SEO Title": true,
      "Short Description": true,
      "Long Description": false,
      "Bullet Points": false,
      "SEO Keywords": false,
      "Ad Copy Variations": false,
      "Bulk Generation": false,
      "API Access": false,
      "Team Members": "1",
      "Support": "Community",
    },
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    desc: "For growing e-commerce stores",
    features: {
      "Generations per month": "100",
      "SEO Title": true,
      "Short Description": true,
      "Long Description": true,
      "Bullet Points": true,
      "SEO Keywords": true,
      "Ad Copy Variations": true,
      "Bulk Generation": false,
      "API Access": false,
      "Team Members": "1",
      "Support": "Priority",
    },
    cta: "Start Pro Trial",
    featured: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    desc: "For teams & agencies",
    features: {
      "Generations per month": "Unlimited",
      "SEO Title": true,
      "Short Description": true,
      "Long Description": true,
      "Bullet Points": true,
      "SEO Keywords": true,
      "Ad Copy Variations": true,
      "Bulk Generation": true,
      "API Access": true,
      "Team Members": "10",
      "Support": "Dedicated",
    },
    cta: "Contact Sales",
    featured: false,
  },
];

const featureKeys = Object.keys(plans[0].features);

const Pricing = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-bold md:text-5xl">
          Choose Your <span className="text-gradient">Plan</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Start free, scale as you grow. No hidden fees.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-xl border p-6 ${
              p.featured ? "border-primary shadow-glow" : "border-border"
            }`}
          >
            {p.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                Most Popular
              </div>
            )}
            <h3 className="font-heading text-xl font-semibold">{p.name}</h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-4">
              <span className="font-heading text-4xl font-bold">{p.price}</span>
              {p.period && <span className="text-muted-foreground">{p.period}</span>}
            </div>
            <Link to="/auth?mode=signup" className="mt-6 block">
              <Button variant={p.featured ? "gradient" : "outline"} className="w-full">
                {p.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="mt-16 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-4 text-left font-heading font-semibold">Feature</th>
              {plans.map((p) => (
                <th key={p.name} className="pb-4 text-center font-heading font-semibold">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureKeys.map((key) => (
              <tr key={key} className="border-b border-border">
                <td className="py-3 text-muted-foreground">{key}</td>
                {plans.map((p) => {
                  const val = p.features[key as keyof typeof p.features];
                  return (
                    <td key={p.name} className="py-3 text-center">
                      {val === true ? (
                        <Check className="mx-auto h-4 w-4 text-accent" />
                      ) : val === false ? (
                        <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                      ) : (
                        <span>{val}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </div>
);

export default Pricing;
