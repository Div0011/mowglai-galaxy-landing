"use client";

import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";
import NextPageButton from "@/components/NextPageButton";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function OriginalContact() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const { t } = useLanguage();
    const { Contact } = t;

    return (
        <PageLayout>
            <ContactSection />

            <section className="relative py-20">
                <div className="container mx-auto px-6">
                    <div className={cn("p-8 sm:p-12 md:p-20 rounded-[2.5rem] sm:rounded-[3rem] border border-primary/20 text-center relative overflow-hidden group mx-4 md:mx-0 text-foreground bg-secondary/10 backdrop-blur-xl shadow-2xl")}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-primary/10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32 transition-all group-hover:bg-primary/10" />

                        <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-primary mx-auto mb-6 sm:mb-8 opacity-50" />
                        <h2 className="flex flex-col items-center gap-2 sm:gap-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-foreground mb-12 uppercase leading-[1.1] sm:leading-none px-2 tracking-tight">
                            <span className="block opacity-60">NEED A CUSTOMIZED</span>
                            <span className="block text-primary text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tighter">QUOTATION?</span>
                        </h2>
                        <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 px-4 leading-relaxed">
                            {Contact.customQuote.description}
                        </p>

                        <div className="relative w-full flex items-center justify-center">
                            {/* Background Trail behind button - Full width breakout */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[100vw] -translate-y-1/2 transform pointer-events-none z-0 overflow-hidden">
                                <div className="flex animate-marquee-slow whitespace-nowrap gap-10 items-center py-4">
                                    {[...Array(6)].map((_, groupIndex) => (
                                        <div key={groupIndex} className="flex gap-10 md:gap-20 items-center px-6 md:px-10">
                                            {[Contact.customQuote.buttonMain, Contact.customQuote.buttonSub].map((label, i) => (
                                                <span key={i} className="text-xl sm:text-2xl md:text-3xl font-display font-black text-foreground/10 uppercase tracking-[0.2em] leading-none">
                                                    {label}
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button asChild className="relative z-10 w-full sm:w-auto px-5 sm:px-12 py-6 sm:py-8 text-[10px] sm:text-xl font-display font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] mx-auto inline-flex items-center justify-center">
                                <Link href="/custom-request" className="flex flex-col sm:flex-row items-center justify-center leading-tight gap-1 sm:gap-3">
                                    <span className="whitespace-nowrap">{Contact.customQuote.buttonMain}</span>
                                    <span className="whitespace-nowrap">{Contact.customQuote.buttonSub}</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <NextPageButton label={t.Common.agency} href="/" />
        </PageLayout>
    );
}
