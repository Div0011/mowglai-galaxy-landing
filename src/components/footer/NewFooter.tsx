"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import MowglaiLogo from "@/components/MowglaiLogo";
import XLogo from "@/components/icons/XLogo";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Templates", href: "/explore" },
    { label: "Contact", href: "/contact" },
];

const legalLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Referral", href: "/referral" },
];

const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
    { icon: XLogo, href: "https://x.com/mowglai_in", label: "X" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
];

function drawDotMatrixText(
    ctx: CanvasRenderingContext2D,
    text: string,
    startX: number,
    startY: number,
    dotSize: number,
    gap: number,
    color: string
) {
    const chars: Record<string, number[][]> = {
        M: [
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,0,1],
            [1,0,1]
        ],
        O: [
            [0,1,0],
            [1,0,1],
            [1,0,1],
            [1,0,1],
            [0,1,0]
        ],
        W: [
            [1,0,1],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,0,1]
        ],
        G: [
            [0,1,1],
            [1,0,0],
            [1,0,1],
            [1,0,1],
            [0,1,1]
        ],
        L: [
            [1,0,0],
            [1,0,0],
            [1,0,0],
            [1,0,0],
            [1,1,1]
        ],
        A: [
            [0,1,0],
            [1,0,1],
            [1,1,1],
            [1,0,1],
            [1,0,1]
        ],
        I: [
            [1,1,1],
            [0,1,0],
            [0,1,0],
            [0,1,0],
            [1,1,1]
        ],
        " ": [
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
    };

    let x = startX;
    const dots: { x: number; y: number }[] = [];

    for (const ch of text.toUpperCase()) {
        const matrix = chars[ch];
        if (!matrix) { x += (3 + 1) * (dotSize + gap); continue; }
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (matrix[row][col]) {
                    dots.push({ x: x + col * (dotSize + gap), y: startY + row * (dotSize + gap) });
                }
            }
        }
        x += (3 + 1) * (dotSize + gap);
    }

    ctx.fillStyle = color;
    for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    return { dots, width: x - startX };
}

