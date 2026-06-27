"use client";

import { motion } from "framer-motion";
import { ExternalLink, Maximize2 } from "lucide-react";
import Magnetic from "../Magnetic";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Fintech Dashboard",
    category: "Web App",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "EcoStore E-Commerce",
    category: "Online Store",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Healthcare Portal",
    category: "Website Design",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Creative Agency",
    category: "Portfolio",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80"
  }
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !scrollRef.current) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const panels = gsap.utils.toArray(".portfolio-panel");
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        // snap: 1 / (panels.length - 1), // Optional snapping
        end: () => "+=" + scrollRef.current?.offsetWidth
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 z-10 bg-transparent overflow-hidden">
      {/* Smart Companion Waypoint */}
      <div className="absolute left-10 top-1/4 w-[300px] h-[400px] companion-waypoint pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
            >
              Our Work
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/70 max-w-lg font-body"
            >
              A selection of our finest digital experiences crafted for ambitious brands worldwide.
            </motion.p>
          </div>
          <Magnetic>
            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="px-6 py-3 border border-primary/20 text-primary font-bold tracking-widest uppercase text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              View All Projects
            </motion.button>
          </Magnetic>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollRef} 
        className="flex flex-col md:flex-row md:w-[400vw] h-full gap-8 px-6 md:px-0 md:pl-[10vw]"
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="portfolio-panel w-full md:w-[80vw] lg:w-[60vw] flex-shrink-0 md:pr-12 group relative overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[16/9] bg-card border border-primary/10"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-30"
            />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-jungle-gold font-medium mb-2 font-body tracking-wider uppercase text-xs">{project.category}</p>
                <h3 className="text-3xl font-display font-bold text-foreground mb-6">{project.title}</h3>
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,208,97,0.3)]">
                    <ExternalLink size={18} /> Live Website
                  </button>
                  <button aria-label="Maximize Project" className="w-12 h-12 glass-card text-foreground flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
