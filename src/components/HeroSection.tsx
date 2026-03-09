"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import TextReveal from "./TextReveal";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";
import { ArrowRight, ScanLine } from "lucide-react";

const HeroSection = () => {
    const { t } = useLanguage();
    const tiltRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            // Apply only on devices with proper cursor (desktops/laptops)
            const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
            if (!isDesktop) return;

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
            className="relative w-full h-screen z-10 overflow-hidden flex flex-col items-center justify-center"
        >

            {/* Main Content Container */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">

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
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[13vw] font-display font-black text-foreground tracking-tighter hover:tracking-[0.25em] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default select-none transform-gpu hover:scale-80 hover:text-primary"
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
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.5)]"
                        >
                            {/* Theme-Aware Gradient Liquid Fill */}
                            <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[var(--primary)] via-indigo-600 to-purple-600 dark:from-primary dark:via-emerald-500 dark:to-teal-400 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>

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
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-background/5 backdrop-blur-3xl border border-primary/30 text-primary text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-700"
                        >
                            {/* Theme-Aware Gradient Liquid Fill for Audit */}
                            <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[var(--primary)] via-indigo-600 to-purple-600 dark:from-primary dark:via-emerald-500 dark:to-teal-400 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>

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
            <div className="absolute bottom-12 mr-2 right-24 hidden md:block text-xs font-display tracking-widest text-foreground/40 uppercase">
                Scroll to Explore
            </div>

        </section>
    );
};
export default HeroSection;
