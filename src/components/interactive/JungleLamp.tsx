"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// Particle emitted when lamp is clicked
function LampParticle({ x, y, color }: { x: number; y: number; color: string }) {
    const angle = Math.random() * Math.PI * 2;
    const dist  = 40 + Math.random() * 80;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                left: x,
                top: y,
                width: 4 + Math.random() * 4,
                height: 4 + Math.random() * 4,
                background: color,
                boxShadow: `0 0 8px ${color}`,
            }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
            transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
        />
    );
}

export default function JungleLamp() {
    const [isOn, setIsOn]           = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
    const lampRef                   = useRef<HTMLDivElement>(null);
    const counterRef                = useRef(0);

    // Gentle idle sway
    const swayProgress = useSpring(0, { stiffness: 60, damping: 12 });
    const rotation     = useTransform(swayProgress, [-1, 1], [-5, 5]);

    // Continuous idle sway animation
    useEffect(() => {
        let dir = 1;
        const interval = setInterval(() => {
            swayProgress.set(dir);
            dir *= -1;
        }, 1800);
        return () => clearInterval(interval);
    }, [swayProgress]);

    const handleTap = () => {
        setIsOn(v => !v);

        // Emit burst of particles from lamp center
        if (lampRef.current) {
            const rect   = lampRef.current.getBoundingClientRect();
            const cx     = rect.left + rect.width / 2;
            const cy     = rect.top + rect.height * 0.7;
            const colors = ["#F5D061", "#FFE600", "#fbbf24", "#a3e635", "#22c55e"];

            const newParticles = Array.from({ length: 14 }, () => ({
                id:    counterRef.current++,
                x:     cx,
                y:     cy,
                color: colors[Math.floor(Math.random() * colors.length)],
            }));
            setParticles(p => [...p, ...newParticles]);
            setTimeout(() => setParticles(p => p.filter(x => !newParticles.find(n => n.id === x.id))), 1300);
        }

        // Extra strong sway on click
        swayProgress.set(1.5);
        setTimeout(() => swayProgress.set(-1.5), 200);
        setTimeout(() => swayProgress.set(0.8), 500);
    };

    return (
        <div className="relative flex flex-col items-center select-none" ref={lampRef}>
            {/* Particles layer */}
            <div className="fixed inset-0 pointer-events-none z-[100]">
                {particles.map(p => (
                    <LampParticle key={p.id} x={p.x} y={p.y} color={p.color} />
                ))}
            </div>

            {/* Cord */}
            <motion.div
                style={{ rotate: rotation }}
                className="flex flex-col items-center origin-top"
            >
                {/* Hanging wire */}
                <div className="w-[2px] h-16 bg-gradient-to-b from-[#22c55e]/40 to-[#F5D061]/60" />

                {/* Lamp shade + bulb */}
                <button
                    onClick={handleTap}
                    aria-label={isOn ? "Turn lamp off" : "Turn lamp on"}
                    className="relative focus:outline-none group"
                >
                    {/* Outer glow when on */}
                    {isOn && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0.6, 0.3, 0.6], scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-8 rounded-full pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(245,208,97,0.35) 0%, transparent 70%)" }}
                        />
                    )}

                    {/* Lamp cone shade */}
                    <svg width="72" height="56" viewBox="0 0 72 56" className="drop-shadow-lg">
                        {/* Shade body — trapezoid */}
                        <path
                            d="M12 8 L60 8 L52 44 L20 44 Z"
                            fill={isOn ? "#1a3a0a" : "#0f2007"}
                            stroke={isOn ? "#F5D061" : "#22c55e"}
                            strokeWidth="1.5"
                        />
                        {/* Top rim */}
                        <rect x="8" y="4" width="56" height="8" rx="4"
                            fill={isOn ? "#2a5c14" : "#173009"}
                            stroke={isOn ? "#F5D061" : "#22c55e"}
                            strokeWidth="1"
                        />
                        {/* Bottom rim */}
                        <ellipse cx="36" cy="44" rx="17" ry="4"
                            fill={isOn ? "#1a3a0a" : "#0f2007"}
                            stroke={isOn ? "#FFE600" : "#22c55e"}
                            strokeWidth="1.5"
                        />

                        {/* Bulb */}
                        <motion.ellipse
                            cx="36" cy="38" rx="7" ry="9"
                            animate={{
                                fill: isOn ? "#FFE600" : "#1a3a0a",
                                filter: isOn ? "url(#glow)" : "none",
                            }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Glow filter */}
                        <defs>
                            <filter id="lamp-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>

                    {/* Light cone projection when ON */}
                    {isOn && (
                        <motion.div
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-[52px] left-1/2 -translate-x-1/2 origin-top pointer-events-none"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: "60px solid transparent",
                                borderRight: "60px solid transparent",
                                borderTop: "160px solid rgba(245,208,97,0.08)",
                                filter: "blur(12px)",
                            }}
                        />
                    )}
                </button>

                {/* Tap hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isOn ? 0 : 0.45 }}
                    transition={{ duration: 0.5 }}
                    className="mt-3 text-[10px] uppercase tracking-[0.35em] text-[#22c55e] font-display animate-pulse"
                >
                    tap me
                </motion.p>
            </motion.div>
        </div>
    );
}
