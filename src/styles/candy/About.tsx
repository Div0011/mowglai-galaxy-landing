"use client";

import CandyLayout from "./Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Palette, Shield, Rocket, Globe, BarChart, Headphones } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function CandyAbout() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const stats = [
        { label: "PULSE SCALE", val: "2025", color: "#6ca2fb" },
        { label: "DNA MUTATIONS", val: "100+", color: "#ee5781" },
        { label: "ORBITAL SPEED", val: "FAST", color: "#66bcb4" },
        { label: "EUHPORIC RATE", val: "99%", color: "#ffd447" }
    ];

    return (
        <CandyLayout>
            <div className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-8 overflow-hidden">

                {/* HERO SECTION */}
                <section className="container mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex-1 text-center lg:text-left"
                        >
                            <h1 className="text-[15vw] md:text-8xl font-display font-black leading-[1.1] tracking-tighter uppercase italic mb-8 md:mb-12">
                                <span className={isDark ? "text-white/10" : "text-black/10"}>The</span> <br />
                                <span className="text-[#6ca2fb]">Pulse</span>
                            </h1>
                            <p className={`text-xl md:text-3xl font-body font-bold ${isDark ? 'text-white/40' : 'text-black/40'} leading-tight italic max-w-2xl mb-12`}>
                                We are your flexible digital partners. Partnering with ambitious brands worldwide, we craft stylish, professional websites that fit your unique vision.
                            </p>

                            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-xl mx-auto lg:mx-0">
                                {stats.map((s, i) => (
                                    <div key={i} className={`p-6 md:p-8 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/60 border-white'} backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] border-4 shadow-xl`}>
                                        <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/30'} mb-2`}>{s.label}</p>
                                        <p className="text-2xl md:text-4xl font-display font-black italic" style={{ color: s.color }}>{s.val}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex-1 relative w-full lg:w-auto">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="w-[120%] h-[120%] absolute -top-[10%] -left-[10%] bg-gradient-to-tr from-[#ee5781]/10 to-[#ffd447]/10 rounded-full blur-[80px] md:blur-[100px]"
                            />
                            <div className={`relative p-8 md:p-16 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-white/50'} rounded-[3rem] md:rounded-[5rem] shadow-2xl border-8`}>
                                <p className={`text-xl md:text-2xl font-body font-medium leading-relaxed italic ${isDark ? 'text-white/60' : 'text-black/60'} text-center`}>
                                    "In an era of noise, we choose the resonance of silence and the strength of form."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CULTURE GRID */}
                <section className="py-24 md:py-48 container mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Palette, title: "Modern & Stylish", color: "#ee5781", desc: "Creating modest yet visually striking designs tailored for any client profile." },
                            { icon: Shield, title: "Professional Grade", color: "#6ca2fb", desc: "Robust protocols ensuring your digital presence is secure and reliable." },
                            { icon: Rocket, title: "Peak Performance", color: "#ffd447", desc: "Optimized for speed and smoothness, respecting your user's time." },
                            { icon: Globe, title: "International Exp.", color: "#66bcb4", desc: "Proven track record with leading firms across multiple continents." },
                            { icon: BarChart, title: "Client Centric", color: "#ec802b", desc: "We adapt to your specific needs, regardless of industry or scale." },
                            { icon: Headphones, title: "Flexible Schedule", color: "#a08ac0", desc: "Active Mon-Sat across different time zones to match your workflow." }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className={`p-8 md:p-10 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white'} backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] border-4 md:border-8 shadow-xl text-center flex flex-col items-center gap-6 group`}
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: f.color }}>
                                    <f.icon className="text-white" size={32} />
                                </div>
                                <h3 className={`text-xl md:text-2xl font-display font-black uppercase italic ${isDark ? 'text-white/80' : 'text-black/80'}`}>{f.title}</h3>
                                <p className={`text-xs md:text-sm font-bold ${isDark ? 'text-white/20' : 'text-black/30'} uppercase leading-snug`}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* FINAL CTA */}
                <section className="container mx-auto py-20 md:py-32">
                    <div className={`p-12 md:p-20 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black'} text-white rounded-[3rem] md:rounded-[5rem] text-center relative overflow-hidden group border-4 md:border-8 border-transparent`}>
                        {!isDark && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="absolute inset-0 bg-[#ee5781]/20 blur-[100px]"
                            />
                        )}
                        <h2 className={`text-5xl md:text-8xl font-display font-black uppercase italic mb-8 md:mb-12 relative z-10 ${isDark ? 'text-white/90' : 'text-white'}`}>
                            Ready To <span className="text-[#ffd447]">Pulse?</span>
                        </h2>
                        <Link href="/contact" className="relative z-10 inline-block px-12 md:px-16 py-6 md:py-8 bg-[#6ca2fb] text-white text-xl md:text-2xl font-black rounded-[1.5rem] md:rounded-[2rem] hover:scale-110 active:scale-95 transition-all shadow-2xl border-b-8 border-black/20">
                            START DIALOGUE
                        </Link>
                    </div>
                </section>

            </div>
        </CandyLayout>
    );
}
