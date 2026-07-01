"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function GrombleGuardian() {
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();

    // Subtle stone guardian rumble / heavy float
    useEffect(() => {
        controls.start({
            y: [0, -4, 2, 0],
            rotate: [0, -0.5, 0.5, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [controls]);

    return (
        <div
            className="relative w-44 h-44 flex items-center justify-center cursor-pointer select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Grounding mossy/crystal ambient aura */}
            <motion.div
                className="absolute w-24 h-24 rounded-full bg-[#10b981]/5 dark:bg-[#c5a059]/10 blur-2xl pointer-events-none"
                animate={{
                    scale: isHovered ? [1, 1.25, 1.1] : [1, 1.05, 1],
                    opacity: isHovered ? 0.8 : 0.2,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Rumble Guardian Container */}
            <motion.div
                animate={controls}
                className="w-full h-full flex items-center justify-center relative z-10"
            >
                <svg
                    viewBox="0 0 150 150"
                    className="w-full h-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        {/* Stone texture & color gradient */}
                        <linearGradient id="stoneGrad" x1="75" y1="50" x2="75" y2="120" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#374151" /> {/* Slate gray */}
                            <stop offset="40%" stopColor="#1f2937" />
                            <stop offset="100%" stopColor="#065f46" /> {/* Forest moss green */}
                        </linearGradient>
                        <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <filter id="crystalGlow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Left Stone Arm */}
                    <motion.path
                        d="M45 90 C30 90 20 100 25 108"
                        stroke="#374151"
                        strokeWidth="7.5"
                        strokeLinecap="round"
                        animate={isHovered ? {
                            d: "M45 90 C25 80 15 90 20 102",
                            rotate: [-2, 2, -2]
                        } : {
                            d: "M45 90 C30 90 20 100 25 108",
                            rotate: 0
                        }}
                        className="origin-[45px_90px]"
                        transition={{ duration: 0.4 }}
                    />

                    {/* Right Stone Arm */}
                    <motion.path
                        d="M105 90 C120 90 130 100 125 108"
                        stroke="#374151"
                        strokeWidth="7.5"
                        strokeLinecap="round"
                        animate={isHovered ? {
                            d: "M105 90 C125 80 135 90 130 102",
                            rotate: [2, -2, 2]
                        } : {
                            d: "M105 90 C120 90 130 100 125 108",
                            rotate: 0
                        }}
                        className="origin-[105px_90px]"
                        transition={{ duration: 0.4 }}
                    />

                    {/* Main Stone Guardian Body (Craggy, polygonal outline) */}
                    <motion.path
                        d="M40 70 L55 50 L95 50 L110 70 L115 100 L100 120 L50 120 L35 100 Z"
                        fill="url(#stoneGrad)"
                        stroke="#111827"
                        strokeWidth="2.5"
                        animate={{
                            scaleY: isHovered ? 1.03 : 1,
                            y: isHovered ? -3 : 0
                        }}
                        className="origin-[75px_120px]"
                        transition={{ duration: 0.3 }}
                    />

                    {/* Moss patches on body */}
                    <path d="M48 55 Q55 52 65 58 Q60 62 50 60 Z" fill="#047857" opacity="0.8" />
                    <path d="M90 53 Q98 56 102 65 Q95 62 88 58 Z" fill="#047857" opacity="0.8" />
                    <path d="M38 95 Q42 102 40 108 Q35 105 38 98 Z" fill="#047857" opacity="0.6" />

                    {/* Crystal Eyes */}
                    {/* Left Crystal Eye Socket */}
                    <polygon points="52,70 68,70 64,80 56,80" fill="#111827" />
                    {/* Left Crystal Eye (Closed default, open on hover) */}
                    <motion.polygon
                        points="53,71 67,71 63,79 57,79"
                        fill={isHovered ? "url(#crystalGrad)" : "#1f2937"}
                        filter={isHovered ? "url(#crystalGlow)" : undefined}
                        className="origin-[60px_75px]"
                        animate={{
                            scaleY: isHovered ? 1 : 0.1,
                            opacity: isHovered ? 1 : 0.6
                        }}
                        transition={{ duration: 0.25 }}
                    />

                    {/* Right Crystal Eye Socket */}
                    <polygon points="82,70 98,70 94,80 86,80" fill="#111827" />
                    {/* Right Crystal Eye (Closed default, open on hover) */}
                    <motion.polygon
                        points="83,71 97,71 93,79 87,79"
                        fill={isHovered ? "url(#crystalGrad)" : "#1f2937"}
                        filter={isHovered ? "url(#crystalGlow)" : undefined}
                        className="origin-[90px_75px]"
                        animate={{
                            scaleY: isHovered ? 1 : 0.1,
                            opacity: isHovered ? 1 : 0.6
                        }}
                        transition={{ duration: 0.25 }}
                    />

                    {/* Stoic Stone Mouth / Line */}
                    <path
                        d="M 65 92 L 85 92"
                        stroke="#111827"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                    />

                    {/* Floating Craggy Dust Particles (Active when hovered) */}
                    {isHovered && (
                        <g>
                            {[
                                { x: 30, y: 120, delay: 0 },
                                { x: 120, y: 110, delay: 0.2 },
                                { x: 75, y: 125, delay: 0.4 }
                            ].map((dust, idx) => (
                                <motion.circle
                                    key={idx}
                                    cx={dust.x}
                                    cy={dust.y}
                                    r="2.5"
                                    fill="#34d399"
                                    initial={{ y: 0, opacity: 0 }}
                                    animate={{
                                        y: -25,
                                        opacity: [0, 0.8, 0],
                                        scale: [0.8, 1.2, 0.8]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: dust.delay,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </g>
                    )}
                </svg>
            </motion.div>
        </div>
    );
}
