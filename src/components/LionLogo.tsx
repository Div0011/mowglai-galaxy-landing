import { cn } from "@/lib/utils";

interface LionLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const LionLogo = ({ className, size = "xl" }: LionLogoProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-80 h-80",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {/* Background blend layer */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(270 80% 60% / 0.4) 0%, transparent 70%)",
        }}
      />
      
      {/* Reflective light layers */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 animate-pulse-glow"
        style={{
          background: "radial-gradient(circle at 30% 30%, hsl(270 80% 60% / 0.5) 0%, transparent 50%)",
          filter: "blur(40px)",
        }}
      />
      <div 
        className="absolute inset-0 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle at 70% 70%, hsl(280 100% 70% / 0.4) 0%, transparent 50%)",
          filter: "blur(30px)",
        }}
      />
      
      {/* Main logo image with fine purple border light */}
      <div className="relative z-10 w-full h-full">
        <img
          src="/lionlogo.png"
          alt="Mowglai Lion Logo"
          className="w-full h-full object-contain relative z-10"
          style={{
            filter: `
              drop-shadow(0 0 2px hsl(270 80% 60% / 0.4)) 
              drop-shadow(0 0 4px hsl(270 80% 60% / 0.3)) 
              drop-shadow(0 0 6px hsl(270 80% 60% / 0.2))
            `,
            mixBlendMode: "screen",
          }}
        />
        
        {/* Very fine purple light along image border */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
              radial-gradient(ellipse at 70% 70%, rgba(168, 139, 250, 0.1) 0%, transparent 40%)
            `,
            mixBlendMode: "overlay",
            filter: "blur(8px)",
          }}
        />
      </div>
      
      {/* Ambient light particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 45;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                opacity: 0.4,
                filter: "blur(4px)",
                animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LionLogo;
