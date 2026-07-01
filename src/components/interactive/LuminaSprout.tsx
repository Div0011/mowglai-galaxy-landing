"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function LuminaSprout() {
    const [isHovered, setIsHovered] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);
    const [isWaving, setIsWaving] = useState(false);
    const controls = useAnimation();

    // Natural breathing loop for Lumina
    useEffect(() => {
        controls.start({
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        });
    }, [controls]);

    // Random blinking effect
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.3) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleHoverStart = () => {
        setIsHovered(true);
        setIsWaving(true);
    };

    const handleHoverEnd = () => {
        setIsHovered(false);
        setIsWaving(false);
    };

    return (
        <div
            className="relative w-40 h-40 flex items-center justify-center cursor-pointer select-none"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            onClick={() => setIsWaving(true)}
        >
            {/* Ambient Bioluminescent Background Glow */}
            <motion.div
                className="absolute w-24 h-24 rounded-full bg-primary/20 blur-xl pointer-events-none"
                animate={{
                    scale: isHovered ? [1, 1.4, 1.2] : [1, 1.15, 1],
                    opacity: isHovered ? 0.8 : 0.4,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Character Container with Breathing Motion */}
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
                    {/* Definitions for Gradients and Filters */}
                    <defs>
                        <linearGradient id="bodyGrad" x1="75" y1="50" x2="75" y2="120" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="rgba(197, 160, 89, 0.15)" /> {/* Mowglai Gold semi-transparent */}
                            <stop offset="100%" stopColor="rgba(74, 222, 128, 0.05)" /> {/* Jungle Green semi-transparent */}
                        </linearGradient>
                        <linearGradient id="leafGrad" x1="75" y1="10" x2="75" y2="45" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#4ade80" />
                            <stop offset="100%" stopColor="#C5A059" />
                        </linearGradient>
                        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Glowing Sprouts / Leaves on top of Head */}
                    <g className="origin-[75px_45px]">
                        {/* Left Sprout leaf */}
                        <motion.path
                            d="M75 45 C60 30 50 10 75 10"
                            stroke="url(#leafGrad)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            animate={{
                                rotate: isHovered ? [-5, 15, -5] : [0, 5, 0],
                                scale: isHovered ? 1.1 : 1,
                                filter: isHovered ? "url(#glow)" : "none"
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {/* Right Sprout leaf */}
                        <motion.path
                            d="M75 45 C90 30 100 12 75 12"
                            stroke="url(#leafGrad)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            animate={{
                                rotate: isHovered ? [5, -15, 5] : [0, -5, 0],
                                scale: isHovered ? 1.1 : 1,
                                filter: isHovered ? "url(#glow)" : "none"
                            }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                        />
                    </g>

                    {/* Arms */}
                    {/* Left Arm - waving small hello on hover */}
                    <motion.path
                        d="M48 85 C35 85 28 75 35 70"
                        stroke="#C5A059"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        animate={{
                            rotate: isHovered ? [-10, 10, -10] : 0,
                        }}
                        className="origin-[48px_85px]"
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Right Arm - Waves aggressively on hover/click */}
                    <motion.path
                        d="M102 85 C115 85 122 75 115 70"
                        stroke="#C5A059"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        animate={isWaving ? {
                            rotate: [-15, 45, -15, 45, -15],
                            d: [
                                "M102 85 C115 85 122 75 115 70",
                                "M102 85 C115 70 125 50 120 40",
                                "M102 85 C115 85 122 75 115 70"
                            ]
                        } : {
                            rotate: 0,
                            d: "M102 85 C115 85 122 75 115 70"
                        }}
                        className="origin-[102px_85px]"
                        onAnimationComplete={() => {
                            if (!isHovered) setIsWaving(false);
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Main Egg-Shaped Body - Classy Glassmorphism */}
                    <motion.path
                        d="M45 80 C45 55 105 55 105 80 C105 105 100 120 75 120 C50 120 45 105 45 80 Z"
                        fill="url(#bodyGrad)"
                        stroke="#C5A059"
                        strokeWidth="1.5"
                        animate={{
                            scaleX: isHovered ? 1.04 : 1,
                            scaleY: isHovered ? 0.98 : 1
                        }}
                        className="origin-[75px_120px]"
                        transition={{ duration: 0.3 }}
                    />

                    {/* Face: Minimalist glowing oval slits for eyes */}
                    {/* Left Eye */}
                    <motion.ellipse
                        cx="62"
                        cy="82"
                        rx="3.5"
                        ry={isBlinking ? "0.2" : (isHovered ? "3.5" : "1.2")}
                        fill="#C5A059"
                        animate={{
                            fill: isHovered ? "#FFE600" : "#C5A059",
                            filter: isHovered ? "drop-shadow(0 0 4px #FFE600)" : "none"
                        }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Right Eye */}
                    <motion.ellipse
                        cx="88"
                        cy="82"
                        rx="3.5"
                        ry={isBlinking ? "0.2" : (isHovered ? "3.5" : "1.2")}
                        fill="#C5A059"
                        animate={{
                            fill: isHovered ? "#FFE600" : "#C5A059",
                            filter: isHovered ? "drop-shadow(0 0 4px #FFE600)" : "none"
                        }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Tiny Little Floating Shadow beneath character */}
                    <ellipse
                        cx="75"
                        cy="135"
                        rx="30"
                        ry="4"
                        fill="rgba(0,0,0,0.15)"
                        className="blur-[2px]"
                    />
                </svg>
            </motion.div>
        </div>
    );
}
