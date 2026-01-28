"use client";

import MinimalLayout from "./Layout";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { sectors, allTemplates } from '@/data/templates';
import { useState, useMemo } from 'react';

export default function MinimalExplore() {
    const [selectedSector, setSelectedSector] = useState('all');

    // Flatten all templates
    const allTemplatesFlat = useMemo(() => Object.values(allTemplates).flat(), []);

    const filteredTemplates = useMemo(() => {
        if (selectedSector === 'all') return allTemplatesFlat;
        return allTemplates[selectedSector] || [];
    }, [selectedSector, allTemplatesFlat]);

    return (
        <MinimalLayout>
            <div className="bg-background text-foreground min-h-screen px-4 md:px-12 py-32 font-serif">
                {/* Header Area */}
                <div className="border-b border-foreground pb-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                    <h1 className="text-[12vw] md:text-[8vw] font-display font-black leading-[0.7] uppercase tracking-tighter">
                        The <br /> <span className="italic">Gallery</span>
                    </h1>
                    <div className="flex flex-wrap gap-4 md:gap-8 text-xs uppercase tracking-[0.3em] font-body">
                        <button
                            onClick={() => setSelectedSector('all')}
                            className={`${selectedSector === 'all' ? 'font-bold border-b border-foreground' : 'text-neutral-400'}`}
                        >
                            All
                        </button>
                        {sectors.map(s => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedSector(s.id)}
                                className={`${selectedSector === s.id ? 'font-bold border-b border-foreground' : 'text-neutral-400'}`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                    <AnimatePresence mode="popLayout">
                        {filteredTemplates.map((template, index) => (
                            <motion.div
                                layout
                                key={template.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
                                className="group"
                            >
                                <Link href={`/explore/${template.id}`} className="block">
                                    <div className="aspect-[4/5] bg-neutral-100/5 border border-foreground/10 overflow-hidden mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                        <img
                                            src={template.image}
                                            alt={template.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-display uppercase group-hover:italic transition-all">{template.title}</h3>
                                            <span className="text-[10px] uppercase tracking-widest font-body text-neutral-400">{template.type}</span>
                                        </div>
                                        <span className="text-sm font-body italic">{template.price}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bottom Narrative */}
                <div className="mt-48 py-32 border-t border-foreground text-center">
                    <p className="max-w-2xl mx-auto text-xl md:text-3xl italic font-display text-neutral-400 leading-tight mb-24">
                        "Each template is a starting point for a unique digital journey. We don't believe in generic; we believe in foundations for greatness."
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32">
                        <Link href="/investment" className="group inline-flex flex-col items-center">
                            <span className="text-xs uppercase tracking-[0.5em] font-body text-neutral-400 mb-6 group-hover:text-foreground transition-colors">Economic Models</span>
                            <h4 className="text-6xl md:text-[5vw] font-display uppercase leading-none hover:italic transition-all duration-700">
                                View <br /> <span className="text-neutral-200 group-hover:text-black transition-colors">Economy</span>
                            </h4>
                        </Link>

                        <Link href="/contact" className="group inline-flex flex-col items-center">
                            <span className="text-xs uppercase tracking-[0.5em] font-body text-neutral-400 mb-6 group-hover:text-foreground transition-colors">Vision Realization</span>
                            <h4 className="text-6xl md:text-[5vw] font-display uppercase leading-none hover:italic transition-all duration-700">
                                Start <br /> <span className="text-neutral-200 group-hover:text-black transition-colors">Dialogue</span>
                            </h4>
                        </Link>
                    </div>

                    <div className="mt-20 w-12 h-12 border border-foreground rounded-full flex items-center justify-center mx-auto opacity-20">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 19L19 1M19 1H1M19 1V19" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>
        </MinimalLayout>
    );
}
