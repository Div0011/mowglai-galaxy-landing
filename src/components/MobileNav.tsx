"use client";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, CurrencyType } from "@/context/CurrencyContext";

const MobileNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const { currency, setCurrency } = useCurrency();
    const [mobileCurrencyOpen, setMobileCurrencyOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleMenuToggle = (e: Event) => {
            const customEvent = e as CustomEvent<{ isOpen: boolean }>;
            setIsMenuOpen(customEvent.detail?.isOpen ?? false);
            if (customEvent.detail?.isOpen) {
                setMobileCurrencyOpen(false);
            }
        };
        window.addEventListener("menuToggle", handleMenuToggle);
        return () => window.removeEventListener("menuToggle", handleMenuToggle);
    }, []);

    // Only render floating controls on the pricing/investment page
    if (isMenuOpen || !pathname?.includes("/investment")) return null;

    return (
        <nav className="block md:hidden">
            {/* Mobile Floating Trigger Buttons */}
            <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] right-[calc(4.5rem+env(safe-area-inset-right))] z-[60] flex items-center gap-2">
                {/* Mobile Currency Selector */}
                <div className="relative">
                    <motion.button
                        onClick={() => setMobileCurrencyOpen(!mobileCurrencyOpen)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={cn(
                            "h-10 px-3 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-primary/20 shadow-lg font-mono text-[11px] font-bold tracking-wider",
                            resolvedTheme === "light"
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "bg-background/60 text-primary hover:bg-primary/10"
                        )}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Change Currency"
                    >
                        {currency}
                    </motion.button>
                    <AnimatePresence>
                        {mobileCurrencyOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 top-12 py-1.5 w-24 bg-background/95 backdrop-blur-xl border border-primary/25 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                            >
                                {(["USD", "INR", "EUR", "GBP"] as CurrencyType[]).map((cur) => (
                                    <button
                                        key={cur}
                                        onClick={() => {
                                            setCurrency(cur);
                                            setMobileCurrencyOpen(false);
                                        }}
                                        className={cn(
                                            "px-3 py-2 text-[10px] font-bold text-left hover:bg-primary hover:text-primary-foreground transition-colors font-mono uppercase",
                                            currency === cur ? "text-primary bg-primary/10 font-black" : "text-foreground/80"
                                        )}
                                    >
                                        {cur}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Shopping Cart Icon (when on investment) */}
                {pathname?.includes("/investment") && (
                    <motion.button
                        onClick={() => router.push("/investment?modal=purchases", { scroll: false })}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-primary/20 shadow-lg",
                            resolvedTheme === "light"
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "bg-background/60 text-primary hover:bg-primary/10"
                        )}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View Purchases"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                )}
            </div>
        </nav>
    );
};

export default MobileNav;
