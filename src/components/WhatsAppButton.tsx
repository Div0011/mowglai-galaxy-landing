"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
    // Actual Mowglai contact details
    const phoneNumber = "919452476331";
    // Pre-filled message from Get in Touch section
    const message = "Hi, I’m interested in Mowglai’s web & digital experience services. I’d like a quote and next steps.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-[calc(0.875rem+env(safe-area-inset-right))] md:bottom-[calc(7rem+env(safe-area-inset-bottom))] md:right-[calc(2rem+env(safe-area-inset-right))] z-[60]">
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "relative group w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(37,211,102,0.4)] backdrop-blur-md border border-white/20",
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Contact us on WhatsApp"
            >
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40" />
                <MessageCircle className="w-7 h-7 md:w-8 md:h-8 z-10 fill-current" />
            </motion.a>
        </div>
    );
};

export default WhatsAppButton;
