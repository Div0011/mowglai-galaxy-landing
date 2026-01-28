"use client";

import MinimalLayout from "./Layout";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Layers, Code2, Zap, Rocket } from "lucide-react";

const workflow = [
    {
        id: "01",
        title: "Discovery & Strategy",
        desc: "We dive deep into your business, understanding your goals, audience, and competitive landscape.",
        icon: Target,
        details: ["Market Research", "Competitor Analysis", "User Personas", "Objectives Mapping"]
    },
    {
        id: "02",
        title: "Design & Architecture",
        desc: "Crafting wireframes and visual designs that blend aesthetics with functionality.",
        icon: Layers,
        details: ["UI/UX Design", "Information Architecture", "Brand Integration", "Responsive Mockups"]
    },
    {
        id: "03",
        title: "Development & Engineering",
        desc: "Building robust, scalable code with the latest technologies and best practices.",
        icon: Code2,
        details: ["Frontend Development", "Backend Integration", "Database Design", "API Development"]
    },
    {
        id: "04",
        title: "Testing & Optimization",
        desc: "Rigorous testing ensures every pixel and line of code works flawlessly.",
        icon: Zap,
        details: ["Performance Testing", "Cross-browser Testing", "SEO Optimization", "Security Audits"]
    },
    {
        id: "05",
        title: "Launch & Beyond",
        desc: "Deployment with ongoing support, monitoring, and continuous improvement.",
        icon: Rocket,
        details: ["Deployment Strategy", "Analytics Setup", "Documentation", "24/7 Support"]
    }
];

export default function MinimalDNA() {
    return (
        <MinimalLayout>
            <div className="bg-background text-foreground min-h-screen px-4 md:px-24 py-24 font-serif">
                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 md:mb-48 border-b border-foreground pb-12"
                >
                    <h1 className="text-[18vw] md:text-[10vw] font-display font-black leading-[0.7] uppercase tracking-tighter">
                        Our <br /> <span className="italic text-foreground/40">DNA</span>
                    </h1>
                    <div className="mt-12 flex flex-col md:flex-row justify-between items-start gap-12">
                        <p className="max-w-2xl text-xl md:text-3xl font-body leading-tight text-foreground/80">
                            Welcome to Mowglai. Here is how we craft world-class digital experiences for international clients through precision and creativity.
                        </p>
                        <div className="space-y-4">
                            <div className="text-right">
                                <span className="text-sm uppercase tracking-[0.3em] font-body text-foreground/50">Est. 2025 / GLOBAL</span>
                            </div>
                            <div className="text-base font-medium uppercase tracking-widest font-body border-l-2 border-foreground pl-4">
                                Immersive Design <br /> Technical Precision <br /> Strategic Growth
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Workflow - timeline style */}
                <div className="space-y-24 md:space-y-32">
                    {workflow.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
                            <div className="md:col-span-2">
                                <span className="text-6xl md:text-8xl font-display italic opacity-10 leading-none">{item.id}</span>
                            </div>
                            <div className="md:col-span-5 pt-4">
                                <h3 className="text-3xl md:text-5xl font-display uppercase mb-6">{item.title}</h3>
                                <div className="w-12 h-[1px] bg-foreground mb-6"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                    {item.details.map((detail, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-foreground/40" />
                                            <span className="text-sm uppercase tracking-widest font-body">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-12 lg:md:col-span-5 pt-4">
                                <p className="text-lg md:text-xl font-body text-foreground/60 leading-relaxed text-justify">
                                    {item.desc}
                                </p>
                            </div>
                            {/* Horizontal Line Connecting Steps */}
                            <div className="absolute -bottom-12 md:-bottom-16 left-0 w-full h-[1px] bg-foreground/5"></div>
                        </div>
                    ))}
                </div>

                {/* Principles - Technical Cards */}
                <div className="mt-48 md:mt-64 grid grid-cols-1 md:grid-cols-3 gap-0 border border-foreground">
                    {[
                        { t: "User-Centric", d: "Every decision is made with your end user in mind." },
                        { t: "Performance", d: "Lightning-fast load times and smooth interactions." },
                        { t: "Scalable", d: "Built to grow with your business needs." },
                        { t: "Clean Code", d: "Maintainable, well-documented, future-proof code." },
                        { t: "Clarity", d: "Communication without noise." },
                        { t: "Integrity", d: "Vision without compromise." }
                    ].map((p, i) => (
                        <div key={i} className="p-8 md:p-12 border border-foreground/10 hover:bg-foreground hover:text-background transition-all duration-500 group flex flex-col justify-between min-h-[300px]">
                            <div>
                                <span className="text-sm uppercase font-body opacity-60 block mb-8">Principle {i + 1}</span>
                                <h4 className="text-3xl md:text-5xl font-display uppercase mb-4">{p.t}</h4>
                            </div>
                            <p className="text-base font-body opacity-0 group-hover:opacity-100 transition-opacity duration-700">{p.d}</p>
                        </div>
                    ))}
                </div>

                {/* Footer Quote */}
                <div className="mt-48 md:mt-64 text-center">
                    <h2 className="text-[12vw] md:text-[8vw] font-display uppercase leading-tight opacity-[0.08] select-none pointer-events-none mb-4">Refinement</h2>
                    <p className="max-w-xl mx-auto text-base font-body uppercase tracking-[0.3em] text-foreground/60 px-4 mt-8">
                        The evolution of digital excellence requires an unwavering commitment to the fundamentals.
                    </p>
                </div>
            </div>
        </MinimalLayout>
    );
}
