"use client";

import { useState, useEffect } from "react";
import {
    Home,
    Users,
    Mail,
    DollarSign,
    Menu,
    X,
    Instagram,
    Linkedin,
    Layers,
    LayoutTemplate,
    CreditCard,
    Bot,
    Palette,
    Code2,
    ShoppingCart,
    RefreshCw,
    Database,
    Globe,
    ArrowRight,
    ArrowLeft,
    ChevronRight,
    Sparkles,
    ShieldCheck,
    Crown,
    Cpu,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import MowglaiLogo from "@/components/MowglaiLogo";
import { useTheme } from "next-themes";
import XLogo from "@/components/icons/XLogo";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
    hasSubmenu?: boolean;
}

const navItems: NavItem[] = [
    { icon: Home, label: "HOME", href: "/" },
    { icon: Users, label: "ABOUT", href: "/about" },
    { icon: Layers, label: "SERVICES", href: "/services", hasSubmenu: true },
    { icon: LayoutTemplate, label: "TEMPLATES", href: "/explore" },
    { icon: DollarSign, label: "PRICING", href: "/investment", hasSubmenu: true },
    { icon: Mail, label: "CONTACT", href: "/contact" },
];

const serviceSubItems = [
    { num: "01", title: "Intelligent Systems & AI", href: "/services/intelligent-systems", icon: Bot },
    { num: "02", title: "Aesthetic Web Design", href: "/services/web-design", icon: Palette },
    { num: "03", title: "Robust Engineering & Dev", href: "/services/web-development", icon: Code2 },
    { num: "04", title: "Online Store Architecture", href: "/services/ecommerce", icon: ShoppingCart },
    { num: "05", title: "Digital Evolution & Redesign", href: "/services/website-redesign", icon: RefreshCw },
    { num: "06", title: "Database Solutions", href: "/services/database-solutions", icon: Database },
    { num: "07", title: "Global Digital Strategy", href: "/services/digital-strategy", icon: Globe },
];

const pricingSubItems = [
    { num: "01", title: "Standard Website Plans", href: "/investment?type=standard", icon: LayoutTemplate },
    { num: "02", title: "Mowglai Care (Monthly)", href: "/investment?type=care", icon: Sparkles },
    { num: "03", title: "Systems & Architecture", href: "/investment?type=systems", icon: Cpu },
    { num: "04", title: "Addons & Feature Sprints", href: "/investment?type=addons", icon: Zap },
    { num: "05", title: "Premium Apex Tier", href: "/investment?type=premium", icon: Crown },
    { num: "06", title: "Store & Commerce", href: "/investment?type=store", icon: ShoppingCart },
];

interface FullScreenNavProps {
    isDark?: boolean;
    onToggleTheme?: () => void;
    onOpenChat: () => void;
}

