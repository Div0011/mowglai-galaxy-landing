"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Language = "en" | "hi" | "es" | "fr";

interface Translations {
    SettingsToggle: {
        title: string;
        appearance: string;
        light: string;
        dark: string;
        system: string;
        language: string;
    };
    Common: {
        explore: string;
        agency: string;
        sayHello: string;
    };
}

const translations: Record<Language, Translations> = {
    en: {
        SettingsToggle: {
            title: "Settings",
            appearance: "Appearance",
            light: "Light",
            dark: "Dark",
            system: "System",
            language: "Language"
        },
        Common: {
            explore: "Explore",
            agency: "Agency",
            sayHello: "Say Hello"
        }
    },
    hi: {
        SettingsToggle: {
            title: "सेटिंग्स (Settings)",
            appearance: "रूप (Appearance)",
            light: "हल्का (Light)",
            dark: "गहरा (Dark)",
            system: "सिस्टम (System)",
            language: "भाषा (Language)"
        },
        Common: {
            explore: "एक्सप्लोर करें",
            agency: "एजेंसी",
            sayHello: "नमस्ते कहें"
        }
    },
    es: {
        SettingsToggle: {
            title: "Configuración",
            appearance: "Apariencia",
            light: "Claro",
            dark: "Oscuro",
            system: "Sistema",
            language: "Idioma"
        },
        Common: {
            explore: "Explorar",
            agency: "Agencia",
            sayHello: "Di Hola"
        }
    },
    fr: {
        SettingsToggle: {
            title: "Paramètres",
            appearance: "Apparence",
            light: "Clair",
            dark: "Sombre",
            system: "Système",
            language: "Langue"
        },
        Common: {
            explore: "Explorer",
            agency: "Agence",
            sayHello: "Dites Bonjour"
        }
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    // Persist language preference
    useEffect(() => {
        const saved = localStorage.getItem("language") as Language;
        if (saved && translations[saved]) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translations[language],
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
