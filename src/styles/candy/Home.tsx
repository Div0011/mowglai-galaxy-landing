"use client";

import CandyLayout from "./Layout";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Layout, Sparkles, Box, Compass, Play, ArrowRight, ExternalLink, RefreshCw, Layers, Globe, MousePointer2, Heart, Star, Rocket } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SelectedWork = dynamic(() => import("@/components/SelectedWork"), { ssr: false });
const AestheticShowcase = dynamic(() => import("@/components/AestheticShowcase").then(mod => mod.AestheticShowcase), { ssr: false });

import { useTheme } from "next-themes";

export default function CandyHome() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { scrollYProgress } = useScroll();

    // Subtle parallax for floating elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    return (
        <CandyLayout>
            <div className="relative overflow-hidden">

                {/* HERO - SOFT BUBBLE DESIGN */}
                <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-24 md:pt-32">
                    <div className="container mx-auto relative z-20">

                        {/* Floating Candy Icons */}
                        <motion.div style={{ y: y1, rotate }} className={`absolute -top-20 -left-20 ${isDark ? 'text-[#6ca2fb]/10' : 'text-[#6ca2fb]/30'} hidden lg:block`}>
                            <Star size={180} fill="currentColor" stroke="none" />
                        </motion.div>
                        <motion.div style={{ y: y2, rotate: -rotate }} className={`absolute -bottom-40 -right-20 ${isDark ? 'text-[#ee5781]/10' : 'text-[#ee5781]/30'} hidden lg:block`}>
                            <Heart size={200} fill="currentColor" stroke="none" />
                        </motion.div>

                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`inline-flex items-center gap-3 px-6 py-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/80 border-[#fffbfb]'} backdrop-blur-md rounded-full border-4 shadow-xl mb-8 md:mb-12`}
                            >
                                <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#ffd447] animate-pulse" />
                                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/60' : 'text-black/60'}`}>Creative Euphoria</span>
                                <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#66bcb4] animate-pulse" />
                            </motion.div>

                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, type: "spring" }}
                                className={`text-[12vw] md:text-[7vw] font-display font-black leading-[0.9] md:leading-[1] tracking-tighter uppercase mb-8 md:mb-16 italic ${isDark ? 'text-white' : 'text-[#333]'}`}
                            >
                                <span className="drop-shadow-[0_10px_30px_rgba(108,162,251,0.3)] text-[#6ca2fb]">
                                    {t.Home?.weCreate?.split(' ')[0] || "Creative"}
                                </span> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee5781] via-[#ffd447] to-[#66bcb4] drop-shadow-[0_10px_20px_rgba(238,87,129,0.3)]">
                                    {t.Home?.weCreate?.split(' ').slice(1).join(' ') || "Excellence"}
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className={`max-w-3xl mx-auto text-xl md:text-3xl font-body font-bold ${isDark ? 'text-white/40' : 'text-black/40'} mb-12 md:mb-20 leading-tight italic`}
                            >
                                We've abandoned the boring grid for a world of liquid color and soft-textured digital artifacts.
                            </motion.p>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-wrap justify-center gap-8"
                            >
                                <Link href="/contact" className="group relative">
                                    <div className="absolute inset-0 bg-black rounded-[2rem] translate-y-2 group-hover:translate-y-1 transition-transform" />
                                    <div className="px-12 py-8 bg-[#ee5781] text-white text-lg font-black uppercase tracking-widest rounded-[2rem] relative z-10 active:translate-y-1 transition-transform shadow-[0_15px_30px_rgba(238,87,129,0.4)] flex items-center gap-4">
                                        IGNITE PULSE <Zap className="w-5 h-5 fill-current" />
                                    </div>
                                </Link>
                                <Link href="/explore" className="group relative">
                                    <div className="absolute inset-0 bg-black/10 rounded-[2rem] translate-y-2" />
                                    <div className="px-12 py-8 bg-white text-[#333] text-lg font-black uppercase tracking-widest rounded-[2rem] relative z-10 active:translate-y-1 transition-transform border-4 border-white shadow-xl flex items-center gap-4">
                                        THE GALLERY <Layout className="w-5 h-5" />
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll Hint */}
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] vertical-text">Scroll To Experience</span>
                        <div className="w-1 h-12 bg-black rounded-full" />
                    </motion.div>
                </section>

                {/* BENTO GRID - SOFT TILES */}
                <section className="py-24 md:py-48 px-4 md:px-8 relative z-20">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
                            <div className="max-w-2xl">
                                <h2 className={`text-[12vw] md:text-7xl font-display font-black leading-[0.85] tracking-tighter uppercase italic ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                                    <span className="text-[#6ca2fb]">CORE</span> <br />
                                    <span className="text-[#ee5781]">ENZYMES</span>
                                </h2>
                            </div>
                            <p className={`text-sm md:text-xl font-black ${isDark ? 'text-white/20' : 'text-black/30'} uppercase tracking-[0.3em]`}>Genetic engineering for the web.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Soft UI", color: "#6ca2fb", icon: <MousePointer2 />, desc: "Layouts that feel organic and tactile, moving away from sharp, rigid digital edges." },
                                { title: "Chroma Shift", color: "#ffd447", icon: <RefreshCw />, desc: "Color systems that breathe and mutate based on the temporal pulse of your brand." },
                                { title: "Euphoric Code", color: "#66bcb4", icon: <Rocket />, desc: "Performance optimized for happiness. Every interaction is designed to spark digital joy." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className={`p-10 md:p-12 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white'} backdrop-blur-xl rounded-[3rem] md:rounded-[4rem] border-4 md:border-8 shadow-2xl relative overflow-hidden group`}
                                >
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center mb-10 md:mb-12 shadow-xl shrink-0" style={{ backgroundColor: item.color }}>
                                            <div className="text-white">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <h3 className={`text-3xl md:text-4xl font-display font-black mb-6 uppercase italic ${isDark ? 'text-white/90' : 'text-black/80'}`}>{item.title}</h3>
                                        <p className={`text-base md:text-lg font-medium ${isDark ? 'text-white/30' : 'text-black/40'} leading-tight italic`}>{item.desc}</p>
                                    </div>
                                    <div className={`absolute -bottom-8 -right-8 text-[8rem] md:text-[12rem] font-black ${isDark ? 'text-white/[0.02]' : 'text-black/[0.03]'} italic`}>0{i + 1}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SHOWCASE SECTION - GLASSMOPHISM GRID */}
                <section className={`py-24 md:py-48 px-4 md:px-8 ${isDark ? 'bg-white/[0.02]' : 'bg-black/5'}`}>
                    <div className="container mx-auto">
                        <div className={`bg-white/${isDark ? '5' : '40'} backdrop-blur-2xl rounded-[3rem] md:rounded-[5rem] border-4 md:border-8 ${isDark ? 'border-white/10' : 'border-white'} p-8 md:p-24 shadow-[0_0_100px_rgba(0,0,0,0.05)] relative overflow-hidden`}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-24">
                                <div>
                                    <h2 className={`text-[15vw] md:text-8xl font-display font-black leading-[0.8] tracking-tighter uppercase italic mb-6 ${isDark ? 'text-white/90' : 'text-black/90'}`}>
                                        The <br /> <span className="text-[#ec802b]">Museum</span>
                                    </h2>
                                    <p className={`text-lg md:text-xl font-bold ${isDark ? 'text-white/20' : 'text-black/30'} uppercase italic`}>A curated collection of digital artifacts.</p>
                                </div>
                                <Link href="/explore" className="w-16 h-16 md:w-20 md:h-20 bg-[#6ca2fb] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                                    <ArrowRight size={window?.innerWidth < 768 ? 24 : 32} />
                                </Link>
                            </div>

                            <div className={`rounded-[2rem] md:rounded-[3rem] overflow-hidden border-4 md:border-8 ${isDark ? 'border-white/10' : 'border-white'} shadow-2xl ${isDark ? 'bg-black/40' : 'bg-white'}`}>
                                <Suspense fallback={<div className="h-[400px] md:h-[600px] bg-black/5 animate-pulse" />}>
                                    <SelectedWork />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL BURST */}
                <section className="py-32 md:py-64 px-4 md:px-8 text-center relative">
                    <div className="container mx-auto">
                        <motion.div
                            whileInView={{ scale: [0.9, 1.05, 1] }}
                            className="relative z-10"
                        >
                            <h2 className={`text-[15vw] md:text-[8vw] font-display font-black leading-[1.1] tracking-tighter uppercase italic ${isDark ? 'text-white/80' : 'text-black/80'} mb-12 md:mb-16`}>
                                Ready To <br /> <span className="text-[#ee5781]">Mutate?</span>
                            </h2>
                            <Link href="/contact" className="group relative inline-block">
                                <div className="absolute inset-0 bg-black rounded-[1.5rem] md:rounded-[2.5rem] translate-y-3 group-hover:translate-y-1 transition-transform" />
                                <div className={`px-12 md:px-20 py-6 md:py-10 ${isDark ? 'bg-[#ffd447]/90' : 'bg-[#ffd447]'} text-black text-xl md:text-3xl font-black rounded-[1.5rem] md:rounded-[2.5rem] relative z-10 active:translate-y-1 transition-transform border-4 ${isDark ? 'border-white/10' : 'border-white'} shadow-2xl`}>
                                    START BUILD
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </div>

            <style jsx global>{`
                .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
            `}</style>
        </CandyLayout>
    );
}
