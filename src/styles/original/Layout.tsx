"use client";

import { useEffect, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import FullScreenNav from "@/components/FullScreenNav";
import MobileNav from "@/components/MobileNav";
import SettingsToggle from "@/components/SettingsToggle";
import { Bot } from "lucide-react";

import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ChatbotModal = dynamic(() => import("@/components/ChatbotModal"), { ssr: false });
const JungleBackground = dynamic(() => import("@/components/JungleBackground"), { ssr: false });
const GalaxyBackground = dynamic(() => import("@/components/GalaxyBackground"), { ssr: false });
const BackToTopButton = dynamic(() => import("@/components/BackToTopButton"), { ssr: false });

interface PageLayoutProps {
    children: React.ReactNode;
}

const OriginalLayout = ({ children }: PageLayoutProps) => {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);

    // AOS is now initialized globally in AOSInit component linked in RootLayout

    const { resolvedTheme } = useTheme();

    return (
        <div className="min-h-screen relative text-foreground transition-colors duration-500">
            <SmoothScroll />
            <ScrollToTop />
            <BackToTopButton />
            <CustomCursor />
            <SettingsToggle />

            {/* Background - Spans entire page height */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <JungleBackground />
            </div>

            <FullScreenNav onOpenChat={() => setIsChatOpen(true)} />
            <MobileNav />

            {/* Permanent Chatbot Trigger - Bottom Right */}
            <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(0.875rem+env(safe-area-inset-right))] md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:right-[calc(2rem+env(safe-area-inset-right))] z-[60]">
                <button
                    onClick={() => setIsChatOpen(true)}
                    className={cn(
                        "relative group w-14 h-14 md:w-16 md:h-16 rounded-full border border-primary/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] backdrop-blur-md",
                        resolvedTheme === "light"
                            ? "bg-primary/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                    aria-label="Open AI Assistant"
                >
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20 group-hover:opacity-40" />
                    <Bot className="w-5 h-5 md:w-6 md:h-6 z-10" />
                </button>
            </div>

            <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

            <main className="relative z-10 w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="gpu-accelerate"
                    >
                        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-primary font-display animate-pulse">Loading Content...</div>}>
                            {children}
                            <Footer />
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default OriginalLayout;
