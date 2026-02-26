"use client";

import { useEffect, useRef } from "react";

const JungleBackground = () => {
    const maskRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mouseTicking = false;
        let scrollTicking = false;
        let animationFrameId: number;
        let handleMouseMove: ((e: MouseEvent) => void) | undefined;
        let handleMouseLeave: (() => void) | undefined;

        // Check if device is mobile/touch (no real mouse)
        const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

        if (isMobile) {
            // --- MOBILE AUTO "WIND" EFFECT ---
            let t = 0;
            const animateWind = () => {
                t += 0.003; // Wind speed
                // Complex Lissajous curve for organic, random-feeling wind sweeps
                const vw = window.innerWidth;
                const vh = window.innerHeight;

                // Moves in a sweeping pattern
                const x = (vw / 2) + Math.sin(t) * (vw * 0.6) * Math.cos(t * 0.7);
                const y = (vh / 2) + Math.cos(t * 1.1) * (vh * 0.5) * Math.sin(t * 0.4);

                if (maskRef.current) {
                    // Soft, elongated ellipse for wind
                    const maskStr = `radial-gradient(ellipse 400px 300px at ${x}px ${y}px, transparent 0%, black 70%)`;
                    maskRef.current.style.webkitMaskImage = maskStr;
                    maskRef.current.style.maskImage = maskStr;
                }

                animationFrameId = requestAnimationFrame(animateWind);
            };
            animationFrameId = requestAnimationFrame(animateWind);

        } else {
            // --- DESKTOP MOUSE FOLLOW EFFECT ---
            handleMouseMove = (e: MouseEvent) => {
                if (!mouseTicking) {
                    requestAnimationFrame(() => {
                        if (maskRef.current) {
                            const maskStr = `radial-gradient(circle 250px at ${e.clientX}px ${e.clientY}px, transparent 0%, black 60%)`;
                            maskRef.current.style.webkitMaskImage = maskStr;
                            maskRef.current.style.maskImage = maskStr;
                        }
                        mouseTicking = false;
                    });
                    mouseTicking = true;
                }
            };

            handleMouseLeave = () => {
                requestAnimationFrame(() => {
                    if (maskRef.current) {
                        const maskStr = `radial-gradient(circle 250px at -1000px -1000px, transparent 0%, black 60%)`;
                        maskRef.current.style.webkitMaskImage = maskStr;
                        maskRef.current.style.maskImage = maskStr;
                    }
                });
            };

            window.addEventListener("mousemove", handleMouseMove, { passive: true });
            document.documentElement.addEventListener("mouseleave", handleMouseLeave, { passive: true });
            handleMouseLeave(); // Hide initially until mouse enters
        }

        // --- GLOBAL SCROLL PARALLAX ---
        const handleScroll = () => {
            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    if (bgRef.current) {
                        bgRef.current.style.backgroundPosition = `center ${-window.scrollY * 0.4}px`;
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (!isMobile) {
                if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
                if (handleMouseLeave) document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            }
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-[100] overflow-hidden pointer-events-none bg-background">
            {/* 0. Hidden 3D Floral Texture (Bottom-most Layer) - Infinite Parallax Wall */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Single Continuous Texture Wall */}
                <div
                    ref={bgRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{
                        backgroundImage: 'url(/floral_texture_custom.jpg)',
                        backgroundSize: '400px',
                        backgroundRepeat: 'repeat',
                        filter: "brightness(0.9) contrast(1.1)",
                        opacity: 1,
                        willChange: "background-position",
                    }}
                />
            </div>

            {/* Fog Cover: Contains the Gradient and Atmosphere layers */}
            <div
                ref={maskRef}
                className="absolute inset-0 pointer-events-none w-full h-full transition-opacity duration-300"
                style={{
                    willChange: "mask-image, -webkit-mask-image",
                }}
            >
                {/* 1. Base Gradient Layer - Spans entire page height */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b transition-colors duration-1000 
                    /* Dark Mode: Palm Leaf -> Dark Green -> Deep Green */
                    dark:from-[#799851] dark:via-[#47622A] dark:to-[#374426] 
                    /* Light Mode: Off-white/Peach (#FDF3E7) -> Golden (#D4AF37) */
                    from-[#FDF3E7] via-[#EBD5B3] to-[#D4AF37]"
                />

                {/* 2. Fixed Atmosphere Layer - Overlays that stay with the viewport */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Dappled light effects - Subtle pulses */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 dark:bg-green-900/10 rounded-full blur-[120px] animate-pulse will-change-[opacity]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 dark:bg-emerald-900/10 rounded-full blur-[150px] animate-bounce-slow will-change-transform" />

                    {/* Subtle leaf/texture overlay */}
                    <div className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />

                    {/* Vignette for depth - Stronger in dark mode */}
                    <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                </div>
            </div>

            {/* 3. Floating Yellow Fireflies (Independent of mask, floats in front) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute w-2 h-2 rounded-full bg-[#E6B93D] blur-[1px] animate-firefly-1" />
                <div className="absolute w-3 h-3 rounded-full bg-[#F5D061] blur-[2px] animate-firefly-2" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-[#FFFFFF] blur-[1px] animate-firefly-3" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#E6B93D] blur-[2px] animate-firefly-4" />
                <div className="absolute w-2 h-2 rounded-full bg-[#F5D061] blur-[1px] animate-firefly-5" />
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -30px, 0); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 15s ease-in-out infinite;
                }
                
                @keyframes fly-1 {
                    0% { top: 10%; left: -10%; transform: scale(1); opacity: 0; }
                    20% { opacity: 0.8; }
                    80% { opacity: 0.6; }
                    100% { top: 40%; left: 110%; transform: scale(1.5); opacity: 0; }
                }
                @keyframes fly-2 {
                    0% { top: 80%; left: 110%; transform: scale(1.2); opacity: 0; }
                    20% { opacity: 0.5; }
                    80% { opacity: 0.9; }
                    100% { top: 20%; left: -10%; transform: scale(0.8); opacity: 0; }
                }
                @keyframes fly-3 {
                    0% { top: -10%; left: 30%; transform: scale(0.8); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 0.3; }
                    100% { top: 110%; left: 70%; transform: scale(1.2); opacity: 0; }
                }
                @keyframes fly-4 {
                    0% { top: 110%; left: 60%; transform: scale(1.5); opacity: 0; }
                    20% { opacity: 0.7; }
                    80% { opacity: 0.4; }
                    100% { top: -10%; left: 20%; transform: scale(1); opacity: 0; }
                }
                @keyframes fly-5 {
                    0% { top: 50%; left: -10%; transform: scale(1); opacity: 0; }
                    20% { opacity: 0.6; }
                    80% { opacity: 0.9; }
                    100% { top: 80%; left: 110%; transform: scale(1.3); opacity: 0; }
                }

                .animate-firefly-1 { animation: fly-1 18s ease-in-out infinite; }
                .animate-firefly-2 { animation: fly-2 24s ease-in-out infinite 2s; }
                .animate-firefly-3 { animation: fly-3 20s ease-in-out infinite 5s; }
                .animate-firefly-4 { animation: fly-4 28s ease-in-out infinite 1s; }
                .animate-firefly-5 { animation: fly-5 22s ease-in-out infinite 7s; }
            `}</style>
        </div>
    );
};

export default JungleBackground;
