"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        
        if (prefersReducedMotion) {
            // Disable animations for users who prefer reduced motion
            return;
        }

        // Initialize AOS with a slight delay to avoid hydration mismatches
        const timer = setTimeout(() => {
            AOS.init({
                duration: 600, // Faster animations
                easing: 'ease-out-cubic',
                once: true, // Only animate once - improves performance
                mirror: false, // Disable mirror mode - reduces calculations
                offset: 50, // Smaller offset
                disableMutationObserver: false, // Keep enabled for SPA navigation
            });
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return null;
};
