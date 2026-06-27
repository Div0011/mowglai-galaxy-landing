"use client";

import { useEffect } from "react";
import PremiumLoader from "./animations/PremiumLoader";
import JungleBackground from "./animations/JungleBackground";
import LandingNavbar from "./navigation/LandingNavbar";
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

      {/* Premium Sticky Navigation */}
      <LandingNavbar />

      {/* Content Layers */}
      <div className="relative z-10 flex flex-col">
        {/* Page 1: Hero */}
        <Hero />
        
        {/* Page 2 & 3: Services */}
        <div id="services">
          <ServicesSection />
        </div>
        
        {/* Page 4: Portfolio */}
        <div id="portfolio">
          <PortfolioSection />
        </div>
        
        {/* Page 5: Templates */}
        <div id="templates">
          <TemplatesSection />
        </div>
        
        {/* Page 6: Pricing */}
        <div id="pricing">
          <PricingSection />
        </div>
        
        {/* Page 7: Lead Form */}
        <LeadFormSection />
        
        {/* Page 8: Footer */}
        <NewFooter />
      </div>
    </main>
  );
}
