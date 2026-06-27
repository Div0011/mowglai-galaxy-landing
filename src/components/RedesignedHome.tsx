"use client";

import { useEffect } from "react";
import PremiumLoader from "./animations/PremiumLoader";
import JungleBackground from "./animations/JungleBackground";
import Hero from "./hero/Hero";
import ServicesSection from "./services/ServicesSection";
import PortfolioSection from "./portfolio/PortfolioSection";
import TemplatesSection from "./templates/TemplatesSection";
import PricingSection from "./pricing/PricingSection";
import LeadFormSection from "./forms/LeadFormSection";
import NewFooter from "./footer/NewFooter";

export default function RedesignedHome() {
  // Use useEffect to handle any global setup if needed
  useEffect(() => {
    // Smooth scrolling can be handled here or via existing Lenis provider
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative bg-background min-h-screen text-foreground overflow-hidden font-sans">
      <PremiumLoader />
      
      {/* Background layer */}
      <JungleBackground />

      {/* Content Layers */}
      <div className="relative z-10 flex flex-col">
        {/* Page 1: Hero */}
        <Hero />
        
        {/* Page 2 & 3: Services */}
        <ServicesSection />
        
        {/* Page 4: Portfolio */}
        <PortfolioSection />
        
        {/* Page 5: Templates */}
        <TemplatesSection />
        
        {/* Page 6: Pricing */}
        <PricingSection />
        
        {/* Page 7: Lead Form */}
        <LeadFormSection />
        
        {/* Page 8: Footer */}
        <NewFooter />
      </div>
    </main>
  );
}
