"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════
// ANIMAL REGISTRY — 25 animals max, spawned based on scroll
// position. Animals are categorised by where they appear:
//
//   PERMANENT (always visible):
//     1. Panther (bottom-right, eyes track mouse)
//     2–6. Butterflies × 5 (float & scatter from cursor)
//
//   SCROLL-TRIGGERED (appear as you explore the tree):
//     7–10. Parrots × 4 (fly across screen at thresholds)
//     11–14. Monkeys × 4 (sit on branches, jump when scrolled past)
//     15–18. Firefly clusters already in GiantJungleTree
//     19–21. Toucan × 3 (perch on branches, head turns)
//     22–24. Tree Frogs × 3 (sitting on leaves, blink)
//     25. Snake (coiled on a branch, tongue flick)
//
// Total permanent: 6, scroll-triggered: up to 19 = 25 max
// ═══════════════════════════════════════════════════════════════

// Shared mouse ref — single source of truth, no useState
const mouseRef = { x: 0, y: 0 };

// ─── 1. PANTHER ───
// Uses useRef for eye tracking — zero re-renders
const Panther = () => {
    const eyeGroupRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!isDesktop) return;

        let rafId: number;
        const animate = () => {
            if (eyeGroupRef.current) {
                const eyeX = (mouseRef.x / window.innerWidth) * 6 - 3;
                const eyeY = (mouseRef.y / window.innerHeight) * 4 - 2;
                eyeGroupRef.current.setAttribute("transform", `translate(${eyeX}, ${eyeY})`);
            }
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <div className="fixed bottom-0 right-0 md:right-10 w-48 h-48 md:w-64 md:h-64 pointer-events-none z-[2]">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full opacity-80 dark:opacity-90">
                <path d="M180 200C180 150 140 100 100 100C60 100 30 130 20 180C15 200 200 200 180 200Z" fill="#05110a" />
                <path d="M70 105C65 95 60 85 55 90C50 95 60 110 65 115C68 112 72 108 70 105Z" fill="#05110a" />
                <path d="M130 105C135 95 140 85 145 90C150 95 140 110 135 115C132 112 128 108 130 105Z" fill="#05110a" />
                <g ref={eyeGroupRef}>
                    <path d="M75 130 Q85 125 90 135 Q80 138 75 130" fill="#F5D061" className="drop-shadow-[0_0_8px_rgba(245,208,97,0.8)]" />
                    <circle cx="82" cy="132" r="1.5" fill="#000" />
                    <path d="M125 130 Q115 125 110 135 Q120 138 125 130" fill="#F5D061" className="drop-shadow-[0_0_8px_rgba(245,208,97,0.8)]" />
                    <circle cx="118" cy="132" r="1.5" fill="#000" />
                </g>
            </svg>
        </div>
    );
};

// ─── 2–6. BUTTERFLIES (5 total) ───
// Rewritten to use GSAP quickTo — no useState, no re-renders
const Butterfly = ({ id }: { id: number }) => {
    const colors = ["#4ade80", "#F5D061", "#22c55e", "#86efac", "#a3e635"];
    const color = colors[id % colors.length];
    const containerRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: 300 + id * 100, y: 200 + id * 80 });

    useEffect(() => {
        if (!containerRef.current) return;
        const el = containerRef.current;

        // Initialize position
        if (typeof window !== "undefined") {
            posRef.current = {
                x: 100 + Math.random() * (window.innerWidth - 200),
                y: 100 + Math.random() * (window.innerHeight - 200),
            };
        }

        const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "power2.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "power2.out" });

        // Set initial position
        gsap.set(el, { x: posRef.current.x, y: posRef.current.y });

        // Wander interval — update ref, drive GSAP
        const interval = setInterval(() => {
            const w = typeof window !== "undefined" ? window.innerWidth : 1000;
            const h = typeof window !== "undefined" ? window.innerHeight : 800;
            posRef.current.x = Math.max(50, Math.min(w - 50, posRef.current.x + (Math.random() * 60 - 30)));
            posRef.current.y = Math.max(50, Math.min(h - 50, posRef.current.y + (Math.random() * 60 - 30)));
            xTo(posRef.current.x);
            yTo(posRef.current.y);
        }, 2500 + id * 400);

        // Scatter from mouse — throttled check every 200ms
        const scatterInterval = setInterval(() => {
            const dx = mouseRef.x - posRef.current.x;
            const dy = mouseRef.y - posRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 0) {
                const scatterX = posRef.current.x - (dx / dist) * 250;
                const scatterY = posRef.current.y - (dy / dist) * 250;
                xTo(scatterX);
                yTo(scatterY);
            }
        }, 200);

        return () => {
            clearInterval(interval);
            clearInterval(scatterInterval);
        };
    }, [id]);

    // Stable blink duration per butterfly
    const blinkDuration = useMemo(() => 0.18 + id * 0.04, [id]);

    return (
        <div
            ref={containerRef}
            className="fixed pointer-events-none z-[8] w-6 h-6"
            style={{ willChange: "transform" }}
        >
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                <motion.g animate={{ scaleX: [1, 0.15, 1] }} transition={{ duration: blinkDuration, repeat: Infinity, ease: "easeInOut" }}>
                    <path d="M12 12C12 12 4 4 2 10C0 16 8 18 12 12Z" fill={color} fillOpacity="0.8" />
                    <path d="M12 12C12 12 20 4 22 10C24 16 16 18 12 12Z" fill={color} fillOpacity="0.8" />
                    <path d="M12 12C12 12 6 20 8 22C10 24 14 18 12 12Z" fill="#14532d" fillOpacity="0.6" />
                    <path d="M12 12C12 12 18 20 16 22C14 24 10 18 12 12Z" fill="#14532d" fillOpacity="0.6" />
                </motion.g>
                <path d="M11 8C11 8 11 14 12 14C13 14 13 8 13 8Z" fill="#D4AF37" />
            </svg>
        </div>
    );
};

