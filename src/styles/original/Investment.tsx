"use client";

import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { downloadAsHtml } from "@/utils/pdfDownloader";
import NextPageButton from "@/components/NextPageButton";
import UserPurchasesSection from "@/components/UserPurchasesSection";

const plans = {
    standard: [
        {
            name: "BASIC",
            price: "$499",
            description: "Essential Digital Prescence",
            features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"],
            cta: "Initiate"
        },
        {
            name: "ADVANCED",
            price: "$999",
            description: "Scale & Growth Architecture",
            features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "3 months support"],
            cta: "Accelerate"
        },
        {
            name: "EPIC",
            price: "CUSTOM",
            description: "Infrastructure Level Solutions",
            features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support"],
            cta: "Dialogue"
        }
    ],
    premium: [
        {
            name: "APEX",
            price: "$4,999+",
            description: "Industry-Leading Digital Soul",
            features: ["Bespoke Digital Architecture", "Survival Ready Support", "Strategic Market Hegemony", "Liquid Motion Graphics", "Neural AI Integration"],
            cta: "Dominate"
        }
    ]
};

export default function OriginalInvestment() {
    const { t } = useLanguage();
    const router = useRouter();
    const [planType, setPlanType] = useState<"standard" | "premium">("standard");
    const [discountCode, setDiscountCode] = useState("");
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [discountError, setDiscountError] = useState("");

    const handleApplyDiscount = () => {
        if (discountCode.trim().toUpperCase() === "MOWGLAI10") {
            setIsDiscountApplied(true);
            setDiscountError("");
        } else {
            setIsDiscountApplied(false);
            setDiscountError("Invalid Code");
        }
    };

    const getPrice = (originalPrice: string) => {
        if (!isDiscountApplied || originalPrice === "CUSTOM" || originalPrice.includes("+")) return originalPrice;
        const numericPart = originalPrice.replace(/[^\d]/g, "");
        const numPrice = parseInt(numericPart, 10);
        if (isNaN(numPrice)) return originalPrice;
        const discounted = Math.round(numPrice * 0.9);
        return `$${discounted}`;
    };

    // Mapping for standard plans from translations + prices from local config
    const standardPlans = [
        { ...t.Pricing.plans.basic, price: plans.standard[0].price, type: 'basic' },
        { ...t.Pricing.plans.advanced, price: plans.standard[1].price, type: 'advanced' },
        { ...t.Pricing.plans.epic, price: plans.standard[2].price, type: 'epic' }
    ];

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-32 font-sans relative">


                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 relative z-10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary/20 pb-12 gap-12">
                        <div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-primary block mb-6">Financial Strategy</span>
                            <h1 className="text-5xl md:text-[6.5rem] lg:text-[7.5rem] font-display font-black leading-tight uppercase tracking-tighter">
                                The <br /> <span className="text-primary italic">Economy</span>
                            </h1>
                        </div>

                        <div className="flex flex-col items-end gap-6">
                            {/* Purchases Button */}
                            <button
                                onClick={() => document.getElementById('user-purchases')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] transition-all flex items-center gap-3 z-50 animate-pulse hover:animate-none"
                            >
                                <Sparkles className="w-5 h-5" />
                                Your Assets
                            </button>

                            {/* Toggle */}
                            <div className="flex bg-background/20 p-1 rounded-full border border-primary/20 backdrop-blur-xl">
                                {["standard", "premium"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setPlanType(type as "standard" | "premium")}
                                        className={`px-8 py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all rounded-full ${planType === type ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]' : 'text-primary/60 hover:text-primary'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Discount Code Section */}
                <div className="flex justify-center mb-16 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 bg-background/20 p-2 rounded-2xl border border-primary/20 backdrop-blur-xl group hover:border-primary/40 transition-colors">
                            <input
                                type="text"
                                placeholder="Discount Code"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="bg-transparent border-none text-foreground placeholder:text-muted-foreground/30 focus:ring-0 text-sm uppercase tracking-wider w-40 md:w-48 px-4"
                            />
                            <button
                                onClick={handleApplyDiscount}
                                className="bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                Apply
                            </button>
                        </div>
                        <AnimatePresence>
                            {isDiscountApplied && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                                >
                                    <Check size={14} /> 10% Discount Applied!
                                </motion.span>
                            )}
                            {discountError && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest"
                                >
                                    {discountError}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Investment Content */}
                <div className="min-h-[600px] relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={planType}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {planType === "standard" ? (
                                standardPlans.map((plan, i) => (
                                    <div
                                        key={i}
                                        className="p-10 md:p-14 rounded-[2.5rem] bg-secondary/20 border border-primary/10 hover:border-primary/40 hover:bg-secondary/30 transition-all duration-500 flex flex-col group relative overflow-hidden backdrop-blur-md"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                        <div className="mb-12 relative z-10">
                                            <h3 className="text-3xl md:text-5xl font-display uppercase italic mb-4 text-primary group-hover:scale-105 transition-transform origin-left">{plan.name}</h3>
                                            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{plan.description}</p>
                                        </div>

                                        <div className="mb-16 relative z-10 h-16 sm:h-20 flex flex-col justify-center">
                                            <div className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-none mb-3 text-foreground flex items-center flex-wrap gap-4">
                                                <AnimatePresence mode="wait">
                                                    {isDiscountApplied && plan.price !== "CUSTOM" && !plan.price.includes("+") ? (
                                                        <motion.div
                                                            key="discounted"
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="flex items-center gap-4"
                                                        >
                                                            <span className="line-through text-muted-foreground/30 text-3xl sm:text-4xl">{plan.price}</span>
                                                            <span className="text-primary">{getPrice(plan.price)}</span>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="regular"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                        >
                                                            {plan.price}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            {plan.price !== "CUSTOM" && <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/40">Initial Acquisition</span>}
                                        </div>

                                        <ul className="space-y-6 mb-16 flex-grow font-body text-base md:text-lg tracking-wide relative z-10">
                                            {(plan.features as string[]).map((f, fi) => (
                                                <li key={fi} className="flex gap-4 items-start text-foreground/80 group-hover:text-foreground transition-colors">
                                                    <div className="mt-2 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                                    <span className="leading-snug">{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/start-project?plan=${plan.type}`}
                                            className="relative z-10 w-full py-4 px-8 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center mt-auto"
                                        >
                                            {plan.button}
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1 p-10 md:p-14 rounded-[2.5rem] bg-primary/10 border-2 border-primary/30 hover:border-primary transition-all duration-500 flex flex-col group relative overflow-hidden backdrop-blur-xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />

                                        <div className="mb-12 relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-5xl font-display uppercase italic text-primary">APEX</h3>
                                                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                                            </div>
                                            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{t.Investment.apex.description}</p>
                                        </div>

                                        <div className="mb-20 relative z-10">
                                            <div className="text-5xl md:text-7xl font-display font-black text-foreground mb-4">$4,999+</div>
                                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/40">Architecture Level</span>
                                        </div>

                                        <ul className="space-y-6 mb-16 flex-grow font-body text-base md:text-lg tracking-wide relative z-10">
                                            {["Bespoke Digital Architecture", "Survival Ready Support", "Strategic Market Hegemony", "Liquid Motion Graphics", "Neural AI Integration"].map((f, fi) => (
                                                <li key={fi} className="flex gap-4 items-start text-foreground/90">
                                                    <div className="mt-2 w-2 h-2 rounded-full bg-primary" />
                                                    <span className="leading-snug">{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href="/contact"
                                            className="relative z-10 w-full py-4 px-8 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center"
                                        >
                                            {t.Investment.apex.button}
                                        </Link>
                                    </div>

                                    <div className="md:col-span-2 p-16 flex flex-col justify-center items-center bg-background/10 border border-primary/10 rounded-[2.5rem] overflow-hidden relative backdrop-blur-sm group">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display font-black text-primary opacity-[0.03] select-none pointer-events-none italic group-hover:scale-110 transition-transform duration-1000">
                                            APEX
                                        </div>
                                        <Sparkles size={120} className="text-primary opacity-20 mb-12 stroke-[1px] animate-pookie-float" />
                                        <p className="max-w-md text-center text-foreground/60 font-display text-2xl md:text-3xl italic leading-relaxed uppercase tracking-widest">
                                            "Tailored for those who demand <span className="text-primary">absolute hegemony</span>."
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Resource Downloads */}
                <div className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    {[
                        { title: t.Investment.brochure.title, icon: Download, label: t.Investment.brochure.description, btn: t.Investment.brochure.button, file: "mowglai-brochure.html", name: "Mowglai_Brochure.html" },
                        { title: t.Investment.customQuote.title, icon: FileText, label: t.Investment.customQuote.description, btn: t.Investment.customQuote.button, link: "/custom-request" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-16 border border-primary/20 rounded-[2.5rem] flex flex-col justify-between items-center text-center space-y-10 bg-secondary/10 hover:bg-secondary/20 transition-all group backdrop-blur-md"
                        >
                            <div className="p-6 rounded-3xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <item.icon className="w-12 h-12 stroke-[1.5px]" />
                            </div>
                            <div>
                                <h3 className="text-4xl md:text-5xl font-display uppercase mb-4 text-foreground">{item.title}</h3>
                                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-8">{item.label}</p>
                            </div>
                            {item.link ? (
                                <Link
                                    href={item.link}
                                    className="mt-10 inline-block w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center"
                                >
                                    {item.btn}
                                </Link>
                            ) : (
                                <button
                                    onClick={() => downloadAsHtml(`/${item.file!}`, item.name!)}
                                    className="mt-10 inline-block w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center"
                                >
                                    {item.btn}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* User Purchases Section - New Addition */}
                <UserPurchasesSection />

                {/* Footnote */}
                <div className="mt-48 pt-12 border-t border-primary/20 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10 opacity-60">
                    <div className="max-w-md space-y-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Protocol Note</p>
                        <p className="text-sm font-body leading-loose text-muted-foreground uppercase tracking-widest">
                            All investments require a 50% initiation fee prior to architecture development. Timelines are subject to studio bandwidth and project complexity.
                        </p>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/40 italic">
                        © {new Date().getFullYear()} Mowglai / Reserved
                    </div>
                </div>

                {/* Next Chapter CTA - Final Narrative */}
                <div className="mt-32 relative z-10">
                    <NextPageButton
                        label="HELLO"
                        href="/contact"
                        tagline="Initiate Dialogue"
                    />
                </div>
            </div>
        </PageLayout>
    )
};
