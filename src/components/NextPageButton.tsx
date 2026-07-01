"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/Magnetic";
import { useState } from "react";

interface NextPageButtonProps {
    label: string;
    href: string;
    tagline?: string;
    className?: string;
}

const NextPageButton = ({ label, href, tagline, className }: NextPageButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={cn("w-screen ml-[calc(50%-50vw)] h-[300px] flex flex-col items-center justify-center relative overflow-x-hidden overflow-y-visible", className)}>
            {/* Inject Moving Grid Keyframes */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes grid-move-left-to-right {
                    0% { background-position: 0px 0px; }
                    100% { background-position: 40px 0px; }
                }
            `}} />

            {/* Extreme Left to Extreme Right Moving Grid Background */}
            <div 
                className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(230, 185, 61, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(230, 185, 61, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    animation: 'grid-move-left-to-right 12s linear infinite',
                }}
            />

            {/* Tagline - Just above button */}
            {tagline && (
                <p className="relative z-10 text-xs md:text-sm font-display tracking-widest uppercase mb-6 text-muted-foreground/60" data-aos="fade-up">
                    {tagline}
                </p>
            )}

            {/* Button + Marquee Container */}
            <div className="relative w-full flex items-center justify-center z-10">

                {/* Marquee Trail */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-screen -translate-y-1/2 transform pointer-events-none z-0">
                    <div className="relative flex whitespace-nowrap overflow-hidden py-12">
                        <div className="flex animate-marquee-slow items-center flex-shrink-0">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="inline-flex items-center gap-6 mx-10 text-xl sm:text-3xl md:text-4xl font-display font-black text-foreground/[0.08] uppercase tracking-widest"
                                >
                                    <span>{label}</span>
                                    <ArrowRight className="w-8 h-8 opacity-20" strokeWidth={2} />
                                </div>
                            ))}
                        </div>
                        <div className="flex animate-marquee-slow items-center flex-shrink-0" aria-hidden="true">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="inline-flex items-center gap-6 mx-10 text-xl sm:text-3xl md:text-4xl font-display font-black text-foreground/[0.08] uppercase tracking-widest"
                                >
                                    <span>{label}</span>
                                    <ArrowRight className="w-8 h-8 opacity-20" strokeWidth={2} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Big Button */}
                <Magnetic>
                    <Link
                        href={href}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={cn(
                            "relative z-10 flex px-6 sm:px-12 py-4 sm:py-6 rounded-full border-2 border-primary/20 bg-transparent transition-all duration-500 overflow-hidden backdrop-blur-sm scale-100 sm:scale-110 md:scale-125",
                            isHovered ? "bg-primary text-primary-foreground shadow-[0_0_50px_rgba(var(--primary-rgb),0.5)]" : "text-foreground hover:bg-white/5"
                        )}
                    >
                        <div className="flex items-center gap-3 sm:gap-4 text-xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight uppercase leading-none z-10 w-full h-full">
                            <span>{label}</span>
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden flex items-center justify-center translate-y-[-1px]">
                                <span
                                    className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] font-light text-4xl sm:text-5xl"
                                    style={{
                                        transform: isHovered ? 'translateX(100%)' : 'translateX(0)',
                                        opacity: isHovered ? 0 : 1
                                    }}
                                >
                                    -
                                </span>
                                <ArrowRight
                                    strokeWidth={2}
                                    className="absolute inset-0 m-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground"
                                    style={{
                                        transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                                        opacity: isHovered ? 1 : 0
                                    }}
                                />
                            </div>
                        </div>
                    </Link>
                </Magnetic>
            </div>
        </div>
    );
};

export default NextPageButton;
