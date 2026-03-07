'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, ShieldCheck, Zap, Globe, ScanLine, TrendingUp, X, Sparkles } from "lucide-react";
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
        className="absolute rounded-full bg-primary/30 pointer-events-none"
        style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
        animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 6 + delay, repeat: Infinity, delay }}
    />
);

/* ── Scan-line animation ──────────────────────────────────── */
const ScanAnimation = () => (
    <motion.div
        animate={{ y: ['-100%', '400%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent pointer-events-none z-20"
    />
);

/* ── Feature card ─────────────────────────────────────────── */
const FeatureCard = ({
    icon: Icon, title, desc, delay, accent
}: { icon: React.ElementType; title: string; desc: string; delay: number; accent?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, scale: 1.03 }}
        className="group relative flex flex-col items-center p-8 md:p-10 rounded-3xl
                   border border-foreground/[0.06] bg-foreground/[0.02]
                   hover:border-primary/40 hover:bg-primary/[0.05]
                   transition-all duration-500 overflow-hidden cursor-default backdrop-blur-sm"
    >
        {/* Top accent line */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full ${accent || 'bg-primary/40'} group-hover:w-24 transition-all duration-500`} />

        {/* Corner glow on hover */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative z-10 p-4 rounded-2xl border border-primary/15 bg-primary/[0.06] backdrop-blur-sm mb-5
                       group-hover:border-primary/40 group-hover:bg-primary/[0.12] group-hover:shadow-[0_0_30px_rgba(197,160,89,0.12)] transition-all duration-500">
            <Icon className="w-7 h-7 text-primary" />
        </div>

        <span className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/90 mb-2 relative z-10">{title}</span>
        <span className="text-xs text-foreground/40 tracking-wide text-center leading-relaxed relative z-10 max-w-[200px]">{desc}</span>
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
        <div className="relative w-full text-foreground font-body min-h-screen cursor-none">
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
                    className="flex items-center justify-center gap-2 group border border-foreground/10 bg-background/60 hover:bg-primary/10 hover:border-primary/40 text-foreground transition-all duration-400 rounded-full px-5 py-2.5 backdrop-blur-xl"
                    aria-label="Cancel Audit"
                >
                    <span className="hidden sm:inline text-xs font-display font-black tracking-widest uppercase text-foreground/60 group-hover:text-foreground transition-colors">Close</span>
                    <X className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors duration-300" />
                </button>
            </div>

            {/* ── Ambient background ─────── */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/8 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
                    className="absolute bottom-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]"
                />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
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
            <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center w-full pt-28 md:pt-36 pb-20">

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
                                className="flex items-center gap-3 px-6 py-2.5 rounded-full
                                           border border-primary/15 bg-foreground/[0.03] backdrop-blur-xl
                                           shadow-[0_0_40px_rgba(197,160,89,0.05)] mb-12"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span className="text-primary/80 text-[10px] font-bold tracking-[0.35em] uppercase">Diagnostic Engine · Online</span>
                            </motion.div>

                            {/* Headline */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center mb-6 px-4"
                            >
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Sparkles className="w-5 h-5 text-primary/50" />
                                    <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-foreground/30">100% Free · No Sign-up Required</span>
                                    <Sparkles className="w-5 h-5 text-primary/50" />
                                </div>
                                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1]">
                                    Decode your{' '}
                                    <motion.span
                                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                        className="inline-block bg-gradient-to-r from-primary via-foreground to-primary
                                                   bg-[length:200%_auto] bg-clip-text text-transparent italic"
                                    >
                                        digital DNA
                                    </motion.span>
                                </h1>
                            </motion.div>

                            {/* Sub */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-base md:text-lg text-foreground/40 max-w-xl text-center
                                           leading-relaxed mb-16 font-light"
                            >
                                Real-time analysis of your website&apos;s architecture, performance, SEO health,
                                and security posture — absolutely free.
                            </motion.p>

                            {/* ── URL Input Form ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full mb-12"
                            >
                                {/* Outer shell */}
                                <motion.div
                                    animate={{
                                        boxShadow: focused
                                            ? '0 0 0 1px rgba(197,160,89,0.3), 0 0 80px rgba(197,160,89,0.1), 0 20px 60px rgba(0,0,0,0.2)'
                                            : '0 0 0 1px rgba(255,255,255,0.05), 0 10px 40px rgba(0,0,0,0.15)',
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="relative rounded-[2rem] md:rounded-[2.5rem] border border-foreground/[0.06]
                                               bg-foreground/[0.03] backdrop-blur-2xl overflow-hidden"
                                >
                                    {/* Scan line inside the form */}
                                    {focused && <ScanAnimation />}

                                    {/* Corner accents */}
                                    <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/20 rounded-tl-[2rem] md:rounded-tl-[2.5rem] pointer-events-none" />
                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/20 rounded-br-[2rem] md:rounded-br-[2.5rem] pointer-events-none" />

                                    {/* Inner ambient */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute -top-10 right-16 w-40 h-40 bg-primary/8 rounded-full blur-[80px]" />
                                        <div className="absolute -bottom-10 left-16 w-40 h-40 bg-primary/5 rounded-full blur-[80px]" />
                                    </div>

                                    <form
                                        onSubmit={handleAnalyze}
                                        className="relative z-10 flex flex-col md:flex-row gap-3 p-3 md:p-4 items-center"
                                    >
                                        {/* Input */}
                                        <div className="relative flex-1 flex items-center w-full">
                                            <div className="absolute left-4 md:left-5 p-2.5 rounded-xl
                                                          bg-primary/8 border border-primary/15 backdrop-blur-sm">
                                                <Globe className="w-5 h-5 text-primary/70" />
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
                                                          border-none text-foreground placeholder:text-foreground/20
                                                          focus-visible:ring-0 text-lg md:text-xl font-light w-full"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full md:w-auto h-14 md:h-16 px-8 md:px-12
                                                          bg-primary hover:bg-foreground text-background
                                                          font-bold text-sm tracking-[0.2em] uppercase
                                                          rounded-xl md:rounded-2xl transition-all duration-400
                                                          shadow-[0_8px_32px_rgba(197,160,89,0.2)]
                                                          hover:shadow-[0_12px_40px_rgba(197,160,89,0.08)]
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
                                                        <><ScanLine className="w-4 h-4" /><span>Run Audit</span><ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
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
                                            animate={{ opacity: 1, height: 3 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="w-full mt-3 rounded-full overflow-hidden bg-foreground/[0.05]"
                                        >
                                            <motion.div
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                                className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>



                            {/* ── Feature Cards ── */}
                            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FeatureCard icon={Zap} title="Performance" desc="Lighthouse-powered real-time speed & core web vitals" delay={0.55} accent="bg-emerald-400/50" />
                                <FeatureCard icon={ShieldCheck} title="Security" desc="Headers, HTTPS, vulnerabilities & threat analysis" delay={0.65} accent="bg-blue-400/50" />
                                <FeatureCard icon={TrendingUp} title="SEO" desc="Meta tags, structure, accessibility & crawlability" delay={0.75} accent="bg-amber-400/50" />
                            </div>

                            {/* Trust indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.6 }}
                                className="mt-12 flex items-center gap-6 text-foreground/20"
                            >
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground/10" />
                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase whitespace-nowrap">Trusted by 500+ websites</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-foreground/10" />
                            </motion.div>

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
                                className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-8 gap-4 w-full
                                           p-4 rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-3 text-xs text-foreground/40 font-mono tracking-widest uppercase text-center sm:text-left">
                                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="break-all">Audit complete · <span className="text-primary">{url}</span></span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => { setResult(null); setUrl(''); }}
                                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-foreground/10
                                              bg-foreground/[0.03] backdrop-blur-sm text-primary text-xs font-bold
                                              uppercase tracking-widest hover:bg-primary hover:text-background hover:border-primary
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
