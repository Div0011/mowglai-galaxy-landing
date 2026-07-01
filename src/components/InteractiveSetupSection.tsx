"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowRight, Users, Rocket, Zap } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";
import NextPageButton from "@/components/NextPageButton";

const steps = [
    {
        id: "01",
        title: "Refer or Describe",
        description: "Share your network or describe your project vision. Earn 10% commission on every referral.",
        icon: Users,
    },
    {
        id: "02",
        title: "We Engineer",
        description: "Our team designs, develops, and launches your digital product with precision and care.",
        icon: Zap,
    },
    {
        id: "03",
        title: "Launch & Scale",
        description: "Go live with a high-performance system and scale to global audiences.",
        icon: Rocket,
    },
];

function pseudo(seed: number): number {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
}

// ── Step 1 Pixelated Radar Canvas ────────────────────────────────────────────
const Step1Visual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const BLOCK = 4;
        let W = 0, H = 0;

        const resize = () => {
            W = container.offsetWidth || 360;
            H = container.offsetHeight || 220;
            canvas.width = W;
            canvas.height = H;
        };
        resize();

        let tick = 0;
        let frameId: number;

        const isDark = resolvedTheme === "dark";
        const goldColor = isDark ? "rgba(230, 185, 61, 0.7)" : "rgba(212, 175, 55, 0.85)";
        const greenColor = isDark ? "rgba(16, 185, 129, 0.7)" : "rgba(71, 98, 42, 0.85)";
        const gridColor = isDark ? "rgba(230, 185, 61, 0.08)" : "rgba(71, 98, 42, 0.12)";

        const drawScene = () => {
            tick++;
            ctx.clearRect(0, 0, W, H);

            const cols = Math.ceil(W / BLOCK);
            const rows = Math.ceil(H / BLOCK);
            const cx = Math.round(cols / 2);
            const cy = Math.round(rows / 2);

            // 1. Concentric Radar Rings (Dotted Grid)
            ctx.fillStyle = gridColor;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const dx = c - cx;
                    const dy = r - cy;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (Math.abs(d - 10) < 0.4 || Math.abs(d - 22) < 0.4 || Math.abs(d - 34) < 0.4) {
                        if ((c + r) % 2 === 0) {
                            ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                        }
                    }
                    if (c === cx || r === cy) {
                        if ((c + r) % 4 === 0) {
                            ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                        }
                    }
                }
            }

            // 2. Sweeping Radar Line
            const angle = tick * 0.02;
            const sweepLen = Math.round(cols * 0.45);
            ctx.fillStyle = isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(71, 98, 42, 0.22)";
            for (let step = 0; step < sweepLen; step++) {
                const sc = Math.round(cx + Math.cos(angle) * step);
                const sr = Math.round(cy + Math.sin(angle) * step);
                if (sc >= 0 && sc < cols && sr >= 0 && sr < rows) {
                    ctx.fillRect(sc * BLOCK, sr * BLOCK, BLOCK, BLOCK);
                }
            }

            // 3. Central Core Node
            const isPulse = Math.floor(tick * 0.1) % 2 === 0;
            ctx.fillStyle = goldColor;
            ctx.fillRect(cx * BLOCK, cy * BLOCK, BLOCK, BLOCK);
            if (isPulse) {
                ctx.fillStyle = isDark ? "rgba(230, 185, 61, 0.3)" : "rgba(212, 175, 55, 0.4)";
                ctx.fillRect((cx - 1) * BLOCK, cy * BLOCK, BLOCK, BLOCK);
                ctx.fillRect((cx + 1) * BLOCK, cy * BLOCK, BLOCK, BLOCK);
                ctx.fillRect(cx * BLOCK, (cy - 1) * BLOCK, BLOCK, BLOCK);
                ctx.fillRect(cx * BLOCK, (cy + 1) * BLOCK, BLOCK, BLOCK);
            }

            // 4. Connection Lines & Outer Nodes
            const nodes = [
                { dc: -14, dr: -9, color: goldColor, active: Math.sin(tick * 0.05 + 1) > 0 },
                { dc: 18, dr: -5, color: greenColor, active: Math.sin(tick * 0.05 + 2) > 0 },
                { dc: -10, dr: 14, color: greenColor, active: Math.sin(tick * 0.05 + 3) > 0 },
                { dc: 15, dr: 11, color: goldColor, active: Math.sin(tick * 0.05 + 4) > 0 },
            ];

            nodes.forEach((n) => {
                const nc = cx + n.dc;
                const nr = cy + n.dr;
                
                ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.12)";
                const stepsCount = Math.max(Math.abs(n.dc), Math.abs(n.dr));
                for (let s = 0; s <= stepsCount; s += 2) {
                    const lc = Math.round(cx + (n.dc * s) / stepsCount);
                    const lr = Math.round(cy + (n.dr * s) / stepsCount);
                    if (lc >= 0 && lc < cols && lr >= 0 && lr < rows) {
                        ctx.fillRect(lc * BLOCK, lr * BLOCK, BLOCK, BLOCK);
                    }
                }

                ctx.fillStyle = n.active ? n.color : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)");
                ctx.fillRect(nc * BLOCK, nr * BLOCK, BLOCK, BLOCK);
            });

            frameId = requestAnimationFrame(drawScene);
        };

        drawScene();

        const handleResize = () => { resize(); };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
        };
    }, [mounted, resolvedTheme]);

    return (
        <div ref={containerRef} className="relative w-full aspect-[16/10] max-h-[280px] flex items-center justify-center bg-[#040905]/40 border border-white/5 rounded-2xl overflow-hidden group p-4 backdrop-blur-md">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ imageRendering: "pixelated" }} />
            <div className="absolute top-4 left-4 bg-black/60 border border-white/5 rounded-lg px-2.5 py-1.5 font-mono text-[8px] space-y-1 backdrop-blur-md z-10">
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-white/60">SCANNER: ACTIVE</span>
                </div>
                <div className="text-primary">KEYWORDS AUDITED: 1,420</div>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 border border-white/5 rounded-lg px-2.5 py-1.5 font-mono text-[8px] space-y-1 backdrop-blur-md z-10">
                <div className="text-emerald-400">SEMANTIC SCORE: 98.4%</div>
            </div>
        </div>
    );
};

