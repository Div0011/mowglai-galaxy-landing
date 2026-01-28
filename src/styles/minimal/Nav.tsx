"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStyle } from "@/context/StyleContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { Settings, X, Sun, Moon, Palette, Globe, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MinimalNav() {
    const pathname = usePathname();
    const { style, setStyle } = useStyle();
    const { language, setLanguage } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [showSettings, setShowSettings] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const languages = [
        { code: "en", label: "English" },
        { code: "hi", label: "हिन्दी" },
        { code: "es", label: "Español" },
        { code: "fr", label: "Français" }
    ] as const;

    const styles = [
        { code: "original", label: "Original" },
        { code: "minimal", label: "Minimal" },
        { code: "candy", label: "Candy" }
    ] as const;

    const navItems = [
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Gallery", path: "/explore" },
        { name: "Investment", path: "/investment" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center bg-background/95 backdrop-blur-md border-b border-foreground/5 text-foreground transition-all duration-300">
            <Link href="/" className="text-2xl md:text-3xl font-display font-black tracking-tighter uppercase group transition-transform hover:scale-[1.02]">
                MOWGLAI
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
                <div className="flex items-center gap-10 mr-12 border-r border-foreground/10 pr-12">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`text-sm uppercase tracking-[0.2em] font-body relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-foreground after:scale-x-0 font-body hover:after:scale-x-100 after:transition-transform after:duration-300 ${pathname === item.path ? 'after:scale-x-100 font-bold' : 'text-foreground/60 hover:text-foreground'}`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 hover:bg-foreground/5 rounded-full transition-colors relative group"
                        aria-label="Settings"
                    >
                        <Settings className={`w-5 h-5 transition-transform duration-500 ${showSettings ? 'rotate-90' : 'rotate-0'}`} />
                    </button>

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center gap-4">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                    onClick={() => setShowMobileMenu(true)}
                    className="flex flex-col gap-1.5 p-2"
                >
                    <div className="w-6 h-[1px] bg-foreground"></div>
                    <div className="w-6 h-[1px] bg-foreground"></div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {showMobileMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[2000] flex flex-col"
                        style={{
                            backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
                            width: '100vw',
                            height: '100vh',
                            position: 'fixed',
                            top: 0,
                            left: 0
                        }}
                    >
                        {/* Header Bar */}
                        <div className="flex justify-between items-center p-6 md:p-8 border-b border-foreground/10 shrink-0">
                            <span className="text-4xl font-display font-black tracking-tighter uppercase text-foreground">Menu</span>
                            <button
                                onClick={() => setShowMobileMenu(false)}
                                className="p-4 border-2 border-foreground bg-background text-foreground"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Navigation Links - Centered & Solid */}
                        <div className="flex-1 flex flex-col justify-center p-8 gap-6 md:gap-12 overflow-y-auto">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    onClick={() => setShowMobileMenu(false)}
                                    className="block"
                                >
                                    <div className={`text-6xl md:text-9xl font-display uppercase tracking-tighter transition-all duration-300 ${pathname === item.path ? 'italic text-foreground' : 'text-foreground/20 hover:text-foreground'}`}>
                                        {item.name}
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Footer Preferences */}
                        <div className="p-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-8 bg-foreground/5">
                            <button
                                onClick={() => {
                                    setShowSettings(true);
                                    setShowMobileMenu(false);
                                }}
                                className="w-full md:w-auto px-12 py-4 border-2 border-foreground font-black uppercase text-sm tracking-widest bg-background text-foreground hover:invert transition-all"
                            >
                                Preferences
                            </button>
                            <div className="text-center md:text-right">
                                <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-body mb-1">Est. 2025 / GLOBAL</p>
                                <p className="text-sm font-black font-body">MOWGLAI AGENCY</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Settings Overlay */}
            <AnimatePresence>
                {showSettings && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSettings(false)}
                            className="fixed inset-0 bg-background/50 backdrop-blur-[2px] z-[120]"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="fixed top-24 right-6 md:right-12 w-[calc(100vw-3rem)] md:w-80 bg-background border border-foreground shadow-2xl z-[130] p-8 space-y-8 font-body text-foreground"
                        >
                            <div className="flex justify-between items-center border-b border-foreground/20 pb-4 mb-4">
                                <span className="text-sm font-bold uppercase tracking-[0.2em]">Preferences</span>
                                <button onClick={() => setShowSettings(false)}><X className="w-5 h-5" /></button>
                            </div>

                            {/* Style Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/50">
                                    <Palette className="w-4 h-4" />
                                    Visual Style
                                </div>
                                <div className="grid grid-cols-1 gap-1">
                                    {styles.map((s) => (
                                        <button
                                            key={s.code}
                                            onClick={() => setStyle(s.code)}
                                            className={`flex justify-between items-center px-4 py-3 text-xs uppercase tracking-widest hover:bg-foreground/5 transition-colors ${style === s.code ? 'font-bold bg-foreground text-background' : 'text-foreground/50'}`}
                                        >
                                            {s.label}
                                            {style === s.code && <Check className="w-3 h-3" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Language Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/50">
                                    <Globe className="w-4 h-4" />
                                    Language
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-center">
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => setLanguage(l.code as any)}
                                            className={`px-3 py-3 text-xs uppercase tracking-widest border border-foreground/10 hover:border-foreground transition-all ${language === l.code ? 'font-bold bg-foreground text-background' : 'text-foreground/50'}`}
                                        >
                                            {l.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Windows Performance Note */}
                            <div className="pt-4 border-t border-foreground/10">
                                <p className="text-[9px] uppercase tracking-widest text-foreground/40 leading-relaxed">
                                    Windows User Note: For the most fluid experience with our custom shaders and inversions, we recommend using Google Chrome or Microsoft Edge.
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
