"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    ShoppingBag,
    CreditCard,
    ShieldCheck,
    Truck,
    LayoutGrid,
    SlidersHorizontal,
    Layers,
    BarChart3,
    Smartphone,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Store,
    TrendingUp,
    ChevronDown,
    ChevronUp,
    Package,
    Globe,
    Zap
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";
import NextPageButton from "@/components/NextPageButton";
import EcommerceServiceSection from "@/components/EcommerceServiceSection";

const retailStats = [
    { label: "Checkout Speed", value: "1.2s", desc: "Frictionless 1-step flow" },
    { label: "Payment Success", value: "99.98%", desc: "Smart routing failover" },
    { label: "Avg Conversion Lift", value: "+42%", desc: "Over legacy platforms" },
    { label: "Global Currencies", value: "135+", desc: "Localized checkout" }
];

const retailFeatures = [
    {
        icon: LayoutGrid,
        title: "Dynamic Product Catalogs",
        description: "Hierarchical categories, multi-attribute filter trees, faceted search, and infinite scroll designed to load 10,000+ SKUs instantaneously."
    },
    {
        icon: CreditCard,
        title: "Global Multi-Gateway Checkout",
        description: "Native integrations for Stripe, Razorpay, PayPal, Apple Pay, Google Pay, UPI, Klarna, and localized banking rails with automatic currency conversion."
    },
    {
        icon: Truck,
        title: "Automated Shipping & Tracking",
        description: "Live step-by-step order tracking timeline with automated webhook notifications via WhatsApp, SMS, and email connected to DHL, FedEx, and local couriers."
    },
    {
        icon: Layers,
        title: "Real-Time Inventory Sync",
        description: "Multi-warehouse stock level synchronization, automated backorder handling, low-inventory triggers, and instant channel replenishment."
    },
    {
        icon: BarChart3,
        title: "Seller & Admin Analytics",
        description: "Custom back-office control center for revenue analytics, cohort retention, average order value (AOV) tracking, and catalog management."
    },
    {
        icon: Smartphone,
        title: "Mobile Shopping Optimization",
        description: "Ultra-fast thumb-friendly slide-over carts, instant Apple Pay / Google Pay sheets, and swipeable product galleries tailored for mobile shoppers."
    }
];

const ecomSteps = [
    {
        num: "01",
        title: "Catalog Architecture & Taxonomy",
        description: "We map product variant matrices, pricing tiers, multi-currency strategies, and inventory management schemas."
    },
    {
        num: "02",
        title: "Custom Storefront Engineering",
        description: "We build a bespoke Next.js storefront with dynamic carts, micro-animations, and instant search capabilities."
    },
    {
        num: "03",
        title: "Payment Rails & Logistics Integration",
        description: "We connect payment gateways, automated tax calculators, courier shipping APIs, and customer notification webhooks."
    },
    {
        num: "04",
        title: "Conversion Stress-Test & Global Launch",
        description: "End-to-end checkout testing across multiple currencies and devices with load testing to ensure peak sales stability."
    }
];

const faqs = [
    {
        q: "Do you build custom stores or use platforms like Shopify and Medusa?",
        a: "We do both! We build completely custom bespoke headless storefronts on Next.js powered by Shopify, Medusa, or custom PostgreSQL/Prisma backends, giving you maximum performance and complete design freedom."
    },
    {
        q: "What payment gateways are supported?",
        a: "We support Stripe, Razorpay, PayPal, Apple Pay, Google Pay, UPI, Cash on Delivery, Klarna, and regional European/Asian payment methods with 3D Secure 2 compliance."
    },
    {
        q: "Can our store sync with existing warehouse and ERP systems?",
        a: "Yes. We build custom API connectors and webhook listeners to synchronize stock levels, orders, and customer data bi-directionally with SAP, NetSuite, Zoho, and custom warehouse management systems."
    },
    {
        q: "How secure is the checkout and customer payment data?",
        a: "All payment transactions are 100% PCI-DSS compliant with tokenized payment handling, 256-bit SSL encryption, and automated fraud detection via Stripe Radar."
    }
];

export default function EcommerceServiceClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-12 lg:px-24 py-32 font-sans relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -mr-20 -mt-20 animate-pookie-float" />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -ml-20" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
                    >
                        <Store className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.3em]">
                            Service 04 / E-Commerce
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
                                <span>Online Store</span>
                                <span className="text-primary italic">Architecture & Retail</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-3xl"
                            >
                                Launch a high-velocity digital storefront that turns visitors into loyal customers. Frictionless checkout, multi-gateway payments, live order tracking, and real-time inventory synchronization.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
                            <Magnetic>
                                <Link
                                    href="/contact?subject=E-Commerce%20Store%20Development"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_35px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    Build Online Store
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                High Conversion • Multi-Currency • Instant Checkout
                            </span>
                        </div>
                    </div>
                </div>

                {/* Key Metrics HUD */}
                <div className="relative z-10 max-w-7xl mx-auto mb-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {retailStats.map((stat, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-2xl bg-secondary/10 border border-primary/15 backdrop-blur-md text-center"
                            >
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-[11px] text-muted-foreground font-mono">
                                    {stat.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comprehensive Live Storefront Showcase Section */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <EcommerceServiceSection variant="full" />
                </div>

                {/* Core Capabilities Grid */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                            Pillars of Scale
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                            Built For High <span className="text-primary italic">Conversion Velocity</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {retailFeatures.map((cap, idx) => {
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

                {/* 4-Step E-Commerce Store Build Process */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-secondary/10 border border-primary/15 backdrop-blur-xl">
                        <div className="max-w-3xl mb-16">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                                Delivery Roadmap
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                                From Product Blueprint To Live Store
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {ecomSteps.map((step) => (
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
                        label="REDESIGN"
                        href="/services/website-redesign"
                        tagline="Explore Next Service (05)"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
