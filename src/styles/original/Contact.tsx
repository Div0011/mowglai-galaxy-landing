"use client";

import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";
import NextPageButton from "@/components/NextPageButton";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function OriginalContact() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <PageLayout>
            <ContactSection />

            <section className="relative py-20">
                <div className="container mx-auto px-6">
                    <div className={cn("p-8 sm:p-12 md:p-20 rounded-[2.5rem] sm:rounded-[3rem] border-primary/20 text-center relative overflow-hidden group mx-4 md:mx-0 text-foreground", isDark ? "bg-[#253218]/95" : "glass-card")}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-primary/10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32 transition-all group-hover:bg-primary/10" />

                        <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-8 opacity-50" />
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-black text-foreground mb-8 uppercase leading-tight px-2">
                            NEED <span className="opacity-20">A</span> CUSTOMIZED QUOTATION?
                        </h2>
                        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 px-4">
                            Every project is unique. Let us provide a detailed, tailored breakdown of costs and timelines for your specific requirements.
                        </p>
                        <Button asChild className="w-full sm:w-auto px-4 sm:px-12 py-6 sm:py-8 text-sm sm:text-xl font-display font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] mx-auto inline-flex items-center justify-center">
                            <Link href="/custom-request" className="flex flex-col sm:flex-row items-center leading-tight">
                                <span className="whitespace-nowrap">REQUEST CUSTOM</span>
                                <span className="sm:ml-2 whitespace-nowrap">QUOTATION</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <NextPageButton label="BACK TO START" href="/" />
        </PageLayout>
    );
}
