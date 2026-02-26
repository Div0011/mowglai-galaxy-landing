"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { sectors, allTemplates, Template } from '@/data/templates';
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
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Dynamic Flashlight Hover Tracker
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, []);

    useEffect(() => {
        if (!isHovered) {
            timerRef.current = setInterval(nextSlide, 3500); // Slightly slower for readability
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [nextSlide, isHovered]);

    const activeItem = showcaseItems[currentIndex];

    // Alternating layout based on index
    const isImageLeft = currentIndex % 2 === 0;

    return (
        <section className="relative pt-20 pb-0 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 relative">

                {/* Vertical Dot Indicator - Right Side */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                    {showcaseItems.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className="group relative flex items-center justify-center w-6 h-6"
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            <div className={`transition-all duration-300 rounded-full ${currentIndex === i ? 'w-2.5 h-2.5 bg-primary' : 'w-1.5 h-1.5 bg-primary/20 group-hover:bg-primary/40'}`} />
                            {currentIndex === i && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="absolute inset-0 border border-primary/30 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Main Showcase Area */}
                <div
                    className="relative min-h-[550px] md:min-h-[500px] pr-8 sm:pr-12"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`flex flex-col md:flex-row items-center gap-10 lg:gap-20 ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Image Part */}
                            <div
                                className="w-full md:w-3/5 relative aspect-[16/10] sm:aspect-video rounded-[2rem] sm:rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-primary/10"
                                onMouseMove={handleMouseMove}
                            >
                                <motion.div
                                    className="pointer-events-none absolute -inset-px z-50 opacity-0 transition duration-500 group-hover:opacity-100 mix-blend-soft-light"
                                    style={{
                                        background: useMotionTemplate`
                                            radial-gradient(
                                                500px circle at ${mouseX}px ${mouseY}px,
                                                rgba(255, 255, 255, 0.5),
                                                transparent 60%
                                            )
                                        `
                                    }}
                                />
                                <Link href={`/explore/${activeItem.template.id}`}>
                                    <Image
                                        src={activeItem.template.image}
                                        alt={activeItem.template.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60" />

                                    {/* Absolute positioning for category tag on image - Only visible on desktop or refined for mobile */}
                                    <div className={`absolute top-4 sm:top-6 ${isImageLeft ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-20`}>
                                        <div className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.2em] shadow-xl ${activeItem.sector.color.split(' ')[1]}`}>
                                            {activeItem.sector.label}
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Info Part */}
                            <div className="w-full md:w-2/5 space-y-6 sm:space-y-8 text-center md:text-left py-2 sm:py-4">
                                <motion.div
                                    initial={{ opacity: 0, x: isImageLeft ? 30 : -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {/* Desktop Only Sector Label */}
                                    <span className="hidden md:block text-primary font-display font-black tracking-[0.4em] uppercase text-xs mb-4 block opacity-50">
                                        {activeItem.sector.label}
                                    </span>

                                    {/* Mobile Only: Name Left, Category Right Row */}
                                    <div className="flex md:hidden items-end justify-between w-full mb-6 px-1 border-b border-primary/10 pb-4">
                                        <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-foreground">
                                            {activeItem.template.title}
                                        </h3>
                                        <span className="text-primary font-display font-black text-[9px] uppercase tracking-widest opacity-60 pb-1">
                                            {activeItem.sector.label}
                                        </span>
                                    </div>

                                    {/* Desktop Only Title */}
                                    <h3 className="hidden md:block text-3xl sm:text-4xl lg:text-7xl font-display font-black leading-[1.1] mb-6 uppercase tracking-tighter">
                                        {activeItem.template.title.split(' ')[0]}
                                        <span className="text-primary italic block sm:mt-2">
                                            {activeItem.template.title.split(' ').slice(1).join(' ')}
                                        </span>
                                    </h3>

                                    <p className="text-muted-foreground text-base sm:text-lg font-light leading-relaxed max-w-sm mx-auto md:mx-0 opacity-70 px-4 sm:px-0">
                                        {activeItem.template.description}
                                    </p>
                                </motion.div>

                                <div className="flex flex-col items-center md:items-start gap-6 sm:gap-10 pt-2 sm:pt-4">
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
                                        {activeItem.template.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="px-5 py-2.5 bg-primary/5 border border-primary/20 rounded-full text-[11px] sm:text-[12px] uppercase font-bold text-primary/70 tracking-widest shadow-sm hover:border-primary/40 transition-colors">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-4 w-full md:w-auto">
                                        <Link
                                            href={`/explore/${activeItem.template.id}`}
                                            className="group w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-primary text-primary-foreground rounded-full font-display font-black uppercase text-xs sm:text-sm tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]"
                                        >
                                            EXPLORE BLUEPRINT
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
