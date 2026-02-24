'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { X, Sparkles, ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const AuditPage = dynamic(() => import('@/app/audit/page'), { ssr: false });

const AuditButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const rotateRef = useRef<number>(0);
    const rafRef = useRef<number | null>(null);
    const svgRef = useRef<SVGTextPathElement | null>(null);

    // Show the button once user scrolls past hero
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Also show after 2s regardless
        const timer = setTimeout(() => setIsVisible(true), 2000);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    // Rotate the circular text via rAF
    useEffect(() => {
        const tick = () => {
            rotateRef.current = (rotateRef.current + 0.4) % 360;
            if (svgRef.current) {
                svgRef.current.parentElement!.setAttribute(
                    'transform',
                    `rotate(${rotateRef.current}, 50, 50)`
                );
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Lock scroll when page is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [isOpen]);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <>
            {/* ── Floating Audit Button (sticky, bottom-right) ─────────────── */}
            <AnimatePresence>
                {isVisible && !isOpen && (
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 80, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                        className="fixed bottom-8 right-8 z-[500] flex items-center gap-3 cursor-pointer select-none"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={open}
                        role="button"
                        aria-label="Get a Free Website Audit"
                    >
                        {/* Pill label (slides in on hover) */}
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    key="label"
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className="flex flex-col items-end"
                                >
                                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a059]/70">100% Free</span>
                                    <span className="text-base font-display font-bold uppercase tracking-widest text-foreground whitespace-nowrap">Get Free Audit</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Circular spinning button */}
                        <div className="relative w-20 h-20 flex items-center justify-center">
                            {/* Outer pulse ring */}
                            <motion.span
                                animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-0 rounded-full border border-[#c5a059]/50 pointer-events-none"
                            />

                            {/* Rotating SVG text ring */}
                            <svg
                                viewBox="0 0 100 100"
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                aria-hidden
                            >
                                <g>
                                    <path id="btnCircle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                                    <text fontSize="8.5" letterSpacing="0.5">
                                        <textPath
                                            ref={svgRef}
                                            href="#btnCircle"
                                            fill="#c5a059"
                                            style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700 }}
                                        >
                                            FREE AUDIT • FREE AUDIT • FREE AUDIT •
                                        </textPath>
                                    </text>
                                </g>
                            </svg>

                            {/* Inner disc */}
                            <motion.div
                                animate={{
                                    backgroundColor: isHovered
                                        ? 'rgba(197,160,89,1)'
                                        : 'rgba(197,160,89,0.12)',
                                    boxShadow: isHovered
                                        ? '0 0 40px rgba(197,160,89,0.5), 0 0 80px rgba(197,160,89,0.2)'
                                        : '0 0 0px rgba(197,160,89,0)',
                                }}
                                transition={{ duration: 0.35 }}
                                className="relative w-12 h-12 rounded-full border border-[#c5a059]/40 backdrop-blur-xl flex items-center justify-center"
                            >
                                <motion.div
                                    animate={{ rotate: isHovered ? 45 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {isHovered ? (
                                        <ArrowUpRight className="w-5 h-5 text-black" strokeWidth={2.5} />
                                    ) : (
                                        <Sparkles className="w-5 h-5 text-[#c5a059]" />
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Full Page Audit Overlay ───────────────────────────────────── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="audit-overlay"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{
                            duration: 0.75,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                        className="fixed inset-0 z-[9999] flex flex-col bg-background overflow-hidden"
                        style={{ willChange: 'transform' }}
                    >
                        {/* ── Nav bar ───── */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.4 }}
                            className="shrink-0 w-full flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5 bg-background/60 backdrop-blur-2xl z-10"
                        >
                            {/* Brand */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center shadow-[0_0_16px_rgba(197,160,89,0.4)]">
                                    <Sparkles className="w-4 h-4 text-black" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[11px] font-display font-bold tracking-[0.3em] uppercase text-[#c5a059]">Mowglai</span>
                                    <span className="text-[9px] font-mono opacity-40 tracking-widest uppercase">Free Audit Engine</span>
                                </div>
                            </div>

                            {/* Close */}
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.93 }}
                                onClick={close}
                                aria-label="Close Audit"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-[#c5a059] hover:border-[#c5a059] text-foreground hover:text-black transition-all duration-300 text-sm font-display font-bold uppercase tracking-widest"
                            >
                                <X className="w-4 h-4" />
                                <span>Close</span>
                            </motion.button>
                        </motion.div>

                        {/* ── Scrollable content ───── */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="flex-1 overflow-y-auto custom-scrollbar"
                        >
                            <AuditPage />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AuditButton;
