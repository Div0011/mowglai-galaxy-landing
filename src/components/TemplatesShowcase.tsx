"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { sectors, allTemplates } from '@/data/templates';

// Get one representative template from each category
const showcaseItems = sectors.map(sector => {
    const templates = allTemplates[sector.id] || [];
    return {
        sector,
        template: templates[0] // Taking the first one as representative
    };
}).filter(item => item.template);

export default function TemplatesShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    if (!activeItem) {
        return null;
    }

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
        <div
            className="relative h-full overflow-hidden rounded-[2rem] p-6 sm:p-8 bg-card border border-white/10 group/card transition-all duration-700 hover:border-primary/40"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-emerald-500/10 blur-[90px]" />

            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">Premium Blueprints</p>
                    <p className="text-sm text-foreground/75">Launch-ready website systems curated for specific industries.</p>
                </div>
                <div className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-[11px] font-medium text-foreground/70">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(showcaseItems.length).padStart(2, '0')}
                </div>
            </div>

            <div className="relative aspect-[16/10] sm:aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            scale: { duration: 0.4, ease: 'easeOut' },
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={activeItem.template.image}
                                alt={activeItem.template.title}
                                fill
                                className="object-cover object-top"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                            <div className="absolute left-4 top-4">
                                <span className="inline-flex rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                                    {activeItem.sector.label}
                                </span>
                            </div>

                            <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm">
                                conversion-focused
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                <div className="mb-2 flex flex-wrap gap-2">
                                    {activeItem.template.tags.slice(0, 3).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="rounded-md border border-white/15 bg-black/35 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white/80"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-display font-bold leading-tight text-white sm:text-2xl">
                                    {activeItem.template.title}
                                </h3>
                                <p className="mt-1 text-xs text-white/70 sm:text-sm">
                                    Structured pages, premium visual rhythm, and optimized conversion flow.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            prevSlide();
                        }}
                        className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-white/5 overflow-hidden text-foreground/70 transition-all hover:border-primary/40 hover:text-primary-foreground active:scale-95"
                        aria-label="Previous blueprint"
                    >
                        <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-yellow-400 to-green-600 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
                        <ArrowLeft size={16} className="relative z-10" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            nextSlide();
                        }}
                        className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-white/5 overflow-hidden text-foreground/70 transition-all hover:border-primary/40 hover:text-primary-foreground active:scale-95"
                        aria-label="Next blueprint"
                    >
                        <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-yellow-400 to-green-600 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
                        <ArrowRight size={16} className="relative z-10" />
                    </button>

                    <div className="ml-1 flex items-center gap-1.5">
                        {showcaseItems.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'w-6 bg-primary'
                                        : 'w-1.5 bg-foreground/20 hover:bg-foreground/40'
                                    }`}
                                aria-label={`Go to blueprint ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <Link
                    href={`/explore/${activeItem.template.id}`}
                    className="group/btn relative inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary overflow-hidden transition-all hover:text-primary-foreground"
                >
                    <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-yellow-400 to-green-600 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:w-full" />
                    <span className="relative z-10">View Demo</span>
                    <ChevronRight className="relative z-10 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}
