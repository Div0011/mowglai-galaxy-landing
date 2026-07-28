"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, ArrowRight, MessageCircle, Home, Sparkles, Clock, FileText, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import JungleBackground from "@/components/JungleBackground";
import MowglaiLogo from "@/components/MowglaiLogo";

function ThankYouContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const rawName = searchParams.get("name") || "";
    const rawForm = searchParams.get("form") || "Form Submission";

    const name = rawName ? rawName.trim() : "";
    const formName = rawForm ? rawForm.trim() : "Form Submission";

    const [referenceId, setReferenceId] = useState("");
    const [submissionTime, setSubmissionTime] = useState("");

    useEffect(() => {
        // Generate reference ID and submission timestamp on client
        const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        setReferenceId(`MWG-2026-${randomCode}`);
        setSubmissionTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));

        // Fire Conversion Tracking Events for GA4, Google Ads, Meta Pixel & GTM
        try {
            if (typeof window !== "undefined") {
                // Google Analytics / Ads Gtag Conversion Event
                if (typeof (window as unknown as { gtag?: Function }).gtag === "function") {
                    (window as unknown as { gtag: Function }).gtag("event", "conversion", {
                        send_to: "AW-CONVERSION_ID/conversion_label",
                        event_category: "Lead Submission",
                        event_label: formName,
                        value: 1.0,
                        currency: "USD",
                    });
                    (window as unknown as { gtag: Function }).gtag("event", "generate_lead", {
                        form_name: formName,
                        user_name: name || "Anonymous",
                    });
                }

                // Meta / Facebook Pixel Lead Event
                if (typeof (window as unknown as { fbq?: Function }).fbq === "function") {
                    (window as unknown as { fbq: Function }).fbq("track", "Lead", {
                        content_name: formName,
                        status: "submitted",
                    });
                }

                // Google Tag Manager dataLayer push
                const dataLayer = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
                if (Array.isArray(dataLayer)) {
                    dataLayer.push({
                        event: "conversion_thank_you",
                        form_name: formName,
                        user_name: name || "Visitor",
                        reference_id: `MWG-2026-${randomCode}`,
                    });
                }
            }
        } catch (err) {
            console.error("Conversion tracking dispatch error:", err);
        }
    }, [formName, name]);

    const whatsappMessage = `Hi Mowglai Team, I've just submitted my details via ${formName}${name ? ` (Name: ${name})` : ""}. Reference ID: ${referenceId || "MWG-2026"}. I'd like to discuss the next steps!`;
    const whatsappUrl = `https://wa.me/919452476331?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="relative min-h-screen text-foreground font-sans pt-28 md:pt-36 pb-20 px-4 md:px-8 flex flex-col items-center">
            {/* Top Logo Navigation */}
            <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] left-[calc(0.875rem+env(safe-area-inset-left))] md:top-[calc(2rem+env(safe-area-inset-top))] md:left-[calc(2rem+env(safe-area-inset-left))] z-[60]">
                <button
                    onClick={() => router.push('/')}
                    className="group/logo flex items-center"
                    aria-label="Back to Home"
                >
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 shrink-0">
                        <MowglaiLogo size="lg" className="w-12 h-12 md:w-14 md:h-14 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] group-hover/logo:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all duration-500" />
                    </div>
                    <span className="font-display font-black text-lg md:text-xl tracking-[0.35em] text-primary uppercase opacity-0 max-w-0 overflow-hidden ml-0 group-hover/logo:opacity-100 group-hover/logo:max-w-[200px] group-hover/logo:ml-3 transition-all duration-500 ease-out select-none whitespace-nowrap">
                        MOWGLAI
                    </span>
                </button>
            </div>

            <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center z-10">

                {/* Conversion Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-xl mb-8 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)]"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                    </span>
                    <span className="text-primary text-xs font-mono font-bold tracking-[0.25em] uppercase">
                        Conversion Logged · {referenceId || "MWG-2026"}
                    </span>
                </motion.div>

                {/* Animated Success Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-150 animate-pulse" />
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/40 p-0.5 shadow-[0_0_50px_rgba(var(--primary-rgb),0.4)]">
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-14 h-14 md:w-16 md:h-16 text-primary" />
                        </div>
                    </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6"
                >
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[1.05] uppercase">
                        {name ? (
                            <>
                                Thank You, <span className="text-primary italic">{name}!</span>
                            </>
                        ) : (
                            <>
                                Thank You <span className="text-primary italic">for Reaching Out!</span>
                            </>
                        )}
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg md:text-2xl text-foreground/80 font-light max-w-2xl leading-relaxed mb-12"
                >
                    Your request via <span className="text-primary font-semibold">{formName}</span> has been transmitted directly to our digital command center.
                </motion.p>

                {/* Confirmation Record Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-full glass-card p-6 md:p-10 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-background/70 via-background/40 to-primary/5 shadow-2xl backdrop-blur-2xl mb-12 text-left"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-6 border-b border-primary/10 gap-4">
                        <div>
                            <p className="text-xs font-mono tracking-widest text-primary/70 uppercase font-bold mb-1">
                                Submission Dossier
                            </p>
                            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                                Lead Reference #{referenceId || "MWG-2026"}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" /> Priority Queued
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider font-bold">
                                <FileText className="w-3.5 h-3.5 text-primary" /> Source Form
                            </div>
                            <p className="text-foreground font-medium text-sm md:text-base">{formName}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider font-bold">
                                <Clock className="w-3.5 h-3.5 text-primary" /> Timestamp
                            </div>
                            <p className="text-foreground font-medium text-sm md:text-base">{submissionTime || "Just now"}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider font-bold">
                                <Sparkles className="w-3.5 h-3.5 text-primary" /> Guaranteed Reply
                            </div>
                            <p className="text-foreground font-medium text-sm md:text-base">Within 24 Hours</p>
                        </div>
                    </div>
                </motion.div>

                {/* 3-Step What Happens Next Roadmap */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="w-full mb-12"
                >
                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.35em] text-primary/70 mb-8">
                        What Happens Next
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        {/* Step 1 */}
                        <div className="p-6 md:p-8 rounded-3xl border border-primary/15 bg-foreground/[0.02] backdrop-blur-md relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
                            <div className="text-4xl font-display font-black text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">01</div>
                            <h4 className="text-lg font-display font-bold text-foreground mb-2">Blueprint Assessment</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Our technical architects & strategists analyze your requirements and project scope.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="p-6 md:p-8 rounded-3xl border border-primary/15 bg-foreground/[0.02] backdrop-blur-md relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
                            <div className="text-4xl font-display font-black text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">02</div>
                            <h4 className="text-lg font-display font-bold text-foreground mb-2">Custom Proposal</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We formulate a tailored roadmap, transparent timeline, and accurate cost estimate.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="p-6 md:p-8 rounded-3xl border border-primary/15 bg-foreground/[0.02] backdrop-blur-md relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
                            <div className="text-4xl font-display font-black text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">03</div>
                            <h4 className="text-lg font-display font-bold text-foreground mb-2">Kickoff & Execution</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We connect with you via WhatsApp or Email to lock requirements and begin design.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Call-To-Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl"
                >
                    {/* WhatsApp Fast Track */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-[1.02] cursor-pointer"
                    >
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>Instant WhatsApp Chat</span>
                    </a>

                    {/* Return Home */}
                    <Button
                        onClick={() => router.push("/")}
                        variant="outline"
                        className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-5 h-auto rounded-full border-primary/20 hover:bg-primary/10 text-foreground font-display font-bold uppercase tracking-widest text-sm transition-all duration-300"
                    >
                        <Home className="w-4 h-4 text-primary" />
                        <span>Return Home</span>
                    </Button>
                </motion.div>

                {/* Footer note */}
                <p className="mt-12 text-xs font-mono text-muted-foreground/60 tracking-wider">
                    Need urgent technical assistance? Email us directly at <a href="mailto:info@mowglai.com" className="text-primary hover:underline">info@mowglai.com</a>
                </p>

            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <PageLayout>
            <div className="fixed inset-0 pointer-events-none -z-20">
                <JungleBackground />
            </div>
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center text-primary font-display font-bold">
                    Loading Conversion Matrix...
                </div>
            }>
                <ThankYouContent />
            </Suspense>
        </PageLayout>
    );
}
