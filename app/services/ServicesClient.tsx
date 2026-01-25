"use client";

import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Palette, Shield, Rocket, Globe, BarChart, Bot } from "lucide-react";
import NextPageButton from "@/components/NextPageButton";
import TextReveal from "@/components/TextReveal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
    {
        id: "01",
        category: "Web Design",
        title: "Aesthetic Excellence",
        description: "Your website is the digital face of your brand. We craft visually stunning, responsive interfaces that merge artistic expression with functional precision.",
        details: ["UI/UX Design", "Motion Graphics", "Brand Identity", "Responsive Layouts", "Mobile First"],
        icon: Palette,
        color: "from-amber-500/5 to-orange-500/5",
        border: "border-amber-500/20",
        text: "text-amber-500",
        glow: "shadow-[0_0_50px_-20px_rgba(245,158,11,0.3)]"
    },
    {
        id: "02",
        category: "Development",
        title: "Robust Engineering",
        description: "Beneath the beauty lies a beast. Our development team builds scalable, secure, and lightning-fast architectures that drive your business forward.",
        details: ["Full-Stack Dev", "E-Commerce", "CMS Solutions", "API Integration"],
        icon: Rocket,
        color: "from-blue-500/5 to-cyan-500/5",
        border: "border-blue-500/20",
        text: "text-blue-500",
        glow: "shadow-[0_0_50px_-20px_rgba(59,130,246,0.3)]"
    },
    {
        id: "03",
        category: "Redesign",
        title: "Digital Evolution",
        description: "Outdated shouldn't mean obsolete. We breathe new life into legacy platforms. Enhance usability, improve speed, and secure your digital future.",
        details: ["Visual Overhaul", "Performance Optimization", "Security Patching", "UX Strategy"],
        icon: Shield,
        color: "from-purple-500/5 to-pink-500/5",
        border: "border-purple-500/20",
        text: "text-purple-500",
        glow: "shadow-[0_0_50px_-20px_rgba(168,85,247,0.3)]"
    },
    {
        id: "04",
        category: "Database",
        title: "Data Intelligence",
        description: "We design sophisticated database solutions that ensure your information is organized, accessible, and impenetrable. We handle the backbone of your application.",
        details: ["Database Architecture", "Cloud Migration", "Data Security", "Performance Tuning"],
        icon: BarChart,
        color: "from-red-500/5 to-rose-500/5",
        border: "border-red-500/20",
        text: "text-red-500",
        glow: "shadow-[0_0_50px_-20px_rgba(239,68,68,0.3)]"
    },
    {
        id: "05",
        category: "Strategy",
        title: "Global Reach",
        description: "Our strategies are designed to position your brand on the global map, ensuring you resonate with audiences across cultures and borders.",
        details: ["Market Analysis", "SEO Strategy", "Content Curation", "Growth Hacking"],
        icon: Globe,
        color: "from-emerald-500/5 to-green-500/5",
        border: "border-emerald-500/20",
        text: "text-emerald-500",
        glow: "shadow-[0_0_50px_-20px_rgba(16,185,129,0.3)]"
    },
    {
        id: "06",
        category: "Artificial Intelligence",
        title: "Intelligent Systems",
        description: "Empower your platform with next-gen AI. From smart chatbots to predictive analytics, we integrate intelligence into your digital ecosystem.",
        details: ["AI Chatbots", "Machine Learning", "Automation", "Integrations"],
        icon: Bot,
        color: "from-indigo-500/5 to-violet-500/5",
        border: "border-indigo-500/20",
        text: "text-indigo-500",
        glow: "shadow-[0_0_50px_-20px_rgba(99,102,241,0.3)]"
    }
];

export default function ServicesClient() {
    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl sm:text-7xl md:text-[10vw] font-display font-black text-foreground mb-6 leading-[0.85] uppercase">
                        <span className="block opacity-10"><TextReveal text="Our" /></span>
                        <span className="block text-primary -mt-4 uppercase"><TextReveal text="Services" delay={2} /></span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        Capabilities woven into digital reality.
                    </p>
                </div>
            </section>

            {/* Alternating Expansion Section */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="container mx-auto px-0 md:px-6 flex flex-col gap-12 sm:gap-24">
                    {services.map((service, index) => (
                        <ServicePanel key={service.id} service={service} index={index} />
                    ))}
                </div>
            </section>

            <NextPageButton label="VIEW INVESTMENTS" href="/investment" />
        </PageLayout>
    );
}

const ServicePanel = ({ service, index }: { service: any, index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={cn(
            "w-full flex",
            isEven ? "justify-end" : "justify-start"
        )}>
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                whileHover={{ scale: 1.02, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                style={{ originX: isEven ? 1 : 0 }}
                className={cn(
                    "w-full md:w-[90%] lg:w-[85%] relative rounded-[2.5rem] overflow-hidden border backdrop-blur-3xl",
                    "min-h-[350px] md:min-h-[400px] flex flex-col md:flex-row",
                    service.border,
                    service.glow
                )}
            >
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-100",
                    service.color
                )} />

                <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center w-full">
                    <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 md:w-1/4 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6"
                        >
                            <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg", service.text)}>
                                <service.icon size={40} strokeWidth={1.5} />
                            </div>
                            <span className="text-6xl md:text-8xl font-display font-black text-foreground/5">{service.id}</span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex-1 space-y-6"
                    >
                        <div className="space-y-2">
                            <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-base font-bold text-primary uppercase tracking-wider mb-2">
                                {service.category}
                            </div>
                            <h2 className="text-xl sm:text-3xl md:text-5xl font-display font-bold text-foreground leading-[1.1]">
                                {service.title}
                            </h2>
                        </div>

                        <p className="text-[22px] text-muted-foreground leading-relaxed max-w-2xl">
                            {service.description}
                        </p>

                        <div className="pt-6 border-t border-foreground/5 flex flex-wrap gap-3">
                            {service.details.map((tag: string, i: number) => (
                                <span key={i} className="text-lg font-medium text-foreground/70 flex items-center gap-2">
                                    <div className={cn("w-1.5 h-1.5 rounded-full", service.text.replace('text-', 'bg-'))} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
