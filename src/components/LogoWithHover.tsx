"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoWithHoverProps {
    /** Extra classes applied to the outer wrapper */
    className?: string;
    /** Size of the icon */
    iconSize?: number;
    /** Called when the logo is clicked */
    onClick?: () => void;
    /** If true, the whole logo appears dimmed (for scroll-reactive behaviour) */
    dimmed?: boolean;
}

export default function LogoWithHover({
    className,
    iconSize = 44,
    onClick,
    dimmed = false,
}: LogoWithHoverProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Mowglai — go home"
            className={cn(
                "group flex items-center gap-0 cursor-pointer select-none transition-all duration-700 bg-transparent border-none outline-none",
                dimmed && !hovered ? "opacity-35 blur-[2px]" : "opacity-100 blur-0",
                className
            )}
            style={{ WebkitTapHighlightColor: "transparent" }}
        >
            {/* ── Icon ── */}
            <motion.div
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-full overflow-hidden border border-[#F5D061]/20 bg-black/20 backdrop-blur-sm flex-shrink-0"
                style={{ width: iconSize, height: iconSize }}
            >
                <Image
                    src="/logo2.webp"
                    alt="Mowglai logo"
                    fill
                    className="object-cover"
                    priority
                />
                {/* subtle gold ring on hover */}
                <motion.span
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                        boxShadow: "inset 0 0 0 1.5px rgba(245,208,97,0.6), 0 0 18px rgba(245,208,97,0.3)",
                    }}
                />
            </motion.div>

            {/* ── Name slide-in from the right ── */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        key="name"
                        initial={{ x: 18, opacity: 0, width: 0 }}
                        animate={{ x: 0, opacity: 1, width: "auto" }}
                        exit={{ x: 18, opacity: 0, width: 0 }}
                        transition={{ type: "spring", stiffness: 340, damping: 28 }}
                        className="overflow-hidden flex flex-col ml-3"
                    >
                        <span
                            className="text-xl md:text-2xl font-display font-black text-[#F5D061] tracking-[0.15em] leading-none whitespace-nowrap"
                            style={{
                                textShadow: "0 0 12px rgba(245,208,97,0.5)",
                            }}
                        >
                            MOWGLAI
                        </span>
                        <span className="font-body text-[8px] md:text-[9px] text-[#22c55e] tracking-[0.3em] uppercase font-bold mt-1 whitespace-nowrap">
                            Digital Agency
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
