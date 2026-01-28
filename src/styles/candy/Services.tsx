"use client";

import CandyLayout from "./Layout";
import { motion } from "framer-motion";
import { Palette, Shield, Rocket, Globe, BarChart, Bot, Sparkles, Zap, Layout, Globe2, Layers, MousePointer2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const services = [
    {
        title: "Web Design",
        icon: Palette,
        color: "#6ca2fb",
        desc: "Visual narratives that merge artistic expression with functional precision. Crafting stunning, responsive interfaces.",
        tags: ["Identity", "Chroma", "UI"]
    },
    {
        title: "Development",
        icon: Zap,
        color: "#ee5781",
        desc: "Scalable, secure, and lightning-fast architectures. Building the solid foundations that drive digital growth.",
        tags: ["React", "Architecture", "Speed"]
    },
    {
        title: "Redesign",
        icon: RefreshCw,
        color: "#ffd447",
        desc: "Breathing new life into legacy platforms. Enhancing usability, speed, and security for the modern era.",
        tags: ["Evolution", "Speed", "Security"]
    },
    {
        title: "Database",
        icon: Layers,
        color: "#66bcb4",
        desc: "Sophisticated database solutions ensuring information is organized, accessible, and impenetrable.",
        tags: ["SQL", "NoSQL", "Logic"]
    },
    {
        title: "Strategy",
        icon: Globe,
        color: "#ec802b",
        desc: "Positioning your brand on the global map. Ensuring you resonate with audiences across cultures and borders.",
        tags: ["Growth", "Global", "Scale"]
    },
    {
        title: "Intelligence",
        icon: Bot,
        color: "#a08ac0",
        desc: "Empowering platforms with next-gen AI. From smart chatbots to predictive analytics and automation.",
        tags: ["AI", "LLM", "Automate"]
    }
];

export default function CandyServices() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <CandyLayout>
            <div className="relative pt-48 pb-32 px-4 md:px-8 overflow-hidden">

                {/* HERO */}
                <section className="container mx-auto mb-32 relative z-10">
                    <div className="max-w-4xl">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-[10vw] md:text-7xl font-display font-black leading-[1.1] tracking-tighter uppercase italic mb-12"
                        >
                            <span className={isDark ? "text-white/10" : "text-black/10"}>The</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ca2fb] via-[#ee5781] to-[#ffd447]">Arsenal</span>
                        </motion.h1>
                        <p className={`text-2xl md:text-3xl font-body font-bold ${isDark ? "text-white/40" : "text-black/40"} italic leading-tight`}>
                            Capabilities woven into digital reality. Designing and developing for a world that demands better interaction.
                        </p>
                    </div>
                </section>

                {/* SERVICE BENTO */}
                <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32 relative z-10">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className={`p-8 md:p-12 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white'} backdrop-blur-2xl rounded-[3rem] md:rounded-[5rem] border-4 md:border-8 shadow-2xl relative overflow-hidden group`}
                        >
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[3.5rem] flex items-center justify-center shadow-xl shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform" style={{ backgroundColor: s.color }}>
                                    <s.icon className="text-white" size={window?.innerWidth < 768 ? 32 : 48} />
                                </div>
                                <div className="text-center md:text-left overflow-hidden w-full">
                                    <h3 className={`text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase italic ${isDark ? 'text-white/90' : 'text-black/80'} mb-6 break-words tracking-tighter`}>{s.title}</h3>
                                    <p className={`text-lg md:text-xl font-medium ${isDark ? 'text-white/30' : 'text-black/30'} italic leading-tight mb-8`}>{s.desc}</p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        {s.tags.map((t, idx) => (
                                            <span key={idx} className={`px-4 md:px-6 py-2 ${isDark ? 'bg-white/10 text-white/40 border-white/5' : 'bg-black/5 text-black/40 border-black/5'} rounded-full text-[10px] font-black uppercase tracking-widest border`}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={`absolute -bottom-10 -right-10 text-[6rem] md:text-[10rem] font-black ${isDark ? 'text-white/[0.02]' : 'text-black/[0.02]'} italic select-none`}>0{i + 1}</div>
                        </motion.div>
                    ))}
                </section>

                {/* CTA BOX */}
                <section className="container mx-auto">
                    <div className={`p-12 md:p-24 ${isDark ? 'bg-[#ffd447]/10 border-white/10' : 'bg-[#ffd447] border-white'} text-black rounded-[3rem] md:rounded-[5rem] shadow-2xl relative overflow-hidden group text-center border-4 md:border-8`}>
                        <div className="absolute inset-0 bg-white/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className={`text-4xl md:text-8xl font-display font-black uppercase italic mb-12 md:mb-16 relative z-10 leading-none ${isDark ? 'text-white' : 'text-black'}`}>
                            Ready To <br /> <span className={`${isDark ? 'text-[#ffd447]' : 'text-white'} drop-shadow-lg`}>Evolve?</span>
                        </h2>
                        <Link href="/contact" className="relative z-10 inline-flex items-center gap-6 px-10 md:px-16 py-6 md:py-8 bg-black text-white text-xl md:text-2xl font-black rounded-[1.5rem] md:rounded-[2rem] hover:scale-110 active:scale-95 transition-all shadow-2xl">
                            START PROJECT <MousePointer2 className="fill-current text-[#ffd447]" size={window?.innerWidth < 768 ? 24 : 32} />
                        </Link>
                    </div>
                </section>

            </div>
        </CandyLayout>
    );
}
