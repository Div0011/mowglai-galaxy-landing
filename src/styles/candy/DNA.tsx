"use client";

import CandyLayout from "./Layout";
import { motion } from "framer-motion";
import { Zap, Sparkles, RefreshCw, Cpu, Fingerprint, Activity, MousePointer2 } from "lucide-react";
import Link from "next/link";

import { useTheme } from "next-themes";

export default function CandyDNA() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <CandyLayout>
            <div className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-8 overflow-hidden">

                {/* HERO */}
                <section className="container mx-auto mb-24 md:mb-32 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-[12vw] md:text-8xl font-display font-black leading-[1.1] tracking-tighter uppercase italic mb-8 md:mb-12"
                            >
                                <span className={isDark ? "text-white/10" : "text-black/10"}>The</span> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ca2fb] via-[#ee5781] to-[#ffd447]">Genetic</span>
                            </motion.h1>
                            <p className={`text-xl md:text-3xl font-body font-bold ${isDark ? "text-white/40" : "text-black/40"} italic leading-tight mb-12`}>
                                Welcome to Mowglai. Here is how we craft world-class digital experiences for international clients through precision and creativity.
                            </p>
                        </div>

                        <div className="flex-1 w-full lg:w-auto">
                            <div className={`relative p-8 md:p-12 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white'} backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] border-4 md:border-8 shadow-2xl overflow-hidden group`}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-tr from-[#6ca2fb]/10 to-[#ee5781]/10 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity"
                                />
                                <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 py-8 md:py-12">
                                    <Activity className="text-[#ee5781] animate-pulse" size={window?.innerWidth < 768 ? 60 : 80} />
                                    <h3 className={`text-2xl md:text-4xl font-display font-black italic uppercase tracking-tighter ${isDark ? "text-white/80" : "text-black/80"}`}>CORE_SYNAPSE_ACTIVE</h3>
                                    <div className={`w-full h-2 ${isDark ? 'bg-white/5' : 'bg-black/5'} rounded-full overflow-hidden`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#6ca2fb] to-[#66bcb4]"
                                        />
                                    </div>
                                    <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/20' : 'text-black/30'}`}>Est. 2025 / GLOBAL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* THE VALUES - BENTO BLOCKS */}
                <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-32 relative z-10">
                    {[
                        { title: "User-Centric", d: "Every decision is made with your end user in mind." },
                        { title: "Performance", d: "Lightning-fast load times and smooth interactions." },
                        { title: "Scalable", d: "Built to grow with your business needs." },
                        { title: "Clean Code", d: "Maintainable, well-documented, future-proof code." },
                        { title: "Clarity", d: "Communication without noise." },
                        { title: "Integrity", d: "Vision without compromise." }
                    ].map((p, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className={`p-8 md:p-10 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white'} backdrop-blur-xl rounded-[2.5rem] md:rounded-[3.5rem] border-4 md:border-8 shadow-xl text-center flex flex-col items-center gap-6 group`}
                        >
                            <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>Principle 0{i + 1}</span>
                            <h3 className={`text-xl md:text-2xl font-display font-black uppercase italic ${isDark ? 'text-white/80' : 'text-black/80'}`}>{p.title}</h3>
                            <p className={`text-xs md:text-sm font-medium ${isDark ? 'text-white/30' : 'text-black/30'} italic leading-snug`}>{p.d}</p>
                        </motion.div>
                    ))}
                </section>

                {/* THE PROTOCOL */}
                <section className={`container mx-auto py-20 md:py-32 ${isDark ? 'bg-white/[0.02]' : 'bg-black/5'} rounded-[3rem] md:rounded-[5rem] border-4 ${isDark ? 'border-white/5' : 'border-white/50'} p-6 md:p-24 relative overflow-hidden`}>
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className={`text-5xl md:text-8xl font-display font-black uppercase italic mb-12 md:mb-16 ${isDark ? 'text-white/80' : 'text-black/80'}`}>
                            The <span className="text-[#6ca2fb]">Workflow</span>
                        </h2>

                        <div className="flex flex-col gap-6 md:gap-8">
                            {[
                                { step: "01", label: "Discovery & Strategy", desc: "We dive deep into your business, understanding your goals, audience, and competitive landscape.", color: "#ee5781" },
                                { step: "02", label: "Design & Architecture", desc: "Crafting wireframes and visual designs that blend aesthetics with functionality.", color: "#6ca2fb" },
                                { step: "03", label: "Development & Engineering", desc: "Building robust, scalable code with the latest technologies.", color: "#66bcb4" },
                                { step: "04", label: "Testing & Optimization", desc: "Rigorous testing ensures every pixel and line of code works flawlessly.", color: "#ffd447" },
                                { step: "05", label: "Launch & Beyond", desc: "Deployment with ongoing support, monitoring, and continuous improvement.", color: "#ec802b" }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    whileInView={{ x: [20, 0], opacity: [0, 1] }}
                                    className={`flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 p-8 md:p-10 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/80 border-white'} rounded-[2rem] md:rounded-[3rem] border-4 shadow-xl text-center md:text-left`}
                                >
                                    <span className={`text-4xl md:text-5xl font-display font-black italic ${isDark ? 'opacity-10 text-white' : 'opacity-10'}`}>{s.step}</span>
                                    <div className="flex-1">
                                        <h4 className="text-lg md:text-xl font-black uppercase tracking-[0.3em] mb-3" style={{ color: s.color }}>{s.label}</h4>
                                        <p className={`text-base md:text-lg font-medium ${isDark ? 'text-white/30' : 'text-black/40'} italic`}>{s.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="container mx-auto py-24 md:py-48">
                    <div className={`p-12 md:p-24 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black'} text-white rounded-[3rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden group text-center border-4 border-transparent`}>
                        {!isDark && (
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute inset-0 bg-[#ee5781]/10 blur-[120px]"
                            />
                        )}
                        <h2 className={`text-5xl md:text-7xl lg:text-[10vw] font-display font-black uppercase italic mb-12 md:mb-16 relative z-10 leading-none ${isDark ? 'text-white/90' : 'text-white'}`}>
                            Ready To <br /> <span className="text-[#ffd447]">Synthesize?</span>
                        </h2>
                        <Link href="/contact" className="relative z-10 inline-flex items-center gap-6 px-12 md:px-16 py-6 md:py-8 bg-[#6ca2fb] text-white text-xl md:text-2xl font-black rounded-[1.5rem] md:rounded-[2rem] hover:scale-110 active:scale-95 transition-all shadow-2xl">
                            INITIATE PROTOCOL <MousePointer2 className="fill-current text-[#ffd447]" size={window?.innerWidth < 768 ? 24 : 32} />
                        </Link>
                    </div>
                </section>

            </div>
        </CandyLayout>
    );
}
