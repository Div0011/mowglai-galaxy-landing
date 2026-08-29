"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowLeft, Download, Loader2 } from "lucide-react";
import { downloadAsHtml } from "@/utils/pdfDownloader";
import { sendEmail } from "@/utils/emailSender";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

interface PlanItem {
    name: string;
    aliases?: string[];
    price: string;
    features: string[];
    popular: boolean;
    proposalFile: string;
}

const plans: PlanItem[] = [
    {
        name: "BASIC",
        aliases: ["basic"],
        price: "$499",
        features: [
            "Single page website",
            "Mobile responsive design",
            "Basic SEO optimization",
            "Contact form integration",
            "1 month support",
        ],
        popular: false,
        proposalFile: "mowglai-proposal-basic.html",
    },
    {
        name: "ADVANCED",
        aliases: ["advanced"],
        price: "$999",
        features: [
            "Multi-page website (up to 5)",
            "Custom animations",
            "Advanced SEO & Analytics",
            "CMS integration",
            "E-commerce ready",
            "3 months support",
        ],
        popular: true,
        proposalFile: "mowglai-proposal-advanced.html",
    },
    {
        name: "EPIC",
        aliases: ["epic"],
        price: "Custom",
        features: [
            "Unlimited pages",
            "Custom web applications",
            "API development",
            "Database integration",
            "Priority 24/7 support",
            "Dedicated team",
        ],
        popular: false,
        proposalFile: "mowglai-proposal-epic.html",
    },
    {
        name: "STORE ESSENTIAL",
        aliases: ["store essential", "store-essential", "build store", "build-store", "store", "ecommerce", "e-commerce"],
        price: "$999",
        features: [
            "Full Product Catalog & Categories",
            "Product Details, Images, Pricing & Variants",
            "Shopping Cart & Express Checkout",
            "Stripe, Razorpay & UPI Online Payments",
            "Customer Order Management & Invoicing",
            "Inventory / Stock Management",
            "Order Tracking System",
            "Admin / Seller Dashboard",
            "Shipping & Delivery API Integration",
            "100% Responsive Mobile-Friendly Design",
            "1 Month Post-Launch Support",
        ],
        popular: true,
        proposalFile: "mowglai-proposal-advanced.html",
    },
    {
        name: "COMMERCE PRO",
        aliases: ["commerce pro", "commerce-pro", "scale store", "scale-store"],
        price: "$1,999",
        features: [
            "Everything in Store Essential",
            "Unlimited Products & Complex Variant Matrix",
            "Real-Time Order Tracking & Automated SMS/Email Alerts",
            "Inventory & Live Multi-Warehouse Stock Sync",
            "Advanced Admin & Seller Dashboard Intelligence",
            "Automated Shipping, Courier APIs & Logistics Hub",
            "Abandoned Cart Recovery & Upsell Engines",
            "Multi-Currency & International Payment Gateways",
            "3 Months Dedicated Priority Support",
        ],
        popular: true,
        proposalFile: "mowglai-proposal-advanced.html",
    },
    {
        name: "ENTERPRISE STORE",
        aliases: ["enterprise store", "enterprise-store", "custom store", "custom-store", "dialogue"],
        price: "Custom",
        features: [
            "Multi-Vendor Marketplace Infrastructure",
            "Custom ERP, CRM & Warehouse Logistics APIs",
            "Automated Global Taxes & Geo-Currencies",
            "Bespoke High-Conversion Checkout Engine",
            "Custom Integrations (SAP, NetSuite, Salesforce)",
            "Dedicated 24/7 Priority Support & SLA Guarantee",
        ],
        popular: false,
        proposalFile: "mowglai-proposal-epic.html",
    },
    {
        name: "APEX",
        aliases: ["apex", "dominate"],
        price: "$4,999+",
        features: [
            "Bespoke Digital Architecture",
            "Survival Ready Support",
            "Strategic Market Hegemony",
            "Liquid Motion Graphics",
            "Neural AI Integration",
        ],
        popular: true,
        proposalFile: "mowglai-proposal-epic.html",
    },
    {
        name: "FEATURE SPRINT",
        aliases: ["feature sprint", "feature-sprint", "request feature"],
        price: "Per Feature",
        features: [
            "New Page Creation",
            "E-commerce Catalogue",
            "Payment Gateway Integration",
            "Custom Forms & Logic",
            "API Connections",
        ],
        popular: false,
        proposalFile: "mowglai-proposal-basic.html",
    },
    {
        name: "AI INTEGRATION",
        aliases: ["ai integration", "ai-integration", "deployment"],
        price: "Custom",
        features: [
            "Custom Chatbots",
            "Automated Workflows",
            "Predictive Analytics",
            "OpenAI/Claude API",
            "Vector Database Setup",
        ],
        popular: false,
        proposalFile: "mowglai-proposal-advanced.html",
    },
    {
        name: "BRAND EVOLUTION",
        aliases: ["brand evolution", "brand-evolution", "evolve"],
        price: "From $1,499",
        features: [
            "Logo Redesign",
            "Brand Guidelines",
            "Social Media Kit",
            "Typography System",
            "Marketing Assets",
        ],
        popular: false,
        proposalFile: "mowglai-proposal-basic.html",
    },
];

