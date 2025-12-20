import { Home, Users, Mail, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "About", href: "/about" },
    { icon: DollarSign, label: "Price", href: "/investment" },
    { icon: Mail, label: "Contact", href: "/contact" },
];

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState("Home");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Sync active item with location
    useEffect(() => {
        const currentPath = location.pathname;
        const active = navItems.find(item => item.href === currentPath);
        if (active) setActiveItem(active.label);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleClick = (e: React.MouseEvent, label: string, href: string) => {
        e.preventDefault();
        setActiveItem(label);
        navigate(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300",
                isVisible ? "translate-y-0" : "translate-y-full"
            )}
        >
            <div
                className="mx-4 mb-4 rounded-2xl p-2 flex justify-between items-center"
                style={{
                    background: 'hsl(var(--background) / 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid hsl(var(--border) / 0.2)',
                    boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.1)',
                }}
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.label;

                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleClick(e, item.label, item.href)}
                            className={cn(
                                "flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-300 relative overflow-hidden",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-primary/10 rounded-xl animate-fade-in" />
                            )}
                            <Icon className={cn("w-5 h-5 mb-1 relative z-10", isActive && "scale-110")} />
                            <span className="text-[10px] font-medium relative z-10">{item.label}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNav;
