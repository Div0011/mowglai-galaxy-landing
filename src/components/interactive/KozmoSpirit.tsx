"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function KozmoSpirit() {
    const [isHovered, setIsHovered] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const controls = useAnimation();

    // Subtle cosmic floating movement
    useEffect(() => {
        controls.start({
            y: [0, 8, -4, 0],
            x: [0, -4, 4, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [controls]);

    // Blinking eye routine
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.4) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 120);
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="relative w-44 h-44 flex items-center justify-center cursor-pointer select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Nebula Background Cloud Glow */}
            <motion.div
                className="absolute w-28 h-28 rounded-full bg-[#3b82f6]/10 dark:bg-[#8b5cf6]/10 blur-xl pointer-events-none"
                animate={{
                    scale: isHovered ? [1, 1.3, 1.1] : [1, 1.1, 1],
                    opacity: isHovered ? 0.7 : 0.3,
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Breathing Cosmic Body */}
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
                        <linearGradient id="cosmicGrad" x1="75" y1="40" x2="75" y2="110" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#8b5cf6" /> {/* Indigo / Purple */}
                            <stop offset="50%" stopColor="#3b82f6" /> {/* Cyan / Blue */}
                            <stop offset="100%" stopColor="#C5A059" /> {/* Mowglai Gold highlights */}
                        </linearGradient>
                        <filter id="cosmicGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Orbiting Stardust Rings (Back Layer) */}
                    <g className="origin-[75px_75px]">
                        <motion.ellipse
                            cx="75"
                            cy="75"
                            rx="55"
                            ry="18"
                            stroke="#8b5cf6"
                            strokeWidth="1.5"
                            strokeDasharray="6, 12"
                            opacity="0.4"
                            animate={{
                                rotate: 360
                            }}
                            transition={{
                                duration: isHovered ? 4 : 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </g>

                    {/* Floating Space Dust Particles */}
                    {[
                        { cx: 35, cy: 60, r: 2.5, color: "#8b5cf6", delay: 0 },
                        { cx: 110, cy: 90, r: 2, color: "#3b82f6", delay: 0.5 },
                        { cx: 85, cy: 35, r: 1.5, color: "#C5A059", delay: 1 }
                    ].map((particle, idx) => (
                        <motion.circle
                            key={idx}
                            cx={particle.cx}
                            cy={particle.cy}
                            r={particle.r}
                            fill={particle.color}
                            animate={{
                                y: [-6, 6, -6],
                                opacity: [0.3, 0.9, 0.3]
                            }}
                            transition={{
                                duration: 3 + idx,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Left Arm - Extends left and waves slightly, spreads for hug */}
                    <motion.path
                        d="M50 78 C35 78 20 70 12 75"
                        stroke="url(#cosmicGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        animate={isHovered ? {
                            d: "M50 78 C25 65 10 50 15 45",
                            rotate: [-5, 5, -5]
                        } : {
                            d: "M50 78 C35 78 20 70 12 75",
                            rotate: 0
                        }}
                        className="origin-[50px_78px]"
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Right Arm - Extends right and waves, spreads for hug */}
                    <motion.path
                        d="M100 78 C115 78 130 70 138 75"
                        stroke="url(#cosmicGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        animate={isHovered ? {
                            d: "M100 78 C125 65 140 50 135 45",
                            rotate: [5, -5, 5]
                        } : {
                            d: "M100 78 C115 78 130 70 138 75",
                            rotate: 0
                        }}
                        className="origin-[100px_78px]"
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Main Gaseous Nebula Body */}
                    <motion.path
                        d="M48 70 C42 50 75 35 102 50 C112 60 115 80 102 95 C90 108 85 115 75 115 C65 115 60 108 48 95 C38 85 54 90 48 70 Z"
                        fill="url(#cosmicGrad)"
                        stroke="#8b5cf6"
                        strokeWidth="1"
                        filter={isHovered ? "url(#cosmicGlow)" : undefined}
                        className="origin-[75px_115px]"
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            d: isHovered ?
                                "M46 68 C40 45 75 30 104 48 C115 58 118 78 104 98 C90 110 85 118 75 118 C65 118 60 110 46 98 C36 82 52 86 46 68 Z" :
                                "M48 70 C42 50 75 35 102 50 C112 60 115 80 102 95 C90 108 85 115 75 115 C65 115 60 108 48 95 C38 85 54 90 48 70 Z"
                        }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Cute Cosmic Face */}
                    {/* Left Eye */}
                    <motion.ellipse
                        cx="63"
                        cy="68"
                        rx="4"
                        ry={isBlinking ? "0.5" : "5.5"}
                        fill="#FFFFFF"
                        animate={{
                            scale: isHovered ? 1.25 : 1
                        }}
                        className="origin-[63px_68px]"
                    />
                    {!isBlinking && (
                        <circle cx="64.5" cy="66" r="1.2" fill="#8b5cf6" />
                    )}

                    {/* Right Eye */}
                    <motion.ellipse
                        cx="87"
                        cy="68"
                        rx="4"
                        ry={isBlinking ? "0.5" : "5.5"}
                        fill="#FFFFFF"
                        animate={{
                            scale: isHovered ? 1.25 : 1
                        }}
                        className="origin-[87px_68px]"
                    />
                    {!isBlinking && (
                        <circle cx="88.5" cy="66" r="1.2" fill="#8b5cf6" />
                    )}

                    {/* Glowing Smile */}
                    <motion.path
                        d={isHovered ? "M 70 82 Q 75 88 80 82" : "M 72 82 Q 75 84 78 82"}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Orbiting Stardust Rings (Front Layer) */}
                    <g className="origin-[75px_75px]">
                        <motion.ellipse
                            cx="75"
                            cy="75"
                            rx="55"
                            ry="18"
                            stroke="#3b82f6"
                            strokeWidth="1.5"
                            strokeDasharray="18, 6"
                            opacity="0.8"
                            animate={{
                                rotate: -360
                            }}
                            transition={{
                                duration: isHovered ? 3.5 : 12,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </g>
                </svg>
            </motion.div>
        </div>
    );
}
