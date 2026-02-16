"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ArrowLeft, ArrowRight, Check, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const StartProjectWizard = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        idea: "",
        name: "",
        email: "",
        company: "",
        timeline: "1-3 months",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Transitions
    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    const handleNext = () => {
        if (step === 1 && !formData.idea.trim()) return;
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8"
                >
                    <Check className="w-12 h-12 text-primary" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                    Message Received
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                    Your vision has been captured. Our team will review your blueprint and
                    reach out within 24 hours to schedule a deep-dive session.
                </p>
                <motion.button
                    onClick={() => window.location.href = "/"}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-12 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                    Return Home
                </motion.button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto relative min-h-[600px] flex flex-col justify-center">
            {/* Progress Indicator */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-center mb-12 px-2">
                <div className="flex items-center gap-4">
                    <span className={`text-sm font-bold tracking-widest ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>01 IDEA</span>
                    <div className={`w-12 h-[1px] ${step >= 2 ? "bg-primary" : "bg-white/10"}`} />
                    <span className={`text-sm font-bold tracking-widest ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>02 DETAILS</span>
                </div>
            </div>

            <AnimatePresence mode="wait" custom={step}>
                {step === 1 && (
                    <motion.div
                        key="step1"
                        custom={1}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                            Elaborate your <span className="text-primary italic">vision</span>.
                        </h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            Every great product starts with a raw idea. Tell us correctly what you want to build. The more detailed, the better.
                        </p>
                        <div className="relative group">
                            <textarea
                                value={formData.idea}
                                onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                                placeholder="I want to build a platform that connects..."
                                className="w-full h-64 bg-background/30 border border-white/10 rounded-2xl p-6 text-xl md:text-2xl font-light focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder:text-white/20"
                            />
                            <div className="absolute bottom-6 right-6 pointer-events-none">
                                <Sparkles className={`w-6 h-6 transition-colors duration-300 ${formData.idea.length > 20 ? "text-primary" : "text-white/10"}`} />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={!formData.idea.trim()}
                                className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full text-lg font-bold tracking-wide hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next Step
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        custom={2}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                            Business <span className="text-primary italic">Details</span>.
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background/30 border border-white/10 rounded-xl p-4 text-lg focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-background/30 border border-white/10 rounded-xl p-4 text-lg focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Company (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-background/30 border border-white/10 rounded-xl p-4 text-lg focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20"
                                        placeholder="Acme Inc."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Timeline</label>
                                    <select
                                        value={formData.timeline}
                                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                        className="w-full bg-background/30 border border-white/10 rounded-xl p-4 text-lg focus:outline-none focus:border-primary/50 transition-all text-white appearance-none cursor-pointer"
                                    >
                                        <option className="bg-black text-white" value="1-3 months">1-3 Months</option>
                                        <option className="bg-black text-white" value="3-6 months">3-6 Months</option>
                                        <option className="bg-black text-white" value="6+ months">6+ Months</option>
                                        <option className="bg-black text-white" value="Unknown">Unknown</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-8 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors uppercase text-sm font-bold tracking-widest px-4 py-2"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group flex items-center gap-4 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold tracking-wide hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? "Launching..." : "Launch Project"}
                                    {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StartProjectWizard;