// ── Step 2 Pixelated Workspace Monitor Canvas ────────────────────────────────
const Step2Visual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const BLOCK = 4;
        let W = 0, H = 0;

        const resize = () => {
            W = container.offsetWidth || 360;
            H = container.offsetHeight || 220;
            canvas.width = W;
            canvas.height = H;
        };
        resize();

        let tick = 0;
        let frameId: number;

        const isDark = resolvedTheme === "dark";
        const goldColor = isDark ? "rgba(230, 185, 61, 0.7)" : "rgba(212, 175, 55, 0.85)";
        const greenColor = isDark ? "rgba(16, 185, 129, 0.7)" : "rgba(71, 98, 42, 0.85)";
        const monitorColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.15)";
        const screenColor = isDark ? "rgba(16, 185, 129, 0.03)" : "rgba(71, 98, 42, 0.04)";

        const drawScene = () => {
            tick++;
            ctx.clearRect(0, 0, W, H);

            const cols = Math.ceil(W / BLOCK);
            const rows = Math.ceil(H / BLOCK);

            // Bezel boundaries
            const bLeft = 5;
            const bRight = cols - 5;
            const bTop = 5;
            const bBottom = rows - 8;
            
            // 1. Draw Monitor Bezel
            ctx.strokeStyle = monitorColor;
            ctx.lineWidth = 2;
            ctx.strokeRect(bLeft * BLOCK, bTop * BLOCK, (bRight - bLeft) * BLOCK, (bBottom - bTop) * BLOCK);

            // Screen Fill
            ctx.fillStyle = screenColor;
            ctx.fillRect((bLeft + 2) * BLOCK, (bTop + 2) * BLOCK, (bRight - bLeft - 4) * BLOCK, (bBottom - bTop - 4) * BLOCK);

            // Screen Scanlines
            ctx.fillStyle = isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)";
            for (let r = bTop + 2; r < bBottom - 2; r++) {
                if (r % 2 === 0) {
                    ctx.fillRect((bLeft + 2) * BLOCK, r * BLOCK, (bRight - bLeft - 4) * BLOCK, BLOCK);
                }
            }

            // Monitor stand
            ctx.fillStyle = monitorColor;
            const standC = Math.round(cols / 2);
            ctx.fillRect((standC - 4) * BLOCK, bBottom * BLOCK, BLOCK * 8, BLOCK * 4);
            ctx.fillRect((standC - 8) * BLOCK, (bBottom + 4) * BLOCK, BLOCK * 16, BLOCK * 2);

            // 2. Left side: Code Lines
            const lineCount = 8;
            const scrollOffset = Math.floor(tick * 0.1) % 8;
            for (let i = 0; i < lineCount; i++) {
                const r = bTop + 4 + i * 3 - scrollOffset;
                if (r > bTop + 2 && r < bBottom - 3) {
                    const lineSeed = pseudo(Math.floor((tick * 0.1) / 8) + i * 17);
                    const lineLen = 8 + Math.floor(lineSeed * 15);
                    const isGold = lineSeed > 0.6;
                    ctx.fillStyle = isGold ? goldColor : greenColor;
                    
                    const indent = lineSeed > 0.4 ? 4 : 8;
                    ctx.fillRect((bLeft + indent) * BLOCK, Math.round(r) * BLOCK, lineLen * BLOCK, BLOCK);
                }
            }

            // 3. Right side: Spinning Wireframe Sphere
            const sc = Math.round(cols * 0.72);
            const sy = Math.round(rows * 0.42);
            const sr = 10;
            
            ctx.fillStyle = goldColor;
            ctx.fillRect(sc * BLOCK, sy * BLOCK, BLOCK, BLOCK);

            const orbitSpeed = tick * 0.04;
            const pointCount = 10;
            ctx.fillStyle = greenColor;
            for (let i = 0; i < pointCount; i++) {
                const angle1 = orbitSpeed + (i * Math.PI * 2) / pointCount;
                const pc1 = Math.round(sc + Math.cos(angle1) * sr);
                const pr1 = Math.round(sy + Math.sin(angle1) * sr * 0.3);
                if (pc1 >= bLeft + 2 && pc1 < bRight - 2 && pr1 >= bTop + 2 && pr1 < bBottom - 2) {
                    ctx.fillRect(pc1 * BLOCK, pr1 * BLOCK, BLOCK, BLOCK);
                }

                const angle2 = -orbitSpeed * 0.8 + (i * Math.PI * 2) / pointCount;
                const pc2 = Math.round(sc + Math.cos(angle2) * sr * 0.7);
                const pr2 = Math.round(sy + Math.sin(angle2) * sr * 0.7);
                if (pc2 >= bLeft + 2 && pc2 < bRight - 2 && pr2 >= bTop + 2 && pr2 < bBottom - 2) {
                    ctx.fillRect(pc2 * BLOCK, pr2 * BLOCK, BLOCK, BLOCK);
                }
            }

            frameId = requestAnimationFrame(drawScene);
        };

        drawScene();

        const handleResize = () => { resize(); };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
        };
    }, [mounted, resolvedTheme]);

    return (
        <div ref={containerRef} className="relative w-full aspect-[16/10] max-h-[280px] flex items-center justify-center bg-[#040905]/40 border border-white/5 rounded-2xl overflow-hidden group p-4 backdrop-blur-md">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ imageRendering: "pixelated" }} />
            <div className="absolute bottom-2 flex justify-between w-[90%] px-4 font-mono text-[7px] z-10 text-white/50">
                <span className="text-emerald-400">LCP: 0.8s</span>
                <span className="text-[#E6B93D]">FID: 9ms</span>
            </div>
        </div>
    );
};

