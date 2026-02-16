"use client";

import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Download, FileText, Sparkles, Check, ArrowRight, Clock, Rocket, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { downloadAsHtml } from "@/utils/pdfDownloader";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";
import UserPurchasesSection from "@/components/UserPurchasesSection";

interface Plan {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    type?: string;
    razorpayPlanId?: string;
}

declare global {
    interface Window {
        Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayOptions {
    key: string;
    subscription_id: string;
    name: string;
    description?: string;
    image?: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
    handler?: (response: { razorpay_payment_id?: string; razorpay_subscription_id?: string; razorpay_signature?: string }) => void;
    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpayInstance {
    open: () => void;
    on: (event: string, handler: (response: { error: { description?: string } }) => void) => void;
}

const plans: {
    standard: Plan[];
    care: Plan[];
    premium: Plan[];
    systems: Plan[];
    addons: Plan[];
} = {
    standard: [
        {
            name: "BASIC",
            price: "$499",
            description: "Essential Digital Prescence",
            features: ["Single page website", "Mobile responsive design", "Basic SEO optimization", "Contact form integration", "1 month support"],
            cta: "Initiate"
        },
        {
            name: "ADVANCED",
            price: "$999",
            description: "Scale & Growth Architecture",
            features: ["Multi-page website (up to 5)", "Custom animations", "Advanced SEO & Analytics", "CMS integration", "3 months support"],
            cta: "Accelerate"
        },
        {
            name: "EPIC",
            price: "CUSTOM",
            description: "Infrastructure Level Solutions",
            features: ["Unlimited pages", "Custom web applications", "API development", "Database integration", "Priority 24/7 support"],
            cta: "Dialogue"
        }
    ],
    care: [ // Merging our new care plans here
        {
            name: "Mowglai Care",
            price: "$15/mo",
            description: "Essential maintenance to keep your site secure.",
            features: ["Premium Managed Hosting", "24/7 Uptime Monitoring", "Monthly Security Scans", "Technical Support (Bugs)", "1 Hour Minor Updates/mo"],
            cta: "Subscribe",
            type: "care",
            razorpayPlanId: "plan_SG1iI7omyDN39z"
        },
        {
            name: "Mowglai Growth",
            price: "$49/mo",
            description: "Proactive improvements and analytics.",
            features: ["Everything in Care", "Priority Support Response", "Social Media Handling (2 posts/week)", "Monthly Analytics Report", "Basic SEO Health Check", "3 Hours Content Updates/mo"],
            cta: "Subscribe",
            type: "growth",
            razorpayPlanId: "plan_SG1j6DcHgFk70v"
        },
        {
            name: "Mowglai Elite",
            price: "$99/mo",
            description: "Complete peace of mind for business critical sites.",
            features: ["Everything in Growth", "1 Hour Custom Dev/mo", "Weekly Backups & Tests", "Phone Support Access", "Performance Optimization"],
            cta: "Subscribe",
            type: "elite",
            razorpayPlanId: "plan_SG1jkJ8tcJTgOS"
        }
    ],
    premium: [
        {
            name: "APEX",
            price: "$4,999+",
            description: "Industry-Leading Digital Soul",
            features: ["Bespoke Digital Architecture", "Survival Ready Support", "Strategic Market Hegemony", "Liquid Motion Graphics", "Neural AI Integration"],
            cta: "Dominate"
        }
    ],
    systems: [
        {
            name: "NATIVE OS",
            price: "COMING SOON",
            description: "High-Performance Mobile Applications",
            features: ["iOS & Android Development", "Native Performance", "Offline Capabilities", "Device Hardware Access", "App Store Optimization"],
            cta: "Waitlist",
            type: "system"
        },
        {
            name: "PURE API",
            price: "COMING SOON",
            description: "headless Architecture & Integrations",
            features: ["Custom REST/gRPC APIs", "Third-party Integrations", "Secure Authentication", "Scalable Infrastructure", "Real-time Data Processing"],
            cta: "Waitlist",
            type: "system"
        },
        {
            name: "NERVE CENTER",
            price: "COMING SOON",
            description: "Administrative Command & Intelligence",
            features: ["Real-time user analytics", "Content Management", "Role-based Access", "Custom Reporting", "Server Health Monitoring"],
            cta: "Waitlist",
            type: "system"
        }
    ],
    addons: [
        {
            name: "FEATURE SPRINT",
            price: "PER FEATURE",
            description: "Expand your platform's capabilities on demand.",
            features: ["New Page Creation", "E-commerce Catalogue", "Payment Gateway Integration", "Custom Forms & Logic", "API Connections"],
            cta: "Request Feature",
            type: "addon"
        },
        {
            name: "AI INTEGRATION",
            price: "CUSTOM",
            description: "Embed intelligence into your digital ecosystem.",
            features: ["Custom Chatbots", "Automated Workflows", "Predictive Analytics", "OpenAI/Claude API", "Vector Database Setup"],
            cta: "Deployment",
            type: "addon"
        },
        {
            name: "BRAND EVOLUTION",
            price: "FROM $1499",
            description: "Total visual and identity transformation.",
            features: ["Logo Redesign", "Brand Guidelines", "Social Media Kit", "Typography System", "Marketing Assets"],
            cta: "Evolve",
            type: "addon"
        }
    ]
};

export default function InvestmentPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [planType, setPlanType] = useState<"standard" | "care" | "addons" | "premium" | "systems">("standard");
    const [discountCode, setDiscountCode] = useState("");
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [discountError, setDiscountError] = useState("");
    const [razorpayReady, setRazorpayReady] = useState(false);
    const [razorpayError, setRazorpayError] = useState("");
    const [processingPlan, setProcessingPlan] = useState<string | null>(null);
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
    const subscriptionEndpoint = process.env.NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT ?? "/api/create-subscription.php";

    useEffect(() => {
        let isMounted = true;

        const loadRazorpay = () =>
            new Promise<boolean>((resolve) => {
                if (window.Razorpay) {
                    resolve(true);
                    return;
                }

                const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
                if (existingScript) {
                    existingScript.addEventListener("load", () => resolve(true));
                    existingScript.addEventListener("error", () => resolve(false));
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });

        loadRazorpay().then((ready) => {
            if (!isMounted) return;
            setRazorpayReady(ready);
            if (!ready) {
                setRazorpayError("Razorpay failed to load. Please refresh and try again.");
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleApplyDiscount = () => {
        if (discountCode.trim().toUpperCase() === "MOWGLAI10") {
            setIsDiscountApplied(true);
            setDiscountError("");
        } else {
            setIsDiscountApplied(false);
            setDiscountError("Invalid Code");
        }
    };

    const getPrice = (originalPrice: string) => {
        if (!isDiscountApplied || originalPrice === "CUSTOM" || originalPrice.includes("+")) return originalPrice;
        const numericPart = originalPrice.replace(/[^\d]/g, "");
        const numPrice = parseInt(numericPart, 10);
        if (isNaN(numPrice)) return originalPrice;
        const discounted = Math.round(numPrice * 0.9);
        return `$${discounted}`;
    };

    const handleCareSubscribe = (plan: Plan) => {
        setRazorpayError("");

        if (!razorpayKeyId) {
            setRazorpayError("Razorpay key is missing. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to proceed.");
            return;
        }

        if (!razorpayReady || !window.Razorpay) {
            setRazorpayError("Razorpay is not ready yet. Please try again in a moment.");
            return;
        }

        if (!plan.razorpayPlanId) {
            setRazorpayError("Plan ID is missing for this subscription.");
            return;
        }

        setProcessingPlan(plan.name);

        fetch(subscriptionEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                plan_id: plan.razorpayPlanId,
                plan_name: plan.name,
            }),
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText || "Failed to create subscription.");
                }
                return res.json() as Promise<{ subscription_id?: string }>;
            })
            .then((data) => {
                if (!data.subscription_id) {
                    throw new Error("Subscription creation failed.");
                }

                const RazorpayConstructor = window.Razorpay;
                if (!RazorpayConstructor) {
                    throw new Error("Razorpay failed to load.");
                }

                const options: RazorpayOptions = {
                    key: razorpayKeyId,
                    subscription_id: data.subscription_id,
                    name: "Mowglai Care Plans",
                    description: plan.name,
                    image: "/mowglai-logo-light.png",
                    notes: {
                        plan: plan.name,
                        category: "care",
                    },
                    theme: {
                        color: "#3FE0C5",
                    },
                    handler: () => {
                        setProcessingPlan(null);
                    },
                    modal: {
                        ondismiss: () => setProcessingPlan(null),
                    },
                };

                const razorpay = new RazorpayConstructor(options);
                razorpay.on("payment.failed", (response) => {
                    setProcessingPlan(null);
                    setRazorpayError(response.error?.description || "Payment failed. Please try again.");
                });
                razorpay.open();
            })
            .catch((error) => {
                setProcessingPlan(null);
                if (process.env.NODE_ENV === "development" && subscriptionEndpoint.startsWith("/")) {
                    setRazorpayError("Local dev: run a PHP server and set NEXT_PUBLIC_SUBSCRIPTION_ENDPOINT to its URL.");
                    return;
                }
                setRazorpayError(error instanceof Error ? error.message : "Subscription setup failed.");
            });
    };

    // Helper to render plans dynamically
    const renderPlans = (type: "standard" | "care" | "addons" | "systems") => {
        const currentPlans = type === "standard" ? plans.standard : (type === "care" ? plans.care : (type === "systems" ? plans.systems : plans.addons));
        return currentPlans.map((plan, i) => (
            <div
                key={i}
                className="p-8 md:p-14 rounded-[2.5rem] bg-secondary/20 border border-primary/10 hover:border-primary/40 hover:bg-secondary/30 transition-all duration-500 flex flex-col group relative overflow-hidden backdrop-blur-md"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="mb-10 sm:mb-12 relative z-10">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display uppercase italic mb-3 text-primary group-hover:scale-105 transition-transform origin-left leading-tight">{plan.name}</h3>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground/80">{plan.description}</p>
                </div>
                <div className="mb-12 sm:mb-16 relative z-10 min-h-[3rem] sm:min-h-[4rem] flex flex-col justify-center overflow-visible">
                    <div className={cn(
                        "font-display font-black leading-none text-foreground flex items-center whitespace-nowrap gap-x-2",
                        plan.price.length > 8 ? "text-lg sm:text-xl md:text-2xl" : "text-3xl sm:text-4xl md:text-5xl"
                    )}>
                        <AnimatePresence mode="wait">
                            {type === 'standard' && isDiscountApplied && plan.price !== "CUSTOM" && !plan.price.includes("+") ? (
                                <motion.div
                                    key="discounted"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-3"
                                >
                                    <span className="line-through text-muted-foreground/30 text-xl sm:text-2xl">{plan.price}</span>
                                    <span className="text-primary">{getPrice(plan.price)}</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="regular"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={cn(plan.price === "COMING SOON" && "text-base sm:text-lg text-primary/70 tracking-[0.2em]")}
                                >
                                    {plan.price}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <ul className="space-y-6 mb-16 flex-grow font-body text-base md:text-lg tracking-wide relative z-10">
                    {(plan.features as string[]).map((f, fi) => (
                        <li key={fi} className="flex gap-4 items-start text-foreground/80 group-hover:text-foreground transition-colors">
                            <div className="mt-2 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                            <span className="leading-snug">{f}</span>
                        </li>
                    ))}
                </ul>

                {type === "care" ? (
                    <button
                        type="button"
                        onClick={() => handleCareSubscribe(plan)}
                        className={cn(
                            "relative z-10 w-full py-4 px-8 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center mt-auto",
                            processingPlan === plan.name && "opacity-80 cursor-wait"
                        )}
                    >
                        {processingPlan === plan.name ? "Processing" : plan.cta}
                    </button>
                ) : (
                    <Link
                        href={type === "systems" ? "/contact?subject=Systems Waitlist Request" : `/project-request?plan=${plan.name.toLowerCase()}`}
                        className={cn(
                            "relative z-10 w-full py-4 px-8 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center mt-auto",
                            plan.price === "COMING SOON" && "opacity-80 hover:opacity-100"
                        )}
                    >
                        {plan.cta}
                    </Link>
                )}
            </div>
        ));
    };

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-32 font-sans overflow-hidden relative">


                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 relative z-10"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-primary/20 pb-12 gap-12">
                        <div>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-primary block mb-6">Financial Strategy</span>
                            <h1 className="text-5xl md:text-[6.5rem] lg:text-[7.5rem] font-display font-black leading-tight uppercase tracking-tighter">
                                The <br /> <span className="text-primary italic">Economy</span>
                            </h1>
                        </div>

                        <Link href="?modal=purchases" scroll={false} className="mb-4 md:mb-8 hidden md:block">
                            <div className="p-4 md:p-6 rounded-full bg-primary/10 border border-primary/20 text-primary hover:scale-110 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg group">
                                <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Toggle Section (Moved Here) */}
                <div className="flex justify-center mb-12 relative z-20">
                    <div className="flex flex-wrap justify-center bg-background/40 backdrop-blur-xl p-1 md:p-1.5 rounded-2xl md:rounded-full border border-primary/20 w-full md:w-auto relative group hover:border-primary/40 transition-colors gap-1 md:gap-0">
                        {["standard", "care", "systems", "addons", "premium"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setPlanType(type as "standard" | "care" | "addons" | "premium" | "systems")}
                                className={cn(
                                    "relative px-4 sm:px-6 md:px-8 py-2 md:py-3 text-[10px] md:text-sm font-bold uppercase tracking-wider md:tracking-widest transition-colors rounded-xl md:rounded-full z-10 text-center flex-1 md:flex-none min-w-[30%] md:min-w-0",
                                    planType === type ? "text-primary-foreground" : "text-primary/60 hover:text-primary"
                                )}
                            >
                                <span className="relative z-10 truncate w-full block">{type}</span>
                                {planType === type && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary rounded-xl md:rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Discount Code Section */}
                <div className="flex justify-center mb-16 relative z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 bg-background/20 p-2 rounded-2xl border border-primary/20 backdrop-blur-xl group hover:border-primary/40 transition-colors">
                            <input
                                type="text"
                                placeholder="Discount Code"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="bg-transparent border-none text-foreground placeholder:text-muted-foreground/30 focus:ring-0 text-sm uppercase tracking-wider w-40 md:w-48 px-4"
                            />
                            <button
                                onClick={handleApplyDiscount}
                                className="bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                Apply
                            </button>
                        </div>
                        <AnimatePresence>
                            {isDiscountApplied && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                                >
                                    <Check size={14} /> 10% Discount Applied!
                                </motion.span>
                            )}
                            {discountError && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest"
                                >
                                    {discountError}
                                </motion.span>
                            )}
                            {razorpayError && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest"
                                >
                                    {razorpayError}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Investment Content */}
                <div className="min-h-[600px] relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={planType}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {planType === "premium" ? (
                                <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1 p-8 md:p-14 rounded-[2.5rem] bg-primary/10 border-2 border-primary/30 hover:border-primary transition-all duration-500 flex flex-col group relative overflow-hidden backdrop-blur-xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />

                                        <div className="mb-12 relative z-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-5xl font-display uppercase italic text-primary">APEX</h3>
                                                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground/80">{t.Investment.apex.description}</p>
                                            </div>
                                        </div>

                                        <div className="mb-20 relative z-10">
                                            <div className="text-5xl md:text-7xl font-display font-black text-foreground mb-4">$4,999+</div>
                                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/40">Architecture Level</span>
                                        </div>

                                        <ul className="space-y-6 mb-16 flex-grow font-body text-base md:text-lg tracking-wide relative z-10">
                                            {["Bespoke Digital Architecture", "Survival Ready Support", "Strategic Market Hegemony", "Liquid Motion Graphics", "Neural AI Integration"].map((f, fi) => (
                                                <li key={fi} className="flex gap-4 items-start text-foreground/90">
                                                    <div className="mt-2 w-2 h-2 rounded-full bg-primary" />
                                                    <span className="leading-snug">{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href="/contact"
                                            className="relative z-10 w-full py-4 px-8 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center"
                                        >
                                            {t.Investment.apex.button}
                                        </Link>
                                    </div>

                                    <div className="md:col-span-2 p-16 flex flex-col justify-center items-center bg-background/10 border border-primary/10 rounded-[2.5rem] overflow-hidden relative backdrop-blur-sm group">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display font-black text-primary opacity-[0.03] select-none pointer-events-none italic group-hover:scale-110 transition-transform duration-1000">
                                            APEX
                                        </div>
                                        <Sparkles size={120} className="text-primary opacity-20 mb-12 stroke-[1px] animate-pookie-float" />
                                        <p className="max-w-md text-center text-foreground/60 font-display text-2xl md:text-3xl italic leading-relaxed uppercase tracking-widest">
                                            "Tailored for those who demand <span className="text-primary">absolute hegemony</span>."
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                renderPlans(planType as "standard" | "care" | "addons" | "systems")
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* User Purchases Section */}
                <UserPurchasesSection />

                {/* Resource Downloads */}
                <div className="mt-48 grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    {[
                        { title: t.Investment.brochure.title, icon: Download, label: t.Investment.brochure.description, btn: t.Investment.brochure.button, file: "mowglai-brochure.html", name: "Mowglai_Brochure.html" },
                        { title: t.Investment.customQuote.title, icon: FileText, label: t.Investment.customQuote.description, btn: t.Investment.customQuote.button, link: "/custom-request" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-16 border border-primary/20 rounded-[2.5rem] flex flex-col justify-between items-center text-center space-y-10 bg-secondary/10 hover:bg-secondary/20 transition-all group backdrop-blur-md"
                        >
                            <div className="p-6 rounded-3xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <item.icon className="w-12 h-12 stroke-[1.5px]" />
                            </div>
                            <div>
                                <h3 className="text-4xl md:text-5xl font-display uppercase mb-4 text-foreground">{item.title}</h3>
                                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mb-8">{item.label}</p>
                            </div>
                            {item.link ? (
                                <Link
                                    href={item.link}
                                    className="mt-10 inline-block w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center"
                                >
                                    {item.btn}
                                </Link>
                            ) : (
                                <button
                                    onClick={() => downloadAsHtml(`/${item.file!}`, item.name!)}
                                    className="mt-10 inline-block w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center"
                                >
                                    {item.btn}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footnote */}
                <div className="mt-48 pt-12 border-t border-primary/20 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10 opacity-60">
                    <div className="max-w-md space-y-6">
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Protocol Note</p>
                        <p className="text-sm font-body leading-loose text-muted-foreground uppercase tracking-widest">
                            All investments require a 50% initiation fee prior to architecture development. Timelines are subject to studio bandwidth and project complexity.
                        </p>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary/40 italic">
                        © {new Date().getFullYear()} Mowglai / Reserved
                    </div>
                </div>

                {/* Next Chapter CTA - Final Narrative */}
                <div className="mt-32 relative z-10">
                    <NextPageButton
                        label="HELLO"
                        href="/contact"
                        tagline="Initiate Dialogue"
                    />
                </div>
            </div >
        </PageLayout >
    )
};
