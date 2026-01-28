"use client";

import MinimalLayout from "./Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/utils/emailSender";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MinimalCustomRequest() {
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
                description: "Please provide at least 20 characters describing your idea.",
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

        const subject = `Minimal Custom Request: ${formData.name}`;

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
        } else {
            console.warn("Server sending failed, falling back to mailto");
            const body = `
Name: ${formData.name}
Email: ${formData.email}
Idea: ${formData.businessIdea}
            `;
            window.location.href = `mailto:info@mowglai.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <MinimalLayout>
                <div className="min-h-screen flex items-center justify-center py-32 px-6 bg-background">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl text-center space-y-8"
                    >
                        <CheckCircle2 className="w-16 h-16 text-foreground mx-auto" />
                        <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">
                            Received.
                        </h1>
                        <p className="text-xl text-foreground/50 font-body leading-relaxed">
                            Thank you for sharing your vision. We'll analyze your requirements and reach out within 24 hours.
                        </p>
                        <Button asChild variant="outline" className="px-12 py-6 text-sm font-black uppercase tracking-widest border-2 border-foreground rounded-none">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </motion.div>
                </div>
            </MinimalLayout>
        );
    }

    return (
        <MinimalLayout>
            <div className="bg-background text-foreground min-h-screen pt-48 pb-32 px-6 md:px-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b-2 border-foreground pb-12 mb-24"
                    >
                        <h1 className="text-[12vw] md:text-[8vw] font-display font-black leading-none uppercase tracking-tighter mb-4">
                            The <span className="italic text-foreground/20">Brief</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground/60 font-body uppercase tracking-[0.3em]">
                            Step {step} of 2
                        </p>
                    </motion.div>

                    {step === 1 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight">
                                    Describe Your Vision
                                </h2>
                                <Textarea
                                    placeholder="Tell us about the project you want to build..."
                                    className="min-h-[400px] text-xl bg-transparent border-0 border-b-2 border-foreground/10 focus:border-foreground rounded-none resize-none p-0 focus-visible:ring-0 placeholder:text-foreground/20"
                                    value={formData.businessIdea}
                                    onChange={(e) => setFormData({ ...formData, businessIdea: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs uppercase tracking-widest font-bold opacity-30">
                                    {formData.businessIdea.length} Characters
                                </p>
                                <Button
                                    onClick={handleStep1Submit}
                                    className="px-12 py-8 text-lg font-black uppercase bg-foreground text-background rounded-none hover:bg-foreground/90 group"
                                >
                                    Next Phase
                                    <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={handleFinalSubmit}
                            className="space-y-16"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {[
                                    { label: "Full Name", key: "name", type: "text", placeholder: "John Doe" },
                                    { label: "Email", key: "email", type: "email", placeholder: "john@agency.com" },
                                    { label: "Contact No.", key: "phone", type: "tel", placeholder: "+1..." },
                                    { label: "Budget Range", key: "budget", type: "text", placeholder: "e.g. $5k - $10k" }
                                ].map((field) => (
                                    <div key={field.key} className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground/40">{field.label}</label>
                                        <Input
                                            required={field.key === "name" || field.key === "email"}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="bg-transparent border-0 border-b-2 border-foreground/10 focus:border-foreground rounded-none h-12 p-0 focus-visible:ring-0 text-xl font-bold"
                                            value={formData[field.key as keyof typeof formData]}
                                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground/40">Additional Details</label>
                                <Textarea
                                    placeholder="Anything else we should know?"
                                    className="min-h-[150px] bg-transparent border-0 border-b-2 border-foreground/10 focus:border-foreground rounded-none resize-none p-0 focus-visible:ring-0 text-xl font-bold"
                                    value={formData.additionalInfo}
                                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-8 pt-12">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setStep(1)}
                                    className="px-8 py-8 text-sm font-black uppercase tracking-widest text-foreground/40 hover:text-foreground hover:bg-transparent rounded-none"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 px-12 py-8 text-lg font-black uppercase bg-foreground text-background rounded-none group"
                                >
                                    Send Brief
                                    <Send className="ml-4 group-hover:translate-x-2 transition-transform h-5 w-5" />
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </div>
            </div>
        </MinimalLayout>
    );
}
