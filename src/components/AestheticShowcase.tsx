"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Zap, Layers, Smartphone, Shield, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AestheticShowcase() {
    const { t } = useLanguage();
    const [activeCard, setActiveCard] = useState(0);

    const cards = [
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
            setActiveCard((prev) => (prev + 1) % cards.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [cards.length]); // Added dependence on cards.length though it's constant per render

    return (
        <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.2, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="w-full max-w-[300px] aspect-square flex flex-col items-center justify-center p-12 relative"
                >
                    {(() => {
                        const ItemIcon = cards[activeCard].icon;
                        return (
                            <>
                                <ItemIcon className="w-24 h-24 text-primary mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" strokeWidth={1} />
                                <span className="text-3xl md:text-5xl font-display font-black uppercase tracking-[0.2em] text-foreground text-center mb-4">
                                    {cards[activeCard].title}
                                </span>
                                <p className="text-lg md:text-xl font-medium text-muted-foreground text-center max-w-[250px] font-light leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    {cards[activeCard].text}
                                </p>
                            </>
                        );
                    })()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
