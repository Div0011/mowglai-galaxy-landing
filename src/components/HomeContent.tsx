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

export default function HomeContent() {
    const { t } = useLanguage();

    return (
        <>
            {/* 1. Intro + DNA + AestheticShowcase */}
            <section className="relative py-16 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                        <div data-aos="fade-up" className="w-full pt-12 md:pt-0">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
                                {t.Home.weCreate} <span className="opacity-10">{t.Home.the}</span> <span className="text-primary italic whitespace-nowrap">{t.Home.extraordinary}</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed md:text-xl">
                                {t.Home.introText}
                            </p>

                            <div className="mb-12 w-full">
                                <Magnetic>
                                    <Link
                                        href="/our-dna"
                                        className="group relative w-full flex items-center justify-center sm:justify-between px-8 py-5 bg-background/5 backdrop-blur-2xl border border-primary/20 text-primary transition-all duration-700 rounded-full overflow-hidden"
                                    >
                                        {/* Theme-Aware Gradient Liquid Fill */}
                                        <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[var(--primary)] via-indigo-600 to-purple-600 dark:from-primary dark:via-emerald-500 dark:to-teal-400 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>
                                        
                                        <div className="relative z-10 flex items-center gap-2">
                                            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-white/10 transition-colors duration-500">
                                                <Fingerprint className="w-6 h-6 group-hover:text-primary-foreground transition-colors" />
                                            </div>
                                            <span className="text-lg font-display font-bold uppercase tracking-widest text-foreground group-hover:text-primary-foreground transition-colors duration-300">
                                                {t.Home.exploreDNA}
                                            </span>
                                        </div>

                                        <div className="relative z-10 hidden sm:block w-8 h-8 flex items-center justify-center">
                                            <span className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-4 font-light text-2xl text-primary leading-none pb-1">
                                                -
                                            </span>
                                            <ArrowRight className="absolute w-6 h-6 text-primary group-hover:text-primary-foreground transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" />
                                        </div>
                                    </Link>
                                </Magnetic>
                            </div>
                        </div>

                        <div className="md:-mt-24">
                            <AestheticShowcase />
                        </div>
                    </div>

                    <StartupGrowthSection />
                </div>
            </section>

            {/* 2. Dual Showcase Frame: Selected Work + Blueprint Side-by-Side */}
            <section className="relative w-full py-16 md:py-24 overflow-hidden" data-aos="fade-up">
                <div className="container mx-auto px-6">
                    <div className="pointer-events-none absolute left-1/2 top-8 h-56 w-[min(90vw,72rem)] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

                    <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 max-w-6xl mx-auto">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary font-display font-bold text-xs tracking-[0.3em] uppercase opacity-80">
                                <span className="w-8 h-[1px] bg-primary"></span>
                                Premium Showcase
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-foreground uppercase leading-[0.9]">
                                Work + <span className="text-primary italic">Blueprints</span>
                            </h2>
                        </div>
                        <p className="text-foreground/60 text-sm md:text-base font-light max-w-md leading-relaxed border-l border-primary/30 pl-6">
                            Explore real client outcomes and production-ready templates in one place. Swipe, browse, and open demos instantly.
                        </p>
                    </div>

                    <div className="relative group/frame max-w-6xl mx-auto">
                        <div className="absolute -inset-4 bg-primary/10 blur-[100px] opacity-50 transition-opacity duration-700 group-hover/frame:opacity-80"></div>

                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 rounded-[2rem] border border-foreground/10 bg-gradient-to-b from-background/75 to-background/90 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-5">
                            {/* Left Panel: Projects */}
                            <div className="relative overflow-hidden rounded-[1.75rem]">
                                <SelectedWork />
                            </div>

                            {/* Right Panel: Blueprints */}
                            <div className="relative overflow-hidden rounded-[1.75rem]">
                                <TemplatesShowcase />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Blueprint Button */}
            <div className="w-full relative z-20 mb-8" data-aos="fade-up">
                <NextPageButton label="BLUEPRINT" href="/explore" />
            </div>

            {/* 4. Consult + Story Side by Side */}
            <section className="relative py-16 z-20">
                <div className="container mx-auto px-6">
                    {/* Ready to Build label */}
                    <div className="text-center mb-10" data-aos="fade-up">
                        <span className="text-primary font-bold text-lg md:text-xl font-display tracking-widest uppercase">READY TO BUILD?</span>
                        <p className="text-sm md:text-base text-muted-foreground/60 mt-2">Turn your vision into reality with our expert team</p>
                    </div>

                    {/* Two buttons side by side */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" data-aos="fade-up" data-aos-delay="100">
                        <Magnetic>
                            <Link
                                href="/custom-request"
                                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.6)]"
                            >
                                {/* Theme-Aware Gradient Liquid Fill */}
                                <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[var(--primary)] via-indigo-600 to-purple-600 dark:from-primary dark:via-emerald-500 dark:to-teal-400 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>
                                
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-[shine_1.2s_ease-in-out]"></span>
                                <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                                    CONSULT FOR FREE
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <Link
                                href="/about"
                                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-background/5 backdrop-blur-2xl border border-foreground/15 text-foreground text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-700 hover:border-primary/50"
                            >
                                {/* Theme-Aware Gradient Liquid Fill */}
                                <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[var(--primary)] via-indigo-600 to-purple-600 dark:from-primary dark:via-emerald-500 dark:to-teal-400 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>
                                
                                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground">
                                    OUR STORY
                                    <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </section>

            {/* 5. Refer and Earn */}
            <div className="mt-4 md:mt-8">
                <FlashText />
            </div>
        </>
    );
}
