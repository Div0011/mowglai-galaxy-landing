"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth <= 1024;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile((isCoarse && isSmallScreen) || isMobileUA);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    if (isMobile) return;

    gsap.set([cursorRef.current, followerRef.current], { xPercent: -50, yPercent: -50 });

    const cursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const followerX = gsap.quickTo(followerRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const followerY = gsap.quickTo(followerRef.current, "y", { duration: 0.35, ease: "power3.out" });

    // Animation loop using requestAnimationFrame
    const animate = () => {
      const { x, y } = mousePosRef.current;
      cursorX(x);
      cursorY(y);
      followerX(x);
      followerY(y);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  // Mouse move handler with manual throttling for state updates
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Throttle state updates to ~30fps (33ms)
      const now = performance.now();
      if (now - lastUpdateRef.current < 33) return;
      lastUpdateRef.current = now;
      
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.getAttribute("role") === "button";

      setIsPointer(prev => prev === isClickable ? prev : isClickable);

      const themeElement = target.closest('[data-theme="gold"]');
      const shouldInvert = !!themeElement;
      setIsInverted(prev => prev === shouldInvert ? prev : shouldInvert);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, isVisible]);

  // Click handler for ripples
  useEffect(() => {
    if (isMobile) return;

    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, [isMobile]);

  // Scale animation on hover state change
  useEffect(() => {
    if (isMobile || !followerRef.current) return;

    const scale = isPointer ? 1.6 : 1;

    gsap.to(followerRef.current, {
      scale: scale,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isPointer, isMobile]);

  if (isMobile) return null;

  // Force original style logic
  const colors = {
    dot: isInverted ? '#1B3022' : '#C5A059',
    followerBorder: isInverted ? '#1B3022' : '#C5A059',
    followerBg: isPointer ? (isInverted ? 'rgba(27, 48, 34, 0.1)' : 'rgba(197, 160, 89, 0.1)') : 'transparent',
    ripple: isInverted ? 'rgba(27, 48, 34, 0.3)' : 'rgba(197, 160, 89, 0.3)'
  };

  return (
    <>
      {/* Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9997] w-12 h-12 rounded-full border animate-ripple bg-transparent"
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: colors.ripple,
            borderWidth: '1px'
          }}
        />
      ))}

      {/* Follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-[opacity] duration-300 ease-out 
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          w-10 h-10 rounded-full border`}
        style={{
          borderColor: colors.followerBorder,
          backgroundColor: colors.followerBg,
          willChange: 'transform'
        }}
      />

      {/* Main Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[opacity,background-color] duration-300 ease-out 
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          w-2.5 h-2.5`}
        style={{
          mixBlendMode: 'normal',
          backgroundColor: colors.dot,
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default CustomCursor;