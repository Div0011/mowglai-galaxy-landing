"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { sectors, allTemplates } from '@/data/templates';
import { useLanguage } from '@/context/LanguageContext';

// Get one representative template from each category
const showcaseItems = sectors.map(sector => {
    const templates = allTemplates[sector.id] || [];
    return {
        sector,
        template: templates[0] // Taking the first one as representative
    };
}).filter(item => item.template);

export default function TemplatesShowcase() {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
    }, []);

    useEffect(() => {
        if (!isHovered) {
            timerRef.current = setInterval(nextSlide, 3500);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [nextSlide, isHovered]);

    const activeItem = showcaseItems[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        }),
        center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <div className="w-full h-full flex flex-col p-6 md:p-8">
            {/* Context Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <h3 className="text-[11px] font-display font-black tracking-[0.4em] uppercase text-foreground/40">
                        Blueprints
                    </h3>
                </div>
                
                {/* Horizontal Indicators */}
                <div className="flex gap-1.5 items-center">
                    {showcaseItems.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                            className={`transition-all duration-500 rounded-full ${
                                idx === currentIndex ? "w-6 h-1 bg-primary" : "w-1 h-1 bg-foreground/10 hover:bg-primary/40"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Slideshow Content Frame */}
            <div
                className="relative w-full aspect-[4/5] sm:aspect-[1.1/1] group/slide overflow-hidden"
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            scale: { duration: 0.4, ease: "easeOut" }
                        }}
                        className="absolute inset-0 w-full h-full flex flex-col"
                    >
                        {/* Immersive Image Canvas */}
                        <div className="relative w-full flex-1 overflow-hidden rounded-2xl border border-foreground/[0.06] shadow-2xl">
                            <Image
                                src={activeItem.template.image}
                                alt={activeItem.template.title}
                                fill
                                className="object-contain object-center transform scale-95 group-hover/slide:scale-100 transition-transform duration-1000 ease-out p-4"
                                priority
                            />
                            {/* Overlay Vignette */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] opacity-30 pointer-events-none" />
                            
                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 z-20">
                                <div className={`px-2 py-1 rounded-md backdrop-blur-md border border-white/10 text-white text-[8px] font-bold uppercase tracking-[0.2em] shadow-xl ${activeItem.sector.color.split(' ')[1]}`}>
                                    {activeItem.sector.label}
                                </div>
                            </div>

                            {/* Floating Nav Button */}
                            <div className="absolute top-4 right-4 z-40 flex gap-1">
                                <button
                                    onClick={(e) => { e.preventDefault(); prevSlide(); }}
                                    className="p-2 text-white/40 hover:text-primary hover:bg-white/10 transition-all rounded-full backdrop-blur-md border border-white/5 active:scale-95"
                                >
                                    <ArrowLeft size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.preventDefault(); nextSlide(); }}
                                    className="p-2 text-white/40 hover:text-primary hover:bg-white/10 transition-all rounded-full backdrop-blur-md border border-white/5 active:scale-95"
                                >
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Minimal Meta */}
                        <div className="mt-6 flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <span className="text-primary font-display font-medium text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-primary/20 rounded-md">
                                    BLUEPRINT / 0{currentIndex + 1}
                                </span>
                                <span className="h-[1px] flex-1 bg-foreground/10" />
                            </div>
                            
                            <div className="flex items-end justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex flex-wrap gap-2 mb-1">
                                        {activeItem.template.tags.map((tag, i) => (
                                            <span key={i} className="text-[10px] text-primary/70 font-bold uppercase tracking-widest px-1.5 py-0.5 bg-primary/5 rounded border border-primary/10">#{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-display font-black text-foreground tracking-tighter transition-colors group-hover/slide:text-primary leading-none">
                                        {activeItem.template.title}
                                    </h3>
                                </div>
                                
                                <Link
                                    href={`/explore/${activeItem.template.id}`}
                                    className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-background/5 backdrop-blur-3xl border border-primary/20 text-primary font-bold text-[9px] tracking-widest uppercase rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shrink-0"
                                >
                                    <span className="absolute inset-0 w-0 h-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:w-full"></span>
                                    <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-primary-foreground">
                                        View <ChevronRight className="w-3 h-3" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
