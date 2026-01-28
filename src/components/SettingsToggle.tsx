"use client";

import { Moon, Sun, Languages, Monitor, Check, Palette, Minimize2, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useStyle } from "@/context/StyleContext";

const SettingsToggle = () => {
    const { setTheme, theme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const { style, setStyle } = useStyle();

    const [mounted, setMounted] = useState(false);
    const [showLanguageIcon, setShowLanguageIcon] = useState(false);

    // Cycle icons every 2 seconds
    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setShowLanguageIcon((prev) => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return null;
    }

    const onSelectChange = (nextLocale: Language) => {
        setLanguage(nextLocale);
    };

    const languages = [
        { code: "en", name: "English", native: "English" },
        { code: "hi", name: "Hindi", native: "हिन्दी" },
        { code: "es", name: "Spanish", native: "Español" },
        { code: "fr", name: "French", native: "Français" },
        { code: "ja", name: "Japanese", native: "日本語" },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-[calc(0.875rem+env(safe-area-inset-left))] md:bottom-[calc(2rem+env(safe-area-inset-bottom))] md:left-[calc(2rem+env(safe-area-inset-left))] z-[60] flex items-center justify-center">
                    <button
                        className={cn(
                            "w-14 h-14 md:w-16 md:h-16 rounded-full border border-primary/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]",
                            // Light Mode: Translucent Gold BG, Green Icon -> Hover: Translucent Green BG, Gold Icon
                            theme === "light"
                                ? "bg-primary/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary"
                                : "bg-background/5 text-primary hover:bg-primary/10 hover:border-primary/50"
                        )}
                        aria-label="Toggle Theme & Language"
                    >
                        <div className="relative w-6 h-6 flex items-center justify-center">
                            {/* Theme Icons */}
                            <div
                                className={cn(
                                    "absolute inset-0 transition-all duration-500 transform",
                                    showLanguageIcon
                                        ? "rotate-90 opacity-0 scale-50"
                                        : "rotate-0 opacity-100 scale-100"
                                )}
                            >
                                {theme === "dark" ? (
                                    <Moon className="w-6 h-6" />
                                ) : (
                                    <Sun className="w-6 h-6" />
                                )}
                            </div>

                            {/* Language Icon */}
                            <div
                                className={cn(
                                    "absolute inset-0 transition-all duration-500 transform",
                                    !showLanguageIcon
                                        ? "-rotate-90 opacity-0 scale-50"
                                        : "rotate-0 opacity-100 scale-100"
                                )}
                            >
                                <Languages className="w-6 h-6" />
                            </div>
                        </div>
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-md bg-background/95 backdrop-blur-xl border-primary/10 rounded-2xl data-[state=open]:slide-in-from-bottom-1/2 sm:data-[state=open]:slide-in-from-left-1/2">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl tracking-wide">
                        {t.SettingsToggle.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Theme Selection */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {t.SettingsToggle.appearance}
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                variant={theme === "light" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-2 h-auto py-4 rounded-xl transition-all duration-300",
                                    theme === "light" ? "border-primary shadow-md scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setTheme("light")}
                            >
                                <Sun className="w-5 h-5" />
                                <span className="text-xs">{t.SettingsToggle.light}</span>
                            </Button>
                            <Button
                                variant={theme === "dark" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-2 h-auto py-4 rounded-xl transition-all duration-300",
                                    theme === "dark" ? "border-primary shadow-md scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setTheme("dark")}
                            >
                                <Moon className="w-5 h-5" />
                                <span className="text-xs">{t.SettingsToggle.dark}</span>
                            </Button>
                            <Button
                                variant={theme === "system" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-2 h-auto py-4 rounded-xl transition-all duration-300",
                                    theme === "system" ? "border-primary shadow-md scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setTheme("system")}
                            >
                                <Monitor className="w-5 h-5" />
                                <span className="text-xs">{t.SettingsToggle.system}</span>
                            </Button>
                        </div>
                    </div>

                    {/* Style Selection */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            Visual Style
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                variant={style === "original" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-2 h-auto py-4 rounded-xl transition-all duration-300",
                                    style === "original" ? "border-primary shadow-md scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setStyle("original")}
                            >
                                <Palette className="w-5 h-5" />
                                <span className="text-xs">Original</span>
                            </Button>
                            <Button
                                variant={style === "minimal" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-2 h-auto py-4 rounded-xl transition-all duration-300",
                                    style === "minimal" ? "border-primary shadow-md scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setStyle("minimal")}
                            >
                                <Minimize2 className="w-5 h-5" />
                                <span className="text-xs">Minimal</span>
                            </Button>
                            <Button
                                variant={style === "candy" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-2 h-auto py-4 rounded-xl transition-all duration-300",
                                    style === "candy" ? "border-primary shadow-md scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setStyle("candy")}
                            >
                                <Zap className="w-5 h-5 text-pink-500" />
                                <span className="text-xs">Candy</span>
                            </Button>
                        </div>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {t.SettingsToggle.language}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                            {languages.map((lang) => (
                                <Button
                                    key={lang.code}
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-between hover:bg-primary/5 rounded-xl h-12",
                                        language === lang.code && "bg-primary/5 border border-primary/20"
                                    )}
                                    onClick={() => onSelectChange(lang.code as Language)}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-display font-bold w-8 text-center text-primary/80 bg-primary/10 rounded-md py-1 text-xs">
                                            {lang.code.toUpperCase()}
                                        </span>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-medium leading-none mb-0.5">{lang.native}</span>
                                            <span className="text-[10px] text-muted-foreground leading-none">
                                                {lang.name}
                                            </span>
                                        </div>
                                    </div>
                                    {language === lang.code && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Windows Performance Note */}
                    <div className="pt-4 border-t border-primary/10">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 leading-relaxed text-center px-4">
                            Windows User Note: For the most fluid animations, we recommend using Chromium-based browsers (Chrome/Edge).
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsToggle;
