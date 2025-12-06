import { cn } from "@/lib/utils";

interface MowglaiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const MowglaiLogo = ({ className, size = "md" }: MowglaiLogoProps) => {
  const sizeClasses = {
    sm: "w-10 h-10 text-xl",
    md: "w-14 h-14 text-2xl",
    lg: "w-20 h-20 text-4xl",
    xl: "w-32 h-32 text-6xl",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center font-display font-black",
        "bg-gradient-to-br from-primary via-accent to-primary",
        "rounded-2xl glow-box transition-all duration-500",
        "hover:scale-105 hover:rotate-3",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br",
        "before:from-primary/50 before:to-accent/50 before:blur-xl before:-z-10",
        "after:absolute after:inset-[2px] after:rounded-[14px] after:bg-background/90",
        sizeClasses[size],
        className
      )}
    >
      <span className="relative z-10 bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
        M
      </span>
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-glow" />
    </div>
  );
};

export default MowglaiLogo;