// ─── 7–10. FLYING PARROTS (triggered by scroll) ───
const FlyingParrot = ({ startY, color, direction }: { startY: number; color: string; direction: "ltr" | "rtl" }) => {
    const fromX = direction === "ltr" ? "-15vw" : "115vw";
    const toX = direction === "ltr" ? "115vw" : "-15vw";

    return (
        <motion.div
            className="fixed pointer-events-none z-[12] w-14 h-14 md:w-20 md:h-20"
            style={{ top: `${startY}%`, left: fromX, filter: `drop-shadow(0 0 12px ${color})` }}
            initial={{ x: 0, opacity: 0, scale: 0.4 }}
            animate={{ x: toX, y: [0, -80, 40, -60, 20, 0], opacity: [0, 1, 1, 1, 1, 0], scale: [0.4, 1, 1.1, 1, 0.9, 0.6] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, ease: "linear" }}
        >
            <svg viewBox="0 0 100 80" fill="none" className="w-full h-full">
                <motion.g animate={{ scaleY: [1, -0.4, 1] }} transition={{ duration: 0.2, repeat: Infinity }}>
                    <path d="M35 40 Q50 20 65 40 Q50 60 35 40 Z" fill={color} />
                    <path d={direction === "ltr" ? "M60 32 Q78 22 88 38 Q82 52 68 44 Z" : "M40 32 Q22 22 12 38 Q18 52 32 44 Z"} fill="#F5D061" />
                    <circle cx={direction === "ltr" ? 73 : 27} cy="35" r="2.5" fill="#020804" />
                    <path d={direction === "ltr" ? "M35 40 L5 52 L15 30 Z" : "M65 40 L95 52 L85 30 Z"} fill={color} opacity="0.7" />
                    <path d={direction === "ltr" ? "M30 42 L0 42 L10 28 Z" : "M70 42 L100 42 L90 28 Z"} fill="#22c55e" opacity="0.5" />
                </motion.g>
            </svg>
        </motion.div>
    );
};

