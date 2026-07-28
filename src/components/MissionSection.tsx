"use client";

import { useRef } from "react";
import Link from "next/link";
import { Fingerprint } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

const MissionSection = () => {
    const { t } = useLanguage();
    const btnRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        const icon = btn.querySelector('.btn-icon');
        if (icon) gsap.to(icon, { x: x * 0.1, y: y * 0.1, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        const btn = btnRef.current;
        if (!btn) return;
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        const icon = btn.querySelector('.btn-icon');
        if (icon) gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    return (
        <section id="mission" className="relative w-full py-20 md:py-32 z-20 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="mb-16 md:mb-24 text-center relative"
                >
                    <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-normal flex flex-col items-center select-none">
                        <span className="leading-tight opacity-20 uppercase text-foreground">
                            {t.About.mission.global}
                        </span>
                        <span className="text-primary leading-tight uppercase -mt-2 sm:-mt-4">
                            {t.About.mission.vision}
                        </span>
                    </h2>

                    {/* Decorative Backdrop Watermark */}
                    <div className="absolute -top-8 md:-top-16 left-0 w-full text-center opacity-[0.03] select-none pointer-events-none font-display font-black text-[14vw] md:text-[18vw] leading-none whitespace-nowrap uppercase">
                        VISION
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

                    {/* Left Column: Heading, Accent Line, & DNA CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="space-y-8"
                    >
                        <div>
                            <p className="text-primary font-display tracking-[0.4em] uppercase text-xs md:text-sm font-bold mb-3">
                                {t.About.mission.internationalStandard}
                            </p>
                            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] uppercase">
                                {t.About.mission.builtFor}{" "}
                                <span className="text-primary/70 block sm:inline">
                                    {t.About.mission.theWorld}
                                </span>
                            </h3>
                        </div>

                        <div className="h-1 w-28 bg-gradient-to-r from-primary to-primary/20 rounded-full" />

                        <p className="text-lg md:text-xl text-foreground/80 font-light leading-relaxed max-w-lg">
                            {t.About.mission.description}
                        </p>

                        {/* Interactive Magnetic DNA Button */}
                        <div className="pt-4">
                            <Link
                                ref={btnRef}
                                href="/our-dna"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="group relative inline-flex items-center gap-4 px-6 sm:px-8 py-4 bg-background/60 backdrop-blur-md border border-primary/20 hover:border-primary rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] cursor-pointer"
                            >
                                <div className="btn-icon relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary transition-colors duration-500 shrink-0">
                                    <Fingerprint className="w-6 h-6 text-primary group-hover:text-background transition-colors duration-500" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="font-display font-bold text-primary tracking-[0.2em] uppercase text-sm group-hover:text-foreground transition-colors">
                                        {t.About.mission.discover}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground tracking-widest uppercase group-hover:text-primary transition-colors">
                                        {t.About.mission.ourDna}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column: Quote Card & Highlight Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Quote Block */}
                        <div className="p-8 md:p-10 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-background/80 via-primary/5 to-background/40 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-primary/40 transition-all duration-500">
                            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                            <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug text-foreground italic mb-6">
                                {t.About.mission.quote}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-0.5 bg-primary/40" />
                                <span className="text-xs font-mono tracking-widest text-primary uppercase font-bold">
                                    Mowglai Command Center
                                </span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MissionSection;
