"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Rocket, Zap } from "lucide-react";
import ConsultationForm from "@/components/ConsultationForm";
import NextPageButton from "@/components/NextPageButton";

const steps = [
    {
        id: "01",
        title: "Refer or Describe",
        description: "Share your network or describe your project vision. Earn 10% commission on every referral.",
        icon: Users,
    },
    {
        id: "02",
        title: "We Engineer",
        description: "Our team designs, develops, and launches your digital product with precision and care.",
        icon: Zap,
    },
    {
        id: "03",
        title: "Launch & Scale",
        description: "Go live with a high-performance system and scale to global audiences.",
        icon: Rocket,
    },
];

const Step1Visual = () => (
    <div className="relative w-full aspect-[16/10] max-h-[280px] flex items-center justify-center bg-[#040905]/40 border border-white/5 rounded-2xl overflow-hidden group p-4 backdrop-blur-md">
        {/* Glowing aura */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent_65%)] pointer-events-none" />
        
        <svg viewBox="0 0 400 250" className="w-full h-full max-w-[360px] z-10">
            {/* Concentric Radar Grid */}
            <circle cx="200" cy="125" r="90" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="200" cy="125" r="60" fill="none" stroke="rgba(230,185,61,0.08)" strokeWidth="1" />
            <circle cx="200" cy="125" r="30" fill="none" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
            
            {/* Axis Lines */}
            <line x1="200" y1="25" x2="200" y2="225" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="100" y1="125" x2="300" y2="125" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Sweeping radar line */}
            <line x1="200" y1="125" x2="263" y2="62" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.8" className="origin-[200px_125px] animate-[spin_6s_linear_infinite]" />
            
            {/* Nodes (Keywords / Entities) */}
            <g>
                {/* Node 1: Main Entity */}
                <circle cx="200" cy="125" r="6" fill="#10b981" className="animate-ping" />
                <circle cx="200" cy="125" r="5" fill="#E6B93D" stroke="#040905" strokeWidth="1" />
                <text x="200" y="112" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" className="font-mono tracking-wider">MOWGLAI</text>
                
                {/* Connection lines to child nodes */}
                <line x1="200" y1="125" x2="140" y2="80" stroke="rgba(230,185,61,0.3)" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="200" y1="125" x2="270" y2="90" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
                <line x1="200" y1="125" x2="160" y2="180" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
                <line x1="200" y1="125" x2="250" y2="175" stroke="rgba(230,185,61,0.3)" strokeWidth="3" strokeDasharray="3,3" />

                {/* Node 2 */}
                <circle cx="140" cy="80" r="4" fill="#E6B93D" />
                <text x="140" y="70" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" className="font-mono">intent: commercial</text>
                
                {/* Node 3 */}
                <circle cx="270" cy="90" r="4" fill="#10b981" />
                <text x="270" y="82" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" className="font-mono">vol: 45.2k</text>

                {/* Node 4 */}
                <circle cx="160" cy="180" r="4" fill="#10b981" />
                <text x="160" y="192" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" className="font-mono">diff: low</text>

                {/* Node 5 */}
                <circle cx="250" cy="175" r="4" fill="#E6B93D" />
                <text x="250" y="187" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" className="font-mono">GEO_rank: #1</text>
            </g>
        </svg>

        {/* Readout overlay */}
        <div className="absolute top-4 left-4 bg-black/60 border border-white/5 rounded-lg px-2.5 py-1.5 font-mono text-[8px] space-y-1 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-white/60">SCANNER: ACTIVE</span>
            </div>
            <div className="text-primary">KEYWORDS AUDITED: 1,420</div>
        </div>

        <div className="absolute bottom-4 right-4 bg-black/60 border border-white/5 rounded-lg px-2.5 py-1.5 font-mono text-[8px] space-y-1 backdrop-blur-md">
            <div className="text-emerald-400">SEMANTIC SCORE: 98.4%</div>
        </div>
    </div>
);

