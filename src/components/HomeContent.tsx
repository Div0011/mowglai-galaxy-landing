"use client";

import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2, Search, Bot, Cpu } from "lucide-react";
import SelectedWork from "@/components/SelectedWork";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import ConsultationForm from "@/components/ConsultationForm";
import NextPageButton from "@/components/NextPageButton";
import InteractiveSetupSection from "@/components/InteractiveSetupSection";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LuminaSprout from "@/components/interactive/LuminaSprout";

gsap.registerPlugin(ScrollTrigger);

const StartupGrowthSection = dynamic(() => import("@/components/StartupGrowthSection"), { ssr: false });

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

function InteractiveButton({
    href,
    children,
    variant = "primary",
    icon: Icon = ArrowRight
}: {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    icon?: React.ComponentType<{ className?: string }>;
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
                    <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-500"
                        initial={{ x: "-100%", opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />

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

function FloatingTemplatesButton() {
    const [visible, setVisible] = useState(true);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: (e.clientX / window.innerWidth) * 20 - 10,
                y: (e.clientY / window.innerHeight) * 20 - 10
            });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: "#templates-showcase-section",
            start: "top 80%",
            onEnter: () => setVisible(false),
            onLeaveBack: () => setVisible(true),
        });
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-10 right-10 z-50"
                    style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                >
                    <Magnetic>
                        <Link
                            href="/explore"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 bg-primary text-primary-foreground hover:shadow-[0_0_50px_rgba(230,185,61,0.4)]"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 flex items-center gap-3">
                                EXPLORE TEMPLATES
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    </Magnetic>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function HomeContent() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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
            <MouseGlow />
            <AmbientParticles />
            <FloatingTemplatesButton />

            <section id="our-services-section" className="relative w-full py-16 md:py-24 z-20 overflow-hidden content-visibility-auto gpu-accelerate">
                <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col gap-8 md:gap-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <ScrollReveal direction="left" className="space-y-2">
                            <div className="flex items-center gap-3 text-primary font-display font-bold text-xs tracking-[0.4em] uppercase">
                                <div className="w-10 h-[1.5px] bg-primary" />
                                Capabilities
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-foreground uppercase leading-none">
                                Our <span className="text-primary italic">Services</span>
                            </h2>
                            <p className="text-foreground/75 text-sm md:text-base font-normal max-w-md leading-relaxed">
                                Hyper-optimized digital solutions engineered for the next era of organic search and discovery.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal direction="right" delay={0.2} className="shrink-0 -my-4 scale-75 md:scale-90">
                            <LuminaSprout />
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                        {[
                            {
                                title: "Website Development",
                                desc: "Bespoke high-performance web systems engineered with React, Next.js, and advanced 3D transitions.",
                                icon: <Code2 className="w-6 h-6 text-primary" />,
                                glow: "group-hover/tile:shadow-[0_0_30px_rgba(230,185,61,0.12)]",
                                border: "group-hover/tile:border-primary/30",
                            },
                            {
                                title: "SEO Optimization",
                                desc: "Precision crawling, semantic architecture, and visibility indexing to position your brand at the summit.",
                                icon: <Search className="w-6 h-6 text-emerald-500" />,
                                glow: "group-hover/tile:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
                                border: "group-hover/tile:border-emerald-500/30",
                            },
                            {
                                title: "GEO (Generative Engine)",
                                desc: "Optimizing structure and authority to rank as the primary answer source in AI systems like ChatGPT & Perplexity.",
                                icon: <Bot className="w-6 h-6 text-indigo-500" />,
                                glow: "group-hover/tile:shadow-[0_0_30px_rgba(99,102,241,0.12)]",
                                border: "group-hover/tile:border-indigo-500/30",
                            },
                            {
                                title: "AEO (Answer Engine)",
                                desc: "Optimizing content for voice search, smart virtual assistants, and instant zero-click answer boxes.",
                                icon: <Cpu className="w-6 h-6 text-amber-500" />,
                                glow: "group-hover/tile:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
                                border: "group-hover/tile:border-amber-500/30",
                            },
                        ].map((service, idx) => (
                            <ScrollReveal
                                key={idx}
                                direction="up"
                                delay={idx * 0.1}
                                className="group/tile relative p-5 md:p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:translate-y-[-2px] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover/tile:opacity-100 transition-opacity duration-500" />
                                <div className={cn("absolute inset-0 rounded-2xl border border-transparent transition-all duration-500", service.border, service.glow)} />

                                <div className="relative z-10 flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 group-hover/tile:border-white/10 group-hover/tile:bg-white/[0.06] transition-all duration-500">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-display font-black tracking-tight text-foreground uppercase">
                                        {service.title}
                                    </h3>
                                </div>

                                <p className="relative z-10 text-foreground/75 text-sm md:text-base font-normal leading-relaxed">
                                    {service.desc}
                                </p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services button placed between Our Services section and Launch Faster with Mowglai section */}
            <div className="relative z-20 -mt-14 md:-mt-20 mb-4">
                <NextPageButton
                    href="/services"
                    label="SERVICES"
                    className="h-[120px] md:h-[140px]"
                />
            </div>

            <section id="services-section" className="relative w-full py-16 z-20 content-visibility-auto gpu-accelerate">
                <StartupGrowthSection />
            </section>

            <section id="our-work-section" className="relative w-full pt-12 pb-8 z-20 content-visibility-auto gpu-accelerate">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-4 space-y-4">
                            <ScrollReveal direction="left" className="space-y-4">
                                <div className="flex items-center gap-3 text-primary font-display font-bold text-xs tracking-[0.4em] uppercase">
                                    <div className="w-10 h-[1.5px] bg-primary" />
                                    Portfolio
                                </div>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-normal text-foreground uppercase leading-[1.25] pb-2">
                                    Our <br />Selected{" "}<span className="text-primary italic">Works</span>
                                </h2>
                                <p className="text-foreground/75 text-sm md:text-base font-normal leading-relaxed border-l border-primary/20 pl-4 max-w-xs">
                                    A showcase of digital products and client ecosystems.
                                </p>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-8">
                            <ScrollReveal direction="up" className="w-full">
                                <SelectedWork />
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Templates Button — between work and templates */}
            <div className="relative z-20">
                <NextPageButton
                    href="/explore"
                    label="TEMPLATES"
                    className="h-[160px] md:h-[180px]"
                />
            </div>

            <section id="templates-showcase-section" className="relative w-full pt-8 pb-12 z-20 content-visibility-auto gpu-accelerate">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-8 order-2 lg:order-1">
                            <ScrollReveal direction="up" className="w-full">
                                <TemplatesShowcase />
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-4 order-1 lg:order-2 space-y-4">
                            <ScrollReveal direction="right" className="space-y-4">
                                <div className="flex items-center gap-3 text-primary font-display font-bold text-xs tracking-[0.4em] uppercase justify-start lg:justify-end">
                                    <div className="w-10 h-[1.5px] bg-primary lg:hidden" />
                                    Marketplace
                                    <div className="w-10 h-[1.5px] bg-primary hidden lg:block" />
                                </div>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-normal text-foreground uppercase leading-[1.25] text-left lg:text-right pr-4 lg:pr-6 pb-2">
                                    Selected <br /><span className="text-primary italic">Templates</span>
                                </h2>
                                <p className="text-foreground/75 text-sm md:text-base font-normal leading-relaxed border-l lg:border-l-0 lg:border-r border-primary/20 pl-4 lg:pl-0 lg:pr-4 text-left lg:text-right max-w-xs lg:ml-auto">
                                    Production-ready systems, crafted with world-class aesthetics.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            <InteractiveSetupSection />



            {/* Centered Our Story section */}
            <div className="pt-2 pb-6 relative z-20">
                <NextPageButton
                    href="/about"
                    label="ABOUT"
                    className="h-[160px] md:h-[180px]"
                />
            </div>
        </div>
    );
}