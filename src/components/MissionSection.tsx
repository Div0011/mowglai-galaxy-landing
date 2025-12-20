import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
    const textRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);

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
                scrub: 1
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
                    <h2 className="text-[14vw] md:text-[12vw] font-display font-black tracking-tighter text-foreground flex flex-col items-center">
                        <span className="leading-[0.8] opacity-10">OUR</span>
                        <span className="text-primary leading-[0.8] -mt-2 md:-mt-4">JOURNEY</span>
                    </h2>

                    {/* Decorative Background Text */}
                    <div className="absolute -top-6 md:-top-10 left-0 w-full text-center opacity-[0.03] select-none pointer-events-none font-display font-black text-[20vw] md:text-[25vw] leading-none whitespace-nowrap">
                        THRIVE
                    </div>
                </div>

                {/* 2. Content Grid */}
                <div ref={missionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start relative z-10">
                    <div className="space-y-10" data-aos="fade-right">
                        <div>
                            <p className="text-primary font-display tracking-[0.4em] uppercase text-sm mb-4">Core Survival</p>
                            <h3 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight">
                                MISSION & <br /> <span className="text-primary/50">INSTINCT</span>
                            </h3>
                        </div>
                        <div className="h-0.5 w-32 bg-primary" />
                    </div>

                    <div className="space-y-12" data-aos="fade-left" data-aos-delay="200">
                        <p className="text-3xl md:text-4xl font-light leading-tight text-foreground/90 italic border-l-2 border-primary/20 pl-8 transition-all hover:border-primary duration-500">
                            "To empower businesses with wild digital solutions that drive growth and establish a dominant presence in the market habitat."
                        </p>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                            We believe great software should be beautiful, fast, and accessible to everyone. We don't just build websites; we craft digital legacies that stand the test of time and technology. Our team lives at the intersection of Nature & Engineering.
                        </p>

                        {/* Interactive Stats Button */}
                        <div className="pt-8">
                            <button
                                onClick={() => window.location.href = '#about'}
                                className="group relative px-10 py-4 bg-primary/5 hover:bg-primary transition-all duration-500 rounded-full border border-primary/20 overflow-hidden"
                            >
                                <span className="relative z-10 font-display font-bold text-primary group-hover:text-primary-foreground transition-colors uppercase tracking-widest">Discover our DNA</span>
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;
