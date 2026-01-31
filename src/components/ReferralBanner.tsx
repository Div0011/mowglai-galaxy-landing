import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReferralModal from "./ReferralModal";

const ReferralBanner = () => {
    const [status, setStatus] = React.useState<"idle" | "banner" | "exiting" | "button">("idle");
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const hasTriggeredRef = React.useRef(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200 && !hasTriggeredRef.current) {
                hasTriggeredRef.current = true;
                setStatus("banner");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Sequence Logic
    React.useEffect(() => {
        if (status === "banner") {
            const timer = setTimeout(() => {
                setStatus("exiting");
            }, 2500); // Show for 2.5s
            return () => clearTimeout(timer);
        }
        if (status === "exiting") {
            const timer = setTimeout(() => {
                setStatus("button");
            }, 800); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <>
            <AnimatePresence mode="wait">
                {/* Initial Scrolling Banner */}
                {status === "banner" && (
                    <motion.div
                        key="banner"
                        initial={{ opacity: 0, x: "-50%", y: -50 }}
                        animate={{ opacity: 1, x: "-50%", y: 0 }}
                        exit={{ opacity: 0, x: "100vw", transition: { duration: 0.8, ease: "easeInOut" } }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                        className="fixed top-6 left-1/2 z-50 pointer-events-none"
                        style={{ translateX: "-50%" }}
                    >
                        <div className="bg-primary/90 text-background px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm shadow-xl backdrop-blur-md border border-primary/20 whitespace-nowrap">
                            Refer a client & get 10% COMMISSION!
                        </div>
                    </motion.div>
                )}

                {/* Persistent Button (appears after banner leaves) */}
                {status === "button" && (
                    <motion.div
                        key="button"
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        className="fixed top-6 left-1/2 z-50"
                        style={{ translateX: "-50%" }}
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:scale-105 active:scale-95 transition-all duration-300 border border-primary/20 animate-pulse"
                        >
                            CLICK HERE TO REFER
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ReferralModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default ReferralBanner;
