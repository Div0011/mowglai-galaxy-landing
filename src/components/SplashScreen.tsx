"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fading out after services are fully revealed
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2400);

    // Completely unmount to show main page
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  const letters = "MOWGLAI".split("");

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div 
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#020804] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient Jungle Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-[#22c55e]/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[400px] bg-[#F5D061]/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Animated Wordmark Blocks */}
            <div className="flex gap-1.5 sm:gap-3 md:gap-4 overflow-hidden py-4 px-2 sm:px-8">
              {letters.map((letter, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 120, rotateX: -90, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.05, 
                    ease: [0.34, 1.56, 0.64, 1] 
                  }}
                  className="w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <span className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-[#F5D061] drop-shadow-[0_0_15px_rgba(245,208,97,0.5)]">
                    {letter}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Animated Services */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 md:gap-5 max-w-[90vw] md:max-w-[70vw]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 1.2
                  }
                }
              }}
            >
              {["Web Development", "SaaS MVP", "Digital Agency", "3D Experiences"].map((service, idx) => (
                <motion.span
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } }
                  }}
                  className="font-body text-sm md:text-base lg:text-lg font-medium text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 px-5 py-2.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.15)] tracking-wide"
                >
                  {service}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
