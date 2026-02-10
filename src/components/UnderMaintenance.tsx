"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Construction, Clock, ArrowLeft, Sparkles, Mail, Phone, MessageCircle, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import StarryBackground from "./StarryBackground";
import CustomCursor from "./CustomCursor";

const CONTACT_EMAIL = "info@mowglai.in";
const WHATSAPP_NUMBER = "919528545302";
const PHONE_NUMBER = "+91 95285 45302";

const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/mowglai_in", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
];

const UnderMaintenance = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            <CustomCursor />
            <StarryBackground />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 min-h-screen flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 flex flex-col items-center justify-center px-6 py-20"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                        <div className="relative p-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                            <Construction className="w-16 h-16 text-primary" strokeWidth={1.5} />
                        </div>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -right-4"
                        >
                            <Sparkles className="w-6 h-6 text-primary/60" />
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-10 text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground text-center"
                    >
                        Under Maintenance
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-6 text-lg md:text-xl text-foreground/70 font-body text-center max-w-xl"
                    >
                        We&apos;re currently working on something amazing. Please check back soon.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/50 border border-border"
                    >
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-foreground/80 font-body">
                            We&apos;ll be back shortly
                        </span>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mt-12"
                    >
                        <Link
                            href="/"
                            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-body font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                        >
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            Back to Home
                        </Link>
                    </motion.div> */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-sm text-foreground/50 font-body mb-6 uppercase tracking-widest">
                            Till then, connect with us
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:scale-105"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span className="font-body font-medium">WhatsApp</span>
                            </a>

                            <a
                                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                                <span className="font-body font-medium">{PHONE_NUMBER}</span>
                            </a>

                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                className="group flex items-center gap-2 px-5 py-3 rounded-full bg-accent/10 border border-accent/30 text-accent transition-all duration-300 hover:bg-accent hover:text-white hover:scale-105"
                            >
                                <Mail className="w-5 h-5" />
                                <span className="font-body font-medium">{CONTACT_EMAIL}</span>
                            </a>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-4 mb-12">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-background hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="w-full py-8 text-center text-foreground/40 text-sm font-body"
                >
                    <span className="tracking-widest uppercase">MOWGLAI</span>
                    <span className="mx-2">|</span>
                    <span>{new Date().getFullYear()}</span>
                </motion.footer>
            </div>
        </div>
    );
};

export default UnderMaintenance;
