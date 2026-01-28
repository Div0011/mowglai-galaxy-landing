"use client";

import CandyLayout from "./Layout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Zap, Sparkles, Globe, Smile } from "lucide-react";

import { useTheme } from "next-themes";

export default function CandyContact() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <CandyLayout>
            <div className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-4 md:px-8 overflow-hidden">

                {/* HERO */}
                <section className="container mx-auto mb-20 md:mb-32 relative z-10 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
                        <div className="flex-1">
                            <motion.h1
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="text-[15vw] md:text-8xl font-display font-black leading-[1] md:leading-[1.1] tracking-tighter uppercase italic mb-8 md:mb-12"
                            >
                                <span className={`${isDark ? "text-white/10" : "text-black/10"} block mb-2`}>Say</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ee5781] via-[#ffd447] to-[#66bcb4]">Hello</span>
                            </motion.h1>
                            <p className={`text-xl md:text-3xl font-body font-bold ${isDark ? "text-white/40" : "text-black/40"} italic leading-tight mb-12`}>
                                Start Dialogue. We primarily operate from Noida, India, serving the global digital landscape.
                            </p>

                            <div className="flex flex-col gap-6 font-display">
                                {[
                                    { icon: Mail, val: "hello@mowglai.in", color: "#6ca2fb" },
                                    { icon: Phone, val: "+91 95285 45302", color: "#66bcb4" },
                                    { icon: Globe, val: "DIGITAL FIRST / GLOBAL", color: "#ffd447" }
                                ].map((c, i) => (
                                    <div key={i} className="flex items-center gap-4 md:gap-6 group">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.5rem] ${isDark ? 'bg-white/5 shadow-none border-white/10' : 'bg-white shadow-xl border-white'} flex items-center justify-center border-2 md:border-4 group-hover:scale-110 transition-transform`} style={{ color: c.color }}>
                                            <c.icon size={window?.innerWidth < 768 ? 18 : 24} />
                                        </div>
                                        <span className={`text-base md:text-xl font-black ${isDark ? 'text-white/60' : 'text-black/60'} uppercase tracking-widest italic`}>{c.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-2xl relative">
                            {/* FORM BOX */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className={`p-8 md:p-16 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/60 border-white'} backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] border-4 md:border-8 shadow-2xl relative overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd447]/10 rounded-full blur-[50px]" />

                                <form className="space-y-6 md:space-y-10 relative z-10">
                                    <div className="space-y-2 md:space-y-4">
                                        <label className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-white/20' : 'text-black/20'} ml-4`}>Identity</label>
                                        <input
                                            type="text"
                                            placeholder="WHO ARE YOU?"
                                            className={`w-full ${isDark ? 'bg-white/5 border-white/5 focus:border-[#6ca2fb] text-white' : 'bg-white/50 border-white focus:border-[#6ca2fb] text-black'} backdrop-blur-md border-4 rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-8 py-4 md:py-6 text-base md:text-xl font-black uppercase italic outline-none transition-all`}
                                        />
                                    </div>
                                    <div className="space-y-2 md:space-y-4">
                                        <label className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-white/20' : 'text-black/20'} ml-4`}>Frequency</label>
                                        <input
                                            type="email"
                                            placeholder="DIGITAL ADDRESS?"
                                            className={`w-full ${isDark ? 'bg-white/5 border-white/5 focus:border-[#ee5781] text-white' : 'bg-white/50 border-white focus:border-[#ee5781] text-black'} backdrop-blur-md border-4 rounded-[1.5rem] md:rounded-[2rem] px-6 md:px-8 py-4 md:py-6 text-base md:text-xl font-black uppercase italic outline-none transition-all`}
                                        />
                                    </div>
                                    <div className="space-y-2 md:space-y-4">
                                        <label className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-white/20' : 'text-black/20'} ml-4`}>Mission</label>
                                        <textarea
                                            rows={4}
                                            placeholder="TRANSMIT YOUR VISION..."
                                            className={`w-full ${isDark ? 'bg-white/5 border-white/5 focus:border-[#66bcb4] text-white' : 'bg-white/50 border-white focus:border-[#66bcb4] text-black'} backdrop-blur-md border-4 rounded-[2rem] md:rounded-[3rem] px-6 md:px-8 py-6 md:py-8 text-base md:text-xl font-black uppercase italic outline-none transition-all resize-none`}
                                        />
                                    </div>

                                    <button className="group relative w-full">
                                        <div className="absolute inset-0 bg-black rounded-[1.5rem] md:rounded-[2.5rem] translate-y-2 md:translate-y-3 group-hover:translate-y-1 transition-transform" />
                                        <div className={`w-full py-6 md:py-8 ${isDark ? 'bg-[#ee5781]/90' : 'bg-[#ee5781]'} text-white text-xl md:text-2xl font-black rounded-[1.5rem] md:rounded-[2.5rem] relative z-10 flex items-center justify-center gap-4 md:gap-6 active:translate-y-1 transition-transform border-4 ${isDark ? 'border-white/10' : 'border-white/50'} shadow-xl`}>
                                            LAUNCH PULSE <Send size={window?.innerWidth < 768 ? 20 : 24} />
                                        </div>
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SOCIAL CHIPS */}
                <section className="container mx-auto flex flex-wrap justify-center gap-3 md:gap-8 py-12 md:py-20">
                    {['DRIBBBLE', 'BEHANCE', 'INSTAGRAM', 'TWITTER', 'LINKEDIN'].map((s, i) => (
                        <div key={i} className={`px-6 md:px-12 py-3 md:py-6 ${isDark ? 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:bg-white/10' : 'bg-white/40 border-white text-black/40 hover:text-black hover:bg-white'} backdrop-blur-xl rounded-[1rem] md:rounded-[2rem] border-2 md:border-4 shadow-lg text-[10px] md:text-xs font-black uppercase tracking-[0.4em] transition-all cursor-pointer`}>
                            {s}
                        </div>
                    ))}
                </section>

                {/* FINAL FLOATING ICON */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute -bottom-20 -left-20 ${isDark ? 'text-white/5' : 'text-[#6ca2fb]/10'} hidden lg:block`}
                >
                    <Smile size={300} strokeWidth={1} />
                </motion.div>

            </div>
        </CandyLayout>
    );
}
