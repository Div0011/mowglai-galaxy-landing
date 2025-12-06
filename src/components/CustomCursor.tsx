import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor - black body with purple outline */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: position.x - 10,
          top: position.y - 10,
          transform: isPointer ? "scale(1.5)" : "scale(1)",
        }}
      >
        <div
          className="w-5 h-5 rounded-full bg-background border-2 border-primary"
          style={{
            boxShadow: "0 0 15px hsl(270 80% 60% / 0.5), 0 0 30px hsl(270 80% 60% / 0.3)",
          }}
        />
      </div>
      {/* Trailing glow */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: position.x - 20,
          top: position.y - 20,
        }}
      >
        <div
          className="w-10 h-10 rounded-full bg-primary/20 blur-md"
          style={{
            boxShadow: "0 0 30px hsl(270 80% 60% / 0.4)",
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;