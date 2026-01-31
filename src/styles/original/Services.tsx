"use client";

import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import NextPageButton from "@/components/NextPageButton";

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
    const { t } = useLanguage();
    const { Services: s } = t;
    const servicesData = [
        { id: "01", ...s.cards.webDesign },
        { id: "02", ...s.cards.development },
        { id: "03", ...s.cards.redesign },
        { id: "04", ...s.cards.database },
        { id: "05", ...s.cards.strategy },
        { id: "06", ...s.cards.ai }
    ];

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-32 font-sans relative overflow-hidden">

                {/* Background Decor - Immersive Pulses */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -mr-20 -mt-20 pointer-events-none animate-pookie-float" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -ml-20 -mb-20 pointer-events-none animate-pulse" />

                {/* Header Section - Massive Regular Style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10 mt-12 md:mt-20 mb-32 flex flex-col md:flex-row justify-between items-end border-b-2 border-primary/20 pb-16 gap-12"
                >
                    <div>
                        <span className="text-sm md:text-base font-bold uppercase tracking-[0.5em] text-primary block mb-6">{s.hero.subtitle}</span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-tight uppercase tracking-tighter -ml-2 md:-ml-4">
                            <span className="text-primary italic">{s.hero.title}</span>
                        </h1>
                    </div>
                    <div className="text-left md:text-right max-w-md md:pb-4">
                        <p className="text-lg md:text-xl font-body leading-relaxed text-muted-foreground italic">
                            {s.hero.description}
                        </p>
                    </div>
                </motion.div>

                {/* Services Stack - Immersive List */}
                <div className="relative z-10 space-y-12">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-6 p-8 md:p-12 rounded-[2.5rem] bg-secondary/10 border border-primary/10 hover:border-primary/40 hover:bg-secondary/20 transition-all duration-700 backdrop-blur-xl overflow-hidden"
                        >
                            <div className="flex flex-col relative z-10 w-full">
                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
                                    {/* Left: Huge Serial Number */}
                                    <div className="shrink-0 select-none pointer-events-none">
                                        <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-primary/10 group-hover:text-primary transition-colors duration-700 leading-[0.8] tracking-tighter">
                                            {service.id}
                                        </span>
                                    </div>

                                    {/* Middle: Main Content */}
                                    <div className="flex flex-col gap-8 pt-4 lg:pt-8 relative flex-1">
                                        <div>
                                            <span className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-primary/80 mb-8 block">
                                                {service.category}
                                            </span>
                                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase text-foreground group-hover:text-primary transition-colors duration-500 leading-[1.05] tracking-tighter">
                                                {service.title}
                                            </h2>
                                        </div>
                                        <p className="text-lg md:text-2xl font-body font-light leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors duration-500 max-w-3xl">
                                            {service.description}
                                        </p>

                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-3 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-primary group-hover:gap-5 transition-all w-fit hover:text-foreground"
                                        >
                                            Initiate Development <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    {/* Right: Keywords (Desktop Side / Mobile Bottom) */}
                                    <div className="w-full lg:w-[40%] shrink-0 mt-8 lg:mt-0 pt-6 lg:pt-4 border-t lg:border-t-0 lg:border-l border-primary/10 lg:pl-6">
                                        <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3">
                                            {service.details.map((detail, i) => (
                                                <span key={i} className="px-6 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary/90 text-sm md:text-lg font-bold tracking-wider hover:bg-primary/20 hover:border-primary/40 transition-all cursor-default whitespace-nowrap shadow-sm">
                                                    {detail}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final Navigation & Decision */}
                <div className="mt-40 flex flex-col items-center gap-16 relative z-10">

                    {/* Explore Option */}
                    <div className="flex flex-col items-center gap-6 text-center" data-aos="fade-up">
                        <h3 className="text-xl md:text-3xl font-display font-bold text-foreground/80 uppercase tracking-wide">
                            Still exploring ideas?
                        </h3>
                        <Link
                            href="/explore"
                            className="px-12 py-5 rounded-full border border-primary text-primary font-display font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] text-sm md:text-base bg-background/5 backdrop-blur-sm"
                        >
                            Browse Blueprints
                        </Link>
                    </div>

                    {/* Investment Option */}
                    <div className="w-full">
                        <NextPageButton
                            label="INVESTMENT"
                            href="/investment"
                            tagline="Ready to Scale?"
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
