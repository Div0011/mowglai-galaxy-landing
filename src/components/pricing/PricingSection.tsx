"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Magnetic from "../Magnetic";

const plans = [
  {
    name: "Starter",
    price: "$999",
    description: "Perfect for small businesses establishing their online presence.",
    features: ["5 Page Website", "Mobile Responsive", "Basic SEO Setup", "Contact Form", "1 Month Support"],
    popular: false
  },
  {
    name: "Professional",
    price: "$2,499",
    description: "Ideal for growing companies needing advanced functionality.",
    features: ["10+ Page Website", "Custom Animations", "Advanced SEO", "CMS Integration", "E-Commerce Ready", "3 Months Support"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-scale digital platforms for large organizations.",
    features: ["Unlimited Pages", "3D Web Experiences", "Custom Web App", "Full Backend Systems", "Priority Support 24/7", "Dedicated Manager"],
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section className="relative py-32 z-10 bg-background/95">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/70 font-body max-w-2xl mx-auto"
          >
            Transparent pricing for world-class digital products. No hidden fees.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`relative p-8 rounded-3xl border flex flex-col ${
                plan.popular 
                  ? "bg-card border-primary shadow-[0_0_40px_rgba(245,208,97,0.15)]" 
                  : "glass-card border-primary/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-foreground/60 font-body text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-display font-bold text-jungle-gold">{plan.price}</span>
              </div>
              
              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check size={14} className="text-primary" />
                    </div>
                    <span className="text-foreground/80 font-body text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Magnetic>
                <button className={`w-full py-4 rounded-full font-bold tracking-widest uppercase text-sm transition-all duration-300 ${
                  plan.popular 
                    ? "bg-primary hover:brightness-110 text-primary-foreground shadow-[0_0_20px_rgba(245,208,97,0.2)]" 
                    : "bg-card/50 hover:bg-card border border-primary/20 text-foreground"
                }`}>
                  {plan.price === "Custom" ? "Contact Us" : "Get Started"}
                </button>
              </Magnetic>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
