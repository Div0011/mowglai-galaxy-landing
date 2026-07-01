"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import MowglaiLogo from "@/components/MowglaiLogo";
import XLogo from "@/components/icons/XLogo";

const navLinks = [
    { label: "Home",      href: "/" },
    { label: "About",     href: "/about" },
    { label: "Services",  href: "/services" },
    { label: "Templates", href: "/explore" },
    { label: "Contact",   href: "/contact" },
];

const legalLinks = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Referral", href: "/referral" },
];

const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/mowglai.in",              label: "Instagram" },
    { icon: XLogo,     href: "https://x.com/mowglai_in",                          label: "X" },
    { icon: Linkedin,  href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
];

export default function ImmersiveFooter() {
    return (
        <footer className="relative w-full overflow-hidden bg-[#010402] text-white/80">
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(rgba(230,185,61,0.4) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                    <div className="md:col-span-5 space-y-5">
                        <Link href="/" className="inline-flex items-center gap-3 group">
                            <MowglaiLogo size="sm" />
                            <span className="font-display font-black text-xl tracking-wide text-primary">
                                MOWGLAI
                            </span>
                        </Link>
                        <p className="text-sm text-white/40 leading-relaxed max-w-xs font-light">
                            Crafting digital ecosystems that transcend boundaries. Global standards, local heart.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            {socialLinks.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-300"
                                >
                                    <s.icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-3 space-y-4">
                        <p className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-primary/70">
                            Navigate
                        </p>
                        <ul className="space-y-2.5">
                            {navLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/40 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group w-fit font-display uppercase tracking-wide"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 overflow-hidden" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-4 space-y-4">
                        <p className="text-[10px] font-display font-bold tracking-[0.35em] uppercase text-primary/70">
                            Legal
                        </p>
                        <ul className="space-y-2.5">
                            {legalLinks.map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/40 hover:text-primary transition-colors duration-200 flex items-center gap-1.5 group w-fit font-display uppercase tracking-wide"
                                    >
                                        <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 overflow-hidden" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4">
                            <Link
                                href="mailto:info@mowglai.com"
                                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors group w-fit font-display uppercase tracking-wide"
                            >
                                <Mail size={13} className="shrink-0 text-primary/70" />
                                <span>info@mowglai.com</span>
                                <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-20 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-[11px] text-white/25 font-display tracking-wider uppercase">
                        &copy; {new Date().getFullYear()} Mowglai. All rights reserved.
                    </span>
                    <div className="flex items-center gap-2 font-display text-[11px] text-white/25 tracking-wider uppercase">
                        <span>Noida, India</span>
                        <span className="text-white/10">·</span>
                        <span>mowglai.com</span>
                        <span className="text-white/10">·</span>
                        <Link href="mailto:info@mowglai.com" className="hover:text-primary transition-colors">info@mowglai.com</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