function drawLandscapeDots(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const spacing = 14;
    ctx.fillStyle = "rgba(230,185,61,0.12)";
    for (let x = 0; x < width; x += spacing) {
        for (let y = height * 0.55; y < height; y += spacing) {
            const wave1 = Math.sin(x * 0.008 + y * 0.005) * 35;
            const wave2 = Math.cos(x * 0.012 - y * 0.003) * 20;
            const base = height * 0.65 + wave1 + wave2;
            if (y > base) {
                ctx.beginPath();
                ctx.arc(x, y, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

export default function NewFooter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        const logoCols = 19;
        const logoRows = 7;
        const textCols = 19;
        const textRows = 7;
        const baseDotSize = 3.5;
        const baseGap = 4.5;

        const logoDots: { baseX: number; baseY: number; currentX: number; currentY: number; targetX: number; targetY: number }[] = [];
        const textDots: { baseX: number; baseY: number; currentX: number; currentY: number; targetX: number; targetY: number }[] = [];
        const birds = [
            { x: width * 0.1, y: height * 0.18, speed: 0.4, wingPhase: 0, size: 6 },
            { x: width * 0.25, y: height * 0.12, speed: 0.55, wingPhase: 2, size: 5 },
            { x: width * 0.7, y: height * 0.22, speed: 0.35, wingPhase: 4, size: 7 },
        ];
        let frame = 0;

        const initLogoDots = () => {
            const totalLogoWidth = logoCols * (baseDotSize + baseGap) - baseGap;
            const totalTextWidth = textCols * (baseDotSize + baseGap) - baseGap;
            const centerX = width / 2;
            const logoY = height * 0.32;
            const textY = logoY + (logoRows + 1) * (baseDotSize + baseGap);
            const startLogoX = centerX - totalLogoWidth / 2;
            const startTextX = centerX - totalTextWidth / 2;

            logoDots.length = 0;
            textDots.length = 0;

            for (let row = 0; row < logoRows; row++) {
                for (let col = 0; col < logoCols; col++) {
                    const pattern = [
                        [1,1,1,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,1],
                        [1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0],
                        [1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,1,0],
                        [1,1,1,0,0,1,1,1,0,0,0,1,0,0,1,0,0,1,0],
                        [1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1],
                        [1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0],
                        [1,1,1,0,0,1,1,1,0,0,0,1,1,1,1,0,1,1,1]
                    ];
                    if (pattern[row] && pattern[row][col]) {
                        logoDots.push({
                            baseX: startLogoX + col * (baseDotSize + baseGap),
                            baseY: logoY + row * (baseDotSize + baseGap),
                            currentX: -50,
                            currentY: logoY + row * (baseDotSize + baseGap),
                            targetX: startLogoX + col * (baseDotSize + baseGap),
                            targetY: logoY + row * (baseDotSize + baseGap),
                        });
                    }
                }
            }

            for (let row = 0; row < textRows; row++) {
                for (let col = 0; col < textCols; col++) {
                    const pattern = [
                        [0,1,1,0,0,1,1,1,1,0,0,0,1,0,0,1,1,1,1],
                        [1,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,0],
                        [1,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0,1,1,0],
                        [1,0,0,1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0],
                        [1,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1],
                        [1,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,0,0],
                        [1,1,1,0,0,1,0,0,0,1,0,0,1,1,1,0,1,1,1]
                    ];
                    if (pattern[row] && pattern[row][col]) {
                        textDots.push({
                            baseX: startTextX + col * (baseDotSize + baseGap),
                            baseY: textY + row * (baseDotSize + baseGap),
                            currentX: width + 50,
                            currentY: textY + row * (baseDotSize + baseGap),
                            targetX: startTextX + col * (baseDotSize + baseGap),
                            targetY: textY + row * (baseDotSize + baseGap),
                        });
                    }
                }
            }
        };

        const handleResize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            initLogoDots();
        };

        initLogoDots();
        window.addEventListener("resize", handleResize);

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.016;

            drawLandscapeDots(ctx, width, height);

            for (const dot of logoDots) {
                dot.currentX += (dot.targetX - dot.currentX) * 0.04 + Math.sin(time * 2 + dot.baseY * 0.05) * 0.15;
                dot.currentY += (dot.targetY - dot.currentY) * 0.04;
                ctx.fillStyle = "rgba(230,185,61,0.9)";
                ctx.beginPath();
                ctx.arc(dot.currentX, dot.currentY, baseDotSize / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            for (const dot of textDots) {
                dot.currentX += (dot.targetX - dot.currentX) * 0.04 - Math.sin(time * 2 + dot.baseY * 0.05) * 0.15;
                dot.currentY += (dot.targetY - dot.currentY) * 0.04;
                ctx.fillStyle = "rgba(230,185,61,0.9)";
                ctx.beginPath();
                ctx.arc(dot.currentX, dot.currentY, baseDotSize / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            for (const bird of birds) {
                bird.x += bird.speed;
                bird.wingPhase += 0.15;
                if (bird.x > width + 40) bird.x = -40;
                const wingY = Math.sin(bird.wingPhase) * bird.size * 0.5;
                ctx.strokeStyle = "rgba(230,185,61,0.7)";
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(bird.x - bird.size, bird.y + wingY);
                ctx.quadraticCurveTo(bird.x, bird.y - 1, bird.x + bird.size, bird.y + wingY);
                ctx.stroke();
            }

            frame++;
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <footer className="ftr">
            <div className="ftr-top">
                <div className="ftr-brand">
                    <Link href="/" className="ftr-logo">
                        <MowglaiLogo size="sm" />
                    </Link>
                    <div className="ftr-note-group">
                        <p className="ftr-note">
                            Crafting digital ecosystems that transcend boundaries. Global standards, local heart.
                        </p>
                        <p className="ftr-note">
                            Premium web development & digital agency based in India.
                        </p>
                    </div>
                    <ul className="ftr-clocks" aria-label="Connect with Mowglai">
                        {socialLinks.map((s, i) => (
                            <li key={i} className="ftr-clock">
                                <a href={s.href} target="_blank" rel="noopener noreferrer" className="ftr-clock-time" aria-label={s.label}>
                                    <s.icon size={16} />
                                </a>
                                <span className="ftr-clock-city">{s.label}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="ftr-meta">
                        <span>&copy; {new Date().getFullYear()} Mowglai</span>
                        <span className="sep">&middot;</span>
                        <span>mowglai.com</span>
                        <span className="sep">&middot;</span>
                        <Link href="mailto:info@mowglai.com">info@mowglai.com</Link>
                    </div>
                </div>

                <nav className="ftr-cols" aria-label="Footer">
                    <div className="ftr-col">
                        <span className="ftr-col-label">Navigate</span>
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="ftr-link">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="ftr-col">
                        <span className="ftr-col-label">Legal</span>
                        {legalLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="ftr-link">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>

            <p className="ftr-legal">
                Mowglai is a premium web development and digital agency. All rights reserved.
            </p>

            <div className="ftr-scene" aria-hidden="true">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ imageRendering: "pixelated" }}
                />
            </div>
        </footer>
    );
}
