import { cn } from "@/lib/utils";
import Image from "next/image";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MowglaiLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const MowglaiLogo = ({ className, size = "md" }: MowglaiLogoProps) => {
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

  // Default to logo1-light (Dark Green/General) if not mounted or if dark theme
  // Use logo2 (Golden) only if mounted and theme is explicitly light
  const logoSrc = mounted && resolvedTheme === "light"
    ? "/logo2.webp"
    : "/logo1-light.webp";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full aspect-square shrink-0",
        "bg-background/5 border border-primary/20 backdrop-blur-sm",
        "transition-transform duration-500 hover:scale-105",
        sizeClasses[size],
        className
      )}
    >
      <div className="relative w-full h-full">
        <Image
          src={logoSrc}
          alt="Mowglai"
          width={dimensions[size]}
          height={dimensions[size]}
          className="w-full h-full object-cover rounded-full"
          priority={size === "lg" || size === "xl"}
        />
      </div>
    </div>
  );
};

export default MowglaiLogo;
