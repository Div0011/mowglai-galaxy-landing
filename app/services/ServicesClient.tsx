"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

import { useLanguage } from "@/context/LanguageContext";

const servicesConfig = [
    {
        id: "01",
        key: "webDesign",
        icon: Palette,
        color: "from-amber-500/5 to-orange-500/5",
        border: "border-amber-500/20",
        text: "text-amber-500",
        glow: "shadow-[0_0_50px_-20px_rgba(245,158,11,0.3)]"
    },
    {
        id: "02",
        key: "development",
        icon: Rocket,
        color: "from-blue-500/5 to-cyan-500/5",
        border: "border-blue-500/20",
        text: "text-blue-500",
        glow: "shadow-[0_0_50px_-20px_rgba(59,130,246,0.3)]"
    },
    {
        id: "03",
        key: "redesign",
        icon: Shield,
        color: "from-purple-500/5 to-pink-500/5",
        border: "border-purple-500/20",
        text: "text-purple-500",
        glow: "shadow-[0_0_50px_-20px_rgba(168,85,247,0.3)]"
    },
    {
        id: "04",
        key: "database",
        icon: BarChart,
        color: "from-red-500/5 to-rose-500/5",
        border: "border-red-500/20",
        text: "text-red-500",
        glow: "shadow-[0_0_50px_-20px_rgba(239,68,68,0.3)]"
    },
    {
        id: "05",
        key: "strategy",
        icon: Globe,
        color: "from-emerald-500/5 to-green-500/5",
        border: "border-emerald-500/20",
        text: "text-emerald-500",
        glow: "shadow-[0_0_50px_-20px_rgba(16,185,129,0.3)]"
    },
    {
        id: "06",
        key: "ai",
        icon: Bot,
        color: "from-indigo-500/5 to-violet-500/5",
        border: "border-indigo-500/20",
        text: "text-indigo-500",
        glow: "shadow-[0_0_50px_-20px_rgba(99,102,241,0.3)]"
    }
] as const;

export default function ServicesClient() {
    const { t } = useLanguage();

    const services = servicesConfig.map(config => {
        // @ts-ignore - The keys match but typescript might need more strict typing
        const content = t.Services.cards[config.key];
        return {
            ...config,
            ...content
        };
    });

    return (
        <PageLayout>
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl sm:text-7xl md:text-[10vw] font-display font-black text-foreground mb-6 leading-[0.85] uppercase">
                        <span className="block opacity-10"><TextReveal text={t.Services.hero.subtitle} /></span>
                        <span className="block text-primary -mt-4 uppercase"><TextReveal text={t.Services.hero.title} delay={2} /></span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        {t.Services.hero.description}
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

            <NextPageButton label="THE VALUE" href="/investment" />
        </PageLayout>
    );
}

interface Service {
    id: string;
    category: string;
    title: string;
    description: string;
    details: string[];
    icon: React.ElementType; // Changed from any to React.ElementType
    color: string;
    border: string;
    text: string;
    glow: string;
}

const ServicePanel = ({ service, index }: { service: Service, index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalServices />}
            {style === "minimal" && <MinimalServices />}
            {style === "candy" && <CandyServices />}
        </Suspense>
    );
}
