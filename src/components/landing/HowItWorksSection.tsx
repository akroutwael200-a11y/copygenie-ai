import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Enter Product Details", desc: "Add your product name, category, features, and target audience." },
  { num: "02", title: "Choose Your Tone", desc: "Select the writing style — professional, casual, luxury, or playful." },
  { num: "03", title: "Generate & Copy", desc: "Get SEO titles, descriptions, bullet points, keywords, and ad copy instantly." },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="bg-secondary/50 py-20">
    <div className="container">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          How It <span className="text-gradient">Works</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Three simple steps to better product listings.</p>
      </div>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-heading text-xl font-bold text-primary-foreground">
              {s.num}
            </div>
            <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
