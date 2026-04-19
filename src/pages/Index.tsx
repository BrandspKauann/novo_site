import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsSection from "@/components/WhatIsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import ServicesSection from "@/components/ServicesSection";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesSection />
      <WhatIsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <BlogSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
