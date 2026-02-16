"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, ArrowLeft, ArrowRight, Loader2, Quote } from "lucide-react";
import { sendEmail } from "@/utils/emailSender";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomQuotePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        projectDescription: "",
        name: "",
        email: "",
        company: "",
        budget: "",
        timeline: ""
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.projectDescription.split(/\s+/).length < 20) {
            toast({
                title: "More Detail Needed",
                description: "Please describe your project in at least 20 words so we can understand your vision.",
                variant: "destructive"
            });
            return;
        }
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const subject = `New Custom Quote Request: ${formData.company || formData.name}`;

        try {
            const result = await sendEmail({
                subject,
                service_type: "Custom Quote Request",
                name: formData.name,
                email: formData.email,
                company: formData.company,
                budget: formData.budget,
                timeline: formData.timeline,
                project_description: formData.projectDescription
            });

            if (result.status === 'success') {
                toast({
                    title: "Quote Request Sent",
                    description: "We'll analyze your requirements and send a custom proposal soon.",
                });
                router.push("/");
            } else {
                throw new Error("API Error");
            }
        } catch (error) {
            console.warn("Server sending failed, falling back to mailto");
            const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Project Description:
${formData.projectDescription}
            `;

            window.location.href = `mailto:divyanshawasthi@mowglai.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            toast({
                title: "Opening Email Client",
                description: "Server unreachable. Please send via your email client.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 pt-24 pb-12 md:py-32 font-sans relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-transparent z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.05),transparent_70%)] pointer-events-none" />

                <div className="container relative z-10 max-w-4xl">
                    <div className="w-full flex justify-start mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => step === 2 ? setStep(1) : router.back()}
                            className="hover:bg-primary/10 text-primary group text-lg pl-0 hover:pl-4 transition-all"
                        >
                            <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            {step === 2 ? "Back" : "Cancel"}
                        </Button>
                    </div>

                    <div className="glass-card p-6 md:p-12 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-background/80 to-primary/5 shadow-2xl backdrop-blur-xl">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
                                <Quote className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-5xl font-display font-black text-foreground mb-4 uppercase leading-tight">
                                REQUEST <span className="text-primary">CUSTOM QUOTE</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-light max-w-lg mx-auto">
                                Tell us about your vision. We build bespoke solutions for ambitious brands.
                            </p>
                        </div>

                        <div className="w-full bg-white/5 h-1 rounded-full mb-12 overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: step === 1 ? "50%" : "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.form
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleNextStep}
                                    className="space-y-6"
                                >
                                    <div className="space-y-3">
                                        <Label className="text-sm uppercase tracking-widest text-primary/70 font-display">
                                            Describe your project (Min 20 words) <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            required
                                            placeholder="I am looking to build a..."
                                            className="bg-background/30 border-primary/20 min-h-[200px] resize-none text-xl p-6 leading-relaxed focus:ring-2 focus:ring-primary/50 transition-all"
                                            value={formData.projectDescription}
                                            onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                                        />
                                        <p className="text-right text-xs text-muted-foreground">
                                            {formData.projectDescription.split(/\s+/).filter(w => w.length > 0).length} / 20 words minimum
                                        </p>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            type="submit"
                                            className="h-auto py-4 px-8 text-lg font-display font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all rounded-full shadow-lg"
                                        >
                                            Next Step <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-xs uppercase tracking-widest text-primary/70 font-display">Full Name <span className="text-red-500">*</span></Label>
                                            <Input
                                                required
                                                placeholder="John Doe"
                                                className="bg-background/30 border-primary/20 h-12 text-lg"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-xs uppercase tracking-widest text-primary/70 font-display">Email Address <span className="text-red-500">*</span></Label>
                                            <Input
                                                required
                                                type="email"
                                                placeholder="john@company.com"
                                                className="bg-background/30 border-primary/20 h-12 text-lg"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-xs uppercase tracking-widest text-primary/70 font-display">Company / Brand (Optional)</Label>
                                        <Input
                                            placeholder="Your Company"
                                            className="bg-background/30 border-primary/20 h-12 text-lg"
                                            value={formData.company}
                                            onChange={(e) => handleInputChange("company", e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-xs uppercase tracking-widest text-primary/70 font-display">Estimated Budget</Label>
                                            <select
                                                required
                                                className="w-full bg-background/30 border border-primary/20 focus:border-primary h-12 text-lg rounded-md px-3 text-foreground"
                                                value={formData.budget}
                                                onChange={(e) => handleInputChange("budget", e.target.value)}
                                            >
                                                <option value="" disabled>Select Range</option>
                                                <option value="$1k - $5k">$1k - $5k</option>
                                                <option value="$5k - $10k">$5k - $10k</option>
                                                <option value="$10k - $25k">$10k - $25k</option>
                                                <option value="$25k+">$25k+</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-xs uppercase tracking-widest text-primary/70 font-display">Timeline Goal</Label>
                                            <Input
                                                placeholder="e.g. 2 months"
                                                className="bg-background/30 border-primary/20 h-12 text-lg"
                                                value={formData.timeline}
                                                onChange={(e) => handleInputChange("timeline", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-auto py-4 sm:py-5 px-4 sm:px-8 text-base sm:text-xl font-display font-black uppercase tracking-wide sm:tracking-widest bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all rounded-full shadow-lg mt-8"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        ) : (
                                            <Send className="w-5 h-5 mr-3" />
                                        )}
                                        {isSubmitting ? "Sending..." : "Submit Request"}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
