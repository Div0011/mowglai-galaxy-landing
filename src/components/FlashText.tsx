"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const FlashText = () => {
    return (
        <div className="w-full min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center overflow-hidden relative py-12 md:py-20 gap-8 bg-background/50 backdrop-blur-sm border-y border-primary/5">
            {/* Continuous Trail Above Button - Made bold and visible */}
            <div className="w-full overflow-hidden absolute top-12 md:top-20 left-0 flex items-center pointer-events-none opacity-40">
                <motion.div
                    className="whitespace-nowrap font-display font-black text-4xl sm:text-5xl md:text-7xl uppercase italic tracking-tighter text-primary"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    REFER AND EARN 10% OFF • REFER AND EARN 10% OFF • REFER AND EARN 10% OFF • REFER AND EARN 10% OFF •
                </motion.div>
            </div>

            {/* Referral Button - Centered and prominent */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 mt-20 md:mt-28"
            >
                <Link
                    href="/referral"
                    className="group relative block px-8 py-5 md:px-12 md:py-6 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-xs sm:text-sm md:text-lg rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden text-center"
                >
                    <span className="relative z-10">CLICK HERE TO REFER</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <p className="text-[10px] md:text-xs text-center mt-3 md:mt-4 uppercase tracking-widest opacity-60">
                    Get 10% off for you & a friend
                </p>
            </motion.div>
        </div>
    );
};

export default FlashText;
