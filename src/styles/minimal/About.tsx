"use client";

import MinimalLayout from "./Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Palette, Shield, Rocket, Globe, BarChart, Headphones } from "lucide-react";

const features = [
    { id: 1, icon: Palette, title: "Modern & Stylish", description: "Creating modest yet visually striking designs tailored for any client profile." },
    { id: 2, icon: Shield, title: "Professional Grade", description: "Robust protocols ensuring your digital presence is secure and reliable." },
    { id: 3, icon: Rocket, title: "Peak Performance", description: "Optimized for speed and smoothness, respecting your user's time." },
    { id: 4, icon: Globe, title: "International Exp.", description: "Proven track record with leading firms across multiple continents." },
    { id: 5, icon: BarChart, title: "Client Centric", description: "We adapt to your specific needs, regardless of industry or scale." },
    { id: 6, icon: Headphones, title: "Flexible Schedule", description: "Active Mon-Sat across different time zones to match your workflow." },
];

export default function MinimalAbout() {
    const { t } = useLanguage();

    return (
        <MinimalLayout>
            <div className="bg-background text-foreground min-h-screen px-4 sm:px-8 md:px-24 py-32 font-serif overflow-hidden">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="border-b-[1px] md:border-b-2 border-foreground pb-12 mb-24"
                >
                    <h1 className="text-[15vw] md:text-[8vw] font-display font-medium leading-[0.8] tracking-tighter uppercase mb-8">
                        The Story <br /> <span className="italic text-foreground/40">of Mowglai</span>
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <p className="max-w-xl text-lg md:text-2xl font-body leading-relaxed text-foreground/70">
                            We are your flexible digital partners. Partnering with ambitious brands worldwide, we craft stylish, professional websites that fit your unique vision.
                        </p>
                        <div className="text-left md:text-right w-full md:w-auto mt-4 md:mt-0">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-body text-foreground/40">Est. 2025 / GLOBAL</span>
                        </div>
                    </div>
                </motion.div>

                {/* Narrative Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="lg:col-span-12 xl:col-span-5"
                    >
                        <div className="aspect-[4/3] xl:aspect-[3/4] bg-foreground/5 border border-foreground overflow-hidden relative grayscale group hover:grayscale-0 transition-all duration-700">
                            <img
                                src="/minimal_about_philosophy.png"
                                alt="Philosophy Sculpture"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-[20vw] font-display opacity-[0.08] select-none pointer-events-none group-hover:opacity-[0.1] transition-opacity">A</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="lg:col-span-12 xl:col-span-7 flex flex-col justify-center space-y-12"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase leading-none">
                            Digital <br /> <span className="italic">Artisans</span>
                        </h2>
                        <div className="space-y-6 text-base md:text-xl text-foreground/80 leading-relaxed font-body text-justify max-w-2xl">
                            <p>
                                At Mowglai, we believe that the most powerful digital experiences are those that communicate clearly without the need for excess. Our process is a rigorous exercise in reduction—stripping away the decorative to find the essential.
                            </p>
                            <p>
                                Every pixel, every interaction, and every line of code is intentional. We don't just build websites; we design digital landscapes that respect the user's intelligence and the brand's integrity.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid - Editorial Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-foreground mb-32">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div key={i} className="p-8 md:p-12 border border-foreground/10 hover:bg-foreground hover:text-background transition-all duration-500 group flex flex-col justify-between min-h-[300px]">
                                <div>
                                    <span className="text-[10px] uppercase font-body opacity-50 block mb-8">Feature {feature.id}</span>
                                    <Icon size={32} strokeWidth={1} className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <h4 className="text-2xl md:text-3xl font-display uppercase mb-4">{feature.title}</h4>
                                </div>
                                <p className="text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity duration-700 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Mission Quote */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-foreground text-background p-12 md:p-32 text-center mb-32"
                >
                    <h2 className="text-3xl md:text-6xl lg:text-7xl font-display font-light leading-tight italic max-w-5xl mx-auto px-4">
                        "In an era of noise, we choose the resonance of silence and the strength of form."
                    </h2>
                </motion.div>

                {/* Next Chapter CTA */}
                <div className="flex justify-center pt-24 border-t border-foreground">
                    <Link href="/services" className="group text-center">
                        <span className="text-xs tracking-[0.5em] uppercase text-foreground/40 block mb-8">Next Chapter</span>
                        <h4 className="text-5xl md:text-9xl font-display font-black uppercase transition-all group-hover:italic group-hover:tracking-widest duration-700">The Craft</h4>
                        <p className="mt-8 text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100">Explore Our Services</p>
                    </Link>
                </div>
            </div>
        </MinimalLayout>
    );
}
