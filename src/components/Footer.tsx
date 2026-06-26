"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isAwake, setIsAwake] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const LeftEyeRef = useRef<SVGSVGElement>(null);
  const RightEyeRef = useRef<SVGSVGElement>(null);

  // Springs for smooth pupil tracking
  const pupilLeftX = useSpring(0, { stiffness: 180, damping: 18 });
  const pupilLeftY = useSpring(0, { stiffness: 180, damping: 18 });
  const pupilRightX = useSpring(0, { stiffness: 180, damping: 18 });
  const pupilRightY = useSpring(0, { stiffness: 180, damping: 18 });

  const leftLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "SERVICES", href: "/services" },
  ];

  const rightLinks = [
    { label: "PRODUCTS", href: "/explore" },
    { label: "PRICING", href: "/investment" },
    { label: "CONTACT", href: "/contact" },
  ];

  // Track cursor and move pupils when awake
  useEffect(() => {
    if (!isAwake) return;

    const handleMouseMove = (e: MouseEvent) => {
      const getOffset = (ref: React.RefObject<SVGSVGElement | null>) => {
        if (!ref.current) return { x: 0, y: 0 };
        const rect = ref.current.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Limit pupil movement to 10px to keep it inside the eye sclera
        const maxDist = 10;
        const angle = Math.atan2(dy, dx);
        const moveX = Math.cos(angle) * Math.min(dist * 0.04, maxDist);
        const moveY = Math.sin(angle) * Math.min(dist * 0.04, maxDist);

        return { x: moveX, y: moveY };
      };

      const left = getOffset(LeftEyeRef);
      const right = getOffset(RightEyeRef);

      pupilLeftX.set(left.x);
      pupilLeftY.set(left.y);
      pupilRightX.set(right.x);
      pupilRightY.set(right.y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAwake, pupilLeftX, pupilLeftY, pupilRightX, pupilRightY]);

  // Observer to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset awake state if user scrolls away from footer
  useEffect(() => {
    if (!isIntersecting) {
      setIsAwake(false);
    }
  }, [isIntersecting]);

  // GSAP ScrollTrigger to fade background to pitch black and hide overlay as footer scrolls in
  useEffect(() => {
    const initScrollTrigger = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (footerRef.current) {
        gsap.to(footerRef.current, {
          backgroundColor: "#000000",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          }
        });
      }

      if (bgOverlayRef.current) {
        gsap.to(bgOverlayRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          }
        });
      }
    };

    void initScrollTrigger();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="w-full bg-[#020804] border-t border-[#22c55e]/10 text-white/90 relative overflow-hidden
                 lg:sticky lg:bottom-0 lg:z-0 lg:h-screen lg:min-h-[750px] lg:flex lg:flex-col lg:justify-between"
    >
      {/* Background Gradient & Animated Blobs (Fades to black as scroll enters footer) */}
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05180c]/20 to-[#020804]" />
        <div className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-[#22c55e]/10 to-transparent blur-[120px] animate-pulse" style={{ animationDuration: "10s" }} />
        <div className="absolute bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-[#F5D061]/10 to-transparent blur-[150px] animate-pulse" style={{ animationDuration: "15s", animationDelay: "2s" }} />
      </div>

      {/* Interactive Floating Fireflies (Shown only when eyes wake up) */}
      {isAwake && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(18)].map((_, i) => {
            const size = Math.random() * 4 + 2; // 2px to 6px
            const delay = Math.random() * 5;
            const duration = Math.random() * 6 + 6; // 6s to 12s
            const left = Math.random() * 100; // 0% to 100%
            return (
              <motion.div
                key={i}
                initial={{ y: "105vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 0.7, 0.7, 0] }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full bg-gradient-to-t from-[#FFE600] to-[#22c55e]"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  filter: "blur(1px) drop-shadow(0 0 5px #FFE600)",
                }}
              />
            );
          })}
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-between py-12 relative z-10">
        
        {/* Spacer top bar */}
        <div className="hidden lg:block h-12" />

        {/* Center Grid: Left Column Links, Center Eyes, Right Column Links */}
        <div className="flex-grow flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-10 min-h-[400px]">
          
          {/* Left Column Links (Reveals when awake) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: isAwake ? 1 : 0, x: isAwake ? 0 : -35 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className={`flex flex-col items-center lg:items-end gap-6 justify-center min-w-[150px] transition-all
                       ${isAwake ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {leftLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="footer-option-link text-xl md:text-2xl tracking-widest">
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Interactive Eye Container */}
          <div className="flex flex-col items-center justify-center relative">
            <div
              onClick={() => setIsAwake(true)}
              className="cursor-pointer group/eyes relative select-none"
            >
              <div className="flex gap-12 md:gap-20 justify-center items-center">
                {/* Left Eye */}
                <motion.div
                  animate={{ scaleY: isAwake ? 1 : 0.08 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="origin-center"
                >
                  <svg
                    ref={LeftEyeRef}
                    width="130"
                    height="65"
                    viewBox="0 0 120 60"
                    className="overflow-visible"
                    style={{
                      filter: isAwake
                        ? "drop-shadow(0 0 20px rgba(255, 230, 0, 0.75))"
                        : "drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))",
                    }}
                  >
                    <defs>
                      <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFE600" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                    {/* Eyeball background path */}
                    <motion.path
                      d="M 10 22 C 45 8, 75 12, 110 36 C 75 44, 45 40, 10 22 Z"
                      animate={{ fill: isAwake ? "#FFE600" : "transparent" }}
                      transition={{ duration: 0.8 }}
                      stroke="url(#eyeGrad)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {/* Pupil */}
                    <motion.circle
                      cx="60"
                      cy="29"
                      r="9"
                      fill="black"
                      animate={{ opacity: isAwake ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ x: pupilLeftX, y: pupilLeftY }}
                    />
                  </svg>
                </motion.div>

                {/* Right Eye */}
                <motion.div
                  animate={{ scaleY: isAwake ? 1 : 0.08 }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="origin-center"
                >
                  <svg
                    ref={RightEyeRef}
                    width="130"
                    height="65"
                    viewBox="0 0 120 60"
                    className="overflow-visible"
                    style={{
                      filter: isAwake
                        ? "drop-shadow(0 0 20px rgba(255, 230, 0, 0.75))"
                        : "drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))",
                    }}
                  >
                    {/* Eyeball background path */}
                    <motion.path
                      d="M 10 36 C 45 12, 75 8, 110 22 C 75 40, 45 44, 10 36 Z"
                      animate={{ fill: isAwake ? "#FFE600" : "transparent" }}
                      transition={{ duration: 0.8 }}
                      stroke="url(#eyeGrad)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    {/* Pupil */}
                    <motion.circle
                      cx="60"
                      cy="29"
                      r="9"
                      fill="black"
                      animate={{ opacity: isAwake ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ x: pupilRightX, y: pupilRightY }}
                    />
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Tap helper (Removed when awake) */}
            <AnimatePresence>
              {!isAwake && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsAwake(true)}
                  className="absolute -bottom-8 text-[10px] font-mono uppercase tracking-[0.35em] text-[#FFE600]/50 hover:text-[#FFE600] animate-pulse cursor-pointer select-none transition-colors"
                >
                  tAP to wake me
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column Links (Reveals when awake) */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: isAwake ? 1 : 0, x: isAwake ? 0 : 35 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className={`flex flex-col items-center lg:items-start gap-6 justify-center min-w-[150px] transition-all
                       ${isAwake ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {rightLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="footer-option-link text-xl md:text-2xl tracking-widest">
                {link.label}
              </Link>
            ))}
          </motion.div>

        </div>

        {/* Bottom Section: MOWGLAI watermark text (Reveals when awake & hovered) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: isAwake ? 1 : 0, y: isAwake ? 0 : 35 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className={`w-full flex flex-col justify-end gap-8 transition-all
                     ${isAwake ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          {/* Watermark area: Completely hidden until hovered within the zone */}
          <div className="w-full flex items-center justify-center select-none py-6 group/watermark cursor-pointer">
            <h2 className="opacity-0 group-hover/watermark:opacity-100 text-[9.5vw] font-display font-black leading-none tracking-tighter uppercase transition-all duration-700 text-transparent bg-clip-text bg-gradient-to-r from-[#FFE600] via-[#22c55e] to-[#052e16] drop-shadow-[0_0_35px_rgba(255,230,0,0.65)]">
              MOWGLAI
            </h2>
          </div>

          {/* Legal Bar */}
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 select-none">
            <div className="font-light tracking-widest uppercase">
              © {currentYear} Mowglai. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-[#FFE600] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#FFE600] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;
