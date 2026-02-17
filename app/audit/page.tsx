'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, ArrowRight, Activity, ShieldCheck, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuditReport from './AuditReport';
import { analyzeWebsite, AuditResult } from './actions';
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";

export default function AuditPage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const { toast } = useToast();

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("url", url);

        try {
            const data = await analyzeWebsite(formData);

            if (data.success) {
                setResult(data);
                toast({
                    title: "Audit Complete",
                    description: `Successfully analyzed ${url}`,
                });
            } else {
                toast({
                    title: "Audit Failed",
                    description: data.error || "Something went wrong.",
                    variant: "destructive"
                });
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "Failed to connect to the audit server.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0d1a12] text-white selection:bg-[#c5a059]/30 pt-24 pb-20 px-4 relative overflow-hidden">
            <CustomCursor />

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-16 max-w-3xl px-4 mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059] text-sm font-medium mb-8">
                            <Activity className="w-4 h-4" />
                            <span>Free Digital Health Check</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8 text-[#f8fafc]">
                            Is your website <span className="text-[#c5a059] italic">actually</span> working?
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 mb-10 text-balance max-w-2xl mx-auto leading-relaxed">
                            Most websites look good but perform poorly. Get a plain-English breakdown of your speed, security, and visibility in under 10 seconds.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        onSubmit={handleAnalyze}
                        className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm focus-within:ring-2 ring-[#c5a059]/50 transition-all"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <Input
                                type="url"
                                placeholder="e.g., https://yourbusiness.com"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                className="h-14 pl-12 bg-transparent border-none text-white placeholder:text-white/30 focus-visible:ring-0 text-lg"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-14 px-8 bg-[#c5a059] hover:bg-[#b08d4b] text-[#0d1a12] font-semibold text-lg rounded-xl transition-all shadow-lg hover:shadow-[#c5a059]/20"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Analyze Now"}
                            {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                        </Button>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-12 flex flex-wrap justify-center gap-8 text-white/40 text-sm font-medium"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#c5a059]" />
                            <span>Instant Results</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                            <span>Secure Analysis</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#c5a059]" />
                            <span>Actionable Insights</span>
                        </div>
                    </motion.div>
                </div>

                {/* Results Section */}
                {result && (
                    <div className="w-full">
                        <AuditReport result={result} />
                    </div>
                )}

            </div>
        </div>
    );
}
