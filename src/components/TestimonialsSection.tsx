"use client";

import { useRef, useState, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
        avatar: "/assets/testimonials/sarah.webp",
        rating: 5,
        text: "Mowglai transformed our online presence completely. Their attention to detail and creative vision exceeded all expectations. Highly recommended!",
        accent: "gold",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Founder",
        company: "NexGen Solutions",
        avatar: "/assets/testimonials/michael.webp",
        rating: 5,
        text: "The team delivered a stunning e-commerce platform that boosted our sales by 200%. Their technical expertise is truly world-class.",
        accent: "green",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Marketing Director",
        company: "Bloom Agency",
        avatar: "/assets/testimonials/emily.webp",
        rating: 5,
        text: "Working with Mowglai was a pleasure from start to finish. They understood our vision and brought it to life beautifully.",
        accent: "gold",
    },
    {
        id: 4,
        name: "David Thompson",
        role: "CTO",
        company: "Innovate Labs",
        avatar: "/assets/testimonials/david.webp",
        rating: 5,
        text: "Exceptional work! The web application they built for us is fast, secure, and beautifully designed. Our users love it!",
        accent: "green",
    },
    {
        id: 5,
        name: "Lisa Anderson",
        role: "Founder",
        company: "Creative Studio",
        avatar: "/assets/testimonials/lisa.webp",
        rating: 5,
        text: "Mowglai's team is professional, creative, and delivers on time. They turned our ideas into a stunning reality.",
        accent: "gold",
    },
    {
        id: 6,
        name: "James Wilson",
        role: "CEO",
        company: "Digital Ventures",
        avatar: "/assets/testimonials/james.webp",
        rating: 5,
        text: "Best investment we made. The website they created increased our conversion rate by 150%. Outstanding results!",
        accent: "green",
    }
];

interface TestimonialsSectionProps {
    isDark?: boolean;
}

const TestimonialsSection = ({ isDark: isDarkProp }: TestimonialsSectionProps) => {
    const { resolvedTheme } = useTheme();

    const isDark = isDarkProp ?? resolvedTheme === "dark";
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!scrollContainerRef.current) return;
            if (e.key === "ArrowLeft") {
                scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            } else if (e.key === "ArrowRight") {
                scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <section id="testimonials" className="w-full relative py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header - Massive Style matching Mission Section */}
                <div className="mb-20 relative text-center" data-aos="fade-up">
                    <h2 className="text-[10vw] leading-[0.8] font-display font-black tracking-tighter text-foreground relative z-10 flex flex-col items-center">
                        <span className="opacity-10">TRUE</span>
                        <span className="text-primary -mt-4">VOICES</span>
                    </h2>

                    {/* Decorative Background Text */}
                    <div className="absolute -top-10 left-0 w-full text-center opacity-[0.03] select-none pointer-events-none font-display font-black text-[25vw] leading-none whitespace-nowrap">
                        ECHOES
                    </div>
                </div>

                {/* Horizontal Scroll Carousel */}
                <div className="relative">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <div
                        ref={scrollContainerRef}
                        className={cn(
                            "flex overflow-x-auto gap-8 pb-12 pt-4 px-4 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing",
                            isDragging ? "cursor-grabbing snap-none" : ""
                        )}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {testimonials.map((t, i) => (
                            <div
                                key={t.id}
                                data-aos="fade-up"
                                data-aos-delay={i * 100}
                                className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center"
                            >
                                <div className={cn(
                                    "h-full relative p-10 border transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center shadow-lg overflow-hidden",
                                    // Style-specific Logic
                                    "rounded-3xl bg-[#0a2310]/95", // Original (Default)

                                    t.accent === "gold"
                                        ? "border-primary/30 hover:border-primary shadow-primary/10"
                                        : "border-emerald-500/30 hover:border-emerald-500 shadow-emerald-500/10",
                                )}>
                                    {/* Accent Glow */}
                                    <div className={cn(
                                        "absolute -bottom-20 -right-20 w-64 h-64 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full",
                                        t.accent === "gold" ? "bg-primary" : "bg-emerald-500"
                                    )} />

                                    <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-30 transition-opacity">
                                        <Quote size={80} className={cn(
                                            "fill-current",
                                            t.accent === "gold" ? "text-primary" : "text-emerald-500"
                                        )} />
                                    </div>

                                    <div className="mb-6 relative">
                                        <div className={cn(
                                            "w-24 h-24 rounded-full p-1 border-2 transition-colors duration-500",
                                            t.accent === "gold" ? "border-primary/30 group-hover:border-primary" : "border-emerald-500/30 group-hover:border-emerald-500"
                                        )}>
                                            <Avatar className="w-full h-full">
                                                <AvatarImage src={t.avatar} />
                                                <AvatarFallback className={cn(
                                                    "font-bold text-2xl",
                                                    t.accent === "gold" ? "bg-primary/10 text-primary" : "bg-emerald-500/10 text-emerald-500"
                                                )}>
                                                    {t.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-6">
                                        {[...Array(t.rating)].map((_, j) => (
                                            <Star key={j} size={16} className={cn(
                                                "fill-current",
                                                t.accent === "gold" ? "text-primary" : "text-emerald-500"
                                            )} />
                                        ))}
                                    </div>

                                    <p className="text-lg md:text-xl font-light italic leading-relaxed text-foreground/90 mb-8 z-10">
                                        "{t.text}"
                                    </p>

                                    <div className="mt-auto border-t border-primary/10 pt-6 w-full">
                                        <h4 className="font-display font-bold text-foreground text-lg uppercase tracking-wide">{t.name}</h4>
                                        <p className={cn(
                                            "text-xs font-medium tracking-widest uppercase mt-1",
                                            t.accent === "gold" ? "text-primary" : "text-emerald-500"
                                        )}>{t.role} @ {t.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Drag Indicator */}
            <div
                className={cn(
                    "mt-8 flex justify-center items-center gap-3 text-primary/60 font-display tracking-widest uppercase text-sm transition-opacity duration-500",
                    isDragging || scrollLeft > 0 ? "opacity-0" : "opacity-100 animate-pulse"
                )}
            >
                <span className="hidden md:inline">Drag to Explore</span>
                <span className="md:hidden">Swipe to Explore</span>
                <MoveRight className="w-4 h-4 animate-float-horizontal" />
            </div>
        </section>
    );
}

export default TestimonialsSection;