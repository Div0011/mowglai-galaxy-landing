"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Code2,
    Server,
    Cpu,
    ShieldCheck,
    Zap,
    Terminal,
    Workflow,
    Cloud,
    ArrowRight,
    CheckCircle2,
    Activity,
    GitBranch,
    ChevronDown,
    ChevronUp,
    Globe,
    Lock
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";

const architectureLayers = [
    {
        id: "edge",
        layer: "Layer 01",
        title: "Edge Delivery & Global CDN",
        tech: "Cloudflare / Vercel Edge / Global DNS",
        desc: "Static assets and cached HTML are distributed across 300+ edge locations worldwide for sub-30ms Time to First Byte (TTFB) from any continent.",
        specs: ["Geo-distributed Edge Caching", "Anycast DNS Routing", "Automated TLS 1.3 & HTTP/3", "DDoS Mitigation at Edge"]
    },
    {
        id: "framework",
        layer: "Layer 02",
        title: "Next.js 16 & React 19 Engine",
        tech: "Turbopack • Server Components • SSR & SSG",
        desc: "Hybrid rendering architecture delivering zero-bundle-size React Server Components, streaming SSR, and instant client page transitions.",
        specs: ["RSC Zero-JS Initial Payload", "Incremental Static Regeneration (ISR)", "Parallel Route Interceptions", "Automated Image & Font Optimization"]
    },
    {
        id: "api",
        layer: "Layer 03",
        title: "Type-Safe API & Microservices",
        tech: "TypeScript • REST / GraphQL / tRPC • Zod",
        desc: "End-to-end type safety preventing runtime crashes with schema validation, JWT / OAuth2 authentication rails, and structured error boundaries.",
        specs: ["Strict Zod Schema Contracts", "Rate-Limiting & Bot Detection", "Microservice Webhooks", "Zero-Drift TypeScript Types"]
    },
    {
        id: "data",
        layer: "Layer 04",
        title: "Distributed Database & Cache",
        tech: "PostgreSQL • Supabase • Redis • Prisma / Drizzle",
        desc: "High-concurrency relational data store paired with Redis in-memory caching to guarantee sub-millisecond query execution under heavy traffic spikes.",
        specs: ["Connection Pooling & Read Replicas", "Redis In-Memory Session Store", "Automated Point-in-Time Backups", "Row-Level Security (RLS)"]
    }
];

const capabilities = [
    {
        icon: Code2,
        title: "Next.js 16 & React 19 Architecture",
        description: "Built strictly on modern App Router paradigms with Server Components to minimize client JavaScript overhead and maximize rendering velocity."
    },
    {
        icon: Zap,
        title: "100/100 Core Web Vitals",
        description: "Laser-focused optimization ensuring sub-second Largest Contentful Paint (LCP), 0 Cumulative Layout Shift (CLS), and instantaneous Interaction to Next Paint (INP)."
    },
    {
        icon: ShieldCheck,
        title: "Enterprise Hardened Security",
        description: "CSRF/XSS protection, strict Content Security Policies (CSP), parameterized SQL queries, secure HTTP-only cookies, and SOC2 readiness."
    },
    {
        icon: Server,
        title: "Scalable Full-Stack Engineering",
        description: "Clean MVC architectures, modular domain-driven codebases, and maintainable component hierarchies built to support millions of monthly active users."
    },
    {
        icon: Cloud,
        title: "Cloud Infrastructure & Edge Deploy",
        description: "Containerized Docker workflows, automated CI/CD deployment pipelines, zero-downtime rolling updates, and automated scaling."
    },
    {
        icon: GitBranch,
        title: "Third-Party API & ERP Integration",
        description: "Seamless bi-directional synchronization with payment rails, CRMs, shipping providers, analytics platforms, and bespoke internal systems."
    }
];

const devSteps = [
    {
        num: "01",
        title: "Technical Architecture & Schema Design",
        description: "We map system architecture, entity relationship diagrams (ERDs), API contracts, and technology matrices before writing code."
    },
    {
        num: "02",
        title: "Sprint-Based Agile Engineering",
        description: "Two-week milestone sprints with continuous deployment to staging environments, allowing transparent real-time progress reviews."
    },
    {
        num: "03",
        title: "Automated QA & Performance Testing",
        description: "Rigorous unit, integration, and load testing simulating thousands of concurrent users alongside automated accessibility audits."
    },
    {
        num: "04",
        title: "Zero-Downtime Rollout & Telemetry",
        description: "Production launch with continuous telemetry, error tracking with Sentry, uptime monitors, and real-time performance analytics."
    }
];

const faqs = [
    {
        q: "Why do you use Next.js 16 and React 19 for web development?",
        a: "Next.js 16 with React 19 Server Components represents the peak of modern web performance. It allows heavy backend logic to execute on the server while sending minimal JavaScript to the client, resulting in instant page loads and unparalleled SEO indexability."
    },
    {
        q: "Do we get full ownership of the source code and IP?",
        a: "100% yes. Upon project completion, full ownership of the GitHub repositories, documentation, environment configurations, and deployment pipelines is transferred directly to your organization."
    },
    {
        q: "How do you ensure the website can handle massive traffic surges?",
        a: "We architect every system with edge caching, Redis caching layers, connection pooling, and auto-scaling infrastructure capable of handling hundreds of thousands of concurrent requests without latency degradation."
    },
    {
        q: "Can you maintain and update our web application after launch?",
        a: "Yes. We offer continuous SLA maintenance, proactive security patch management, performance tuning, and on-demand feature expansion packages."
    }
];

