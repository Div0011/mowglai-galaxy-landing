"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import MowglaiLogo from "@/components/MowglaiLogo";
import XLogo from "@/components/icons/XLogo";

// Grid coordinates for 5x5 pixel-art letters
const pixelLetters: Record<string, number[][]> = {
    M: [
        [0,0], [0,1], [0,2], [0,3], [0,4],
        [1,1], [2,2], [3,1],
        [4,0], [4,1], [4,2], [4,3], [4,4]
    ],
    O: [
        [1,0], [2,0], [3,0],
        [0,1], [4,1],
        [0,2], [4,2],
        [0,3], [4,3],
        [1,4], [2,4], [3,4]
    ],
    W: [
        [0,0], [0,1], [0,2], [0,3], [0,4],
        [1,3], [2,2], [3,3],
        [4,0], [4,1], [4,2], [4,3], [4,4]
    ],
    G: [
        [1,0], [2,0], [3,0], [4,0],
        [0,1],
        [0,2], [2,2], [3,2], [4,2],
        [0,3], [4,3],
        [1,4], [2,4], [3,4]
    ],
    L: [
        [0,0], [0,1], [0,2], [0,3], [0,4],
        [1,4], [2,4], [3,4], [4,4]
    ],
    A: [
        [1,0], [2,0], [3,0],
        [0,1], [4,1],
        [0,2], [1,2], [2,2], [3,2], [4,2],
        [0,3], [4,3],
        [0,4], [4,4]
    ],
    I: [
        [0,0], [1,0], [2,0], [3,0], [4,0],
        [2,1], [2,2], [2,3],
        [0,4], [1,4], [2,4], [3,4], [4,4]
    ]
};

