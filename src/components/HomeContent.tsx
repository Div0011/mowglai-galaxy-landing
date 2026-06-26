"use client";

import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import FlashText from "@/components/FlashText";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";
import MistakeSection from "@/components/MistakeSection";
import InteractiveAnimals from "@/components/InteractiveAnimals";
import GiantJungleTree from "@/components/GiantJungleTree";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollTransition } from "@/components/ScrollTransition";

import ServicesSection from "@/components/services/ServicesSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import TemplatesSection from "@/components/templates/TemplatesSection";
import PricingSection from "@/components/pricing/PricingSection";
import LeadFormSection from "@/components/forms/LeadFormSection";

gsap.registerPlugin(ScrollTrigger);

function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glowRef.current) return;
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;

    const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 150);
      yTo(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-[100]"
      style={{
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(74, 222, 128, 0.08) 0%, transparent 70%)",
        borderRadius: "50%",
        willChange: "transform",
        transform: "translate3d(-300px, -300px, 0)",
      }}
    />
  );
}

function AmbientParticles() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <motion.div style={{ y }} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#4ade80]/40 shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-ambient-float"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            '--float-duration': `${4 + i * 0.5}s`,
            '--float-delay': `${i * 0.3}s`,
          } as React.CSSProperties}
        />
      ))}
    </motion.div>
  );
}

function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={cn("relative h-24 overflow-hidden", className)}>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[1.5px] h-full bg-gradient-to-b from-transparent via-[#4ade80]/40 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#14532d]/40 backdrop-blur-sm border border-[#4ade80]/40"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
    </div>
  );
}

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
            <stop offset="0%" stopColor="rgba(74, 222, 128, 0)" />
            <stop offset="50%" stopColor="rgba(74, 222, 128, 0.6)" />
            <stop offset="100%" stopColor="rgba(74, 222, 128, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll Velocity Skew Effect
    let proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".skew-container", "skewY", "deg"),
      clamp = gsap.utils.clamp(-5, 5); // Limit the maximum skew to 5 degrees

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
    
    // Smoothly reset on resize
    window.addEventListener("resize", () => skewSetter(0));
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative overflow-hidden skew-container">
      {/* Ambient effects - PRESERVED */}
      <MouseGlow />
      <AmbientParticles />
      <GiantJungleTree />
      <InteractiveAnimals />

      {/* 1. Mistake Section - PAGE 2 wireframe - REPLACED UI */}
      <ScrollTransition effect="depth-pull">
        <div className="relative -mt-10 lg:-mt-20">
          <MistakeSection />
        </div>
      </ScrollTransition>

      <SectionDivider className="-mt-10" />

      {/* 2. Services Section - REPLACED UI */}
      <div id="services-section" className="content-lazy">
        <ServicesSection />
      </div>

      <AnimatedPath id="path1" />

      {/* 3. Portfolio & Templates - REPLACED UI */}
      <section className="relative w-full overflow-hidden content-lazy">
        <PortfolioSection />
        <TemplatesSection />
      </section>

      <SectionDivider className="my-10" />

      {/* 4. Blueprint Button - PRESERVED */}
      <ScrollReveal className="w-full relative z-20 mb-12">
        <NextPageButton label="EXPLORE TEMPLATES" href="/explore" />
      </ScrollReveal>

      <AnimatedPath id="path2" />

      {/* 5. Pricing & Lead Form - REPLACED UI */}
      <ScrollTransition effect="zoom-in">
        <PricingSection />
      </ScrollTransition>
      <ScrollTransition effect="fade-slide">
        <LeadFormSection />
      </ScrollTransition>

      {/* Final section divider */}
      <SectionDivider />

      {/* 6. Refer and Earn - PRESERVED */}
      <ScrollReveal className="mt-6 md:mt-10">
        <FlashText />
      </ScrollReveal>
    </div>
  );
}
