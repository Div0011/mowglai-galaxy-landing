"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Fingerprint } from "lucide-react";
import TextReveal from "./TextReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        const text = textRef.current;
        const mission = missionRef.current;
        if (!text || !mission) return;

        // Animate the text color change
        gsap.to(text, {
            backgroundPosition: "200% center",
            ease: "none",
            scrollTrigger: {
                trigger: text,
                start: "top bottom",
                end: "bottom center",
                scrub: 2
            }
        });

        // Fade in mission card
        gsap.fromTo(mission,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: mission,
                    start: "top 85%"
                }
            }
        );
    }, []);

    return (
        <section id="mission" className="relative w-full py-16 z-20 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />

            <div className="container mx-auto px-6">

                {/* 1. Huge Heading - Balanced Styling */}
                <div ref={textRef} className="mb-16 relative" data-aos="fade-up">
                    <h2 className="text-5xl sm:text-8xl md:text-[15vw] font-display font-black tracking-tighter text-foreground flex flex-col items-center">
                        <span className="leading-[0.8] opacity-10">{t.About.mission.global}</span>
                        <span className="text-primary leading-[0.8] -mt-2 md:-mt-0">{t.About.mission.vision}</span>
                    </h2>

                    {/* Decorative Background Text */}
                    <div className="absolute -top-6 md:-top-10 left-0 w-full text-center opacity-[0.03] select-none pointer-events-none font-display font-black text-[12vw] md:text-[25vw] leading-none whitespace-nowrap">
                        LOUD
                    </div>
                </div>

                {/* 2. Content Grid */}
                <div ref={missionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
                    <div className="space-y-10" data-aos="fade-right">
                        <div>
                            <p className="text-primary font-display tracking-[0.4em] uppercase text-sm mb-4">{t.About.mission.internationalStandard}</p>
                            <h3 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
                                <TextReveal text={t.About.mission.builtFor} /> <span className="text-primary/50"><TextReveal text={t.About.mission.theWorld} delay={2} /></span>
                            </h3>
                        </div>
                        <div className="h-0.5 w-32 bg-primary" />

                        {/* Interactive Stats Button - Moved to left side */}
                        <div className="pt-4">
                            <Link
                                href="/our-dna"
                                className="group relative inline-flex items-center gap-4 px-6 sm:px-8 py-4 bg-background/50 backdrop-blur-sm border border-primary/20 rounded-full transition-all duration-500 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                                onMouseMove={(e) => {
                                    const btn = e.currentTarget;
                                    const rect = btn.getBoundingClientRect();
                                    const x = e.clientX - rect.left - rect.width / 2;
                                    const y = e.clientY - rect.top - rect.height / 2;
                                    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
                                    const icon = btn.querySelector('.btn-icon');
                                    if (icon) gsap.to(icon, { x: x * 0.1, y: y * 0.1, duration: 0.3, ease: "power2.out" });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                                    const icon = e.currentTarget.querySelector('.btn-icon');
                                    if (icon) gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                                }}
                            >
                                <div className="btn-icon relative flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary transition-colors duration-500">
                                    <Fingerprint className="w-6 h-6 text-primary group-hover:text-background transition-colors duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-display font-bold text-primary tracking-[0.2em] uppercase text-sm group-hover:text-foreground transition-colors">
                                        {t.About.mission.discover}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground tracking-widest uppercase group-hover:text-primary transition-colors">
                                        {t.About.mission.ourDna}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-12" data-aos="fade-left" data-aos-delay="200">
                        <p className="text-3xl md:text-4xl font-light leading-tight text-foreground/90 italic border-l-2 border-primary/20 pl-8 transition-all hover:border-primary duration-500">
                            {t.About.mission.quote}
                        </p>
                        <p className="text-2xl text-muted-foreground leading-relaxed max-w-xl">
                            {t.About.mission.description}
                        </p>

                        {/* Interactive Stats Button */}
                        {/* Interactive Stats Button - Removed from here */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
