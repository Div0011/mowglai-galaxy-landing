"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Gift, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReferralModal = ({ isOpen, onClose }: ReferralModalProps) => {
    const [step, setStep] = useState<"form" | "success">("form");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        friendName: "",
        friendEmail: "",
        friendPhone: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call / System sending message
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // In a real app, this would hit an API endpoint to send emails/WA messages
        console.log("Referral Sent:", formData);

        setLoading(false);
        setStep("success");
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
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] bg-background border border-primary/20 rounded-2xl shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-primary/10 bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full text-primary">
                                    <Gift size={20} />
                                </div>
                                <h2 className="font-display text-xl font-bold uppercase tracking-wider text-primary">
                                    Refer & Earn
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {step === "form" ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-1">
                                                Your Details
                                            </h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                <div className="grid gap-1">
                                                    <Label htmlFor="userName" className="text-xs">Name</Label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="userName"
                                                            name="userName"
                                                            placeholder="Your Full Name"
                                                            className="pl-9 bg-primary/5 border-primary/10"
                                                            required
                                                            value={formData.userName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="userEmail" className="text-xs">Email</Label>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                                            <Input
                                                                id="userEmail"
                                                                name="userEmail"
                                                                type="email"
                                                                placeholder="you@email.com"
                                                                className="pl-9 bg-primary/5 border-primary/10"
                                                                required
                                                                value={formData.userEmail}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="userPhone" className="text-xs">Phone</Label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                                            <Input
                                                                id="userPhone"
                                                                name="userPhone"
                                                                placeholder="+91..."
                                                                className="pl-9 bg-primary/5 border-primary/10"
                                                                required
                                                                value={formData.userPhone}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 border-b border-primary/10 pb-1">
                                                Friend's Details
                                            </h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                <div className="grid gap-1">
                                                    <Label htmlFor="friendName" className="text-xs">Friend's Name</Label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            id="friendName"
                                                            name="friendName"
                                                            placeholder="Friend's Name"
                                                            className="pl-9 bg-primary/5 border-primary/10"
                                                            required
                                                            value={formData.friendName}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="friendEmail" className="text-xs">Friend's Email</Label>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                                            <Input
                                                                id="friendEmail"
                                                                name="friendEmail"
                                                                type="email"
                                                                placeholder="friend@email.com"
                                                                className="pl-9 bg-primary/5 border-primary/10"
                                                                required
                                                                value={formData.friendEmail}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="friendPhone" className="text-xs">Friend's Phone</Label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                                            <Input
                                                                id="friendPhone"
                                                                name="friendPhone"
                                                                placeholder="+91..."
                                                                className="pl-9 bg-primary/5 border-primary/10"
                                                                required
                                                                value={formData.friendPhone}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-widest uppercase py-6"
                                    >
                                        {loading ? "Sending..." : "Send Referral Code"}
                                        {!loading && <Send className="ml-2 w-4 h-4" />}
                                    </Button>
                                </form>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                                        <Gift className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-display uppercase tracking-widest text-primary">
                                        Referral Sent!
                                    </h3>
                                    <p className="text-muted-foreground max-w-xs text-sm">
                                        We've sent an automated message to <strong>{formData.friendName}</strong> via Email and WhatsApp regarding your referral.
                                    </p>
                                    <div className="pt-4 w-full">
                                        <Button
                                            onClick={onClose}
                                            variant="outline"
                                            className="w-full border-primary/20 hover:bg-primary/5"
                                        >
                                            Done
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ReferralModal;
