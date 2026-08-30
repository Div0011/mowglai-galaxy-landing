"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    RefreshCw,
    Zap,
    TrendingUp,
    ShieldCheck,
    Search,
    Layout,
    Sparkles,
    Layers,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Sliders,
    ChevronDown,
    ChevronUp,
    Gauge,
    ShieldAlert
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";

const comparisonData = {
    legacy: {
        title: "Legacy Monolith Stack",
        subtitle: "WordPress / PHP 7 / Unoptimized jQuery / Bloated Plugins",
        loadTime: "4.8s",
        lighthouse: "38/100",
        bounceRate: "68%",
        seoHealth: "Fragmented URLs & Slow Crawls",
        security: "Vulnerable Plugin Exploits & Patching Fatigue",
        uxScore: "Cluttered, Outdated, Poor Mobile Support",
        techPills: ["Heavy PHP", "15+ Plugins", "Unminified JS", "Slow Shared Hosting", "No Edge Caching"]
    },
    modern: {
        title: "Modern Mowglai Architecture",
        subtitle: "Next.js 16 / React 19 / TypeScript / Tailwind CSS / Global Edge",
        loadTime: "0.4s (12x Faster)",
        lighthouse: "99/100 (Flawless)",
        bounceRate: "19% (High Retention)",
        seoHealth: "Instant SSR & Dynamic Structured Data",
        security: "Zero Attack Surface & Static Edge Isolation",
        uxScore: "Award-Winning 3D Spatial & Fluid Motion",
        techPills: ["React Server Components", "Zero Plugin Overhead", "Sub-Millisecond Edge", "TypeScript Strict", "Tailwind CSS v4"]
    }
};

const capabilities = [
    {
        icon: Layout,
        title: "Complete Visual & Spatial Modernization",
        description: "Transform tired, dated interfaces into sleek, dark-mode cosmic masterpieces with smooth micro-interactions and contemporary typography."
    },
    {
        icon: Zap,
        title: "Sub-Second Speed Overhaul",
        description: "Eradicate slow load times. We refactor monolithic asset delivery into modern edge-cached streaming HTML for instantaneous rendering."
    },
    {
        icon: Search,
        title: "Zero-Loss SEO Migration",
        description: "Complete preservation of your domain authority with exhaustive 301 redirect mapping, canonical tag audits, and structured schema implementation."
    },
    {
        icon: ShieldCheck,
        title: "Zero-Vulnerability Architecture",
        description: "Replace vulnerable PHP plugins and insecure admin portals with headless architectures, tokenized auth, and hardened static edge deployments."
    },
    {
        icon: TrendingUp,
        title: "Conversion Rate Optimization (CRO)",
        description: "Re-engineer user journeys with high-clarity value propositions, frictionless forms, and mobile-first thumb navigation to skyrocket leads."
    },
    {
        icon: Layers,
        title: "Flawless Data & Content Migration",
        description: "Seamlessly extract, sanitize, and port thousands of blog posts, customer profiles, and product catalogues without a single second of downtime."
    }
];

const redesignSteps = [
    {
        num: "01",
        title: "Comprehensive Code & UX Audit",
        description: "We analyze your existing platform's bottlenecks, SEO rankings, bounce rates, and architectural weaknesses."
    },
    {
        num: "02",
        title: "Modern Spatial UI/UX Blueprint",
        description: "We create high-fidelity interactive prototypes showcasing your revamped brand aesthetic, layout hierarchy, and motion physics."
    },
    {
        num: "03",
        title: "Next.js 16 Full-Stack Migration",
        description: "We engineer the new platform on Next.js, migrate all existing database contents, and configure automated redirects."
    },
    {
        num: "04",
        title: "SEO-Preserved Production Switch",
        description: "Zero-downtime DNS cutover with real-time Google Search Console indexing verification and performance telemetry."
    }
];

const faqs = [
    {
        q: "Will our Google search rankings drop when we redesign the website?",
        a: "No. We implement an exhaustive SEO migration strategy including 1:1 301 URL redirect maps, XML sitemap re-indexing, structured data schema, and Core Web Vitals score improvements that typically result in immediate ranking gains."
    },
    {
        q: "How long does a full website redesign and migration take?",
        a: "A typical full redesign and modern Next.js migration takes between 3 to 6 weeks, depending on the number of pages, custom integrations, and data volume."
    },
    {
        q: "Can you migrate all our existing blog posts and customer data?",
        a: "Yes. We write custom automated migration scripts to extract and port all existing articles, images, metadata, and user accounts directly into your new modern database or headless CMS."
    },
    {
        q: "Will our team be able to edit content easily after the redesign?",
        a: "Yes. We provide modern, user-friendly headless CMS solutions (such as Sanity, Strapi, or Supabase) with live visual previews and effortless editorial controls."
    }
];

