"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReferralModal from "./ReferralModal";

const STORAGE_KEY = "mowglai_referral_last_seen";
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

// Pixels scrolled before modal fires — just past the hero fold
const HERO_SCROLL_THRESHOLD = 100;
// Pixels scrolled before side tab appears
const SIDE_TAB_THRESHOLD = 150;

const ReferralBanner = () => {
    const [showButton, setShowButton] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const modalTriggered = React.useRef(false);
    const scrollTriggered = React.useRef(false);

    React.useEffect(() => {
        let rAF = 0;
        const handleScroll = () => {
            if (!rAF) {
                rAF = requestAnimationFrame(() => {
                    const scrollY = window.scrollY;

                    // --- Modal: fire once per session when user scrolls past hero fold ---
                    if (!modalTriggered.current && scrollY > HERO_SCROLL_THRESHOLD) {
                        modalTriggered.current = true;

                        const hasPopped = sessionStorage.getItem("mowglai_referral_popped");
                        if (!hasPopped) {
                            setIsModalOpen(true);
                            sessionStorage.setItem("mowglai_referral_popped", "true");
                        }
                    }

                    // --- Side tab: show/hide based on scroll ---
                    if (scrollY > SIDE_TAB_THRESHOLD) {
                        if (!scrollTriggered.current) {
                            scrollTriggered.current = true;
                            setShowButton(true);
                        }
                    } else {
                        if (scrollTriggered.current) {
                            scrollTriggered.current = false;
                            setShowButton(false);
                        }
                    }
                    rAF = 0;
                });
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rAF) cancelAnimationFrame(rAF);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {showButton && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed left-0 top-[35%] md:top-[40%] z-[80] flex items-center justify-center pointer-events-auto"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            aria-label="Claim 10-20% Discount"
                            className="[writing-mode:vertical-lr] rotate-180 bg-primary text-primary-foreground pl-[4px] pr-[2px] py-3 md:px-2.5 md:py-5 rounded-l-xl font-mono font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-[-4px_0_20px_rgba(var(--primary-rgb),0.4)] hover:bg-primary/95 transition-all duration-300 border-y border-l border-primary/30 flex items-center gap-1.5 md:gap-2 whitespace-nowrap cursor-pointer"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-ping shrink-0 inline-block" />
                            GET 10-20% DISCOUNT
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ReferralModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ReferralBanner;
