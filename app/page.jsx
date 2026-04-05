import React from "react";
import FeaturesSection from "@/components/ui/FeatureSection";
import HeroSection from "@/components/ui/HeroSection";
import HowItWorksSection from "@/components/ui/HowItWorkSection";
import FAQSection from "@/components/ui/FAQSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import Footer from "@/components/ui/Footer";

const Page = () => {
  return (
    <div className="bg-[#080808]">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Page;
