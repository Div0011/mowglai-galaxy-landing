import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInverted, setIsInverted] = useState(false); // New state for color inversion
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Refs for direct DOM manipulation (better performance than state for cursor position)
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const lastRipplePos = useRef({ x: 0, y: 0 }); // Track last ripple position

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth <= 1024;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile((isCoarse && isSmallScreen) || isMobileUA);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Use GSAP's quickTo for high-performance following
    const cursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const followerX = gsap.quickTo(followerRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const followerY = gsap.quickTo(followerRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      // Update GSAP positions
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);

      const target = e.target as HTMLElement;

      // Pointer Check
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(isClickable);

      // Spawn ripple on move (throttled by distance)
      const dist = Math.hypot(e.clientX - lastRipplePos.current.x, e.clientY - lastRipplePos.current.y);
      if (dist > 50) {
        lastRipplePos.current = { x: e.clientX, y: e.clientY };
        const id = Date.now();
        setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 1500); // Match animation duration
      }

      // Theme/Color Check
      // Look for data-theme="gold" in the ancestry
      const themeElement = target.closest('[data-theme="gold"]');
      setIsInverted(!!themeElement);
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
  }, [isMobile]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Allow ripples on mobile? The custom cursor logic returns null effectively hiding everything.
      // If we want ripples only when cursor is enabled strings attached, keep isMobile check.
      if (isMobile) return;

      const id = Date.now();
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);

      // Cleanup after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* 
        Cursor Styles:
        Default (Green Bg): Golden Cursor
        Inverted (Gold Bg): Green Cursor (#1B3022)
      */}

      {/* Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9997] w-12 h-12 rounded-full border animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: isInverted ? 'rgba(27, 48, 34, 0.3)' : 'rgba(197, 160, 89, 0.3)', // Lower opacity for the trail
            borderWidth: '1px',
          }}
        />
      ))}

      {/* Follower (Large Circle) */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] w-12 h-12 rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out custom-cursor-follower ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          transform: 'translate(-50%, -50%)', // Center on coordinates
          borderColor: isInverted ? '#1B3022' : '#C5A059',
          backgroundColor: isPointer ? (isInverted ? 'rgba(27, 48, 34, 0.1)' : 'rgba(197, 160, 89, 0.1)') : 'transparent',
          scale: isPointer ? 1.5 : 1,
        }}
      />

      {/* Main Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] w-3 h-3 rounded-full transition-colors duration-300 ease-out custom-cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          transform: 'translate(-50%, -50%)',
          backgroundColor: isInverted ? '#1B3022' : '#C5A059',
        }}
      />
    </>
  );
};

export default CustomCursor;