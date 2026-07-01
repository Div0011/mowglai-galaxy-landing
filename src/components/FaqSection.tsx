"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

const faqItems: FaqItem[] = [
    {
        id: 1,
        question: "What makes Mowglai different from other agencies?",
        answer: "We blend technical excellence with creative storytelling. Our team operates across multiple time zones, delivering world-class quality with the flexibility to match your unique vision. Every project is a collaboration, not just a service."
    },
    {
        id: 2,
        question: "How do we communicate during a project?",
        answer: "We provide dedicated communication channels with weekly sync calls, real-time updates via Slack/Discord, and milestone previews. Our workflow adapts to your schedule—Monday through Saturday across global time zones."
    },
    {
        id: 3,
        question: "What is your typical project timeline?",
        answer: "Most projects span 4-8 weeks depending on complexity. We work in agile sprints with continuous client feedback loops. MVPs can be delivered in 2-3 weeks, while full-scale applications take 2-3 months."
    },
    {
        id: 4,
        question: "Do you provide ongoing maintenance and support?",
        answer: "Yes, we offer comprehensive post-launch support including bug fixes, performance optimization, and feature updates. Our survival package ensures your digital ecosystem adapts and grows with your needs."
    },
    {
        id: 5,
        question: "What technologies do you specialize in?",
        answer: "We're experts in React, Next.js, TypeScript, Three.js for 3D experiences, GSAP for animations, Tailwind CSS, and modern web architecture. We stay ahead of the curve with cutting-edge tools and frameworks."
    }
];

export default function FaqSection() {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <div className="space-y-4">
            {faqItems.map((item) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.id * 0.1 }}
                    className="border border-primary/20 rounded-2xl bg-background/50 backdrop-blur-sm overflow-hidden"
                >
                    <button
                        onClick={() => setOpenId(openId === item.id ? null : item.id)}
                        className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-primary/5 transition-colors duration-300"
                    >
                        <h3 className="text-lg md:text-xl font-display font-bold text-foreground pr-4">
                            {item.question}
                        </h3>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                            <AnimatePresence>
                                {openId === item.id ? (
                                    <Minus className="w-5 h-5 text-primary" />
                                ) : (
                                    <Plus className="w-5 h-5 text-primary" />
                                )}
                            </AnimatePresence>
                        </div>
                    </button>

                    <AnimatePresence>
                        {openId === item.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-primary/10">
                                    <p className="mt-4 text-foreground/70 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}