"use client";

import { useEffect } from "react";


const SmoothScroll = () => {
    useEffect(() => {
        let rafId: number;
        let cancelled = false;
        let lenisInstance: { raf: (time: number) => void; destroy: () => void } | null = null;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

        if (prefersReducedMotion || isCoarsePointer) {
            return;
        }

        const bootLenis = async () => {
            const module = await import("@studio-freight/lenis");
            if (cancelled) {
                return;
            }

            const Lenis = module.default;
            lenisInstance = new Lenis({
                lerp: 0.08,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            });

            const raf = (time: number) => {
                if (!lenisInstance) {
                    return;
                }

                lenisInstance.raf(time);
                rafId = requestAnimationFrame(raf);
            };

            rafId = requestAnimationFrame(raf);
        };

        void bootLenis();

        return () => {
            cancelled = true;
            cancelAnimationFrame(rafId);
            lenisInstance?.destroy();
        };
    }, []);

    return null;
};

export default SmoothScroll;
