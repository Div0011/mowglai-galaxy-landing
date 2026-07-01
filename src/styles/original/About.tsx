"use client";

import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import NextPageButton from "@/components/NextPageButton";
import PageLayout from "@/components/PageLayout";
import FaqSection from "@/components/FaqSection";
import dynamic from "next/dynamic";

const HowWeBuiltSection = dynamic(() => import("@/components/HowWeBuiltSection"), { ssr: false });

export default function OriginalAbout() {
    return (
        <PageLayout>
            <AboutSection />
            <MissionSection />
            <HowWeBuiltSection />

            {/* FAQ Section */}
            <section id="faq" className="relative w-full py-20 z-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-primary font-display font-bold text-xs tracking-[0.4em] uppercase">
                                <div className="w-10 h-[1.5px] bg-primary" />
                                About Us
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-foreground uppercase leading-none">
                                Frequently Asked <span className="text-primary italic">Questions</span>
                            </h2>
                            <p className="text-foreground/50 text-sm md:text-base font-light max-w-2xl leading-relaxed">
                                Everything you need to know about working with Mowglai.
                            </p>
                        </div>

                        <FaqSection />
                    </div>
                </div>
            </section>

            <NextPageButton label="SERVICES" href="/services" />
        </PageLayout>
    );
}
