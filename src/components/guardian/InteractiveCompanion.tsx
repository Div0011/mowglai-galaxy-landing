"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/* ── Page-specific config for SVG Companion ─────────────────────────────── */
const PAGE_CONFIG: Record<string, {
  message: string;
  corner: { bottom?: string; top?: string; left?: string; right?: string };
  size: number;
}> = {
  "/":          { message: "🐻 Welcome to Mowglai! Explore our services or click 'ENTER MOWGLAI' to see the main experience.", corner: { bottom: "40px", right: "40px" }, size: 90 },
  "/home":      { message: "🌿 Aapki digital duniya yahan se shuru hoti hai – Mowglai!", corner: { bottom: "40px", right: "40px" }, size: 90 },
  "/about":     { message: "🦁 Hamare baare mein jaanein – jungle ki tarah strong team!", corner: { top: "120px", right: "40px" }, size: 85  },
  "/services":  { message: "⚡ Har service ek weapon hai – apna chunein!",                corner: { bottom: "80px",  left: "40px"  }, size: 90  },
  "/explore":   { message: "🎨 300+ templates – apna sapna chunein, hum banayenge.",      corner: { bottom: "80px",  right: "40px" }, size: 90  },
  "/investment":{ message: "💰 Best ROI guarantee – aaj invest karein, kal results dekhen.", corner: { top: "120px", left: "40px" }, size: 85  },
  "/contact":   { message: "📩 Contact form sityaji ke paas chala gya hai – help karein!", corner: { bottom: "80px",  right: "40px" }, size: 95  },
  "/audit":     { message: "🔍 Free audit = free insights – website ki kami jaanein!",   corner: { top: "120px", right: "40px"   }, size: 85  },
  "/portfolio": { message: "🏆 Yeh kaam dekh ke hi samjhein – kyun Mowglai India ka best hai.", corner: { top: "120px", left: "40px" }, size: 85 },
};
const DEFAULT_CONFIG = PAGE_CONFIG["/landing"];

/* ── SVG Lion Mascot ──────────────────────────────────────────────────────── */
function LionSVG({ size, mouseX, mouseY }: { size: number; mouseX: number; mouseY: number }) {
  const eyeOffsetX = Math.max(-4, Math.min(4, (mouseX - 0.5) * 8));
  const eyeOffsetY = Math.max(-3, Math.min(3, (mouseY - 0.5) * 6));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 8px 24px rgba(212,160,23,0.4))" }}
    >
      <ellipse cx="60" cy="68" rx="50" ry="46" fill="#C17D11" />
      <ellipse cx="60" cy="65" rx="43" ry="39" fill="#E6A020" />
      <ellipse cx="23" cy="35" rx="13" ry="11" fill="#C17D11" transform="rotate(-20 23 35)" />
      <ellipse cx="23" cy="36" rx="8" ry="7" fill="#F5C842" transform="rotate(-20 23 36)" />
      <ellipse cx="97" cy="35" rx="13" ry="11" fill="#C17D11" transform="rotate(20 97 35)" />
      <ellipse cx="97" cy="36" rx="8" ry="7" fill="#F5C842" transform="rotate(20 97 36)" />
      <ellipse cx="60" cy="60" rx="36" ry="34" fill="#F5C842" />
      <path d="M55 32 Q60 26 65 32 Q62 38 60 40 Q58 38 55 32Z" fill="#E6A020" opacity="0.6" />
      <ellipse cx="45" cy="53" rx="9" ry="8" fill="white" />
      <ellipse cx="75" cy="53" rx="9" ry="8" fill="white" />
      <ellipse cx={45 + eyeOffsetX * 0.5} cy={53 + eyeOffsetY * 0.5} rx="6" ry="6.5" fill="#3B8A3E" />
      <ellipse cx={75 + eyeOffsetX * 0.5} cy={53 + eyeOffsetY * 0.5} rx="6" ry="6.5" fill="#3B8A3E" />
      <ellipse cx={45 + eyeOffsetX} cy={53 + eyeOffsetY} rx="3.5" ry="4" fill="#1a1a1a" />
      <ellipse cx={75 + eyeOffsetX} cy={53 + eyeOffsetY} rx="3.5" ry="4" fill="#1a1a1a" />
      <circle cx={43 + eyeOffsetX} cy={51 + eyeOffsetY} r="1.2" fill="white" />
      <circle cx={73 + eyeOffsetX} cy={51 + eyeOffsetY} r="1.2" fill="white" />
      <path d="M37 45 Q45 41 53 44" stroke="#C17D11" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M67 44 Q75 41 83 45" stroke="#C17D11" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="60" cy="68" rx="8" ry="5.5" fill="#C17D11" />
      <ellipse cx="60" cy="67" rx="5.5" ry="4" fill="#8B3E0A" />
      <ellipse cx="58" cy="66" rx="2" ry="1.3" fill="white" opacity="0.4" />
      <path d="M52 75 Q60 82 68 75" stroke="#8B3E0A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M60 75 L60 79" stroke="#8B3E0A" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="36" cy="68" rx="7" ry="5" fill="#E87D5A" opacity="0.35" />
      <ellipse cx="84" cy="68" rx="7" ry="5" fill="#E87D5A" opacity="0.35" />
      <circle cx="30" cy="68" r="1.5" fill="#C17D11" />
      <circle cx="35" cy="72" r="1.5" fill="#C17D11" />
      <circle cx="30" cy="76" r="1.5" fill="#C17D11" />
      <circle cx="90" cy="68" r="1.5" fill="#C17D11" />
      <circle cx="85" cy="72" r="1.5" fill="#C17D11" />
      <circle cx="90" cy="76" r="1.5" fill="#C17D11" />
      <text x="60" y="22" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#F5D061" fontFamily="serif" opacity="0.9">M</text>
    </svg>
  );
}

