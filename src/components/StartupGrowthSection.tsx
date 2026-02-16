"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Rocket, Code2, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";

const StartupGrowthSection = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    const cards = [
        {
            title: "SaaS MVP Development",
            description: "Validate ideas fast with production-grade MVPs built for scale.",
            icon: <Rocket className="w-6 h-6 text-primary" />,
            href: "/saas-mvp-development",
            color: "from-blue-500/20 to-purple-500/20",
        },
        {
            title: "Next.js Development",
            description: "High-performance web apps with clean architecture and SEO.",
            icon: <Code2 className="w-6 h-6 text-emerald-500" />,
            href: "/nextjs-development-agency",
            color: "from-emerald-500/20 to-teal-500/20",
        },
        {
            title: "Web Development India",
            description: "Expert full-stack teams for startups and enterprises.",
            icon: <Globe className="w-6 h-6 text-orange-500" />,
            href: "/web-development-agency-india",
            color: "from-orange-500/20 to-red-500/20",
        },
    ];

    return (
        <section className="relative pt-12 pb-24 overflow-hidden">
            {/* Background Elements - Simplified for Theme Matching */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary uppercase tracking-wider">
                            Startup Growth
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-black tracking-tight leading-[1.1] mb-4"
                    >
                        Launch Faster <br className="hidden md:block" /> with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-500 to-primary bg-[length:200%_auto] animate-gradient">
                            Mowglai
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl leading-relaxed"
                    >
                        Accelerate with focused paths for founders. From MVPs to scale, we have the blueprint.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-8 md:gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                    {/* Startup Growth Cards */}
                    {cards.map((card, index) => (
                        <motion.div key={index} variants={itemVariants} className="h-full">
                            <Link
                                href={card.href}
                                className="group relative block h-full p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 overflow-hidden"
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                <div className="relative z-10 flex flex-col h-full bg-transparent">
                                    <div className="mb-4 p-3 rounded-2xl bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                        {card.icon}
                                    </div>

                                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-white transition-colors">
                                        {card.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3">
                                        {card.description}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                                        Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default StartupGrowthSection;
