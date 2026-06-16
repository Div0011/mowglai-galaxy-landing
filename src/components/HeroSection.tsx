"use client";

import Link from "next/link";
import { useEffect, useRef, useMemo } from "react";
import TextReveal from "./TextReveal";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";
import { ArrowRight, ScanLine } from "lucide-react";
import { motion } from "framer-motion";

// Floating leaves component — stable values to prevent hydration mismatch
const FloatingLeaves = () => {
    // Stable leaf parameters computed once on mount (not during SSR render)
    const leaves = useMemo(() => [
        { left: 15, xDrift: 80, dur: 12, delay: 0, dir: 1 },
        { left: 35, xDrift: -60, dur: 14, delay: 1, dir: -1 },
        { left: 55, xDrift: 90, dur: 16, delay: 2, dir: 1 },
        { left: 72, xDrift: -70, dur: 11, delay: 3, dir: -1 },
        { left: 88, xDrift: 50, dur: 18, delay: 1.5, dir: 1 },
        { left: 25, xDrift: -40, dur: 15, delay: 4, dir: -1 },
    ], []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {leaves.map((leaf, i) => (
                <motion.div
                    key={i}
                    className="absolute w-8 h-8 opacity-20 dark:opacity-30 mix-blend-screen"
                    style={{
                        left: `${leaf.left}%`,
                        top: `-10%`,
                        background: 'linear-gradient(135deg, #4ade80 0%, #14532d 100%)',
                        borderRadius: '0 50% 0 50%',
                        boxShadow: '0 0 20px rgba(74, 222, 128, 0.2)',
                        willChange: 'transform',
                    }}
                    animate={{
                        y: ['0vh', '120vh'],
                        x: [0, leaf.xDrift, leaf.xDrift * 0.5],
                        rotate: [0, 360 * leaf.dir],
                        scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                        duration: leaf.dur,
                        repeat: Infinity,
                        delay: leaf.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

const HeroSection = () => {
    const { t } = useLanguage();
    const tiltRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

        if (!isDesktop) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                if (tiltRef.current) {
                    const { innerWidth, innerHeight } = window;

                    // Normalize cursor position between -1 and 1
                    const x = (e.clientX / innerWidth) * 2 - 1;
                    const y = (e.clientY / innerHeight) * 2 - 1;

                    // Max tilt angles in degrees
                    const maxRotateX = 15;
                    const maxRotateY = 20;

                    const rotateX = -y * maxRotateX;
                    const rotateY = x * maxRotateY;

                    tiltRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }
            });
        };

        const handleMouseLeave = () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                if (tiltRef.current) {
                    tiltRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.documentElement.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section
            id="home"
            className="relative w-full h-screen z-10 overflow-hidden flex flex-col items-center justify-center border-none"
        >
            <FloatingLeaves />

            {/* Main Content Container */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center border-none">

                {/* Massive Title Block text wrapper with 3D tilt tracking */}
                <div
                    ref={tiltRef}
                    className="flex flex-col items-center leading-none"
                    style={{
                        transition: "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
                        willChange: "transform"
                    }}
                >
                    <h1
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[13vw] font-display font-black text-jungle-gold tracking-tighter hover:tracking-[0.25em] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default select-none transform-gpu hover:scale-80 hover:brightness-125"
                        data-aos-duration="1000"
                    >
                        MOWGLAI
                    </h1>
                </div>

                {/* Subtitle / Value Prop */}
                <div className="mt-1 max-w-3xl" data-aos="fade-up" data-aos-delay="300">
                    <div className="text-lg md:text-xl text-foreground/70 font-body font-light leading-none">
                        <TextReveal text={t.Common.deliveringElegance} />
                    </div>
                </div>

                {/* CTA Buttons */}
                <div
                    className="mt-2 flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-fade-in px-4"
                    style={{ animationDelay: "1s", animationFillMode: "forwards" }}
                >
                    <Magnetic>
                        <Link
                            href="/investment"
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-card/40 backdrop-blur-md border border-[#F5D061]/20 text-[#F5D061] text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(245,208,97,0.3)] hover:border-[#F5D061]/50"
                        >
                            {/* Theme-Aware Gradient Liquid Fill */}
                            <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#F5D061] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>

                            {/* Floating Highlight */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></span>

                            <span className="relative z-10 flex items-center gap-2">
                                START THE PROJECT
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                            </span>
                        </Link>
                    </Magnetic>

                    <Magnetic>
                        <Link
                            href="/audit"
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-background/10 backdrop-blur-xl border border-primary/10 text-primary text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-700 hover:border-primary/40"
                        >
                            {/* Theme-Aware Gradient Liquid Fill for Audit */}
                            <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[#D4AF37] to-[#14532d] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>

                            <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground">
                                GET FREE AUDIT
                                <ScanLine className="w-5 h-5 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
                            </span>
                        </Link>
                    </Magnetic>
                </div>

            </div>

            {/* Bottom Indicators */}
            <div className="absolute bottom-12 ml-2 left-24 hidden md:block text-xs font-display tracking-widest text-foreground/40 uppercase">
                Global Digital Partnership
            </div>
            <div className="absolute bottom-12 mr-2 right-24 hidden md:block text-xs font-display tracking-widest text-foreground/40 uppercase border-none">
                Scroll to Explore
            </div>

        </section>
    );
};
export default HeroSection;
