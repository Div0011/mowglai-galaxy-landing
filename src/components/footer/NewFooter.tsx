"use client";

import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import MowglaiLogo from "../MowglaiLogo";

export default function NewFooter() {
  return (
    <footer className="relative border-t border-primary/10 bg-background pt-20 pb-10 z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <div className="w-32 mb-6">
              <MowglaiLogo className="w-full h-auto text-primary" />
            </div>
            <p className="text-foreground/70 font-body max-w-sm">
              We build modern, fast and AI-powered websites that help businesses grow online. Your window to the digital world.
            </p>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-widest text-sm font-display">Quick Links</h4>
            <ul className="space-y-4 text-foreground/70 font-body">
              <li><a href="#" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-6 uppercase tracking-widest text-sm font-display">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50 font-body">
          <p>© {new Date().getFullYear()} Mowglai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
