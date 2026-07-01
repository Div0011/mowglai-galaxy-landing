"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Instagram, Linkedin, Mail } from "lucide-react";
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
    { icon: Instagram, href: "https://www.instagram.com/mowglai.in",              label: "Instagram" },
    { icon: XLogo,     href: "https://x.com/mowglai_in",                          label: "X" },
    { icon: Linkedin,  href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
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

        const BLOCK = 8; // Canvas pixels per "scene block" (8 is perfect for full screen)
        const STAR_COUNT = 45;

        let W = 0, H = 0;
        let farMtn: number[] = [];
        let midMtn: number[] = [];
        let nearHill: number[] = [];
        const stars: { col: number; row: number }[] = [];

        const buildMountains = (cols: number, rows: number) => {
            const make = (baseline: number, amp: number, seed: number) =>
                Array.from({ length: cols }, (_, c) => {
                    const t = c / cols;
                    return Math.round(
                        baseline
                        + Math.sin(t * Math.PI * 2.5 + seed) * amp * 0.55
                        + Math.sin(t * Math.PI * 6.5 + seed * 2) * amp * 0.3
                        + Math.sin(t * Math.PI * 12 + seed * 3.5) * amp * 0.15
                    );
                });

            // Mountains occupy bottom part of full-screen view
            const fBase = Math.round(rows * 0.65);
            const mBase = Math.round(rows * 0.76);
            const nBase = Math.round(rows * 0.85);

            farMtn   = make(fBase - Math.round(rows * 0.14), rows * 0.11, 1.2);
            midMtn   = make(mBase - Math.round(rows * 0.10), rows * 0.08, 3.6);
            nearHill = make(nBase - Math.round(rows * 0.05), rows * 0.04, 7.8);
        };

        const resize = () => {
            W = container.offsetWidth  || window.innerWidth;
            H = container.offsetHeight || window.innerHeight;
            canvas.width  = W;
            canvas.height = H;
            const cols = Math.ceil(W / BLOCK);
            const rows = Math.ceil(H / BLOCK);
            buildMountains(cols, rows);

            stars.length = 0;
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push({
                    col: Math.floor(pseudo(i * 4.3) * cols),
                    row: Math.floor(pseudo(i * 8.9) * Math.floor(rows * 0.60)),
                });
            }
        };

        resize();

        let tick = 0;
        let frameId: number;

        const isDark = resolvedTheme === "dark";
        const pixelColor = isDark ? "rgba(230, 185, 61, 0.22)" : "rgba(71, 98, 42, 0.35)";

        const drawCloud = (cols: number, rows: number, cx: number, cy: number) => {
            const cloudRows = [
                { dy: -2, w: 5 },
                { dy: -1, w: 8 },
                { dy: 0, w: 10 },
                { dy: 1, w: 9 },
                { dy: 2, w: 6 },
            ];
            ctx.fillStyle = pixelColor;
            cloudRows.forEach(({ dy, w }) => {
                const r = cy + dy;
                for (let dc = -w; dc <= w; dc++) {
                    const c = cx + dc;
                    if (c >= 0 && c < cols && r >= 0 && r < rows) {
                        if ((c + r) % 2 === 0) {
                            ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                        }
                    }
                }
            });
        };

        const drawScene = () => {
            tick++;
            ctx.clearRect(0, 0, W, H);

            const cols = Math.ceil(W / BLOCK);
            const rows = Math.ceil(H / BLOCK);
            const skyR = Math.round(rows * 0.65);

            // ── Stars (Dark Mode Only) ───────────────────────────────────────
            if (isDark) {
                for (const star of stars) {
                    if (star.row >= skyR) continue;
                    const starTick = tick + star.col * 7 + star.row * 13;
                    if (Math.sin(starTick * 0.05) > 0.15) {
                        ctx.fillStyle = pixelColor;
                        ctx.fillRect(star.col * BLOCK, star.row * BLOCK, BLOCK, BLOCK);
                    }
                }
            }

            // ── Pixel Clouds ─────────────────────────────────────────────────
            const cloud1X = Math.floor((tick * 0.06) % (cols + 40)) - 20;
            const cloud1Y = Math.floor(rows * 0.18);
            drawCloud(cols, rows, cloud1X, cloud1Y);

            const cloud2X = Math.floor(((tick * 0.04) + cols * 0.55) % (cols + 40)) - 20;
            const cloud2Y = Math.floor(rows * 0.28);
            drawCloud(cols, rows, cloud2X, cloud2Y);

            // ── Pixel Sun (Right Aligned) ────────────────────────────────────
            const sunX = Math.round(cols * 0.82);
            const sunY = Math.round(rows * 0.38);
            const sunR = 12;
            for (let dr = -sunR; dr <= sunR; dr++) {
                for (let dc = -sunR; dc <= sunR; dc++) {
                    const dist = Math.sqrt(dr * dr + dc * dc);
                    if (dist <= sunR) {
                        const r = sunY + dr;
                        const c = sunX + dc;
                        if (c >= 0 && c < cols && r >= 0 && r < rows) {
                            if (dr > 0 && dr % 2 !== 0) continue;
                            ctx.fillStyle = pixelColor;
                            ctx.fillRect(c * BLOCK, r * BLOCK, BLOCK, BLOCK);
                        }
                    }
                }
            }

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
            const midBase = Math.round(rows * 0.76);
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
            const nearBase = Math.round(rows * 0.85);
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
            className="relative w-full h-screen min-h-[700px] overflow-hidden bg-transparent select-none flex flex-col justify-between"
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
                        "repeating-linear-gradient(0deg, rgba(0,0,0,0.025) 0px, rgba(0,0,0,0.025) 1px, transparent 1px, transparent 3px)",
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
                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm tracking-[0.25em] font-mono text-foreground/75 uppercase">
                    {navLinks.map((link, idx) => (
                        <Link key={idx} href={link.href} className="hover:text-primary transition-colors duration-150">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Divider Line */}
                <div className="w-20 h-[1px] bg-foreground/15 my-4" />

                {/* Metadata Row */}
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[10px] md:text-[11px] tracking-[0.2em] font-mono text-foreground/35 uppercase">
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
                <div className="mt-2.5 flex items-center gap-5 text-[10px] md:text-[11px] font-mono text-foreground/25 uppercase tracking-widest">
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
