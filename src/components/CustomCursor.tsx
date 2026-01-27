"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useStyle } from "@/context/StyleContext";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const CustomCursor = () => {
  const { style } = useStyle();
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInverted, setIsInverted] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const lastRipplePos = useRef({ x: 0, y: 0 });

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

    gsap.set([cursorRef.current, followerRef.current], { xPercent: -50, yPercent: -50 });

    const cursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });
    const followerX = gsap.quickTo(followerRef.current, "x", { duration: 0.35, ease: "power3.out" });
    const followerY = gsap.quickTo(followerRef.current, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(prev => prev ? prev : true);

      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);

      const target = e.target as HTMLElement;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.getAttribute("role") === "button";

      setIsPointer(prev => prev === isClickable ? prev : isClickable);

      const dist = Math.hypot(e.clientX - lastRipplePos.current.x, e.clientY - lastRipplePos.current.y);
      if (dist > 120) {
        lastRipplePos.current = { x: e.clientX, y: e.clientY };
        const id = Date.now();
        setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 1000);
      }


      const themeElement = target.closest('[data-theme="gold"]');
      const shouldInvert = !!themeElement;
      setIsInverted(prev => prev === shouldInvert ? prev : shouldInvert);
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
      if (isMobile) return;

      const id = Date.now();
      setRipples((prev) => [...prev, { x: e.clientX, y: e.clientY, id }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !followerRef.current) return;

    let scale = isPointer ? 1.6 : 1;
    // Black Hole Effect: Absorb when hovering
    if (style === "minimal" && isPointer) scale = 2.5;

    gsap.to(followerRef.current, {
      scale: style === "minimal" ? (isPointer ? 1.1 : 1.0) : scale,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isPointer, isMobile, style]);

  if (isMobile) return null;

  // Style Logic
  const getCursorColors = () => {
    switch (style) {
      case "minimal":
        return {
          dot: "#ffffff",
          followerBorder: "hsl(var(--foreground))",
          followerBg: "transparent",
          ripple: "hsla(var(--foreground), 0.2)"
        };
      case "candy":
        return {
          dot: "#ffffff",
          followerBorder: "rgba(255,255,255,0.5)",
          followerBg: "transparent",
          ripple: "rgba(236, 72, 153, 0.4)" // Pink ripple
        };
      case "original":
      default:
        return {
          dot: isInverted ? '#1B3022' : '#C5A059',
          followerBorder: isInverted ? '#1B3022' : '#C5A059',
          followerBg: isPointer ? (isInverted ? 'rgba(27, 48, 34, 0.1)' : 'rgba(197, 160, 89, 0.1)') : 'transparent',
          ripple: isInverted ? 'rgba(27, 48, 34, 0.3)' : 'rgba(197, 160, 89, 0.3)'
        };
    }
  };

  const colors = getCursorColors();

  return (
    <>
      {/* Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className={`fixed pointer-events-none z-[9997] w-12 h-12 rounded-full border animate-ripple ${style === 'candy' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30 border-none' : ''}`}
          style={{
            left: ripple.x,
            top: ripple.y,
            borderColor: colors.ripple,
            borderWidth: '1px',
            backgroundColor: style === 'candy' ? undefined : 'transparent'
          }}
        />
      ))}

      {/* Follower */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-[opacity] duration-300 ease-out 
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          ${style === "minimal" ? "w-10 h-10 rounded-full border border-foreground/50" : ""} 
          ${style === "candy" ? "w-14 h-14 rounded-full bg-primary/10 border-2 border-white/20" : "w-10 h-10 rounded-full border"}`}
        style={{
          borderColor: style === 'candy' ? undefined : (style === 'original' ? colors.followerBorder : undefined),
          backgroundColor: style === 'candy' ? undefined : (style === 'original' ? colors.followerBg : undefined),
          backdropFilter: style === 'minimal' ? 'invert(1)' : (style === 'candy' ? 'saturate(200%)' : undefined),
          WebkitBackdropFilter: style === 'minimal' ? 'invert(1)' : (style === 'candy' ? 'saturate(200%)' : undefined),
          boxShadow: style === 'candy' ? '4px 0 10px rgba(255,0,255,0.3), -4px 0 10px rgba(0,255,255,0.3)' : undefined,
          willChange: 'transform'
        }}
      />

      {/* Main Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-[opacity,background-color] duration-300 ease-out 
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          ${style === "candy" ? "w-4 h-4 bg-white shadow-[0_0_15px_#fff,0_0_30px_var(--primary)]" : "w-2.5 h-2.5"}`}
        style={{
          mixBlendMode: (style === 'minimal' || style === 'candy') ? 'difference' : 'normal',
          backgroundColor: (style === 'original') ? colors.dot : (style === 'minimal' ? '#ffffff' : (style === 'candy' ? '#ffffff' : undefined)),
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default CustomCursor;