"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Globe,
    Compass,
    TrendingUp,
    Target,
    ShieldCheck,
    LineChart,
    Award,
    Zap,
    ArrowRight,
    CheckCircle2,
    Activity,
    Users,
    ChevronDown,
    ChevronUp,
    MapPin,
    Radio
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";

const regions = [
    {
        id: "na",
        name: "North America",
        hub: "Ashburn / San Jose / Toronto",
        latency: "12ms",
        reach: "380M+ Reach",
        compliance: "CCPA / SOC2",
        features: ["Sub-15ms Edge Delivery", "Apple Pay & Stripe Native", "High-Intent Enterprise CRO", "US Search Cluster Targeting"]
    },
    {
        id: "eu",
        name: "Europe & UK",
        hub: "London / Frankfurt / Amsterdam",
        latency: "18ms",
        reach: "450M+ Reach",
        compliance: "GDPR / ePrivacy",
        features: ["Automated Cookie Consent", "Multi-Currency (EUR, GBP, CHF)", "Multilingual Subpath Routing", "Zero PII Leakage"]
    },
    {
        id: "apac",
        name: "Asia-Pacific",
        hub: "Singapore / Tokyo / Mumbai",
        latency: "22ms",
        reach: "1.2B+ Reach",
        compliance: "DPDP / Localized Taxes",
        features: ["UPI & Local Gateway Rails", "Ultra-Fast Mobile Viewports", "High-Concurrency Cloud Caching", "Localized Vernacular SEO"]
    },
    {
        id: "latam_mena",
        name: "Latin America & MENA",
        hub: "São Paulo / Dubai",
        latency: "34ms",
        reach: "500M+ Reach",
        compliance: "LGPD / Regional VAT",
        features: ["Arabic RTL Layout Support", "Spanish & Portuguese Localization", "Low-Bandwidth Mobile Mode", "Regional Payment Intermediaries"]
    }
];

const capabilities = [
    {
        icon: Globe,
        title: "International Technical SEO",
        description: "Hreflang localization architecture, geo-targeted XML sitemaps, structured schema data, and international search ranking dominance."
    },
    {
        icon: Target,
        title: "Cross-Border Market Positioning",
        description: "Position your brand narrative to resonate deeply across diverse cultures, languages, and regional buying behaviors."
    },
    {
        icon: TrendingUp,
        title: "Conversion Rate Optimization (CRO)",
        description: "Rigorous A/B testing, heatmapping analytics, cognitive friction audits, and value proposition refinements that multiply ROI."
    },
    {
        icon: Zap,
        title: "Global Edge Infrastructure Strategy",
        description: "Distribute static assets and dynamic serverless compute across 300+ worldwide edge nodes to ensure sub-50ms latency anywhere on Earth."
    },
    {
        icon: LineChart,
        title: "Omnichannel Growth & Retention",
        description: "Connecting user touchpoints across web, automated email cadences, WhatsApp CRM alerts, and retargeting ecosystems."
    },
    {
        icon: ShieldCheck,
        title: "Global Privacy & Compliance",
        description: "Effortless adherence to GDPR, CCPA, and global data privacy mandates with privacy-first analytics and zero legal friction."
    }
];

const strategySteps = [
    {
        num: "01",
        title: "Global Market & Competitor Audit",
        description: "We evaluate international competitor landscapes, search volume clusters, cultural nuances, and market gaps."
    },
    {
        num: "02",
        title: "Narrative & Brand Architecture",
        description: "We craft clear, magnetic positioning frameworks and core messaging guidelines tailored for high-ticket clients."
    },
    {
        num: "03",
        title: "Technical SEO & Edge Implementation",
        description: "We deploy international DNS routing, localized CDN clusters, and hreflang tag hierarchies across all regional routes."
    },
    {
        num: "04",
        title: "Growth Acceleration & CRO Tuning",
        description: "Continuous conversion rate optimization, weekly analytics reviews, and iterative funnel refinement."
    }
];

