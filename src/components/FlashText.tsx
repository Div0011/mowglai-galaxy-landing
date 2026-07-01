"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import React from "react";

const FlashText = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="w-screen ml-[calc(50%-50vw)] min-h-[300px] md:min-h-[440px] flex flex-col items-center justify-center overflow-hidden relative py-12 md:py-20 gap-8 group"
        >
            {/* Dynamic Interactive Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px z-0 opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                    radial-gradient(
                        600px circle at ${smoothX}px ${smoothY}px,
                        rgba(var(--primary-rgb), 0.15),
                        transparent 80%
                    )
                    `
                }}
            />

            {/* Continuous Trail Above Button */}
            <div className="w-full overflow-hidden absolute top-12 md:top-20 left-0 flex items-center pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                <div className="flex animate-marquee whitespace-nowrap items-center">
                    {[...Array(4)].map((_, i) => (
                        <span key={i} className="px-10 font-display font-black text-4xl sm:text-5xl md:text-7xl uppercase italic tracking-tighter text-primary">
                            REFER AND EARN 10% COMMISSION •
                        </span>
                    ))}
                </div>
            </div>

            {/* Referral Button - Centered and prominent */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 mt-20 md:mt-28"
            >
                <Magnetic>
                    <Link
                        href="/referral"
                        className="group/btn relative block px-8 py-5 md:px-12 md:py-6 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs sm:text-sm md:text-lg rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden text-center"
                    >
                        <span className="relative z-10">CLICK HERE TO REFER</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </Link>
                </Magnetic>
                <p className="text-[10px] md:text-xs text-center mt-3 md:mt-4 uppercase tracking-widest opacity-60">
                    Get 10% commission for you & a friend
                </p>
            </motion.div>
        </div>
    );
};

export default FlashText;
