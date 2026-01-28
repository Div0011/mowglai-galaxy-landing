"use client";

import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/utils/emailSender";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function OriginalCustomRequest() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessIdea: "",
        name: "",
        email: "",
        phone: "",
        website: "",
        budget: "",
        timeline: "",
        additionalInfo: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();

    const handleStep1Submit = () => {
        if (formData.businessIdea.trim().length < 20) {
            toast({
                title: "Tell us more!",
                description: "Please provide at least 20 characters describing your business idea.",
                variant: "destructive"
            });
            return;
        }
        setStep(2);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            toast({
                title: "Missing Information",
                description: "Please fill in your name and email.",
                variant: "destructive"
            });
            return;
        }

        const subject = `New Custom Request: ${formData.name}`;

        const result = await sendEmail({
            subject: subject,
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            website: formData.website,
            budget: formData.budget,
            timeline: formData.timeline,
            business_idea: formData.businessIdea,
            additional_info: formData.additionalInfo
        });

        if (result.status === 'success') {
            setIsSubmitted(true);
            toast({
                title: "Request Submitted!",
                description: "We'll get back to you within 24 hours.",
            });
        } else {
            console.warn("Server sending failed, falling back to mailto");
            const body = `
Custom Request Details:
-----------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Website: ${formData.website}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Business Idea:
${formData.businessIdea}

Additional Info:
${formData.additionalInfo}
            `;
            window.location.href = `mailto:info@mowglai.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            toast({
                title: "Opening Email Client",
                description: "Server unreachable. Please send via your email client.",
            });
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <PageLayout>
                <section className="relative min-h-screen flex items-center justify-center py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl mx-auto text-center space-y-8">
                            <CheckCircle2 className="w-24 h-24 text-primary mx-auto animate-pulse" />
                            <h1 className="text-5xl md:text-7xl font-display font-black text-primary uppercase">
                                REQUEST SENT!
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Thank you for sharing your vision with us. Our team will analyze your requirements and reach out within 24 hours with a custom proposal tailored for your business.
                            </p>
                            <div className="pt-8 space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Check your email (<strong className="text-primary">{formData.email}</strong>) for confirmation.
                                </p>
                                <Button asChild className="px-8 py-6 text-lg font-display uppercase rounded-full">
                                    <Link href="/">Back to Home</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <section className="relative min-h-screen py-16">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-6xl sm:text-7xl md:text-[8vw] font-display font-black text-foreground mb-4 leading-[0.85] flex flex-col uppercase">
                            <span className="opacity-10">CUSTOM</span>
                            <span className="opacity-6 text-primary -mt-2">REQUEST</span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary font-body uppercase tracking-[0.3em] mt-10">
                            Tell Us Your Vision
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto mb-12">
                        <div className="flex items-center justify-center gap-4">
                            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                    1
                                </div>
                                <span className="hidden sm:inline font-display text-sm uppercase">Your Idea</span>
                            </div>
                            <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                    2
                                </div>
                                <span className="hidden sm:inline font-display text-sm uppercase">Your Details</span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {step === 1 ? (
                            <div className={cn("rounded-[3rem] p-8 sm:p-12 border border-primary/30", isDark ? "bg-[#253218]/95" : "glass-card")}>
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 uppercase">
                                    What's Your Business Idea?
                                </h2>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    Share your vision, goals, and what you're looking to achieve. The more details you provide, the better we can tailor our solution for you.
                                </p>
                                <Textarea
                                    placeholder="Example: I'm launching an e-commerce platform for sustainable fashion targeting Gen-Z consumers. I need a modern, mobile-first website with integrated payment processing and social media features..."
                                    className="min-h-[300px] text-lg border-primary/20 focus:border-primary rounded-2xl resize-none"
                                    value={formData.businessIdea}
                                    onChange={(e) => setFormData({ ...formData, businessIdea: e.target.value })}
                                />
                                <div className="mt-8 flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground">
                                        {formData.businessIdea.length} characters
                                    </p>
                                    <Button
                                        onClick={handleStep1Submit}
                                        className="px-8 py-6 text-lg font-display uppercase rounded-full group"
                                    >
                                        Continue
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleFinalSubmit}>
                                <div className={cn("rounded-[3rem] p-8 sm:p-12 border border-primary/30 space-y-8", isDark ? "bg-[#253218]/95" : "glass-card")}>
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 uppercase">
                                            Let's Get To Know You
                                        </h2>
                                        <p className="text-muted-foreground text-lg">
                                            Help us understand your project better with a few more details.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-display uppercase tracking-wider text-primary">
                                                Your Name *
                                            </label>
                                            <Input
                                                required
                                                placeholder="John Doe"
                                                className="border-primary/20 focus:border-primary rounded-xl h-12"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-display uppercase tracking-wider text-primary">
                                                Email Address *
                                            </label>
                                            <Input
                                                type="email"
                                                required
                                                placeholder="john@example.com"
                                                className="border-primary/20 focus:border-primary rounded-xl h-12"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-display uppercase tracking-wider text-primary">
                                                Phone Number
                                            </label>
                                            <Input
                                                type="tel"
                                                placeholder="+1 (555) 000-0000"
                                                className="border-primary/20 focus:border-primary rounded-xl h-12"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-display uppercase tracking-wider text-primary">
                                                Current Website (if any)
                                            </label>
                                            <Input
                                                type="url"
                                                placeholder="https://yourwebsite.com"
                                                className="border-primary/20 focus:border-primary rounded-xl h-12"
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-display uppercase tracking-wider text-primary">
                                                Estimated Budget
                                            </label>
                                            <Input
                                                placeholder="$1,000 - $10,000"
                                                className="border-primary/20 focus:border-primary rounded-xl h-12"
                                                value={formData.budget}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-display uppercase tracking-wider text-primary">
                                                Timeline
                                            </label>
                                            <Input
                                                placeholder="1-3 months"
                                                className="border-primary/20 focus:border-primary rounded-xl h-12"
                                                value={formData.timeline}
                                                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-display uppercase tracking-wider text-primary">
                                            Additional Information
                                        </label>
                                        <Textarea
                                            placeholder="Any specific features, design preferences, or technical requirements you'd like to mention..."
                                            className="min-h-[150px] border-primary/20 focus:border-primary rounded-2xl resize-none"
                                            value={formData.additionalInfo}
                                            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="px-8 py-6 text-lg font-display uppercase rounded-full border-primary/40"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-1 px-8 py-6 text-lg font-display uppercase rounded-full group"
                                        >
                                            Submit Request
                                            <Send className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