// ── Step 3 Pixelated Rocket Launch Canvas ─────────────────────────────────────
const Step3Visual = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const BLOCK = 4;
        let W = 0, H = 0;

        const resize = () => {
            W = container.offsetWidth || 360;
            H = container.offsetHeight || 220;
            canvas.width = W;
            canvas.height = H;
        };
        resize();

        let tick = 0;
        let frameId: number;

        const isDark = resolvedTheme === "dark";
        const pixelColor = isDark ? "rgba(230, 185, 61, 0.22)" : "rgba(71, 98, 42, 0.35)";
        const rocketColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(71, 98, 42, 0.85)";
        const flameColor = isDark ? "rgba(230, 185, 61, 0.7)" : "rgba(212, 175, 55, 0.85)";

        // Fixed stars populated safely for a large grid
        const maxCols = 500;
        const maxRows = 150;
        const stars: { col: number; row: number }[] = [];
        for (let i = 0; i < 25; i++) {
            stars.push({
                col: Math.floor(pseudo(i * 3.1) * maxCols),
                row: Math.floor(pseudo(i * 9.7) * Math.floor(maxRows * 0.55)),
            });
        }

        const drawScene = () => {
            tick++;
            ctx.clearRect(0, 0, W, H);

            const cols = Math.ceil(W / BLOCK);
            const rows = Math.ceil(H / BLOCK);

            // 1. Stars (Dark mode)
            if (isDark) {
                stars.forEach((star) => {
                    if (star.col < cols && star.row < rows) {
                        const starTick = tick + star.col * 7 + star.row * 13;
                        if (Math.sin(starTick * 0.05) > 0.2) {
                            ctx.fillStyle = pixelColor;
                            ctx.fillRect(star.col * BLOCK, star.row * BLOCK, BLOCK, BLOCK);
                        }
                    }
                });
            }

            // 2. Far dithered mountain peaks
            ctx.fillStyle = pixelColor;
            for (let c = 0; c < cols; c++) {
                const my = Math.round(rows * 0.65 + Math.sin(c * 0.07 + 1.2) * 5);
                for (let r = my; r < rows; r++) {
                    if ((c + r) % 2 === 0) {
                        ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                    }
                }
            }

            // 3. Ground / Near Hills (Solid Silhouettes)
            for (let c = 0; c < cols; c++) {
                const hy = Math.round(rows * 0.82 + Math.sin(c * 0.12 + 3.4) * 2);
                for (let r = hy; r <= rows; r++) {
                    ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                }
            }

            // 4. Overlapping pine trees at bottom
            for (let c = 2; c < cols - 2; c += 8) {
                const hy = Math.round(rows * 0.82 + Math.sin(c * 0.12 + 3.4) * 2);
                const treeH = 6 + (c % 4) * 2;
                for (let th = 0; th < treeH; th++) {
                    const w = Math.floor((treeH - th) * 0.55);
                    for (let dw = -w; dw <= w; dw++) {
                        const tc = c + dw;
                        const tr = hy - treeH + th;
                        if (tc >= 0 && tc < cols && tr >= 0 && tr < rows) {
                            ctx.fillRect(tc * BLOCK, tr * BLOCK, BLOCK, BLOCK);
                        }
                    }
                }
            }

            // 5. Rocket Launching (Center of screen)
            const rx = Math.round(cols * 0.5);
            const ry = Math.round((rows * 0.82) - (tick * 0.22) % (rows * 0.9));

            if (ry > 0 && ry < rows) {
                // Draw flame exhaust (dithered trailing downwards)
                ctx.fillStyle = flameColor;
                for (let dy = 1; dy <= 8; dy++) {
                    const fr = ry + dy;
                    const w = Math.floor((8 - dy) * 0.35) + 1;
                    for (let dw = -w; dw <= w; dw++) {
                        const fc = rx + dw;
                        if ((fc + fr + tick) % 2 === 0) {
                            ctx.fillRect(fc * BLOCK, fr * BLOCK, BLOCK, BLOCK);
                        }
                    }
                }

                // Draw rocket body
                ctx.fillStyle = rocketColor;
                ctx.fillRect(rx * BLOCK, (ry - 2) * BLOCK, BLOCK, BLOCK);
                ctx.fillRect(rx * BLOCK, (ry - 1) * BLOCK, BLOCK, BLOCK);
                ctx.fillRect(rx * BLOCK, ry * BLOCK, BLOCK, BLOCK);
                ctx.fillRect((rx - 1) * BLOCK, ry * BLOCK, BLOCK, BLOCK);
                ctx.fillRect((rx + 1) * BLOCK, ry * BLOCK, BLOCK, BLOCK);
            }

            frameId = requestAnimationFrame(drawScene);
        };

        drawScene();

        const handleResize = () => { resize(); };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
        };
    }, [mounted, resolvedTheme]);

    return (
        <div ref={containerRef} className="relative w-full aspect-[16/10] max-h-[280px] flex items-center justify-center bg-[#040905]/40 border border-white/5 rounded-2xl overflow-hidden group p-4 backdrop-blur-md">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ imageRendering: "pixelated" }} />
            <div className="absolute bottom-2 flex justify-between w-[90%] px-4 font-mono text-[7px] z-10 text-white/50">
                <span>SPEED INDEX: 0.4s</span>
                <span className="text-[#E6B93D]">SEO CORE: 100</span>
            </div>
        </div>
    );
};

