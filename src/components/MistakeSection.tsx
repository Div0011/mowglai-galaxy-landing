"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export default function MistakeSection() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden py-24">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#14532d]/10 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4ade80]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Smart Companion Waypoint (Empty space for the 3D animal) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[300px] h-[400px] companion-waypoint pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-6"
          >
            <Globe className="w-5 h-5 text-[#4ade80]" />
            <span className="text-[#4ade80] font-display uppercase tracking-widest text-sm font-bold">
              The Digital Reality
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-7xl font-display font-black text-white leading-[1.1] tracking-tight mb-8"
          >
            "If You Are Not On The Internet,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#22c55e]">
              You Are Making A Mistake.
            </span>"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-sans"
          >
            In today's hyper-connected world, your website is your digital storefront. 
            We build immersive, high-performance web experiences that turn visitors into loyal customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#4ade80] text-[#14532d] font-display font-bold uppercase tracking-wider overflow-hidden rounded-full transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                href="#portfolio"
                className="group inline-flex items-center justify-center px-8 py-4 text-white font-display font-bold uppercase tracking-wider transition-colors hover:text-[#4ade80]"
              >
                <span className="relative flex items-center gap-2">
                  View Portfolio
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#4ade80] group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            </Magnetic>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
