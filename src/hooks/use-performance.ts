"use client";

import { useEffect, useRef } from "react";

// Performance monitoring hook for Core Web Vitals
export function usePerformanceMonitor() {
    const observerRef = useRef<PerformanceObserver | null>(null);

    useEffect(() => {
        // Only run in production and if supported
        if (process.env.NODE_ENV !== "production" || !window.PerformanceObserver) {
            return;
        }

        // Log LCP (Largest Contentful Paint)
        try {
            observerRef.current = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    // Log to analytics service if needed
                    if (process.env.NODE_ENV === "development") {
                        console.log("LCP:", entry.startTime);
                    }
                }
            });
            observerRef.current.observe({ entryTypes: ["largest-contentful-paint"] });
        } catch {
            // LCP not supported
        }

        // Log CLS (Cumulative Layout Shift)
        try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
                        clsValue += (entry as unknown as { value: number }).value;
                    }
                }
                if (process.env.NODE_ENV === "development") {
                    console.log("CLS:", clsValue);
                }
            });
            clsObserver.observe({ entryTypes: ["layout-shift"] });
        } catch {
            // CLS not supported
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);
}

// Hook to detect when user is idle (for lazy loading)
export function useIdleCallback(callback: () => void, timeout = 2000) {
    useEffect(() => {
        if (typeof window === "undefined") return;

        let idleCallbackId: number;

        if ("requestIdleCallback" in window) {
            idleCallbackId = window.requestIdleCallback(callback, { timeout });
        } else {
            // Fallback for Safari
            const timeoutId = setTimeout(callback, timeout);
            return () => clearTimeout(timeoutId);
        }

        return () => {
            if ("cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleCallbackId);
            }
        };
    }, [callback, timeout]);
}

// Hook to detect intersection (for lazy loading components)
export function useIntersectionObserver(
    callback: (isIntersecting: boolean) => void,
    options?: IntersectionObserverInit
) {
    const targetRef = useRef<HTMLElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !window.IntersectionObserver) {
            // Fallback: always show
            callback(true);
            return;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                callback(entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: "50px",
                ...options,
            }
        );

        if (targetRef.current) {
            observerRef.current.observe(targetRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [callback, options]);

    return targetRef;
}
