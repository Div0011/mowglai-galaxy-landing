"use client";

import { useEffect } from "react";
import { MoveLeft, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();

    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", pathname);
    }, [pathname]);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground selection:bg-primary/30 cursor-auto">
            <CustomCursor />
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05)_0%,transparent_70%)]" />
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

                {/* Twinkling Stars Effect */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-primary/40 animate-twinkle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.2
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center">
                <div className="relative mb-8">
                    <h1 className="font-display text-[12rem] leading-none text-primary opacity-10 blur-sm md:text-[18rem]">
                        404
                    </h1>
                    <h1 className="glow-text absolute inset-0 flex items-center justify-center font-display text-8xl transition-all duration-500 hover:scale-105 md:text-9xl">
                        404
                    </h1>
                </div>

                <div className="glass-card max-w-lg p-8 md:p-12 mb-12">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-primary/10 p-4 ring-1 ring-primary/20">
                            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                        </div>
                    </div>

                    <h2 className="mb-4 font-display text-3xl md:text-4xl text-primary">
                        Cosmos Disconnected
                    </h2>
                    <p className="mb-8 text-lg text-muted-foreground font-body leading-relaxed">
                        It seems you've drifted beyond our digital frontier. The path you're seeking doesn't exist in this coordinate of the Mowglai galaxy.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            variant="outline"
                            className="group h-12 border-primary/20 bg-primary/5 px-8 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
                                Return to Base
                            </Link>
                        </Button>

                        <Button
                            onClick={() => window.history.back()}
                            variant="ghost"
                            className="h-12 px-8 hover:bg-white/5 transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Go Back
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Footer Link */}
                <p className="font-body text-sm text-muted-foreground/50 tracking-widest uppercase">
                    Mowglai • Evolving Since 2025
                </p>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" />
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-[80px]" />
        </div>
    );
}
