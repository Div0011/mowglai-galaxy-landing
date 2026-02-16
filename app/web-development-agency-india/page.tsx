"use client";

import React from "react";
// Forced rebuild to fix loading issue
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Globe, Layers, Users, Zap, CheckCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";

export default function WebDevelopmentIndiaPage() {
    return (
        <PageLayout>
            <main className="min-h-screen bg-transparent relative selection:bg-orange-500/30 pt-32 pb-20">
                {/* Background Elements */}
                {/* Global gradient background provided by layout */}
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

                <div className="container mx-auto px-6 relative z-10">

                    {/* Hero Section */}
                    <section className="flex flex-col items-center text-center mb-20 md:mb-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm mb-8"
                        >
                            <Globe className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">
                                Global Standards, India Pricing
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter mb-8 leading-snug md:leading-tight pb-2"
                        >
                            Full Stack <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-[length:200%_auto] animate-gradient">
                                Web Innovation
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-muted-foreground text-lg md:text-2xl max-w-3xl font-light leading-relaxed mb-12"
                        >
                            We are a premier web development agency in India, delivering Silicon Valley quality code to startups and enterprises worldwide.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Magnetic>
                                <Link
                                    href="/start-project/web-dev"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-white text-lg font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all"
                                >
                                    Hire Our Team
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </section>

                    {/* Expertise Grid */}
                    <section className="mb-20 md:mb-32">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Code className="w-8 h-8 text-orange-400" />,
                                    title: "Custom Web Apps",
                                    desc: "Tailor-made solutions that solve specific business problems efficiently and elegantly."
                                },
                                {
                                    icon: <Database className="w-8 h-8 text-red-400" />,
                                    title: "Enterprise Systems",
                                    desc: "Scalable backend architectures capable of handling millions of requests with ease."
                                },
                                {
                                    icon: <Layers className="w-8 h-8 text-yellow-400" />,
                                    title: "API Development",
                                    desc: "Robust RESTful and GraphQL APIs designed for seamless third-party integrations."
                                },
                                {
                                    icon: <Zap className="w-8 h-8 text-purple-400" />,
                                    title: "PWA Solutions",
                                    desc: "Progressive Web Apps that work offline and provide a native-like experience."
                                },
                                {
                                    icon: <Users className="w-8 h-8 text-blue-400" />,
                                    title: "Team Augmentation",
                                    desc: "Extend your in-house team with our vetted developers who integrate perfectly."
                                },
                                {
                                    icon: <Globe className="w-8 h-8 text-green-400" />,
                                    title: "Global Delivery",
                                    desc: "Time-zone aligned workflows ensuring smooth collaboration across borders."
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

                    {/* Why India / Why Us */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center mb-20 md:mb-32">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-display font-black uppercase leading-tight">
                                World-Class Engineering <br />
                                <span className="text-orange-500">Global Reach</span>
                            </h2>
                            <p className="text-xl text-muted-foreground font-light">
                                Leverage India's tech talent without compromising on quality or communication. We bridge the gap.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Cost-Effective Development without Quality Trade-offs",
                                    "Agile Methodologies & Transparent Reporting",
                                    "English-First Communication Culture",
                                    "Overlap Hours for Real-Time Collaboration"
                                ].map((point, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                                    >
                                        <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                                        <span className="text-lg font-medium">{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative mt-12 lg:mt-24">
                            <div className="aspect-square rounded-[2rem] bg-gradient-to-tr from-orange-500/20 via-red-500/20 to-yellow-500/20 border border-white/10 backdrop-blur-3xl overflow-hidden p-8 flex items-center justify-center">
                                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                                <div className="relative z-10 text-center space-y-8">
                                    <Globe className="w-24 h-24 text-orange-500 mx-auto" />
                                    <div className="text-6xl font-display font-black">20+</div>
                                    <div className="text-xl uppercase tracking-widest text-muted-foreground">Countries Served</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="relative rounded-[3rem] bg-orange-600 overflow-hidden px-6 py-24 text-center">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase leading-tight">
                                Scale Your Tech Team
                            </h2>
                            <p className="text-xl md:text-2xl text-white/90 font-medium">
                                Partner with India's best web engineering talent.
                            </p>
                            <div className="flex justify-center pt-8">
                                <Link
                                    href="/start-project/custom-quote"
                                    className="px-10 py-5 bg-white text-orange-900 text-lg font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-2xl"
                                >
                                    Get a Quote
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </PageLayout>
    );
}
