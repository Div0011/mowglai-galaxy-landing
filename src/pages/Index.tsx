import { useState, useEffect } from "react";
import GalaxyBackground from "@/components/GalaxyBackground";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply theme class to document
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen relative">
      {/* Custom cursor */}
      <CustomCursor />
      
      {/* Galaxy background with purple dots and water ripples */}
      <GalaxyBackground />
      
      {/* Glassmorphic cylindrical sidebar */}
      <Sidebar isDark={isDark} onToggleTheme={handleToggleTheme} />
      
      {/* Main content with left padding for sidebar */}
      <main className="pl-20">
        <HeroSection />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;