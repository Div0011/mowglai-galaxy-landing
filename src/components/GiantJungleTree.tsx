"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// THE ANCIENT TREE — A massive, old, gnarled banyan/fig tree
// that runs the full height of the page. Multiple parallax
// layers create true depth: roots → trunk → branches → canopy.
// ═══════════════════════════════════════════════════════════════

// ── Layer 1: Deep Roots (far background, slowest parallax) ──
function RootsLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const y = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

    return (
        <motion.div
            className="absolute bottom-0 left-0 w-[40vw] md:w-[30vw] opacity-20"
            style={{ y, height: "120vh" }}
        >
            <svg viewBox="0 0 400 1200" preserveAspectRatio="xMinYMax meet" className="w-full h-full">
                {/* Thick ancient roots spreading out */}
                <path d="M180 0 C170 200 100 400 40 700 Q0 900 20 1200" stroke="#14532d" strokeWidth="60" fill="none" strokeLinecap="round" />
                <path d="M200 0 C220 300 280 500 350 800 Q400 1000 380 1200" stroke="#0a2e14" strokeWidth="45" fill="none" strokeLinecap="round" />
                <path d="M190 200 C130 400 50 500 10 700" stroke="#14532d" strokeWidth="30" fill="none" strokeLinecap="round" opacity="0.6" />
                {/* Root tendrils */}
                <path d="M60 700 C30 800 -10 850 20 950" stroke="#0a2e14" strokeWidth="15" fill="none" strokeLinecap="round" opacity="0.4" />
                <path d="M340 800 C370 900 390 950 360 1050" stroke="#0a2e14" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.3" />
                {/* Moss/lichen texture on roots */}
                <path d="M150 350 C130 380 140 420 160 400" stroke="#22c55e" strokeWidth="4" fill="none" opacity="0.3" />
                <path d="M230 500 C250 530 240 570 220 550" stroke="#4ade80" strokeWidth="3" fill="none" opacity="0.2" />
            </svg>
        </motion.div>
    );
}

// ── Layer 2: The Main Trunk (old, gnarled, textured bark) ──
function TrunkLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

    return (
        <motion.div
            className="absolute top-0 left-0 w-[25vw] md:w-[18vw] opacity-40"
            style={{ y, height: "300vh" }}
        >
            <svg viewBox="0 0 300 2000" preserveAspectRatio="xMinYMin meet" className="w-full h-full drop-shadow-[0_0_30px_rgba(20,83,45,0.4)]">
                {/* Main thick trunk — gnarled and organic */}
                <path d="M150 0 C140 100 120 200 130 400 C140 600 110 800 140 1000 C160 1200 130 1400 150 1600 C140 1800 160 1900 150 2000"
                    stroke="#1a3a20" strokeWidth="70" fill="none" strokeLinecap="round" />

                {/* Bark texture lines */}
                <path d="M120 100 C115 200 125 300 118 400" stroke="#0d1f10" strokeWidth="3" fill="none" opacity="0.5" />
                <path d="M170 200 C175 350 165 500 172 650" stroke="#0d1f10" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M135 500 C128 600 140 700 130 800" stroke="#0d1f10" strokeWidth="4" fill="none" opacity="0.3" />
                <path d="M155 800 C162 900 148 1000 158 1100" stroke="#0d1f10" strokeWidth="3" fill="none" opacity="0.4" />
                <path d="M125 1100 C118 1200 132 1300 122 1400" stroke="#0d1f10" strokeWidth="2" fill="none" opacity="0.3" />

                {/* Knotholes — old tree details */}
                <ellipse cx="145" cy="350" rx="12" ry="18" fill="#05110a" opacity="0.7" />
                <ellipse cx="140" cy="850" rx="10" ry="14" fill="#05110a" opacity="0.6" />
                <ellipse cx="155" cy="1350" rx="8" ry="12" fill="#05110a" opacity="0.5" />

                {/* Moss patches growing on trunk */}
                <path d="M115 280 C100 290 95 310 110 320 C120 315 125 295 115 280Z" fill="#22c55e" opacity="0.25" />
                <path d="M175 600 C190 610 195 630 180 640 C170 635 165 615 175 600Z" fill="#4ade80" opacity="0.2" />
                <path d="M110 1000 C95 1010 90 1030 105 1040 C115 1035 120 1015 110 1000Z" fill="#22c55e" opacity="0.2" />

                {/* Major branches going RIGHT */}
                <path d="M180 300 C250 280 320 260 400 220" stroke="#1a3a20" strokeWidth="25" fill="none" strokeLinecap="round" opacity="0.7" />
                <path d="M175 700 C260 670 340 690 450 650" stroke="#1a3a20" strokeWidth="20" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M170 1100 C240 1080 300 1110 380 1070" stroke="#14532d" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.5" />
                <path d="M165 1500 C230 1470 290 1490 360 1450" stroke="#14532d" strokeWidth="15" fill="none" strokeLinecap="round" opacity="0.4" />

                {/* Smaller sub-branches */}
                <path d="M300 265 C330 240 350 250 370 230" stroke="#1a3a20" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.5" />
                <path d="M350 680 C380 660 400 670 420 650" stroke="#14532d" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.4" />
            </svg>
        </motion.div>
    );
}

