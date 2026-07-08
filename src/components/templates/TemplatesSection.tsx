"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "../Magnetic";

const categories = ["All", "Business", "Healthcare", "Construction", "Education", "Restaurant", "Portfolio", "Agency"];

const templates = [
  { id: 1, title: "Nexus Business", category: "Business", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "CarePlus", category: "Healthcare", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "BuildCore", category: "Construction", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "TasteBite", category: "Restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" },
];

export default function TemplatesSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <section className="relative py-32 z-10 bg-transparent">
      {/* Smart Companion Waypoint */}
      <div className="absolute right-10 top-1/4 w-[250px] h-[400px] companion-waypoint pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Templates
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {categories.map((cat) => (
              <Magnetic key={cat}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(245,208,97,0.3)]" 
                      : "bg-card/50 text-foreground/70 hover:bg-card hover:text-foreground border border-primary/10"
                  }`}
                >
                  {cat}
                </button>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card overflow-hidden group border border-primary/10"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                  <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:brightness-110 transition-all w-3/4 text-sm tracking-widest uppercase">
                    Use Template
                  </button>
                  <button className="px-6 py-3 bg-card/80 backdrop-blur border border-primary/20 text-foreground font-bold rounded-full hover:bg-card transition-colors w-3/4 text-sm tracking-widest uppercase">
                    Live Demo
                  </button>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-jungle-gold mb-1 font-bold tracking-widest uppercase">{template.category}</p>
                <h4 className="text-lg font-display font-semibold text-foreground">{template.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
