"use client";

import MinimalLayout from "./Layout";
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

export default function MinimalInvestment() {
    const [planType, setPlanType] = useState<"standard" | "premium">("standard");

    return (
        <MinimalLayout>
            <div className="bg-white text-black min-h-screen px-4 md:px-24 py-32 font-serif selection:bg-black selection:text-white overflow-hidden">

                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-black pb-12 gap-12">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400 block mb-6">Financial Strategy</span>
                            <h1 className="text-[12vw] md:text-[8vw] font-display font-black leading-[0.7] uppercase tracking-tighter">
                                The <br /> <span className="italic">Economy</span>
                            </h1>
                        </div>

                        {/* Toggle */}
                        <div className="flex bg-neutral-100 p-1 rounded-sm border border-black/10">
                            {["standard", "premium"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setPlanType(type as "standard" | "premium")}
                                    className={`px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${planType === type ? 'bg-black text-white' : 'text-neutral-400 hover:text-black'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Investment Content */}
                <div className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={planType}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black"
                        >
                            {(planType === "standard" ? plans.standard : plans.premium).map((plan, i) => (
                                <div
                                    key={i}
                                    className={`p-12 md:p-16 border-black bg-white group hover:bg-black hover:text-white transition-all duration-500 flex flex-col ${i !== (planType === "standard" ? plans.standard.length - 1 : plans.premium.length - 1) ? 'md:border-r' : ''}`}
                                >
                                    <div className="mb-12">
                                        <h3 className="text-3xl font-display uppercase italic mb-2">{plan.name}</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{plan.description}</p>
                                    </div>

                                    <div className="mb-20">
                                        <div className="text-6xl font-display font-black leading-none mb-2">{plan.price}</div>
                                        {plan.price !== "CUSTOM" && <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Initial Acquisition</span>}
                                    </div>

                                    <ul className="space-y-6 mb-20 flex-grow font-body text-sm uppercase tracking-wide">
                                        {plan.features.map((f, fi) => (
                                            <li key={fi} className="flex gap-4 items-start">
                                                <span className="text-xs mt-0.5">•</span>
                                                <span className="opacity-60">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button className="relative z-10 w-full py-5 border border-black !bg-white !text-black !mix-blend-normal text-[11px] font-black uppercase tracking-[0.4em] transition-all group-hover:!bg-white group-hover:!text-black group-hover:!border-white hover:scale-105 active:scale-95 mt-auto">
                                        {plan.cta}
                                    </button>
                                </div>
                            ))}

                            {/* Filler for premium if it's solo */}
                            {planType === "premium" && (
                                <div className="col-span-2 p-16 flex flex-col justify-center items-center bg-neutral-50 border-l border-black overflow-hidden relative">
                                    <div className="absolute top-0 right-0 text-[30vw] font-display font-black opacity-[0.03] select-none pointer-events-none -mt-20 -mr-20 italic">
                                        APEX
                                    </div>
                                    <Sparkles size={120} className="opacity-5 mb-12 stroke-[1px]" />
                                    <p className="max-w-md text-center text-neutral-400 font-body text-xl italic leading-relaxed uppercase tracking-widest">
                                        Tailored specifically for those who demand absolute digital hegemony.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Resource Downloads */}
                <div className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { title: "THE BROCHURE", icon: Download, label: "Digital Artifact Catalog" },
                        { title: "THE QUOTATION", icon: FileText, label: "Bespoke Request Engine" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-16 border border-black flex flex-col justify-between items-center text-center space-y-8 bg-neutral-50 group transition-colors hover:bg-black hover:text-white"
                        >
                            <item.icon className="w-12 h-12 stroke-[1px]" />
                            <div>
                                <h3 className="text-3xl font-display uppercase mb-2">{item.title}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{item.label}</p>
                            </div>
                            <button className="mt-12 text-[10px] font-bold uppercase tracking-[0.5em] border-b border-current pb-2 hover:opacity-100 transition-opacity">
                                Secure Access
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Footnote */}
                <div className="mt-48 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="max-w-md space-y-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400">Protocol Note</p>
                        <p className="text-xs font-body leading-loose text-neutral-500 uppercase tracking-widest">
                            All investments require a 50% initiation fee prior to architecture development. Timelines are subject to studio bandwidth and project complexity.
                        </p>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400 italic">
                        © 2025 Mowglai / Reserved
                    </div>
                </div>

                {/* Next Chapter CTA - Final Narrative */}
                <div className="mt-64 pt-32 border-t-2 border-black flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <h2 className="text-3xl md:text-5xl font-display italic max-w-4xl mx-auto leading-tight">
                            "The investment in excellence is the only currency that never devalues in the digital age."
                        </h2>
                    </motion.div>

                    <Link href="/contact" className="group">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 block mb-8">Next Movement</span>
                        <h4 className="text-7xl md:text-[10vw] font-display font-black uppercase leading-none transition-all group-hover:italic group-hover:tracking-widest duration-700">
                            Say <span className="text-neutral-200 group-hover:text-black transition-colors">Hello</span>
                        </h4>
                        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Initiate Dialogue & Project Scoping</p>
                    </Link>
                </div>
            </div>
        </MinimalLayout>
    );
}
