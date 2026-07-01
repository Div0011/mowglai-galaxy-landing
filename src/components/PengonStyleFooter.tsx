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
            { x: 30, y: 40, speedX: 0.25, speedY: 0.05, flapSpeed: 0.12, tickOffset: 0 },
            { x: 100, y: 55, speedX: 0.2, speedY: -0.04, flapSpeed: 0.1, tickOffset: 15 },
            { x: 260, y: 35, speedX: 0.28, speedY: 0.02, flapSpeed: 0.15, tickOffset: 30 }
        ];

        let tick = 0;
        let animationFrameId: number;

        const render = () => {
            tick++;
            ctx.clearRect(0, 0, width, height);

            // 1. Draw Dusk Sunset Sky Gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
            skyGrad.addColorStop(0, "#080f09"); // Deep space green-black
            skyGrad.addColorStop(0.35, "#0e1d10"); // Forest night green
            skyGrad.addColorStop(0.65, "#253b1b"); // Mid-tone twilight green
            skyGrad.addColorStop(0.9, "#635022"); // Gold twilight horizon
            skyGrad.addColorStop(1, "#c5a059"); // Radiant golden horizon
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, width, height);

            // 2. Draw Pixelated Sun Rays (Logo Sun will overlay in DOM)
            const sunX = width / 2;
            const sunY = height * 0.28;
            const pulse = Math.sin(tick * 0.05) * 2.5;
            
            ctx.strokeStyle = "rgba(230, 185, 61, 0.09)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sunX, sunY, 32 + pulse, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = "rgba(230, 185, 61, 0.05)";
            ctx.beginPath();
            ctx.arc(sunX, sunY, 48 - pulse, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = "rgba(230, 185, 61, 0.02)";
            ctx.beginPath();
            ctx.arc(sunX, sunY, 68 + pulse * 0.5, 0, Math.PI * 2);
            ctx.stroke();

            // 3. Draw MOWGLAI cloud text
            // Center calculation: 7 letters * 10 (size 2 * 5) + 6 gaps * 4 = 70 + 24 = 94 width
            const wordX = Math.round(width / 2 - 47);
            const wordY = Math.round(height * 0.44 + Math.sin(tick * 0.03) * 1.5);
            drawWord(ctx, "MOWGLAI", wordX, wordY, 2, 4);

            // 4. Draw Animated Pixelated Birds
            birds.forEach((b) => {
                b.x += b.speedX;
                b.y += b.speedY;

                // Wrap-around screen bounds
                if (b.x > width + 10) {
                    b.x = -10;
                    b.y = 30 + Math.random() * 40;
                }

                ctx.fillStyle = "rgba(255,255,255,0.45)";
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

            // 5. Layered Parallax Canopy / Mountains
            // Far Mountain Layer
            ctx.fillStyle = "#0d1a0e";
            for (let x = 0; x < width; x += 3) {
                const my = Math.round(height - 40 + Math.sin(x * 0.04) * 8 + Math.cos(x * 0.08) * 3);
                ctx.fillRect(x, my, 3, height - my);
            }

            // Near Silhouette Canopy Layer
            ctx.fillStyle = "#060c07";
            for (let x = 0; x < width; x += 4) {
                const cy = Math.round(height - 24 + Math.sin(x * 0.07) * 5 + Math.cos(x * 0.15) * 2);
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
            className="relative w-full h-screen min-h-[750px] md:min-h-[850px] overflow-hidden text-white/85 flex flex-col justify-between"
            style={{ backgroundColor: "#060c07" }}
        >
            {/* HTML5 Low-res Pixel Art Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                style={{ imageRendering: "pixelated" }}
            />

            {/* Overlaid Mowglai Logo Sun (Position matching sunX and sunY in canvas) */}
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
                <div className="relative group cursor-pointer">
                    {/* Golden Sun Aura */}
                    <div className="absolute inset-[-15px] bg-primary/20 rounded-full blur-[25px] pointer-events-none animate-pulse group-hover:bg-primary/30 group-hover:blur-[35px] transition-all duration-700" />
                    <MowglaiLogo size="lg" className="border-primary/40 bg-black/30 shadow-[0_0_40px_rgba(230,185,61,0.25)] group-hover:scale-105 duration-500" />
                </div>
            </div>

            {/* Flat Grid Overlay for futuristic mesh depth */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(230,185,61,0.05) 1px, transparent 1px), linear-gradient(to_right, rgba(230,185,61,0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Spotlight Glow following Mouse */}
            <div
                className="absolute pointer-events-none z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    width: 350,
                    height: 350,
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(230,185,61,0.05) 0%, transparent 70%)",
                    borderRadius: "50%",
                }}
            />

            {/* Push content down to create sunset/sky clearance at the top */}
            <div className="h-1/3 w-full relative z-10 pointer-events-none" />

            {/* Glassmorphic Panel at Bottom containing Links & Copyright */}
            <div className="relative z-20 w-full mt-auto bg-black/45 backdrop-blur-md border-t border-white/5 py-12 md:py-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left mb-10">
                        {/* Column 1: Identity */}
                        <div className="md:col-span-5 space-y-5">
                            <Link href="/" className="inline-flex items-center gap-3 group">
                                <MowglaiLogo size="sm" />
                                <span className="font-display font-black text-xl tracking-wide text-primary">
                                    MOWGLAI
                                </span>
                            </Link>
                            <p className="text-sm text-white/40 leading-relaxed max-w-xs font-light">
                                Crafting digital ecosystems that transcend boundaries. Global standards, local heart.
                            </p>
                            <div className="flex items-center gap-3 pt-1">
                                {socialLinks.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <s.icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="md:col-span-3 space-y-4">
                            <p className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-primary/70">
                                Navigate
                            </p>
                            <ul className="space-y-2.5">
                                {navLinks.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white/40 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group w-fit font-display uppercase tracking-wide"
                                        >
                                            <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 overflow-hidden" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contacts & Enquire */}
                        <div className="md:col-span-4 space-y-4">
                            <p className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-primary/70">
                                Contact
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="mailto:info@mowglai.com"
                                    className="flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors group w-fit"
                                >
                                    <Mail size={13} className="shrink-0" />
                                    <span>info@mowglai.com</span>
                                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all" />
                                </a>
                                <p className="text-sm text-white/30">Noida, Uttar Pradesh — India</p>
                            </div>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-full border border-primary/30 text-primary text-xs font-display font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all duration-300"
                            >
                                Start a Project
                                <ArrowUpRight size={13} />
                            </Link>
                        </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mb-6" />

                    {/* Bottom row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/25 font-display tracking-wider uppercase">
                        <span>© {new Date().getFullYear()} Mowglai. All rights reserved.</span>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                            <Link href="/referral" className="hover:text-primary transition-colors">Refer & Earn</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
