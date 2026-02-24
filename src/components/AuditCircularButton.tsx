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
            className={cn("relative flex items-center justify-center", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push('/audit')}
            role="button"
            aria-label="Get a Free Website Audit"
        >
            {/* Trail effect - Prominent screen-spanning marquee behind the button */}
            <AnimatePresence>
                {isHovered && (
                    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden flex items-center justify-center">
                        <motion.div
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: "-100%", opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="flex items-center gap-12 whitespace-nowrap"
                        >
                            {[...Array(8)].map((_, i) => (
                                <span
                                    key={i}
                                    className="text-[18vw] md:text-[22vw] font-display font-black uppercase text-[#c5a059]/20 select-none tracking-tighter italic filter blur-[1px]"
                                >
                                    GET FREE AUDIT •
                                </span>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Circle + rotating text */}
            <div className={cn("relative flex items-center justify-center cursor-pointer transform-gpu z-10", sizeClasses[size])}>
                {/* Pulse ring */}
                <motion.span
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border border-[#c5a059]/60 pointer-events-none"
                />

                {/* SVG rotating text - Always visible now */}
                <motion.svg
                    animate={{
                        opacity: isHovered ? 1 : 0.4,
                        rotate: isHovered ? 90 : 0
                    }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none scale-[1.3]"
                    aria-hidden
                >
                    <g ref={svgRef}>
                        <path id="auditRingBase" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                        <text fontSize="8.5" letterSpacing="2" style={{ fontWeight: 800, textTransform: "uppercase" }}>
                            <textPath
                                href="#auditRingBase"
                                fill="#c5a059"
                                textLength="210"
                                lengthAdjust="spacing"
                            >
                                GET FREE AUDIT • GET FREE AUDIT •
                            </textPath>
                        </text>
                    </g>
                </motion.svg>

                {/* Inner disc - STATIONARY */}
                <motion.div
                    animate={{
                        backgroundColor: isHovered ? "rgba(197,160,89,1)" : "rgba(197,160,89,0.15)",
                        boxShadow: isHovered
                            ? "0 0 50px rgba(197,160,89,0.5), 0 0 100px rgba(197,160,89,0.25)"
                            : "0 0 0px transparent",
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                        "rounded-full border border-[#c5a059]/40 backdrop-blur-xl flex items-center justify-center z-20",
                        size === "sm" ? "w-8 h-8" : size === "md" ? "w-9 h-9 md:w-10 md:h-10" : "w-12 h-12 md:w-14 md:h-14"
                    )}
                >
                    <motion.div animate={{ rotate: isHovered ? 45 : 0 }} transition={{ duration: 0.4 }}>
                        <ArrowUpRight className={cn(iconSizes[size], isHovered ? "text-black" : "text-[#c5a059]")} />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuditCircularButton;
