"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Magnetic from "../Magnetic";

export default function LeadFormSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to existing backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <section className="relative py-32 z-10 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
            >
              Let's Build Your <br/><span className="text-jungle-gold">Website.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/70 font-body text-lg mb-8"
            >
              Ready to dominate your industry? Fill out the form and our team will get back to you within 24 hours to schedule your free consultation.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10"
          >
            {success ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(245,208,97,0.3)]">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-display font-bold text-foreground mb-2">Request Received</h3>
                <p className="text-foreground/70 font-body">We'll be in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-foreground/80">Name</label>
                    <input required type="text" className="w-full bg-card/50 border border-primary/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all font-body" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-foreground/80">Business Name</label>
                    <input type="text" className="w-full bg-card/50 border border-primary/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all font-body" placeholder="Company Inc" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-foreground/80">Email</label>
                    <input required type="email" className="w-full bg-card/50 border border-primary/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all font-body" placeholder="john@company.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-foreground/80">Phone</label>
                    <input type="tel" className="w-full bg-card/50 border border-primary/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all font-body" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-foreground/80">Website URL</label>
                    <input type="url" className="w-full bg-card/50 border border-primary/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all font-body" placeholder="https://..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-foreground/80">Budget</label>
                    <select className="w-full bg-card/50 border border-primary/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all font-body appearance-none">
                      <option className="bg-card text-foreground" value="small">&lt; $5,000</option>
                      <option className="bg-card text-foreground" value="medium">$5,000 - $10,000</option>
                      <option className="bg-card text-foreground" value="large">$10,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wider uppercase text-foreground/80">Message</label>
                  <textarea required rows={4} className="w-full bg-card/50 border border-primary/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all font-body resize-none" placeholder="Tell us about your project goals..."></textarea>
                </div>

                <Magnetic>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#F5D061] text-primary-foreground font-bold tracking-widest uppercase rounded-xl hover:brightness-110 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-[0_0_30px_rgba(245,208,97,0.2)]"
                  >
                    {loading ? (
                      <span className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                    ) : "Book Free Consultation"}
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
