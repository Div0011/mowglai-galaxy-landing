"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Slide {
    src: string;
    alt: string;
    label?: string;
}

interface TemplateSlideshowProps {
    slides: Slide[];
    interval?: number;
    className?: string;
    rounded?: string;
    priority?: boolean;
}

const TemplateSlideshow = ({
    slides,
    interval = 3200,
    className,
    rounded = "rounded-2xl",
    priority = false,
}: TemplateSlideshowProps) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const go = useCallback(
        (next: number) => {
            setIndex((prev) => (next + slides.length) % slides.length);
        },
        [slides.length]
    );

    const next = useCallback(() => go(index + 1), [go, index]);
    const prev = useCallback(() => go(index - 1), [go, index]);

    useEffect(() => {
        if (paused || reducedMotion || slides.length <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, interval);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [paused, reducedMotion, interval, slides.length]);

    if (slides.length === 0) return null;

    return (
        <div
            className={cn("relative w-full group", className)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Template showcase slideshow"
        >
            <div className={cn("relative w-full overflow-hidden bg-card/40", rounded)}>
                {slides.map((slide, i) => (
                    <div
                        key={slide.src + i}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-700 ease-out",
                            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                        )}
                        aria-hidden={i !== index}
                    >
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            sizes="(max-width: 768px) 90vw, 40vw"
                            priority={priority && i === 0}
                            unoptimized
                            className="object-cover object-top"
                        />
                    </div>
                ))}

                {/* Prev / Next controls */}
                {slides.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prev}
                            aria-label="Previous slide"
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 grid h-9 w-9 place-items-center rounded-full bg-background/60 text-foreground backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            aria-label="Next slide"
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 grid h-9 w-9 place-items-center rounded-full bg-background/60 text-foreground backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </>
                )}

                {/* Active slide label */}
                {slides[index]?.label && (
                    <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground backdrop-blur-md">
                        {slides[index].label}
                    </div>
                )}
            </div>

            {/* Dot navigation */}
            {slides.length > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => go(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === index}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-300",
                                i === index
                                    ? "w-6 bg-primary"
                                    : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TemplateSlideshow;
