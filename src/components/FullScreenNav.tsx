import { useState, useEffect } from "react";
import { Home, Users, Mail, DollarSign, Menu, X, Instagram, Facebook, Twitter, Linkedin, Layers, Bot, MessageSquareText } from "lucide-react";
import ChatbotModal from "@/components/ChatbotModal";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import Magnetic from "@/components/Magnetic";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { icon: Home, label: "HOME", href: "/" },
    { icon: Users, label: "ABOUT", href: "/about" },
    { icon: Layers, label: "SERVICES", href: "/services" },
    { icon: DollarSign, label: "INVESTMENT", href: "/investment" },
    { icon: Mail, label: "CONTACT", href: "/contact" },
];

interface FullScreenNavProps {
    isDark?: boolean;
    onToggleTheme?: () => void;
}

const FullScreenNav = ({ isDark, onToggleTheme }: FullScreenNavProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
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
            <div className="fixed top-8 right-8 z-[60]">
                <Magnetic>
                    <button
                        onClick={toggleMenu}
                        className="p-4 rounded-full hover:bg-primary/10 transition-colors duration-300 group"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <X className="w-8 h-8 text-primary group-hover:rotate-90 transition-transform duration-300" />
                        ) : (
                            <Menu className="w-8 h-8 text-primary" />
                        )}
                    </button>
                </Magnetic>
            </div>


            {/* Logo - Fixed Top Left - Visible Always */}
            <div className="fixed top-8 left-8 z-[60]">
                <Magnetic amount={0.4}>
                    <div
                        className="w-20 h-20 flex items-center justify-center cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-16 h-16 rounded-full border border-primary/20 bg-background/5 overflow-hidden backdrop-blur-sm">
                            {/* Dark Mode Logo */}
                            <img
                                src={`${import.meta.env.BASE_URL}logo1.png`}
                                alt="Mowglai Logo"
                                className="w-full h-full object-cover hidden dark:block"
                            />
                            {/* Light Mode Logo */}
                            <img
                                src={`${import.meta.env.BASE_URL}logo2.png`}
                                alt="Mowglai Logo"
                                className="w-full h-full object-cover block dark:hidden"
                            />
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
                        {navItems.map((item, index) => {
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
                                            isHovered ? "text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "text-primary/40"
                                        )} />

                                        <Magnetic amount={0.3}>
                                            <span className={cn(
                                                item.label === "TESTIMONIALS"
                                                    ? "text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                                                    : "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                                                "font-display font-bold uppercase tracking-tight break-words max-w-full [writing-mode:vertical-rl] rotate-180 inline-block",
                                                isHovered ? "text-transparent bg-clip-text bg-gradient-to-b from-primary via-accent to-primary drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "text-primary/30"
                                            )}>
                                                {item.label}
                                            </span>
                                        </Magnetic>
                                    </a>
                                </div>
                            );
                        })}
                    </nav>

                    {/* Right Sidebar (10% Width) - Social Icons */}
                    <div className="hidden md:flex w-[10%] h-full border-l border-primary/10 flex-col justify-center items-center py-10 bg-primary/5">

                        <div className="flex flex-col gap-8 items-center">
                            {/* Magnetic Social Icons */}
                            {[
                                { icon: Instagram, href: "#", label: "Instagram" },
                                { icon: Twitter, href: "#", label: "X (Twitter)" },
                                { icon: Linkedin, href: "#", label: "LinkedIn" }, // Replaced Facebook
                                { icon: Bot, isChat: true, label: "AI Assistant" } // Replaced LinkedIn
                            ].map((item, i) => (
                                <Magnetic key={i} amount={0.5}>
                                    {item.isChat ? (
                                        <button
                                            onClick={() => setIsChatOpen(true)}
                                            className="relative group w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10"
                                            aria-label={item.label}
                                        >
                                            <item.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                                        </button>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="relative group w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center transition-all duration-300 hover:border-primary hover:bg-primary/10"
                                            aria-label={item.label}
                                        >
                                            <item.icon className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                                        </a>
                                    )}
                                </Magnetic>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
};

export default FullScreenNav;
