import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollTransitionProps {
    children: React.ReactNode;
    className?: string;
    effect?: "zoom-in" | "depth-pull" | "fade-slide" | "curtain";
    id?: string;
}

export const ScrollTransition = ({ children, className, effect = "fade-slide", id }: ScrollTransitionProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress relative to this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Smooth out the scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} id={id} className={cn("relative w-full", className)}>
            <EffectRenderer effect={effect} progress={smoothProgress}>
                {children}
            </EffectRenderer>
        </div>
    );
};

const EffectRenderer = ({
    effect,
    progress,
    children
}: {
    effect: string;
    progress: MotionValue<number>;
    children: React.ReactNode
}) => {

    // 1. ZOOM IN (Pricing -> Testimonials style)
    // Starts normal, then zooms in massive and fades out as you scroll past
    const zoomScale = useTransform(progress, [0.5, 0.8], [1, 15]);
    const zoomOpacity = useTransform(progress, [0.6, 0.8], [1, 0]);
    const zoomFilter = useTransform(progress, [0.6, 0.8], ["blur(0px)", "blur(10px)"]);

    // 2. DEPTH PULL (Testimonials -> Contact style)
    // Appears to come from background: starts small/faded, scales up to 1
    const depthScale = useTransform(progress, [0, 0.3], [0.8, 1]);
    const depthOpacity = useTransform(progress, [0, 0.3], [0, 1]);
    const depthY = useTransform(progress, [0, 0.3], [100, 0]);

    // 3. FADE SLIDE (Contact -> Footer style)
    // Subtle slide up and fade in
    const slideY = useTransform(progress, [0, 0.2], [50, 0]);
    const slideOpacity = useTransform(progress, [0, 0.2], [0, 1]);

    // 4. CURTAIN (Purple reveal alternative)
    const curtainScale = useTransform(progress, [0.8, 1], [1, 0.95]);
    const curtainOpacity = useTransform(progress, [0.8, 1], [1, 0]);


    if (effect === "zoom-in") {
        return (
            <motion.div style={{ scale: zoomScale, opacity: zoomOpacity, filter: zoomFilter, willChange: "transform, opacity" }} className="origin-center">
                {children}
            </motion.div>
        );
    }

    if (effect === "depth-pull") {
        return (
            <motion.div style={{ scale: depthScale, opacity: depthOpacity, y: depthY, willChange: "transform, opacity" }} className="origin-center">
                {children}
            </motion.div>
        );
    }

    if (effect === "fade-slide") {
        return (
            <motion.div style={{ y: slideY, opacity: slideOpacity, willChange: "transform, opacity" }} className="">
                {children}
            </motion.div>
        );
    }

    // Default
    return <>{children}</>;
};