const FullScreenNav = ({ onOpenChat }: FullScreenNavProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [mobileView, setMobileView] = useState<"main" | "services" | "pricing">("main");
    const router = useRouter();
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const event = new CustomEvent("menuToggle", { detail: { isOpen } });
        window.dispatchEvent(event);
        const win = typeof window !== "undefined" ? (window as unknown as { __lenis?: { start: () => void; stop: () => void } }) : null;
        if (isOpen) {
            document.body.classList.add("menu-open");
            win?.__lenis?.stop();
        } else {
            document.body.classList.remove("menu-open");
            win?.__lenis?.start();
        }
        return () => {
            document.body.classList.remove("menu-open");
            win?.__lenis?.start();
        };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isLogoActive = isOpen || !scrolled;
    const showStrips = !isOpen && !scrolled && pathname === "/";

    useEffect(() => {
        const cls = "mowglai-strips-visible";
        if (showStrips) document.documentElement.classList.add(cls);
        else document.documentElement.classList.remove(cls);
        return () => {
            document.documentElement.classList.remove(cls);
        };
    }, [showStrips]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (e: React.MouseEvent, label: string, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        router.push(href);
    };

    const handleSubmenuClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        router.push(href);
    };

    return (
        <>
            {/* Decorative marquee strips */}
            <div
                className={cn(
                    "fixed z-[50] pointer-events-none bottom-[8vh] md:bottom-auto md:top-[calc(2.3rem+env(safe-area-inset-top))] -left-[20%] md:left-0 w-[140%] md:w-auto md:right-0 -rotate-12 md:rotate-0 origin-center transition-all duration-500 mowglai-strip",
                    !showStrips && "opacity-0 pointer-events-none !hidden"
                )}
            >
                <div className="relative left-0 right-0 w-full h-[20px] md:h-[36px] overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundColor: "rgba(212,175,55,0.8)" }} />
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                        <div className="min-w-[200%] whitespace-nowrap animate-marquee-hr-continuous flex gap-8">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <span key={i} className="text-black font-bold uppercase tracking-wider text-[11px] md:text-sm">
                                    FREE HOSTING FOR NEW BUSINESSES (CONDITIONS APPLY)
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "fixed z-[49] pointer-events-none bottom-[8vh] md:bottom-[calc(2.2rem+env(safe-area-inset-bottom))] -left-[20%] md:left-0 w-[140%] md:w-auto md:right-0 rotate-12 md:rotate-0 origin-center transition-all duration-500 mowglai-strip",
                    !showStrips && "opacity-0 pointer-events-none !hidden"
                )}
            >
                <div className="relative left-0 right-0 w-full h-[20px] md:h-[36px] overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundColor: "rgba(180,140,40,0.75)" }} />
                    <div className="absolute inset-0 flex items-center pointer-events-none">
                        <div className="min-w-[200%] whitespace-nowrap animate-marquee-hr-continuous-slow flex gap-8">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <span key={i} className="text-black font-bold uppercase tracking-wider text-[11px] md:text-sm">
                                    FREE HOSTING FOR NEW BUSINESSES (CONDITIONS APPLY)
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hamburger Button - Fixed Top Right */}
            <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] right-[calc(1.1rem+env(safe-area-inset-right))] md:top-[calc(2rem+env(safe-area-inset-top))] md:right-[calc(2rem+env(safe-area-inset-right))] z-[60]">
                <Magnetic>
                    <button
                        onClick={toggleMenu}
                        className={cn(
                            "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 group backdrop-blur-sm",
                            resolvedTheme === "light"
                                ? "bg-primary/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary"
                                : "bg-background/5 text-primary hover:bg-primary/10 hover:border-primary/20"
                        )}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                        ) : (
                            <Menu className="w-5 h-5 md:w-6 md:h-6" />
                        )}
                    </button>
                </Magnetic>
            </div>

            {/* Logo - Fixed Top Left */}
            <div
                className="fixed top-[calc(1rem+env(safe-area-inset-top))] left-[calc(0.875rem+env(safe-area-inset-left))] md:top-[calc(2rem+env(safe-area-inset-top))] md:left-[calc(2rem+env(safe-area-inset-left))] z-[60]"
                onMouseEnter={() => setHoveredItem("LOGO")}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <Magnetic amount={0.4}>
                    <div
                        className={cn(
                            "cursor-pointer group/logo transition-all duration-700 flex items-center",
                            isLogoActive || hoveredItem === "LOGO" ? "opacity-100 blur-0" : "opacity-30 blur-[4px]"
                        )}
                        onClick={() => router.push("/")}
                    >
                        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 shrink-0">
                            <MowglaiLogo
                                size="lg"
                                className="w-14 h-14 md:w-16 md:h-16 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all duration-500"
                            />
                        </div>
                        <span className="font-display font-black text-xl md:text-2xl tracking-[0.35em] text-primary uppercase opacity-0 max-w-0 overflow-hidden ml-0 group-hover/logo:opacity-100 group-hover/logo:max-w-[200px] group-hover/logo:ml-4 transition-all duration-500 ease-out select-none whitespace-nowrap">
                            MOWGLAI
                        </span>
                    </div>
                </Magnetic>
            </div>

            {/* Full Screen Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[55] bg-background backdrop-blur-3xl transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-50 pointer-events-none"
                )}
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

                {/* Main Layout Flex Container */}
                <div className="absolute inset-0 flex w-full h-full">
                    {/* Desktop Navigation Columns (90% Width) */}
                    <nav className="hidden md:flex w-[90%] h-full">
                        {navItems.map((item) => {
                            const isHovered = hoveredItem === item.label;

                            return (
                                <div
                                    key={item.label}
                                    className={cn(
                                        "h-full relative group/col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center justify-center p-4",
                                        isHovered ? "flex-[1.8] bg-primary/5" : "flex-1 hover:bg-primary/5"
                                    )}
                                    onMouseEnter={() => setHoveredItem(item.label)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {/* Light Saber Divider */}
                                    <div
                                        className={cn(
                                            "absolute top-0 right-0 w-[1px] h-full transition-all duration-500",
                                            "bg-gradient-to-b from-transparent via-primary/20 to-transparent",
                                            isHovered ? "w-[2px] bg-primary shadow-[0_0_15px_rgba(34,197,94,0.4)]" : ""
                                        )}
                                    />

                                    {/* Main Vertical Column Link */}
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleClick(e, item.label, item.href)}
                                        className="flex flex-col items-center gap-6 text-center transition-all duration-300 cursor-pointer select-none py-4 z-10"
                                    >
                                        <item.icon
                                            className={cn(
                                                "w-10 h-10 mb-6 transition-all duration-500 transform -translate-y-4 group-hover/col:translate-y-0 opacity-0 group-hover/col:opacity-100",
                                                isHovered
                                                    ? resolvedTheme === "light"
                                                        ? "text-primary-foreground drop-shadow-[0_0_8px_rgba(20,83,45,0.4)]"
                                                        : "text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                                    : "text-primary/40"
                                            )}
                                        />

                                        <Magnetic amount={0.3}>
                                            <span
                                                className={cn(
                                                    "text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display font-black uppercase break-words max-w-full [writing-mode:vertical-rl] rotate-180 inline-block leading-loose py-4 px-4",
                                                    isHovered
                                                        ? resolvedTheme === "light"
                                                            ? "text-primary-foreground drop-shadow-[0_0_10px_rgba(20,83,45,0.3)]"
                                                            : "text-transparent bg-clip-text bg-gradient-to-b from-primary via-accent to-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                                                        : "text-primary/30"
                                                )}
                                            >
                                                {item.label}
                                            </span>
                                        </Magnetic>
                                    </a>

                                    {/* Aesthetic Side-Out Submenu for SERVICES */}
                                    {item.label === "SERVICES" && (
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -25, scale: 0.96 }}
                                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                                    exit={{ opacity: 0, x: -15, scale: 0.96 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                    className="absolute left-[85%] top-1/2 -translate-y-1/2 z-50 w-[350px] lg:w-[380px] rounded-[2rem] bg-background/95 border border-primary/25 backdrop-blur-3xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(var(--primary-rgb),0.2)] pointer-events-auto"
                                                >
                                                    <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-primary/15">
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                                                            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-primary">
                                                                Our 7 Services
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        {serviceSubItems.map((sub) => {
                                                            const SubIcon = sub.icon;
                                                            return (
                                                                <a
                                                                    key={sub.num}
                                                                    href={sub.href}
                                                                    onClick={(e) => handleSubmenuClick(e, sub.href)}
                                                                    className="group/sub flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <SubIcon className="w-4.5 h-4.5 text-primary shrink-0 transition-transform duration-200 group-hover/sub:scale-110" />
                                                                        <span className="text-sm sm:text-[15px] font-display font-bold uppercase tracking-wider text-foreground group-hover/sub:text-primary transition-colors">
                                                                            {sub.num}. {sub.title}
                                                                        </span>
                                                                    </div>
                                                                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all shrink-0 ml-2" />
                                                                </a>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="pt-2.5 mt-2.5 border-t border-primary/10 text-center">
                                                        <a
                                                            href="/services"
                                                            onClick={(e) => handleSubmenuClick(e, "/services")}
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-primary uppercase tracking-widest hover:text-foreground transition-colors"
                                                        >
                                                            All Services Overview <ArrowRight className="w-3.5 h-3.5" />
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}

                                    {/* Aesthetic Side-Out Submenu for PRICING */}
                                    {item.label === "PRICING" && (
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -25, scale: 0.96 }}
                                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                                    exit={{ opacity: 0, x: -15, scale: 0.96 }}
                                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                                    className="absolute left-[85%] top-1/2 -translate-y-1/2 z-50 w-[350px] lg:w-[380px] rounded-[2rem] bg-background/95 border border-primary/25 backdrop-blur-3xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(var(--primary-rgb),0.2)] pointer-events-auto"
                                                >
                                                    <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-primary/15">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="w-4 h-4 text-primary animate-pulse" />
                                                            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-primary">
                                                                Pricing & Plans
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        {pricingSubItems.map((sub) => {
                                                            const SubIcon = sub.icon;
                                                            return (
                                                                <a
                                                                    key={sub.num}
                                                                    href={sub.href}
                                                                    onClick={(e) => handleSubmenuClick(e, sub.href)}
                                                                    className="group/sub flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all duration-200"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <SubIcon className="w-4.5 h-4.5 text-primary shrink-0 transition-transform duration-200 group-hover/sub:scale-110" />
                                                                        <span className="text-sm sm:text-[15px] font-display font-bold uppercase tracking-wider text-foreground group-hover/sub:text-primary transition-colors">
                                                                            {sub.title}
                                                                        </span>
                                                                    </div>
                                                                    <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all shrink-0 ml-2" />
                                                                </a>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="pt-2.5 mt-2.5 border-t border-primary/10 text-center">
                                                        <a
                                                            href="/investment"
                                                            onClick={(e) => handleSubmenuClick(e, "/investment")}
                                                            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-primary uppercase tracking-widest hover:text-foreground transition-colors"
                                                        >
                                                            Open Full Pricing Matrix <ArrowRight className="w-3.5 h-3.5" />
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Mobile Navigation (Drill-Down Stack with Back Button) */}
                    <nav className="flex md:hidden flex-col justify-start items-center w-full h-full pt-20 pb-28 px-5 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {mobileView === "main" && (
                                <motion.div
                                    key="main"
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.22, ease: "easeOut" }}
                                    className="w-full max-w-sm flex flex-col items-center space-y-3.5 my-auto"
                                >
                                    {navItems.map((item) => (
                                        <div key={item.label} className="w-full">
                                            {item.hasSubmenu ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setMobileView(item.label.toLowerCase() as "services" | "pricing")}
                                                    className={cn(
                                                        "flex items-center justify-between w-full py-2.5 px-4 rounded-2xl bg-secondary/10 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 active:scale-[0.98] transition-all duration-200 group cursor-pointer",
                                                        pathname.startsWith(item.href) && "border-primary/40 bg-primary/10"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3.5">
                                                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                                            <item.icon className="w-5 h-5" />
                                                        </div>
                                                        <span className="text-2xl font-display font-black tracking-[0.2em] text-foreground uppercase group-hover:text-primary transition-colors">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-primary text-xs font-mono font-bold">
                                                        <span>EXPLORE</span>
                                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </button>
                                            ) : (
                                                <a
                                                    href={item.href}
                                                    onClick={(e) => handleClick(e, item.label, item.href)}
                                                    className={cn(
                                                        "flex items-center gap-3.5 w-full py-2.5 px-4 rounded-2xl transition-all duration-200 uppercase cursor-pointer select-none group",
                                                        pathname === item.href
                                                            ? "text-primary bg-primary/10 border border-primary/30"
                                                            : "text-foreground/80 hover:text-primary hover:bg-primary/5 border border-transparent"
                                                    )}
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-2xl font-display font-black tracking-[0.2em]">
                                                        {item.label}
                                                    </span>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {mobileView === "services" && (
                                <motion.div
                                    key="services"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.22, ease: "easeOut" }}
                                    className="w-full max-w-sm flex flex-col space-y-2.5"
                                >
                                    {/* Back Button Header */}
                                    <div className="flex items-center justify-between pb-3 mb-1 border-b border-primary/20">
                                        <button
                                            type="button"
                                            onClick={() => setMobileView("main")}
                                            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors py-1.5 px-3 rounded-full bg-primary/10 border border-primary/20 active:scale-95"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5" />
                                            <span>Back to Menu</span>
                                        </button>
                                        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest font-semibold">
                                            07 Services
                                        </span>
                                    </div>

                                    {/* Service Items */}
                                    <div className="space-y-2 max-h-[58vh] overflow-y-auto pr-1">
                                        {serviceSubItems.map((sub) => {
                                            const SubIcon = sub.icon;
                                            return (
                                                <a
                                                    key={sub.num}
                                                    href={sub.href}
                                                    onClick={(e) => handleSubmenuClick(e, sub.href)}
                                                    className="flex items-center justify-between p-3 rounded-2xl bg-secondary/10 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 active:scale-[0.98] transition-all duration-200 group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <SubIcon className="w-4.5 h-4.5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                                                        <span className="text-sm font-display font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                                                            {sub.num}. {sub.title}
                                                        </span>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-primary shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                                </a>
                                            );
                                        })}
                                    </div>

                                    {/* View All Services */}
                                    <div className="pt-2 border-t border-primary/15">
                                        <a
                                            href="/services"
                                            onClick={(e) => handleSubmenuClick(e, "/services")}
                                            className="w-full py-2.5 text-center rounded-xl bg-primary/10 border border-primary/20 text-xs font-mono font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
                                        >
                                            All Services Overview <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </motion.div>
                            )}

                            {mobileView === "pricing" && (
                                <motion.div
                                    key="pricing"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.22, ease: "easeOut" }}
                                    className="w-full max-w-sm flex flex-col space-y-2.5"
                                >
                                    {/* Back Button Header */}
                                    <div className="flex items-center justify-between pb-3 mb-1 border-b border-primary/20">
                                        <button
                                            type="button"
                                            onClick={() => setMobileView("main")}
                                            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors py-1.5 px-3 rounded-full bg-primary/10 border border-primary/20 active:scale-95"
                                        >
                                            <ArrowLeft className="w-3.5 h-3.5" />
                                            <span>Back to Menu</span>
                                        </button>
                                        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest font-semibold">
                                            Pricing Matrix
                                        </span>
                                    </div>

                                    {/* Pricing Tier Items */}
                                    <div className="space-y-2 max-h-[58vh] overflow-y-auto pr-1">
                                        {pricingSubItems.map((sub) => {
                                            const SubIcon = sub.icon;
                                            return (
                                                <a
                                                    key={sub.num}
                                                    href={sub.href}
                                                    onClick={(e) => handleSubmenuClick(e, sub.href)}
                                                    className="flex items-center justify-between p-3 rounded-2xl bg-secondary/10 border border-primary/15 hover:border-primary/40 hover:bg-primary/10 active:scale-[0.98] transition-all duration-200 group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <SubIcon className="w-4.5 h-4.5 text-primary shrink-0 transition-transform group-hover:scale-110" />
                                                        <span className="text-sm font-display font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                                                            {sub.title}
                                                        </span>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-primary shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                                </a>
                                            );
                                        })}
                                    </div>

                                    {/* View Full Matrix */}
                                    <div className="pt-2 border-t border-primary/15">
                                        <a
                                            href="/investment"
                                            onClick={(e) => handleSubmenuClick(e, "/investment")}
                                            className="w-full py-2.5 text-center rounded-xl bg-primary/10 border border-primary/20 text-xs font-mono font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
                                        >
                                            Open Full Pricing Matrix <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </nav>

                    {/* Mobile Social Icons (Bottom Row) */}
                    <div className="absolute bottom-6 left-0 w-full flex md:hidden justify-center gap-6 z-50">
                        {[
                            { icon: Instagram, href: "https://www.instagram.com/mowglai", label: "Instagram" },
                            { icon: XLogo, href: "https://x.com/mowglai_in", label: "X" },
                            { icon: Linkedin, href: "https://www.linkedin.com/company/mowglai", label: "LinkedIn" },
                        ].map((item, i) => (
                            <Magnetic key={i} amount={0.5}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group w-11 h-11 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10 bg-background/50 backdrop-blur-sm"
                                    aria-label={item.label}
                                >
                                    <item.icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                                </a>
                            </Magnetic>
                        ))}
                    </div>

                    {/* Right Sidebar (10% Width) - Social Icons */}
                    <div className="hidden md:flex w-[10%] h-full border-l border-primary/10 flex-col justify-center items-center py-10 bg-primary/5">
                        <div className="flex flex-col gap-8 items-center">
                            {[
                                { icon: Instagram, href: "https://www.instagram.com/mowglai", label: "Instagram" },
                                { icon: XLogo, href: "https://x.com/mowglai_in", label: "X" },
                                { icon: Linkedin, href: "https://www.linkedin.com/company/mowglai", label: "LinkedIn" },
                            ].map((item, i) => (
                                <Magnetic key={i} amount={0.5}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative group w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10"
                                        aria-label={item.label}
                                    >
                                        <item.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FullScreenNav;
