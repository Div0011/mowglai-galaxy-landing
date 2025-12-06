import { useState } from "react";
import { Home, Users, Mail, DollarSign, MessageSquare } from "lucide-react";
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

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Home");
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
    <aside className="fixed left-0 top-0 h-screen w-20 glass-sidebar flex flex-col items-center py-8 z-50">
      {/* Logo */}
      <div className="mb-12">
        <MowglaiLogo size="md" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.label)}
              className={cn(
                "nav-icon relative overflow-hidden",
                isActive && "bg-primary/30 shadow-lg shadow-primary/30"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )}
              />
              
              {/* Tooltip */}
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-glass-border/30 shadow-xl">
                {item.label}
              </span>

              {/* Ripple effect */}
              {ripple && activeItem === item.label && (
                <span
                  className="absolute w-4 h-4 bg-primary/40 rounded-full animate-ripple pointer-events-none"
                  style={{ left: ripple.x - 8, top: ripple.y - 8 }}
                />
              )}

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -right-3 w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom decorative element */}
      <div className="mt-auto">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse-glow" />
      </div>
    </aside>
  );
};

export default Sidebar;
