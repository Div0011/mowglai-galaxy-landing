"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import PageLayout from "@/components/PageLayout";

export default function ReferralPage() {
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [status, setStatus] = useState<"form" | "submitting" | "success">("form");
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [friendData, setFriendData] = useState({ name: "", email: "", phone: "" });

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleFriendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFriendData({ ...friendData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // DRAFTING THE MESSAGE (Mock logic for the agent's task)
        const referralCode = `MOW10-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
        const draftMessage = `
            From: info@mowglai.in
            To: ${friendData.email}
            Subject: ${userData.name} has a gift for you!

            Hey ${friendData.name},
            Your friend ${userData.name} thinks you'd love Mowglai!
            We build digital experiences that perform, inspire, and grow.
            Use this referral code: ${referralCode} to get 10% OFF your first project.
            Let's build something extraordinary together.

            Cheers,
            The Mowglai Team
        `;
        console.log("Referral Sent from info@mowglai.in:", draftMessage);

        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 2000));

        setStatus("success");
    };

    return (
        <PageLayout>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="min-h-screen selection:bg-primary selection:text-primary-foreground overflow-x-hidden"
            >
                {/* Back Link - Adjusted position */}
                <div className="fixed top-20 left-6 md:top-28 md:left-10 z-[70] pointer-events-none">
                    <div className="pointer-events-auto">
                        <Link href="/" className="flex items-center gap-2 group text-foreground/80 hover:text-primary transition-all bg-background/40 backdrop-blur-xl px-5 py-3 rounded-full border border-primary/20 shadow-2xl">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-display font-bold uppercase tracking-widest text-[10px] md:text-xs">Back to Home</span>
                        </Link>
                    </div>
                </div>

                <section className="relative w-full pt-48 md:pt-56 pb-12 md:pb-24 px-6 min-h-screen flex flex-col justify-start">
                    <div className="container mx-auto">

                        {/* Header */}
                        <div className="mb-24 md:mb-24 relative">
                            <h1 className="text-[18vw] md:text-[10vw] font-display font-black text-foreground select-none relative z-10 leading-[1.4] md:leading-[0.85] tracking-tighter">
                                REFER <br className="md:hidden" /> <span className="text-primary">&</span> EARN
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                            {/* Left Column - Value Prop */}
                            <div className="space-y-10 md:space-y-12">
                                <p className="text-2xl md:text-4xl font-light text-foreground/80 max-w-lg leading-tight md:leading-snug">
                                    Invite your network to the tribe. Getting <span className="text-primary font-bold">10% COMMISSION</span> has never been this elegant.
                                </p>

                                <div className="space-y-8 md:space-y-10 text-muted-foreground">
                                    <div className="space-y-3">
                                        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-primary/60">How it works</p>
                                        <div className="h-px w-16 bg-primary/30" />
                                    </div>
                                    <ul className="space-y-6 md:space-y-8 text-base md:text-lg">
                                        <li className="flex items-start gap-5">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0 mt-0.5">1</div>
                                            <span className="text-foreground/70 leading-relaxed">Share your details and your friend's contact information via the encrypted form.</span>
                                        </li>
                                        <li className="flex items-start gap-5">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0 mt-0.5">2</div>
                                            <span className="text-foreground/70 leading-relaxed">Our system sends an exclusive invite from <span className="text-primary font-mono italic">info@mowglai.in</span> with our official branding.</span>
                                        </li>
                                        <li className="flex items-start gap-5">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs text-primary font-bold shrink-0 mt-0.5">3</div>
                                            <span className="text-foreground/70 leading-relaxed">Your friend will get 5% off for his purchase and you will get 5% as real cash in their bank account or as gift card(the cash will be transferred after handing over the final product to the client).</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right Column - Form */}
                            <div className={cn("p-6 md:p-14 rounded-[2.5rem] border border-primary/20 overflow-hidden relative", isDark ? "bg-black/40" : "glass-card", "backdrop-blur-3xl shadow-2xl")}>
                                {/* Decorative Gradient */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center text-center space-y-8 py-10 md:py-16"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                                            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground relative z-10 shadow-xl">
                                                <CheckCircle2 size={40} className="md:w-12 md:h-12" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-foreground">
                                                Invitation Dispatched
                                            </h2>
                                            <p className="text-base text-muted-foreground max-w-xs mx-auto leading-relaxed">
                                                We've sent a premium **Mowglai Digital Evolution** invite to **{friendData.email}**.
                                            </p>
                                        </div>

                                        <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 w-full text-left space-y-4">
                                            <p className="text-[10px] uppercase tracking-widest text-primary font-black">Email Template Preview</p>
                                            <div className="space-y-2 opacity-80">
                                                <p className="text-sm font-bold text-foreground">Subject: Your Exclusive Invite to Digital Excellence</p>
                                                <div className="h-px bg-primary/10 w-full" />
                                                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                                                    Hey {friendData.name},

                                                    Your friend {userData.name} has shared a secret from the Mowglai Tribe.

                                                    We've reserved a spot for your next project at **10% OFF**.
                                                    Your unique access code is: **MOW10-DISCOUNT**

                                                    Let's evolve your brand together.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 w-full">
                                            <Button
                                                onClick={() => {
                                                    const subject = encodeURIComponent(`${userData.name} has a gift for you!`);
                                                    const body = encodeURIComponent(`Hey ${friendData.name},\n\nYour friend ${userData.name} thinks you'd love Mowglai! We build digital experiences that perform, inspire, and grow.\n\nUse this referral code: MOW10-DISCOUNT to get 10% OFF your first project.\n\nLet's build something extraordinary together.\n\nCheers,\nThe Mowglai Team`);
                                                    window.location.href = `mailto:${encodeURIComponent(friendData.email)}?subject=${subject}&body=${body}`;
                                                }}
                                                className="bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all font-display font-bold px-10 py-7 rounded-full uppercase tracking-widest text-xs w-full shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)]"
                                            >
                                                Launch Email Client
                                            </Button>

                                            <Button
                                                variant="outline"
                                                onClick={() => router.push("/")}
                                                className="border-primary/20 text-primary hover:bg-primary/5 transition-all font-display font-bold px-10 py-7 rounded-full uppercase tracking-widest text-xs w-full"
                                            >
                                                Return to Home
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 relative z-10">
                                        {/* Your Details */}
                                        <div className="space-y-4 md:space-y-6">
                                            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black text-primary/50">Sender Profile</p>
                                            <div className="space-y-6 md:space-y-8">
                                                <div className="group relative">
                                                    <Input
                                                        name="name"
                                                        required
                                                        placeholder="Your Full Name"
                                                        value={userData.name}
                                                        onChange={handleUserChange}
                                                        className="bg-transparent border-0 border-b-2 border-primary/10 rounded-none px-0 py-4 text-sm sm:text-lg md:text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/20 placeholder:text-xs sm:placeholder:text-lg transition-all font-display font-bold"
                                                    />
                                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full" />
                                                </div>
                                                <div className="group relative">
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        required
                                                        placeholder="Your Email Address"
                                                        value={userData.email}
                                                        onChange={handleUserChange}
                                                        className="bg-transparent border-0 border-b-2 border-primary/10 rounded-none px-0 py-4 text-sm sm:text-lg md:text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/20 placeholder:text-xs sm:placeholder:text-lg transition-all font-display font-bold"
                                                    />
                                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Friend Details */}
                                        <div className="space-y-4 md:space-y-6">
                                            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black text-primary/50">Target Destination</p>
                                            <div className="space-y-6 md:space-y-8">
                                                <div className="group relative">
                                                    <Input
                                                        name="name"
                                                        required
                                                        placeholder="Friend's Name"
                                                        value={friendData.name}
                                                        onChange={handleFriendChange}
                                                        className="bg-transparent border-0 border-b-2 border-primary/10 rounded-none px-0 py-4 text-sm sm:text-lg md:text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/20 placeholder:text-xs sm:placeholder:text-lg transition-all font-display font-bold"
                                                    />
                                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full" />
                                                </div>
                                                <div className="group relative">
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        required
                                                        placeholder="Friend's Email Address"
                                                        value={friendData.email}
                                                        onChange={handleFriendChange}
                                                        className="bg-transparent border-0 border-b-2 border-primary/10 rounded-none px-0 py-4 text-sm sm:text-lg md:text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/20 placeholder:text-xs sm:placeholder:text-lg transition-all font-display font-bold"
                                                    />
                                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full" />
                                                </div>
                                                <div className="group relative">
                                                    <Input
                                                        name="phone"
                                                        required
                                                        placeholder="Friend's Phone (WhatsApp)"
                                                        value={friendData.phone}
                                                        onChange={handleFriendChange}
                                                        className="bg-transparent border-0 border-b-2 border-primary/10 rounded-none px-0 py-4 text-sm sm:text-lg md:text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/20 placeholder:text-xs sm:placeholder:text-lg transition-all font-display font-bold"
                                                    />
                                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full" />
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] font-display font-black text-[10px] sm:text-xs md:text-lg py-6 md:py-8 rounded-full transition-all uppercase tracking-[0.1em] md:tracking-[0.2em] shadow-xl group whitespace-normal h-auto min-h-[60px] leading-tight"
                                        >
                                            {status === "submitting" ? (
                                                <motion.span
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                >
                                                    Processing Invitation...
                                                </motion.span>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2 md:gap-4">
                                                    <span>Grant Access to 10% COMMISSION</span>
                                                    <Send className="w-3 h-3 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </div>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </motion.div>
        </PageLayout>
    );
}
