"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useSpring, useTransform } from "framer-motion";
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
        description: "A professional consultancy platform delivering actionable business strategies. We designed a clean, corporate interface that establishes authority and streamlines client engagement.",
        link: "https://clarity-cartel.vercel.app/"
    },
    {
        id: 2,
        title: "iElevate",
        category: "Business Growth & Coaching",
        image: "/assets/projects/ielevate.png",
        description: "A comprehensive platform for professional development and business scaling. We built a dynamic learning hub empowering entrepreneurs with tools, courses, and mentorship.",
        link: "https://www.ielevate.in/"
    },
    {
        id: 3,
        title: "Jayhawk",
        category: "Healthcare Services",
        image: "/assets/projects/jayhawk.webp",
        description: "A modern healthcare portal prioritizing patient accessibility and care. Features include secure appointment scheduling, medical record access, and virtual doctor consultations.",
        link: "https://div0011.github.io/jayhawkk"
    },
    {
        id: 4,
        title: "More Interior",
        category: "Interior Design Studio",
        image: "/assets/projects/more-interior.webp",
        description: "An immersive portfolio showcasing exquisite living spaces. The design emphasizes visual storytelling, allowing users to explore bespoke furniture and architectural elegance.",
        link: "https://moreinterior.in/"
    },
    {
        id: 5,
        title: "True Ratings",
        category: "Movie & TV Ratings Platform",
        image: "/assets/projects/true-ratings.png",
        description: "A comprehensive database for tracking movie and TV show ratings, similar to IMDb. We built a data-driven platform for entertainment discovery and detailed content analysis.",
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

    // Faux-3D Depth Parallax
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const imgX = useTransform(springX, [0, 1], ["5%", "-5%"]);
    const imgY = useTransform(springY, [0, 1], ["5%", "-5%"]);
    const contentX = useTransform(springX, [0, 1], ["-2%", "2%"]);
    const contentY = useTransform(springY, [0, 1], ["-2%", "2%"]);


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

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                prevSlide();
                resetAutoplay();
            } else if (e.key === "ArrowRight") {
                nextSlide();
                resetAutoplay();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide, resetAutoplay]);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -50) {
            nextSlide();
            resetAutoplay();
        } else if (info.offset.x > 50) {
            prevSlide();
            resetAutoplay();
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8
        })
    };

    return (
        <section className="relative w-full py-12 md:py-20 overflow-hidden bg-transparent gpu-accelerate">
            {/* Gradient blending removed for seamless look */}

            <div className="container mx-auto px-6 relative z-20">
                <div className="flex flex-col items-center mb-10 space-y-2 text-center" data-aos="fade-up">
                    <h2 className="text-[8vw] md:text-5xl font-display font-black tracking-tighter text-foreground relative z-10 flex flex-col md:block">
                        <span className="opacity-30 uppercase mr-4">{t.SelectedWork.selected}</span>
                        <span className="text-primary uppercase">{t.SelectedWork.work}</span>
                    </h2>
                    <p className="max-w-2xl text-base text-foreground/70 font-light px-4">
                        {t.SelectedWork.collectionDesc}
                    </p>
                </div>

                <div
                    className="relative w-full aspect-[4/5] sm:aspect-video md:aspect-[21/8] max-w-5xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-card"
                    onMouseEnter={() => {
                        if (autoplayRef.current) clearInterval(autoplayRef.current);
                        autoplayRef.current = null;
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
                            dragElastic={1}
                            onDragEnd={handleDragEnd}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                // normalize 0 to 1
                                mouseX.set((e.clientX - rect.left) / rect.width);
                                mouseY.set((e.clientY - rect.top) / rect.height);
                            }}
                            onMouseLeave={() => {
                                mouseX.set(0.5);
                                mouseY.set(0.5);
                            }}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                                scale: { duration: 0.4 }
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* IMAGE CONTAINER - Integrated Mobile (Top 50%), Full Desktop */}
                            <div
                                className="relative w-full h-[50%] md:absolute md:inset-0 md:h-full z-0 overflow-hidden"
                            >
                                <NextImage
                                    src={projects[currentIndex].image}
                                    alt={projects[currentIndex].title}
                                    fill
                                    className="object-cover object-center"
                                    priority
                                />
                                <div className="hidden md:block absolute inset-0 bg-black/20" />
                            </div>

                            {/* CONTENT CONTAINER - Integrated Mobile (Bottom 50%), Overlay Desktop with Reverse Parallax */}
                            <div className="relative w-full h-[50%] md:absolute md:inset-0 md:h-full z-10 flex flex-col justify-center items-center md:items-start bg-card md:bg-transparent pointer-events-none p-5 md:p-12 perspective-1000">
                                <motion.div
                                    style={{ x: contentX, y: contentY }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="w-full h-full md:h-auto md:max-w-lg md:bg-card md:border md:border-border md:p-8 md:rounded-3xl md:shadow-2xl relative overflow-hidden group/card pointer-events-auto flex flex-col justify-between md:block transform-gpu"
                                >
                                    {/* Desktop-only internal container styling elements */}
                                    <div className="hidden md:block absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-50" />

                                    {/* Content Wrapper for Mobile Alignment */}
                                    <div className="relative z-10 flex flex-col items-center md:items-start gap-2 md:gap-5 text-center md:text-left">
                                        {/* Header */}
                                        <div className="space-y-1">
                                            <span className="text-primary font-display font-bold tracking-widest uppercase text-[10px] md:text-sm">
                                                {projects[currentIndex].category}
                                            </span>
                                            <h3 className="text-xl md:text-5xl font-display font-black text-card-foreground leading-tight">
                                                {projects[currentIndex].title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted-foreground text-xs md:text-lg font-light leading-relaxed line-clamp-3 md:line-clamp-4">
                                            {projects[currentIndex].description}
                                        </p>
                                    </div>

                                    {/* Actions Row: Anchored to bottom on mobile */}
                                    <div className="flex items-center justify-center w-full mt-4 relative z-10">
                                        <a
                                            href={projects[currentIndex].link}
                                            target={projects[currentIndex].link === "#" ? "_self" : "_blank"}
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 md:px-8 md:py-3 bg-primary text-primary-foreground font-bold rounded-full transition-all hover:brightness-110 hover:scale-105 active:scale-95 shadow-md hover:shadow-primary/20 cursor-pointer"
                                            onClick={(e) => {
                                                if (projects[currentIndex].link === "#") {
                                                    e.preventDefault();
                                                    toast({
                                                        title: t.SelectedWork.comingSoonTitle,
                                                        description: t.SelectedWork.comingSoonDesc,
                                                    });
                                                }
                                                e.stopPropagation();
                                            }}
                                        >
                                            <span className="text-xs md:text-base">{t.SelectedWork.exploreCase}</span>
                                            <ExternalLink size={14} className="md:w-5 md:h-5" />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons - Sides (Now Visible on Mobile) */}
                    <button
                        onClick={() => { prevSlide(); resetAutoplay(); }}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 p-2 md:p-4 text-foreground/70 hover:text-primary hover:scale-110 transition-all rounded-full bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm"
                        aria-label="Previous Slide"
                    >
                        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button
                        onClick={() => { nextSlide(); resetAutoplay(); }}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 p-2 md:p-4 text-foreground/70 hover:text-primary hover:scale-110 transition-all rounded-full bg-foreground/5 hover:bg-foreground/10 backdrop-blur-sm"
                        aria-label="Next Slide"
                    >
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </div>
            </div>
        </section>
    );
}
