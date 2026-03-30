import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import PricingPreview from "@/components/landing/PricingPreview";
import CTASection from "@/components/landing/CTASection";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <BenefitsSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <PricingPreview />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
