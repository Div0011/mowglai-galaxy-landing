"use client";

import { useState } from "react";
import CandyLayout from "./Layout";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const plans = {
    standard: [
        {
            name: "BASIC",
            price: "$499",
            description: "Essential Digital Presence",
            features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"],
            color: "#6ca2fb"
        },
        {
            name: "ADVANCED",
            price: "$999",
            description: "Scale & Growth Architecture",
            features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "3 months support"],
            color: "#ee5781"
        },
        {
            name: "EPIC",
            price: "CUSTOM",
            description: "Infrastructure Level Solutions",
            features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support"],
            color: "#66bcb4"
        }
    ],
    premium: [
        {
            name: "APEX",
            price: "$4,999+",
            description: "Industry-Leading Digital Soul",
            features: ["Bespoke Digital Architecture", "Survival Ready Support", "Strategic Market Hegemony", "Liquid Motion Graphics", "Neural AI Integration"],
            color: "#ffd447"
        }
    ]
};

export default function CandyInvestment() {
    const [planType, setPlanType] = useState<"standard" | "premium">("standard");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <CandyLayout>
            <div className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-8 overflow-hidden">

                {/* HERO */}
                <section className="container mx-auto mb-20 md:mb-32 relative z-10 text-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <h1 className="text-[12vw] md:text-8xl font-display font-black leading-[1.1] tracking-tighter uppercase italic mb-8">
                            <span className={isDark ? "text-white/10" : "text-black/10"}>The</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ca2fb] via-[#ee5781] to-[#ffd447]">Economy</span>
                        </h1>
                        <p className={`text-xl md:text-2xl font-body font-bold ${isDark ? "text-white/40" : "text-black/40"} italic leading-tight max-w-4xl mx-auto mb-12 md:mb-16 px-4`}>
                            "The investment in excellence is the only currency that never devalues in the digital age."
                        </p>

                        <div className={`flex justify-center gap-2 md:gap-4 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/40 border-white'} backdrop-blur-xl p-2 md:p-3 border-2 md:border-4 rounded-[1.5rem] md:rounded-[2.5rem] w-fit mx-auto shadow-xl`}>
                            {["standard", "premium"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setPlanType(type as any)}
                                    className={`px-6 md:px-12 py-3 md:py-4 rounded-[1rem] md:rounded-[1.5rem] text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${planType === type ? 'bg-black text-white shadow-lg' : isDark ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-black/30 hover:text-black hover:bg-white/50'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* PLANS BENTO */}
                <section className="container mx-auto mb-24 md:mb-32 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {(planType === "standard" ? plans.standard : plans.premium).map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className={`p-8 md:p-12 lg:p-16 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white'} backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] border-4 md:border-8 shadow-2xl relative overflow-hidden group flex flex-col`}
                            >
                                <div className="relative z-10 flex-grow">
                                    <div className="mb-10 md:mb-12">
                                        <h3 className={`text-3xl md:text-4xl font-display font-black uppercase italic mb-2 ${isDark ? 'text-white/90' : 'text-black/80'}`}>{plan.name}</h3>
                                        <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>{plan.description}</p>
                                    </div>

                                    <div className="mb-12 md:mb-16">
                                        <div className="text-5xl md:text-6xl font-display font-black leading-none mb-2" style={{ color: plan.color }}>{plan.price}</div>
                                        {plan.price !== "CUSTOM" && <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>Initial Acquisition</p>}
                                    </div>

                                    <ul className="space-y-4 md:space-y-6 mb-12 md:mb-16">
                                        {plan.features.map((f, fi) => (
                                            <li key={fi} className="flex gap-4 items-center">
                                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: plan.color }} />
                                                <span className={`text-sm font-bold ${isDark ? 'text-white/30' : 'text-black/40'} italic`}>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href="/contact" className="relative group/btn w-full mt-auto">
                                    <div className="absolute inset-0 bg-black rounded-[1.5rem] md:rounded-[2rem] translate-y-2 group-hover/btn:translate-y-1 transition-transform" />
                                    <div className={`w-full py-5 md:py-6 text-center ${isDark ? 'bg-[#1a1a1a] text-white border-white/10' : 'bg-white text-black border-white'} text-xs font-black uppercase tracking-widest rounded-[1.5rem] md:rounded-[2rem] relative z-10 active:translate-y-1 transition-transform border-4 shadow-xl`}>
                                        Initiate
                                    </div>
                                </Link>
                                <div className={`absolute -bottom-6 -right-6 text-[6rem] md:text-[8rem] font-black ${isDark ? 'text-white/[0.02]' : 'text-black/[0.02]'} italic select-none pointer-events-none`}>0{i + 1}</div>
                            </motion.div>
                        ))}

                        {planType === "premium" && (
                            <div className={`md:col-span-2 p-12 md:p-24 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/40 border-white'} backdrop-blur-xl rounded-[3rem] md:rounded-[5rem] border-4 md:border-8 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                                <Sparkles className={`${isDark ? 'text-[#ffd447]/40' : 'text-[#ffd447]'} mb-8 md:mb-12 opacity-20`} size={120} />
                                <p className={`max-w-xl text-xl md:text-2xl font-body font-bold ${isDark ? 'text-white/30' : 'text-black/30'} italic leading-relaxed uppercase tracking-widest`}>
                                    Tailored specifically for those who demand absolute digital hegemony.
                                </p>
                                <div className={`absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 text-[15vw] md:text-[20vw] font-display font-black ${isDark ? 'text-white/[0.01]' : 'text-black/[0.02]'} italic select-none pointer-events-none`}>APEX</div>
                            </div>
                        )}
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="container mx-auto">
                    <div className={`p-12 md:p-24 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black'} text-white rounded-[3rem] md:rounded-[5rem] text-center relative overflow-hidden group border-4 border-transparent`}>
                        {!isDark && (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-32 -right-32 w-1/2 h-full bg-[#ffd447]/10 rounded-full blur-[120px]"
                            />
                        )}
                        <h2 className={`text-4xl md:text-7xl font-display font-black uppercase italic mb-8 md:mb-12 relative z-10 leading-none ${isDark ? 'text-white/90' : 'text-white'}`}>
                            Ready To <br /> <span className="text-[#ee5781]">Transact?</span>
                        </h2>
                        <Link href="/contact" className="relative z-10 inline-flex items-center gap-6 px-12 md:px-16 py-6 md:py-8 bg-[#6ca2fb] text-white text-xl md:text-2xl font-black rounded-[1.5rem] md:rounded-[2rem] hover:scale-110 active:scale-95 transition-all shadow-2xl">
                            FUEL UP <ArrowUpRight size={32} />
                        </Link>
                    </div>
                </section>

            </div>
        </CandyLayout>
    );
}