export default function OriginalCustomRequest() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { t } = useLanguage();
    const { ProjectRequest } = t;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        workPlan: "",
        name: "",
        email: "",
        startDate: ""
    });

    const rawPlan = searchParams.get("plan");
    const normalizedPlan = rawPlan ? decodeURIComponent(rawPlan).trim().toLowerCase() : "";

    const matchedPlan = plans.find(p =>
        p.name.toLowerCase() === normalizedPlan ||
        p.aliases?.some(a => a.toLowerCase() === normalizedPlan) ||
        p.name.toLowerCase().replace(/[\s-_]+/g, "") === normalizedPlan.replace(/[\s-_]+/g, "")
    );

    const plan = matchedPlan || (normalizedPlan ? {
        name: normalizedPlan.toUpperCase().replace(/-/g, " "),
        price: "Custom",
        features: [
            "Custom Scope & Deliverables",
            "Architecture & Design Consultation",
            "Full-Stack Development & Deployment",
            "Dedicated Project Manager",
            "Post-Launch Support & Warranty"
        ],
        popular: false,
        proposalFile: "mowglai-quotation.html"
    } : plans[0]);

    useEffect(() => {
        if (!rawPlan) {
            router.push("/investment");
        }
    }, [rawPlan, router]);

    if (!plan) return <div className="min-h-screen flex items-center justify-center text-primary font-display">Loading Plan Details...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const subject = `New Project Request: ${formData.companyName || formData.name} - ${plan.name} Plan`;

        const result = await sendEmail({
            form_type: "project_request",
            subject: subject,
            email: formData.email,
            name: formData.name,
            company_name: formData.companyName,
            plan_selected: `${plan.name} (${plan.price})`,
            target_start_date: formData.startDate || "Flexible",
            vision_work_plan: formData.workPlan,
            message: `Company: ${formData.companyName}\nContact: ${formData.name}\nEmail: ${formData.email}\nPlan: ${plan.name} (${plan.price})\nTarget Start Date: ${formData.startDate || "Flexible"}\n\nProject Details:\n${formData.workPlan}`
        });

        setIsSubmitting(false);

        if (result.status === 'success') {
            router.push(`/thank-you?name=${encodeURIComponent(formData.name)}&form=${encodeURIComponent(plan.name + " Plan Request")}`);
        } else {
            toast({
                title: "Submission Status",
                description: result.message || "Failed to submit request. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-32 font-sans relative overflow-hidden">
                <div className="absolute inset-0 bg-transparent z-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.05),transparent_70%)] pointer-events-none" />

                <div className="container relative z-10 max-w-6xl">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-8 hover:bg-primary/10 text-primary group"
                    >
                        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Pricing
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>

                        {/* Left: Plan Summary & Brochure */}
                        <div className="space-y-8">
                            <div className="glass-card p-10 rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-background/50 to-primary/5">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase text-foreground leading-[1.35] sm:leading-[1.35] md:leading-[1.4] tracking-normal mb-6">
                                    {plan.name} <span className="text-primary">{ProjectRequest.hero.titleSuffix}</span>
                                </h1>
                                <p className="text-2xl sm:text-3xl font-light text-primary mb-8">{plan.price}</p>

                                <div className="space-y-4 mb-10">
                                    <h3 className="text-sm font-display uppercase tracking-widest text-muted-foreground">{ProjectRequest.hero.includedFeatures}</h3>
                                    <ul className="space-y-3">
                                        {/* NOTE: Features here are hardcoded in English in the plan object above.
                                            Ideally we should map them or use translate checks.
                                            For now, leaving as-is for the Plan object but UI labels are translated. */}
                                        {plan.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                                    <h4 className="font-display font-bold text-primary mb-2">{ProjectRequest.hero.beforeCommit}</h4>
                                    <p className="text-sm text-foreground/70 mb-4">
                                        {ProjectRequest.hero.downloadText}
                                    </p>
                                    <Button
                                        className="w-full py-4 px-8 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full shadow-lg cursor-pointer"
                                        onClick={(e) => {
                                             e.preventDefault();
                                             downloadAsHtml(`/${plan.proposalFile}`, `Mowglai_${plan.name}_Proposal.html`);
                                        }}
                                    >
                                        <Download className="w-5 h-5" />
                                        {ProjectRequest.hero.downloadButton}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Project Form */}
                        <div className="lg:pl-8">
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground leading-[1.3] mb-4">{ProjectRequest.form.title}</h2>
                                <p className="text-foreground/70 leading-relaxed">
                                    {ProjectRequest.form.subtitle}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-primary/70 font-display">{ProjectRequest.form.labels.company}</label>
                                    <Input
                                        required
                                        placeholder={ProjectRequest.form.placeholders.company}
                                        className="bg-background/30 border-primary/20 focus:border-primary h-12 text-lg"
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-primary/70 font-display">{ProjectRequest.form.labels.contactName}</label>
                                        <Input
                                            required
                                            placeholder={ProjectRequest.form.placeholders.contactName}
                                            className="bg-background/30 border-primary/20 focus:border-primary h-12"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-primary/70 font-display">{ProjectRequest.form.labels.email}</label>
                                        <Input
                                            required
                                            type="email"
                                            placeholder={ProjectRequest.form.placeholders.email}
                                            className="bg-background/30 border-primary/20 focus:border-primary h-12"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-primary/70 font-display">{ProjectRequest.form.labels.startDate}</label>
                                    <Input
                                        placeholder={ProjectRequest.form.placeholders.startDate}
                                        className="bg-background/30 border-primary/20 focus:border-primary h-12"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-primary/70 font-display">{ProjectRequest.form.labels.vision}</label>
                                    <Textarea
                                        required
                                        placeholder={ProjectRequest.form.placeholders.vision}
                                        className="bg-background/30 border-primary/20 min-h-[150px] resize-none text-lg p-4"
                                        value={formData.workPlan}
                                        onChange={(e) => setFormData({ ...formData, workPlan: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-auto py-6 px-8 sm:px-10 text-xl font-display font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-full shadow-lg disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-3" />
                                            {ProjectRequest.form.button}
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout >
    );
}
