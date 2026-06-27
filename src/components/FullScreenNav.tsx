import { useState, useEffect } from "react";
import { Home, Users, Mail, DollarSign, Menu, X, Instagram, Linkedin, Layers, Bot, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import MowglaiLogo from "@/components/MowglaiLogo";
import { useTheme } from "next-themes";
import XLogo from "@/components/icons/XLogo";

interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { icon: Home, label: "HOME", href: "/home/" },
    { icon: Users, label: "ABOUT", href: "/about" },
    { icon: Layers, label: "SERVICES", href: "/services" },
    { icon: LayoutTemplate, label: "PRODUCTS", href: "/explore" },
    { icon: Mail, label: "CONTACT", href: "/contact" },
];

interface FullScreenNavProps {
    isDark?: boolean;
    onToggleTheme?: () => void;
    onOpenChat: () => void;
}

const FullScreenNav = ({ onOpenChat }: FullScreenNavProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const { resolvedTheme } = useTheme();

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Logo state:
    // - Visible (opacity-100, blur-0) if menu is open, OR at top of page, OR hovered locally.
    // - Dim/Blurred otherwise.
    const isLogoActive = isOpen || !scrolled;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (e: React.MouseEvent, label: string, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        router.push(href);
    };

    return (
        <>
            {/* Hamburger Button - Fixed Top Right - Desktop Only */}
            <div className="hidden md:block fixed top-[calc(2rem+env(safe-area-inset-top))] right-[calc(2rem+env(safe-area-inset-right))] z-[60]">
                <Magnetic>
                    <button
                        onClick={toggleMenu}
                        className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group backdrop-blur-md border",
                            resolvedTheme === "light"
                                ? "bg-primary/20 text-primary-foreground border-primary/20 hover:bg-primary-foreground/20"
                                : "bg-[#05110a]/80 border-[#22c55e]/30 text-[#F5D061] hover:bg-[#22c55e]/20"
                        )}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </Magnetic>
            </div>



            {/* Logo - Fixed Top Left - Visible Always but Reactive */}
            <div
                className="fixed top-[calc(1rem+env(safe-area-inset-top))] left-[calc(0.875rem+env(safe-area-inset-left))] md:top-[calc(2rem+env(safe-area-inset-top))] md:left-[calc(2rem+env(safe-area-inset-left))] z-[60]"
                onMouseEnter={() => setHoveredItem("LOGO")}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <Magnetic amount={0.4}>
                    <div
                        className={cn(
                            "cursor-pointer group/logo flex items-center transition-all duration-700",
                            // Logo is active if: Menu is open OR page not scrolled OR logo is specifically hovered
                            (isLogoActive || hoveredItem === "LOGO") ? "opacity-100 blur-0" : "opacity-30 blur-[4px]"
                        )}
                        onClick={() => router.push('/')}
                    >
                        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                            <MowglaiLogo size="lg" variant="primary" className="w-14 h-14 md:w-16 md:h-16 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all duration-500" />
                        </div>
                        
                        {/* Emerge Text Container */}
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-500 ease-out flex items-center whitespace-nowrap",
                                hoveredItem === "LOGO" ? "w-[130px] md:w-[155px] opacity-100 ml-3" : "w-0 opacity-0 ml-0"
                            )}
                        >
                            <span className="text-lg md:text-xl font-display font-black text-jungle-gold tracking-widest select-none">
                                MOWGLAI
                            </span>
                        </div>
                    </div>
                </Magnetic>
            </div>

            {/* Full Screen Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[55] bg-[#020804]/95 backdrop-blur-3xl transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-50 pointer-events-none"
                )}
            >
                {/* Background Gradient - Canopy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#14532d]/40 via-transparent to-[#F5D061]/10 pointer-events-none" />

                {/* Main Layout Flex Container */}
                <div className="absolute inset-0 flex w-full h-full">

                    {/* Navigation Columns (90% Width) */}
                    <nav className="w-[90%] flex h-full">
                        {navItems.map((item) => {
                            const isHovered = hoveredItem === item.label;

                            return (
                                <div
                                    key={item.label}
                                    className={cn(
                                        "h-full relative group/col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center justify-center p-4",
                                        isHovered ? "flex-[1.5] bg-[#22c55e]/5" : "flex-1 hover:bg-[#22c55e]/5"
                                    )}
                                    onMouseEnter={() => setHoveredItem(item.label)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {/* Light Saber Divider (Right side of each column) */}
                                    <div className={cn(
                                        "absolute top-0 right-0 w-[1px] h-full transition-all duration-500",
                                        "bg-gradient-to-b from-transparent via-[#22c55e]/20 to-transparent", // Default state
                                        isHovered ? "w-[2px] bg-[#F5D061] shadow-[0_0_20px_rgba(245,208,97,0.6)]" : "" // Active/Glow state
                                    )} />


                                    <a
                                        href={item.href}
                                        onClick={(e) => handleClick(e, item.label, item.href)}
                                        className={cn(
                                            "flex flex-col items-center gap-6 text-center transition-all duration-300 cursor-pointer select-none py-4",
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "w-10 h-10 mb-6 transition-all duration-500 transform -translate-y-4 group-hover/col:translate-y-0 opacity-0 group-hover/col:opacity-100",
                                            isHovered
                                                ? (resolvedTheme === 'light' ? "text-[#14532d] drop-shadow-[0_0_8px_rgba(20,83,45,0.4)]" : "text-[#F5D061] drop-shadow-[0_0_15px_rgba(245,208,97,0.6)]")
                                                : "text-[#22c55e]/40"
                                        )} />

                                        <Magnetic amount={0.3}>
                                            <span className={cn(
                                                "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                                                "font-display font-bold uppercase break-words max-w-full [writing-mode:vertical-rl] rotate-180 inline-block leading-loose py-4 px-4",
                                                isHovered ? "gold-glow-text-hover" : "gold-glow-text"
                                            )}>
                                                {item.label}
                                            </span>
                                        </Magnetic>
                                    </a>
                                </div>
                            );
                        })}
                    </nav>

                    {/* Mobile Social Icons (Bottom Row) */}
                    <div className="absolute bottom-10 left-0 w-full flex md:hidden justify-center gap-6 z-50">
                        {[
                            { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
                            { icon: XLogo, href: "https://x.com/mowglai_in", label: "X" },
                            { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
                        ].map((item, i) => (
                            <Magnetic key={i} amount={0.5}>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10 bg-background/50 backdrop-blur-sm"
                                    aria-label={item.label}
                                >
                                    <item.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                                </a>
                            </Magnetic>
                        ))}
                    </div>

                    {/* Right Sidebar (10% Width) - Social Icons */}
                    <div className="hidden md:flex w-[10%] h-full border-l border-primary/10 flex-col justify-center items-center py-10 bg-primary/5">

                        <div className="flex flex-col gap-8 items-center">


                            {/* Magnetic Social Icons */}
                            {[
                                { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
                                { icon: XLogo, href: "https://x.com/mowglai_in", label: "X" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
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
