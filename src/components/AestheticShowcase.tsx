"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Globe, Zap, Layers, Smartphone, Shield, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function AestheticShowcase() {
    const { t } = useLanguage();
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0.5); // Center 0.5
    const y = useMotionValue(0.5);

    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // rotateX is driven by Y coordinate (up/down moves pitch) - reversed for natural feel
    const rotateX = useTransform(springY, [0, 1], [15, -15]);
    // rotateY is driven by X coordinate (left/right moves yaw)
    const rotateY = useTransform(springX, [0, 1], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate normalized values 0-1
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;

        x.set(relX);
        y.set(relY);
    };

    const handleMouseLeave = () => {
        // Return to center
        x.set(0.5);
        y.set(0.5);
    };

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
    }, [cards.length]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[400px] flex items-center justify-center p-8 cursor-crosshair group"
            style={{ perspective: 1000 }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.2, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ rotateX, rotateY }}
                    className="w-full max-w-[300px] aspect-square flex flex-col items-center justify-center p-12 relative transition-all duration-500 will-change-transform"
                >
                    {(() => {
                        const ItemIcon = cards[activeCard].icon;
                        return (
                            <>
                                <ItemIcon className="w-24 h-24 text-primary mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transform-gpu group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                                <span className="text-3xl md:text-5xl font-display font-black uppercase tracking-[0.2em] text-foreground text-center mb-4 transform-gpu group-hover:translate-z-10">
                                    {cards[activeCard].title}
                                </span>
                                <p className="text-lg md:text-xl font-medium text-muted-foreground text-center max-w-[250px] font-light leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 transform-gpu group-hover:translate-z-5">
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
