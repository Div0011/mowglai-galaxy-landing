"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Gift, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/utils/emailSender";

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReferralModal = ({ isOpen, onClose }: ReferralModalProps) => {
    const [step, setStep] = useState<"form" | "success">("form");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await sendEmail({
            subject: "New Referral Registration — mowglai.com",
            email: formData.email,
            name: "Referral Sign-Up",
            phone_number: formData.phone,
            message: `Someone registered for the referral programme.\n\nEmail: ${formData.email}\nMobile: ${formData.phone}`,
        });

        setLoading(false);

        if (result.status === "success" || result.message.includes("Local Testing") || result.message.includes("fallback")) {
            setStep("success");
        } else {
            setError(result.message || "Submission error. Please try again later.");
        }
    };


    const handleClose = () => {
        onClose();
        // Reset after animation
        setTimeout(() => {
            setStep("form");
            setFormData({ email: "", phone: "" });
            setError("");
        }, 400);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal — centered on screen */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 24 }}
                        transition={{ type: "spring", damping: 28, stiffness: 260 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[440px] max-h-[88vh] flex flex-col bg-background border border-primary/20 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.5)] z-[101] overflow-hidden"
                    >
                        {/* Decorative top gradient */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

                        {/* Header */}
                        <div className="px-6 pt-6 pb-4 flex justify-between items-start shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                                    <Gift size={20} />
                                </div>
                                <div>
                                    <h2 className="font-display text-lg font-bold uppercase tracking-wider text-foreground leading-tight">
                                        Refer & Earn
                                    </h2>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Earn 10% commission on every referral
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleClose}
                                aria-label="Close"
                                className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 p-1 rounded-md hover:bg-primary/5 cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="mx-6 h-px bg-primary/10 shrink-0" />

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(88vh-80px)] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                            <AnimatePresence mode="wait">
                                {step === "form" ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.2 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            Enter your details and we'll get in touch with your referral code.
                                        </p>

                                        {/* Email Field */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="ref-email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    id="ref-email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    className="pl-9 bg-primary/5 border-primary/15 focus:border-primary/50 transition-colors"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    autoComplete="email"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone Field */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="ref-phone" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                                Mobile Number
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    id="ref-phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    className="pl-9 bg-primary/5 border-primary/15 focus:border-primary/50 transition-colors"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    autoComplete="tel"
                                                />
                                            </div>
                                        </div>

                                        {/* Error */}
                                        {error && (
                                            <p className="text-xs text-red-500 font-medium">{error}</p>
                                        )}

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2 pt-1">
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-widest uppercase py-5 text-sm"
                                            >
                                                {loading ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    "Get My Referral Code"
                                                )}
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2 font-medium tracking-wide"
                                            >
                                                Skip for now
                                            </button>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3, type: "spring", damping: 20 }}
                                        className="flex flex-col items-center justify-center py-6 text-center space-y-4"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold font-display uppercase tracking-widest text-foreground">
                                                You&apos;re In!
                                            </h3>
                                            <p className="text-sm text-muted-foreground max-w-xs">
                                                We&apos;ve received your details. Our team will reach out soon with your referral code.
                                            </p>
                                        </div>
                                        <div className="pt-2 w-full">
                                            <Button
                                                onClick={handleClose}
                                                variant="outline"
                                                className="w-full border-primary/20 hover:bg-primary/5 font-semibold tracking-wide"
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ReferralModal;
