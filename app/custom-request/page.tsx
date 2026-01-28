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
import { useLanguage } from "@/context/LanguageContext";

export default function CustomRequestPage() {
    const { t } = useLanguage();
    const { CustomRequest } = t;

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
                title: "Mising Information",
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
                        <div className="max-w-2xl mx-auto text-center space-y-8" data-aos="zoom-in">
                            <CheckCircle2 className="w-24 h-24 text-primary mx-auto animate-pulse" />
                            <h1 className="text-5xl md:text-7xl font-display font-black text-primary uppercase">
                                {CustomRequest.success.title}
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                {CustomRequest.success.description}
                            </p>
                            <div className="pt-8 space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    {CustomRequest.success.checkEmail} (<strong className="text-primary">{formData.email}</strong>).
                                </p>
                                <Button asChild className="px-8 py-6 text-lg font-display uppercase rounded-full">
                                    <Link href="/">{CustomRequest.success.button}</Link>
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
                    <div className="text-center mb-16" data-aos="fade-down">
                        <h1 className="text-6xl sm:text-7xl md:text-[8vw] font-display font-black text-foreground mb-4 leading-[0.85] flex flex-col uppercase">
                            <span className="opacity-10">{CustomRequest.hero.titleMain}</span>
                            <span className="opacity-6 text-primary -mt-2">{CustomRequest.hero.titleSub}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary font-body uppercase tracking-[0.3em] mt-10">
                            {CustomRequest.hero.subtitle}
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto mb-12" data-aos="fade-up">
                        <div className="flex items-center justify-center gap-4">
                            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                    1
                                </div>
                                <span className="hidden sm:inline font-display text-sm uppercase">{CustomRequest.steps.idea}</span>
                            </div>
                            <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                    2
                                </div>
                                <span className="hidden sm:inline font-display text-sm uppercase">{CustomRequest.steps.details}</span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {step === 1 ? (
                            <div className="glass-card rounded-[3rem] p-8 sm:p-12 border-primary/30" data-aos="fade-up">
                                <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 uppercase">
                                    {CustomRequest.step1.title}
                                </h2>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    {CustomRequest.step1.description}
                                </p>
                                <Textarea
                                    placeholder={CustomRequest.step1.placeholder}
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
                                        {CustomRequest.step1.button}
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleFinalSubmit}>
                                <div className="glass-card rounded-[3rem] p-8 sm:p-12 border-primary/30 space-y-8" data-aos="fade-up">
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 uppercase">
                                            {CustomRequest.step2.title}
                                        </h2>
                                        <p className="text-muted-foreground text-lg">
                                            {CustomRequest.step2.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-display uppercase tracking-wider text-primary">
                                                {CustomRequest.step2.labels.name} *
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
                                                {CustomRequest.step2.labels.email} *
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
                                                {CustomRequest.step2.labels.phone}
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
                                                {CustomRequest.step2.labels.website}
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
                                                {CustomRequest.step2.labels.budget}
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
                                                {CustomRequest.step2.labels.timeline}
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
                                            {CustomRequest.step2.labels.additional}
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
                                            {CustomRequest.step2.buttonBack}
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-1 px-8 py-6 text-lg font-display uppercase rounded-full group"
                                        >
                                            {CustomRequest.step2.buttonSubmit}
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
