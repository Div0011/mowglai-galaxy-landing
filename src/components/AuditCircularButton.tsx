"use client";

/**
 * AuditCircularButton component - A magnetic circular button with revolving text
 * used for triggering website audits.
 */

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AuditCircularButtonProps {
    className?: string;
    showLabel?: boolean;
    size?: "sm" | "md" | "lg";
}

const AuditCircularButton: React.FC<AuditCircularButtonProps> = ({
    className,
    showLabel = true,
    size = "md"
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const svgRef = useRef<SVGGElement | null>(null);
    const rotateRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    const sizeClasses = {
        sm: "w-12 h-12",
        md: "w-14 h-14 md:w-16 md:h-16",
        lg: "w-24 h-24 md:w-32 md:h-32"
    };

    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-8 h-8"
    };

    useEffect(() => {
        const tick = () => {
            rotateRef.current = (rotateRef.current + 0.5) % 360;
            if (svgRef.current) {
                svgRef.current.setAttribute(
                    "transform",
                    `rotate(${rotateRef.current}, 50, 50)`
                );
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);

    const router = useRouter();

    return (
        <div
            className={cn("relative flex items-center justify-center group", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push('/audit')}
            role="button"
            aria-label="Get a Free Website Audit"
        >
            {/* Massive Background Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 blur-[40px] transition-all duration-700 pointer-events-none scale-150" />

            {/* Trail effect - Prominent screen-spanning marquee behind the button */}
            <AnimatePresence>
                {isHovered && (
                    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden flex items-center justify-center">
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: "-100%", opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="flex items-center gap-12 whitespace-nowrap mix-blend-screen"
                        >
                            {[...Array(8)].map((_, i) => (
                                <span
                                    key={i}
                                    className="text-[15vw] md:text-[20vw] font-display font-black uppercase text-primary/10 select-none tracking-tighter italic filter blur-[2px]"
                                >
                                    AUDIT MOWGLAI •
                                </span>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Circle Container */}
            <div className={cn("relative flex items-center justify-center cursor-pointer transform-gpu z-10 transition-transform duration-500 group-hover:scale-110", sizeClasses[size])}>

                {/* Thin animated outer border */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-primary/20 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),1)] -translate-x-1/2 -translate-y-1/2"></div>
                </motion.div>

                {/* SVG rotating text */}
                <motion.svg
                    animate={{
                        opacity: isHovered ? 1 : 0.6,
                        scale: isHovered ? 1.05 : 1
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none scale-[1.3] text-primary"
                    aria-hidden
                >
                    <g ref={svgRef}>
                        <path id="auditRingBase" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                        <text fontSize="8.5" letterSpacing="3" style={{ fontWeight: 700, textTransform: "uppercase" }}>
                            <textPath
                                href="#auditRingBase"
                                fill="currentColor"
                                textLength="210"
                                lengthAdjust="spacing"
                            >
                                FREE AUDIT REPORT • FREE AUDIT REPORT •
                            </textPath>
                        </text>
                    </g>
                </motion.svg>

                {/* Inner disc - The main interactive element */}
                <div
                    className={cn(
                        "relative rounded-full backdrop-blur-md flex items-center justify-center z-20 overflow-hidden transition-all duration-500",
                        isHovered ? "bg-primary border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]" : "bg-primary/10 border-primary/30",
                        "border",
                        size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10 md:w-12 md:h-12" : "w-14 h-14 md:w-16 md:h-16"
                    )}
                >
                    {/* Animated Arrow that slides out and slides in from bottom left */}
                    <div className="relative flex items-center justify-center w-full h-full">
                        <ArrowUpRight
                            className={cn(
                                "absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                iconSizes[size],
                                isHovered ? "text-primary-foreground translate-x-full -translate-y-full opacity-0" : "text-primary translate-x-0 translate-y-0 opacity-100"
                            )}
                        />
                        <ArrowUpRight
                            className={cn(
                                "absolute transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                                iconSizes[size],
                                isHovered ? "text-primary-foreground translate-x-0 translate-y-0 opacity-100" : "text-primary -translate-x-full translate-y-full opacity-0"
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditCircularButton;
