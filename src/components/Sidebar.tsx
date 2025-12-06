import { useState, useEffect } from "react";
import { Home, Users, Mail, DollarSign, MessageSquare, ChevronRight, Sun, Moon } from "lucide-react";
import LionLogo from "./LionLogo";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: Users, label: "About Us", href: "#about" },
  { icon: DollarSign, label: "Pricing", href: "#pricing" },
  { icon: MessageSquare, label: "Testimonials", href: "#testimonials" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

interface SidebarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Sidebar = ({ isDark, onToggleTheme }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [trailPosition, setTrailPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrailPosition((prev) => (prev >= 100 ? 0 : prev + 0.3));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Scroll spy to update active item
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with some offset)
          if (rect.top <= 150 && rect.bottom >= 150) {
            const activeNav = navItems.find(item => item.href === `#${sectionId}`);
            if (activeNav) {
              setActiveItem(activeNav.label);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col items-center py-6 z-50 transition-all duration-300 ease-out",
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

      {/* Logo */}
      <div className="mb-8 relative z-20">
        <LionLogo size="sm" className="w-12 h-12" />
      </div>

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
          const isActive = activeItem === item.label;

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleClick(item.label)}
              className={cn(
                "relative overflow-hidden w-full flex items-center gap-3 h-12 rounded-xl transition-all duration-300 group",
                isExpanded ? "justify-start px-4" : "justify-center",
                isActive && "active"
              )}
              style={{
                background: isActive
                  ? `linear-gradient(to right, hsl(270 80% 60% / 0.5) 0%, hsl(270 80% 60% / 0.3) 20%, hsl(270 80% 60% / 0.1) 40%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 70%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 100%)`
                  : `linear-gradient(to right, hsl(270 80% 60% / 0.25) 0%, hsl(270 80% 60% / 0.1) 25%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 60%, ${isDark ? 'hsl(0 0% 0%)' : 'hsl(0 0% 100%)'} 100%)`,
                border: '1px solid transparent',
                boxShadow: isActive
                  ? 'inset -4px 0 12px hsl(270 80% 60% / 0.4), 0 0 15px hsl(270 80% 60% / 0.2), 0 0 0 1px rgba(0, 0, 0, 0.5)'
                  : 'inset -3px 0 8px hsl(270 80% 60% / 0.15), 0 0 0 1px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-all duration-300 flex-shrink-0 relative z-10",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />

              {/* Label when expanded */}
              <span
                className={cn(
                  "font-medium text-sm transition-all duration-300 whitespace-nowrap overflow-hidden relative z-10",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
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
            </a>
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

      {/* Bottom decorative element */}
      <div className="mt-6 relative z-20">
        <div
          className="w-8 h-8 rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, hsl(270 80% 60% / 0.4), hsl(270 80% 60% / 0.2))',
            boxShadow: '0 0 20px hsl(270 80% 60% / 0.4)',
          }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;