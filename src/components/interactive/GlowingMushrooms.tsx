"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Mushroom {
    cx: number;
    capRx: number;
    capRy: number;
    stemH: number;
    color: string;
    glowColor: string;
    spotsY: number;
}

const MUSHROOMS: Mushroom[] = [
    { cx: 60,  capRx: 28, capRy: 22, stemH: 24, color: "#14532d", glowColor: "#4ade80", spotsY: -8  },
    { cx: 130, capRx: 36, capRy: 28, stemH: 30, color: "#064e3b", glowColor: "#22c55e", spotsY: -10 },
    { cx: 210, capRx: 22, capRy: 18, stemH: 20, color: "#14532d", glowColor: "#F5D061", spotsY: -6  },
    { cx: 280, capRx: 32, capRy: 25, stemH: 26, color: "#052e16", glowColor: "#4ade80", spotsY: -9  },
    { cx: 350, capRx: 20, capRy: 16, stemH: 18, color: "#14532d", glowColor: "#FFE600", spotsY: -5  },
];

function MushroomSVG({ m, isGlowing }: { m: Mushroom; isGlowing: boolean }) {
    const baseY = 70;
    const capY  = baseY - m.stemH - m.capRy;

    return (
        <g>
            {/* Glow ring below cap (only when lit) */}
            {isGlowing && (
                <motion.ellipse
                    cx={m.cx} cy={capY + m.capRy * 0.6}
                    rx={m.capRx * 1.4} ry={m.capRy * 0.4}
                    fill="none" stroke={m.glowColor} strokeWidth="1"
                    initial={{ opacity: 0, rx: m.capRx }}
                    animate={{ opacity: [0.6, 0.2, 0.6], rx: m.capRx * 1.6 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ filter: `drop-shadow(0 0 6px ${m.glowColor})` }}
                />
            )}

            {/* Stem */}
            <motion.rect
                x={m.cx - 6} y={baseY - m.stemH}
                width="12" height={m.stemH}
                rx="6"
                fill={isGlowing ? "#d1fae5" : "#6ee7b7"}
                animate={{ opacity: isGlowing ? 1 : 0.7 }}
                transition={{ duration: 0.4 }}
            />

            {/* Cap */}
            <motion.ellipse
                cx={m.cx} cy={capY}
                rx={m.capRx} ry={m.capRy}
                animate={{
                    fill: isGlowing ? m.glowColor : m.color,
                    filter: isGlowing ? `drop-shadow(0 0 18px ${m.glowColor}) drop-shadow(0 0 8px ${m.glowColor})` : "none",
                    scaleY: isGlowing ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 0.35, scaleY: { duration: 1.2, repeat: isGlowing ? Infinity : 0, ease: "easeInOut" } }}
                style={{ transformOrigin: `${m.cx}px ${capY + m.capRy}px` }}
            />

            {/* Spots on cap */}
            {[m.cx - 8, m.cx, m.cx + 8].map((sx, si) => (
                <motion.circle
                    key={si}
                    cx={sx} cy={capY + m.spotsY}
                    r={2.5}
                    animate={{
                        fill: isGlowing ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                        opacity: isGlowing ? [1, 0.6, 1] : 0.25,
                    }}
                    transition={{ duration: 1, repeat: isGlowing ? Infinity : 0, delay: si * 0.2 }}
                />
            ))}
        </g>
    );
}

export default function GlowingMushrooms() {
    const [glowing, setGlowing] = useState<Set<number>>(new Set());

    const toggle = useCallback((idx: number) => {
        setGlowing(prev => {
            const next = new Set(prev);
            if (next.has(idx)) { next.delete(idx); }
            else               { next.add(idx); }
            return next;
        });
    }, []);

    // Ground line particles
    const allGlowing = glowing.size === MUSHROOMS.length;

    return (
        <div className="w-full flex flex-col items-center justify-center py-6 relative select-none">
            {/* Hint text */}
            <motion.p
                animate={{ opacity: allGlowing ? 0 : 0.35 }}
                className="text-[10px] uppercase tracking-[0.35em] text-[#22c55e] font-display mb-2"
            >
                tap to glow
            </motion.p>

            {/* SVG mushroom row */}
            <svg
                viewBox="0 0 410 80"
                className="w-full max-w-md h-20 overflow-visible cursor-pointer"
                role="img"
                aria-label="Interactive glowing mushrooms — tap each to light it up"
            >
                {/* Ground */}
                <line x1="20" y1="70" x2="390" y2="70"
                    stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.25"
                    strokeDasharray="6 4"
                />

                {MUSHROOMS.map((m, i) => (
                    <g key={i} onClick={() => toggle(i)} style={{ cursor: "pointer" }}>
                        <MushroomSVG m={m} isGlowing={glowing.has(i)} />
                        {/* Invisible hit area */}
                        <ellipse cx={m.cx} cy={50} rx={m.capRx + 8} ry={35} fill="transparent" />
                    </g>
                ))}
            </svg>

            {/* When all are lit: celebrate */}
            <AnimatePresence>
                {allGlowing && (
                    <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="mt-2 text-[11px] uppercase tracking-[0.3em] text-[#F5D061] font-display"
                    >
                        ✦ the jungle awakens ✦
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
