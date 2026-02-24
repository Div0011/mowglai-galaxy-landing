"use client";

import { useEffect, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import FullScreenNav from "@/components/FullScreenNav";
import MobileNav from "@/components/MobileNav";
import SettingsToggle from "@/components/SettingsToggle";
import ContactToggle from "@/components/ContactToggle";

import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const JungleBackground = dynamic(() => import("@/components/JungleBackground"), { ssr: false });
const GalaxyBackground = dynamic(() => import("@/components/GalaxyBackground"), { ssr: false });
const BackToTopButton = dynamic(() => import("@/components/BackToTopButton"), { ssr: false });

interface PageLayoutProps {
    children: React.ReactNode;
}

const OriginalLayout = ({ children }: PageLayoutProps) => {
    const pathname = usePathname();

    // AOS is now initialized globally in AOSInit component linked in RootLayout



    return (
        <div className="min-h-screen relative text-foreground transition-colors duration-500">
            <SmoothScroll />
            <ScrollToTop />
            <BackToTopButton />
            <CustomCursor />
            <SettingsToggle />
            <ContactToggle />

            {/* Background - Spans entire page height */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <JungleBackground />
            </div>

            <FullScreenNav onOpenChat={() => { }} />
            <MobileNav />

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
