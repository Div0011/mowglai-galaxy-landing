"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    text: string;
    accent: "gold" | "green";
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "Mowglai transformed our online presence completely. Their attention to detail and creative vision exceeded all expectations. Highly recommended!",
        accent: "gold",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Founder",
        company: "NexGen Solutions",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "The team delivered a stunning e-commerce platform that boosted our sales by 200%. Their technical expertise is truly world-class.",
        accent: "green",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Marketing Director",
        company: "Bloom Agency",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "Working with Mowglai was a pleasure from start to finish. They understood our vision and brought it to life beautifully.",
        accent: "gold",
    },
    {
        id: 4,
        name: "David Thompson",
        role: "CTO",
        company: "Innovate Labs",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "Exceptional work! The web application they built for us is fast, secure, and beautifully designed. Our users love it!",
        accent: "green",
    },
    {
        id: 5,
        name: "Lisa Anderson",
        role: "Founder",
        company: "Creative Studio",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "Mowglai's team is professional, creative, and delivers on time. They turned our ideas into a stunning reality.",
        accent: "gold",
    },
    {
        id: 6,
        name: "James Wilson",
        role: "CEO",
        company: "Digital Ventures",
        avatar: "/placeholder.svg?height=100&width=100",
        rating: 5,
        text: "Best investment we made. The website they created increased our conversion rate by 150%. Outstanding results!",
        accent: "green",
    },
];

interface TestimonialsSectionProps {
    isDark?: boolean;
}

export default function TestimonialsSection({ isDark = true }: TestimonialsSectionProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section id="testimonials" className="w-full relative py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header - Massive Style matching Mission Section */}
                <div className="mb-16 relative" data-aos="fade-up">
                    <h2 className="text-[10vw] leading-[0.8] font-display font-black tracking-tighter text-foreground relative z-10 flex flex-col items-center text-center">
                        <span className="opacity-10">TRUE</span>
                        <span className="text-primary -mt-4">VOICES</span>
                    </h2>

                    {/* Decorative Background Text */}
                    <div className="absolute -top-10 left-0 w-full text-center opacity-[0.03] select-none pointer-events-none font-display font-black text-[25vw] leading-none whitespace-nowrap">
                        ECHOES
                    </div>
                </div>

                {/* Bubble Trail Stage - Horizontal Marquee */}
                <div
                    className={cn(
                        "relative flex items-center overflow-visible transition-all duration-700",
                        selectedId ? "min-h-[700px] py-12" : "min-h-[500px]"
                    )}
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

                    <div className="w-full relative overflow-hidden group/marquee border-y border-primary/5 py-12">
                        <div className="flex animate-marquee-horizontal hover:[animation-play-state:paused] gap-12 px-[25vw] whitespace-nowrap items-center min-w-full overflow-visible">
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <motion.div
                                    layout
                                    key={`${t.id}-${i}`}
                                    onClick={() => setSelectedId(selectedId === t.id ? null : t.id)}
                                    onMouseEnter={() => setSelectedId(t.id)}
                                    onMouseLeave={() => setSelectedId(null)}
                                    className={cn(
                                        "relative cursor-pointer flex-shrink-0 flex items-center justify-center whitespace-normal",
                                        selectedId === t.id ? "z-50" : "z-10"
                                    )}
                                    initial={false}
                                    animate={{
                                        width: selectedId === t.id ? (window.innerWidth < 768 ? '90vw' : '450px') : '150px',
                                        height: selectedId === t.id ? 'auto' : '150px',
                                        minHeight: selectedId === t.id ? '380px' : '150px',
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 25,
                                        mass: 0.8
                                    }}
                                >
                                    {/* Glass Body - The actual expanding container */}
                                    <div className={cn(
                                        "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
                                        selectedId === t.id ? "rounded-[2.5rem] bg-background/90 border-2 border-primary shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] glass-card" : "rounded-full bg-primary/5 border border-primary/20"
                                    )} />

                                    {/* Content Wrapper */}
                                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 text-center">
                                        {/* Avatar - Shifts up when expanded */}
                                        <div className={cn(
                                            "rounded-full p-1 border-2 transition-all duration-500 shrink-0",
                                            selectedId === t.id ? "w-24 h-24 border-primary mb-4" : "w-32 h-32 border-transparent"
                                        )}>
                                            <Avatar className="w-full h-full border-none">
                                                <AvatarImage src={t.avatar} />
                                                <AvatarFallback className="bg-primary/20 text-primary font-bold text-2xl">
                                                    {t.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>

                                        {/* Expanded Info */}
                                        <AnimatePresence>
                                            {selectedId === t.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="flex flex-col items-center"
                                                >
                                                    <Quote className="text-primary/20 w-8 h-8 mb-2" />
                                                    <p className="text-sm md:text-base font-body leading-relaxed text-foreground italic mb-4">
                                                        "{t.text}"
                                                    </p>
                                                    <div className="flex flex-col items-center border-t border-primary/10 pt-4 w-full">
                                                        <p className="font-display font-bold text-foreground text-sm uppercase">{t.name}</p>
                                                        <p className="text-xs text-primary mb-2 uppercase tracking-tighter">{t.role} @ {t.company}</p>
                                                        <div className="flex gap-1">
                                                            {[...Array(t.rating)].map((_, j) => (
                                                                <Star key={j} size={12} className="fill-primary text-primary" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Decorative Text - Jungle Theme */}
                <div className="mt-16 text-center">
                    <p className="text-sm font-display tracking-[1em] text-foreground/20 uppercase">
                        Architecting Trust In the Wild
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes marquee-horizontal {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-horizontal {
                    animation: marquee-horizontal 40s linear infinite;
                }
            `}</style>
        </section>
    );
}