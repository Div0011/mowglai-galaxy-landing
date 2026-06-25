import { cn } from "@/lib/utils";
import Image from "next/image";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MowglaiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "icon" | "primary" | "wordmark";
}

const MowglaiLogo = ({ className, size = "md", variant = "icon" }: MowglaiLogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
    full: "w-full h-full",
  };

  const dimensions = {
    sm: 40,
    md: 56,
    lg: 80,
    xl: 128,
    full: 500,
  };

  const srcMap = {
    icon: "/logo2.webp",
    primary: "/assets/mowglai_primary.png",
    wordmark: "/assets/mowglai_wordmark.png",
  };

  const logoSrc = srcMap[variant];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden shrink-0",
        variant === "icon" ? "rounded-full aspect-square bg-background/5 border border-primary/20 backdrop-blur-sm" : "aspect-auto",
        "transition-transform duration-500 hover:scale-105",
        sizeClasses[size],
        className
      )}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={logoSrc}
          alt={`Mowglai ${variant}`}
          width={dimensions[size]}
          height={dimensions[size]}
          className={cn(
            "object-contain",
            variant === "icon" ? "w-full h-full rounded-full object-cover" : "w-full h-auto max-h-full"
          )}
          priority={size === "lg" || size === "xl"}
        />
      </div>
    </div>
  );
};

export default MowglaiLogo;
