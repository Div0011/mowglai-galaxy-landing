import { useState, useEffect } from "react";
import { Home, Users, Mail, DollarSign, ChevronRight, Sun, Moon, Palette, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Story", href: "/about" },
    { icon: Palette, label: "Craft", href: "/services" },
    { icon: LayoutGrid, label: "Blueprint", href: "/explore" },
    { icon: DollarSign, label: "Value", href: "/investment" },
    { icon: Mail, label: "Hello", href: "/contact" },
];

interface SidebarProps {
    isDark: boolean;
    onToggleTheme: () => void;
}

const Sidebar = ({ isDark, onToggleTheme }: SidebarProps) => {
    const pathname = usePathname();
    const [isExpanded, setIsExpanded] = useState(false);
    const [trailPosition, setTrailPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTrailPosition((prev) => (prev >= 100 ? 0 : prev + 0.3));
        }, 16);
        return () => clearInterval(interval);
    }, []);

    // Check if the link is active (exact match for home, partial for others if needed, but these are top level)
    const isActive = (href: string) => {
        if (href === "/" && pathname === "/") return true;
        if (href !== "/" && pathname.startsWith(href)) return true;
        return false;
    };

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen hidden md:flex flex-col items-center py-6 z-50 transition-all duration-300 ease-out",
                isExpanded ? "w-64" : "w-20"
            )}
            style={{
                background: isDark ? 'hsl(0, 0%, 2%)' : 'hsl(0, 0%, 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'inset 0 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.5)',
                borderRadius: '0 30px 30px 0',
            }}
        >
            {/* Purple trail animation */}
            <div
                className="absolute left-0 w-2 h-full pointer-events-none z-10"
                style={{
                    background: `linear-gradient(to bottom, 
            transparent 0%, 
            transparent ${Math.max(0, trailPosition - 8)}%, 
            hsl(270 80% 60% / 0.7) ${Math.max(0, trailPosition - 4)}%, 
            hsl(270 80% 60% / 0.9) ${trailPosition}%, 
            hsl(270 80% 60% / 0.7) ${Math.min(100, trailPosition + 4)}%, 
            transparent ${Math.min(100, trailPosition + 8)}%, 
            transparent 100%)`,
                    boxShadow: `0 ${trailPosition}% 30px hsl(270 80% 60% / 0.5), 0 ${trailPosition}% 15px hsl(270 80% 60% / 0.7)`,
                    transition: 'none',
                }}
            />

            {/* Toggle button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative z-20 w-10 h-10 rounded-full flex items-center justify-center mb-8 transition-all duration-300 hover:scale-105"
                style={{
                    background: `linear-gradient(to right, hsl(270 80% 60% / 0.4) 0%, hsl(270 80% 60% / 0.2) 15%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 40%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 100%)`,
                    border: '1px solid hsl(270 80% 60% / 0.2)',
                    boxShadow: 'inset -2px 0 8px hsl(270 80% 60% / 0.3), 0 0 0 1px rgba(0, 0, 0, 0.3)',
                }}
            >
                <ChevronRight
                    className={cn(
                        "w-4 h-4 transition-transform duration-300 text-primary",
                        isExpanded && "rotate-180"
                    )}
                />
            </button>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2 w-full px-3 relative z-20">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "relative overflow-hidden flex items-center transition-all duration-300 group",
                                isExpanded ? "w-full h-12 rounded-xl justify-start px-4 gap-3" : "w-12 h-12 rounded-full justify-center",
                                active && "active"
                            )}
                            style={{
                                background: active
                                    ? `linear-gradient(to right, hsl(270 80% 60% / 0.5) 0%, hsl(270 80% 60% / 0.3) 20%, hsl(270 80% 60% / 0.1) 40%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 70%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 100%)`
                                    : `linear-gradient(to right, hsl(270 80% 60% / 0.25) 0%, hsl(270 80% 60% / 0.1) 25%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 60%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 100%)`,
                                border: '1px solid transparent',
                                boxShadow: active
                                    ? 'inset -4px 0 12px hsl(270 80% 60% / 0.4), 0 0 15px hsl(270 80% 60% / 0.2), 0 0 0 1px rgba(0, 0, 0, 0.5)'
                                    : 'inset -3px 0 8px hsl(270 80% 60% / 0.15), 0 0 0 1px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <Icon
                                className={cn(
                                    "w-5 h-5 transition-all duration-300 flex-shrink-0 relative z-10",
                                    active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}
                            />

                            {/* Label when expanded */}
                            <span
                                className={cn(
                                    "font-medium text-sm transition-all duration-300 whitespace-nowrap overflow-hidden relative z-10",
                                    active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                                    isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                                )}
                            >
                                {item.label}
                            </span>

                            {/* Tooltip when collapsed */}
                            {!isExpanded && (
                                <span
                                    className="absolute left-full ml-4 px-3 py-1.5 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50"
                                    style={{
                                        background: 'rgba(0, 0, 0, 0.95)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid hsl(270 80% 60% / 0.2)',
                                        color: '#e5e7eb',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                    }}
                                >
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Theme toggle */}
            <button
                onClick={onToggleTheme}
                className="relative z-20 w-12 h-12 rounded-full flex items-center justify-center mt-4 transition-all duration-300 group hover:scale-105"
                style={{
                    background: `linear-gradient(to right, hsl(270 80% 60% / 0.4) 0%, hsl(270 80% 60% / 0.2) 15%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 40%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 100%)`,
                    border: '1px solid hsl(270 80% 60% / 0.2)',
                    boxShadow: 'inset -2px 0 8px hsl(270 80% 60% / 0.3), 0 0 0 1px rgba(0, 0, 0, 0.3)',
                }}
            >
                {isDark ? (
                    <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300 relative z-10 text-primary" />
                ) : (
                    <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300 relative z-10 text-primary" />
                )}
            </button>
        </aside>
    );
};

export default Sidebar;