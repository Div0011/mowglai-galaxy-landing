import { useState } from "react";
import { Home, Users, Mail, DollarSign, Menu, X, Instagram, Twitter, Linkedin, Layers, Bot, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import Magnetic from "@/components/Magnetic";
import MowglaiLogo from "@/components/MowglaiLogo";
import { useTheme } from "next-themes";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> refactor/nav-and-content-updates
    { icon: Home, label: "START", href: "/" },
    { icon: Users, label: "STORY", href: "/about" },
    { icon: Layers, label: "CRAFT", href: "/services" },
    { icon: LayoutTemplate, label: "BLUEPRINT", href: "/explore" },
    { icon: DollarSign, label: "VALUE", href: "/investment" },
    { icon: Mail, label: "HELLO", href: "/contact" },
<<<<<<< HEAD
=======
=======
    { icon: Home, label: "HOME", href: "/" },
    { icon: Users, label: "STUDIO", href: "/about" },
    { icon: Layers, label: "EXPERTISE", href: "/services" },
    { icon: LayoutTemplate, label: "WORK", href: "/explore" },
    { icon: DollarSign, label: "INVESTMENT", href: "/investment" },
    { icon: Mail, label: "CONNECT", href: "/contact" },
>>>>>>> main
>>>>>>> refactor/nav-and-content-updates
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
                            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group border border-transparent backdrop-blur-sm",
                            resolvedTheme === "light"
                                ? "bg-primary/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary"
                                : "bg-background/5 text-primary hover:bg-primary/10 hover:border-primary/20"
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



            {/* Logo - Fixed Top Left - Visible Always */}
            <div className="fixed top-[calc(1rem+env(safe-area-inset-top))] left-[calc(0.875rem+env(safe-area-inset-left))] md:top-[calc(2rem+env(safe-area-inset-top))] md:left-[calc(2rem+env(safe-area-inset-left))] z-[60]">
                <Magnetic amount={0.4}>
                    <div
                        className="cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300">
                            <MowglaiLogo size="lg" className="w-14 h-14 md:w-16 md:h-16 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all duration-500" />
                        </div>
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
                {/* Background Gradient - Warm subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

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
                                        isHovered ? "flex-[1.5] bg-primary/5" : "flex-1 hover:bg-primary/5"
                                    )}
                                    onMouseEnter={() => setHoveredItem(item.label)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {/* Light Saber Divider (Right side of each column) */}
                                    <div className={cn(
                                        "absolute top-0 right-0 w-[1px] h-full transition-all duration-500",
                                        "bg-gradient-to-b from-transparent via-primary/20 to-transparent", // Default state
                                        isHovered ? "w-[2px] bg-primary shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "" // Active/Glow state
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
                                                ? (resolvedTheme === 'light' ? "text-primary-foreground drop-shadow-[0_0_8px_rgba(20,83,45,0.4)]" : "text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]")
                                                : "text-primary/40"
                                        )} />

                                        <Magnetic amount={0.3}>
                                            <span className={cn(
                                                item.label === "TESTIMONIALS"
                                                    ? "text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                                                    : "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                                                "font-display font-bold uppercase break-words max-w-full [writing-mode:vertical-rl] rotate-180 inline-block leading-loose py-4 px-4",
                                                isHovered
                                                    ? (resolvedTheme === 'light' ? "text-primary-foreground drop-shadow-[0_0_10px_rgba(20,83,45,0.3)]" : "text-transparent bg-clip-text bg-gradient-to-b from-primary via-accent to-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]")
                                                    : "text-primary/30"
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
                            { icon: Twitter, href: "https://x.com/Mowglai11", label: "X (Twitter)" },
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
                                { icon: Twitter, href: "https://x.com/Mowglai11", label: "X (Twitter)" },
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