export default function WebsiteRedesignClient() {
    const [viewMode, setViewMode] = useState<"comparison" | "legacy" | "modern">("comparison");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-12 lg:px-24 py-32 font-sans relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -mr-20 -mt-20 animate-pookie-float" />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none -ml-20" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
                    >
                        <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.3em]">
                            Service 05 / Redesign
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
                                <span>Digital</span>
                                <span className="text-primary italic">Evolution & Modernization</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-3xl"
                            >
                                Breathing new life into legacy platforms. We transform slow, outdated websites into blazing-fast, award-winning Next.js experiences with zero SEO rank loss and 10x higher user retention.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
                            <Magnetic>
                                <Link
                                    href="/contact?subject=Website%20Redesign%20%26%20Modernization"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_35px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    Evolve Your Website
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                12x Speed Boost • Zero SEO Loss • Modern UI
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interactive Legacy vs Modern Comparison Bench */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-secondary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-primary/10">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
                                    <Gauge className="w-3.5 h-3.5" /> Performance & Modernization Benchmark
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[1.25] sm:leading-[1.3] mt-2">
                                    Legacy Platform vs Mowglai Modern
                                </h2>
                            </div>

                            <div className="flex gap-2">
                                {(["comparison", "legacy", "modern"] as const).map((mode) => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setViewMode(mode)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                            viewMode === mode
                                                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                                : "bg-background/40 text-muted-foreground hover:text-foreground border border-primary/10"
                                        )}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Benchmark Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-stretch">
                            {/* Legacy Card */}
                            {(viewMode === "comparison" || viewMode === "legacy") && (
                                <div className="p-6 sm:p-8 rounded-[2rem] bg-red-950/20 border border-red-500/20 backdrop-blur-xl relative overflow-hidden space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="px-3.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-mono font-bold uppercase">
                                            Outdated Architecture
                                        </span>
                                        <ShieldAlert className="w-5 h-5 text-red-400" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-foreground leading-snug">
                                            {comparisonData.legacy.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                            {comparisonData.legacy.subtitle}
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-red-500/10 text-xs font-mono">
                                            <span className="text-muted-foreground">Load Velocity</span>
                                            <span className="text-red-400 font-bold">{comparisonData.legacy.loadTime}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-red-500/10 text-xs font-mono">
                                            <span className="text-muted-foreground">Lighthouse Score</span>
                                            <span className="text-red-400 font-bold">{comparisonData.legacy.lighthouse}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-red-500/10 text-xs font-mono">
                                            <span className="text-muted-foreground">Mobile Bounce Rate</span>
                                            <span className="text-red-400 font-bold">{comparisonData.legacy.bounceRate}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-red-500/10 text-xs font-mono">
                                            <span className="text-muted-foreground">Security Posture</span>
                                            <span className="text-red-400 font-bold truncate max-w-[200px]">{comparisonData.legacy.security}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {comparisonData.legacy.techPills.map((pill) => (
                                            <span
                                                key={pill}
                                                className="px-3 py-1 rounded-full bg-red-500/5 text-red-300 text-[11px] font-mono border border-red-500/10"
                                            >
                                                {pill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Modern Mowglai Card */}
                            {(viewMode === "comparison" || viewMode === "modern") && (
                                <div className="p-6 sm:p-8 rounded-[2rem] bg-emerald-950/20 border border-emerald-500/30 backdrop-blur-xl relative overflow-hidden space-y-6 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                                    <div className="flex items-center justify-between">
                                        <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase">
                                            Mowglai Next-Gen
                                        </span>
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    </div>

                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-foreground leading-snug">
                                            {comparisonData.modern.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                            {comparisonData.modern.subtitle}
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-emerald-500/20 text-xs font-mono">
                                            <span className="text-muted-foreground">Load Velocity</span>
                                            <span className="text-emerald-400 font-bold">{comparisonData.modern.loadTime}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-emerald-500/20 text-xs font-mono">
                                            <span className="text-muted-foreground">Lighthouse Score</span>
                                            <span className="text-emerald-400 font-bold">{comparisonData.modern.lighthouse}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-emerald-500/20 text-xs font-mono">
                                            <span className="text-muted-foreground">Mobile Bounce Rate</span>
                                            <span className="text-emerald-400 font-bold">{comparisonData.modern.bounceRate}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-xl bg-background/40 border border-emerald-500/20 text-xs font-mono">
                                            <span className="text-muted-foreground">Security Posture</span>
                                            <span className="text-emerald-400 font-bold truncate max-w-[200px]">{comparisonData.modern.security}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {comparisonData.modern.techPills.map((pill) => (
                                            <span
                                                key={pill}
                                                className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] font-mono border border-emerald-500/20"
                                            >
                                                {pill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Core Capabilities Grid */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                            Modernization Capabilities
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                            Elevating Legacy Into <span className="text-primary italic">Dominance</span>
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

                {/* 4-Step Evolution Lifecycle */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-secondary/10 border border-primary/15 backdrop-blur-xl">
                        <div className="max-w-3xl mb-16">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                                Migration Strategy
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                                Zero-Downtime Evolution Lifecycle
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {redesignSteps.map((step) => (
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
                        label="DATABASE"
                        href="/services/database-solutions"
                        tagline="Explore Next Service (06)"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
