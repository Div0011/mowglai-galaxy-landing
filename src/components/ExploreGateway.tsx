"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ExploreGateway() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6 py-32"
        >
            {/* Radial glow backdrop */}
            <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(34,197,94,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 50% 80%, rgba(245,208,97,0.07) 0%, transparent 60%)",
                }}
            />

            {/* Animated grid lines */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #22c55e 1px, transparent 1px), linear-gradient(to bottom, #22c55e 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                        width: Math.random() * 4 + 2,
                        height: Math.random() * 4 + 2,
                        left: `${10 + i * 11}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        background: i % 2 === 0 ? "#22c55e" : "#F5D061",
                        opacity: 0.4,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                    }}
                />
            ))}

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-10">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3"
                >
                    <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#22c55e]" />
                    <span className="text-[#22c55e] text-xs font-bold uppercase tracking-[0.4em] font-display">
                        Ready to explore?
                    </span>
                    <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#22c55e]" />
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] text-transparent bg-clip-text"
                    style={{
                        backgroundImage:
                            "linear-gradient(135deg, #ffffff 0%, #F5D061 40%, #22c55e 100%)",
                    }}
                >
                    Enter the
                    <br />
                    <span className="italic">Jungle</span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl text-white/60 font-body max-w-xl leading-relaxed"
                >
                    Step into the full Mowglai experience — immersive 3D, cinematic animations, 
                    and our complete digital agency portfolio.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <Link
                        href="/home/"
                        id="explore-mowglai-btn"
                        className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 text-base md:text-lg font-bold uppercase tracking-[0.2em] font-display rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(245,208,97,0.08) 100%)",
                            border: "1.5px solid rgba(34,197,94,0.4)",
                            color: "#F5D061",
                            boxShadow:
                                "0 0 40px rgba(34,197,94,0.15), inset 0 0 40px rgba(34,197,94,0.03)",
                        }}
                    >
                        {/* Hover shimmer fill */}
                        <span
                            className="absolute inset-0 w-0 h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full rounded-full"
                            style={{
                                background:
                                    "linear-gradient(135deg, #14532d 0%, #22c55e 50%, #F5D061 100%)",
                            }}
                        />

                        <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
                            Explore Mowglai
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-current transition-all duration-300 group-hover:border-white group-hover:bg-white/20">
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                        </span>
                    </Link>
                </motion.div>

                {/* Scroll hint text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-white/25 text-xs font-body tracking-widest uppercase"
                >
                    The original Mowglai experience awaits
                </motion.p>
            </div>

            {/* Bottom border glow */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22c55e]/30 to-transparent" />
        </section>
    );
}
