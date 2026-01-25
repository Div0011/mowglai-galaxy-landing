"use client";

import PageLayout from "@/components/PageLayout";
import PricingSection from "@/components/PricingSection";
import NextPageButton from "@/components/NextPageButton";
import { Button } from "@/components/ui/button";
import { Download, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { downloadAsHtml } from "@/utils/pdfDownloader";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function InvestmentClient() {
    const { resolvedTheme } = useTheme();
    const [planType, setPlanType] = useState<"standard" | "premium">("standard");

    return (
        <PageLayout>
            <section className="relative pt-16 pb-16">
                <div className="container mx-auto px-6">
                    {/* Header - Two-line style */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 px-4 md:px-0">
                        <div data-aos="fade-right">
                            <h1 className="text-4xl sm:text-6xl md:text-[8vw] font-display font-black text-foreground mb-4 leading-[0.85] flex flex-col uppercase">
                                <span className="opacity-10">THE</span>
                                <span className="text-primary -mt-2">PURCHASE</span>
                            </h1>
                        </div>

                        {/* Plan Toggle Tabs */}
                        <div className="flex bg-primary/5 p-1 rounded-full border border-primary/20 mb-4 w-full md:w-auto" data-aos="fade-left">
                            <button
                                onClick={() => setPlanType("standard")}
                                className={`flex-1 md:flex-none px-6 sm:px-8 py-3 rounded-full font-display font-bold text-xs sm:text-sm transition-all ${planType === "standard" ? "bg-primary text-primary-foreground" : "text-foreground/50 hover:text-foreground"}`}
                            >
                                STANDARD
                            </button>
                            <button
                                onClick={() => setPlanType("premium")}
                                className={`flex-1 md:flex-none px-6 sm:px-8 py-3 rounded-full font-display font-bold text-xs sm:text-sm transition-all ${planType === "premium" ? "bg-primary text-primary-foreground" : "text-foreground/50 hover:text-foreground"}`}
                            >
                                PREMIUM
                            </button>
                        </div>
                    </div>

                    {/* Pricing Content */}
                    <div className="transition-all duration-500">
                        {planType === "standard" ? (
                            <PricingSection />
                        ) : (
                            <div className="py-20 text-center glass-card rounded-[3rem] border-primary/30 bg-gradient-to-br from-primary/10 to-transparent" data-aos="zoom-in">
                                <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
                                <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 uppercase">Apex Solutions</h2>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                                    Our premium tier offers bespoke digital architecture, dedicated 24/7 survival support, and unmatched growth for industry leaders.
                                </p>
                                <Button asChild className="px-12 py-8 text-xl font-display font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all rounded-full">
                                    <a href="mailto:info@mowglai.in">Inquire for Apex</a>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Brochure Section - Glossy Golden Style */}
                    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up">
                        <div className="relative group p-8 sm:p-12 rounded-[2.5rem] flex flex-col items-center text-center border border-primary/30 transition-all duration-700 bg-[linear-gradient(135deg,rgba(252,211,77,0.08),rgba(146,64,14,0.05))] hover:shadow-[0_0_40px_rgba(252,211,77,0.1)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] pointer-events-none" />

                            <Download className="w-12 h-12 text-primary mb-6 animate-bounce" />
                            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-primary">OUR BROCHURE</h3>
                            <p className="text-foreground/70 mb-8 max-w-xs text-lg sm:text-xl leading-relaxed lowercase">Get a detailed breakdown of our wild strategies and success stories.</p>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    downloadAsHtml(`/mowglai-brochure.html`, 'Mowglai_Brochure.html');
                                }}
                                className={cn(
                                    "relative z-20 w-full py-6 rounded-full text-lg sm:text-xl font-display font-bold uppercase flex items-center justify-center cursor-pointer transition-all duration-500",
                                    resolvedTheme === "light"
                                        ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:!text-primary"
                                        : "border border-primary/40 text-primary hover:bg-primary hover:!text-primary-foreground"
                                )}
                            >
                                Download Brochure
                            </button>
                        </div>

                        <div className="relative group p-8 sm:p-12 rounded-[2.5rem] flex flex-col items-center text-center border border-primary/30 transition-all duration-700 bg-[linear-gradient(135deg,rgba(252,211,77,0.08),rgba(146,64,14,0.05))] hover:shadow-[0_0_40px_rgba(252,211,77,0.1)] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] pointer-events-none" />

                            <FileText className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-primary">CUSTOM QUOTATION</h3>
                            <p className="text-foreground/70 mb-8 max-w-xs text-lg sm:text-xl leading-relaxed lowercase">Tell us your goal and we'll generate a personalized strategy for your market habitat.</p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    downloadAsHtml(`/mowglai-quotation.html`, 'Mowglai_Quotation.html');
                                }}
                                className={cn(
                                    "relative z-20 w-full py-6 rounded-full text-lg sm:text-xl font-display font-bold uppercase flex items-center justify-center transition-all duration-500",
                                    resolvedTheme === "light"
                                        ? "bg-primary text-primary-foreground hover:bg-primary-foreground hover:!text-primary"
                                        : "border border-primary/40 text-primary hover:bg-primary hover:!text-primary-foreground"
                                )}
                            >
                                Download Quotation
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <NextPageButton label="START A DIALOGUE" href="/contact" />
        </PageLayout>
    );
}
