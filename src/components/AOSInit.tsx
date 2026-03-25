"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";

export const AOSInit = () => {
    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const hasAnimatedElements = document.querySelector("[data-aos]") !== null;
        let isCancelled = false;
        let timer: ReturnType<typeof setTimeout> | undefined;
        let idleId: number | undefined;

        if (prefersReducedMotion || !hasAnimatedElements) {
            // Disable animations for users who prefer reduced motion
            return;
        }

        const initAOS = async () => {
            const module = await import("aos");
            if (isCancelled) {
                return;
            }

            module.default.init({
                duration: 600,
                easing: 'ease-out-cubic',
                once: true,
                mirror: false,
                offset: 50,
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
