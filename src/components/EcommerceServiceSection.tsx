"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
    Star,
    Check,
    Package,
    TrendingUp,
    Store
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EcommerceFeature {
    icon: React.ElementType;
    title: string;
    description: string;
}

const ecommerceFeatures: EcommerceFeature[] = [
    {
        icon: LayoutGrid,
        title: "Product Catalog & Categories",
        description: "Organize unlimited products, collections, custom tags, and multi-level filter trees seamlessly."
    },
    {
        icon: SlidersHorizontal,
        title: "Product Details & Variants",
        description: "Showcase rich HD galleries, dynamic pricing, size/color variant matrix, and custom specifications."
    },
    {
        icon: ShoppingCart,
        title: "Shopping Cart",
        description: "Ultra-fast slide-over cart with live quantity recalculations, coupon codes, and saved items."
    },
    {
        icon: ShieldCheck,
        title: "Secure Checkout",
        description: "Frictionless 1-step or multi-step checkout with 256-bit SSL encryption and guest checkout support."
    },
    {
        icon: CreditCard,
        title: "Online Payments",
        description: "Native integrations for Stripe, Razorpay, PayPal, Apple Pay, Google Pay, UPI, and global payment rails."
    },
    {
        icon: Package,
        title: "Customer Order Management",
        description: "Automated invoices, customer receipt emails, account dashboards, and order status histories."
    },
    {
        icon: Layers,
        title: "Inventory & Stock Management",
        description: "Real-time stock level synchronization, low-inventory alerts, and backorder handling."
    },
    {
        icon: Truck,
        title: "Order Tracking",
        description: "Live step-by-step order tracking timeline with automated shipment notifications via SMS and email."
    },
    {
        icon: BarChart3,
        title: "Admin & Seller Dashboard",
        description: "Comprehensive back-office portal for revenue analytics, customer insights, and catalogue management."
    },
    {
        icon: Sparkles,
        title: "Shipping & Delivery Integration",
        description: "Automated shipping rate calculation, courier API connections, label printing, and global delivery zones."
    },
    {
        icon: Smartphone,
        title: "Responsive Mobile-Friendly Design",
        description: "Flawless touch-optimized shopping experience tailored for smartphones, tablets, and desktops."
    }
];

// Interactive Demo Products for visual preview
const sampleProducts = [
    {
        id: "prod-1",
        category: "CYBER AUDIO",
        title: "AeroNova Wireless Headphones",
        price: 299,
        originalPrice: 349,
        rating: 4.9,
        inStock: true,
        stockCount: 14,
        colors: [
            { name: "Emerald Cyber", hex: "#10b981" },
            { name: "Obsidian Black", hex: "#0f172a" },
            { name: "Titanium Silver", hex: "#94a3b8" }
        ],
        sizes: ["Standard", "Pro Fit"],
        badge: "Bestseller"
    },
    {
        id: "prod-2",
        category: "SMART WEAR",
        title: "Vortex Spatial Chronograph",
        price: 449,
        originalPrice: 499,
        rating: 5.0,
        inStock: true,
        stockCount: 8,
        colors: [
            { name: "Neon Matrix", hex: "#06b6d4" },
            { name: "Stealth Slate", hex: "#334155" }
        ],
        sizes: ["42mm", "46mm"],
        badge: "New Release"
    }
];

interface EcommerceServiceSectionProps {
    variant?: "full" | "compact";
    className?: string;
}