export default function WebDevelopmentClient() {
    const [activeLayer, setActiveLayer] = useState(1);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const layer = architectureLayers[activeLayer];

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-12 lg:px-24 py-32 font-sans relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -mr-20 -mt-20 animate-pookie-float" />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none -ml-20" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
                    >
                        <Code2 className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.3em]">
                            Service 03 / Development
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
                                <span>Robust</span>
                                <span className="text-primary italic">Engineering & Full-Stack</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-3xl"
                            >
                                Scalable, secure, and lightning-fast full-stack web architectures. We build the indestructible digital foundations that power modern startups and global enterprises.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
                            <Magnetic>
                                <Link
                                    href="/contact?subject=Full-Stack%20Development%20Project"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_35px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    Initiate Build
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                Next.js 16 • React 19 • Sub-Second Latency
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interactive Full-Stack Architecture Explorer */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-secondary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-primary/10">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
                                    <Server className="w-3.5 h-3.5" /> Full-Stack Architecture Explorer
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[1.25] sm:leading-[1.3] mt-2">
                                    Dissecting Our Production Architecture
                                </h2>
                            </div>

                            {/* Layer Switcher Buttons */}
                            <div className="flex flex-wrap gap-2">
                                {architectureLayers.map((l, i) => (
                                    <button
                                        key={l.id}
                                        type="button"
                                        onClick={() => setActiveLayer(i)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                            activeLayer === i
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                                : "bg-background/40 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30"
                                        )}
                                    >
                                        {l.layer}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Layer Visual Workspace */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
                            {/* Layer Details Left */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="p-6 sm:p-8 rounded-2xl bg-background/50 border border-primary/15 backdrop-blur-md">
                                    <div className="flex items-center justify-between text-xs font-mono text-primary uppercase tracking-wider mb-2">
                                        <span>{layer.layer}</span>
                                        <span className="text-muted-foreground">{layer.tech}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-foreground mb-4 leading-snug">
                                        {layer.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-body">
                                        {layer.desc}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {layer.specs.map((spec, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-primary/10 text-xs sm:text-sm font-mono"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                            <span className="text-foreground">{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Live Lighthouse Core Web Vitals HUD Right */}
                            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-background/40 border border-primary/15 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                                        Lighthouse Core Web Vitals
                                    </span>
                                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                                        <Activity className="w-3.5 h-3.5 animate-pulse" /> Verified
                                    </span>
                                </div>

                                {/* 4 Score Gauges */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { name: "Performance", score: "100" },
                                        { name: "Accessibility", score: "100" },
                                        { name: "Best Practices", score: "100" },
                                        { name: "SEO Rating", score: "100" }
                                    ].map((gauge, i) => (
                                        <div
                                            key={i}
                                            className="p-3 rounded-xl bg-background/80 border border-emerald-500/30 text-center"
                                        >
                                            <div className="text-xl sm:text-2xl font-display font-black text-emerald-400">
                                                {gauge.score}
                                            </div>
                                            <div className="text-[9px] uppercase font-mono text-muted-foreground mt-1">
                                                {gauge.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2.5 pt-2 border-t border-primary/10">
                                    <div className="flex justify-between items-center text-xs font-mono p-2 rounded-lg bg-secondary/15">
                                        <span className="text-muted-foreground">Largest Contentful Paint (LCP)</span>
                                        <span className="text-emerald-400 font-bold">0.6s (Instant)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-mono p-2 rounded-lg bg-secondary/15">
                                        <span className="text-muted-foreground">Interaction to Next Paint (INP)</span>
                                        <span className="text-emerald-400 font-bold">24ms (Ultra Fast)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-mono p-2 rounded-lg bg-secondary/15">
                                        <span className="text-muted-foreground">Cumulative Layout Shift (CLS)</span>
                                        <span className="text-emerald-400 font-bold">0.00 (Zero Drift)</span>
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
                            Engineered For <span className="text-primary italic">Absolute Stability</span>
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

                {/* 4-Step Engineering Lifecycle */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-secondary/10 border border-primary/15 backdrop-blur-xl">
                        <div className="max-w-3xl mb-16">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                                Engineering Lifecycle
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                                From Schema Design To Production Launch
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {devSteps.map((step) => (
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

                {/* Technology Stack Grid */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32 text-center">
                    <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-6">
                        Production Stack
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase mb-10 text-foreground leading-[1.25]">
                        Modern Technologies We Master
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
                        {[
                            "Next.js 16 (App Router)",
                            "React 19 & RSC",
                            "TypeScript (Strict Mode)",
                            "Bun & Turbopack",
                            "Tailwind CSS v4",
                            "PostgreSQL & Supabase",
                            "Redis In-Memory Cache",
                            "Prisma & Drizzle ORM",
                            "Docker & Kubernetes",
                            "GraphQL & REST APIs",
                            "Vercel & AWS Edge"
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="px-5 py-2.5 rounded-full border border-primary/20 bg-background/40 text-foreground font-mono text-xs sm:text-sm tracking-wider hover:border-primary hover:bg-primary/10 transition-all"
                            >
                                {tech}
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
                        label="E-COMMERCE"
                        href="/services/ecommerce"
                        tagline="Explore Next Service (04)"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
