"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Send, ArrowLeft, Loader2 } from "lucide-react";
import { sendEmail } from "@/utils/emailSender";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export type FieldType = "text" | "email" | "textarea" | "select" | "radio" | "checkbox-group";

export interface FormField {
    id: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    options?: string[]; // For select, radio, checkbox-group
    required?: boolean;
    maxSelections?: number; // For checkbox-group
}

interface ServiceRequestFormProps {
    title: string;
    subtitle: string;
    heroImage?: React.ReactNode;
    fields: FormField[];
    serviceName: string; // Used for email subject
}

export default function ServiceRequestForm({
    title,
    subtitle,
    heroImage,
    fields,
    serviceName
}: ServiceRequestFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});

    // Initialize checkboxes as arrays
    useState(() => {
        const initialData: Record<string, any> = {};
        fields.forEach(field => {
            if (field.type === 'checkbox-group') {
                initialData[field.id] = [];
            } else {
                initialData[field.id] = "";
            }
        });
        setFormData(initialData);
    });

    const handleInputChange = (id: string, value: any) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (id: string, option: string, checked: boolean, max?: number) => {
        setFormData(prev => {
            const current = prev[id] || [];
            if (checked) {
                if (max && current.length >= max) return prev; // Limit reached
                return { ...prev, [id]: [...current, option] };
            } else {
                return { ...prev, [id]: current.filter((item: string) => item !== option) };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const subject = `New ${serviceName} Request: ${formData.name || 'Client'}`;

        // Flatten data for email (convert arrays to strings)
        const emailData: Record<string, string> = {
            subject,
            service_type: serviceName,
        };

        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                emailData[key] = value.join(", ");
            } else {
                emailData[key] = String(value);
            }
        });

        try {
            const result = await sendEmail(emailData);

            if (result.status === 'success') {
                toast({
                    title: "Request Sent Successfully",
                    description: "We will review your details and get back to you shortly.",
                });
                router.push("/");
            } else {
                throw new Error("API Error");
            }
        } catch (error) {
            console.warn("Server sending failed, falling back to mailto");
            const body = Object.entries(formData)
                .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
                .join("\n");

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
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 pt-24 pb-12 md:py-32 font-sans relative overflow-hidden">
                <div className="absolute inset-0 bg-transparent z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.05),transparent_70%)] pointer-events-none" />

                <div className="container relative z-10 max-w-6xl">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-8 hover:bg-primary/10 text-primary group"
                    >
                        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>

                        {/* Left Column: Info */}
                        <div className="space-y-8">
                            <div className="glass-card p-5 md:p-10 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-background/50 to-primary/5 sticky top-32">
                                <h1 className="text-2xl sm:text-5xl md:text-6xl font-display font-black text-foreground mb-6 leading-tight tracking-tighter">
                                    {title.split(' ').map((word, i) => (
                                        <span key={i} className="block">{word}</span>
                                    ))}
                                </h1>
                                <p className="text-xl font-light text-muted-foreground mb-8">
                                    {subtitle}
                                </p>
                                {heroImage && (
                                    <div className="mt-8 rounded-2xl overflow-hidden border border-primary/10 shadow-2xl">
                                        {heroImage}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="lg:pl-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {fields.map((field) => (
                                    <div key={field.id} className="space-y-3">
                                        <Label className="text-xs uppercase tracking-widest text-primary/70 font-display">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </Label>

                                        {field.type === 'text' && (
                                            <Input
                                                required={field.required}
                                                placeholder={field.placeholder}
                                                className="bg-background/30 border-primary/20 focus:border-primary h-12 text-lg"
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            />
                                        )}

                                        {field.type === 'email' && (
                                            <Input
                                                required={field.required}
                                                type="email"
                                                placeholder={field.placeholder}
                                                className="bg-background/30 border-primary/20 focus:border-primary h-12 text-lg"
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            />
                                        )}

                                        {field.type === 'textarea' && (
                                            <Textarea
                                                required={field.required}
                                                placeholder={field.placeholder}
                                                className="bg-background/30 border-primary/20 min-h-[150px] resize-none text-lg p-4"
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            />
                                        )}

                                        {field.type === 'select' && (
                                            <select
                                                required={field.required}
                                                className="w-full bg-background/30 border border-primary/20 focus:border-primary h-12 text-lg rounded-md px-3"
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            >
                                                <option value="" disabled>Select an option</option>
                                                {field.options?.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        )}

                                        {field.type === 'radio' && (
                                            <RadioGroup
                                                onValueChange={(val) => handleInputChange(field.id, val)}
                                                value={formData[field.id]}
                                                className="flex flex-col space-y-2"
                                            >
                                                {field.options?.map(opt => (
                                                    <div key={opt} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={opt} id={`${field.id}-${opt}`} />
                                                        <Label htmlFor={`${field.id}-${opt}`}>{opt}</Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        )}

                                        {field.type === 'checkbox-group' && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {field.options?.map(opt => (
                                                    <div key={opt} className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                                                        <Checkbox
                                                            id={`${field.id}-${opt}`}
                                                            checked={(formData[field.id] || []).includes(opt)}
                                                            onCheckedChange={(checked) => handleCheckboxChange(field.id, opt, checked as boolean, field.maxSelections)}
                                                        />
                                                        <Label htmlFor={`${field.id}-${opt}`} className="cursor-pointer">{opt}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-auto py-6 px-8 sm:px-10 text-lg sm:text-xl font-display font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-full shadow-lg mt-8"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    ) : (
                                        <Send className="w-5 h-5 mr-3" />
                                    )}
                                    {isSubmitting ? "Sending..." : "Submit Request"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
