"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import Magnetic from "../Magnetic";
import Link from "next/link";
import HeroLionGLB from "./HeroLionGLB";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 bg-background">
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Typography */}
        <div className="flex flex-col space-y-8 max-w-2xl pt-10 lg:pt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl font-display font-black leading-tight text-foreground"
          >
            Your Website is Your Window to the World.
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-2xl md:text-3xl font-light text-jungle-gold"
          >
            Make it Count.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg text-foreground/70 font-body max-w-lg leading-relaxed"
          >
            We build modern, fast and AI-powered websites that help businesses grow online.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Magnetic>
              <Link
                  href="/start-project"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-card/40 backdrop-blur-md border border-[#F5D061]/20 text-[#F5D061] text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(245,208,97,0.3)] hover:border-[#F5D061]/50"
              >
                  <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#F5D061] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>
                  <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                  href="/portfolio"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-background/10 backdrop-blur-xl border border-primary/10 text-primary text-sm sm:text-lg font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-700 hover:border-primary/40"
              >
                  <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[#D4AF37] to-[#14532d] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground">
                      View Work
                      <Eye className="w-5 h-5 transition-all duration-500 group-hover:scale-110" />
                  </span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side: 3D GLB Model inside its starting right corner box */}
        <div className="hidden lg:block relative h-[400px] lg:h-[600px] w-full z-0 lg:z-50 pointer-events-none lg:pointer-events-auto">
          <HeroLionGLB />
        </div>
      </div>
    </section>
  );
}
