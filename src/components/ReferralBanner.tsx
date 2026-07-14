"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReferralModal from "./ReferralModal";

const ReferralBanner = () => {
    const [showButton, setShowButton] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const scrollTriggered = React.useRef(false);

    React.useEffect(() => {
        const handleScroll = () => {
            // Show persistently once scrolled down past the hero section (approx 600px)
            if (window.scrollY > 600) {
                if (!scrollTriggered.current) {
                    scrollTriggered.current = true;
                    setShowButton(true);
                }
            } else {
                // If they scroll back to the top of the hero section, we can hide it or keep it.
                // Keeping it once triggered or hiding it if they go back to top.
                // Usually, letting it hide when scrolling back to the very top (above hero) is cleaner.
                if (scrollTriggered.current) {
                    scrollTriggered.current = false;
                    setShowButton(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
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
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed left-0 top-[40%] z-50 flex items-center justify-center pointer-events-auto"
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="[writing-mode:vertical-lr] rotate-180 bg-primary text-primary-foreground px-2 py-4 md:px-2.5 md:py-5 rounded-l-xl font-mono font-bold uppercase tracking-widest text-[9px] md:text-[10px] shadow-[-4px_0_15px_rgba(var(--primary-rgb),0.3)] hover:bg-primary/95 transition-all duration-300 border-y border-l border-primary/20 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-ping shrink-0" />
                            REFER & EARN 20%
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ReferralModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ReferralBanner;
