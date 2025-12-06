import { Palette, Rocket, Shield } from "lucide-react";
import { useState } from "react";
import LionLogo from "./LionLogo";

const features = [
  {
    icon: Palette,
    title: "Stunning Design",
    description: "Beautiful, intuitive interfaces that captivate users and elevate your brand presence.",
  },
  {
    icon: Shield,
    title: "Security Built-In",
    description: "Enterprise-grade security measures to protect your data and your users.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Lightning-fast load times and smooth interactions for the best user experience.",
  },
];

const AboutSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="about" className="py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a team of passionate developers and designers dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        {/* Layout: Large Lion logo on left, cards on right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Lion Logo - larger, shifted more to the right */}
          <div className="w-full lg:w-1/2 lg:flex-shrink-0">
            <div className="flex justify-center lg:justify-end lg:pr-8">
              <div className="opacity-0 animate-slide-in-left w-full max-w-md" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
                <LionLogo size="xl" className="w-full" />
              </div>
            </div>
          </div>

          {/* Cards layout: Stunning Design (top right), Security Built-In (below right), Performance First (left of Security) */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              {/* Stunning Design - top right */}
              <div className="col-span-2">
                {(() => {
                  const feature = features[0]; // Stunning Design
                  const Icon = feature.icon;
                  const isHovered = hoveredIndex === 0;
                  
                  return (
                    <div
                      className="glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-500"
                      onMouseEnter={() => setHoveredIndex(0)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div 
                        className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30"
                        style={{
                          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                        }}
                      >
                        <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 
                        className="text-xl font-display font-semibold mb-3 transition-colors duration-300"
                        style={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
                      >
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                        {feature.description}
                      </p>

                      {/* Glow effect on hover */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity duration-500 rounded-2xl"
                        style={{ opacity: isHovered ? 1 : 0 }}
                      />
                      
                      {/* Animated border on hover */}
                      <div 
                        className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 pointer-events-none"
                      />
                    </div>
                  );
                })()}
              </div>

              {/* Performance First - bottom left */}
              {(() => {
                const feature = features[2]; // Performance First
                const Icon = feature.icon;
                const isHovered = hoveredIndex === 2;
                
                return (
                  <div
                    className="glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-500"
                    onMouseEnter={() => setHoveredIndex(2)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30"
                      style={{
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                      }}
                    >
                      <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 
                      className="text-xl font-display font-semibold mb-3 transition-colors duration-300"
                      style={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      {feature.description}
                    </p>

                    {/* Glow effect on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity duration-500 rounded-2xl"
                      style={{ opacity: isHovered ? 1 : 0 }}
                    />
                    
                    {/* Animated border on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 pointer-events-none"
                    />
                  </div>
                );
              })()}

              {/* Security Built-In - bottom right */}
              {(() => {
                const feature = features[1]; // Security Built-In
                const Icon = feature.icon;
                const isHovered = hoveredIndex === 1;
                
                return (
                  <div
                    className="glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-500"
                    onMouseEnter={() => setHoveredIndex(1)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div 
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30"
                      style={{
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                      }}
                    >
                      <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 
                      className="text-xl font-display font-semibold mb-3 transition-colors duration-300"
                      style={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      {feature.description}
                    </p>

                    {/* Glow effect on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity duration-500 rounded-2xl"
                      style={{ opacity: isHovered ? 1 : 0 }}
                    />
                    
                    {/* Animated border on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/30 transition-all duration-500 pointer-events-none"
                    />
                  </div>
                );
              })()}
            </div>
          </div>
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