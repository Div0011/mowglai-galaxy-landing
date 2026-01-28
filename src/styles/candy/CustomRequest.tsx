"use client";

import CandyLayout from "./Layout";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, ArrowRight, ArrowLeft, Send, Check, Rocket, Layout, Bot, DollarSign } from "lucide-react";

const steps = [
    { title: "Core", label: "PHASE_INITIAL", icon: Sparkles, color: "#6ca2fb" },
    { title: "Visuals", label: "CHROMATIC_SPEC", icon: Layout, color: "#ee5781" },
    { title: "Logic", label: "NEURAL_FLOW", icon: Bot, color: "#ffd447" },
    { title: "Orbit", label: "VALUATION", icon: DollarSign, color: "#66bcb4" }
];

export default function CandyCustomRequest() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => setStep(s => Math.min(steps.length, s + 1));
    const prevStep = () => setStep(s => Math.max(1, s - 1));

    if (isSubmitted) {
        return (
            <CandyLayout>
                <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-8">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-40 h-40 bg-[#66bcb4] rounded-[3rem] shadow-2xl flex items-center justify-center text-white mb-12"
                    >
                        <Check size={80} strokeWidth={3} />
                    </motion.div>
                    <h1 className="text-7xl font-display font-black uppercase italic mb-6">TRANSMITTED</h1>
                    <p className="text-2xl font-body font-bold text-black/40 italic max-w-lg mx-auto">
                        Your vision has been synthesized. Our pulse core will reply shortly.
                    </p>
                </div>
            </CandyLayout>
        );
    }

    return (
        <CandyLayout>
            <div className="relative pt-48 pb-32 px-8 overflow-hidden">

                {/* HERO */}
                <section className="container mx-auto mb-20 relative z-10 text-center">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-[10vw] md:text-[8vw] font-display font-black leading-[0.8] tracking-tighter uppercase italic mb-8"
                    >
                        <span className="text-black/10">Custom</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6ca2fb] via-[#ee5781] to-[#ffd447]">Mutation</span>
                    </motion.h1>
                    <p className="text-2xl font-body font-bold text-black/40 italic max-w-2xl mx-auto">
                        Architecting a unique chromatic entity specifically for your brand ecosystem.
                    </p>
                </section>

                {/* STEP INDICATOR */}
                <section className="container mx-auto mb-20 relative z-10 flex justify-center gap-4">
                    {steps.map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-4">
                            <motion.div
                                animate={{
                                    scale: step === i + 1 ? 1.2 : 1,
                                    backgroundColor: step >= i + 1 ? s.color : "rgba(255,255,255,0.6)"
                                }}
                                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white transition-colors`}
                            >
                                <s.icon className={step >= i + 1 ? "text-white" : "text-black/20"} size={24} />
                            </motion.div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= i + 1 ? "text-black/80" : "text-black/20"}`}>
                                {s.title}
                            </span>
                        </div>
                    ))}
                </section>

                {/* FORM BOX */}
                <section className="container mx-auto max-w-4xl relative z-10">
                    <div className="p-12 md:p-20 bg-white/60 backdrop-blur-3xl rounded-[5rem] border-8 border-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#ffd447]/10 to-transparent rounded-full blur-[80px]" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                className="space-y-12"
                            >
                                {step === 1 && (
                                    <div className="space-y-8">
                                        <h3 className="text-4xl font-display font-black uppercase italic text-black/80">01_IDENTIFICATION</h3>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 ml-4">Full Identity</label>
                                            <input type="text" placeholder="NAME OF YOUR ENTITY?" className="w-full bg-white/50 border-4 border-white rounded-[2rem] px-8 py-6 text-xl font-black uppercase italic outline-none focus:border-[#6ca2fb] transition-all" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 ml-4">Frequency</label>
                                            <input type="email" placeholder="WHERE DO WE REPLY?" className="w-full bg-white/50 border-4 border-white rounded-[2rem] px-8 py-6 text-xl font-black uppercase italic outline-none focus:border-[#6ca2fb] transition-all" />
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-8">
                                        <h3 className="text-4xl font-display font-black uppercase italic text-black/80">02_AESTHETICS</h3>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 ml-4">Surface Texture</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Glassmorphism', 'Neubrutalism', 'Minimalism', 'Prismatic'].map(t => (
                                                    <button key={t} className="px-8 py-6 bg-white/50 border-4 border-white rounded-[2rem] text-sm font-black uppercase tracking-widest hover:border-[#ee5781] transition-all">
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-8">
                                        <h3 className="text-4xl font-display font-black uppercase italic text-black/80">03_INTERNAL_LOGIC</h3>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 ml-4">Required Synapses</label>
                                            <textarea rows={4} placeholder="WHAT SHOULD IT DO?" className="w-full bg-white/50 border-4 border-white rounded-[3rem] px-8 py-8 text-xl font-black uppercase italic outline-none focus:border-[#ffd447] transition-all resize-none" />
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-8">
                                        <h3 className="text-4xl font-display font-black uppercase italic text-black/80">04_FUEL_CAPACITY</h3>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 ml-4">Estimated Capital</label>
                                            <select className="w-full bg-white/50 border-4 border-white rounded-[2rem] px-8 py-6 text-xl font-black uppercase italic outline-none focus:border-[#66bcb4] transition-all appearance-none cursor-pointer">
                                                <option>$5,000 - $10,000</option>
                                                <option>$10,000 - $25,000</option>
                                                <option>$25,000 - $50,000</option>
                                                <option>$50,000 +</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {/* NAV BUTTONS */}
                        <div className="mt-16 flex items-center justify-between relative z-10">
                            <button
                                onClick={prevStep}
                                disabled={step === 1}
                                className={`flex items-center gap-4 px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0' : 'bg-black/5 text-black hover:bg-black/10'}`}
                            >
                                <ArrowLeft size={20} /> Back
                            </button>

                            {step < steps.length ? (
                                <button
                                    onClick={nextStep}
                                    className="flex items-center gap-6 px-12 py-6 bg-black text-white rounded-[2rem] text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
                                >
                                    Next Phase <ArrowRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsSubmitted(true)}
                                    className="flex items-center gap-6 px-12 py-6 bg-[#ee5781] text-white rounded-[2rem] text-sm font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl border-b-8 border-black/20"
                                >
                                    LAUNCH MUTATION <Send size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </CandyLayout>
    );
}

// Wrapper fix
function CandyCustomRequestWrapper({ children }: { children: React.ReactNode }) {
    return (
        <CandyLayout>
            {children}
        </CandyLayout>
    );
}
