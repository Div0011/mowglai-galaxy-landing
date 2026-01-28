"use client";

import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    const [planType, setPlanType] = useState<"standard" | "premium">("standard");

    return (
        <PageLayout>
            <div className="bg-background text-foreground min-h-screen px-4 md:px-24 py-32 font-sans overflow-hidden relative">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 relative z-10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary/20 pb-12 gap-12">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.5em] text-primary block mb-6">Financial Strategy</span>
                            <h1 className="text-6xl md:text-8xl font-display font-black leading-tight uppercase tracking-tighter">
                                The <br /> <span className="text-primary">Economy</span>
                            </h1>
                        </div>

                        {/* Toggle */}
                        <div className="flex bg-secondary/30 p-1 rounded-full border border-primary/20 backdrop-blur-sm">
                            {["standard", "premium"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setPlanType(type as "standard" | "premium")}
                                    className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${planType === type ? 'bg-primary text-background' : 'text-muted-foreground hover:text-foreground'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Investment Content */}
                <div className="min-h-[600px] relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={planType}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {(planType === "standard" ? plans.standard : plans.premium).map((plan, i) => (
                                <div
                                    key={i}
                                    className="p-10 md:p-12 rounded-3xl bg-secondary/20 border border-primary/10 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-500 flex flex-col group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="mb-12 relative z-10">
                                        <h3 className="text-4xl font-display uppercase italic mb-2 text-primary">{plan.name}</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{plan.description}</p>
                                    </div>

                                    <div className="mb-16 relative z-10">
                                        <div className="text-5xl md:text-6xl font-display font-black leading-none mb-3 text-foreground">{plan.price}</div>
                                        {plan.price !== "CUSTOM" && <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">Initial Acquisition</span>}
                                    </div>

                                    <ul className="space-y-6 mb-16 flex-grow font-body text-sm tracking-wide relative z-10">
                                        {plan.features.map((f, fi) => (
                                            <li key={fi} className="flex gap-4 items-start text-foreground/80">
                                                <span className="text-primary mt-0.5">•</span>
                                                <span className="">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="relative z-10 w-full py-5 border border-primary/30 text-xs font-black uppercase tracking-[0.4em] transition-all bg-transparent text-primary hover:bg-primary hover:text-background rounded-xl mt-auto shadow-[0_0_20px_rgba(var(--primary-rgb),0.0)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]">
                                        {plan.cta}
                                    </button>
                                </div>
                            ))}

                            {/* Filler for premium if it's solo */}
                            {planType === "premium" && (
                                <div className="col-span-2 p-16 flex flex-col justify-center items-center bg-secondary/10 border border-primary/10 rounded-3xl overflow-hidden relative">
                                    <div className="absolute top-0 right-0 text-[20vw] font-display font-black text-primary opacity-[0.05] select-none pointer-events-none -mt-10 -mr-10 italic">
                                        APEX
                                    </div>
                                    <Sparkles size={120} className="text-primary opacity-20 mb-12 stroke-[1px]" />
                                    <p className="max-w-md text-center text-muted-foreground font-body text-xl italic leading-relaxed uppercase tracking-widest">
                                        Tailored specifically for those who demand absolute digital hegemony.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Resource Downloads */}
                <div className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    {[
                        { title: "THE BROCHURE", icon: Download, label: "Digital Artifact Catalog" },
                        { title: "THE QUOTATION", icon: FileText, label: "Bespoke Request Engine" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-12 border border-primary/20 rounded-3xl flex flex-col justify-between items-center text-center space-y-8 bg-secondary/20 hover:bg-secondary/40 transition-all group backdrop-blur-sm"
                        >
                            <item.icon className="w-12 h-12 stroke-[1px] text-primary" />
                            <div>
                                <h3 className="text-3xl font-display uppercase mb-2 text-foreground">{item.title}</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                            </div>
                            <button className="mt-8 text-xs font-bold uppercase tracking-[0.5em] border-b border-primary text-primary pb-2 hover:opacity-80 transition-opacity">
                                Secure Access
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Footnote */}
                <div className="mt-48 pt-12 border-t border-primary/20 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                    <div className="max-w-md space-y-6">
                        <p className="text-xs font-bold uppercase tracking-[0.5em] text-primary/60">Protocol Note</p>
                        <p className="text-xs font-body leading-loose text-muted-foreground uppercase tracking-widest">
                            All investments require a 50% initiation fee prior to architecture development. Timelines are subject to studio bandwidth and project complexity.
                        </p>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-[0.5em] text-primary/40 italic">
                        © 2025 Mowglai / Reserved
                    </div>
                </div>

                {/* Next Chapter CTA - Final Narrative */}
                <div className="mt-64 pt-32 border-t border-primary/20 flex flex-col items-center text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <h2 className="text-3xl md:text-5xl font-display italic max-w-4xl mx-auto leading-tight text-foreground">
                            "The investment in excellence is the only currency that never devalues in the digital age."
                        </h2>
                    </motion.div>

                    <Link href="/contact" className="group">
                        <span className="text-xs uppercase tracking-[0.5em] text-muted-foreground block mb-8">Next Movement</span>
                        <h4 className="text-6xl md:text-[8vw] font-display font-black uppercase leading-none transition-all group-hover:text-primary duration-700">
                            Say <span className="text-foreground group-hover:text-primary transition-colors">Hello</span>
                        </h4>
                        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-primary/60 group-hover:text-primary transition-opacity">Initiate Dialogue & Project Scoping</p>
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
