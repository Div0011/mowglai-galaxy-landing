import { Home, Users, Mail, DollarSign, MessageSquare, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Users, label: "About", href: "#about" },
    { icon: Target, label: "Mission", href: "#mission" },
    { icon: DollarSign, label: "Pricing", href: "#pricing" },
    { icon: MessageSquare, label: "Reviews", href: "#testimonials" },
    { icon: Mail, label: "Contact", href: "#contact" },
];

const MobileNav = () => {
    const [activeItem, setActiveItem] = useState("Home");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Scroll spy to update active item
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide nav on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);

            const sections = navItems.map(item => item.href.substring(1));

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const opacity = parseFloat(window.getComputedStyle(element).opacity);
                    const isVisible = opacity > 0.5;

                    // Check if section is in viewport (with some offset) and visible
                    if (rect.top <= 150 && rect.bottom >= 150 && isVisible) {
                        const activeNav = navItems.find(item => item.href === `#${sectionId}`);
                        if (activeNav) {
                            setActiveItem(activeNav.label);
                        }
                        // Removed break to allow overlapping sections
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleClick = (e: React.MouseEvent, label: string, href: string) => {
        e.preventDefault();
        setActiveItem(label);

        if (href === "#home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (href === "#about") {
            const st = ScrollTrigger.getAll().find(st => (st.trigger as HTMLElement)?.id === "hero-about-wrapper");
            if (st) {
                gsap.to(window, { duration: 1, scrollTo: st.end });
            } else {
                gsap.to(window, { duration: 1, scrollTo: { y: href, offsetY: 0, autoKill: false } });
            }
        } else if (href === "#mission") {
            const st = ScrollTrigger.getAll().find(st => (st.trigger as HTMLElement)?.id === "mission-pricing-wrapper");
            if (st) {
                gsap.to(window, { duration: 1, scrollTo: st.start });
            } else {
                gsap.to(window, { duration: 1, scrollTo: { y: href, offsetY: 0, autoKill: false } });
            }
        } else if (href === "#pricing") {
            const st = ScrollTrigger.getAll().find(st => (st.trigger as HTMLElement)?.id === "mission-pricing-wrapper");
            if (st) {
                gsap.to(window, { duration: 1, scrollTo: st.end });
            } else {
                gsap.to(window, { duration: 1, scrollTo: { y: href, offsetY: 0, autoKill: false } });
            }
        } else {
            gsap.to(window, { duration: 1, scrollTo: { y: href, offsetY: 0, autoKill: false } });
        }
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
                    background: 'rgba(10, 10, 10, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
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
