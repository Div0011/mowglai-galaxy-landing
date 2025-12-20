import { useState, useEffect } from "react";
import { Home, Users, Mail, DollarSign, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { icon: Home, label: "HOME", href: "/" },
    { icon: Users, label: "ABOUT", href: "/about" },
    { icon: DollarSign, label: "INVESTMENT", href: "/investment" },
    { icon: Mail, label: "CONTACT", href: "/contact" },
];

interface FullScreenNavProps {
    isDark?: boolean;
    onToggleTheme?: () => void;
}

const FullScreenNav = ({ isDark, onToggleTheme }: FullScreenNavProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (e: React.MouseEvent, label: string, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        navigate(href);
    };

    return (
        <>
            {/* Hamburger Button - Fixed Top Right */}
            {/* We keep this outside the grid to align with the 'closed' state UI */}
            <button
                onClick={toggleMenu}
                className="fixed top-8 right-8 z-[60] p-2 text-primary hover:text-accent transition-all duration-300 group"
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <X className="w-10 h-10 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                    <Menu className="w-10 h-10 text-primary" />
                )}
            </button>

            {/* Full Screen Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[55] bg-background backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
                )}
            >
                {/* Background Gradient - Warm subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

                {/* Logo - Top Left - Magnetic */}
                <div
                    className="absolute top-8 left-8 z-[60] w-20 h-20 flex items-center justify-center cursor-pointer"
                    onMouseMove={(e) => {
                        const btn = e.currentTarget;
                        const rect = btn.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        const inner = btn.querySelector('.nav-logo-inner');
                        if (inner) gsap.to(inner, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
                    }}
                    onMouseLeave={(e) => {
                        const inner = e.currentTarget.querySelector('.nav-logo-inner');
                        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                    }}
                >
                    <div className="nav-logo-inner w-16 h-16 rounded-full border border-primary/20 bg-background/5 overflow-hidden transition-transform duration-300">
                        {/* Dark Mode Logo */}
                        <img
                            src="public/logo1.png"
                            alt="Mowglai Logo"
                            className="w-full h-full object-cover hidden dark:block"
                        />
                        {/* Light Mode Logo */}
                        <img
                            src="public/logo2.png"
                            alt="Mowglai Logo"
                            className="w-full h-full object-cover block dark:hidden"
                        />
                    </div>
                </div>

                {/* Main Layout Flex Container */}
                <div className="absolute inset-0 flex w-full h-full">

                    {/* Navigation Columns (90% Width) */}
                    <nav className="w-[90%] flex h-full">
                        {navItems.map((item, index) => {
                            const isHovered = hoveredItem === item.label;

                            return (
                                <div
                                    key={item.label}
                                    className={cn(
                                        "h-full relative group/col transition-all duration-500 ease-in-out flex flex-col items-center justify-center p-4",
                                        isHovered ? "flex-[2] bg-primary/5" : "flex-1 hover:bg-primary/5"
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
                                            "w-10 h-10 mb-6 transition-all duration-300 transform -translate-y-4 group-hover/col:translate-y-0 opacity-0 group-hover/col:opacity-100",
                                            isHovered ? "text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "text-primary/40"
                                        )} />

                                        <span className={cn(
                                            item.label === "TESTIMONIALS"
                                                ? "text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                                                : "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                                            "font-display font-bold uppercase tracking-tight break-words max-w-full [writing-mode:vertical-rl] rotate-180",
                                            isHovered ? "text-transparent bg-clip-text bg-gradient-to-b from-primary via-accent to-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "text-primary/30"
                                        )}>
                                            {item.label}
                                        </span>
                                    </a>
                                </div>
                            );
                        })}
                    </nav>

                    {/* Right Sidebar (10% Width) - Logo & Info */}
                    {/* Right Sidebar (10% Width) - Social Icons */}
                    <div className="w-[10%] h-full border-l border-primary/10 flex flex-col justify-center items-center py-10 bg-primary/5">

                        <div className="flex flex-col gap-8 items-center">
                            {/* Magnetic Social Icons */}
                            {['IG', 'X', 'FB', 'LI'].map((social, i) => (
                                <button
                                    key={social}
                                    className="relative group w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 hover:border-primary hover:scale-110"
                                    onMouseMove={(e) => {
                                        const btn = e.currentTarget;
                                        const rect = btn.getBoundingClientRect();
                                        const x = e.clientX - rect.left - rect.width / 2;
                                        const y = e.clientY - rect.top - rect.height / 2;
                                        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
                                    }}
                                    onMouseLeave={(e) => {
                                        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                                    }}
                                >
                                    <span className="text-xs font-medium text-primary/60 group-hover:text-primary transition-colors">
                                        {social}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default FullScreenNav;
