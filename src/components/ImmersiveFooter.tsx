"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Instagram, Linkedin } from "lucide-react";
import MowglaiLogo from "@/components/MowglaiLogo";
import XLogo from "@/components/icons/XLogo";

const navLinks = [
    { label: "Home",      href: "/" },
    { label: "About",     href: "/about" },
    { label: "Services",  href: "/services" },
    { label: "Templates", href: "/explore" },
    { label: "Pricing",   href: "/investment" },
    { label: "Contact",   href: "/contact" },
];

const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/mowglai",              label: "Instagram" },
    { icon: XLogo,     href: "https://x.com/mowglai_in",                          label: "X" },
    { icon: Linkedin,  href: "https://www.linkedin.com/company/mowglai", label: "LinkedIn" },
];

function pseudo(seed: number): number {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
}

export default function ImmersiveFooter() {
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
        let W = 0;
        let H = 0;

        const resize = () => {
            W = container.offsetWidth || window.innerWidth;
            H = container.offsetHeight || 700;
            canvas.width = W;
            canvas.height = H;
        };
        resize();

        let tick = 0;
        let frameId: number;

        // Colors
        const isDark = resolvedTheme === "dark";
        const pixelColor = isDark ? "rgba(230, 185, 61, 0.22)" : "rgba(71, 98, 42, 0.35)";

        // Generation vectors
        const cols = Math.ceil(W / BLOCK);
        const rows = Math.ceil(H / BLOCK);

        // Precompute Mountains and Stars for a large grid to handle resize safely
        const maxCols = 2000;
        const maxRows = 500;

        const farMtn: number[] = [];
        const midMtn: number[] = [];
        const nearHill: number[] = [];

        // Far peaks
        let farY = Math.round(rows * 0.40);
        for (let c = 0; c < maxCols; c++) {
            farY += Math.sin(c * 0.05) * 0.5 + (pseudo(c * 2.3) - 0.5) * 0.4;
            farMtn.push(Math.round(farY));
        }

        // Mid peaks
        let midY = Math.round(rows * 0.52);
        for (let c = 0; c < maxCols; c++) {
            midY += Math.sin(c * 0.08 + 2.0) * 0.6 + (pseudo(c * 4.7) - 0.5) * 0.6;
            midMtn.push(Math.round(midY));
        }

        // Near hills
        let nearY = Math.round(rows * 0.65);
        for (let c = 0; c < maxCols; c++) {
            nearY += Math.cos(c * 0.06 + 4.0) * 0.4 + (pseudo(c * 1.9) - 0.5) * 0.2;
            nearHill.push(Math.round(nearY));
        }

        // Sky Stars
        const starCount = 60;
        const starPositions: { c: number; r: number }[] = [];
        for (let i = 0; i < starCount; i++) {
            starPositions.push({
                c: Math.floor(pseudo(i * 3.7) * maxCols),
                r: Math.floor(pseudo(i * 7.1) * Math.floor(maxRows * 0.55)),
            });
        }

        const drawScene = () => {
            tick++;
            ctx.clearRect(0, 0, W, H);

            const cols = Math.ceil(W / BLOCK);
            const rows = Math.ceil(H / BLOCK);

            // ── Twinkling Stars (Dark Mode Only) ──────────────────────────────
            if (isDark) {
                ctx.fillStyle = pixelColor;
                starPositions.forEach((star) => {
                    if (star.c < cols && star.r < rows) {
                        const starTick = tick + star.c * 7 + star.r * 13;
                        if (Math.sin(starTick * 0.05) > 0.3) {
                            ctx.fillRect(star.c * BLOCK, star.r * BLOCK, BLOCK, BLOCK);
                        }
                    }
                });
            }

            // ── Sliced Sun/Moon (Upper Right Side) ───────────────────────────
            const sunC = Math.round(cols * 0.82);
            const sunR = Math.round(rows * 0.32);
            const sunRad = 11;

            ctx.fillStyle = pixelColor;
            for (let r = sunR - sunRad; r <= sunR + sunRad; r++) {
                for (let c = sunC - sunRad; c <= sunC + sunRad; c++) {
                    if (c >= 0 && c < cols && r >= 0 && r < rows) {
                        const dc = c - sunC;
                        const dr = r - sunR;
                        const dist = Math.sqrt(dc * dc + dr * dr);
                        if (dist <= sunRad) {
                            // Slice the lower half of the sun
                            if (r > sunR) {
                                if ((r - sunR) % 2 === 0) {
                                    ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                                }
                            } else {
                                ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                            }
                        }
                    }
                }
            }

            // ── Animated Pixel Clouds ─────────────────────────────────────────
            const drawCloud = (cx: number, cy: number, offsets: { dx: number; dy: number }[]) => {
                ctx.fillStyle = pixelColor;
                offsets.forEach((offset) => {
                    const px = cx + offset.dx;
                    const py = cy + offset.dy;
                    if (px >= 0 && px < cols && py >= 0 && py < rows) {
                        ctx.fillRect(px * BLOCK, py * BLOCK, BLOCK, BLOCK);
                    }
                });
            };

            // Cloud 1: Slow, large
            const cloud1X = Math.floor((tick * 0.04) % (cols + 50)) - 25;
            const cloud1Y = Math.floor(rows * 0.28);
            const cloud1Offsets = [
                // row -5
                { dx: 4, dy: -5 }, { dx: 5, dy: -5 }, { dx: 6, dy: -5 }, { dx: 7, dy: -5 }, { dx: 8, dy: -5 }, { dx: 9, dy: -5 }, { dx: 10, dy: -5 },
                // row -4
                { dx: 3, dy: -4 }, { dx: 4, dy: -4 }, { dx: 5, dy: -4 }, { dx: 6, dy: -4 }, { dx: 7, dy: -4 }, { dx: 8, dy: -4 }, { dx: 9, dy: -4 }, { dx: 10, dy: -4 }, { dx: 11, dy: -4 }, { dx: 12, dy: -4 },
                // row -3
                { dx: 2, dy: -3 }, { dx: 3, dy: -3 }, { dx: 4, dy: -3 }, { dx: 5, dy: -3 }, { dx: 6, dy: -3 }, { dx: 7, dy: -3 }, { dx: 8, dy: -3 }, { dx: 9, dy: -3 }, { dx: 10, dy: -3 }, { dx: 11, dy: -3 }, { dx: 12, dy: -3 }, { dx: 13, dy: -3 }, { dx: 14, dy: -3 },
                // row -2
                { dx: 1, dy: -2 }, { dx: 2, dy: -2 }, { dx: 3, dy: -2 }, { dx: 4, dy: -2 }, { dx: 5, dy: -2 }, { dx: 6, dy: -2 }, { dx: 7, dy: -2 }, { dx: 8, dy: -2 }, { dx: 9, dy: -2 }, { dx: 10, dy: -2 }, { dx: 11, dy: -2 }, { dx: 12, dy: -2 }, { dx: 13, dy: -2 }, { dx: 14, dy: -2 }, { dx: 15, dy: -2 },
                // row -1
                { dx: 0, dy: -1 }, { dx: 1, dy: -1 }, { dx: 2, dy: -1 }, { dx: 3, dy: -1 }, { dx: 4, dy: -1 }, { dx: 5, dy: -1 }, { dx: 6, dy: -1 }, { dx: 7, dy: -1 }, { dx: 8, dy: -1 }, { dx: 9, dy: -1 }, { dx: 10, dy: -1 }, { dx: 11, dy: -1 }, { dx: 12, dy: -1 }, { dx: 13, dy: -1 }, { dx: 14, dy: -1 }, { dx: 15, dy: -1 }, { dx: 16, dy: -1 },
                // row 0
                { dx: -3, dy: 0 }, { dx: -2, dy: 0 }, { dx: -1, dy: 0 }, { dx: 0, dy: 0 }, { dx: 1, dy: 0 }, { dx: 2, dy: 0 }, { dx: 3, dy: 0 }, { dx: 4, dy: 0 }, { dx: 5, dy: 0 }, { dx: 6, dy: 0 }, { dx: 7, dy: 0 }, { dx: 8, dy: 0 }, { dx: 9, dy: 0 }, { dx: 10, dy: 0 }, { dx: 11, dy: 0 }, { dx: 12, dy: 0 }, { dx: 13, dy: 0 }, { dx: 14, dy: 0 }, { dx: 15, dy: 0 }, { dx: 16, dy: 0 }, { dx: 17, dy: 0 }
            ];
            drawCloud(cloud1X, cloud1Y, cloud1Offsets);

            // Cloud 2: Medium, higher up
            const cloud2X = Math.floor(((tick * 0.025) + cols * 0.45) % (cols + 40)) - 20;
            const cloud2Y = Math.floor(rows * 0.15);
            const cloud2Offsets = [
                // row -4
                { dx: 3, dy: -4 }, { dx: 4, dy: -4 }, { dx: 5, dy: -4 }, { dx: 6, dy: -4 }, { dx: 7, dy: -4 }, { dx: 8, dy: -4 }, { dx: 9, dy: -4 },
                // row -3
                { dx: 2, dy: -3 }, { dx: 3, dy: -3 }, { dx: 4, dy: -3 }, { dx: 5, dy: -3 }, { dx: 6, dy: -3 }, { dx: 7, dy: -3 }, { dx: 8, dy: -3 }, { dx: 9, dy: -3 }, { dx: 10, dy: -3 }, { dx: 11, dy: -3 },
                // row -2
                { dx: 1, dy: -2 }, { dx: 2, dy: -2 }, { dx: 3, dy: -2 }, { dx: 4, dy: -2 }, { dx: 5, dy: -2 }, { dx: 6, dy: -2 }, { dx: 7, dy: -2 }, { dx: 8, dy: -2 }, { dx: 9, dy: -2 }, { dx: 10, dy: -2 }, { dx: 11, dy: -2 }, { dx: 12, dy: -2 },
                // row -1
                { dx: 0, dy: -1 }, { dx: 1, dy: -1 }, { dx: 2, dy: -1 }, { dx: 3, dy: -1 }, { dx: 4, dy: -1 }, { dx: 5, dy: -1 }, { dx: 6, dy: -1 }, { dx: 7, dy: -1 }, { dx: 8, dy: -1 }, { dx: 9, dy: -1 }, { dx: 10, dy: -1 }, { dx: 11, dy: -1 }, { dx: 12, dy: -1 }, { dx: 13, dy: -1 },
                // row 0
                { dx: -1, dy: 0 }, { dx: 0, dy: 0 }, { dx: 1, dy: 0 }, { dx: 2, dy: 0 }, { dx: 3, dy: 0 }, { dx: 4, dy: 0 }, { dx: 5, dy: 0 }, { dx: 6, dy: 0 }, { dx: 7, dy: 0 }, { dx: 8, dy: 0 }, { dx: 9, dy: 0 }, { dx: 10, dy: 0 }, { dx: 11, dy: 0 }, { dx: 12, dy: 0 }, { dx: 13, dy: 0 }, { dx: 14, dy: 0 }
            ];
            drawCloud(cloud2X, cloud2Y, cloud2Offsets);

            // Cloud 3: Small, slightly faster, lower
            const cloud3X = Math.floor(((tick * 0.06) + cols * 0.75) % (cols + 30)) - 15;
            const cloud3Y = Math.floor(rows * 0.38);
            const cloud3Offsets = [
                // row -3
                { dx: 2, dy: -3 }, { dx: 3, dy: -3 }, { dx: 4, dy: -3 }, { dx: 5, dy: -3 }, { dx: 6, dy: -3 },
                // row -2
                { dx: 1, dy: -2 }, { dx: 2, dy: -2 }, { dx: 3, dy: -2 }, { dx: 4, dy: -2 }, { dx: 5, dy: -2 }, { dx: 6, dy: -2 }, { dx: 7, dy: -2 }, { dx: 8, dy: -2 },
                // row -1
                { dx: 0, dy: -1 }, { dx: 1, dy: -1 }, { dx: 2, dy: -1 }, { dx: 3, dy: -1 }, { dx: 4, dy: -1 }, { dx: 5, dy: -1 }, { dx: 6, dy: -1 }, { dx: 7, dy: -1 }, { dx: 8, dy: -1 }, { dx: 9, dy: -1 },
                // row 0
                { dx: -1, dy: 0 }, { dx: 0, dy: 0 }, { dx: 1, dy: 0 }, { dx: 2, dy: 0 }, { dx: 3, dy: 0 }, { dx: 4, dy: 0 }, { dx: 5, dy: 0 }, { dx: 6, dy: 0 }, { dx: 7, dy: 0 }, { dx: 8, dy: 0 }, { dx: 9, dy: 0 }, { dx: 10, dy: 0 }
            ];
            drawCloud(cloud3X, cloud3Y, cloud3Offsets);

            // ── Animated V-Birds ─────────────────────────────────────────────
            const bird1X = Math.floor((tick * 0.22) % (cols + 20)) - 10;
            const bird1Y = Math.floor(rows * 0.23 + Math.sin(tick * 0.05) * 2);

            const bird2X = Math.floor(((tick * 0.18) + cols * 0.35) % (cols + 20)) - 10;
            const bird2Y = Math.floor(rows * 0.16 + Math.cos(tick * 0.04) * 1.5);

            const drawBird = (bx: number, by: number) => {
                if (bx < 0 || bx >= cols || by < 0 || by >= rows) return;
                const wingUp = Math.floor(tick * 0.12) % 2 === 0;
                ctx.fillStyle = pixelColor;
                ctx.fillRect(bx * BLOCK, by * BLOCK, BLOCK, BLOCK);
                if (wingUp) {
                    ctx.fillRect((bx - 1) * BLOCK, (by - 1) * BLOCK, BLOCK, BLOCK);
                    ctx.fillRect((bx + 1) * BLOCK, (by - 1) * BLOCK, BLOCK, BLOCK);
                } else {
                    ctx.fillRect((bx - 1) * BLOCK, (by + 1) * BLOCK, BLOCK, BLOCK);
                    ctx.fillRect((bx + 1) * BLOCK, (by + 1) * BLOCK, BLOCK, BLOCK);
                }
            };

            drawBird(bird1X, bird1Y);
            drawBird(bird2X, bird2Y);

            // ── Far Mountains (50% Dither) ───────────────────────────────────
            const skyR = Math.round(rows * 0.55);
            for (let c = 0; c < cols && c < farMtn.length; c++) {
                const top = farMtn[c];
                for (let r = top; r < skyR; r++) {
                    if ((c + r) % 2 === 0) {
                        ctx.fillStyle = pixelColor;
                        ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                    }
                }
            }

            // ── Mid Mountains (75% Dither & Outline) ─────────────────────────
            const midBase = Math.round(rows * 0.65);
            for (let c = 0; c < cols && c < midMtn.length; c++) {
                const top = midMtn[c];
                ctx.fillStyle = pixelColor;
                ctx.fillRect(c * BLOCK, top * BLOCK, BLOCK, BLOCK); // top outline
                for (let r = top + 1; r < midBase; r++) {
                    if ((c + r) % 2 === 0 || c % 2 === 0) {
                        ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                    }
                }
            }

            // ── Near Hills (Solid Silhouettes) ───────────────────────────────
            const nearBase = Math.round(rows * 0.75);
            for (let c = 0; c < cols && c < nearHill.length; c++) {
                const top = nearHill[c];
                ctx.fillStyle = pixelColor;
                for (let r = top; r <= rows; r++) {
                    ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                }
            }

            // ── Pine Forest (Solid Silhouettes Overlapping Hills) ────────────
            for (let c = 3; c < cols - 3; c += 5) {
                const top = nearHill[c];
                const treeH = 5 + (c % 3) * 2;
                for (let th = 0; th < treeH; th++) {
                    const w = Math.floor((treeH - th) * 0.5);
                    for (let dw = -w; dw <= w; dw++) {
                        const tc = c + dw;
                        const tr = top - treeH + th;
                        if (tc >= 0 && tc < cols && tr >= 0 && tr < rows) {
                            ctx.fillStyle = pixelColor;
                            ctx.fillRect(tc * BLOCK, tr * BLOCK, BLOCK, BLOCK);
                        }
                    }
                }
            }

            frameId = requestAnimationFrame(drawScene);
        };

        drawScene();

        const handleResize = () => {
            resize();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(frameId);
        };
    }, [mounted, resolvedTheme]);

    return (
        <footer
            ref={containerRef}
            id="footer"
            className="relative w-full h-screen min-h-[700px] overflow-hidden bg-transparent select-none flex flex-col justify-between text-foreground/80"
        >
            {/* Pixel Art Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                aria-hidden="true"
            />

            {/* CRT Scanline Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 3px)",
                    backgroundSize: "100% 3px",
                }}
                aria-hidden="true"
            />

            {/* Upper Side: Logo, Name & Socials */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-12 md:pt-16 flex items-center justify-between">
                {/* Logo & Brand */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-full border border-foreground/10 bg-background/5 backdrop-blur-sm flex items-center justify-center overflow-hidden group-hover:border-primary/40 transition-colors duration-150">
                        <MowglaiLogo size="full" className="border-none bg-transparent scale-90" />
                    </div>
                    <span className="font-mono text-xs md:text-sm tracking-widest text-foreground/45 uppercase">MOWGLAI</span>
                </Link>

                {/* Socials */}
                <div className="flex items-center gap-4">
                    {socialLinks.map((s, idx) => (
                        <a
                            key={idx}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="text-foreground/35 hover:text-primary transition-colors duration-150"
                        >
                            <s.icon size={16} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Lower Side: Options & Metadata */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-auto pb-12 md:pb-16 flex flex-col items-center text-center">
                {/* Navigation Links Row */}
                <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm md:text-base tracking-[0.2em] font-mono font-bold text-foreground uppercase">
                    {navLinks.map((link, idx) => (
                        <Link key={idx} href={link.href} className="hover:text-primary transition-colors duration-150">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Divider Line */}
                <div className="w-20 h-[1px] bg-foreground/15 my-4" />

                {/* Metadata Row */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs md:text-sm tracking-[0.2em] font-mono font-bold text-foreground/60 uppercase">
                    <span>&copy; {new Date().getFullYear()} MOWGLAI</span>
                    <span>·</span>
                    <a href="https://mowglai.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-150">
                        MOWGLAI.COM
                    </a>
                    <span>·</span>
                    <a href="mailto:info@mowglai.com" className="hover:text-primary transition-colors duration-150">
                        INFO@MOWGLAI.COM
                    </a>
                </div>

                {/* Legal Links */}
                <div className="mt-2.5 flex items-center gap-5 text-xs md:text-sm font-mono font-bold text-foreground/50 uppercase tracking-widest">
                    <Link href="/privacy" className="hover:text-primary transition-colors duration-150">Privacy</Link>
                    <span>|</span>
                    <Link href="/terms" className="hover:text-primary transition-colors duration-150">Terms</Link>
                    <span>|</span>
                    <Link href="/referral" className="hover:text-primary transition-colors duration-150">Referral</Link>
                </div>
            </div>
        </footer>
    );
}
