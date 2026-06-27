"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function JungleBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050B08]">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a120e] via-[#050B08] to-black opacity-90 z-10" />

      {/* Fog elements */}
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-[200%] h-[60%] opacity-30 z-20"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(20, 50, 35, 0.4) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        animate={{
          x: ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 40,
          ease: "linear",
        }}
        className="absolute top-1/4 left-0 w-[200%] h-[50%] opacity-20 z-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(30, 60, 45, 0.3) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Soft Light Point */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full z-10"
        style={{
          background: "radial-gradient(circle, rgba(144, 238, 144, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating Particles Simulation using Framer Motion */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-200 rounded-full z-20"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 2,
          }}
          animate={{
            y: ["0vh", "-20vh"],
            opacity: [0, 0.8, 0],
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 20 - 10}vw)`,
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 10 + 10,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          style={{ filter: "blur(1px)" }}
        />
      ))}
    </div>
  );
}
