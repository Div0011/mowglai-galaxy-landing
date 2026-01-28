"use client";

import React, { useEffect, useState } from "react";
import CandyNav from "./Nav";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import CustomCursor from "@/components/CustomCursor";

import { useTheme } from "next-themes";

interface CandyLayoutProps {
    children: React.ReactNode;
}

export default function CandyLayout({ children }: CandyLayoutProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <div className={`relative min-h-screen w-full transition-colors duration-700 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#fffbfb]'} overflow-hidden selection:bg-[#ee5781] selection:text-white`}>
            <CustomCursor />

            {/* VIBRANT MESH BACKGROUND */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Large animated blobs for the mesh effect - Optimized for performance */}
                <motion.div
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-[-20%] left-[-10%] w-[100vw] md:w-[80vw] h-[100vw] md:h-[80vw] bg-[#6ca2fb] rounded-full blur-[60px] md:blur-[80px] ${isDark ? 'opacity-10' : 'opacity-20'}  will-change-transform`}
                />
                <motion.div
                    animate={{
                        x: [0, -70, 70, 0],
                        y: [0, 70, -70, 0],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className={`absolute bottom-[-10%] right-[-10%] w-[100vw] md:w-[70vw] h-[100vw] md:h-[70vw] bg-[#ee5781] rounded-full blur-[70px] md:blur-[90px] ${isDark ? 'opacity-10' : 'opacity-15'} will-change-transform`}
                />
                <motion.div
                    animate={{
                        x: [50, -50, 50],
                        y: [20, 100, 20],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-[20%] right-[10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-[#ffd447] rounded-full blur-[50px] md:blur-[70px] ${isDark ? 'opacity-10' : 'opacity-15'} will-change-transform`}
                />
                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[90vw] h-[120vw] md:h-[90vw] bg-[#a08ac0] rounded-full blur-[80px] md:blur-[100px] ${isDark ? 'opacity-8' : 'opacity-10'} will-change-transform`}
                />
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <CandyNav />

                <main className="flex-grow">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* DYNAMIC FOOTER STRIP */}
                <footer className="relative py-20 px-8 overflow-hidden">
                    <div className={`container mx-auto flex flex-col md:flex-row justify-between items-center gap-12 border-t-4 ${isDark ? 'border-white/5' : 'border-black/5'} pt-12`}>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <span className={`text-4xl font-display font-black tracking-tighter uppercase italic ${isDark ? 'text-white/80' : 'text-black/80'}`}>Mowglai</span>
                            <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${isDark ? 'text-white/40' : 'text-black/40'}`}>Visual Synapse Protocol 2025</span>
                        </div>

                        <div className="flex gap-8">
                            {['IG', 'TW', 'LI', 'BE'].map((s) => (
                                <button key={s} className={`w-12 h-12 rounded-2xl ${isDark ? 'bg-white/5 border-white/10 text-white/60' : 'bg-white/40 border-white text-black/60'} backdrop-blur-md border-2 flex items-center justify-center font-black text-xs hover:bg-[#ee5781] hover:text-white hover:scale-110 transition-all shadow-xl`}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </footer>
            </div>

            {/* NOISE OVERLAY FOR TEXTURE */}
            <div className={`fixed inset-0 pointer-events-none ${isDark ? 'opacity-[0.05]' : 'opacity-[0.03]'} z-[100] mix-blend-overlay`}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>
        </div>
    );
}