const Step2Visual = () => (
    <div className="relative w-full aspect-[16/10] max-h-[280px] flex items-center justify-center bg-[#040905]/40 border border-white/5 rounded-2xl overflow-hidden group p-4 backdrop-blur-md">
        {/* Soft grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,185,61,0.03),transparent_65%)] pointer-events-none" />
        
        {/* Split screen: Left code editor, Right 3D wireframe */}
        <div className="w-full h-full grid grid-cols-12 gap-3 z-10 items-center">
            {/* Code Panel */}
            <div className="col-span-7 h-full bg-[#030604] border border-white/5 rounded-xl p-3 flex flex-col font-mono text-[8px] leading-relaxed overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-white/40">
                    <span className="text-[7px]">page.tsx</span>
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E6B93D]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    </div>
                </div>
                {/* Editor Code Lines */}
                <div className="flex-1 text-white/70 space-y-0.5">
                    <div><span className="text-primary">import</span> &#123; <span className="text-emerald-400">Canvas</span> &#125; <span className="text-primary">from</span> <span className="text-[#E6B93D]">"3d-core"</span>;</div>
                    <div><span className="text-primary">const</span> <span className="text-[#E6B93D]">MowglaiSite</span> = () =&gt; &#123;</div>
                    <div className="pl-3"><span className="text-primary">return</span> (</div>
                    <div className="pl-6 text-emerald-400">&lt;<span className="text-[#E6B93D]">section</span> className=<span className="text-[#E6B93D]">"relative"</span>&gt;</div>
                    <div className="pl-9 text-white/50">&lt;<span className="text-emerald-400">WebGLRenderer</span> quality=<span className="text-[#E6B93D]">"ultra"</span> /&gt;</div>
                    <div className="pl-9 text-white/50">&lt;<span className="text-primary">InteractiveLayout</span> &gt;</div>
                    <div className="pl-12 text-primary">&lt;<span className="text-emerald-400">HeroTitle</span> text=<span className="text-[#E6B93D]">"Future"</span> /&gt;</div>
                    <div className="pl-9 text-white/50">&lt;/<span className="text-primary">InteractiveLayout</span>&gt;</div>
                    <div className="pl-6 text-emerald-400">&lt;/<span className="text-[#E6B93D]">section</span>&gt;</div>
                    <div className="pl-3">);</div>
                    <div>&#125;;</div>
                </div>
            </div>

            {/* 3D Wireframe/Visualizer Panel */}
            <div className="col-span-5 h-full bg-[#030604] border border-white/5 rounded-xl p-2.5 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Rotating 3D Sphere SVG */}
                <svg viewBox="0 0 100 100" className="w-[70px] h-[70px] animate-[spin_10s_linear_infinite] text-primary" stroke="currentColor" fill="none" strokeWidth="0.5">
                    {/* Outer rings */}
                    <circle cx="50" cy="50" r="40" stroke="rgba(230,185,61,0.2)" />
                    <ellipse cx="50" cy="50" rx="40" ry="12" stroke="rgba(16,185,129,0.3)" />
                    <ellipse cx="50" cy="50" rx="12" ry="40" stroke="rgba(16,185,129,0.3)" />
                    {/* Diagonal orbits */}
                    <g transform="rotate(45 50 50)">
                        <ellipse cx="50" cy="50" rx="40" ry="8" stroke="rgba(230,185,61,0.25)" />
                    </g>
                    <g transform="rotate(-45 50 50)">
                        <ellipse cx="50" cy="50" rx="40" ry="8" stroke="rgba(230,185,61,0.25)" />
                    </g>
                    {/* Node points */}
                    <circle cx="50" cy="10" r="1.5" fill="#10b981" />
                    <circle cx="50" cy="90" r="1.5" fill="#10b981" />
                    <circle cx="10" cy="50" r="1.5" fill="#E6B93D" />
                    <circle cx="90" cy="50" r="1.5" fill="#E6B93D" />
                    <circle cx="50" cy="50" r="3" fill="#10b981" className="animate-pulse" />
                </svg>

                {/* Score indicators */}
                <div className="absolute bottom-2 flex justify-between w-full px-2 font-mono text-[7px]">
                    <span className="text-emerald-400">LCP: 0.8s</span>
                    <span className="text-[#E6B93D]">FID: 9ms</span>
                </div>
            </div>
        </div>
    </div>
);

