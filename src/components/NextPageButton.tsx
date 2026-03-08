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
}

const NextPageButton = ({ label, href, tagline }: NextPageButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-screen ml-[calc(50%-50vw)] h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Tagline - Just above button */}
            {tagline && (
                <p className="relative z-10 text-xs md:text-sm font-display tracking-widest uppercase mb-6 text-muted-foreground/60" data-aos="fade-up">
                    {tagline}
                </p>
            )}

            {/* Button + Marquee Container - Linked together for alignment */}
            <div className="relative w-full flex items-center justify-center">

                {/* Marquee Trail - Robust breakout and consistent slow speed */}
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

                {/* Main Big Button - Now in Foreground */}
                <Magnetic>
                    <Link
                        href={href}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={cn(
                            "relative z-10 flex px-6 sm:px-12 py-4 sm:py-6 rounded-full border-2 border-primary/20 bg-background/40 transition-all duration-500 overflow-hidden backdrop-blur-xl scale-100 sm:scale-110 md:scale-125",
                            isHovered ? "bg-primary text-primary-foreground" : "text-foreground"
                        )}
                    >
                        <div className="flex items-center gap-3 sm:gap-4 text-xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight uppercase leading-none z-10 w-full h-full">
                            <span>{label}</span>
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden flex items-center justify-center translate-y-[-1px]">
                                {/* Dash - visible by default, slides right and fades on hover */}
                                <span
                                    className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] font-light text-4xl sm:text-5xl"
                                    style={{
                                        transform: isHovered ? 'translateX(100%)' : 'translateX(0)',
                                        opacity: isHovered ? 0 : 1
                                    }}
                                >
                                    -
                                </span>
                                {/* Arrow - hidden to the left by default, slides center and appears on hover */}
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