const drawLetter = (ctx: CanvasRenderingContext2D, char: string, startX: number, startY: number, size: number) => {
    const coords = pixelLetters[char];
    if (!coords) return;
    coords.forEach(([px, py]) => {
        // Main dot
        ctx.fillRect(startX + px * size, startY + py * size, size, size);
        
        // Soft cloud shadow/glow
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(startX + px * size - 1, startY + py * size, size + 2, size);
        ctx.fillRect(startX + px * size, startY + py * size - 1, size, size + 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    });
};

const drawWord = (ctx: CanvasRenderingContext2D, word: string, startX: number, startY: number, size: number, spacing: number) => {
    let currentX = startX;
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    for (let i = 0; i < word.length; i++) {
        drawLetter(ctx, word[i], currentX, startY, size);
        currentX += 5 * size + spacing;
    }
};

export default function PengonStyleFooter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Canvas Pixel Art Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Logical internal low resolution
        const width = 320;
        const height = 180;
        canvas.width = width;
        canvas.height = height;

        // Setup animated birds
        const birds = [
            { x: 42, y: 44, speedX: 0.14, speedY: 0.03, flapSpeed: 0.11, tickOffset: 0 },
            { x: 118, y: 54, speedX: 0.11, speedY: -0.02, flapSpeed: 0.09, tickOffset: 14 },
            { x: 248, y: 38, speedX: 0.16, speedY: 0.01, flapSpeed: 0.13, tickOffset: 28 }
        ];

        let tick = 0;
        let animationFrameId: number;

        const render = () => {
            tick++;
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Pale Editorial Sky Gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
            skyGrad.addColorStop(0, "#f7f5ee");
            skyGrad.addColorStop(0.55, "#f1ede4");
            skyGrad.addColorStop(1, "#e7e0d6");
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, height);

            // 2. Draw a smaller horizon sun and subtle rings
            const sunX = width * 0.80;
            const sunY = height * 0.29;
            const pulse = Math.sin(tick * 0.04) * 1.2;
            
            ctx.strokeStyle = "rgba(103, 92, 79, 0.12)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sunX, sunY, 20 + pulse, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = "rgba(103, 92, 79, 0.08)";
            ctx.beginPath();
            ctx.arc(sunX, sunY, 28 - pulse, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = "rgba(103, 92, 79, 0.04)";
            ctx.beginPath();
            ctx.arc(sunX, sunY, 38 + pulse * 0.5, 0, Math.PI * 2);
            ctx.stroke();

            // 3. Draw a much smaller wordmark cloud
            const wordX = Math.round(width * 0.42);
            const wordY = Math.round(height * 0.36 + Math.sin(tick * 0.03) * 0.8);
            drawWord(ctx, "MOWGLAI", wordX, wordY, 1, 2);

            const stars = [
                [48, 20, 0.55],
                [92, 32, 0.35],
                [206, 24, 0.45],
                [274, 18, 0.4],
                [296, 40, 0.3],
            ];
            stars.forEach(([x, y, alpha]) => {
                ctx.fillStyle = `rgba(103, 92, 79, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, 0.8, 0, Math.PI * 2);
                ctx.fill();
            });

            // 4. Draw tiny birds
            birds.forEach((b) => {
                b.x += b.speedX;
                b.y += b.speedY;

                // Wrap-around screen bounds
                if (b.x > width + 10) {
                    b.x = -10;
                    b.y = 30 + Math.random() * 40;
                }

                ctx.fillStyle = "rgba(103, 92, 79, 0.42)";
                const isWingUp = Math.floor((tick + b.tickOffset) * b.flapSpeed) % 2 === 0;

                // Frame-based wing drawings
                const bx = Math.round(b.x);
                const by = Math.round(b.y);
                ctx.fillRect(bx, by, 1, 1); // Center body pixel
                if (isWingUp) {
                    ctx.fillRect(bx - 2, by - 1, 1, 1);
                    ctx.fillRect(bx - 1, by, 1, 1);
                    ctx.fillRect(bx + 1, by, 1, 1);
                    ctx.fillRect(bx + 2, by - 1, 1, 1);
                } else {
                    ctx.fillRect(bx - 2, by + 1, 1, 1);
                    ctx.fillRect(bx - 1, by, 1, 1);
                    ctx.fillRect(bx + 1, by, 1, 1);
                    ctx.fillRect(bx + 2, by + 1, 1, 1);
                }
            });

            // 5. Soft layered dunes / hills
            ctx.fillStyle = "rgba(103, 92, 79, 0.08)";
            for (let x = 0; x < width; x += 3) {
                const my = Math.round(height - 44 + Math.sin(x * 0.04) * 7 + Math.cos(x * 0.08) * 2);
                ctx.fillRect(x, my, 3, height - my);
            }

            ctx.fillStyle = "rgba(103, 92, 79, 0.14)";
            for (let x = 0; x < width; x += 4) {
                const cy = Math.round(height - 26 + Math.sin(x * 0.07) * 4 + Math.cos(x * 0.15) * 1.5);
                ctx.fillRect(x, cy, 4, height - cy);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const navLinks = [
        { label: "Start", href: "/" },
        { label: "Story", href: "/about" },
        { label: "Craft", href: "/services" },
        { label: "Blueprint", href: "/explore" },
        { label: "Investment", href: "/investment" },
        { label: "Hello", href: "/contact" },
    ];

    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
        { icon: XLogo, href: "https://x.com/mowglai_in", label: "X" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
    ];

    return (
        <footer
            ref={containerRef}
            id="footer"
            className="relative w-full h-screen min-h-[750px] md:min-h-[850px] overflow-hidden text-[#61584e] flex flex-col justify-between"
            style={{
                background: "linear-gradient(180deg, #f7f5ee 0%, #f1ede4 54%, #e8e1d6 100%)",
            }}
        >
            {/* HTML5 Low-res Pixel Art Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
                style={{ imageRendering: "pixelated" }}
            />

            {/* Overlaid Mowglai Logo Sun (Position matching sunX and sunY in canvas) */}
            <div className="absolute top-[29%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
                <div className="relative group cursor-pointer">
                    {/* Small sun aura */}
                    <div className="absolute inset-[-8px] bg-[#8b7a63]/10 rounded-full blur-[12px] pointer-events-none animate-pulse group-hover:bg-[#8b7a63]/15 group-hover:blur-[16px] transition-all duration-700" />
                    <MowglaiLogo size="sm" className="border-[#8b7a63]/20 bg-white/45 shadow-[0_0_18px_rgba(139,122,99,0.10)] group-hover:scale-105 duration-500" />
                </div>
            </div>

            {/* Flat Grid Overlay for futuristic mesh depth */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(103,92,79,0.06) 1px, transparent 1px), linear-gradient(to_right, rgba(103,92,79,0.06) 1px, transparent 1px)",
                    backgroundSize: "52px 52px",
                }}
            />

            {/* Spotlight Glow following Mouse */}
            <div
                className="absolute pointer-events-none z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    width: 240,
                    height: 240,
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(139,122,99,0.06) 0%, transparent 70%)",
                    borderRadius: "50%",
                }}
            />

            {/* Push content down to create sunset/sky clearance at the top */}
            <div className="h-1/3 w-full relative z-10 pointer-events-none" />

            {/* Glassmorphic Panel at Bottom containing Links & Copyright */}
            <div className="relative z-20 w-full mt-auto bg-white/25 backdrop-blur-md border-t border-[#8b7a63]/10 py-10 md:py-12">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 text-left mb-8">
                        {/* Column 1: Identity */}
                        <div className="md:col-span-5 space-y-5">
                            <Link href="/" className="inline-flex items-center gap-3 group">
                                <MowglaiLogo size="sm" className="bg-white/55 border-[#8b7a63]/15" />
                                <span className="font-display font-black text-[17px] tracking-[0.24em] text-[#2d2a26]">
                                    MOWGLAI
                                </span>
                            </Link>
                            <p className="text-[12px] text-[#6e655c] leading-relaxed max-w-xs font-light tracking-wide">
                                Crafting digital ecosystems with a quiet, minimal edge.
                            </p>
                            <div className="flex items-center gap-3 pt-1">
                                {socialLinks.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="w-8 h-8 rounded-full border border-[#8b7a63]/10 flex items-center justify-center text-[#756a5f] hover:border-[#8b7a63]/30 hover:text-[#2d2a26] hover:bg-white/40 transition-all duration-300"
                                    >
                                        <s.icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="md:col-span-3 space-y-4">
                            <p className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-[#7c6d5b]">
                                Navigate
                            </p>
                            <ul className="space-y-2.5">
                                {navLinks.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-[12px] text-[#6e655c] hover:text-[#2d2a26] transition-colors duration-200 flex items-center gap-1.5 group w-fit font-display uppercase tracking-[0.18em]"
                                        >
                                            <span className="w-0 group-hover:w-3 h-px bg-[#8b7a63] transition-all duration-300 overflow-hidden" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contacts & Enquire */}
                        <div className="md:col-span-4 space-y-4">
                            <p className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-[#7c6d5b]">
                                Contact
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="mailto:info@mowglai.com"
                                    className="flex items-center gap-2 text-[12px] text-[#6e655c] hover:text-[#2d2a26] transition-colors group w-fit"
                                >
                                    <Mail size={13} className="shrink-0" />
                                    <span>info@mowglai.com</span>
                                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all" />
                                </a>
                                <p className="text-[12px] text-[#80766a]">Noida, Uttar Pradesh — India</p>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full border border-[#8b7a63]/20 text-[#2d2a26] text-[11px] font-display font-bold uppercase tracking-[0.22em] hover:bg-white/55 transition-all duration-300"
                            >
                                Start a Project
                                <ArrowUpRight size={13} />
                            </Link>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-[#8b7a63]/10 to-transparent mb-5" />

                    {/* Bottom row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#7b7166] font-display tracking-[0.28em] uppercase">
                        <span>© {new Date().getFullYear()} Mowglai. All rights reserved.</span>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-[#2d2a26] transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-[#2d2a26] transition-colors">Terms</Link>
                            <Link href="/referral" className="hover:text-[#2d2a26] transition-colors">Refer & Earn</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
