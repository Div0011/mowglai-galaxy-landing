"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, ArrowLeft, Download } from "lucide-react";
import { downloadAsHtml } from "@/utils/pdfDownloader";
import { sendEmail } from "@/utils/emailSender";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

const plans = [
    {
        name: "BASIC",
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
];

export default function OriginalCustomRequest() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { t } = useLanguage();
    const { ProjectRequest } = t;

    const [formData, setFormData] = useState({
        companyName: "",
        workPlan: "",
        name: "",
        email: "",
        startDate: ""
    });

    const planName = searchParams.get("plan");
    const plan = plans.find(p => p.name.toLowerCase() === planName);

    useEffect(() => {
        if (!plan && planName !== null) {
            router.push("/investment");
        }
    }, [plan, planName, router]);

    if (!plan) return <div className="min-h-screen flex items-center justify-center text-primary font-display">Loading Plan Details...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const subject = `New Project Request: ${formData.companyName} - ${plan.name} Plan`;

        const result = await sendEmail({
            subject: subject,
            email: formData.email,
            name: formData.name,
            company_name: formData.companyName,
            plan_selected: `${plan.name} (${plan.price})`,
            target_start_date: formData.startDate || "Flexible",
            vision_work_plan: formData.workPlan
        });

        if (result.status === 'success') {
            toast({
                title: ProjectRequest.success.title,
                description: ProjectRequest.success.description,
            });
            router.push("/");
        } else {
            console.warn("Server sending failed, falling back to mailto");
            const body = `
Project Details:
----------------
Plan Selected: ${plan.name} (${plan.price})
Company: ${formData.companyName}
Contact Name: ${formData.name}
Email: ${formData.email}
Target Start Date: ${formData.startDate || "Flexible"}

Vision / Work Plan:
${formData.workPlan}
            `;
            window.location.href = `mailto:info@mowglai.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            toast({
                title: "Opening Email Client",
                description: "Server unreachable. Please send via your email client.",
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
                                <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-4">
                                    {plan.name} <span className="text-primary">{ProjectRequest.hero.titleSuffix}</span>
                                </h1>
                                <p className="text-3xl font-light text-primary mb-8">{plan.price}</p>

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
                                    <button
                                        className="w-full py-4 px-8 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full shadow-lg cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            downloadAsHtml(`/${plan.proposalFile}`, `Mowglai_${plan.name}_Proposal.html`);
                                        }}
                                    >
                                        <Download className="w-5 h-5" />
                                        {ProjectRequest.hero.downloadButton}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Project Form */}
                        <div className="lg:pl-8">
                            <div className="mb-8">
                                <h2 className="text-3xl font-display font-bold text-foreground mb-4">{ProjectRequest.form.title}</h2>
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
                                    className="w-full h-auto py-6 px-8 sm:px-10 text-xl font-display font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 rounded-full shadow-lg"
                                >
                                    <Send className="w-5 h-5 mr-3" />
                                    {ProjectRequest.form.button}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout >
    );
}