// ── Layer 3: Hanging Vines & Creepers (foreground, fast parallax) ──
function VinesLayer({ scrollYProgress }: { scrollYProgress: any }) {
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

    return (
        <motion.div
            className="absolute top-0 left-0 w-[35vw] md:w-[25vw] opacity-30"
            style={{ y, height: "400vh" }}
        >
            <svg viewBox="0 0 300 3000" preserveAspectRatio="xMinYMin meet" className="w-full h-full">
                {/* Long hanging vines from branches */}
                <path d="M220 300 C225 500 215 700 220 900" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M280 280 C285 450 275 620 280 780 C285 900 275 1000 280 1100" stroke="#14532d" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M250 700 C255 850 245 1000 250 1150" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                <path d="M200 1100 C205 1300 195 1500 200 1700" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
                <path d="M260 1500 C265 1700 255 1900 260 2100" stroke="#14532d" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />

                {/* Tiny leaves on vines */}
                {[400, 600, 800, 1000, 1200, 1600, 2000].map((cy, i) => (
                    <g key={i}>
                        <path d={`M${215 + (i % 3) * 20} ${cy} C${210 + (i % 3) * 20} ${cy - 8} ${205 + (i % 3) * 20} ${cy - 5} ${210 + (i % 3) * 20} ${cy + 2}`}
                            fill="#22c55e" opacity={0.3 - i * 0.02} />
                    </g>
                ))}
            </svg>
        </motion.div>
    );
}

// ── Layer 4: Right-side canopy foliage (depth balance) ──
function CanopyRight({ scrollYProgress }: { scrollYProgress: any }) {
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

    return (
        <motion.div
            className="absolute top-0 right-0 w-[20vw] md:w-[15vw] opacity-15"
            style={{ y, height: "200vh" }}
        >
            <svg viewBox="0 0 200 1200" preserveAspectRatio="xMaxYMin meet" className="w-full h-full">
                {/* Branch reaching in from right edge */}
                <path d="M200 100 C150 120 100 100 60 140" stroke="#14532d" strokeWidth="20" fill="none" strokeLinecap="round" />
                <path d="M200 500 C140 480 90 520 50 490" stroke="#1a3a20" strokeWidth="15" fill="none" strokeLinecap="round" />
                <path d="M200 900 C160 880 120 910 80 870" stroke="#14532d" strokeWidth="12" fill="none" strokeLinecap="round" />

                {/* Leaf clusters */}
                <circle cx="70" cy="130" r="30" fill="#22c55e" opacity="0.15" />
                <circle cx="90" cy="150" r="25" fill="#14532d" opacity="0.12" />
                <circle cx="55" cy="480" r="28" fill="#22c55e" opacity="0.1" />
                <circle cx="85" cy="865" r="22" fill="#4ade80" opacity="0.08" />
            </svg>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════
// FIREFLIES — Pure CSS animation (offloaded from Framer Motion)
// Previously: 12 Framer Motion elements with infinite animate
// Now: CSS keyframes via .animate-firefly — GPU composited
// ═══════════════════════════════════════════════════════════════
function Fireflies() {
    // Stable positions — no Math.random() in render
    const flies = [
        { x: 8,  y: 15, size: 3, dur: 4,   delay: 0 },
        { x: 15, y: 35, size: 2, dur: 5.5, delay: 1.2 },
        { x: 22, y: 55, size: 4, dur: 3.5, delay: 2.5 },
        { x: 12, y: 72, size: 2, dur: 6,   delay: 0.8 },
        { x: 28, y: 25, size: 3, dur: 4.5, delay: 3 },
        { x: 18, y: 48, size: 2, dur: 5,   delay: 1.5 },
        { x: 6,  y: 65, size: 3, dur: 3.8, delay: 4 },
        { x: 25, y: 85, size: 2, dur: 5.2, delay: 2 },
    ];

    return (
        <>
            {flies.map((f, i) => (
                <div
                    key={i}
                    className="fixed rounded-full pointer-events-none z-[3] animate-firefly"
                    style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        width: f.size,
                        height: f.size,
                        background: "#F5D061",
                        boxShadow: "0 0 8px 3px rgba(245,208,97,0.6)",
                        '--firefly-duration': `${f.dur}s`,
                        '--firefly-delay': `${f.delay}s`,
                    } as React.CSSProperties}
                />
            ))}
        </>
    );
}

// ═══════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════
export default function GiantJungleTree() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            <RootsLayer scrollYProgress={scrollYProgress} />
            <TrunkLayer scrollYProgress={scrollYProgress} />
            <VinesLayer scrollYProgress={scrollYProgress} />
            <CanopyRight scrollYProgress={scrollYProgress} />
            <Fireflies />
        </div>
    );
}
