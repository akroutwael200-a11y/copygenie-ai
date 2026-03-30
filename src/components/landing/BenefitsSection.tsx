import { Zap, Target, Globe, TrendingUp, Clock, Layers } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  { icon: Zap, title: "Lightning Fast", desc: "Generate complete product descriptions in under 10 seconds." },
  { icon: Target, title: "High Converting", desc: "AI trained on top-performing e-commerce copy that drives sales." },
  { icon: Globe, title: "SEO Optimized", desc: "Built-in keyword optimization for higher search rankings." },
  { icon: TrendingUp, title: "Ad Copy Ready", desc: "Get 3 ad copy variations ready for social media campaigns." },
  { icon: Clock, title: "Save Hours", desc: "What used to take hours now takes seconds. Scale your catalog." },
  { icon: Layers, title: "Multiple Formats", desc: "Title, descriptions, bullet points, keywords — all in one click." },
];

const BenefitsSection = () => (
  <section id="features" className="py-20">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Everything You Need to{" "}
          <span className="text-gradient">Sell More</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          ProductBoost AI generates every piece of copy your product listing needs.
        </p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-elevated"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <b.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-heading font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
