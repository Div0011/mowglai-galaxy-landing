import { useEffect, Suspense } from "react";
import GalaxyBackground from "@/components/GalaxyBackground";
import FullScreenNav from "@/components/FullScreenNav";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import ScrollToTop from "./ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import JungleBackground from "@/components/JungleBackground";

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    const location = useLocation();

    useEffect(() => {
        // Initialize AOS
        import("aos").then((AOS) => {
            AOS.init({
                duration: 1000,
                once: false,
                mirror: true,
            });
        });
    }, []);

    return (
        <div className="min-h-screen relative text-foreground transition-colors duration-500">
            <ScrollToTop />
            <CustomCursor />
            <ThemeToggle />

            {/* Background - Spans entire page height */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <JungleBackground />
            </div>

            <FullScreenNav />
            <MobileNav />

            <main className="relative z-10 w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
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

export default PageLayout;
