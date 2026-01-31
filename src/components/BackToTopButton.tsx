"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import { cn } from "@/lib/utils";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className={cn(
            "fixed z-[60] transition-all duration-500 transform",
            // Positioned vertically above the Contact Toggle on the right
            "bottom-[calc(5rem+env(safe-area-inset-bottom))] right-[calc(0.875rem+env(safe-area-inset-right))]",
            "md:bottom-[calc(7rem+env(safe-area-inset-bottom))] md:right-[calc(2rem+env(safe-area-inset-right))]",
            isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50 pointer-events-none"
        )}>
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative group w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] backdrop-blur-md border border-white/20"
                aria-label="Back to Top"
            >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 group-hover:opacity-40" />
                <ArrowUp className="w-7 h-7 md:w-8 md:h-8 z-10" />
            </motion.button>
        </div>
    );
};

export default BackToTopButton;
