import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-20">
    <div className="container">
      <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-primary p-10 text-center text-primary-foreground md:p-14">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Ready to Boost Your Sales?
        </h2>
        <p className="mt-4 opacity-90">
          Join thousands of e-commerce sellers using AI to write better product descriptions.
        </p>
        <Link to="/auth?mode=signup" className="mt-8 inline-block">
          <Button size="lg" variant="secondary" className="gap-2 font-semibold">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default CTASection;
