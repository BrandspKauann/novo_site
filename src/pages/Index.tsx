import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsSection from "@/components/WhatIsSection";
import WhoCanHire from "@/components/WhoCanHire";
import CasesSection from "@/components/CasesSection";
import ServicesSection from "@/components/ServicesSection";
import DiagnosticSection from "@/components/DiagnosticSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <WhatIsSection />
      <WhoCanHire />
      <CasesSection />
      <ServicesSection />
      <DiagnosticSection />
      <BlogSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
