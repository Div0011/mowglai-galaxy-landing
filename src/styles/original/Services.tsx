"use client";

import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    {
        id: "01",
        category: "Web Design",
        title: "Aesthetic Excellence",
        desc: "Visual narratives that merge artistic expression with functional precision. Crafting stunning, responsive interfaces."
    },
    {
        id: "02",
        category: "Development",
        title: "Robust Engineering",
        desc: "Scalable, secure, and lightning-fast architectures. Building the solid foundations that drive digital growth."
    },
    {
        id: "03",
        category: "Redesign",
        title: "Digital Evolution",
        desc: "Breathing new life into legacy platforms. Enhancing usability, speed, and security for the modern era."
    },
    {
        id: "04",
        category: "Database",
        title: "Data Intelligence",
        desc: "Sophisticated database solutions ensuring information is organized, accessible, and impenetrable."
    },
    {
        id: "05",
        category: "Strategy",
        title: "Global Reach",
        desc: "Positioning your brand on the global map. Ensuring you resonate with audiences across cultures and borders."
    },
    {
        id: "06",
        category: "Intelligence",
        title: "Intelligent Systems",
        desc: "Empowering platforms with next-gen AI. From smart chatbots to predictive analytics and automation."
    }
];

export default function OriginalServices() {
    return (
        <PageLayout>
            <div className="bg-background text-foreground min-h-screen px-4 md:px-24 py-32 font-sans relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 mt-12 md:mt-20 mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-end border-b border-primary/20 pb-12"
                >
                    <h1 className="text-5xl md:text-8xl font-display font-black leading-tight uppercase tracking-tighter">
                        Our <br /> <span className="text-primary">Services</span>
                    </h1>
                    <div className="text-left md:text-right max-w-sm md:pb-4 mt-8 md:mt-0">
                        <span className="text-xs uppercase tracking-[0.2em] font-body text-primary block mb-4">Capabilities</span>
                        <p className="text-lg font-body leading-relaxed text-muted-foreground">
                            Capabilities woven into digital reality. Designing and developing for a world that demands better interaction.
                        </p>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <div className="relative z-10 grid grid-cols-1 gap-8 md:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-8 md:p-12 rounded-3xl bg-secondary/30 border border-primary/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]"
                        >
                            <div className="md:col-span-1">
                                <span className="text-2xl md:text-3xl font-display font-bold text-primary/50 group-hover:text-primary transition-colors">/{service.id}</span>
                            </div>
                            <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-center">
                                <span className="text-xs uppercase tracking-[0.2em] font-body text-muted-foreground mb-3">{service.category}</span>
                                <h2 className="text-3xl md:text-5xl font-display uppercase group-hover:text-primary transition-colors duration-500 leading-none">{service.title}</h2>
                            </div>
                            <div className="md:col-span-12 lg:col-span-6 flex flex-col justify-center mt-4 lg:mt-0">
                                <p className="text-lg md:text-xl font-body leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors max-w-xl">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Methodology Section */}
                <div className="relative z-10 mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div className="space-y-12">
                        <h3 className="text-4xl font-display uppercase tracking-wider text-foreground">Methodology</h3>
                        <div className="space-y-10">
                            {[
                                { t: "Immersion", d: "First, we inhabit your brand. Understanding the nuances of your vision and the friction of your challenges." },
                                { t: "Reduction", d: "We strip away the noise. Only what is necessary survives the transition from idea to artifact." },
                                { t: "Refinement", d: "Iteration is constant. We polish every interaction until it feels effortless." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-8">
                                    <span className="font-display font-bold text-4xl text-primary/50">0{i + 1}</span>
                                    <div>
                                        <h4 className="font-display font-bold uppercase tracking-widest text-lg mb-3 text-foreground">{item.t}</h4>
                                        <p className="font-body text-muted-foreground leading-relaxed text-base">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="aspect-square rounded-[3rem] overflow-hidden border border-primary/20 shadow-2xl relative group bg-secondary/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50 mix-blend-overlay" />
                        <div className="absolute inset-0 flex items-center justify-center text-[20vw] font-display font-black text-primary opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-1000">S</div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="relative z-10 mt-32 md:mt-48 py-24 md:py-32 border-t border-primary/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
                        <div className="flex-1">
                            <span className="text-xs uppercase tracking-[0.3em] font-body text-primary block mb-6">Next Steps</span>
                            <Link href="/explore" className="group block">
                                <h4 className="text-5xl md:text-7xl font-display uppercase leading-none hover:text-primary transition-all duration-500 py-4 flex items-center gap-4 justify-center md:justify-start">
                                    Explore <ArrowRight className="w-12 h-12 md:w-20 md:h-20 opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0 transition-all duration-500" />
                                </h4>
                                <p className="mt-2 text-sm md:text-base font-body uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">View our latest artifacts and systems</p>
                            </Link>
                        </div>
                        <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right">
                            <span className="text-xs uppercase tracking-[0.3em] font-body text-primary block mb-6">Inquiry</span>
                            <Link href="/contact" className="group block">
                                <h4 className="text-5xl md:text-7xl font-display uppercase leading-none hover:text-primary transition-all duration-500 py-4 flex items-center gap-4 justify-center md:justify-end">
                                    <ArrowRight className="w-12 h-12 md:w-20 md:h-20 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500 rotate-180 md:rotate-0" /> Contact
                                </h4>
                                <p className="mt-2 text-sm md:text-base font-body uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">Skip the gallery and start a dialogue</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
