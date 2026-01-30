"use client";

import Link from "next/link";
import TextReveal from "./TextReveal";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";

const HeroSection = () => {
    const { t } = useLanguage();

    return (
        <section id="home" className="relative w-full h-screen z-10 overflow-hidden flex flex-col items-center justify-center">

            {/* Background Gradient/Glow - Subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Main Content Container */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">

                {/* Pre-title */}
                <div className="text-primary font-display tracking-[0.5em] text-sm md:text-lg uppercase mb-6">
                    <TextReveal text={`${t.Common.est} 2025`} />
                </div>

                {/* Massive Title Block */}
                <div className="flex flex-col items-center leading-none">
                    <h1
                        className="text-4xl sm:text-7xl md:text-8xl lg:text-[13vw] font-display font-black text-foreground tracking-tighter hover:tracking-widest transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default select-none transform-gpu hover:scale-105"
                        data-aos="zoom-out"
                        data-aos-duration="1000"
                    >
                        MOWGLAI
                    </h1>
                </div>

                {/* Subtitle / Value Prop */}
                <div className="mt-8 md:mt-12 max-w-3xl" data-aos="fade-up" data-aos-delay="300">
                    <div className="text-xl md:text-3xl text-foreground/80 font-body font-light leading-relaxed">
                        <TextReveal text={t.Common.deliveringElegance} />
                    </div>
                </div>

                {/* CTA Buttons */}
                <div
                    className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6 opacity-0 animate-fade-in px-4"
                    style={{ animationDelay: "1s", animationFillMode: "forwards" }}
                >
                    <Magnetic>
                        <Link
                            href="/investment"
                            className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center"
                        >
                            {t.Home.consultFree}
                        </Link>
                    </Magnetic>
                </div>

            </div>

            {/* Bottom Indicators */}
            <div className="absolute bottom-12 ml-2 left-24 hidden md:block text-xs font-display tracking-widest text-foreground/40 uppercase">
                Global Digital Partnership
            </div>
            <div className="absolute bottom-12 mr-2 right-24 hidden md:block text-xs font-display tracking-widest text-foreground/40 uppercase">
                Scroll to Explore
            </div>

        </section>
    );
};
export default HeroSection;
