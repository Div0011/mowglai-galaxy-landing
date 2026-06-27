"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import Magnetic from "../Magnetic";
import MowglaiLogo from "../MowglaiLogo";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Works", href: "#portfolio" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#020804]/80 backdrop-blur-md border-b border-[#22c55e]/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <MowglaiLogo size="md" variant="wordmark" className="h-8 w-auto text-white group-hover:scale-105 transition-transform" />
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm uppercase tracking-widest text-white/70 hover:text-[#F5D061] transition-colors duration-300 font-display font-bold group"
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-0 w-full h-[1.5px] bg-[#F5D061] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_8px_rgba(245,208,97,0.8)]" />
            </a>
          ))}
        </nav>

        {/* Right: CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Magnetic>
            <Link
              href="/start-project"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 bg-card/40 backdrop-blur-md border border-[#F5D061]/20 text-[#F5D061] text-xs font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(245,208,97,0.25)] hover:border-[#F5D061]/50"
            >
              <span className="absolute inset-0 w-0 h-full bg-gradient-to-r from-[#14532d] via-[#22c55e] to-[#F5D061] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full"></span>
              <span className="relative z-10 flex items-center gap-2">
                Start Project
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/80 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full bg-[#020804]/95 backdrop-blur-lg border-b border-[#22c55e]/10 py-8 px-6 flex flex-col gap-6 z-40 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg uppercase tracking-wider text-white/80 hover:text-[#F5D061] font-display font-bold"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/start-project"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-4 bg-[#22c55e] text-white font-display font-bold uppercase tracking-widest rounded-xl hover:bg-[#15803d] transition-colors"
          >
            Start Project
          </Link>
        </div>
      )}
    </header>
  );
}
