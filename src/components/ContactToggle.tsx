"use client";

import { MessageCircle, Bot, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import dynamic from "next/dynamic";

const ChatbotModal = dynamic(() => import("@/components/ChatbotModal"), { ssr: false });

const ContactToggle = () => {
    const { resolvedTheme } = useTheme();
    const { t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [showChatIcon, setShowChatIcon] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const phoneNumber = "919452476331";
    const message = "Hi, I'm interested in Mowglai's web & digital experience services. I'd like a quote and next steps.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Cycle icons every 2 seconds
    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setShowChatIcon((prev) => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleChatClick = () => {
        setIsPopoverOpen(false);
        setTimeout(() => setIsChatOpen(true), 150);
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(0.875rem+env(safe-area-inset-right))] md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:right-[calc(2rem+env(safe-area-inset-right))] z-[60] flex items-center justify-center">
                        <button
                            className={cn(
                                "w-14 h-14 md:w-16 md:h-16 rounded-full border border-primary/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]",
                                resolvedTheme === "light"
                                    ? "bg-primary/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary"
                                    : "bg-primary/10 text-primary hover:bg-primary/20"
                            )}
                            aria-label={isPopoverOpen ? "Close menu" : "Contact Options"}
                        >
                            <div className="relative w-5 h-5 flex items-center justify-center">
                                {/* Close X Icon - Shows when popover is open */}
                                <div
                                    className={cn(
                                        "absolute inset-0 transition-all duration-300 transform flex items-center justify-center",
                                        isPopoverOpen
                                            ? "rotate-0 opacity-100 scale-100"
                                            : "-rotate-90 opacity-0 scale-50"
                                    )}
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </div>

                                {/* WhatsApp Icon - Shows when popover is closed */}
                                <div
                                    className={cn(
                                        "absolute inset-0 transition-all duration-300 transform flex items-center justify-center",
                                        isPopoverOpen
                                            ? "rotate-90 opacity-0 scale-50"
                                            : showChatIcon
                                                ? "rotate-90 opacity-0 scale-50"
                                                : "rotate-0 opacity-100 scale-100"
                                    )}
                                >
                                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                                </div>

                                {/* Bot Icon - Shows when popover is closed */}
                                <div
                                    className={cn(
                                        "absolute inset-0 transition-all duration-300 transform flex items-center justify-center",
                                        isPopoverOpen
                                            ? "-rotate-90 opacity-0 scale-50"
                                            : !showChatIcon
                                                ? "-rotate-90 opacity-0 scale-50"
                                                : "rotate-0 opacity-100 scale-100"
                                    )}
                                >
                                    <Bot className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                            </div>
                        </button>
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    side="top"
                    align="end"
                    sideOffset={12}
                    className="w-[280px] bg-background/95 backdrop-blur-xl border-primary/10 rounded-xl p-4 shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)]"
                >
                    <div className="space-y-3">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                            Get in Touch
                        </h4>

                        {/* WhatsApp Option */}
                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors shrink-0">
                                <MessageCircle className="w-5 h-5 text-[#25D366] fill-current" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-sm">WhatsApp</div>
                                <div className="text-xs text-muted-foreground">Quick reply on mobile</div>
                            </div>
                        </motion.a>

                        {/* AI Chat Option */}
                        <motion.button
                            className="w-full flex items-center gap-3 p-3 rounded-xl border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group text-left"
                            onClick={handleChatClick}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors shrink-0">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <div className="font-medium text-sm">AI Assistant</div>
                                <div className="text-xs text-muted-foreground">Chat with Mowglai Guardian</div>
                            </div>
                        </motion.button>
                    </div>
                </PopoverContent>
            </Popover>

            <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
};

export default ContactToggle;
