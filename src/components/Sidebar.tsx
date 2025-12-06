import { useState } from "react";
import { Home, Users, Mail, DollarSign, MessageSquare, ChevronRight, Sun, Moon } from "lucide-react";
import MowglaiLogo from "./MowglaiLogo";
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
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y, id: Date.now() });
    setActiveItem(label);
    
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen glass-sidebar-cylindrical flex flex-col items-center py-8 z-50 transition-all duration-500 ease-out",
        isExpanded ? "w-56" : "w-20"
      )}
      style={{
        borderRadius: "0 30px 30px 0",
      }}
    >
      {/* Logo */}
      <div className="mb-8">
        <MowglaiLogo size="md" />
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-6 hover:bg-primary/30 transition-all duration-300 hover:scale-110"
        style={{
          boxShadow: "0 0 20px hsl(270 80% 60% / 0.3)",
        }}
      >
        <ChevronRight 
          className={cn(
            "w-4 h-4 text-primary transition-transform duration-300",
            isExpanded && "rotate-180"
          )} 
        />
      </button>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-3 w-full px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.label)}
              className={cn(
                "nav-icon relative overflow-hidden w-full flex items-center gap-3",
                isActive && "bg-primary/30 shadow-lg shadow-primary/30",
                isExpanded ? "justify-start px-4" : "justify-center"
              )}
              style={{
                boxShadow: isActive ? "0 0 25px hsl(270 80% 60% / 0.4), inset 0 0 15px hsl(270 80% 60% / 0.1)" : undefined,
              }}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-all duration-300 flex-shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              />
              
              {/* Label when expanded */}
              <span 
                className={cn(
                  "font-medium text-sm transition-all duration-300 whitespace-nowrap overflow-hidden",
                  isActive ? "text-primary" : "text-muted-foreground",
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}
              >
                {item.label}
              </span>
              
              {/* Tooltip when collapsed */}
              {!isExpanded && (
                <span className="absolute left-full ml-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-glass-border/30 shadow-xl">
                  {item.label}
                </span>
              )}

              {/* Ripple effect */}
              {ripple && activeItem === item.label && (
                <span
                  className="absolute w-4 h-4 bg-primary/40 rounded-full animate-ripple pointer-events-none"
                  style={{ left: ripple.x - 8, top: ripple.y - 8 }}
                />
              )}

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -right-1 w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mt-4 hover:bg-primary/30 transition-all duration-300 hover:scale-110 group"
        style={{
          boxShadow: "0 0 25px hsl(270 80% 60% / 0.3), inset 0 0 15px hsl(270 80% 60% / 0.1)",
        }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-5 h-5 text-primary group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </button>

      {/* Bottom decorative element */}
      <div className="mt-6">
        <div 
          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse-glow"
          style={{
            boxShadow: "0 0 30px hsl(270 80% 60% / 0.4)",
          }}
        />
      </div>
    </aside>
  );
};

export default Sidebar;