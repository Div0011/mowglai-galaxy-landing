"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Palette,
    Layers,
    Sparkles,
    Smartphone,
    Eye,
    Wand2,
    Compass,
    Boxes,
    ArrowRight,
    CheckCircle2,
    Sliders,
    Monitor,
    ChevronDown,
    ChevronUp,
    Layout,
    Maximize2
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";

const themePresets = [
    {
        id: "emerald",
        name: "Emerald Jungle",
        primary: "#10b981",
        glow: "rgba(16, 185, 129, 0.25)",
        gradient: "from-emerald-400 via-teal-300 to-green-500",
        accentText: "text-emerald-400",
        border: "border-emerald-500/30"
    },
    {
        id: "cosmic",
        name: "Cosmic Violet",
        primary: "#8b5cf6",
        glow: "rgba(139, 92, 246, 0.25)",
        gradient: "from-purple-400 via-violet-300 to-indigo-500",
        accentText: "text-purple-400",
        border: "border-purple-500/30"
    },
    {
        id: "cyan",
        name: "Neon Cyber",
        primary: "#06b6d4",
        glow: "rgba(6, 182, 212, 0.25)",
        gradient: "from-cyan-400 via-sky-300 to-blue-500",
        accentText: "text-cyan-400",
        border: "border-cyan-500/30"
    },
    {
        id: "amber",
        name: "Solar Gold",
        primary: "#f59e0b",
        glow: "rgba(245, 158, 11, 0.25)",
        gradient: "from-amber-400 via-yellow-300 to-orange-500",
        accentText: "text-amber-400",
        border: "border-amber-500/30"
    }
];

const capabilities = [
    {
        icon: Palette,
        title: "Bespoke Brand & UI Systems",
        description: "Pixel-perfect visual identities, modular token systems, scalable typography scales, and custom icon sets crafted exclusively for your brand."
    },
    {
        icon: Sparkles,
        title: "3D & Spatial Web Experiences",
        description: "Immersive WebGL, Three.js shaders, interactive 3D assets, and spatial soundscapes that turn standard pages into unforgettable digital experiences."
    },
    {
        icon: Wand2,
        title: "Fluid Motion & Scrollytelling",
        description: "GSAP timeline choreography, smooth Lenis momentum scrolling, dynamic scroll triggers, and cinematic reveals that guide user focus seamlessly."
    },
    {
        icon: Smartphone,
        title: "Mobile-First & Fluid Layouts",
        description: "Carefully engineered touch gestures, bottom-sheet navigations, dynamic viewport unit handling, and notch/safe-area optimization."
    },
    {
        icon: Eye,
        title: "UX Research & Conversion Design",
        description: "User journey mapping, high-intent wireframing, cognitive load reduction, and micro-copy engineered to maximize sales conversions."
    },
    {
        icon: Boxes,
        title: "Figma-To-Code Precision",
        description: "Zero design drift. Every spacing token, bezier curve, and responsive breakpoint is translated 1:1 into clean React/Next.js components."
    }
];

const designSteps = [
    {
        num: "01",
        title: "Creative Discovery & Moodboarding",
        description: "We deconstruct your brand narrative, analyze competitors, and curate spatial moodboards defining tone, colors, and motion physics."
    },
    {
        num: "02",
        title: "Information Architecture & UX Wireframes",
        description: "Low-fidelity structural maps and user flows designed to remove friction and direct visitor intent toward conversion triggers."
    },
    {
        num: "03",
        title: "High-Fidelity Visual & Motion Prototyping",
        description: "Interactive Figma prototypes with realistic animations, glassmorphic textures, 3D mockups, and micro-interactions."
    },
    {
        num: "04",
        title: "Design Tokens & Engineering Handoff",
        description: "Exporting production-ready component libraries, SVG assets, CSS variables, and design specs for seamless Next.js implementation."
    }
];

