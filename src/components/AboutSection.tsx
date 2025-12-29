import { Palette, Rocket, Shield, Globe, BarChart, Headphones } from "lucide-react";

import { useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  { id: 1, icon: Palette, title: "Modern & Stylish", description: "Creating modest yet visually striking designs tailored for any client profile." },
  { id: 2, icon: Shield, title: "Professional Grade", description: "Robust protocols ensuring your digital presence is secure and reliable." },
  { id: 3, icon: Rocket, title: "Peak Performance", description: "Optimized for speed and smoothness, respecting your user's time." },
  { id: 4, icon: Globe, title: "International Exp.", description: "Proven track record with leading firms across multiple continents." },
  { id: 5, icon: BarChart, title: "Client Centric", description: "We adapt to your specific needs, regardless of industry or scale." },
  { id: 6, icon: Headphones, title: "Flexible Schedule", description: "Active Mon-Sat across different time zones to match your workflow." },
];

const AboutSection = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section id="about" className="relative w-full py-16 z-20 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left Column: Huge Title & Logo */}
        <div className="space-y-12" data-aos="fade-right">
          {/* Two-line heading with one word faded - Jungle Theme */}
          <h2 className="text-[11vw] font-display font-black tracking-tighter text-foreground relative z-10 drop-shadow-sm flex flex-col">
            <span className="leading-[0.8] opacity-10 uppercase">Digital</span>
            <span className="text-primary leading-[0.8] uppercase">Artisans</span>
          </h2>

          {/* Integrated Logo Element - Magnetic & Foggy */}
          <div
            className="relative w-full aspect-square max-w-[400px] sm:max-w-[440px] md:max-w-[500px] mx-auto md:ml-0 flex items-center justify-center cursor-pointer group/logo-container p-20"
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              const logo = el.querySelector('.magnetic-logo');
              if (logo) gsap.to(logo, { x: x * 0.6, y: y * 0.6, duration: 0.4, ease: "power3.out" });
            }}
            onMouseLeave={(e) => {
              const logo = e.currentTarget.querySelector('.magnetic-logo');
              if (logo) gsap.to(logo, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
            }}
          >
            {/* Background Atmosphere */}
            <div className="absolute w-[80%] h-[80%] bg-primary/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none animate-pulse" />

            <div className="magnetic-logo relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-80 md:h-80 rounded-full border border-primary/20 bg-background/5 overflow-hidden shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] transition-all duration-700 group hover:shadow-[0_0_100px_hsl(var(--primary))] ring-1 ring-primary/10 ring-offset-8 ring-offset-transparent">
              {/* Fog Layer - Disappears on hover */}
              <div className="absolute inset-0 z-20 bg-gradient-to-tr from-background/40 via-primary/5 to-transparent backdrop-blur-md opacity-100 group-hover:opacity-0 transition-opacity duration-1000 pointer-events-none" />
              <div className="absolute inset-0 z-10 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-100 group-hover:opacity-0 transition-opacity duration-700" />

              <img src={`${import.meta.env.BASE_URL}logo1.png`} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 hidden dark:block" alt="Logo" />
              <img src={`${import.meta.env.BASE_URL}logo2.png`} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 block dark:hidden" alt="Logo" />
            </div>
          </div>

          <div className="max-w-md ml-auto md:ml-12">
            <p className="text-2xl font-light text-foreground/80 leading-relaxed italic border-l-4 border-primary/30 pl-6 text-center md:text-left">
              "We are your flexible digital partners. Partnering with ambitious brands worldwide, we craft stylish, professional websites that fit your unique vision."
            </p>
          </div>
        </div>

        {/* Right Column: Circular to Square Cards */}
        <div
          id="about-cards-container"
          className="relative w-full h-[750px] overflow-hidden group"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {/* Added hover:pause to the marquee stage */}
          <div id="about-cards-stage" className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-marquee-vertical hover:[animation-play-state:paused] py-10 transition-transform duration-500">
            {[...features, ...features].map((feature, i) => {
              const Icon = feature.icon;
              const isSelected = selectedId === feature.id;
              return (
                <motion.div
                  layout
                  key={`${feature.id}-${i}`}
                  onMouseEnter={() => setSelectedId(feature.id)}
                  onMouseLeave={() => setSelectedId(null)}
                  className={cn(
                    "group/card relative w-full aspect-square bg-primary/5 border border-primary/20 hover:bg-background/90 hover:border-primary rounded-full hover:rounded-[2.5rem] flex flex-col items-center justify-center p-8 cursor-pointer overflow-hidden transition-colors duration-500",
                    isSelected ? "z-40 shadow-[0_0_40px_rgba(var(--primary-rgb),0.2)]" : "z-10"
                  )}
                  animate={{
                    scale: isSelected ? 1.02 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 25
                  }}
                >
                  {/* Golden Backdrop Glow on Hover */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/card:opacity-100 blur-[40px] transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center transition-all duration-500">
                    <div className="flex flex-col items-center gap-4 group-hover/card:-translate-y-4 transition-transform duration-500">
                      <div className="p-5 rounded-full bg-primary/10 text-primary group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                        <Icon size={36} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-display font-bold text-foreground group-hover/card:text-primary transition-colors">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Shortened Description - Centered and fitting */}
                    <div className="opacity-0 group-hover/card:opacity-100 transition-all duration-500 delay-100 mt-4 max-w-[90%]">
                      <p className="text-lg text-foreground/70 font-body leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;