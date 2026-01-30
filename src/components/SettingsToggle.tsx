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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLanguage, Language } from "@/context/LanguageContext";


const SettingsToggle = () => {
    const { setTheme, theme } = useTheme();
    const { language, setLanguage, t } = useLanguage();

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
                        <div className="relative w-5 h-5 flex items-center justify-center">
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
                                    <Moon className="w-5 h-5" />
                                ) : (
                                    <Sun className="w-5 h-5" />
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
                                <Languages className="w-5 h-5" />
                            </div>
                        </div>
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[300px] bg-background/95 backdrop-blur-xl border-primary/10 rounded-xl gap-4 p-5 data-[state=open]:slide-in-from-bottom-1/2 sm:data-[state=open]:slide-in-from-left-1/2">
                <DialogHeader>
                    <DialogTitle className="font-display text-lg tracking-wide">
                        {t.SettingsToggle.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Theme Selection */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {t.SettingsToggle.appearance}
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                            <Button
                                variant={theme === "light" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-1 h-auto py-2 rounded-lg transition-all duration-300",
                                    theme === "light" ? "border-primary shadow-sm scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setTheme("light")}
                            >
                                <Sun className="w-4 h-4" />
                                <span className="text-[10px]">{t.SettingsToggle.light}</span>
                            </Button>
                            <Button
                                variant={theme === "dark" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-1 h-auto py-2 rounded-lg transition-all duration-300",
                                    theme === "dark" ? "border-primary shadow-sm scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setTheme("dark")}
                            >
                                <Moon className="w-4 h-4" />
                                <span className="text-[10px]">{t.SettingsToggle.dark}</span>
                            </Button>
                            <Button
                                variant={theme === "system" ? "default" : "outline"}
                                className={cn(
                                    "flex flex-col items-center gap-1 h-auto py-2 rounded-lg transition-all duration-300",
                                    theme === "system" ? "border-primary shadow-sm scale-[1.02]" : "border-primary/20 hover:border-primary/50"
                                )}
                                onClick={() => setTheme("system")}
                            >
                                <Monitor className="w-4 h-4" />
                                <span className="text-[10px]">{t.SettingsToggle.system}</span>
                            </Button>
                        </div>
                    </div>

                    {/* Language Selection */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {t.SettingsToggle.language}
                        </h4>
                        <Select value={language} onValueChange={(val) => onSelectChange(val as Language)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {languages.map((lang) => (
                                    <SelectItem key={lang.code} value={lang.code}>
                                        <div className="flex items-center gap-2">
                                            <span>{lang.native}</span>
                                            <span className="text-muted-foreground text-xs">({lang.name})</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsToggle;
