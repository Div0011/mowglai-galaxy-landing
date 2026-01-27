"use client";

import CandyLayout from "./Layout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const categories = ["ALL", "REBEL", "SILK", "NEON", "PRISM"];

const templates = [
    { title: "Quantum", category: "REBEL", color: "#6ca2fb", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
    { title: "Aura", category: "SILK", color: "#ee5781", image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1000&auto=format&fit=crop" },
    { title: "Velocity", category: "NEON", color: "#66bcb4", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" },
    { title: "Prism", category: "PRISM", color: "#a08ac0", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop" },
    { title: "Flux", category: "REBEL", color: "#ec802b", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop" },
    { title: "Zenith", category: "SILK", color: "#ffd447", image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1000&auto=format&fit=crop" }
];

export default function CandyExplore() {
    const [activeTab, setActiveTab] = useState("ALL");
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const filteredTemplates = activeTab === "ALL"
        ? templates
        : templates.filter(t => t.category === activeTab);

    return (
        <CandyLayout>
            <div className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-8 overflow-hidden">

                {/* HERO */}
                <section className="container mx-auto mb-16 md:mb-20 relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-[12vw] md:text-8xl lg:text-7xl font-display font-black leading-[1] md:leading-[1.1] tracking-tighter uppercase italic mb-8 md:mb-12"
                    >
                        <span className={isDark ? "text-white/10" : "text-black/10"}>The</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ca2fb] via-[#ee5781] to-[#ffd447]">Archive</span>
                    </motion.h1>

                    <div className="max-w-4xl mx-auto relative group">
                        <div className={`absolute -inset-4 ${isDark ? 'bg-white/5' : 'bg-white/40'} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <div className={`relative flex items-center ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-white'} backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 pl-8 md:pl-12 shadow-2xl border-4 md:border-8`}>
                            <Search className={`w-6 h-6 md:w-8 md:h-8 ${isDark ? 'text-white/20' : 'text-black/20'}`} />
                            <input
                                type="text"
                                placeholder="SEARCH THE SPECTRUM..."
                                className={`w-full bg-transparent border-none py-4 md:py-8 px-4 md:px-8 text-lg md:text-3xl font-display font-black uppercase italic placeholder:${isDark ? 'text-white/10' : 'text-black/10'} outline-none ${isDark ? 'text-white' : 'text-black'}`}
                            />
                            <button className={`hidden md:flex items-center gap-4 px-12 py-8 ${isDark ? 'bg-white text-black hover:bg-[#6ca2fb] hover:text-white' : 'bg-black text-white hover:bg-[#6ca2fb]'} rounded-[2rem] transition-all shadow-xl`}>
                                <span className="font-black uppercase tracking-widest text-xs">Filter</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* CATEGORIES */}
                <section className="container mx-auto mb-16 md:mb-24 sticky top-24 md:top-40 z-50 px-4">
                    <div className={`flex flex-wrap justify-center gap-2 md:gap-4 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/40 border-white'} backdrop-blur-3xl p-2 md:p-4 rounded-[1.5rem] md:rounded-[3rem] border-2 md:border-4 shadow-xl max-w-full md:max-w-fit mx-auto`}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-4 md:px-10 py-3 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] rounded-[1rem] md:rounded-[2rem] transition-all ${activeTab === cat ? (isDark ? 'bg-white text-black' : 'bg-black text-white shadow-lg') : (isDark ? 'hover:bg-white/10 text-white/40' : 'hover:bg-white/50 text-black/40')}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* TEMPLATE GRID - SOFT CARDS */}
                <section className="container mx-auto relative z-10 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        <AnimatePresence mode="popLayout">
                            {filteredTemplates.map((t, i) => (
                                <motion.div
                                    layout
                                    key={t.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className={`group relative h-[500px] md:h-[650px] rounded-[3rem] md:rounded-[5rem] overflow-hidden ${isDark ? 'bg-white/5 border-white/10 shadow-none' : 'bg-white border-white shadow-2xl'} border-4 md:border-8`}
                                >
                                    <Image
                                        src={t.image}
                                        alt={t.title}
                                        fill
                                        className="object-cover opacity-60 md:opacity-80 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-1000"
                                    />
                                    <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black via-black/40 to-transparent' : 'bg-gradient-to-t from-white via-white/10 to-transparent'} pt-32 transition-colors duration-500 group-hover:from-white/10`} />

                                    <div className={`absolute inset-x-0 bottom-0 p-8 md:p-12 relative z-10 ${isDark ? 'bg-black/80' : 'bg-white/90'} backdrop-blur-xl border-t-4 md:border-t-8 ${isDark ? 'border-white/5' : 'border-white'}`}>
                                        <span className="inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white mb-4 md:mb-6" style={{ backgroundColor: t.color }}>
                                            {t.category}
                                        </span>
                                        <h3 className={`text-3xl md:text-5xl font-display font-black ${isDark ? 'text-white/90' : 'text-black/80'} uppercase italic mb-6 md:mb-8 leading-none`}>{t.title}</h3>
                                        <div className="flex items-center justify-between">
                                            <div className={`flex items-center gap-4 ${isDark ? 'text-white' : 'text-black'} font-black uppercase tracking-widest text-[8px] md:text-[10px] group-hover:text-[#6ca2fb] transition-colors`}>
                                                <span>Deploy Soul</span>
                                                <ArrowRight size={16} />
                                            </div>
                                            <Link href="/preview" className={`w-10 h-10 md:w-12 md:h-12 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} rounded-full flex items-center justify-center hover:scale-110 transition-transform`}>
                                                <Zap size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                {/* FOOTER CALLOUT */}
                <section className="container mx-auto py-24 md:py-48 text-center relative z-10 px-4">
                    <p className={`max-w-4xl mx-auto text-xl md:text-3xl font-display font-medium ${isDark ? 'text-white/30' : 'text-black/30'} mb-16 md:mb-24 italic leading-tight`}>
                        "Each template is a starting point for a unique digital journey. We don't believe in generic; we believe in foundations for greatness."
                    </p>

                    <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center items-center">
                        <Link href="/investment" className="group flex flex-col items-center">
                            <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-black ${isDark ? 'text-white/20' : 'text-black/20'} mb-4 md:mb-6 group-hover:text-black transition-colors`}>Economic Models</span>
                            <h4 className={`text-5xl md:text-7xl font-display font-black uppercase italic leading-none ${isDark ? 'text-white/90 group-hover:text-[#6ca2fb]' : 'group-hover:text-[#6ca2fb]'} transition-all`}>
                                View <br /> Economy
                            </h4>
                        </Link>
                        <Link href="/contact" className="group flex flex-col items-center">
                            <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.5em] font-black ${isDark ? 'text-white/20' : 'text-black/20'} mb-4 md:mb-6 group-hover:text-black transition-colors`}>Start Build</span>
                            <h4 className={`text-5xl md:text-7xl font-display font-black uppercase italic leading-none ${isDark ? 'text-white/90 group-hover:text-[#ee5781]' : 'group-hover:text-[#ee5781]'} transition-all`}>
                                Start <br /> Dialogue
                            </h4>
                        </Link>
                    </div>
                </section>

            </div>
        </CandyLayout>
    );
}
