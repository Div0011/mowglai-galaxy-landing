import { Code2, Palette, Rocket, Shield } from "lucide-react";
import { useState } from "react";
import MowglaiLogo from "./MowglaiLogo";

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "We write maintainable, scalable code following industry best practices and modern standards.",
  },
  {
    icon: Palette,
    title: "Stunning Design",
    description: "Beautiful, intuitive interfaces that captivate users and elevate your brand presence.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Lightning-fast load times and smooth interactions for the best user experience.",
  },
  {
    icon: Shield,
    title: "Security Built-In",
    description: "Enterprise-grade security measures to protect your data and your users.",
  },
];

const AboutSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a team of passionate developers and designers dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        {/* Features grid with hover animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === i;
            
            return (
              <div
                key={i}
                className="glass-card rounded-2xl p-8 relative overflow-hidden group"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Logo sliding from left on hover */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                  style={{
                    transform: isHovered 
                      ? 'translateX(0) translateY(-50%)' 
                      : 'translateX(-100%) translateY(-50%)',
                    opacity: isHovered ? 0.15 : 0,
                  }}
                >
                  <MowglaiLogo size="lg" />
                </div>

                {/* Content sliding from right on hover */}
                <div 
                  className="relative z-10 transition-all duration-500 ease-out"
                  style={{
                    transform: isHovered ? 'translateX(20px)' : 'translateX(0)',
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 transition-all duration-500"
                    style={{
                      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                    }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 
                    className="text-xl font-display font-semibold mb-3 transition-colors duration-300"
                    style={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity duration-500"
                  style={{ opacity: isHovered ? 1 : 0 }}
                />
              </div>
            );
          })}
        </div>

        {/* Mission statement */}
        <div className="mt-20 glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-foreground">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To empower businesses with cutting-edge web solutions that drive growth, enhance user engagement, 
              and establish a powerful digital presence. We believe great software should be beautiful, fast, and accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;