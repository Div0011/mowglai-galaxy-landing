"use client";

import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FlashText from "@/components/FlashText";
import SelectedWork from "@/components/SelectedWork";
import NextPageButton from "@/components/NextPageButton";
import TemplatesShowcase from "@/components/TemplatesShowcase";
import dynamic from "next/dynamic";

const HowWeBuiltSection = dynamic(() => import("@/components/HowWeBuiltSection"), { ssr: false });
const StartupGrowthSection = dynamic(() => import("@/components/StartupGrowthSection"), { ssr: false });

export default function HomeContent() {
    return (
        <>
            {/* 1. How We Build & What We Build - Interactive Bubbles */}
            <HowWeBuiltSection />

            {/* 1.5. Services / Startup Growth Section */}
            <StartupGrowthSection />

            {/* 2. Dual Showcase Frame: Selected Work + Blueprint Side-by-Side */}
            <section className="relative w-full py-20 md:py-28 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 max-w-6xl mx-auto">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-primary font-display font-bold text-xs tracking-[0.3em] uppercase opacity-80">
                                <span className="w-8 h-[1px] bg-primary"></span>
                                Featured Work
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-foreground uppercase leading-[0.9]">
                                Projects + <span className="text-primary italic">Templates</span>
                            </h2>
                        </div>
                        <p className="text-foreground/60 text-sm md:text-base font-light max-w-md leading-relaxed">
                            Explore real client outcomes and production-ready templates in one place.
                        </p>
                    </div>

                    <div className="relative group/frame max-w-6xl mx-auto">
                        <div className="absolute -inset-4 bg-primary/10 blur-[100px] opacity-40 transition-opacity duration-700 group-hover/frame:opacity-60"></div>

                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 rounded-[2rem] p-4 md:p-5 transition-all duration-700">
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
            <div className="w-full relative z-20 mb-6">
                <NextPageButton label="EXPLORE TEMPLATES" href="/explore" />
            </div>

            {/* 4. Consult + Story Side by Side */}
            <section className="relative w-full py-16 z-20">
                <div className="container mx-auto px-6">
                    {/* Ready to Build label */}
                    <div className="text-center mb-12">
                        <span className="text-primary font-bold text-lg md:text-xl font-display tracking-widest uppercase">Ready to build?</span>
                        <p className="text-sm md:text-base text-muted-foreground/60 mt-3">Transform your vision into reality with Mowglai</p>
                    </div>

                    {/* Two buttons side by side */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <Magnetic>
                            <Link
                                href="/custom-request"
                                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)]"
                            >
                                <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-yellow-400 to-green-600 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>

                                <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                                    Start a project
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <Link
                                href="/about"
                                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-background/5 backdrop-blur-2xl border border-foreground/15 text-foreground text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-700 hover:border-primary/50"
                            >
                                <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-yellow-400 to-green-600 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>

                                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground">
                                    Our story
                                    <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>
                        </Magnetic>
                    </div>
                </div>
            </section>

            {/* 5. Refer and Earn */}
            <div className="mt-6 md:mt-10">
                <FlashText />
            </div>
        </>
    );
}
