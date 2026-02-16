"use client";

import React from "react";
// Forced rebuild to fix loading issue
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Zap, Server, Shield, Globe, Cpu } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";

export default function NextJsDevelopmentPage() {
    return (
        <PageLayout>
            <main className="min-h-screen bg-transparent relative selection:bg-teal-500/30 pt-32 pb-20">
                {/* Background Elements */}
                {/* Global gradient background provided by layout */}
                <div className="fixed top-20 left-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
                <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

                <div className="container mx-auto px-6 relative z-10">

                    {/* Hero Section */}
                    <section className="flex flex-col items-center text-center mb-20 md:mb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm mb-8"
                        >
                            <Code2 className="w-4 h-4 text-teal-500" />
                            <span className="text-sm font-bold text-teal-500 uppercase tracking-widest">
                                The React Framework
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-8 leading-snug md:leading-tight pb-2"
                        >
                            Next.js <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400 bg-[length:200%_auto] animate-gradient">
                                Engineering
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-muted-foreground text-lg md:text-2xl max-w-3xl font-light leading-relaxed mb-12"
                        >
                            We build high-performance web applications that load instantly and scale infinitely. The future of the web is built on Next.js.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Magnetic>
                                <Link
                                    href="/start-project/nextjs"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 text-black text-lg font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all"
                                >
                                    Build with Next.js
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </section>

                    {/* Features Grid */}
                    <section className="mb-20 md:mb-32">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Zap className="w-8 h-8 text-yellow-400" />,
                                    title: "Performance First",
                                    desc: "Optimized for Core Web Vitals with automatic image optimization, font handling, and script loading."
                                },
                                {
                                    icon: <Globe className="w-8 h-8 text-blue-400" />,
                                    title: "SEO Ready",
                                    desc: "Server-side rendering and dynamic meta tags ensure your application ranks at the top of search results."
                                },
                                {
                                    icon: <Server className="w-8 h-8 text-purple-400" />,
                                    title: "Server Components",
                                    desc: "Leveraging React Server Components for smaller bundle sizes and faster initial page loads."
                                },
                                {
                                    icon: <Shield className="w-8 h-8 text-green-400" />,
                                    title: "Secure by Design",
                                    desc: "Built-in protection against XSS and other common vulnerabilities tailored for modern web apps."
                                },
                                {
                                    icon: <Cpu className="w-8 h-8 text-red-400" />,
                                    title: "Edge Computing",
                                    desc: "Deploy functions closer to your users for ultra-low latency and instant personalization."
                                },
                                {
                                    icon: <Code2 className="w-8 h-8 text-teal-400" />,
                                    title: "Modern Stack",
                                    desc: "Integration with Tailwind CSS, TypeScript, and Prisma for a robust development experience."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                                >
                                    <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-display font-bold uppercase mb-4 break-words">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm break-words">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Why Choose Us Section */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center mb-20 md:mb-32">
                        <div className="order-2 lg:order-1 relative mt-12 lg:mt-24">
                            <div className="aspect-square rounded-[2rem] bg-gradient-to-tr from-teal-500/20 via-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-3xl overflow-hidden p-8 flex items-center justify-center">
                                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                                <div className="relative z-10 text-center space-y-8">
                                    <Code2 className="w-24 h-24 text-teal-500 mx-auto" />
                                    <h3 className="text-4xl font-display font-black uppercase">We Speak React</h3>
                                    <p className="text-muted-foreground max-w-xs mx-auto">
                                        Our engineers are experts in the React ecosystem, delivering code that is clear, maintainable, and scalable.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-display font-black uppercase leading-tight">
                                Why Choose <span className="text-teal-500">Mowglai</span> for Next.js?
                            </h2>
                            <p className="text-xl text-muted-foreground font-light">
                                We don't just use frameworks; we master them. We build digital experiences that push the boundaries of what's possible on the web.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Custom Architectures Tailored to Your Business Logic",
                                    "Seamless Integration with Headless CMS",
                                    "Enterprise-Grade Security & Performance Audits",
                                    "Expertise in Vercel & AWS Deployment Pipelines"
                                ].map((point, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                                    >
                                        <div className="mt-1 w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
                                        <span className="text-lg font-medium">{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="relative rounded-[3rem] bg-teal-600 overflow-hidden px-6 py-24 text-center">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-tight">
                                Future-Proof Your Web Presence
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90 font-medium">
                                Upgrade to the latest standards with Next.js 15.
                            </p>
                            <div className="flex justify-center pt-8">
                                <Link
                                    href="/start-project/nextjs"
                                    className="px-10 py-5 bg-white text-teal-900 text-lg font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-2xl"
                                >
                                    Start Development
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </PageLayout>
    );
}
