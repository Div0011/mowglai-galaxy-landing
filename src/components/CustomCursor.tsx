"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface ComicBlast {
  x: number;
  y: number;
  id: number;
  rotation: number;
  scale: number;
}

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [blasts, setBlasts] = useState<ComicBlast[]>([]);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

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

  // Respect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Set html class to hide default cursor
  useEffect(() => {
    if (isMobile || isReducedMotion) return;
    document.body.classList.add("custom-cursor-active");
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isMobile, isReducedMotion]);

  // Click state listeners (mousedown / mouseup)
  useEffect(() => {
    if (isMobile || isReducedMotion) return;

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, isReducedMotion]);

  // Initialize GSAP animations
  useEffect(() => {
    if (isMobile || isReducedMotion) return;

    // Set initial positions
    gsap.set(cursorRef.current, { xPercent: 0, yPercent: 0 });

    const cursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.08, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.08, ease: "power3.out" });

    // Animation loop using requestAnimationFrame
    const animate = () => {
      const { x, y } = mousePosRef.current;
      // Shift cursor by offset to align tip exactly with mouse coordinates
      // Finger tip is at (12px, 2px) relative to container top-left
      // Arrow tip is at (6px, 8px) relative to container top-left
      if (isPointer) {
        cursorX(x - 12);
        cursorY(y - 2);
      } else {
        cursorX(x - 6);
        cursorY(y - 8);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, isReducedMotion, isPointer]);

  // Mouse move handler with manual throttling for state updates
  useEffect(() => {
    if (isMobile || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      
      // Throttle state updates to ~30fps (33ms) to preserve performance
      const now = performance.now();
      if (now - lastUpdateRef.current < 33) return;
      lastUpdateRef.current = now;
      
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;

      // Find if we are hovering over an interactive element
      const isClickable = !!target.closest(
        "a, button, [role='button'], input, textarea, select, .group\\/logo, .cursor-pointer"
      );

      setIsPointer(prev => prev === isClickable ? prev : isClickable);
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
  }, [isMobile, isReducedMotion, isVisible]);

  // Click handler for comic blasts
  useEffect(() => {
    if (isMobile || isReducedMotion) return;

    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      const rotation = Math.floor(Math.random() * 30) - 15; // random rotation between -15 and +15
      const scale = 0.8 + Math.random() * 0.4; // random scale between 0.8 and 1.2
      setBlasts((prev) => [...prev, { x: e.clientX, y: e.clientY, id, rotation, scale }]);

      setTimeout(() => {
        setBlasts((prev) => prev.filter((b) => b.id !== id));
      }, 600);
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, [isMobile, isReducedMotion]);

  // Click squeeze animation for tactile feedback
  useEffect(() => {
    if (isMobile || isReducedMotion || !cursorRef.current) return;

    const scale = isClicked ? 0.82 : 1;

    gsap.to(cursorRef.current, {
      scale: scale,
      duration: 0.15,
      ease: "power2.out"
    });
  }, [isClicked, isMobile, isReducedMotion]);

  if (isMobile || isReducedMotion) return null;

  return (
    <>
      {/* Comic Click Blasts (Clean starburst overlays, no text) */}
      {blasts.map((blast) => (
        <div
          key={blast.id}
          className="fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 animate-comic-pop"
          style={{
            left: blast.x,
            top: blast.y,
            transform: `rotate(${blast.rotation}deg) scale(${blast.scale})`,
          }}
        >
          <svg width="110" height="110" viewBox="0 0 100 100" style={{ filter: "drop-shadow(0 0 6px rgba(234, 179, 8, 0.9))" }}>
            {/* Outer Orange Blast */}
            <path
              d="M 50 10 L 58 35 L 82 20 L 68 45 L 90 50 L 68 55 L 82 80 L 58 65 L 50 90 L 42 65 L 18 80 L 32 55 L 10 50 L 32 45 L 18 20 L 42 35 Z"
              fill="#F97316"
              stroke="black"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Inner Yellow Blast */}
            <path
              d="M 50 20 L 55 38 L 73 28 L 63 46 L 79 50 L 63 54 L 73 72 L 55 62 L 50 80 L 45 62 L 27 72 L 37 54 L 21 50 L 37 46 L 27 28 L 45 38 Z"
              fill="#FFE600"
              stroke="black"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ))}

      {/* Main Comic Pointer */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ease-out 
          ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          willChange: "transform"
        }}
      >
        {isPointer ? (
          /* Pointing Glove (Hover/Click clickable items) */
          <svg
            width="42"
            height="42"
            viewBox="0 0 32 32"
            style={{
              transform: "rotate(-35deg)",
              transformOrigin: "12px 2px",
              filter: "drop-shadow(0 0 6px rgba(253, 224, 71, 0.9)) drop-shadow(0 0 2px rgba(0, 0, 0, 0.4))"
            }}
          >
            <defs>
              <linearGradient id="gloveWhiteGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFE600" />
              </linearGradient>
            </defs>
            {/* 3D Black Offset Shadow */}
            <path
              d="M 12 2 C 10 2 9 3 9 5 L 9 14 C 8 14 7 14.5 6.5 15 C 6 15.5 5.5 16 5.5 17 C 5.5 18 6 18.5 6.5 19 C 7 19.5 8 19.5 8.5 19.5 C 8.5 20 9 20.5 9.5 21 C 10 21.5 11 21.5 11.5 21.5 C 11.5 22 12 22.5 12.5 22.8 C 13 23.1 14 23.1 14.5 23.1 L 18 23.1 C 21 23.1 23.5 21 24 18 L 24 13 C 24 11.5 23 10.5 21.5 10.5 C 21 10.5 20.5 10.7 20 11 L 20 9 C 20 7.5 19 6.5 17.5 6.5 C 17 6.5 16.5 6.7 16 7 L 16 5 C 16 3.5 15 2.5 13.5 2.5 C 13 2.5 12.5 2.7 12 3 Z"
              fill="black"
              transform="translate(2, 2)"
            />
            {/* Main Glove */}
            <path
              d="M 12 2 C 10 2 9 3 9 5 L 9 14 C 8 14 7 14.5 6.5 15 C 6 15.5 5.5 16 5.5 17 C 5.5 18 6 18.5 6.5 19 C 7 19.5 8 19.5 8.5 19.5 C 8.5 20 9 20.5 9.5 21 C 10 21.5 11 21.5 11.5 21.5 C 11.5 22 12 22.5 12.5 22.8 C 13 23.1 14 23.1 14.5 23.1 L 18 23.1 C 21 23.1 23.5 21 24 18 L 24 13 C 24 11.5 23 10.5 21.5 10.5 C 21 10.5 20.5 10.7 20 11 L 20 9 C 20 7.5 19 6.5 17.5 6.5 C 17 6.5 16.5 6.7 16 7 L 16 5 C 16 3.5 15 2.5 13.5 2.5 C 13 2.5 12.5 2.7 12 3 Z"
              fill="url(#gloveWhiteGrad)"
              stroke="black"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* 3 Glove Lines (Mickey Mouse style) */}
            <path d="M 14 11 L 14 16" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 17 11 L 17 16" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 20 12 L 20 16" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          /* 3D Arrow Pointer (Default state) */
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            style={{
              filter: "drop-shadow(0 0 6px rgba(253, 224, 71, 0.9)) drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))"
            }}
          >
            <defs>
              <linearGradient id="gloveYellowGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFE600" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
            {/* 3D Black Offset Shadow */}
            <path
              d="M 6 8 L 32 18 L 20 20 L 28 34 L 22 36 L 15 23 L 6 21 Z"
              fill="black"
              transform="translate(2.5, 2.5)"
            />
            {/* Main Arrow */}
            <path
              d="M 6 8 L 32 18 L 20 20 L 28 34 L 22 36 L 15 23 L 6 21 Z"
              fill="url(#gloveYellowGrad)"
              stroke="black"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Inside White Highlight */}
            <path
              d="M 9 11 L 15 20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