const Step3Visual = () => (
    <div className="relative w-full aspect-[16/10] max-h-[280px] flex items-center justify-center bg-[#040905]/40 border border-white/5 rounded-2xl overflow-hidden group p-4 backdrop-blur-md">
        {/* Soft grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03),transparent_65%)] pointer-events-none" />
        
        <div className="w-full h-full grid grid-cols-12 gap-3 z-10 items-center">
            {/* Global CDN Traffic Map */}
            <div className="col-span-6 h-full bg-[#030604] border border-white/5 rounded-xl p-2.5 flex flex-col justify-between font-mono text-[7px] relative overflow-hidden">
                <span className="text-white/40 uppercase tracking-widest text-[6px]">GLOBAL CDN TOPOLOGY</span>
                
                {/* Dot-matrix style world hubs and lines */}
                <svg viewBox="0 0 160 100" className="w-full h-[70px] text-white/10" fill="currentColor">
                    {/* US West node */}
                    <circle cx="30" cy="40" r="2" fill="#E6B93D" className="animate-ping" />
                    <circle cx="30" cy="40" r="1.5" fill="#E6B93D" />
                    {/* EU Central node */}
                    <circle cx="80" cy="30" r="2" fill="#10b981" className="animate-ping" />
                    <circle cx="80" cy="30" r="1.5" fill="#10b981" />
                    {/* Asia node */}
                    <circle cx="130" cy="45" r="2" fill="#10b981" className="animate-ping" />
                    <circle cx="130" cy="45" r="1.5" fill="#10b981" />

                    {/* Cyber paths connecting to a central server in Noida */}
                    <path d="M 30,40 Q 65,40 100,50" fill="none" stroke="rgba(230,185,61,0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
                    <path d="M 80,30 Q 90,40 100,50" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" />
                    <path d="M 130,45 Q 115,45 100,50" fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="0.5" strokeDasharray="3,3" />
                    
                    {/* India Central Core */}
                    <circle cx="100" cy="50" r="3.5" fill="#E6B93D" className="animate-pulse" />
                </svg>

                <div className="flex justify-between text-white/50 text-[6.5px]">
                    <span>CDN: 99.9%</span>
                    <span className="text-emerald-400">EDGE CACHE: HIT</span>
                </div>
            </div>

            {/* Performance Wave Chart */}
            <div className="col-span-6 h-full bg-[#030604] border border-white/5 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden font-mono">
                <div className="flex justify-between items-center text-[7px]">
                    <span className="text-white/40 uppercase tracking-widest text-[6px]">PERFORMANCE METRICS</span>
                    <span className="text-emerald-400 font-bold">100/100</span>
                </div>
                
                {/* SVG Line Chart */}
                <svg viewBox="0 0 160 80" className="w-full h-[55px] mt-1">
                    <defs>
                        <linearGradient id="chart-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="160" y2="20" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                    <line x1="0" y1="40" x2="160" y2="40" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                    <line x1="0" y1="60" x2="160" y2="60" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                    
                    {/* Gradient fill */}
                    <path d="M 10 70 L 40 60 L 70 45 L 100 50 L 130 30 L 150 15 L 150 70 Z" fill="url(#chart-glow)" />
                    
                    {/* Chart line */}
                    <path d="M 10 70 L 40 60 L 70 45 L 100 50 L 130 30 L 150 15" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M 10 70 L 40 60 L 70 45 L 100 50 L 130 30 L 150 15" fill="none" stroke="#E6B93D" strokeWidth="2.5" strokeDasharray="300" className="animate-draw-path" strokeLinecap="round" />
                    
                    {/* Peak dot */}
                    <circle cx="150" cy="15" r="3" fill="#E6B93D" />
                    <circle cx="150" cy="15" r="5" fill="#E6B93D" className="animate-ping" />
                </svg>

                <div className="flex justify-between text-white/50 text-[6.5px]">
                    <span>SPEED INDEX: 0.4s</span>
                    <span className="text-[#E6B93D]">SEO CORE: 100</span>
                </div>
            </div>
        </div>
    </div>
);