/* ── Chat Bubble ─────────────────────────────────────────────────────────── */
function ChatBubble({ message, visible, isLeft }: { message: string; visible: boolean; isLeft: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${isLeft ? "left-full ml-3" : "right-full mr-3"} top-1/2 -translate-y-1/2 w-[220px] z-10`}
          style={{ pointerEvents: "none" }}
        >
          <div className="relative bg-[#0a1a0e]/95 backdrop-blur-xl border border-[#F5D061]/30 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#0a1a0e]/95 border-[#F5D061]/30 rotate-45 ${
                isLeft ? "-left-1.5 border-b-0 border-r-0 border-l border-t" : "-right-1.5 border-t-0 border-l-0 border-r border-b"
              }`}
            />
            <div className="flex gap-2 items-start">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F5D061] to-[#C17D11] flex-shrink-0 flex items-center justify-center text-[9px] font-black text-[#0a0f0c]">M</span>
              <p className="text-[11px] font-body leading-relaxed text-white/90">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main Companion ──────────────────────────────────────────────────────── */
export default function InteractiveCompanion() {
  const pathname = usePathname();
  const config = PAGE_CONFIG[pathname] ?? DEFAULT_CONFIG;
  const [mounted, setMounted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setShowBubble(false);
    const show = setTimeout(() => setShowBubble(true), 1500);
    const hide = setTimeout(() => setShowBubble(false), 7500);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [pathname]);

  if (!mounted) return null;

  // On landing page (/), hide the SVG companion when user is near the top (since GLB 3D Lion is displayed in the hero section)
  // Show it only when scrolled down past the hero section (scrollY > 500)
  const isLandingPage = pathname === "/";
  const shouldHideOnHome = isLandingPage && scrollY < 500;

  const isLeft = !!(config.corner.left);

  return (
    <AnimatePresence>
      {!shouldHideOnHome && (
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[200] hidden md:flex items-center pointer-events-none"
          style={config.corner}
        >
          <div className="relative pointer-events-auto cursor-pointer">
            <ChatBubble message={config.message} visible={showBubble || isHovered} isLeft={isLeft} />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95, rotate: [0, -5, 5, 0] }}
            >
              <LionSVG size={config.size} mouseX={mousePos.x} mouseY={mousePos.y} />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-[#F5D061]/20 blur-xl"
              style={{ width: config.size * 0.7, height: 16 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
