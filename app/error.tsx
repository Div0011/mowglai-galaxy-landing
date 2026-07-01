"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomCursor from "@/components/CustomCursor";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground selection:bg-primary/30 cursor-auto">
            <CustomCursor />
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)]" />
                <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/5 blur-[120px] animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center">
                <div className="relative mb-8">
                    <h1 className="font-display text-[10rem] leading-none text-destructive opacity-10 blur-sm md:text-[14rem]">
                        ERROR
                    </h1>
                    <h1 className="glow-text absolute inset-0 flex items-center justify-center font-display text-6xl text-destructive md:text-8xl">
                        S.O.S
                    </h1>
                </div>

                <div className="glass-card max-w-lg p-8 md:p-12 mb-12 border-destructive/20 hover:border-destructive/30">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-destructive/10 p-4 ring-1 ring-destructive/20">
                            <AlertCircle className="h-8 w-8 text-destructive animate-pulse" />
                        </div>
                    </div>

                    <h2 className="mb-4 font-display text-3xl md:text-4xl text-destructive">
                        System Turbulence
                    </h2>
                    <p className="mb-8 text-lg text-muted-foreground font-body leading-relaxed">
                        We've encountered unexpected friction in the digital atmosphere. Our team is working to stabilize the system.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            onClick={() => reset()}
                            className="group h-12 bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 px-8 transition-all duration-300"
                        >
                            <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                            Recalibrate
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            className="h-12 border-primary/20 bg-primary/5 px-8 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Return to Base
                            </Link>
                        </Button>
                    </div>
                </div>

                <p className="font-body text-sm text-muted-foreground/50 tracking-widest uppercase">
                    Emergency Protocol • Mowglai Control Box
                </p>
            </div>
        </div>
    );
}
