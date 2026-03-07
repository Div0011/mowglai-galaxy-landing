"use client";

import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { ArrowRight, Fingerprint } from "lucide-react";
import { AestheticShowcase } from "@/components/AestheticShowcase";
import FlashText from "@/components/FlashText";
import SelectedWork from "@/components/SelectedWork";
import NextPageButton from "@/components/NextPageButton";
import { useLanguage } from "@/context/LanguageContext";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import StartupGrowthSection from "@/components/StartupGrowthSection";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function HomeContent() {
    const { t } = useLanguage();
    const consultX = useMotionValue(0);
    const consultY = useMotionValue(0);
    const consultSmoothX = useSpring(consultX, { stiffness: 50, damping: 20 });
    const consultSmoothY = useSpring(consultY, { stiffness: 50, damping: 20 });


    return (
        <>
            {/* 1. Cinematic Transition: Aesthetic Showcase */}
            <section className="relative w-full overflow-hidden mt-12 md:mt-24">
                <div className="container mx-auto px-6 flex justify-center">
                    <AestheticShowcase />
                </div>
            </section>

            {/* 2. Intro Text & Explore DNA - Centered cinematic layout */}
            <section className="relative py-24 overflow-hidden mt-12">
                <div className="container mx-auto px-6 text-center max-w-4xl flex flex-col items-center">
                    <div data-aos="fade-up">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                            {t.Home.weCreate} <span className="opacity-10">{t.Home.the}</span> <span className="text-primary italic whitespace-nowrap">{t.Home.extraordinary}</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-16 leading-relaxed md:text-xl">
                            {t.Home.introText}
                        </p>
                    </div>

                    {/* Redesigned Explore DNA Button */}
                    <div className="mb-12 w-full max-w-md mx-auto" data-aos="fade-up" data-aos-delay="200">
                        <Magnetic>
                            <Link
                                href="/our-dna"
                                className="group relative w-full flex items-center justify-between px-8 py-5 bg-transparent border border-foreground/20 text-foreground transition-all duration-700 rounded-full overflow-hidden hover:border-primary hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]"
                            >
                                {/* Glowing Background on Hover */}
                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full"></div>

                                <div className="relative z-10 flex items-center gap-3">
                                    <div className="p-2 rounded-full border border-foreground/20 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                        <Fingerprint className="w-6 h-6" />
                                    </div>
                                    <span className="text-lg font-display font-bold uppercase tracking-widest text-foreground transition-colors duration-300">
                                        {t.Home.exploreDNA}
                                    </span>
                                </div>

                                <div className="relative z-10 w-8 h-8 flex items-center justify-center overflow-hidden">
                                    <span className="absolute transition-transform duration-500 group-hover:-translate-y-10 font-light text-2xl leading-none pb-1">
                                        -
                                    </span>
                                    <ArrowRight className="absolute w-6 h-6 text-primary transition-all duration-500 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0" />
                                </div>
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </section>

            {/* 3. LAUNCH FASTER WITH MOWGLAI (Startup Growth) */}
            <div className="my-16 md:my-24">
                <StartupGrowthSection />
            </div>

            {/* 4. SELECTED WORK */}
            <div className="mb-24">
                <SelectedWork />
            </div>

            {/* 5. TEMPLATES SHOWCASE */}
            <div className="relative z-10">
                <TemplatesShowcase />
            </div>

            {/* 6. NEXT PAGE: BLUEPRINT */}
            <div className="w-full relative z-20 -mt-10 md:-mt-20 mb-24" data-aos="fade-up">
                <NextPageButton label="BLUEPRINT" href="/explore" />
            </div>

            {/* 7. COMMISSION / REFER & EARN (Flash Text) */}
            <div className="py-16 md:py-24 bg-background/50 border-y border-foreground/10">
                <FlashText />
            </div>

            {/* 8. CONSULT BLOCK */}
            <div className="w-full flex flex-col items-center justify-center py-24 relative z-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_50%)] pointer-events-none"></div>
                <p className="text-sm md:text-base font-display tracking-widest uppercase mb-12 text-muted-foreground/60 text-center max-w-2xl px-4 flex flex-col gap-3" data-aos="fade-up">
                    <span className="text-primary font-bold text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">READY TO BUILD?</span>
                    <span>Turn your vision into reality with our expert team</span>
                </p>
                <div data-aos="zoom-in" data-aos-delay="200">
                    <Magnetic>
                        <Link
                            href="/custom-request"
                            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-12 py-5 bg-foreground text-background text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.25em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.4)]"
                        >
                            {/* Premium Hover Effect Background */}
                            <span className="absolute inset-0 w-full h-full bg-primary -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-0"></span>

                            <span className="relative z-10 transition-colors duration-500 group-hover:text-foreground mix-blend-difference">
                                CONSULT FOR FREE
                            </span>

                            {/* Animated glowing border */}
                            <div className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/100 transition-colors duration-500 glow-border"></div>
                        </Link>
                    </Magnetic>
                </div>
            </div>

            {/* 9. NEXT PAGE: STORY */}
            <div className="w-full">
                <NextPageButton
                    label="STORY"
                    href="/about"
                    tagline={t.Home.knowMore}
                />
            </div>
        </>
    );
}