// ─── 11–14. MONKEYS ON BRANCHES (jump when scrolled past) ───
const BranchMonkey = ({ yPercent, xPercent, scrollYProgress, triggerAt }: { yPercent: number; xPercent: number; scrollYProgress: any; triggerAt: number }) => {
    const jumpY = useTransform(scrollYProgress, [triggerAt - 0.05, triggerAt, triggerAt + 0.05], [0, -60, 0]);
    const jumpX = useTransform(scrollYProgress, [triggerAt - 0.05, triggerAt, triggerAt + 0.05], [0, 30, 0]);
    const rot = useTransform(scrollYProgress, [triggerAt - 0.05, triggerAt, triggerAt + 0.05], [0, -20, 0]);

    return (
        <motion.div
            className="fixed pointer-events-none z-[6]"
            style={{ top: `${yPercent}%`, left: `${xPercent}%`, y: jumpY, x: jumpX, rotate: rot }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="w-10 h-10 md:w-14 md:h-14">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_10px_rgba(139,90,43,0.5)]">
                    <path d="M50 25 C35 25 25 40 32 55 C38 68 62 68 68 55 C75 40 65 25 50 25Z" fill="#8B5A2B" />
                    <circle cx="40" cy="32" r="10" fill="#A0724A" opacity="0.7" />
                    <circle cx="60" cy="32" r="10" fill="#A0724A" opacity="0.7" />
                    <path d="M32 55 C15 62 8 48 16 35" stroke="#8B5A2B" strokeWidth="7" strokeLinecap="round" fill="none" />
                    <path d="M68 55 C85 62 92 48 84 35" stroke="#8B5A2B" strokeWidth="7" strokeLinecap="round" fill="none" />
                    <path d="M50 68 C50 88 28 95 28 82" stroke="#8B5A2B" strokeWidth="5" strokeLinecap="round" fill="none" />
                    <circle cx="43" cy="42" r="2.5" fill="#020804" />
                    <circle cx="57" cy="42" r="2.5" fill="#020804" />
                    <path d="M45 50 Q50 54 55 50" stroke="#020804" strokeWidth="1.5" fill="none" />
                </svg>
            </div>
        </motion.div>
    );
};

