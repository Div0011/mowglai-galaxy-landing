"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const JungleBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        let cancelled = false;

        // Defer particle engine init to idle time — don't block first paint
        const initEngine = async () => {
            await initParticlesEngine(async (engine: Engine) => {
                await loadSlim(engine);
            });
            if (!cancelled) setInit(true);
        };

        if ("requestIdleCallback" in window) {
            const idleId = window.requestIdleCallback(() => { void initEngine(); }, { timeout: 2000 });
            return () => { cancelled = true; window.cancelIdleCallback(idleId); };
        } else {
            const timer = setTimeout(() => { void initEngine(); }, 500);
            return () => { cancelled = true; clearTimeout(timer); };
        }
    }, []);

    const particlesLoaded = useCallback(async () => {}, []);

    return (
        <div className="fixed inset-0 w-full h-dvh -z-[100] overflow-hidden pointer-events-none">

            {/* 1. Base Gradient Layer */}
            <div className="fixed inset-0 w-full h-dvh bg-gradient-to-b transition-colors duration-1000 
                /* Dark Mode: Deepest Forest Green -> Dark Moss -> Almost Black */
                dark:from-[#0c1810] dark:via-[#081f12] dark:to-[#05110a] 
                /* Light Mode: Soft Ivory -> Warm Peach */
                from-[#f5ebd7] via-[#e8ddc5] to-[#dbcca8]"
            />

            {/* 2. Fixed Atmosphere Layer */}
            <div className="fixed inset-0 w-full h-full pointer-events-none mix-blend-overlay">
                <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
                
                {/* Dappled light effects — use will-change for GPU compositing */}
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-white/10 dark:bg-[#F5D061]/5 rounded-full blur-[150px] animate-pulse" style={{ willChange: 'opacity' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-[#D4AF37]/10 dark:bg-[#4ade80]/5 rounded-full blur-[150px] animate-bounce-slow" style={{ willChange: 'transform' }} />
            </div>

            {/* 3. Jungle Silhouette Edge (Vines/Leaves shadow overlay) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40"
                 style={{
                     background: 'radial-gradient(circle at center, transparent 40%, rgba(5, 17, 10, 0.8) 100%)'
                 }}
            />

            {/* 4. Fireflies using tsParticles — reduced count + lower FPS */}
            {init && (
                <div className="absolute inset-0 z-10 opacity-70">
                    <Particles
                        id="tsparticles-jungle"
                        options={{
                            fullScreen: { enable: false },
                            background: { color: { value: "transparent" } },
                            fpsLimit: 30, // 30fps is plenty for ambient particles
                            interactivity: {
                                events: {
                                    onHover: { enable: true, mode: "slow" },
                                },
                                modes: {
                                    slow: { radius: 150, factor: 3 },
                                },
                            },
                            particles: {
                                color: { value: ["#F5D061", "#D4AF37", "#FFFFFF", "#a3e635"] },
                                move: {
                                    direction: "none",
                                    enable: true,
                                    outModes: { default: "bounce" },
                                    random: true,
                                    speed: 0.4,
                                    straight: false,
                                },
                                number: {
                                    density: { enable: true, width: 800, height: 800 },
                                    value: 20, // Reduced from 40 — less GPU/CPU work
                                },
                                opacity: {
                                    value: { min: 0.1, max: 0.8 },
                                    animation: {
                                        enable: true,
                                        speed: 0.8,
                                        sync: false,
                                    },
                                },
                                shape: { type: "circle" },
                                size: {
                                    value: { min: 1, max: 3 },
                                    animation: { enable: true, speed: 1.5, sync: false },
                                },
                            },
                            detectRetina: true,
                        }}
                    />
                </div>
            )}

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -30px, 0); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 15s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default JungleBackground;
