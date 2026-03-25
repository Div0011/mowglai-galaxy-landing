"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers, Zap, Rocket, Fingerprint, Activity, Terminal, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "Discovery",
    tagline: "Biological Intelligence",
    description: "Our investigative protocols dive deep into your brand's digital DNA, unearthing the strategic leverage points that define elite performance.",
    icon: <Fingerprint className="w-10 h-10" />,
    metrics: ["Market DNA", "User Psychology", "Tactical Audit"],
    accent: "rgb(230, 185, 61)", // Gold
    glow: "rgba(230, 185, 61, 0.15)",
  },
  {
    id: "02",
    title: "Design",
    tagline: "Synthetic Aesthetics",
    description: "Where nature meets high-tech precision. We engineer immersive 3D interfaces and glassmorphic systems that don't just look premium—they feel alive.",
    icon: <Activity className="w-10 h-10" />,
    metrics: ["Bio-UI/UX", "3D Architecture", "Neural Motion"],
    accent: "rgb(121, 152, 81)", // Light Green
    glow: "rgba(121, 152, 81, 0.15)",
  },
  {
    id: "03",
    title: "Develop",
    tagline: "Neural Engineering",
    description: "Atomic-speed performance powered by Next.js and custom-tuned GSAP sequences. We build indestructible architectures for the modern web.",
    icon: <Terminal className="w-10 h-10" />,
    metrics: ["Core Mastery", "SEO Synthesis", "Elastic Scale"],
    accent: "rgb(71, 98, 42)", // Mid Green
    glow: "rgba(71, 98, 42, 0.15)",
  },
  {
    id: "04",
    title: "Deploy",
    tagline: "Orbital Launch",
    description: "The moment of impact. We launch your project with tactical precision, then provide ongoing evolution and monitoring for global dominance.",
    icon: <Rocket className="w-10 h-10" />,
    metrics: ["World Launch", "Protocol Monitor", "Growth Scale"],
    accent: "rgb(55, 68, 38)", // Dark Green
    glow: "rgba(55, 68, 38, 0.15)",
  },
];

export default function HowWeBuiltSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Magnetic interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const sections = gsap.utils.toArray(".process-block") as HTMLElement[];

    // Pinning the decorative backdrop
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: ".enhanced-backdrop",
      pinSpacing: false,
    });

    sections.forEach((section, i) => {
        // Individual progress tracking
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
                if(self.isActive) setActiveIndex(i);
            }
        });

        // Parallax reveals for content layers
        const card = section.querySelector(".enhanced-card");
        const title = section.querySelector(".enhanced-title");
        const bgNum = section.querySelector(".enhanced-bg-num");

        gsap.fromTo(card, 
            { y: 150, opacity: 0, rotateX: 20 },
            { 
                y: 0, 
                opacity: 1, 
                rotateX: 0,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top 30%",
                    scrub: 1,
                }
            }
        );

        gsap.fromTo(bgNum, 
            { y: 0, opacity: 0.1 },
            { 
                y: -300, 
                opacity: 0,
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            }
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-transparent py-20 md:py-40 perspective-[2000px]"
    >


      {/* 1. ENHANCED DECORATIVE BACKDROP - Purely for interactive blobs, base texture is now global */}
      <div className="enhanced-backdrop absolute inset-0 w-full h-screen pointer-events-none overflow-hidden z-0">
        
        {/* Floating Ambient Blobs */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.6, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[200px] opacity-40 mix-blend-screen overflow-hidden"
                style={{ backgroundColor: steps[activeIndex].glow }}
            />
        </AnimatePresence>

        {/* Global Floating Particles (Fireflies) */}
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                animate={{ 
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                    opacity: [0, 0.4, 0]
                }}
                transition={{ 
                    duration: 5 + Math.random() * 5, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                }}
                className="absolute w-1 h-1 bg-primary rounded-full blur-[1px]"
                style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%` 
                }}
            />
        ))}
      </div>

      {/* 2. THE PROCESS NARRATIVE */}
      <div className="relative z-10 w-full px-6 md:px-0">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="process-block relative min-h-screen flex items-center justify-center py-20 overflow-visible"
          >
            {/* Parallax Background ID */}
            <div className="enhanced-bg-num absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60vw] md:text-[45vw] font-display font-black text-white/[0.02] select-none pointer-events-none">
                {step.id}
            </div>

            {/* The Enhanced Card */}
            <div className="enhanced-card relative w-full max-w-6xl">
                <div className="relative group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] md:rounded-[4rem] border border-white/10 bg-white/[0.01] backdrop-blur-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-border-glow">
                    
                    {/* Left: Tactical Content */}
                    <div className="relative z-10 p-6 md:p-20 space-y-10 md:space-y-12">
                        <div className="space-y-4 md:space-y-6">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4"
                            >
                                <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase">SYSTEM Protocol {step.id}</span>
                            </motion.div>
                            
                            <h2 className="enhanced-title text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter leading-tight md:leading-[0.8]">
                                {step.title}
                            </h2>
                            <p className="text-lg md:text-2xl font-body font-light text-foreground/40 leading-relaxed max-w-lg">
                                {step.description}
                            </p>
                        </div>

                        {/* Tactical Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {step.metrics.map((metric, i) => (
                                <div key={i} className="flex flex-col space-y-2">
                                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <ExternalLink size={12} />
                                    </div>
                                    <div className="text-[9px] md:text-[10px] font-display font-black text-white/20 uppercase tracking-widest leading-tight">{metric}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Immersive Visual Core - Watermark on Mobile */}
                    <div className="absolute inset-0 lg:relative lg:h-auto bg-white/[0.02] border-white/5 flex items-center justify-center overflow-hidden pointer-events-none lg:pointer-events-auto opacity-30 lg:opacity-100 transition-opacity duration-700">
                        {/* 3D-Like Floating Elements based on Mouse */}
                        <div 
                            className="relative transition-transform duration-300 ease-out lg:translate-x-0"
                            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
                        >
                            {/* Visual Center */}
                            <div className="relative w-72 h-72 md:w-64 md:h-64 rounded-full flex items-center justify-center scale-75 lg:scale-100">
                                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-spin-slow" />
                                <div className="absolute inset-8 rounded-full border border-primary/10 mix-blend-plus-lighter" />
                                
                                <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 backdrop-blur-3xl border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_60px_rgba(var(--primary-rgb),0.3)]">
                                    {step.icon}
                                </div>
                                
                                {/* Orbiting Glyph */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary blur-[2px]" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Tagline Vertical */}
                        <div className="absolute right-6 md:right-12 bottom-6 md:bottom-12 rotate-[-90deg] origin-bottom-right hidden sm:block">
                             <span className="text-[9px] md:text-[10px] font-display font-black text-white/10 uppercase tracking-[1em] whitespace-nowrap">
                                {step.tagline}
                             </span>
                        </div>
                    </div>

                    {/* Scanner Refraction */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[30%] -skew-x-[45deg] animate-refraction pointer-events-none" />
                </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
