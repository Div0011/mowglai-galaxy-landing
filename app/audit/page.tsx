'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, ShieldCheck, Zap, Globe, Cpu, ScanLine, Lock, TrendingUp, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuditReport from './AuditReport';
import { analyzeWebsite, AuditResult } from './actions';
import { motion, AnimatePresence } from "framer-motion";
import JungleBackground from '@/components/JungleBackground';
import MowglaiLogo from "@/components/MowglaiLogo";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });


/* ── Floating particle dot ────────────────────────────────── */
const Particle = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
    <motion.div
        className="absolute rounded-full bg-primary/20 pointer-events-none"
        style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
        animate={{ y: [0, -30, 0], opacity: [0, 0.7, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, delay }}
    />
);

/* ── Animated counter ─────────────────────────────────────── */
const Counter = ({ value, label }: { value: string; label: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
    >
        <span className="text-3xl md:text-4xl font-display font-black text-primary">{value}</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-mono mt-1">{label}</span>
    </motion.div>
);

/* ── Scan-line animation ──────────────────────────────────── */
const ScanAnimation = () => (
    <motion.div
        animate={{ y: ['-100%', '400%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none z-20"
    />
);

/* ── Feature card ─────────────────────────────────────────── */
const FeatureCard = ({
    icon: Icon, title, desc, delay
}: { icon: React.ElementType; title: string; desc: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="group relative flex flex-col items-center p-6 md:p-8 rounded-3xl
                   border border-primary/10 bg-primary/[0.03]
                   hover:border-primary/30 hover:bg-primary/[0.07]
                   transition-colors duration-300 overflow-hidden cursor-default"
    >
        {/* Corner glow on hover */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 p-3.5 rounded-2xl border border-primary/20 bg-background/40 backdrop-blur-sm mb-4
                       group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(197,160,89,0.15)] transition-all duration-400">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/80 mb-1.5 relative z-10">{title}</span>
        <span className="text-[11px] text-foreground/40 tracking-wide text-center leading-relaxed relative z-10">{desc}</span>
    </motion.div>
);

/* ══════════════════════════════════════════════════════════ */
export default function AuditPage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [focused, setFocused] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    // Ensure random particles are only generated on client to avoid hydration mismatch
    const [particles, setParticles] = useState<Array<{ id: number; delay: number; x: number; y: number; size: number }>>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                delay: Math.random() * 4,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 2 + Math.random() * 4,
            }))
        );
    }, []);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append('url', url);

        try {
            const data = await analyzeWebsite(formData);
            if (data.success) {
                setResult(data);
                toast({ title: 'Analysis Matrix Complete', description: `Successfully audited ${url}` });
            } else {
                toast({ title: 'Diagnostic Failed', description: data.error || 'The server could not reach the target URL.', variant: 'destructive' });
            }
        } catch {
            toast({ title: 'System Error', description: 'Failed to initialize the audit engine.', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative w-full text-foreground font-body pt-20 pb-20 min-h-screen cursor-none"
        >
            <CustomCursor />
            <SmoothScroll />

            {/* ── Header Controls ────────────── */}
            <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] left-[calc(0.875rem+env(safe-area-inset-left))] md:top-[calc(2rem+env(safe-area-inset-top))] md:left-[calc(2rem+env(safe-area-inset-left))] z-[60]">
                <button
                    onClick={() => router.push('/')}
                    className="group"
                    aria-label="Back to Home"
                >
                    <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 opacity-100 blur-0">
                        <MowglaiLogo size="lg" className="w-14 h-14 md:w-16 md:h-16 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] group-hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all duration-500" />
                    </div>
                </button>
            </div>

            <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] right-[calc(1rem+env(safe-area-inset-right))] md:top-[calc(2rem+env(safe-area-inset-top))] md:right-[calc(2rem+env(safe-area-inset-right))] z-[60]">
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center justify-center gap-2 group border border-primary/20 bg-background/50 hover:bg-primary/5 hover:border-primary/50 text-foreground transition-all duration-300 rounded-full px-4 md:px-5 py-2 md:py-2.5 backdrop-blur-md"
                    aria-label="Cancel Audit"
                >
                    <span className="hidden sm:inline text-xs md:text-sm font-display font-black tracking-widest uppercase text-foreground/80 group-hover:text-foreground">Close</span>
                    <X className="w-4 h-4 md:w-5 md:h-5 text-primary/80 group-hover:text-primary transition-colors duration-300" />
                </button>
            </div>

            {/* ── Ambient background glows ─────── */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                    className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px]"
                />
            </div>

            {/* ── Jungle Background ───────────── */}
            <div className="fixed inset-0 pointer-events-none -z-20">
                <JungleBackground />
            </div>

            {/* ── Floating particles ───────────── */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden text-primary">
                {particles.map((p) => <Particle key={p.id} {...p} />)}
            </div>

            {/* ── Main content ─────────────────── */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center w-full">

                <AnimatePresence mode="wait">
                    {!result ? (

                        /* ══ INPUT STATE ══ */
                        <motion.div
                            key="input"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="w-full flex flex-col items-center pb-8"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-3 px-5 py-2 rounded-full
                                           border border-primary/20 bg-background/20 backdrop-blur-lg
                                           shadow-[0_0_30px_rgba(197,160,89,0.07)] mb-10"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase">Diagnostic Engine · Online</span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="text-2xl sm:text-4xl lg:text-5xl font-display font-black
                                           tracking-tight leading-normal text-center mb-6 px-4"
                            >
                                Decode your <br className="sm:hidden" />
                                <motion.span
                                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                    className="inline-block bg-gradient-to-r from-primary via-foreground to-primary
                                               bg-[length:200%_auto] bg-clip-text text-transparent italic px-2 pb-1"
                                >
                                    digital DNA.
                                </motion.span>
                            </motion.h1>

                            {/* Sub */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-base md:text-lg text-foreground/50 max-w-2xl text-center
                                           leading-relaxed mb-14 font-light"
                            >
                                Real-time analysis of your website's architecture, performance, SEO health,
                                and security posture — absolutely free.
                            </motion.p>

                            {/* ── URL Input Form ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full mb-8"
                            >
                                {/* Outer glowing shell */}
                                <motion.div
                                    animate={{
                                        boxShadow: focused
                                            ? '0 0 0 1px rgba(197,160,89,0.4), 0 0 60px rgba(197,160,89,0.15)'
                                            : '0 0 0 1px rgba(197,160,89,0.1), 0 0 0px transparent',
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="relative rounded-[2.5rem] border border-primary/10
                                               bg-background/30 backdrop-blur-2xl overflow-hidden"
                                >
                                    {/* Scan line inside the form */}
                                    {focused && <ScanAnimation />}

                                    {/* Inner ambient */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute -top-10 right-16 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />
                                        <div className="absolute -bottom-10 left-16 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
                                    </div>

                                    <form
                                        onSubmit={handleAnalyze}
                                        className="relative z-10 flex flex-col md:flex-row gap-3 p-3 md:p-4 items-center"
                                    >
                                        {/* Input */}
                                        <div className="relative flex-1 flex items-center w-full">
                                            <div className="absolute left-4 md:left-5 p-2.5 rounded-full
                                                          bg-primary/10 border border-primary/20 backdrop-blur-sm">
                                                <Globe className="w-5 h-5 text-primary" />
                                            </div>
                                            <Input
                                                type="url"
                                                placeholder="https://yourdomain.com"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                onFocus={() => setFocused(true)}
                                                onBlur={() => setFocused(false)}
                                                required
                                                className="h-16 md:h-20 pl-16 md:pl-20 pr-4 bg-transparent
                                                          border-none text-foreground placeholder:text-foreground/25
                                                          focus-visible:ring-0 text-lg md:text-xl font-light w-full"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full md:w-auto h-14 md:h-20 px-8 md:px-12
                                                          bg-primary hover:bg-foreground text-background
                                                          font-bold text-sm tracking-[0.2em] uppercase
                                                          rounded-[1.8rem] transition-all duration-400
                                                          shadow-[0_8px_32px_rgba(197,160,89,0.25)]
                                                          hover:shadow-[0_12px_40px_rgba(197,160,89,0.1)]
                                                          disabled:opacity-50 shrink-0 relative overflow-hidden group/btn"
                                            >
                                                {/* Shine sweep */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
                                                               translate-x-[-100%] group-hover/btn:translate-x-[100%]
                                                               transition-transform duration-700 ease-in-out pointer-events-none" />
                                                <span className="relative z-10 flex items-center gap-2.5">
                                                    {loading ? (
                                                        <><Loader2 className="w-5 h-5 animate-spin" /><span>Analyzing…</span></>
                                                    ) : (
                                                        <><span>Run Audit</span><ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
                                                    )}
                                                </span>
                                            </Button>
                                        </motion.div>
                                    </form>
                                </motion.div>

                                {/* Loading progress bar */}
                                <AnimatePresence>
                                    {loading && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 2 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="w-full mt-2 rounded-full overflow-hidden bg-primary/10"
                                        >
                                            <motion.div
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                                                className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>



                            {/* ── Feature Cards ── */}
                            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FeatureCard icon={Zap} title="Performance Scan" desc="Lighthouse-powered real-time metrics" delay={0.55} />
                                <FeatureCard icon={ShieldCheck} title="Security Check" desc="Headers, HTTPS & vulnerability scan" delay={0.65} />
                                <FeatureCard icon={TrendingUp} title="SEO Analysis" desc="Meta, structure & crawlability" delay={0.75} />
                            </div>

                        </motion.div>

                    ) : (

                        /* ══ RESULTS STATE ══ */
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full pt-4"
                        >
                            {/* Re-run bar */}
                            <motion.div
                                initial={{ opacity: 0, y: -16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-8 gap-4 w-full"
                            >
                                <div className="flex items-center gap-2 text-xs text-foreground/40 font-mono tracking-widest uppercase text-center sm:text-left">
                                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                                    <span className="break-all">Audit complete · <span className="text-primary">{url}</span></span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => { setResult(null); setUrl(''); }}
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-primary/20
                                              bg-background/30 backdrop-blur-sm text-primary text-xs font-bold
                                              uppercase tracking-widest hover:bg-primary hover:text-background
                                              transition-all duration-300 w-full sm:w-auto"
                                >
                                    <ScanLine className="w-3.5 h-3.5" />
                                    New Audit
                                </motion.button>
                            </motion.div>

                            <AuditReport result={result} />
                        </motion.div>

                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
