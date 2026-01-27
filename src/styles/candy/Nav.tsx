"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStyle } from "@/context/StyleContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { X, Sun, Moon, Palette, Check, Zap, Sparkles, Layout, Users, Layers, LayoutTemplate, DollarSign, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "Story", path: "/about", icon: Users, color: "#6ca2fb" }, // Blue
    { name: "Builds", path: "/services", icon: Layers, color: "#ee5781" }, // Rose
    { name: "Visuals", path: "/explore", icon: LayoutTemplate, color: "#66bcb4" }, // Teal
    { name: "Vault", path: "/investment", icon: DollarSign, color: "#ec802b" }, // Orange
    { name: "Talk", path: "/contact", icon: Mail, color: "#a08ac0" } // Purple
];

export default function CandyNav() {
    const pathname = usePathname();
    const { style, setStyle } = useStyle();
    const { language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [showSettings, setShowSettings] = useState(false);
    const isDark = theme === "dark";

    const languages = [
        { code: "en", label: "En" },
        { code: "hi", label: "हि" },
        { code: "es", label: "Es" }
    ] as const;

    return (
        <>
            {/* FLOATING BENTO NAV BAR (Top Center) */}
            <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit px-4 md:px-6">
                <nav className={`relative flex items-center gap-1 md:gap-3 ${isDark ? 'bg-black/60 border-white/10' : 'bg-white/40 border-white'} backdrop-blur-2xl px-2 md:px-4 py-2 md:py-3 rounded-[2.5rem] md:rounded-[3rem] border-2 md:border-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group`}>

                    {/* LOGO BUBBLE */}
                    <Link href="/" className="mr-2 md:mr-4">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: -10 }}
                            className={`w-10 h-10 md:w-12 md:h-12 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} rounded-full flex items-center justify-center font-black text-lg md:text-xl shadow-xl border-2 ${isDark ? 'border-white/20' : 'border-white/20'} overflow-hidden relative`}
                        >
                            <span className="relative z-10">M</span>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className={`absolute inset-0 ${isDark ? 'bg-[conic-gradient(from_0deg,transparent,black,transparent)]' : 'bg-[conic-gradient(from_0deg,transparent,white,transparent)]'} opacity-20`}
                            />
                        </motion.div>
                    </Link>

                    {/* NAV ITEMS - PILLS */}
                    <div className="flex items-center gap-1 md:gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className="group/item relative"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-3 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-xs font-black uppercase tracking-widest transition-all duration-500 border-b-2 md:border-b-4 ${isActive ? 'shadow-lg' : (isDark ? 'text-white/40 hover:text-white hover:bg-white/5' : 'text-black/40 hover:text-black hover:bg-white/50')} border-transparent`}
                                        style={{
                                            backgroundColor: isActive ? item.color : 'transparent',
                                            color: isActive ? 'white' : undefined,
                                            borderColor: isActive ? 'rgba(0,0,0,0.1)' : 'transparent'
                                        }}
                                    >
                                        <span className="relative z-10">{item.name}</span>
                                    </motion.div>

                                    {/* Hover Micro-blob */}
                                    <div
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 md:h-1 rounded-full transition-all duration-300 group-hover/item:w-3 md:group-hover/item:w-4"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    <div className={`w-px h-6 md:h-8 ${isDark ? 'bg-white/10' : 'bg-black/5'} mx-1 md:mx-2`} />

                    {/* UTILITY BUTTONS */}
                    <div className="flex items-center gap-1 md:gap-2">
                        <button
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${isDark ? 'bg-white/10 text-white/60 border-white/10' : 'bg-white/60 text-black/60 border-white'} flex items-center justify-center shadow-lg border-2 hover:bg-[#ffd447] hover:text-black transition-all`}
                        >
                            {isDark ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${showSettings ? 'bg-[#ee5781] text-white border-white' : (isDark ? 'bg-white/10 text-white/60 border-white/10 hover:bg-[#6ca2fb] hover:text-white' : 'bg-white/60 text-black/60 border-white hover:bg-[#6ca2fb] hover:text-white')}`}
                        >
                            <Palette size={14} />
                        </button>
                    </div>
                </nav>
            </div>

            {/* SETTINGS MENU (Overlay style) */}
            <AnimatePresence>
                {showSettings && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowSettings(false)}
                            className={`fixed inset-0 ${isDark ? 'bg-black/20' : 'bg-white/10'} backdrop-blur-md z-[210]`}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 100 }}
                            className={`fixed bottom-4 md:bottom-12 left-4 md:left-1/2 md:-translate-x-1/2 right-4 md:right-auto md:w-full md:max-w-lg ${isDark ? 'bg-black/80 border-white/10' : 'bg-white/90 border-white'} backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] border-4 md:border-8 p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.1)] z-[220]`}
                        >
                            <div className={`flex justify-between items-center mb-8 md:mb-10 pb-4 md:pb-6 border-b-2 md:border-b-4 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                                <span className={`text-xl md:text-2xl font-black uppercase italic tracking-tighter ${isDark ? 'text-white/90' : 'text-black'}`}>Theme Pulse</span>
                                <button onClick={() => setShowSettings(false)} className={`p-2 md:p-3 ${isDark ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60'} rounded-full hover:rotate-90 transition-transform`}><X size={20} /></button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                                <div className="space-y-4 md:space-y-6">
                                    <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/20' : 'text-black/30'} text-center md:text-left`}>Visual Styles</p>
                                    <div className="flex flex-col gap-2 md:gap-3">
                                        {[
                                            { id: 'original', label: 'Agency', icon: Zap, color: '#ffd447' },
                                            { id: 'minimal', label: 'Zen', icon: Sparkles, color: '#f2f2f2' },
                                            { id: 'candy', label: 'Prismatic', icon: Layout, color: '#ee5781' }
                                        ].map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setStyle(s.id as any)}
                                                className={`flex items-center gap-3 md:gap-4 px-4 md:px-6 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2rem] text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all border-b-2 md:border-b-4 ${style === s.id ? (isDark ? 'bg-white text-black border-black/10 translate-y-1' : 'bg-black text-white border-black/20 translate-y-1') : (isDark ? 'bg-white/5 text-white/60 hover:bg-white/10 border-transparent hover:translate-y-[-2px]' : 'bg-black/5 text-black hover:bg-black/10 border-transparent hover:translate-y-[-2px]')}`}
                                            >
                                                <s.icon size={12} className="md:w-3.5 md:h-3.5" style={{ color: s.color }} />
                                                {s.label}
                                                {style === s.id && <Check className="ml-auto w-3 h-3 md:w-4 md:h-4" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 md:space-y-6">
                                    <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] ${isDark ? 'text-white/20' : 'text-black/30'} text-center md:text-left`}>Language Protocol</p>
                                    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 md:gap-3">
                                        {languages.map((l) => (
                                            <button
                                                key={l.code}
                                                onClick={() => setLanguage(l.code as any)}
                                                className={`px-3 md:px-6 py-3 md:py-5 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border-2 md:border-4 transition-all ${language === l.code ? 'bg-[#6ca2fb] text-white border-white shadow-xl' : (isDark ? 'border-white/5 text-white/40 hover:bg-white/5 hover:border-white/10' : 'border-black/5 text-black/40 hover:bg-black/5 hover:border-black/10')}`}
                                            >
                                                {l.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={`mt-8 md:mt-12 p-6 md:p-8 ${isDark ? 'bg-white/10 text-white' : 'bg-black text-white'} rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-between overflow-hidden relative group`}>
                                <div className="relative z-10">
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-1">Status</p>
                                    <p className="text-lg md:text-xl font-display font-black italic tracking-tighter">PRISMATIC OPTIMIZED</p>
                                </div>
                                <Sparkles className="text-[#ffd447] animate-pulse relative z-10" size={32} />
                                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#ee5781]/20 to-transparent skew-x-[-20deg] translate-x-10 group-hover:translate-x-0 transition-transform duration-1000" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
            `}</style>
        </>
    );
}
