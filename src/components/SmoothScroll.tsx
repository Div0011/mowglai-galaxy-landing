"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
    useEffect(() => {
        let cancelled = false;
        let lenisInstance: any = null;

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
                lerp: 0.1,
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            });

            // ═══ CRITICAL: Bridge Lenis → GSAP ScrollTrigger ═══
            // Without this, ScrollTrigger reads native scroll position
            // while Lenis interpolates it, causing animation desync.
            lenisInstance.on('scroll', () => {
                ScrollTrigger.update();
            });

            // Sync GSAP ticker with Lenis for perfect frame alignment
            gsap.ticker.add((time: number) => {
                lenisInstance?.raf(time * 1000);
            });

            // Disable Lenis's own rAF loop since GSAP ticker drives it now
            gsap.ticker.lagSmoothing(0);
        };

        void bootLenis();

        return () => {
            cancelled = true;
            if (lenisInstance) {
                gsap.ticker.remove(lenisInstance.raf);
                lenisInstance.destroy();
            }
        };
    }, []);

    return null;
};

export default SmoothScroll;
