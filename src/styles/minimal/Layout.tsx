"use client";

import MinimalNav from "./Nav";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function MinimalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background transition-colors duration-500">
            <CustomCursor />
            <MinimalNav />

            <AnimatePresence mode="wait">
                <motion.main
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="pt-12 md:pt-24 min-h-screen"
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            <footer className="py-24 border-t-2 border-foreground mt-24 px-8 md:px-24">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase">MOWGLAI</div>
                    <div className="flex flex-col md:items-end gap-2">
                        <div className="text-sm text-foreground uppercase tracking-[0.3em] font-body font-bold">
                            © {new Date().getFullYear()} Mowglai Agency
                        </div>
                        <div className="text-[10px] md:text-xs uppercase tracking-[0.5em] opacity-40">
                            Digital Excellence / Global Reach
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