export default function InteractiveSetupSection() {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const intervalTime = 50; // Progress updates every 50ms
        const totalDuration = 5000; // 5 seconds per slide
        const stepIncrement = (intervalTime / totalDuration) * 100;

        timerRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    setActiveStep((curr) => (curr + 1) % steps.length);
                    return 0;
                }
                return prev + stepIncrement;
            });
        }, intervalTime);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [activeStep]);

    const handleSelectStep = (index: number) => {
        setActiveStep(index);
        setProgress(0);
    };

    return (
        <section className="relative w-full pt-8 pb-2 z-20">
            {/* Inject dynamic CSS animation variables */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes dash {
                    to {
                        stroke-dashoffset: -20;
                    }
                }
                @keyframes flow-dash {
                    to {
                        stroke-dashoffset: -40;
                    }
                }
                @keyframes draw-path {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                @keyframes rocket-bounce {
                    0%, 100% {
                        transform: translate(340px, 70px) rotate(45deg) scale(0.9) translateY(0);
                    }
                    50% {
                        transform: translate(340px, 70px) rotate(45deg) scale(0.9) translateY(-6px);
                    }
                }
                .animate-dash {
                    stroke-dasharray: 5, 5;
                    animation: dash 2s linear infinite;
                }
                .animate-flow-dash {
                    stroke-dasharray: 10, 10;
                    animation: flow-dash 1.5s linear infinite;
                }
                .animate-draw-path {
                    stroke-dashoffset: 400;
                    animation: draw-path 3s cubic-bezier(0.25, 1, 0.5, 1) forwards infinite;
                }
                .animate-rocket-bounce {
                    animation: rocket-bounce 2s ease-in-out infinite;
                }
            `}} />

            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6 md:mb-8"
                >
                    <span className="text-primary font-display font-bold text-xs tracking-[0.4em] uppercase">
                        Process
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-foreground uppercase leading-none mt-4">
                        How It <span className="text-primary italic">Works</span>
                    </h2>
                </motion.div>

                {/* Slideshow Core Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[360px] mb-6">
                    {/* Left Column: Progress Indicators & Details */}
                    <div className="lg:col-span-5 space-y-3">
                        {steps.map((step, idx) => {
                            const isActive = activeStep === idx;
                            return (
                                <div
                                    key={step.id}
                                    onClick={() => handleSelectStep(idx)}
                                    className={`group cursor-pointer p-4 rounded-xl border transition-all duration-500 relative overflow-hidden backdrop-blur-md ${
                                        isActive
                                            ? "border-primary/40 bg-[#061208]/60 shadow-[0_4px_25px_rgba(16,185,129,0.03)]"
                                            : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                                    }`}
                                >
                                    {isActive && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent pointer-events-none" />
                                    )}
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="relative shrink-0 flex items-center justify-center">
                                            <span className={`text-2xl font-display font-black leading-none transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground/20"}`}>
                                                {step.id}
                                            </span>
                                            {isActive && (
                                                <span className="absolute -top-1.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-base font-display font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-foreground" : "text-foreground/60"}`}>
                                                {step.title}
                                            </h3>
                                            
                                            <AnimatePresence initial={false}>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                                                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-sm text-foreground/50 leading-relaxed font-light">
                                                            {step.description}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Progress Bar */}
                                            <div className="mt-4 w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all ease-linear"
                                                    style={{
                                                        width: isActive ? `${progress}%` : "0%",
                                                        transitionDuration: isActive ? "50ms" : "0ms"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column: Premium Visuals with Top-to-Bottom transitions */}
                    <div className="lg:col-span-7 relative flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.98, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="w-full"
                            >
                                {activeStep === 0 && <Step1Visual />}
                                {activeStep === 1 && <Step2Visual />}
                                {activeStep === 2 && <Step3Visual />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Pricing Page Button between slideshow and Refer/Ready cards */}
            <div className="relative z-20 -mt-8 mb-4">
                <NextPageButton
                    href="/investment"
                    label="PRICING"
                    className="h-[120px] md:h-[140px]"
                />
            </div>

            <div className="container mx-auto px-6 max-w-6xl mt-10">
                {/* Subsections: Referral & Consultation (Symmetrical grid stretching) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all duration-500 flex flex-col justify-between h-full"
                    >
                        <div className="flex-1">
                            <span className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-primary/60">
                                Referral Program
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-black text-foreground uppercase tracking-tight mt-3">
                                Refer <span className="text-primary italic">&</span> Earn
                            </h3>
                            <p className="text-foreground/50 text-sm mt-4 leading-relaxed">
                                Invite your network to the tribe. Getting 10% commission has never been this elegant.
                            </p>
                            <ul className="mt-8 space-y-4">
                                {[
                                    "Share your details and your friend's contact",
                                    "We send an exclusive invite with official branding",
                                    "Your friend gets 5% off, you get 5% cash",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0 mt-0.5">
                                            {i + 1}
                                        </span>
                                        <span className="text-sm text-foreground/70 leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/referral"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground text-sm font-display font-bold uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 rounded-full"
                            >
                                Start Referring
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-primary/30 transition-all duration-500 flex flex-col justify-between h-full"
                    >
                        <div className="flex-1">
                            <span className="text-[10px] font-display font-bold tracking-[0.3em] uppercase text-primary/60">
                                Consultation
                            </span>
                            <h3 className="text-2xl md:text-3xl font-display font-black text-foreground uppercase tracking-tight mt-3">
                                Ready to <span className="text-primary italic">Start?</span>
                            </h3>
                            <p className="text-foreground/50 text-sm mt-4 leading-relaxed mb-8">
                                Describe your idea and start your project with a quick consultation.
                            </p>
                        </div>
                        <div className="mt-auto">
                            <ConsultationForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
