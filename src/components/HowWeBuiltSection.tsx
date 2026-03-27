"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Fingerprint,
    Activity,
    Terminal,
    Rocket,
    ExternalLink,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: "01",
        title: "Discovery",
        tagline: "Biological Intelligence",
        description:
            "Our investigative protocols dive deep into your brand's digital DNA, unearthing the strategic leverage points that define elite performance.",
        icon: Fingerprint,
        metrics: ["Market DNA", "User Psychology", "Tactical Audit"],
        accent: "rgb(230, 185, 61)",
        glow: "rgba(230, 185, 61, 0.2)",
        gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    },
    {
        id: "02",
        title: "Design",
        tagline: "Synthetic Aesthetics",
        description:
            "Where nature meets high-tech precision. We engineer immersive 3D interfaces and glassmorphic systems that don't just look premium—they feel alive.",
        icon: Activity,
        metrics: ["Bio-UI/UX", "3D Architecture", "Neural Motion"],
        accent: "rgb(121, 152, 81)",
        glow: "rgba(121, 152, 81, 0.2)",
        gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    },
    {
        id: "03",
        title: "Develop",
        tagline: "Neural Engineering",
        description:
            "Atomic-speed performance powered by Next.js and custom-tuned GSAP sequences. We build indestructible architectures for the modern web.",
        icon: Terminal,
        metrics: ["Core Mastery", "SEO Synthesis", "Elastic Scale"],
        accent: "rgb(71, 98, 42)",
        glow: "rgba(71, 98, 42, 0.2)",
        gradient: "from-emerald-600/20 via-green-700/10 to-transparent",
    },
    {
        id: "04",
        title: "Deploy",
        tagline: "Orbital Launch",
        description:
            "The moment of impact. We launch your project with tactical precision, then provide ongoing evolution and monitoring for global dominance.",
        icon: Rocket,
        metrics: ["World Launch", "Protocol Monitor", "Growth Scale"],
        accent: "rgb(55, 68, 38)",
        glow: "rgba(55, 68, 38, 0.2)",
        gradient: "from-green-800/20 via-teal-900/10 to-transparent",
    },
];

