"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import NextPageButton from "@/components/NextPageButton";

import { sendEmail } from "@/utils/emailSender";
import { useToast } from "@/hooks/use-toast";

interface ConsultationFormProps {
    className?: string;
}

export default function ConsultationForm({ className }: ConsultationFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        message: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await sendEmail({
            subject: `New Consultation Request from ${formData.name}`,
            service_type: "Consultation Request",
            name: formData.name,
            email: formData.email,
            contact_number: formData.contactNumber,
            message: formData.message,
        });

        setIsSubmitting(false);

        if (result.status === "success" || result.message.includes("Local Testing")) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setFormData({ name: "", email: "", contactNumber: "", message: "" });
        } else {
            toast({
                title: "Submission Status",
                description: result.message || "Failed to submit request. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className={className}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {submitted ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                            <Send className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-primary mb-2">
                            Message Sent!
                        </h3>
                        <p className="text-foreground/70">
                            We&apos;ll get back to you within 24 hours.
                        </p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Input
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-background/50 border-primary/30 focus:border-primary h-12 text-base"
                                />
                            </div>
                            <div>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="bg-background/50 border-primary/30 focus:border-primary h-12 text-base"
                                />
                            </div>
                        </div>

                        <div>
                            <Input
                                name="contactNumber"
                                type="tel"
                                placeholder="Contact Number (with country code)"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                                className="bg-background/50 border-primary/30 focus:border-primary h-12 text-base"
                            />
                        </div>

                        <div>
                            <Textarea
                                name="message"
                                placeholder="Describe your idea and start your project..."
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                className="bg-background/50 border-primary/30 focus:border-primary min-h-[120px] text-base resize-none"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto h-12 px-12 text-base font-display font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-full"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <Send className="w-5 h-5 mr-2" />
                            )}
                            {isSubmitting ? "Sending..." : "Contact Us"}
                        </Button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}