const faqs = [
    {
        q: "What makes Mowglai's web design distinct from typical agencies?",
        a: "We don't use cookie-cutter templates. Every layout is an original bespoke digital artwork merging 3D spatial aesthetics, dark cinematic contrast, and high-conversion UX designed to produce an immediate 'wow' effect."
    },
    {
        q: "Do you design for mobile devices and tablets first?",
        a: "Yes. Over 65% of modern web traffic is mobile. We design mobile-first interfaces with thumb-friendly controls, swipe gestures, and fluid typography scales that adapt effortlessly to any screen resolution."
    },
    {
        q: "Can you redesign our existing brand and create a full design system?",
        a: "Absolutely. We provide full brand identity refreshes including typography pairings, color systems, component libraries, UI kits, and comprehensive Figma design system files."
    },
    {
        q: "How do you ensure heavy visual designs don't slow down the website?",
        a: "We practice performance-conscious design: CSS hardware acceleration, lazy-loading 3D canvases, Next.js image optimization, and vector graphics to ensure 95+ Google Lighthouse scores."
    }
];

export default function WebDesignClient() {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [glassIntensity, setGlassIntensity] = useState(24);
    const [glowEnabled, setGlowEnabled] = useState(true);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const activeTheme = themePresets[selectedTheme];

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-12 lg:px-24 py-32 font-sans relative overflow-hidden">
                {/* Ambient Glows */}
                <div
                    className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none -mr-20 -mt-20 transition-all duration-700"
                    style={{ backgroundColor: activeTheme.glow }}
                />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[130px] pointer-events-none -ml-20" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
                    >
                        <Palette className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.3em]">
                            Service 02 / Web Design
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-b border-primary/20 pb-16">
                        <div className="lg:col-span-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25] flex flex-col gap-2 sm:gap-3"
                            >
                                <span>Aesthetic</span>
                                <span className="text-primary italic">Excellence & UI/UX</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-3xl"
                            >
                                We craft visual narratives that merge raw artistic expression with clinical functional precision. Breathtaking spatial typography, fluid micro-interactions, and immersive design systems.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
                            <Magnetic>
                                <Link
                                    href="/contact?subject=Bespoke%20Web%20Design%20Project"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_35px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    Start Design Project
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                Award-Winning Craft • Pixel Perfection • 3D Spatial
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interactive Design System Sandbox */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-secondary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-primary/10">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
                                    <Sliders className="w-3.5 h-3.5" /> Interactive Design Token Inspector
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[1.25] sm:leading-[1.3] mt-2">
                                    Live Theme & Spatial Contrast Studio
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {themePresets.map((preset, i) => (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => setSelectedTheme(i)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2",
                                            selectedTheme === i
                                                ? "bg-foreground text-background shadow-lg scale-105"
                                                : "bg-background/40 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30"
                                        )}
                                    >
                                        <span
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: preset.primary }}
                                        />
                                        {preset.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sandbox Interactive Workspace */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
                            {/* Controls Left */}
                            <div className="lg:col-span-5 space-y-6 p-6 rounded-2xl bg-background/40 border border-primary/15">
                                <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                                    Spatial Parameters
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                                        <span>Glassmorphic Backdrop Blur</span>
                                        <span>{glassIntensity}px</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="4"
                                        max="48"
                                        value={glassIntensity}
                                        onChange={(e) => setGlassIntensity(Number(e.target.value))}
                                        className="w-full accent-primary cursor-pointer"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-xs font-mono text-muted-foreground uppercase">
                                        Cosmic Ambient Glow
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setGlowEnabled(!glowEnabled)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-xs font-bold font-mono transition-all",
                                            glowEnabled
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary/40 text-muted-foreground"
                                        )}
                                    >
                                        {glowEnabled ? "Active" : "Disabled"}
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-primary/10">
                                    <div className="text-[11px] font-mono text-muted-foreground uppercase mb-2">
                                        Active Token Spec
                                    </div>
                                    <div className="p-3 rounded-xl bg-background/80 border border-primary/10 text-xs font-mono text-foreground space-y-1">
                                        <div><span className="text-muted-foreground">--primary:</span> {activeTheme.primary}</div>
                                        <div><span className="text-muted-foreground">--backdrop-filter:</span> blur({glassIntensity}px)</div>
                                        <div><span className="text-muted-foreground">--elevation:</span> 0 25px 50px -12px {glowEnabled ? activeTheme.glow : "none"}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Live Reactive Card Preview Right */}
                            <div className="lg:col-span-7 flex justify-center p-4">
                                <div
                                    className={cn(
                                        "w-full max-w-lg rounded-[2rem] p-8 sm:p-10 border transition-all duration-500 relative overflow-hidden",
                                        activeTheme.border
                                    )}
                                    style={{
                                        backdropFilter: `blur(${glassIntensity}px)`,
                                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                                        boxShadow: glowEnabled ? `0 25px 60px -15px ${activeTheme.glow}` : "none"
                                    }}
                                >
                                    <div className="flex items-center justify-between pb-6 border-b border-primary/15">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                                        </div>
                                        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                            UI Prototype Preview
                                        </span>
                                    </div>

                                    <div className="mt-8 space-y-4">
                                        <span
                                            className={cn(
                                                "text-xs font-bold uppercase tracking-[0.3em] block",
                                                activeTheme.accentText
                                            )}
                                        >
                                            Next-Gen Digital Artifact
                                        </span>
                                        <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-foreground leading-snug">
                                            Spatial Interface for The Modern Web
                                        </h3>
                                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                            Every micro-interaction and spacing token calibrated for maximum emotional impact and fluid user retention.
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-primary/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                                                M
                                            </div>
                                            <span className="text-xs font-mono text-foreground font-semibold">
                                                Mowglai Design System
                                            </span>
                                        </div>
                                        <span
                                            className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-black font-display"
                                            style={{ backgroundColor: activeTheme.primary }}
                                        >
                                            Live Token
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Capabilities Grid */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                            Capabilities
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                            Design That Dominates <span className="text-primary italic">Attention</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {capabilities.map((cap, idx) => {
                            const IconComponent = cap.icon;
                            return (
                                <motion.div
                                    key={cap.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="p-8 rounded-[2rem] bg-secondary/10 border border-primary/10 hover:border-primary/40 hover:bg-secondary/20 transition-all duration-500 group backdrop-blur-xl"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-500">
                                        <IconComponent className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-display font-bold uppercase mb-3 text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {cap.title}
                                    </h3>
                                    <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed">
                                        {cap.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* 4-Step Design Workflow */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-secondary/10 border border-primary/15 backdrop-blur-xl">
                        <div className="max-w-3xl mb-16">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                                Creative Process
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                                From Creative Concept To Finished Prototype
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {designSteps.map((step) => (
                                <div
                                    key={step.num}
                                    className="p-6 rounded-2xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 relative group"
                                >
                                    <div className="text-4xl sm:text-5xl font-display font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-4">
                                        {step.num}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-display font-bold uppercase mb-2 text-foreground leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tooling & Design Stack */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32 text-center">
                    <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-6">
                        Design Arsenal
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase mb-10 text-foreground leading-[1.25]">
                        Industry-Leading Creative Tools
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
                        {[
                            "Figma & Tokens Studio",
                            "Spline 3D",
                            "Three.js & WebGL",
                            "GSAP Motion Suite",
                            "Framer Motion",
                            "Blender 3D",
                            "Tailwind CSS",
                            "Lucide & Custom SVG",
                            "Adobe After Effects",
                            "ColorBox & HSL Systems"
                        ].map((tool) => (
                            <span
                                key={tool}
                                className="px-5 py-2.5 rounded-full border border-primary/20 bg-background/40 text-foreground font-mono text-xs sm:text-sm tracking-wider hover:border-primary hover:bg-primary/10 transition-all"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="relative z-10 max-w-5xl mx-auto mb-32">
                    <div className="text-center mb-12">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-3">
                            Questions
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black uppercase leading-[1.2] sm:leading-[1.25]">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-primary/15 bg-secondary/10 overflow-hidden backdrop-blur-md transition-all"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-primary/5 transition-colors"
                                    >
                                        <span className="text-base sm:text-lg font-display font-bold uppercase text-foreground">
                                            {faq.q}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-6 pb-6 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-primary/10 pt-4"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Next Page Navigator */}
                <div className="relative z-10 max-w-7xl mx-auto pt-10">
                    <NextPageButton
                        label="DEVELOPMENT"
                        href="/services/web-development"
                        tagline="Explore Next Service (03)"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
