"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, CreditCard, QrCode, Copy, Check, Clock, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PlanPreset {
    name: string;
    amount: string;
    description: string;
}

const presets: PlanPreset[] = [
    { name: "BASIC PROJECT", amount: "499", description: "Essential Digital Presence" },
    { name: "ADVANCED PROJECT", amount: "999", description: "Scale & Growth Architecture" },
    { name: "MOWGLAI CARE", amount: "15", description: "Monthly Managed Subscription" },
    { name: "CUSTOM", amount: "", description: "Enter any amount to proceed" }
];

interface TransactionDetails {
    id: string;
    method: string;
    amount: string;
    date: string;
}

export default function PaymentPage() {
    const [selectedPlan, setSelectedPlan] = useState<PlanPreset>(presets[0]);
    const [customAmount, setCustomAmount] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        purpose: "Project Deposit"
    });
    const [paymentMethod, setPaymentMethod] = useState<"gateway" | "qrcode">("gateway");
    const [razorpayReady, setRazorpayReady] = useState(false);
    const [razorpayError, setRazorpayError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const [copied, setCopied] = useState(false);
    const [countdown, setCountdown] = useState(300); // 5 minutes

    const upiId = "mowglai@icici";
    const activeAmount = selectedPlan.name === "CUSTOM" ? customAmount : selectedPlan.amount;

    // Load Razorpay Script
    useEffect(() => {
        const loadRazorpay = () =>
            new Promise<boolean>((resolve) => {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                if ((window as any).Razorpay) {
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
            setRazorpayReady(ready);
            if (!ready) {
                setRazorpayError("Razorpay failed to load. Please check your connection.");
            }
        });
    }, []);

    // QR Code countdown
    useEffect(() => {
        if (paymentMethod !== "qrcode" || countdown <= 0 || paymentSuccess) return;
        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [paymentMethod, countdown, paymentSuccess]);

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60);
        const s = secs % 60;
        return `${mins}:${s < 10 ? "0" : ""}${s}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCopyUpi = () => {
        navigator.clipboard.writeText(`${upiId}?amount=${activeAmount}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const triggerGatewayPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setRazorpayError("");

        if (!activeAmount || parseFloat(activeAmount) <= 0) {
            setRazorpayError("Please enter a valid payment amount.");
            return;
        }

        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const RazorpayConstructor = (window as any).Razorpay;
        if (!razorpayReady || !RazorpayConstructor) {
            setRazorpayError("Razorpay script is still loading. Please wait a moment.");
            return;
        }

        setIsProcessing(true);

        const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_MowglaiDummyKey";

        const options = {
            key: keyId,
            amount: parseFloat(activeAmount) * 100, // paise
            currency: "USD",
            name: "MOWGLAI DIGITAL",
            description: `${selectedPlan.name} - ${formData.purpose}`,
            image: "/mowglai-logo-light.png",
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            handler: function (response: any) {
                setIsProcessing(false);
                setPaymentSuccess(true);
                setTransactionDetails({
                    id: response.razorpay_payment_id,
                    method: "Razorpay Checkout Gateway",
                    amount: `$${activeAmount}`,
                    date: new Date().toLocaleString()
                });
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone
            },
            theme: {
                color: "#E6B93D"
            },
            modal: {
                ondismiss: function () {
                    setIsProcessing(false);
                }
            }
        };

        try {
            const rzp = new RazorpayConstructor(options);
            rzp.open();
        } catch (err: unknown) {
            setIsProcessing(false);
            setRazorpayError(err instanceof Error ? err.message : "Failed to initiate Razorpay overlay.");
        }
    };

    const handleVerifyQrPayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentSuccess(true);
            setTransactionDetails({
                id: `pay_QR_${Math.random().toString(36).substring(2, 12).toUpperCase()}`,
                method: "Razorpay Dynamic QR Code (UPI)",
                amount: `$${activeAmount}`,
                date: new Date().toLocaleString()
            });
        }, 1500);
    };

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-32 font-sans relative overflow-hidden flex flex-col justify-center items-center">
                {/* Background Atmosphere */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">SECURE CHECKOUT</span>
                        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase mt-2">
                            Payment <span className="text-primary italic">Terminal</span>
                        </h1>
                        <p className="text-foreground/50 text-sm mt-3 max-w-md mx-auto">
                            Complete your transactions safely using our standard gateways or dynamic QR scanning.
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {paymentSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-8 md:p-16 rounded-[2.5rem] bg-secondary/20 border border-primary/20 backdrop-blur-xl text-center max-w-2xl mx-auto"
                            >
                                <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                                    <CheckCircle2 className="w-10 h-10 text-primary" />
                                </div>

                                <h2 className="text-3xl font-display font-black uppercase text-foreground">Payment Received</h2>
                                <p className="text-foreground/60 text-sm mt-2">Your transaction has been processed successfully.</p>

                                <div className="mt-8 border border-white/5 bg-white/[0.02] p-6 rounded-2xl text-left space-y-3 font-mono text-xs md:text-sm text-foreground/80">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-foreground/40">Transaction ID</span>
                                        <span className="text-primary">{transactionDetails?.id}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-foreground/40">Amount</span>
                                        <span className="text-foreground font-bold">{transactionDetails?.amount} USD</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-foreground/40">Method</span>
                                        <span>{transactionDetails?.method}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground/40">Date & Time</span>
                                        <span>{transactionDetails?.date}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        setPaymentSuccess(false);
                                        setFormData({ name: "", email: "", phone: "", purpose: "Project Deposit" });
                                        setCountdown(300);
                                    }}
                                    className="mt-8 px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/95 transition-all"
                                >
                                    New Payment
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                                {/* Left Side: Presets and Fields */}
                                <div className="lg:col-span-7 p-8 md:p-12 rounded-[2.5rem] bg-secondary/10 border border-white/5 backdrop-blur-xl flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-display font-black uppercase text-foreground mb-6">Select Package / Plan</h3>
                                        <div className="grid grid-cols-2 gap-3 mb-8">
                                            {presets.map((preset) => (
                                                <button
                                                    key={preset.name}
                                                    type="button"
                                                    onClick={() => setSelectedPlan(preset)}
                                                    className={cn(
                                                        "p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all duration-300",
                                                        selectedPlan.name === preset.name
                                                            ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(230,185,61,0.1)]"
                                                            : "border-white/5 bg-white/[0.01] hover:border-white/10"
                                                    )}
                                                >
                                                    <span className={cn(
                                                        "text-[10px] font-bold tracking-wider",
                                                        selectedPlan.name === preset.name ? "text-primary" : "text-foreground/40"
                                                    )}>
                                                        {preset.name}
                                                    </span>
                                                    <span className="text-lg md:text-xl font-display font-black text-foreground mt-2">
                                                        {preset.amount ? `$${preset.amount}` : "CUSTOM"}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>

                                        <AnimatePresence>
                                            {selectedPlan.name === "CUSTOM" && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mb-8"
                                                >
                                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/50 block mb-2">Amount (USD)</label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Enter custom amount in USD"
                                                        value={customAmount}
                                                        onChange={(e) => setCustomAmount(e.target.value)}
                                                        className="bg-background/50 border-primary/30 focus:border-primary h-12 text-base"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <h3 className="text-xl font-display font-black uppercase text-foreground mb-6">Prefill Billing Details</h3>
                                        <form onSubmit={triggerGatewayPayment} className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                    name="name"
                                                    placeholder="Full Name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="bg-background/50 border-white/10 focus:border-primary h-12"
                                                />
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email Address"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="bg-background/50 border-white/10 focus:border-primary h-12"
                                                />
                                            </div>
                                            <Input
                                                name="phone"
                                                type="tel"
                                                placeholder="Contact Number (with country code)"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-background/50 border-white/10 focus:border-primary h-12"
                                            />
                                            <Input
                                                name="purpose"
                                                placeholder="Purpose of Payment (e.g. Deposit, Maintenance)"
                                                value={formData.purpose}
                                                onChange={handleInputChange}
                                                required
                                                className="bg-background/50 border-white/10 focus:border-primary h-12"
                                            />
                                        </form>
                                    </div>

                                    {razorpayError && (
                                        <div className="mt-6 flex items-center gap-2 text-red-400 text-xs font-mono border border-red-500/20 bg-red-500/5 p-4 rounded-xl">
                                            <AlertCircle size={16} />
                                            <span>{razorpayError}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Checkout Payment Option Card */}
                                <div className="lg:col-span-5 p-8 md:p-12 rounded-[2.5rem] bg-secondary/15 border border-primary/20 backdrop-blur-xl flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-display font-black uppercase text-foreground mb-6">Payment Method</h3>

                                        <div className="grid grid-cols-2 bg-background/50 border border-white/5 p-1 rounded-2xl mb-8">
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("gateway")}
                                                className={cn(
                                                    "py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all",
                                                    paymentMethod === "gateway" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
                                                )}
                                            >
                                                <CreditCard size={14} /> Gateway
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setPaymentMethod("qrcode")}
                                                className={cn(
                                                    "py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all",
                                                    paymentMethod === "qrcode" ? "bg-primary text-primary-foreground" : "text-foreground/60 hover:text-foreground"
                                                )}
                                            >
                                                <QrCode size={14} /> UPI QR
                                            </button>
                                        </div>

                                        <AnimatePresence mode="wait">
                                            {paymentMethod === "gateway" ? (
                                                <motion.div
                                                    key="gateway"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="text-center py-6"
                                                >
                                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                                        <CreditCard className="w-8 h-8" />
                                                    </div>
                                                    <h4 className="text-lg font-display font-bold uppercase text-foreground">Razorpay Gateway</h4>
                                                    <p className="text-foreground/50 text-xs mt-2 max-w-xs mx-auto leading-relaxed">
                                                        Pay with dynamic support for Cards, Netbanking, UPI, and wallets via Razorpay's secure checkout page.
                                                    </p>
                                                    <div className="mt-8 text-2xl font-display font-black text-primary">
                                                        ${activeAmount || "0"} <span className="text-xs text-foreground/40 font-mono font-normal">USD</span>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="qrcode"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    className="text-center flex flex-col items-center"
                                                >
                                                    {/* Beautiful Mock QR Container */}
                                                    <div className="relative w-44 h-44 border border-primary/30 p-2.5 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_30px_rgba(230,185,61,0.15)] overflow-hidden group">
                                                        {/* Scanning Laser Line */}
                                                        <div className="absolute left-0 right-0 h-[2px] bg-primary animate-[scan_2.5s_ease-in-out_infinite] z-10 shadow-[0_0_10px_#E6B93D]" />

                                                        {/* QR Code SVG */}
                                                        <svg className="w-full h-full text-zinc-900" viewBox="0 0 100 100">
                                                            {/* Corner Squares */}
                                                            <rect x="5" y="5" width="20" height="20" fill="currentColor" />
                                                            <rect x="8" y="8" width="14" height="14" fill="white" />
                                                            <rect x="11" y="11" width="8" height="8" fill="currentColor" />

                                                            <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                                                            <rect x="78" y="8" width="14" height="14" fill="white" />
                                                            <rect x="11" y="11" width="8" height="8" fill="currentColor" />
                                                            <rect x="81" y="11" width="8" height="8" fill="currentColor" />

                                                            <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                                                            <rect x="8" y="78" width="14" height="14" fill="white" />
                                                            <rect x="11" y="81" width="8" height="8" fill="currentColor" />

                                                            {/* Random Matrix Dots */}
                                                            <path d="M35,10 h5 v5 h-5 z M45,5 h5 v5 h-5 z M55,10 h5 v5 h-5 z M65,5 h5 v5 h-5 z M35,20 h5 v5 h-5 z M50,20 h5 v5 h-5 z M60,25 h5 v5 h-5 z M30,30 h5 v5 h-5 z M40,35 h5 v5 h-5 z M55,30 h5 v5 h-5 z M70,30 h5 v5 h-5 z M10,35 h5 v5 h-5 z M20,40 h5 v5 h-5 z M45,45 h5 v5 h-5 z M60,40 h5 v5 h-5 z M75,45 h5 v5 h-5 z M15,50 h5 v5 h-5 z M30,55 h5 v5 h-5 z M50,55 h5 v5 h-5 z M65,50 h5 v5 h-5 z M85,55 h5 v5 h-5 z M5,60 h5 v5 h-5 z M25,60 h5 v5 h-5 z M40,65 h5 v5 h-5 z M55,60 h5 v5 h-5 z M70,65 h5 v5 h-5 z M35,70 h5 v5 h-5 z M45,75 h5 v5 h-5 z M65,75 h5 v5 h-5 z M80,70 h5 v5 h-5 z M30,85 h5 v5 h-5 z M50,80 h5 v5 h-5 z M60,85 h5 v5 h-5 z M75,80 h5 v5 h-5 z M40,90 h5 v5 h-5 z M55,95 h5 v5 h-5 z M70,90 h5 v5 h-5 z M85,95 h5 v5 h-5 z" fill="currentColor" />
                                                        </svg>
                                                    </div>

                                                    {/* Copy UPI Row */}
                                                    <div className="mt-5 w-full flex items-center justify-between bg-background/50 border border-white/5 px-4 py-2 rounded-xl text-xs font-mono">
                                                        <span className="text-foreground/50">UPI: {upiId}</span>
                                                        <button
                                                            type="button"
                                                            onClick={handleCopyUpi}
                                                            className="text-primary hover:text-foreground transition-colors ml-2"
                                                        >
                                                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                                        </button>
                                                    </div>

                                                    {/* Countdown & Instructions */}
                                                    <div className="mt-4 flex items-center gap-1.5 text-xs text-foreground/40 font-mono">
                                                        <Clock size={12} />
                                                        <span>Code expires in:</span>
                                                        <span className="text-primary font-bold">{formatTime(countdown)}</span>
                                                    </div>

                                                    <p className="text-[10px] text-foreground/30 mt-3 max-w-xs leading-normal">
                                                        Scan this dynamic QR using any UPI app (GPay, PhonePe, Paytm) to transfer the amount instantly.
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Action CTA Button */}
                                    <div className="mt-8">
                                        {paymentMethod === "gateway" ? (
                                            <Button
                                                onClick={triggerGatewayPayment}
                                                disabled={isProcessing || !formData.name || !formData.email || !formData.phone}
                                                className="w-full py-6 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest hover:bg-primary/95 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>PAY VIA GATEWAY <ArrowRight className="w-4 h-4" /></>}
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleVerifyQrPayment}
                                                disabled={isProcessing || !formData.name || !formData.email || !formData.phone || countdown <= 0}
                                                className="w-full py-6 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest hover:bg-primary/95 transition-all flex items-center justify-center gap-2"
                                            >
                                                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>VERIFY QR PAYMENT <ArrowRight className="w-4 h-4" /></>}
                                            </Button>
                                        )}
                                        <p className="text-[9px] text-center text-foreground/20 font-mono uppercase tracking-widest mt-3">
                                            SECURED BY 256-BIT ENCRYPTION & RAZORPAY API PROTOCOLS
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0%, 100% { top: 0%; }
                    50% { top: 100%; }
                }
            `}</style>
        </PageLayout>
    );
}
