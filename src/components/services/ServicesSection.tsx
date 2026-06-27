"use client";

import { motion } from "framer-motion";
import Magnetic from "../Magnetic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TextReveal from "@/components/TextReveal";

const currentServices = [
  {
    title: "Website Design",
    description: "Modern, user-focused websites that leave a lasting impression.",
  },
  {
    title: "Landing Pages",
    description: "High-converting landing pages built for advertising campaigns.",
  },
  {
    title: "E-Commerce Websites",
    description: "Fast, secure online stores with seamless shopping experiences.",
  },
  {
    title: "Website Redesign",
    description: "Transform outdated websites into modern digital assets.",
  }
];

const futureServices = [
  "AI Automation",
  "SEO",
  "WhatsApp Automation",
  "Business Systems"
];

export default function ServicesSection() {
  return (
    <section className="relative py-32 z-10 bg-transparent">
      {/* Smart Companion Waypoint (Empty space for the 3D animal) */}
      <div className="absolute right-10 top-32 w-[300px] h-[400px] companion-waypoint pointer-events-none" />
      
      <div className="container mx-auto px-6">
        


        {/* Services Grid */}
        <div className="mb-20">
          <TextReveal 
            text="Services"
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {currentServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,208,97,0.15)]"
              >
                <h4 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors font-display">{service.title}</h4>
                <p className="text-foreground/70 leading-relaxed font-body">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Services */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-foreground/50 mb-8 uppercase tracking-widest font-display"
          >
            Future Services
          </motion.h3>
          <div className="flex flex-wrap gap-4">
            {futureServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="px-6 py-3 rounded-full bg-card border border-primary/20 text-foreground/80 font-medium font-body"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
