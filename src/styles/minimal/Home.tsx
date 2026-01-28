"use client";

import MinimalLayout from "./Layout";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SelectedWork from "@/components/SelectedWork";
import { useState, useEffect } from "react";
import { Sparkles, Globe, Zap, Layers, Smartphone, RefreshCw, Shield, ArrowRight } from "lucide-react";

export default function MinimalHome() {
    const { t } = useLanguage();
    const [activeCard, setActiveCard] = useState(0);

    const aestheticCards = [
        { icon: Sparkles, title: t.AestheticShowcase.aesthetic.title, text: t.AestheticShowcase.aesthetic.text },
        { icon: Globe, title: t.AestheticShowcase.global.title, text: t.AestheticShowcase.global.text },
        { icon: Zap, title: t.AestheticShowcase.fast.title, text: t.AestheticShowcase.fast.text },
        { icon: Layers, title: t.AestheticShowcase.deep.title, text: t.AestheticShowcase.deep.text },
        { icon: Smartphone, title: t.AestheticShowcase.mobile.title, text: t.AestheticShowcase.mobile.text },
        { icon: RefreshCw, title: t.AestheticShowcase.adaptation.title, text: t.AestheticShowcase.adaptation.text },
        { icon: Shield, title: t.AestheticShowcase.survival.title, text: t.AestheticShowcase.survival.text }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % aestheticCards.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [aestheticCards.length]);

    return (
        <MinimalLayout>
            <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-12 py-32 bg-background text-foreground font-serif overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12"
                >
                    {/* Hero Title Area */}
                    <div className="md:col-span-12 text-center border-b-[1px] border-foreground pb-12 mb-12">
                        <h1 className="text-7xl md:text-[12rem] leading-[0.85] tracking-tighter uppercase font-medium">
                            {t.Home?.weCreate || "MOWGLAI"}
                        </h1>
                        <p className="mt-8 text-sm md:text-lg font-sans tracking-[0.2em] uppercase max-w-2xl mx-auto text-foreground/50 px-4">
                            {t.Home?.introText || "Fashioning Digital Excellence"}
                        </p>
                    </div>

                    {/* Editorial Content & Aesthetic Showcase Sync */}
                    <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-end">
                        <div className="aspect-[4/3] md:aspect-[3/4] bg-foreground/5 mb-6 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 group border border-foreground flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCard}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center text-center p-8"
                                >
                                    {(() => {
                                        const ItemIcon = aestheticCards[activeCard].icon;
                                        return (
                                            <>
                                                <ItemIcon className="w-16 h-16 md:w-24 md:h-24 text-foreground mb-6" strokeWidth={1} />
                                                <span className="text-2xl md:text-4xl font-display uppercase tracking-widest mb-2">
                                                    {aestheticCards[activeCard].title}
                                                </span>
                                                <p className="text-xs md:text-sm uppercase tracking-widest opacity-40">
                                                    {aestheticCards[activeCard].text}
                                                </p>
                                            </>
                                        );
                                    })()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <h2 className="text-4xl italic font-light font-display">Philosophy</h2>
                        <p className="mt-4 font-sans text-sm text-foreground/70 leading-relaxed text-justify">
                            A strict adherence to the essential. We strip away the noise to reveal the core of your digital identity, presented in stark architectural elegance.
                        </p>
                    </div>

                    {/* Studio Intro Section */}
                    <div className="md:col-span-12 lg:col-span-7 flex flex-col">
                        <div className="flex-1 flex flex-col justify-center border-l-0 lg:border-l-[1px] border-foreground pl-0 lg:pl-12">
                            <h3 className="text-6xl md:text-8xl font-display mb-12">
                                THE <br /> <span className="italic">Studio</span>
                            </h3>
                            <div className="w-full h-[1px] bg-foreground mb-12 opacity-20"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans text-sm tracking-widest uppercase">
                                <div>
                                    <h4 className="font-bold mb-6 opacity-100 text-base">Our Expertise</h4>
                                    <ul className="space-y-4 text-foreground/60">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>{t.AestheticShowcase.aesthetic.title}</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>{t.AestheticShowcase.global.title}</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>{t.AestheticShowcase.fast.title}</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>{t.AestheticShowcase.mobile.title}</li>
                                    </ul>
                                </div>
                                <div className="mb-12">
                                    <h4 className="font-bold mb-6 text-base">Dialogue</h4>
                                    <ul className="space-y-4 text-foreground/60">
                                        <li>hello@mowglai.in</li>
                                        <li>@mowglai.wild</li>
                                        <li>Global Partnership</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-12 mt-12 border-t border-foreground pt-12">
                                <Link href="/our-dna" className="group inline-flex items-center gap-4">
                                    <span className="text-sm uppercase tracking-[0.3em] font-body opacity-60 group-hover:opacity-100 transition-opacity">Our DNA</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <Link href="/about" className="group inline-flex items-center gap-4">
                                    <span className="text-sm uppercase tracking-[0.3em] font-body opacity-60 group-hover:opacity-100 transition-opacity">The Story</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Synchronization: Selected Work Section */}
                    <div className="md:col-span-12 mt-24">
                        <div className="w-full h-[1px] bg-foreground mb-12 opacity-10"></div>
                        <SelectedWork />
                    </div>

                    {/* Synchronization: Templates CTA Section */}
                    <div className="md:col-span-12 mt-24 py-24 bg-foreground/5 border border-foreground flex flex-col items-center text-center px-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] mb-12 opacity-50">{t.Home.purchase}</span>
                        <h2 className="text-5xl md:text-[6vw] font-display uppercase leading-none mb-8">
                            {t.Home.templates}
                        </h2>
                        <p className="max-w-xl text-sm font-sans uppercase tracking-widest text-foreground/60 mb-12">
                            {t.Home.templateText}
                        </p>
                        <Link
                            href="/explore"
                            className="px-12 py-4 border border-foreground hover:bg-foreground hover:text-background transition-all duration-500 text-xs uppercase tracking-widest font-bold"
                        >
                            {t.Home.viewTemplates}
                        </Link>
                    </div>

                    {/* Editorial Footer */}
                    <div className="md:col-span-12 mt-24 pt-12 border-t-[1px] border-foreground flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-4">Project Status</span>
                            <span className="text-lg md:text-2xl font-display italic uppercase">Ready for Collaboration</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-7xl md:text-[10rem] leading-[0.7] font-display">20</span>
                            <span className="text-7xl md:text-[10rem] leading-[0.7] font-display">26</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </MinimalLayout>
    );
}
