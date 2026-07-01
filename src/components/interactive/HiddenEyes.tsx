"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

interface EyePairProps {
    id: string;
}

function EyePair({ id }: EyePairProps) {
    const containerRef  = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const pupilLX = useSpring(0, { stiffness: 200, damping: 20 });
    const pupilLY = useSpring(0, { stiffness: 200, damping: 20 });
    const pupilRX = useSpring(0, { stiffness: 200, damping: 20 });
    const pupilRY = useSpring(0, { stiffness: 200, damping: 20 });

    useEffect(() => {
        const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const cx   = rect.left + rect.width / 2;
            const cy   = rect.top  + rect.height / 2;
            const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

            // Reveal when cursor is within 200px
            setVisible(dist < 200);

            if (dist < 200) {
                const moveEye = (eyeCx: number, eyeCy: number) => {
                    const dx    = e.clientX - eyeCx;
                    const dy    = e.clientY - eyeCy;
                    const angle = Math.atan2(dy, dx);
                    const d     = Math.min(dist * 0.04, 10);
                    return { x: Math.cos(angle) * d, y: Math.sin(angle) * d };
                };

                // Left eye center
                const leftCx  = rect.left + rect.width * 0.3;
                const rightCx = rect.left + rect.width * 0.7;
                const eyeCy   = rect.top  + rect.height * 0.5;

                const l = moveEye(leftCx, eyeCy);
                const r = moveEye(rightCx, eyeCy);
                pupilLX.set(l.x); pupilLY.set(l.y);
                pupilRX.set(r.x); pupilRY.set(r.y);
            }
        };

        if (isDesktop) {
            window.addEventListener("mousemove", handleMouseMove, { passive: true });
        }
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [pupilLX, pupilLY, pupilRX, pupilRY]);

    const gradId = `eyeGrad-${id}`;

    return (
        <div ref={containerRef} className="relative w-48 h-20 pointer-events-none">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key="eyes"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-8 justify-center items-center w-full h-full"
                    >
                        {/* Left Eye */}
                        <svg width="60" height="30" viewBox="0 0 120 60" overflow="visible">
                            <defs>
                                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FFE600" />
                                    <stop offset="100%" stopColor="#22c55e" />
                                </linearGradient>
                            </defs>
                            <path d="M10 22 C45 8, 75 12, 110 36 C75 44, 45 40, 10 22 Z"
                                fill="#FFE600" stroke={`url(#${gradId})`} strokeWidth="2.5"
                                style={{ filter: "drop-shadow(0 0 12px rgba(255,230,0,0.8))" }}
                            />
                            <motion.circle cx="60" cy="29" r="9" fill="#000"
                                style={{ x: pupilLX, y: pupilLY }}
                            />
                            <circle cx="64" cy="26" r="2.5" fill="white" opacity={0.8} />
                        </svg>

                        {/* Right Eye */}
                        <svg width="60" height="30" viewBox="0 0 120 60" overflow="visible">
                            <path d="M10 36 C45 12, 75 8, 110 22 C75 40, 45 44, 10 36 Z"
                                fill="#FFE600" stroke={`url(#${gradId})`} strokeWidth="2.5"
                                style={{ filter: "drop-shadow(0 0 12px rgba(255,230,0,0.8))" }}
                            />
                            <motion.circle cx="60" cy="29" r="9" fill="#000"
                                style={{ x: pupilRX, y: pupilRY }}
                            />
                            <circle cx="64" cy="26" r="2.5" fill="white" opacity={0.8} />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Always-visible subtle glow hint — tiny dots to make eyes findable */}
            {!visible && (
                <div className="flex gap-8 justify-center items-center w-full h-full opacity-10">
                    <div className="w-2 h-1 rounded-full bg-[#FFE600] blur-[2px]" />
                    <div className="w-2 h-1 rounded-full bg-[#FFE600] blur-[2px]" />
                </div>
            )}
        </div>
    );
}

// Exported wrapper: 3 pairs placed at different positions
export default function HiddenEyes() {
    return (
        <>
            {/* Mid-left placement */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-90 z-[3]">
                <EyePair id="mid-left" />
            </div>
            {/* Upper-right placement */}
            <div className="absolute right-8 top-1/4 opacity-90 z-[3]">
                <EyePair id="upper-right" />
            </div>
            {/* Lower-left placement */}
            <div className="absolute left-8 bottom-1/4 opacity-90 z-[3]">
                <EyePair id="lower-left" />
            </div>
        </>
    );
}
