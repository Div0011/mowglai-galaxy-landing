/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";


import OriginalLayout from "@/styles/original/Layout";
import HeroSection from "@/components/HeroSection";
import HowWeBuiltSection from "@/components/HowWeBuiltSection";
import StartupGrowthSection from "@/components/StartupGrowthSection";
import SelectedWork from "@/components/SelectedWork";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import NextPageButton from "@/components/NextPageButton";
import FlashText from "@/components/FlashText";
import GiantJungleTree from "@/components/GiantJungleTree";
import InteractiveAnimals from "@/components/InteractiveAnimals";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import dynamic from "next/dynamic";

// Lazy-load heavy/interactive components
const JungleLamp       = dynamic(() => import("@/components/interactive/JungleLamp"),       { ssr: false });
const HiddenEyes       = dynamic(() => import("@/components/interactive/HiddenEyes"),       { ssr: false });
const GlowingMushrooms = dynamic(() => import("@/components/interactive/GlowingMushrooms"), { ssr: false });

// Import landing page sections
import ServicesSection  from "@/components/services/ServicesSection";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
import PricingSection   from "@/components/pricing/PricingSection";
import LeadFormSection  from "@/components/forms/LeadFormSection";

gsap.registerPlugin(ScrollTrigger);

// ── Section Divider ──────────────────────────────────────────────
function SectionDivider({ className = "" }: { className?: string }) {
    return (
        <div className={`relative h-24 overflow-hidden ${className}`}>
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

// ── Scroll Reveal ────────────────────────────────────────────────
function ScrollReveal({
    children,
    delay = 0,
    direction = "up",
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}) {
    const dirs = { up: { y: 60, x: 0 }, down: { y: -60, x: 0 }, left: { y: 0, x: 60 }, right: { y: 0, x: -60 } };
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...dirs[direction] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

// ── Animated SVG Path connector ──────────────────────────────────
function AnimatedPath({ id = "pathDefault" }: { id?: string }) {
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
                scrollTrigger: { trigger: pathRef.current, start: "top 85%", toggleActions: "play none none reverse" },
            }
        );
    }, []);
    return (
        <div className="relative h-32 w-full overflow-hidden opacity-40">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
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

// ── Ambient Particles (pure CSS, GPU composited) ─────────────────
function AmbientParticles() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-[#4ade80]/40 shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-ambient-float"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        "--float-duration": `${4 + i * 0.5}s`,
                        "--float-delay": `${i * 0.3}s`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}

// ── Main Combined Home ───────────────────────────────────────────
export default function CombinedHome() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".reveal-card") as HTMLElement[];
        cards.forEach((card) => {
            gsap.fromTo(
                card,
                { y: 80, opacity: 0, rotateX: 15 },
                {
                    y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
                }
            );
        });
    }, []);

    return (
        <OriginalLayout>
            {/* ── 0. Hero with Lamp decoration ── */}
            <div className="relative w-full">
                <HeroSection />
                {/* Hanging lamp — top-right of hero */}
                <div className="absolute top-0 right-[8%] z-10 hidden lg:flex">
                    <JungleLamp />
                </div>
            </div>

            {/* ── Content Body ── */}
            <div ref={containerRef} className="relative">
                <AmbientParticles />
                <GiantJungleTree />
                <InteractiveAnimals />

                {/* ── 1. How We Build ── */}
                <div className="relative -mt-10 lg:-mt-20">
                    <HowWeBuiltSection />
                </div>

                <SectionDivider className="-mt-10" />

                {/* ── 2. Startup Growth / Value Prop ── */}
                <div id="services-section" className="content-lazy">
                    <StartupGrowthSection />
                </div>

                {/* ── Glowing mushrooms as section divider ── */}
                <div className="relative z-10 py-4">
                    <GlowingMushrooms />
                </div>

                {/* ── 3. Services (from landing page) with Hidden Eyes ── */}
                <div id="services" className="relative">
                    <HiddenEyes />
                    <ServicesSection />
                </div>

                <SectionDivider />

                {/* ── 4. Portfolio (from landing page) ── */}
                <div id="portfolio">
                    <PortfolioSection />
                </div>

                <AnimatedPath id="path-combined-2" />

                {/* ── 5. Selected Work + Templates Showcase ── */}
                <section className="relative w-full py-20 overflow-hidden content-lazy">
                    <div className="container mx-auto px-6">
                        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-6xl mx-auto">
                            <ScrollReveal direction="left" className="space-y-4">
                                <div className="flex items-center gap-3 text-primary font-display font-bold text-xs tracking-[0.4em] uppercase">
                                    <div className="w-10 h-[1.5px] bg-primary" />
                                    Showcase
                                </div>
                                <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-foreground uppercase leading-[1.2]">
                                    Our <span className="text-jungle-emerald italic inline-block pr-[0.15em]">Works</span> &{" "}
                                    <br className="mb-2" />High-End{" "}
                                    <span className="text-jungle-gold italic inline-block pr-[0.15em]">Templates</span>
                                </h2>
                            </ScrollReveal>
                            <ScrollReveal direction="right" delay={0.2}>
                                <p className="text-foreground/50 text-base font-light max-w-sm leading-relaxed border-l border-primary/20 pl-6">
                                    A dual perspective on digital excellence: bespoke client projects and production-ready systems.
                                </p>
                            </ScrollReveal>
                        </div>

                        <div className="relative max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                                <ScrollReveal direction="up" className="h-full">
                                    <div className="relative h-full transition-all duration-500 hover:translate-y-[-10px]">
                                        <SelectedWork />
                                    </div>
                                </ScrollReveal>
                                <ScrollReveal direction="up" delay={0.2} className="h-full">
                                    <div className="relative h-full transition-all duration-500 hover:translate-y-[-10px]">
                                        <TemplatesShowcase />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </section>

                <SectionDivider className="my-10" />

                {/* ── 6. Next Page Button ── */}
                <ScrollReveal className="w-full relative z-20 mb-12">
                    <NextPageButton label="EXPLORE TEMPLATES" href="/explore" />
                </ScrollReveal>

                <AnimatedPath id="path-combined-3" />

                {/* ── 7. Pricing (from landing page) ── */}
                <div id="pricing">
                    <PricingSection />
                </div>

                <SectionDivider />

                {/* ── 8. Ready to Build CTA ── */}
                <section className="relative w-full py-16 z-20">
                    <div className="container mx-auto px-6">
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
                                Ready to build?
                            </motion.span>
                            <p className="text-sm md:text-base text-muted-foreground/60 mt-3">
                                Transform your vision into reality with Mowglai
                            </p>
                        </ScrollReveal>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            <Magnetic>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/custom-request"
                                        className="group relative inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 bg-card/40 backdrop-blur-md border border-[#F5D061]/20 text-[#F5D061] hover:shadow-[0_0_40px_rgba(245,208,97,0.3)]"
                                    >
                                        <motion.span className="absolute inset-0 bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#F5D061]" initial={{ x: "-100%", opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                                        <span className="relative z-10 flex items-center gap-3">
                                            Start a project
                                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                                                <ArrowRight className="w-5 h-5" />
                                            </motion.span>
                                        </span>
                                    </Link>
                                </motion.div>
                            </Magnetic>

                            <Magnetic>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        href="/about"
                                        className="group relative inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 bg-background/10 backdrop-blur-xl border border-primary/10 text-primary hover:border-primary/50"
                                    >
                                        <motion.span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#14532d]" initial={{ x: "-100%", opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                                        <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-primary-foreground">
                                            Our story
                                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                                                <ArrowUpRight className="w-5 h-5" />
                                            </motion.span>
                                        </span>
                                    </Link>
                                </motion.div>
                            </Magnetic>
                        </div>
                    </div>
                </section>

                <SectionDivider />

                {/* ── 9. Lead Form (from landing page) ── */}
                <div id="contact">
                    <LeadFormSection />
                </div>

                <SectionDivider />

                {/* ── 10. Referral Banner ── */}
                <ScrollReveal className="mt-6 md:mt-10">
                    <FlashText />
                </ScrollReveal>
            </div>
        </OriginalLayout>
    );
}