export default function EcommerceServiceSection({
    variant = "full",
    className
}: EcommerceServiceSectionProps) {
    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
    const [cartCount, setCartCount] = useState(2);
    const [isAddedRecently, setIsAddedRecently] = useState(false);
    const [orderStage, setOrderStage] = useState<number>(2); // 0: Placed, 1: Processed, 2: Dispatched, 3: Delivered

    const currentProduct = sampleProducts[selectedProductIndex];

    const handleAddToCart = () => {
        setIsAddedRecently(true);
        setCartCount((prev) => prev + 1);
        setTimeout(() => setIsAddedRecently(false), 1800);
    };

    return (
        <section
            id="ecommerce-service"
            className={cn(
                "relative z-10 w-full rounded-[2.5rem] md:rounded-[3rem] border border-primary/20 bg-secondary/10 p-6 sm:p-10 md:p-14 lg:p-16 backdrop-blur-2xl overflow-hidden shadow-2xl transition-all duration-700",
                className
            )}
        >
            {/* Background Ambient Glow Accents */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[140px] pointer-events-none -mt-20" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -mb-20" />

            {/* Header / Meta badge */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-10 border-b border-primary/15 relative z-10">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-6 backdrop-blur-md">
                        <Store className="w-4 h-4 text-primary animate-pulse" />
                        <span>Flagship Service</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase text-foreground leading-[1.15] tracking-tight">
                        E-Commerce & <br className="hidden sm:inline" />
                        <span className="text-primary italic">Online Store</span> Development
                    </h2>
                    <p className="mt-6 text-base sm:text-lg md:text-xl font-body font-light text-foreground/80 leading-relaxed max-w-2xl">
                        Launch a complete online store that makes it easy for your customers to discover, purchase, and track products—all in one place.
                    </p>
                </div>

                {/* Top Quick Stats / Trust Indicators */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
                    <div className="px-5 py-3 rounded-2xl bg-background/40 border border-primary/15 backdrop-blur-md flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Security</p>
                            <p className="text-xs sm:text-sm font-bold text-foreground">PCI-DSS & SSL Compliant</p>
                        </div>
                    </div>
                    <div className="px-5 py-3 rounded-2xl bg-background/40 border border-primary/15 backdrop-blur-md flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <div className="text-left">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Checkout Flow</p>
                            <p className="text-xs sm:text-sm font-bold text-foreground">High Conversion Speed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Interactive Marketplace Experience Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 my-12 relative z-10">
                {/* Left: Interactive Marketplace Visual Card & Order Lifecycle */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Visual Card: Modern Store Showcase */}
                    <div className="group rounded-[2rem] border border-primary/20 bg-background/30 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-primary/40 shadow-xl">
                        {/* Header of Store UI Mockup */}
                        <div className="flex items-center justify-between pb-5 border-b border-primary/10 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                <span className="ml-2 text-xs font-mono tracking-widest text-muted-foreground uppercase hidden sm:inline">
                                    store.mowglai.app/catalog
                                </span>
                            </div>

                            {/* Live Cart Floating Widget */}
                            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold font-mono tracking-wider">
                                <ShoppingBag className="w-4 h-4" />
                                <span>Cart ({cartCount})</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                            </div>
                        </div>

                        {/* Product Switcher Tabs */}
                        <div className="flex items-center gap-2 mt-5 mb-6 overflow-x-auto pb-1">
                            {sampleProducts.map((p, idx) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedProductIndex(idx);
                                        setSelectedColorIndex(0);
                                        setSelectedSizeIndex(0);
                                    }}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap",
                                        selectedProductIndex === idx
                                            ? "bg-primary text-primary-foreground shadow-md"
                                            : "bg-secondary/20 text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-primary/10"
                                    )}
                                >
                                    {p.category}
                                </button>
                            ))}
                        </div>

                        {/* Interactive Product Preview Card */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                            {/* Product Graphic Representation (Subtle abstract ecommerce visual) */}
                            <div className="sm:col-span-5 relative rounded-2xl bg-secondary/30 border border-primary/15 p-6 flex flex-col items-center justify-center min-h-[220px] overflow-hidden group/product">
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase">
                                    {currentProduct.badge}
                                </div>
                                <div className="absolute top-3 right-3 text-muted-foreground text-xs flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-foreground">{currentProduct.rating}</span>
                                </div>

                                {/* Abstract Central Product Aesthetic with Glow */}
                                <div className="relative my-4 flex items-center justify-center">
                                    <div
                                        className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent border border-primary/30 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover/product:scale-105"
                                        style={{
                                            boxShadow: `0 0 35px ${currentProduct.colors[selectedColorIndex].hex}33`
                                        }}
                                    >
                                        <ShoppingBag className="w-12 h-12 text-primary stroke-[1.25]" />
                                    </div>
                                    <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-background/80 border border-primary/20 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                                        ● In Stock ({currentProduct.stockCount})
                                    </div>
                                </div>

                                <div className="mt-2 text-center">
                                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                                        SKU: MWG-{selectedProductIndex + 1}09-X
                                    </span>
                                </div>
                            </div>

                            {/* Product Information & Dynamic Controls */}
                            <div className="sm:col-span-7 flex flex-col justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/80 block mb-1">
                                        {currentProduct.category}
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-display font-black text-foreground uppercase tracking-tight leading-snug">
                                        {currentProduct.title}
                                    </h3>
                                    <div className="flex items-baseline gap-3 mt-2">
                                        <span className="text-2xl sm:text-3xl font-display font-black text-primary">
                                            ${currentProduct.price}
                                        </span>
                                        <span className="text-sm line-through text-muted-foreground/50 font-mono">
                                            ${currentProduct.originalPrice}
                                        </span>
                                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                            Save ${currentProduct.originalPrice - currentProduct.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Dynamic Variant Controls: Color */}
                                <div>
                                    <div className="flex justify-between items-center text-xs font-mono uppercase text-muted-foreground mb-2">
                                        <span>Color Variant:</span>
                                        <span className="text-foreground font-bold">{currentProduct.colors[selectedColorIndex].name}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        {currentProduct.colors.map((c, cIdx) => (
                                            <button
                                                key={c.name}
                                                type="button"
                                                onClick={() => setSelectedColorIndex(cIdx)}
                                                className={cn(
                                                    "w-7 h-7 rounded-full transition-all flex items-center justify-center relative",
                                                    selectedColorIndex === cIdx ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "opacity-70 hover:opacity-100"
                                                )}
                                                style={{ backgroundColor: c.hex }}
                                                aria-label={`Select color ${c.name}`}
                                            >
                                                {selectedColorIndex === cIdx && (
                                                    <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Dynamic Variant Controls: Size / Option */}
                                <div>
                                    <div className="flex justify-between items-center text-xs font-mono uppercase text-muted-foreground mb-2">
                                        <span>Configuration:</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {currentProduct.sizes.map((s, sIdx) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setSelectedSizeIndex(sIdx)}
                                                className={cn(
                                                    "px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all",
                                                    selectedSizeIndex === sIdx
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-secondary/30 text-foreground/80 hover:bg-secondary/50 border border-primary/10"
                                                )}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Action button simulating Add to Cart */}
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className={cn(
                                        "w-full py-3 px-5 rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md",
                                        isAddedRecently
                                            ? "bg-emerald-500 text-white"
                                            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02]"
                                    )}
                                >
                                    {isAddedRecently ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Added to Cart!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-4 h-4" />
                                            <span>Add to Cart • ${currentProduct.price}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Tracking & Lifecycle Simulator Card */}
                    <div className="rounded-[2rem] border border-primary/20 bg-background/20 p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-primary/10">
                            <div className="flex items-center gap-2.5">
                                <Truck className="w-5 h-5 text-primary" />
                                <div>
                                    <h4 className="text-sm font-display font-black uppercase text-foreground">
                                        Live Order Tracking Pipeline
                                    </h4>
                                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                                        Order #MWG-8924 • Global Courier Sync
                                    </p>
                                </div>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold uppercase">
                                Real-Time Webhooks
                            </div>
                        </div>

                        {/* Interactive Step Timeline */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                            {[
                                { step: "Placed", label: "Instant Payment", icon: CreditCard },
                                { step: "Processing", label: "Inventory Sync", icon: Package },
                                { step: "Dispatched", label: "Courier Transit", icon: Truck },
                                { step: "Delivered", label: "Confirmed", icon: CheckCircle2 }
                            ].map((item, idx) => {
                                const isPast = orderStage >= idx;
                                const ItemIcon = item.icon;
                                return (
                                    <button
                                        key={item.step}
                                        type="button"
                                        onClick={() => setOrderStage(idx)}
                                        className={cn(
                                            "p-3 rounded-xl border text-left transition-all duration-300 flex flex-col gap-2 relative",
                                            isPast
                                                ? "bg-primary/10 border-primary/30 text-primary"
                                                : "bg-secondary/10 border-primary/5 text-muted-foreground/60 hover:text-muted-foreground"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <ItemIcon className={cn("w-4 h-4", isPast ? "text-primary" : "text-muted-foreground/40")} />
                                            {isPast && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase font-display leading-tight">{item.step}</p>
                                            <p className="text-[10px] font-mono text-muted-foreground uppercase">{item.label}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Seller Dashboard Intelligence Preview & Highlight Cards */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    {/* Mini Seller & Admin Analytics Widget */}
                    <div className="rounded-[2rem] border border-primary/20 bg-background/25 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
                        <div className="flex items-center justify-between pb-4 border-b border-primary/10">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                <span className="text-xs font-bold font-display uppercase tracking-widest text-foreground">
                                    Merchant Command Center
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                                Live Sync Active
                            </span>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4 my-6">
                            <div className="p-4 rounded-2xl bg-secondary/30 border border-primary/10">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                    Total Revenue
                                </span>
                                <p className="text-2xl sm:text-3xl font-display font-black text-primary">$48,920</p>
                                <span className="text-[10px] font-bold text-emerald-400 font-mono mt-1 block">
                                    ↑ +24.8% this week
                                </span>
                            </div>

                            <div className="p-4 rounded-2xl bg-secondary/30 border border-primary/10">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                    Completed Orders
                                </span>
                                <p className="text-2xl sm:text-3xl font-display font-black text-foreground">1,248</p>
                                <span className="text-[10px] font-bold text-emerald-400 font-mono mt-1 block">
                                    99.8% fulfillment
                                </span>
                            </div>

                            <div className="p-4 rounded-2xl bg-secondary/30 border border-primary/10">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                    Average Order Value
                                </span>
                                <p className="text-xl sm:text-2xl font-display font-black text-foreground">$142.50</p>
                                <span className="text-[10px] font-bold text-muted-foreground font-mono mt-1 block">
                                    Across 32 countries
                                </span>
                            </div>

                            <div className="p-4 rounded-2xl bg-secondary/30 border border-primary/10">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1">
                                    Cart Conversion
                                </span>
                                <p className="text-xl sm:text-2xl font-display font-black text-primary">4.62%</p>
                                <span className="text-[10px] font-bold text-emerald-400 font-mono mt-1 block">
                                    Sub-second loads
                                </span>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Store className="w-5 h-5 text-primary shrink-0" />
                                <div className="text-left">
                                    <p className="text-xs font-bold font-display uppercase text-foreground">Multi-Vendor & Single Store</p>
                                    <p className="text-[11px] font-mono text-muted-foreground">Custom CMS or Headless Backend</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold font-mono text-primary uppercase">Scalable</span>
                        </div>
                    </div>

                    {/* Quick Highlights / Why Mowglai E-Commerce */}
                    <div className="rounded-[2rem] border border-primary/20 bg-background/25 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between flex-grow">
                        <div>
                            <h4 className="text-base font-display font-black uppercase text-foreground tracking-wider mb-4">
                                Engineered For High-Volume Sales
                            </h4>
                            <ul className="space-y-3.5 text-sm font-body text-foreground/80">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span><strong>Zero Friction Purchasing:</strong> Instant guest checkout, saved addresses, and express pay buttons.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span><strong>Global Currency & Tax Engine:</strong> Automatic geo-currency switching, VAT/GST calculation, and localized payment rails.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span><strong>Complete Ownership:</strong> No recurring platform percentage cuts, vendor lock-in, or performance bottlenecks.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Direct Call To Action */}
                        <div className="pt-6 mt-6 border-t border-primary/15 flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/contact?subject=E-Commerce%20Store%20Development"
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full transition-all duration-300 hover:bg-primary-foreground hover:text-primary hover:scale-[1.02] shadow-[0_0_25px_rgba(var(--primary-rgb),0.3)] text-center group"
                            >
                                <span>Build Your Online Store</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Capabilities & Feature Breakdown (All 11 Requested Requirements) */}
            <div className="pt-10 border-t border-primary/15 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-display tracking-[0.3em] uppercase text-primary block mb-2">
                        Complete Feature Architecture
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase text-foreground">
                        Everything Your Store Needs to Scale
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {ecommerceFeatures.map((feat, idx) => {
                        const IconComponent = feat.icon;
                        return (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.04 }}
                                className="group/item p-5 sm:p-6 rounded-2xl bg-background/20 border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-4 group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors duration-300">
                                        <IconComponent className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-base font-display font-bold uppercase text-foreground group-hover/item:text-primary transition-colors mb-2 leading-snug">
                                        {feat.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm font-body text-muted-foreground leading-relaxed">
                                        {feat.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Final CTA Bar */}
            <div className="mt-12 pt-8 border-t border-primary/15 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="text-center md:text-left">
                    <p className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                        Ready to launch your custom marketplace?
                    </p>
                    <p className="text-sm sm:text-base font-body text-foreground/80 mt-1">
                        Turn your product vision into a high-converting, scalable e-commerce reality.
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 w-full md:w-auto">
                    <Link
                        href="/explore"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-primary/20 bg-background/40 hover:bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-widest text-center transition-all"
                    >
                        View Store Blueprints
                    </Link>
                    <Link
                        href="/start-project/?plan=store-essential"
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary text-xs sm:text-sm font-bold uppercase tracking-widest text-center transition-all shadow-lg hover:scale-105"
                    >
                        Build Your Online Store
                    </Link>
                </div>
            </div>
        </section>
    );
}
