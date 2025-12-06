import GalaxyBackground from "@/components/GalaxyBackground";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Galaxy background with stars and nebulae */}
      <GalaxyBackground />
      
      {/* Glassmorphic sidebar */}
      <Sidebar />
      
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
