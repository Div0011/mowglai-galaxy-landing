"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

const commissionItems = [
    {
        title: "Web Development",
        description: "Custom websites built for performance and scale",
        href: "/web-development-agency-india",
        position: "top" as const,
        icon: "💻"
    },
    {
        title: "SaaS Platforms",
        description: "Full-stack applications with modern architecture",
        href: "/saas-mvp-development",
        position: "right" as const,
        icon: "🚀"
    },
    {
        title: "3D Experiences",
        description: "Immersive web experiences with Three.js",
        href: "/services",
        position: "bottom" as const,
        icon: "🎨"
    },
    {
        title: "SEO & GEO",
        description: "Visibility optimization for search and AI engines",
        href: "/services",
        position: "left" as const,
        icon: "🔍"
    }
];

export default function CommissionSection() {
    return (
        <section className="relative w-full min-h-screen flex flex-col justify-center py-20 z-20 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 text-primary font-display font-bold text-xs tracking-[0.4em] uppercase mb-4">
                        <div className="w-10 h-[1.5px] bg-primary" />
                        Commission
                        <div className="w-10 h-[1.5px] bg-primary" />
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-foreground uppercase leading-none">
                        Create Your <span className="text-primary italic">Vision</span>
                    </h2>
                    <p className="text-foreground/50 text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
                        Transform your ideas into reality with our specialized digital services.
                    </p>
                </motion.div>

                <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                            <line x1="50" y1="300" x2="550" y2="300" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" strokeDasharray="5,5">
                                <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="30s" repeatCount="indefinite" />
                            </line>
                            <line x1="300" y1="50" x2="300" y2="550" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" strokeDasharray="5,5">
                                <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="25s" repeatCount="indefinite" />
                            </line>
                            <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="40s" repeatCount="indefinite" />
                        </svg>
                    </div>

                    {commissionItems.map((item, idx) => {
                        const positions = {
                            top: { top: "50px", left: "50%", transform: "translateX(-50%)" },
                            right: { top: "50%", right: "50px", transform: "translateY(-50%)" },
                            bottom: { bottom: "50px", left: "50%", transform: "translateX(-50%)" },
                            left: { top: "50%", left: "50px", transform: "translateY(-50%)" }
                        };

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                style={positions[item.position]}
                                className="absolute"
                            >
                                <Magnetic>
                                    <Link href={item.href}>
                                        <div className="group relative w-40 h-40 md:w-48 md:h-48 rounded-3xl border border-primary/30 bg-background/50 backdrop-blur-xl flex flex-col items-center justify-center p-4 hover:border-primary hover:scale-105 transition-all duration-500">
                                            <div className="text-3xl mb-2">{item.icon}</div>
                                            <h3 className="text-sm md:text-base font-display font-bold text-foreground text-center group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-foreground/50 mt-1 text-center hidden md:block">
                                                {item.description}
                                            </p>
                                        </div>
                                    </Link>
                                </Magnetic>
                            </motion.div>
                        );
                    })}

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Magnetic>
                            <Link href="/custom-request">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary flex items-center justify-center shadow-[0_0_60px_rgba(230,185,61,0.5)] z-20 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-green-600/20 animate-pulse" />
                                    <span className="relative z-10 text-center text-primary-foreground font-display font-black text-xs md:text-sm uppercase tracking-widest">
                                        Start Project
                                    </span>
                                </motion.div>
                            </Link>
                        </Magnetic>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] border-2 border-primary/10 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[280px] h-[200px] md:h-[280px] border-2 border-primary/5 rounded-full" />
                </div>
            </div>
        </section>
    );
}