export default function InteractiveSetupSection() {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const intervalTime = 50; // Progress updates every 50ms
        const totalDuration = 5000; // 5 seconds per slide
        const stepIncrement = (intervalTime / totalDuration) * 100;

        timerRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveStep((curr) => (curr + 1) % steps.length);
                    return 0;
                }
                return prev + stepIncrement;
            });
        }, intervalTime);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activeStep]);

    const handleSelectStep = (index: number) => {
        setActiveStep(index);
        setProgress(0);
    };

    return (
        <section className="relative w-full pt-8 pb-2 z-20">
            {/* Inject dynamic CSS animation variables */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes dash {
                    to {
                        stroke-dashoffset: -20;
                    }
                }
                @keyframes flow-dash {
                    to {
                        stroke-dashoffset: -40;
                    }
                }
                @keyframes draw-path {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes rocket-bounce {
                    0%, 100% {
                        transform: translate(340px, 70px) rotate(45deg) scale(0.9) translateY(0);
                    }
                    50% {
                        transform: translate(340px, 70px) rotate(45deg) scale(0.9) translateY(-6px);
                    }
                }
                .animate-dash {
                    stroke-dasharray: 5, 5;
                    animation: dash 2s linear infinite;
                }
                .animate-flow-dash {
                    stroke-dasharray: 10, 10;
                    animation: flow-dash 1.5s linear infinite;
                }
                .animate-draw-path {
                    stroke-dashoffset: 400;
                    animation: draw-path 3s cubic-bezier(0.25, 1, 0.5, 1) forwards infinite;
                }
                .animate-rocket-bounce {
                    animation: rocket-bounce 2s ease-in-out infinite;
                }
            `}} />

            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 md:mb-8"
                >
                    <span className="text-primary font-display font-bold text-xs tracking-[0.4em] uppercase">
                        Process
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-foreground uppercase leading-none mt-4">
                        How It <span className="text-primary italic">Works</span>
                    </h2>
                </motion.div>

                {/* Slideshow Core Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[360px] mb-6">
                    {/* Left Column: Progress Indicators & Details */}
                    <div className="lg:col-span-5 space-y-3">
                        {steps.map((step, idx) => {
                            const isActive = activeStep === idx;
                            return (
                                <div
                                    key={step.id}
                                    onClick={() => handleSelectStep(idx)}
                                    className={`group cursor-pointer p-4 rounded-xl border transition-all duration-500 relative overflow-hidden backdrop-blur-md ${
                                        isActive
                                            ? "border-primary/40 bg-[#061208]/60 shadow-[0_4px_25px_rgba(16,185,129,0.03)]"
                                            : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                                    }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent pointer-events-none" />
                                    )}
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="relative shrink-0 flex items-center justify-center">
                                            <span className={`text-2xl font-display font-black leading-none transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground/20"}`}>
                                                {step.id}
                                            </span>
                                            {isActive && (
                                                <span className="absolute -top-1.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-base font-display font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/60"}`}>
                                                {step.title}
                                            </h3>
                                            
                                            <AnimatePresence initial={false}>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-sm text-foreground/50 leading-relaxed font-light">
                                                            {step.description}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Progress Bar */}
                                            <div className="mt-4 w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all ease-linear"
                                                    style={{
                                                        width: isActive ? `${progress}%` : "0%",
                                                        transitionDuration: isActive ? "50ms" : "0ms"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Premium Visuals with Top-to-Bottom transitions */}
                    <div className="lg:col-span-7 relative flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.98, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="w-full"
                            >
                                {activeStep === 0 && <Step1Visual />}
                                {activeStep === 1 && <Step2Visual />}
                                {activeStep === 2 && <Step3Visual />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Pricing Page Button between slideshow and Refer/Ready cards */}
            <div className="relative z-20 -mt-8 mb-4">
                <NextPageButton
                    href="/investment"
                    label="PRICING"
                    className="h-[120px] md:h-[140px]"
                />
            </div>

            <div className="container mx-auto px-6 max-w-6xl mt-10">
                {/* Subsections: Referral & Consultation (Symmetrical grid stretching) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all duration-500 flex flex-col justify-between h-full"
                    >
                        <div className="flex-1">
                            <span className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-primary/60">
                                Referral Program
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-black text-foreground uppercase tracking-tight mt-3">
                                Refer <span className="text-primary italic">&</span> Earn
                            </h3>
                            <p className="text-foreground/50 text-sm mt-4 leading-relaxed">
                                Invite your network to the tribe. Getting 10% commission has never been this elegant.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {[
                                    "Share your details and your friend's contact",
                                    "We send an exclusive invite with official branding",
                                    "Your friend gets 5% off, you get 5% cash",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/referral"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground text-sm font-display font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 rounded-full"
                            >
                                Start Referring
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all duration-500 flex flex-col justify-between h-full"
                    >
                        <div className="flex-1">
                            <span className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-primary/60">
                                Consultation
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-black text-foreground uppercase tracking-tight mt-3">
                                Ready to <span className="text-primary italic">Start?</span>
                            </h3>
                            <p className="text-foreground/50 text-sm mt-4 leading-relaxed mb-8">
                                Describe your idea and start your project with a quick consultation.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <ConsultationForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