const faqs = [
    {
        q: "What does digital strategy consulting include?",
        a: "Our digital strategy includes full market competitor benchmarking, international technical SEO architecture, brand positioning frameworks, user journey wireframing, and conversion rate optimization roadmaps."
    },
    {
        q: "How does international SEO help our business grow globally?",
        a: "By structuring your domain with localized subdirectories, hreflang tags, dynamic currency detection, and regional CDN edge nodes, your brand ranks at the top of local Google search results worldwide."
    },
    {
        q: "Can you help our brand enter the US and European markets from India?",
        a: "Yes. Over 70% of our client base is distributed across North America, Europe, Australia, and the Middle East. We specialize in building international-grade digital experiences that appeal directly to Western and global enterprise buyers."
    },
    {
        q: "How do you measure and report strategic growth metrics?",
        a: "We provide real-time privacy-compliant dashboards tracking organic traffic growth, bounce rate reductions, checkout conversion lift, and customer acquisition efficiency."
    }
];

export default function DigitalStrategyClient() {
    const [selectedRegion, setSelectedRegion] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const activeRegion = regions[selectedRegion];

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-12 lg:px-24 py-32 font-sans relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -mr-20 -mt-20 animate-pookie-float" />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -ml-20" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
                    >
                        <Compass className="w-4 h-4 text-primary animate-spin" />
                        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.3em]">
                            Service 07 / Strategy
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
                                <span>Global Reach &</span>
                                <span className="text-primary italic">Digital Strategy</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-3xl"
                            >
                                Positioning your brand on the world stage. International SEO, multi-region edge deployment, and conversion rate optimization engineered to capture high-value global audiences.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
                            <Magnetic>
                                <Link
                                    href="/contact?subject=Digital%20Strategy%20%26%20Global%20Growth"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_35px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    Plan Global Growth
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                International SEO • Sub-30ms Global CDN • CRO
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interactive Global Edge & Regional Latency Visualizer */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-secondary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-primary/10">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
                                    <Radio className="w-3.5 h-3.5" /> Worldwide Edge & Latency Visualizer
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[1.25] sm:leading-[1.3] mt-2">
                                    Global Network Performance
                                </h2>
                            </div>

                            {/* Region Tabs */}
                            <div className="flex flex-wrap gap-2">
                                {regions.map((reg, i) => (
                                    <button
                                        key={reg.id}
                                        type="button"
                                        onClick={() => setSelectedRegion(i)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                            selectedRegion === i
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                                : "bg-background/40 text-muted-foreground hover:text-foreground border border-primary/10"
                                        )}
                                    >
                                        {reg.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Region View */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
                            {/* Left: Region Hub Details */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="p-6 sm:p-8 rounded-2xl bg-background/50 border border-primary/15 backdrop-blur-md">
                                    <div className="flex items-center justify-between text-xs font-mono text-primary uppercase tracking-wider mb-2">
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" /> Primary POP: {activeRegion.hub}
                                        </span>
                                        <span className="text-muted-foreground">{activeRegion.compliance}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-foreground mb-4 leading-snug">
                                        {activeRegion.name} Market Cluster
                                    </h3>
                                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-body">
                                        Custom DNS routing and local edge caching configured to serve this demographic with zero friction, instant checkouts, and fully localized payment rails.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {activeRegion.features.map((feat, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-primary/10 text-xs sm:text-sm font-mono"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                            <span className="text-foreground">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Telemetry & Global Metrics */}
                            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-background/40 border border-primary/15 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                                        Edge Latency & Addressable Market
                                    </span>
                                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                                        <Activity className="w-3.5 h-3.5 animate-pulse" /> Optimal
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-background/80 border border-primary/10 text-center">
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Average Latency</div>
                                        <div className="text-2xl sm:text-3xl font-display font-bold text-primary">{activeRegion.latency}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-background/80 border border-primary/10 text-center">
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Addressable Market</div>
                                        <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400">{activeRegion.reach}</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-primary/10 space-y-2.5">
                                    <div className="text-xs font-mono text-muted-foreground uppercase font-bold">
                                        International Strategy Guarantee
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>100% Validated Hreflang Tags & Canonical Maps</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>Dynamic Local Currency & Tax Adaptation</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>Sub-50ms Global Time To First Byte (TTFB)</span>
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
                            Strategic Dominance <span className="text-primary italic">Worldwide</span>
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

                {/* 4-Step Strategic Growth Roadmap */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-secondary/10 border border-primary/15 backdrop-blur-xl">
                        <div className="max-w-3xl mb-16">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                                Strategic Roadmap
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                                From Market Audit To International Scale
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {strategySteps.map((step) => (
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
                        label="PRICING"
                        href="/investment"
                        tagline="Ready to Scale Your Brand?"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
