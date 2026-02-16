import { Home, Users, Mail, DollarSign, Palette, LayoutGrid, Menu, X, Instagram, Linkedin, ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import XLogo from "@/components/icons/XLogo";

const navItems = [
    { icon: Home, label: "START", href: "/" },
    { icon: Users, label: "STORY", href: "/about" },
    { icon: Palette, label: "CRAFT", href: "/services" },
    { icon: LayoutGrid, label: "BLUEPRINT", href: "/explore" },
    { icon: DollarSign, label: "INVESTMENT", href: "/investment" },
    { icon: Mail, label: "HELLO", href: "/contact" },
];

const socialItems = [
    { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
    { icon: XLogo, href: "https://x.com/Mowglai_in", label: "X" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
];

const MobileNav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const [activeItem, setActiveItem] = useState("Home");
    const [isOpen, setIsOpen] = useState(false);

    // Sync active item with location
    useEffect(() => {
        const currentPath = pathname;
        const active = navItems.find(item => item.href === currentPath);
        if (active) setActiveItem(active.label);
    }, [pathname]);

    const handleClick = (e: React.MouseEvent, label: string, href: string) => {
        e.preventDefault();
        setActiveItem(label);
        setIsOpen(false);
        router.push(href);
    };

    // Close on Click Outside & Escape Key
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) setIsOpen(false);
        };

        const handleClickOutside = (e: MouseEvent) => {
            // Note: This logic changes slightly with full screen overlay.
            // But if we have a transparent part or if user clicks the button...
            // Actually, for full screen, usually the content covers everything.
            // We'll rely on the close button and link clicks primarily.
        };

        if (isOpen) {
            document.body.style.overflow = "hidden"; // Lock scroll
        } else {
            document.body.style.overflow = "";
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <nav
            ref={navRef}
            className="md:hidden z-50 block"
            aria-label="Mobile Navigation"
        >
            {/* Toggle Button - Fixed Top Right */}
            <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] right-[calc(0.875rem+env(safe-area-inset-right))] z-[60] flex flex-col items-center gap-4">
                <Magnetic>
                    <motion.button
                        layout
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-primary/20 shadow-lg",
                            isOpen
                                ? "bg-primary text-primary-foreground border-transparent"
                                : (resolvedTheme === 'light'
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "bg-background/40 text-primary hover:bg-primary/10")
                        )}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                </Magnetic>

                {/* Shopping Cart Icon - Only on Investment Page */}
                {pathname?.includes('/investment') && !isOpen && (
                    <motion.button
                        onClick={() => router.push('/investment?modal=purchases', { scroll: false })}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-primary/20 shadow-lg",
                            resolvedTheme === 'light'
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "bg-background/40 text-primary hover:bg-primary/10"
                        )}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                )}
            </div>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center"
                    >
                        {/* Background Decoration */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[100px]" />
                            <div className="absolute bottom-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-primary/5 rounded-full blur-[100px]" />
                        </div>

                        {/* Navigation Links */}
                        <div className="relative z-10 flex flex-col items-center w-full px-6">
                            {/* Navigation Links - Centered Block with Left Aligned Items */}
                            <div className="flex flex-col items-start gap-4 w-fit mx-auto">
                                {navItems.map((item, i) => {
                                    const isActive = activeItem === item.label;
                                    return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            onClick={(e) => handleClick(e, item.label, item.href)}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ delay: 0.1 + (i * 0.05), duration: 0.5, ease: "easeOut" }}
                                            className={cn(
                                                "flex items-center gap-4 group",
                                                isActive ? "text-primary" : "text-foreground/60"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-3 rounded-full transition-all duration-300",
                                                isActive ? "bg-primary text-primary-foreground" : "bg-primary/5 text-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
                                            )}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <span className={cn(
                                                "text-3xl font-display font-bold uppercase transition-all duration-300 leading-relaxed py-1",
                                                isActive ? "translate-x-2" : "group-hover:translate-x-2 group-hover:text-primary"
                                            )}>
                                                {item.label}
                                            </span>
                                        </motion.a>
                                    );
                                })}
                            </div>

                            {/* Social Links - Separated & Centered */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                                className="flex items-center justify-center gap-6 w-full max-w-xs mt-12"
                            >
                                {socialItems.map((item, i) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-full bg-primary/5 text-primary/40 border border-primary/10 hover:bg-primary/10 hover:text-primary hover:scale-110 transition-all duration-300 group"
                                    >
                                        <item.icon className="w-6 h-6" />
                                    </a>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default MobileNav;
