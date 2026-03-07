"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import NextImage from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
    {
        id: 1,
        title: "Clarity Cartel",
        category: "Strategic Business Consultancy",
        image: "/assets/projects/clarity-cartel.png",
        description: "A professional consultancy platform delivering actionable business strategies.",
        link: "https://clarity-cartel.vercel.app/"
    },
    {
        id: 2,
        title: "iElevate",
        category: "Business Growth & Coaching",
        image: "/assets/projects/ielevate.png",
        description: "A comprehensive platform for professional development and business scaling.",
        link: "https://www.ielevate.in/"
    },
    {
        id: 3,
        title: "Jayhawk",
        category: "Healthcare Services",
        image: "/assets/projects/jayhawk.webp",
        description: "A modern healthcare portal prioritizing patient accessibility and care.",
        link: "https://div0011.github.io/jayhawkk"
    },
    {
        id: 4,
        title: "More Interior",
        category: "Interior Design Studio",
        image: "/assets/projects/more-interior.webp",
        description: "An immersive portfolio showcasing exquisite living spaces.",
        link: "https://moreinterior.in/"
    },
    {
        id: 5,
        title: "True Ratings",
        category: "Movie & TV Ratings Platform",
        image: "/assets/projects/true-ratings.png",
        description: "A comprehensive database for tracking movie and TV show ratings, similar to IMDb.",
        link: "https://true-ratings.vercel.app/"
    },
    {
        id: 6,
        title: "Realty Xperts",
        category: "Real Estate & Property Management",
        image: "/assets/projects/realty-xperts.svg",
        description: "A premier real estate platform connecting buyers with their dream properties. (UNDER PROGRESS)",
        link: "https://div0011.github.io/REALTY-XPERTS/"
    }
];

export default function SelectedWork() {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, []);

    const resetAutoplay = useCallback(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(nextSlide, 5000);
    }, [nextSlide]);

    useEffect(() => {
        resetAutoplay();
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [resetAutoplay]);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -50) { nextSlide(); resetAutoplay(); }
        else if (info.offset.x > 50) { prevSlide(); resetAutoplay(); }
    };

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
                        {t.SelectedWork.selected} {t.SelectedWork.work}
                    </h3>
                </div>
                
                {/* Horizontal Indicators */}
                <div className="flex gap-1.5 items-center">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); resetAutoplay(); }}
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
                onMouseEnter={() => { if (autoplayRef.current) clearInterval(autoplayRef.current); }}
                onMouseLeave={resetAutoplay}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.4}
                        onDragEnd={handleDragEnd}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            scale: { duration: 0.4, ease: "easeOut" }
                        }}
                        className="absolute inset-0 w-full h-full flex flex-col"
                    >
                        {/* Immersive Image Canvas */}
                        <div className="relative w-full flex-1 overflow-hidden rounded-2xl border border-foreground/[0.06] shadow-2xl">
                            <NextImage
                                src={projects[currentIndex].image}
                                alt={projects[currentIndex].title}
                                fill
                                className="object-contain object-center transform scale-95 group-hover/slide:scale-100 transition-transform duration-1000 ease-out p-4"
                                priority
                            />
                            {/* Overlay Vignette - Refined for visibility */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] opacity-40 pointer-events-none" />
                            
                            {/* Floating Nav Button */}
                            <div className="absolute top-4 right-4 z-40 flex gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevSlide(); resetAutoplay(); }}
                                    className="p-2 text-white/40 hover:text-primary hover:bg-white/10 transition-all rounded-full backdrop-blur-md border border-white/5 active:scale-95"
                                >
                                    <ArrowLeft size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextSlide(); resetAutoplay(); }}
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
                                    0{projects[currentIndex].id} / 0{projects.length}
                                </span>
                                <span className="h-[1px] flex-1 bg-foreground/10" />
                            </div>
                            
                            <div className="flex items-end justify-between gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">{projects[currentIndex].category}</h4>
                                    <h3 className="text-2xl font-display font-black text-foreground tracking-tighter transition-colors group-hover/slide:text-primary leading-none">
                                        {projects[currentIndex].title}
                                    </h3>
                                    <p className="text-[11px] text-foreground/50 max-w-[280px] line-clamp-2 md:line-clamp-none leading-relaxed pt-1">
                                        {projects[currentIndex].description}
                                    </p>
                                </div>
                                
                                <a
                                    href={projects[currentIndex].link}
                                    target={projects[currentIndex].link === "#" ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className="group/btn relative inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-background/5 backdrop-blur-3xl border border-primary/20 text-primary font-bold text-[9px] tracking-widest uppercase rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shrink-0"
                                    onClick={(e) => {
                                        if (projects[currentIndex].link === "#") {
                                            e.preventDefault();
                                            toast({
                                                title: t.SelectedWork.comingSoonTitle,
                                                description: t.SelectedWork.comingSoonDesc,
                                            });
                                        }
                                    }}
                                >
                                    <span className="absolute inset-0 w-0 h-full bg-primary transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/btn:w-full"></span>
                                    <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-primary-foreground">
                                        Case <ExternalLink className="w-2.5 h-2.5" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
