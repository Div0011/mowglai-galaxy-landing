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
        { id: "01", ...s.cards.ai }, // AI now first
        { id: "02", ...s.cards.webDesign },
        { id: "03", ...s.cards.development },
        { id: "04", ...s.cards.redesign },
        { id: "05", ...s.cards.database },
        { id: "06", ...s.cards.strategy }
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
                    className="relative z-10 mt-12 md:mt-20 mb-32 flex flex-col md:flex-row justify-between items-end border-b-2 border-primary/20 pb-16 gap-12 max-w-7xl mx-auto"
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
                <div className="relative z-10 space-y-12 max-w-7xl mx-auto">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                            className="group relative p-8 md:p-12 rounded-[2.5rem] bg-secondary/10 border border-primary/10 hover:border-primary/40 hover:bg-secondary/20 transition-all duration-700 backdrop-blur-xl overflow-hidden shadow-2xl"
                        >
                            <div className="flex flex-col relative z-10 w-full">
                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                                    {/* Left: Huge Serial Number */}
                                    <div className="shrink-0 select-none pointer-events-none lg:pt-8">
                                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-700 leading-none tracking-tighter">
                                            {service.id}
                                        </span>
                                    </div>

                                    {/* Middle: Main Content */}
                                    <div className="flex flex-col gap-8 pt-4 lg:pt-8 relative flex-1">
                                        <div>
                                            <span className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-primary/80 mb-2 block">
                                                {service.category}
                                            </span>
                                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase text-foreground group-hover:text-primary transition-colors duration-500 leading-[1.2] tracking-tight">
                                                {service.title}
                                            </h2>
                                        </div>
                                        <p className="text-lg md:text-xl font-body font-light leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                                            {service.description}
                                        </p>

                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-3 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-primary group-hover:gap-5 transition-all w-fit hover:text-foreground mt-4"
                                        >
                                            Initiate Development <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>

                                    {/* Right: Keywords (Desktop Side / Mobile Bottom) */}
                                    <div className="w-full lg:w-[30%] shrink-0 mt-8 lg:mt-0 pt-6 lg:pt-4 border-t lg:border-t-0 lg:border-l border-primary/10 lg:pl-10">
                                        <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2.5">
                                            {service.details.map((detail, i) => (
                                                <span key={i} className="px-6 py-3 rounded-full border border-primary/20 bg-primary/10 text-primary font-bold text-xs sm:text-sm md:text-base tracking-widest hover:bg-primary/20 hover:border-primary/40 transition-all cursor-default shadow-sm text-right whitespace-nowrap">
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
                <div className="mt-40 flex flex-col items-center gap-16 relative z-10 py-20">

                    {/* Catchy Explore Option with Marquee Trail */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <p className="relative z-10 text-xs md:text-sm font-display tracking-widest uppercase mb-6 text-muted-foreground/60" data-aos="fade-up">
                            Wish to Explore our Blueprints?
                        </p>

                        <div className="relative w-full flex items-center justify-center">
                            {/* Background Trail behind Blueprints button - Center-aligned to button */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-screen -translate-y-1/2 transform pointer-events-none z-0 overflow-hidden">
                                <div className="flex animate-marquee-slow whitespace-nowrap gap-10 items-center py-4">
                                    {[...Array(6)].map((_, groupIndex) => (
                                        <div key={groupIndex} className="flex gap-10 md:gap-20 items-center px-6 md:px-10">
                                            {["Templates", "E-Commerce", "Portfolio", "Medical", "Agency", "Startup", "Wellness", "SaaS"].map((label, i) => (
                                                <span key={i} className="text-xl sm:text-2xl md:text-3xl font-display font-black text-foreground/30 uppercase tracking-[0.2em] leading-none">
                                                    {label}
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/explore"
                                className="relative z-10 px-6 sm:px-14 py-4 sm:py-6 rounded-full bg-primary text-primary-foreground font-display font-black uppercase tracking-[0.2em] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] text-sm sm:text-base md:text-xl group"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <span className="flex items-center gap-3">
                                    Browse Blueprints <ArrowRight className="group-hover:translate-x-2 transition-transform h-6 w-6" />
                                </span>
                            </Link>
                        </div>

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
