import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah Chen", role: "Shopify Store Owner", text: "ProductBoost AI cut my listing time by 90%. My conversion rate went up 35% in the first month.", rating: 5 },
  { name: "Marcus Johnson", role: "Amazon FBA Seller", text: "The SEO keywords alone are worth the subscription. I'm ranking higher for every product now.", rating: 5 },
  { name: "Elena Rodriguez", role: "E-commerce Manager", text: "We manage 500+ products. This tool saved us hundreds of hours and improved our copy quality.", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="py-20">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Loved by <span className="text-gradient">E-commerce Teams</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-3 flex gap-1">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">"{t.text}"</p>
            <div className="mt-4">
              <p className="font-heading text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
