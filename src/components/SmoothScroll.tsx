"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";


const SmoothScroll = () => {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

        if (prefersReducedMotion || isCoarsePointer) {
            return;
        }

        const lenis = new Lenis({
            lerp: 0.08,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
};

export default SmoothScroll;
