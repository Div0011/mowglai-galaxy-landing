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
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
        <div className="relative h-full overflow-hidden rounded-[1.6rem] p-4 sm:p-5 group/card transition-all duration-700 hover:border-primary/30">
            <div className="pointer-events-none absolute -left-16 -top-24 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-8 h-44 w-44 rounded-full bg-orange-400/10 blur-3xl" />

            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary/80">
                        {t.SelectedWork.selected} {t.SelectedWork.work}
                    </p>
                    <p className="text-sm text-foreground/75">Proven launches crafted for measurable growth.</p>
                </div>
                <div className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-[11px] font-medium text-foreground/70">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </div>
            </div>

            <div
                className="relative aspect-[16/10] sm:aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 bg-black/25 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                onMouseEnter={() => {
                    if (autoplayRef.current) clearInterval(autoplayRef.current);
                }}
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
                        dragElastic={0.35}
                        onDragEnd={handleDragEnd}
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            scale: { duration: 0.4, ease: 'easeOut' },
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div className="relative w-full h-full">
                            <NextImage
                                src={projects[currentIndex].image}
                                alt={projects[currentIndex].title}
                                fill
                                className="object-cover object-top"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                            <div className="absolute left-4 top-4">
                                <span className="inline-flex rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                                    Live Project
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/75">{projects[currentIndex].category}</p>
                                <h3 className="text-xl font-display font-bold leading-tight text-white sm:text-2xl">
                                    {projects[currentIndex].title}
                                </h3>
                                <p className="mt-1 line-clamp-2 text-xs text-white/70 sm:text-sm">
                                    {projects[currentIndex].description}
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
                            e.stopPropagation();
                            prevSlide();
                            resetAutoplay();
                        }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-white/5 backdrop-blur-md text-foreground/70 transition-all hover:border-primary/40 hover:text-primary active:scale-95"
                        aria-label="Previous project"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextSlide();
                            resetAutoplay();
                        }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-white/5 backdrop-blur-md text-foreground/70 transition-all hover:border-primary/40 hover:text-primary active:scale-95"
                        aria-label="Next project"
                    >
                        <ArrowRight size={16} />
                    </button>

                    <div className="ml-1 flex items-center gap-1.5">
                        {projects.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                    resetAutoplay();
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40'
                                    }`}
                                aria-label={`Go to project ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <a
                    href={projects[currentIndex].link}
                    target={projects[currentIndex].link === '#' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    onClick={(e) => {
                        if (projects[currentIndex].link === '#') {
                            e.preventDefault();
                            toast({
                                title: t.SelectedWork.comingSoonTitle,
                                description: t.SelectedWork.comingSoonDesc,
                            });
                        }
                    }}
                >
                    View Case
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </a>
            </div>
        </div>
    );
}