export default function HowWeBuiltSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Magnetic interaction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 30,
                y: (e.clientY / window.innerHeight - 0.5) * 30,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const cards = gsap.utils.toArray(".process-card") as HTMLElement[];

        // Pin the section for storytelling effect
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: ".process-timeline",
            pinSpacing: false,
        });

        cards.forEach((card, i) => {
            ScrollTrigger.create({
                trigger: card,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => setActiveIndex(i),
                onEnterBack: () => setActiveIndex(i),
            });

            // Enhanced card reveal with 3D rotation
            gsap.fromTo(
                card,
                { y: 80, opacity: 0, rotateX: 15, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Staggered content reveal
            const contentElements = card.querySelectorAll(".reveal-content");
            gsap.fromTo(
                contentElements,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-transparent overflow-hidden"
        >
            {/* Animated Background */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-0"
                style={{ y: backgroundY }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full blur-[150px]"
                        style={{ backgroundColor: steps[activeIndex].glow }}
                    />
                </AnimatePresence>

                {/* Animated Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${steps[activeIndex].accent} 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </motion.div>

            {/* Section Header */}
            <div className="relative z-10 pt-20 pb-10 px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <motion.div
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-[2px] bg-primary" />
                                <span className="text-primary font-display font-bold text-xs tracking-[0.3em] uppercase">
                                    Our Process
                                </span>
                            </motion.div>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black text-white uppercase tracking-tight whitespace-nowrap">
                                From <span className="text-primary italic">Vision</span> To Reality
                            </h2>
                        </div>
                        <p className="text-foreground/50 text-sm md:text-base font-light max-w-md leading-relaxed">
                            A proven methodology refined through 50+ successful projects. Each
                            phase engineered for maximum impact.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Process Cards - Compact Layout */}
            <div ref={containerRef} className="relative z-10 px-6 md:px-12 pb-20">
                <div className="max-w-5xl mx-auto lg:ml-[15%] space-y-8 md:space-y-12">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon;
                        const isHovered = hoveredCard === index;

                        return (
                            <motion.div
                                key={step.id}
                                data-step-index={index}
                                className="process-card relative"
                                onHoverStart={() => setHoveredCard(index)}
                                onHoverEnd={() => setHoveredCard(null)}
                                style={{ perspective: "1000px" }}
                            >
                                {/* Card Container */}
                                <motion.div
                                    className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-xl bg-black/20 transition-all duration-500"
                                    style={{
                                        boxShadow:
                                            activeIndex === index
                                                ? `0 0 60px ${step.glow}, inset 0 1px 0 0 rgba(255,255,255,0.1), 0 0 0 1px ${step.accent}`
                                                : "inset 0 1px 0 0 rgba(255,255,255,0.05)",
                                    }}
                                    animate={{
                                        rotateY: isHovered ? mousePos.x * 0.02 : 0,
                                        rotateX: isHovered ? -mousePos.y * 0.02 : 0,
                                    }}
                                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                >
                                    {/* Gradient Overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-50`}
                                    />

                                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8 lg:p-10">
                                        {/* Left: Animated Icon */}
                                        <div className="lg:col-span-3 flex items-center lg:items-start">
                                            <motion.div
                                                className="relative w-16 h-16 md:w-20 md:h-20"
                                                animate={{
                                                    rotate: activeIndex === index ? 360 : 0,
                                                }}
                                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            >
                                                <div
                                                    className="absolute inset-0 rounded-2xl blur-xl"
                                                    style={{ backgroundColor: step.glow }}
                                                />
                                                <div
                                                    className="relative w-full h-full rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-md"
                                                    style={{
                                                        backgroundColor: `${step.accent}10`,
                                                    }}
                                                >
                                                    <IconComponent
                                                        className="w-8 h-8 md:w-10 md:h-10"
                                                        style={{ color: step.accent }}
                                                    />
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Middle: Content */}
                                        <div className="lg:col-span-6 space-y-4">
                                            {/* Tagline */}
                                            <motion.span
                                                className="reveal-content inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-display font-black uppercase tracking-[0.2em]"
                                                style={{
                                                    backgroundColor: `${step.accent}15`,
                                                    color: step.accent,
                                                }}
                                            >
                                                {step.tagline}
                                            </motion.span>

                                            {/* Title */}
                                            <h3 className="reveal-content text-2xl md:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight">
                                                {step.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="reveal-content text-sm md:text-base text-foreground/60 font-light leading-relaxed max-w-lg">
                                                {step.description}
                                            </p>

                                            {/* Metrics */}
                                            <div className="reveal-content flex flex-wrap gap-3 pt-2">
                                                {step.metrics.map((metric, i) => (
                                                    <motion.div
                                                        key={metric}
                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-display uppercase tracking-wider"
                                                        whileHover={{
                                                            scale: 1.05,
                                                            backgroundColor: `${step.accent}20`,
                                                            borderColor: step.accent,
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ExternalLink size={10} style={{ color: step.accent }} />
                                                        <span className="text-foreground/70">{metric}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right: Visual Element */}
                                        <div className="lg:col-span-3 hidden lg:flex items-center justify-end">
                                            <motion.div
                                                className="relative w-32 h-32"
                                                animate={{
                                                    scale: activeIndex === index ? [1, 1.05, 1] : 1,
                                                }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            >
                                                {/* Orbital Rings */}
                                                {[0, 1, 2].map((ring) => (
                                                    <motion.div
                                                        key={ring}
                                                        className="absolute inset-0 rounded-full border border-dashed"
                                                        style={{
                                                            borderColor: `${step.accent}${30 - ring * 10}`,
                                                            inset: ring * 12,
                                                        }}
                                                        animate={{ rotate: 360 * (ring % 2 === 0 ? 1 : -1) }}
                                                        transition={{
                                                            duration: 10 + ring * 5,
                                                            repeat: Infinity,
                                                            ease: "linear",
                                                        }}
                                                    />
                                                ))}

                                                {/* Center Element */}
                                                <div
                                                    className="absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center"
                                                    style={{
                                                        backgroundColor: step.accent,
                                                        boxShadow: `0 0 40px ${step.glow}`,
                                                    }}
                                                >
                                                    <ChevronRight className="w-6 h-6 text-white" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Hover Arrow */}
                                    <motion.div
                                        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center"
                                        animate={{
                                            scale: isHovered ? 1.1 : 1,
                                            backgroundColor: isHovered ? step.accent : "transparent",
                                            borderColor: isHovered ? step.accent : "rgba(255,255,255,0.2)",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowUpRight
                                            className="w-5 h-5 text-white"
                                            style={{
                                                transform: isHovered ? "translate(2px, -2px)" : "translate(0, 0)",
                                                transition: "transform 0.3s ease",
                                            }}
                                        />
                                    </motion.div>

                                    {/* Progress Bar */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-[2px]"
                                        style={{ backgroundColor: step.accent }}
                                        initial={{ width: "0%" }}
                                        animate={{
                                            width: activeIndex === index ? "100%" : "0%",
                                        }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: steps[activeIndex].accent,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
