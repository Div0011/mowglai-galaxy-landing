"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Rocket, Code2, Layout, Database, Shield, Zap, TrendingUp, Users } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import NextPageButton from "@/components/NextPageButton";
import Magnetic from "@/components/Magnetic";

export default function SaasMvpDevelopmentPage() {
    return (
        <PageLayout>
            <main className="min-h-screen bg-transparent relative selection:bg-primary/30 pt-32 pb-20">
                {/* Background Elements */}
                {/* Global gradient background provided by layout */}
                <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" />
                <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

                <div className="container mx-auto px-6 relative z-10">

                    {/* Hero Section */}
                    <section className="flex flex-col items-center text-center mb-20 md:mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-8"
                        >
                            <Rocket className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold text-primary uppercase tracking-widest">
                                Startup Launchpad
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-8 leading-snug md:leading-tight pb-2"
                        >
                            SaaS MVP <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-[length:200%_auto] animate-gradient">
                                Development
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-muted-foreground text-lg md:text-2xl max-w-3xl font-light leading-relaxed mb-12"
                        >
                            Validate your idea fast with a production-grade MVP. We build scalable SaaS products with clean architecture and rapid iteration cycles.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Magnetic>
                                <Link
                                    href="/start-project/saas"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all"
                                >
                                    Start Your MVP
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </section>

                    {/* Features Grid */}
                    <section className="mb-24 md:mb-32">
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Zap className="w-8 h-8 text-yellow-400" />,
                                    title: "Rapid Development",
                                    desc: "Go from concept to launch in 4-8 weeks. We prioritize core features to get you to market fast."
                                },
                                {
                                    icon: <Layout className="w-8 h-8 text-blue-400" />,
                                    title: "Scalable Architecture",
                                    desc: "Built on Next.js and robust cloud infrastructure that grows with your user base."
                                },
                                {
                                    icon: <Users className="w-8 h-8 text-green-400" />,
                                    title: "User-Centric UX",
                                    desc: "Beautiful, intuitive interfaces that convert visitors into loyal users from day one."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-display font-bold uppercase mb-4 break-words">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed break-words">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Tech Stack Marquee */}
                    <section className="mb-20 md:mb-32 overflow-hidden">
                        <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-12">
                            Powered by Modern Tech
                        </p>
                        <div className="flex w-full overflow-hidden mask-linear-fade">
                            <div className="flex gap-12 animate-marquee whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity min-w-full">
                                {[...["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS", "Vercel", "Prisma", "Stripe", "Supabase"], ...["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS", "Vercel", "Prisma", "Stripe", "Supabase"]].map((tech, i) => (
                                    <span key={i} className="text-4xl md:text-6xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Detailed Offerings */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center mb-20 md:mb-32">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-display font-black uppercase leading-tight">
                                What's included in your <br />
                                <span className="text-primary">MVP Package</span>
                            </h2>
                            <p className="text-xl text-muted-foreground font-light">
                                We don't just write code. We deliver a complete product ready for users and investors.
                            </p>

                            <div className="grid gap-4">
                                {[
                                    "Product Strategy & Roadmap",
                                    "UI/UX Design & Prototyping",
                                    "Full-Stack Development",
                                    "Database Design & Setup",
                                    "Authentication & Authorization",
                                    "Payment Gateway Integration",
                                    "Admin Dashboard",
                                    "Analytics & SEO Setup"
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-colors"
                                    >
                                        <div className="p-2 rounded-full bg-primary/20 text-primary">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="text-lg font-medium">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative mt-12 lg:mt-24">
                            <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-primary/20 to-purple-500/20 border border-white/10 backdrop-blur-3xl overflow-hidden p-8 flex items-center justify-center">
                                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                                <div className="relative z-10 text-center space-y-8">
                                    <div className="text-6xl font-display font-black">4-8</div>
                                    <div className="text-xl uppercase tracking-widest text-muted-foreground">Weeks Delivery</div>
                                    <div className="w-24 h-[1px] bg-white/20 mx-auto" />
                                    <div className="text-6xl font-display font-black">100%</div>
                                    <div className="text-xl uppercase tracking-widest text-muted-foreground">Ownership</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="relative rounded-[3rem] bg-primary overflow-hidden px-6 py-24 text-center">
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-6xl font-display font-black text-primary-foreground uppercase leading-tight">
                                Ready to Disrupt the Market?
                            </h2>
                            <p className="text-xl md:text-2xl text-primary-foreground/80 font-medium">
                                Let's turn your vision into a live product.
                            </p>
                            <div className="flex justify-center pt-8">
                                <Link
                                    href="/contact"
                                    className="px-10 py-5 bg-background text-foreground text-lg font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-2xl"
                                >
                                    Book Strategy Call
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </PageLayout>
    );
}
