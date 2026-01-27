"use client";

import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import { ArrowRight, Fingerprint } from "lucide-react";
import { AestheticShowcase } from "@/components/AestheticShowcase";
import SelectedWork from "@/components/SelectedWork";
import NextPageButton from "@/components/NextPageButton";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeContent() {
    const { t } = useLanguage();

    return (
        <>
            <section className="relative py-16 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                        <div data-aos="fade-up" className="break-words w-full pt-12 md:pt-0">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                                {t.Home.weCreate} <span className="opacity-10">{t.Home.the}</span> <span className="text-primary italic">{t.Home.extraordinary}</span>
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

            {/* Explore Templates CTA */}
            <section className="relative py-24 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl md:text-5xl font-display font-black mb-8 uppercase" data-aos="fade-up">
                        {t.Home.purchase} <span className="text-primary italic">{t.Home.templates}</span>
                    </h3>
                    <div className="max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
                        <p className="text-xl text-muted-foreground">
                            {t.Home.templateText}
                        </p>
                    </div>
                </div>

                {/* Full Width Button */}
                <div className="w-full" data-aos="fade-up" data-aos-delay="200">
                    <NextPageButton label={t.Home.viewTemplates} href="/explore" />
                </div>
            </section>




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
                    label={t.Home.studioStory}
                    href="/about"
                    tagline={t.Home.knowMore}
                />
            </div>
        </>
    );
}
