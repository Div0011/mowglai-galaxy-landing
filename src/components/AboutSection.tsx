import { Palette, Rocket, Shield, Globe, BarChart, Headphones } from "lucide-react";
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
  {
    icon: Globe,
    title: "Global Reach",
    description: "Scale your business worldwide with infrastructure designed for global performance.",
  },
  {
    icon: BarChart,
    title: "Data Driven",
    description: "Make informed decisions with integrated analytics and actionable insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team ready to assist you whenever you need help.",
  },
];

const AboutSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState([0, 1, 2]);
  const [poolIndices, setPoolIndices] = useState([3, 4, 5]);
  const [fadingIndices, setFadingIndices] = useState<Set<number>>(new Set());

  const handleCardHover = (slotIndex: number) => {
    if (fadingIndices.has(slotIndex)) return;

    // Start fading out
    setFadingIndices(prev => new Set(prev).add(slotIndex));

    // Wait for fade out, then swap
    setTimeout(() => {
      setVisibleIndices(prev => {
        const newVisible = [...prev];
        const oldFeatureIndex = newVisible[slotIndex];
        const newFeatureIndex = poolIndices[0];

        newVisible[slotIndex] = newFeatureIndex;

        setPoolIndices(prevPool => {
          const newPool = [...prevPool.slice(1), oldFeatureIndex];
          return newPool;
        });

        return newVisible;
      });

      // Fade back in
      setFadingIndices(prev => {
        const newSet = new Set(prev);
        newSet.delete(slotIndex);
        return newSet;
      });
    }, 300);
  };

  return (
    <section id="about" className="py-8 md:py-12 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a team of passionate developers and designers dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        {/* Layout: Large Lion logo on left, cards on right */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center lg:items-start">
          {/* Lion Logo - larger, shifted more to the right */}
          {/* Lion Logo slot on the left – hero lion will move here */}
          <div className="w-full lg:w-1/2 lg:flex-shrink-0">
            <div className="flex justify-center lg:justify-end lg:pr-8">
              <div
                className="opacity-0 animate-slide-in-left w-full max-w-md"
                style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
              >
                <div className="transition-transform duration-700 perspective-1000 transform-style-3d">
                  <div className="about-lion-slot w-full aspect-square" />
                </div>
              </div>
            </div>
          </div>

          {/* Cards layout */}
          <div className="w-full lg:w-1/2 about-right-content">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Slot 0 - Top Right (Wide) */}
              <div className="col-span-1 sm:col-span-2">
                {(() => {
                  const slotIndex = 0;
                  const featureIndex = visibleIndices[slotIndex];
                  const feature = features[featureIndex];
                  const Icon = feature.icon;
                  const isHovered = hoveredIndex === slotIndex;
                  const isFading = fadingIndices.has(slotIndex);

                  return (
                    <div
                      className={`glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer transition-all duration-300 ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} hover:scale-105`}
                      onMouseEnter={() => {
                        setHoveredIndex(slotIndex);
                        handleCardHover(slotIndex);
                      }}
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

              {/* Slot 1 - Bottom Left */}
              {(() => {
                const slotIndex = 1;
                const featureIndex = visibleIndices[slotIndex];
                const feature = features[featureIndex];
                const Icon = feature.icon;
                const isHovered = hoveredIndex === slotIndex;
                const isFading = fadingIndices.has(slotIndex);

                return (
                  <div
                    className={`glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer transition-all duration-300 ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} hover:scale-105`}
                    onMouseEnter={() => {
                      setHoveredIndex(slotIndex);
                      handleCardHover(slotIndex);
                    }}
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

              {/* Slot 2 - Bottom Right */}
              {(() => {
                const slotIndex = 2;
                const featureIndex = visibleIndices[slotIndex];
                const feature = features[featureIndex];
                const Icon = feature.icon;
                const isHovered = hoveredIndex === slotIndex;
                const isFading = fadingIndices.has(slotIndex);

                return (
                  <div
                    className={`glass-card rounded-2xl p-8 relative overflow-hidden group cursor-pointer transition-all duration-300 ${isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} hover:scale-105`}
                    onMouseEnter={() => {
                      setHoveredIndex(slotIndex);
                      handleCardHover(slotIndex);
                    }}
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


      </div>
    </section>
  );
};

export default AboutSection;