import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import MowglaiLogo from "./MowglaiLogo";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ripple rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              animation: `ripple ${3 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Floating logo */}
        <div className="flex justify-center mb-8 animate-float">
          <MowglaiLogo size="xl" />
        </div>

        {/* Brand name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
            MOWGLAI
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Crafting Digital Experiences That <span className="text-primary">Transcend</span> Expectations
        </p>

        {/* Sub description */}
        <p className="text-base md:text-lg text-muted-foreground/70 mb-12 max-w-xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          We build stunning, high-performance websites and web applications that propel your business into the future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Get Started
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all duration-300">
            View Our Work
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "50+", label: "Happy Clients" },
            { value: "5+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary glow-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