// ─── 19–21. TOUCANS (perched, head tilts on scroll) ───
const Toucan = ({ yPercent, xPercent, scrollYProgress, triggerAt }: { yPercent: number; xPercent: number; scrollYProgress: any; triggerAt: number }) => {
    const headTilt = useTransform(scrollYProgress, [triggerAt - 0.1, triggerAt, triggerAt + 0.1], [0, 15, 0]);

    return (
        <motion.div
            className="fixed pointer-events-none z-[6]"
            style={{ top: `${yPercent}%`, left: `${xPercent}%` }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="w-10 h-12 md:w-14 md:h-16">
                <svg viewBox="0 0 80 100" fill="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(245,208,97,0.3)]">
                    <path d="M40 35 C30 35 22 50 28 65 C32 75 48 75 52 65 C58 50 50 35 40 35Z" fill="#0f0f0f" />
                    <motion.g style={{ rotate: headTilt, transformOrigin: "40px 35px" }}>
                        <circle cx="40" cy="30" r="12" fill="#1a1a1a" />
                        <path d="M48 28 C60 20 72 25 70 32 C68 38 55 36 48 32Z" fill="#F5D061" />
                        <path d="M55 26 C60 22 68 25 66 30" fill="#ef4444" opacity="0.8" />
                        <circle cx="44" cy="27" r="2" fill="white" />
                        <circle cx="44" cy="27" r="1" fill="#020804" />
                    </motion.g>
                    <path d="M32 65 L30 80" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                    <path d="M48 65 L50 80" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </div>
        </motion.div>
    );
};

// ─── 22–24. TREE FROGS (sit on leaves, blink) ───
// Fixed: Math.random() moved to useMemo to prevent hydration mismatch
const TreeFrog = ({ yPercent, xPercent, blinkDelay }: { yPercent: number; xPercent: number; blinkDelay: number }) => {
    return (
        <motion.div
            className="fixed pointer-events-none z-[6]"
            style={{ top: `${yPercent}%`, left: `${xPercent}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.5, ease: "backOut" }}
        >
            <div className="w-6 h-6 md:w-8 md:h-8">
                <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                    <ellipse cx="30" cy="35" rx="18" ry="14" fill="#22c55e" />
                    <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 0.15, repeat: Infinity, repeatDelay: blinkDelay }}>
                        <circle cx="22" cy="22" r="6" fill="#4ade80" />
                        <circle cx="38" cy="22" r="6" fill="#4ade80" />
                        <circle cx="22" cy="22" r="3" fill="#020804" />
                        <circle cx="38" cy="22" r="3" fill="#020804" />
                    </motion.g>
                    <path d="M12 42 L5 50" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 44 L8 52" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                    <path d="M48 42 L55 50" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                    <path d="M46 44 L52 52" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        </motion.div>
    );
};

// ─── 25. SNAKE (coiled on a branch, tongue flicks) ───
const Snake = ({ yPercent, xPercent }: { yPercent: number; xPercent: number }) => {
    return (
        <motion.div
            className="fixed pointer-events-none z-[6]"
            style={{ top: `${yPercent}%`, left: `${xPercent}%` }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="w-14 h-8 md:w-20 md:h-12">
                <svg viewBox="0 0 120 50" fill="none" className="w-full h-full drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]">
                    <path d="M10 30 C20 10 40 10 50 25 C60 40 80 40 90 25 C95 18 100 20 105 22" stroke="#14532d" strokeWidth="7" strokeLinecap="round" fill="none" />
                    <circle cx="108" cy="20" r="5" fill="#14532d" />
                    <circle cx="106" cy="18" r="1.5" fill="#F5D061" />
                    <motion.g animate={{ scaleX: [0, 1, 0] }} transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3.5 }}>
                        <path d="M113 20 L120 17 M113 20 L120 23" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.g>
                </svg>
            </div>
        </motion.div>
    );
};

// ═══════════════════════════════════════════════════════════════
// MAIN ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════
export default function InteractiveAnimals() {
    const [isMounted, setIsMounted] = useState(false);
    const { scrollYProgress } = useScroll();

    // Parrot spawn state
    const [parrots, setParrots] = useState<{ key: number; startY: number; color: string; direction: "ltr" | "rtl" }[]>([]);
    const parrotIdRef = useMemo(() => ({ current: 0 }), []);

    // Stable blink delays for tree frogs (prevents hydration mismatch)
    const frogBlinkDelays = useMemo(() => [4.5, 5.2, 6.0], []);

    useEffect(() => {
        setIsMounted(true);

        // Single global mouse listener — updates shared ref, zero re-renders
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.x = e.clientX;
            mouseRef.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Spawn parrots at scroll thresholds
    const spawnedThresholds = useMemo(() => new Set<number>(), []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const thresholds = [0.12, 0.30, 0.55, 0.78];
        const colors = ["#ef4444", "#F5D061", "#3b82f6", "#22c55e"];
        const directions: ("ltr" | "rtl")[] = ["ltr", "rtl", "ltr", "rtl"];

        thresholds.forEach((t, i) => {
            if (latest > t && latest < t + 0.025 && !spawnedThresholds.has(i)) {
                spawnedThresholds.add(i);
                const id = parrotIdRef.current++;
                const newParrot = {
                    key: id,
                    startY: 15 + Math.random() * 50,
                    color: colors[i],
                    direction: directions[i],
                };
                setParrots(prev => [...prev, newParrot]);
                setTimeout(() => {
                    setParrots(cur => cur.filter(p => p.key !== id));
                    spawnedThresholds.delete(i);
                }, 7000);
            }
        });
    });

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[5]">
            {/* 1. Panther — permanent */}
            <Panther />

            {/* 2–6. Butterflies × 5 — permanent */}
            {[0, 1, 2, 3, 4].map(i => (
                <Butterfly key={`bf-${i}`} id={i} />
            ))}

            {/* 7–10. Parrots × 4 — scroll-triggered fly-bys */}
            <AnimatePresence>
                {parrots.map(p => (
                    <FlyingParrot key={p.key} startY={p.startY} color={p.color} direction={p.direction} />
                ))}
            </AnimatePresence>

            {/* 11–14. Monkeys × 4 — sitting on branches, jump when scrolled past */}
            <BranchMonkey yPercent={18} xPercent={8} scrollYProgress={scrollYProgress} triggerAt={0.15} />
            <BranchMonkey yPercent={38} xPercent={12} scrollYProgress={scrollYProgress} triggerAt={0.35} />
            <BranchMonkey yPercent={58} xPercent={6} scrollYProgress={scrollYProgress} triggerAt={0.55} />
            <BranchMonkey yPercent={78} xPercent={10} scrollYProgress={scrollYProgress} triggerAt={0.75} />

            {/* 19–21. Toucans × 3 — perched, head tilts */}
            <Toucan yPercent={25} xPercent={18} scrollYProgress={scrollYProgress} triggerAt={0.22} />
            <Toucan yPercent={50} xPercent={15} scrollYProgress={scrollYProgress} triggerAt={0.48} />
            <Toucan yPercent={72} xPercent={20} scrollYProgress={scrollYProgress} triggerAt={0.70} />

            {/* 22–24. Tree Frogs × 3 — sitting, blinking (stable delays) */}
            <TreeFrog yPercent={30} xPercent={22} blinkDelay={frogBlinkDelays[0]} />
            <TreeFrog yPercent={55} xPercent={5} blinkDelay={frogBlinkDelays[1]} />
            <TreeFrog yPercent={82} xPercent={18} blinkDelay={frogBlinkDelays[2]} />

            {/* 25. Snake — coiled, tongue flick */}
            <Snake yPercent={45} xPercent={3} />
        </div>
    );
}
