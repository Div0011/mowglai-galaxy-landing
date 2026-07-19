"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export const AOSInit = () => {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let isCancelled = false;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let idleId: number | undefined;

        if (prefersReducedMotion) {
            // Disable animations for users who prefer reduced motion
            return;
        }

        const initAOS = async () => {
            const module = await import("aos");
            if (isCancelled) {
                return;
            }

            const isMobile = window.innerWidth < 768;
            module.default.init({
                duration: isMobile ? 350 : 600,
                easing: 'ease-out-cubic',
                once: true,
                mirror: false,
                offset: isMobile ? 15 : 50,
                disableMutationObserver: false,
            });
        };

        const scheduleInit = () => {
            timer = setTimeout(() => {
                void initAOS();
            }, 150);
        };

        if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(scheduleInit, { timeout: 1000 });
        } else {
            scheduleInit();
        }

        return () => {
            isCancelled = true;

            if (timer) {
                clearTimeout(timer);
            }

            if (idleId !== undefined && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, []);

    return null;
};
