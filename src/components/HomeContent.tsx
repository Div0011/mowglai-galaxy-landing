"use client";

import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import FlashText from "@/components/FlashText";
import SelectedWork from "@/components/SelectedWork";
import NextPageButton from "@/components/NextPageButton";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HowWeBuiltSection = dynamic(() => import("@/components/HowWeBuiltSection"), { ssr: false });
const StartupGrowthSection = dynamic(() => import("@/components/StartupGrowthSection"), { ssr: false });

// Mouse follower glow effect - subtle premium feel
function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[100]"
      animate={{
        x: mousePosition.x - 150,
        y: mousePosition.y - 150,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      style={{
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(230, 185, 61, 0.08) 0%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  );
}

// Floating ambient particles
function AmbientParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Section divider with animated line
function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={cn("relative h-24 overflow-hidden", className)}>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[1.5px] h-full bg-gradient-to-b from-transparent via-primary/40 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
    </div>
  );
}



// Scroll reveal wrapper
function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Parallax container
function ParallaxSection({
  children,
  speed = 0.5,
  className = ""
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <section ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </section>
  );
}

// Interactive button with multiple effects
function InteractiveButton({
  href,
  children,
  variant = "primary",
  icon: Icon = ArrowRight
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ElementType;
}) {
  const isPrimary = variant === "primary";

  return (
    <Magnetic>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={href}
          className={`group relative inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 ${
            isPrimary
              ? "bg-primary text-primary-foreground hover:shadow-[0_0_50px_rgba(230,185,61,0.4)]"
              : "bg-background/5 backdrop-blur-2xl border border-foreground/15 text-foreground hover:border-primary/50"
          }`}
        >
          {/* Animated background */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-500"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Ripple effect on hover */}
          <motion.span
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 0.1 }}
            transition={{ duration: 0.6 }}
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
          />

          <span className="relative z-10 flex items-center gap-3">
            {children}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon className="w-5 h-5" />
            </motion.span>
          </span>
        </Link>
      </motion.div>
    </Magnetic>
  );
}

// Animated text with character reveal
function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// SVG path animation between sections
function AnimatedPath({ id = "pathGradient" }: { id?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!pathRef.current) return;

    gsap.fromTo(
      pathRef.current,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: pathRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="relative h-32 w-full overflow-hidden opacity-40">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <motion.path
          ref={pathRef}
          d="M0,50 Q250,0 500,50 T1000,50"
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.5"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(230, 185, 61, 0)" />
            <stop offset="50%" stopColor="rgba(230, 185, 61, 0.6)" />
            <stop offset="100%" stopColor="rgba(230, 185, 61, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Magnetic container for interactive elements
function MagneticContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.1;
    const distanceY = (e.clientY - centerY) * 0.1;
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal animations for cards
    const cards = gsap.utils.toArray(".reveal-card") as HTMLElement[];
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Ambient effects */}
      <MouseGlow />
      <AmbientParticles />

      {/* 1. How We Build Section - Tucked under hero */}
      <div className="relative -mt-10 lg:-mt-20">
        <HowWeBuiltSection />
      </div>

      <SectionDivider className="-mt-10" />

      {/* 1.5. Services / Startup Growth Section */}
      <div id="services-section">
        <StartupGrowthSection />
      </div>

      <AnimatedPath id="path1" />

      {/* 2. Dual Showcase Frame */}
      <section className="relative w-full py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-6xl mx-auto">
            <ScrollReveal direction="left" className="space-y-4">
              <div className="flex items-center gap-3 text-primary font-display font-bold text-xs tracking-[0.4em] uppercase">
                <div className="w-10 h-[1.5px] bg-primary" />
                Showcase
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-foreground uppercase leading-[1.2]">
                Our <span className="text-primary italic">Works</span> & <br className="mb-2" /> High-End <span className="text-primary italic">Templates</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <p className="text-foreground/50 text-base font-light max-w-sm leading-relaxed border-l border-primary/20 pl-6">
                A dual perspective on digital excellence: bespoke client projects and production-ready systems.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive showcase grid */}
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
              {/* Left Panel: Selected Work */}
              <ScrollReveal direction="up" className="h-full">
                <div className="relative h-full transition-all duration-500 hover:translate-y-[-10px]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <SelectedWork />
                </div>
              </ScrollReveal>

              {/* Right Panel: Templates Showcase */}
              <ScrollReveal direction="up" delay={0.2} className="h-full">
                <div className="relative h-full transition-all duration-500 hover:translate-y-[-10px]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-transparent to-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <TemplatesShowcase />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider className="my-10" />

      {/* 3. Blueprint Button */}
      <ScrollReveal className="w-full relative z-20 mb-12">
        <NextPageButton label="EXPLORE TEMPLATES" href="/explore" />
      </ScrollReveal>

      <AnimatedPath id="path2" />

      {/* 4. Consult + Story Side by Side */}
      <section className="relative w-full py-16 z-20">
        <div className="container mx-auto px-6">
          {/* Ready to Build label */}
          <ScrollReveal className="text-center mb-12">
            <motion.span
              className="inline-block text-primary font-bold text-lg md:text-xl font-display tracking-widest uppercase"
              animate={{
                textShadow: [
                  "0 0 0px rgba(230, 185, 61, 0)",
                  "0 0 20px rgba(230, 185, 61, 0.5)",
                  "0 0 0px rgba(230, 185, 61, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AnimatedText text="Ready to build?" />
            </motion.span>
            <motion.p
              className="text-sm md:text-base text-muted-foreground/60 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Transform your vision into reality with Mowglai
            </motion.p>
          </ScrollReveal>

          {/* Two buttons with enhanced interactions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <InteractiveButton href="/custom-request" variant="primary" icon={ArrowRight}>
              Start a project
            </InteractiveButton>

            <InteractiveButton href="/about" variant="secondary" icon={ArrowUpRight}>
              Our story
            </InteractiveButton>
          </div>
        </div>
      </section>

      {/* Final section divider */}
      <SectionDivider />

      {/* 5. Refer and Earn */}
      <ScrollReveal className="mt-6 md:mt-10">
        <FlashText />
      </ScrollReveal>
    </div>
  );
}
