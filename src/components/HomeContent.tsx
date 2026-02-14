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

export default function HomeContent() {
    const { t } = useLanguage();

    return (
        <>
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
                                        className="group relative w-full flex items-center justify-center sm:justify-between px-8 py-5 bg-background/5 border border-primary/20 hover:bg-primary/10 hover:border-primary text-primary transition-all duration-500 rounded-full backdrop-blur-sm overflow-hidden"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                                <Fingerprint className="w-6 h-6" />
                                            </div>
                                            <span className="text-lg font-display font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors duration-300">
                                                {t.Home.exploreDNA}
                                            </span>
                                        </div>

                                        <div className="hidden sm:block relative w-8 h-8 flex items-center justify-center">
                                            <span className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-4 font-light text-2xl text-primary leading-none pb-1">
                                                -
                                            </span>
                                            <ArrowRight className="absolute w-6 h-6 text-primary transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" />
                                        </div>
                                    </Link>
                                </Magnetic>
                            </div>


                        </div>

                        {/* Sequential Cards Presentation - Pulled up */}
                        <div className="md:-mt-24">
                            <AestheticShowcase />
                        </div>
                    </div>
                </div>
            </section>


            <SelectedWork />

            {/* Premium Templates Showcase */}
            <TemplatesShowcase />

            {/* Startup SEO Landing Links */}
            <section className="w-full py-10 sm:py-16">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center text-center gap-4 mb-8">
                        <p className="text-xs md:text-sm font-display tracking-[0.4em] uppercase text-primary/70">
                            Startup Growth
                        </p>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight">
                            Launch Faster with Mowglai
                        </h2>
                        <p className="text-muted-foreground max-w-2xl">
                            Focused paths for founders and teams building SaaS, MVPs, and Next.js products.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "SaaS MVP Development",
                                text: "Validate ideas fast with production-grade MVPs.",
                                href: "/saas-mvp-development",
                            },
                            {
                                title: "Next.js Development",
                                text: "High-performance web apps with clean architecture.",
                                href: "/nextjs-development-agency",
                            },
                            {
                                title: "Web Development India",
                                text: "Full-stack teams for startups and enterprises.",
                                href: "/web-development-agency-india",
                            },
                        ].map((card) => (
                            <Link
                                key={card.title}
                                href={card.href}
                                className="group rounded-3xl border border-primary/10 bg-background/5 p-6 sm:p-8 transition-all hover:border-primary/40 hover:bg-primary/5"
                            >
                                <h3 className="text-lg sm:text-xl font-display font-bold uppercase mb-2 group-hover:text-primary transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground mb-4">{card.text}</p>
                                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-primary">
                                    Explore <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore Templates CTA (Blueprint Button Below Showcase) */}
            <div className="w-full relative z-20 mt-8 sm:mt-12" data-aos="fade-up">
                <NextPageButton label="BLUEPRINT" href="/explore" />
            </div>

            {/* Flash Text Referral */}
            <FlashText />




            {/* Consult for Free Button */}
            <div className="w-full flex flex-col items-center justify-center pb-12 pt-12 relative z-20">
                <p className="text-sm md:text-base font-display tracking-widest uppercase mb-8 text-muted-foreground/60" data-aos="fade-up">
                    {t.Home.readyToBegin}
                </p>
                <Magnetic>
                    <Link
                        href="/contact"
                        className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                    >
                        {t.Home.consultFree}
                    </Link>
                </Magnetic>
            </div>

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
