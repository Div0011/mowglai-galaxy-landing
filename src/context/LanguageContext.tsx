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
        est: string;
        deliveringElegance: string;
    };
    Home: {
        weCreate: string;
        the: string;
        extraordinary: string;
        introText: string;
        exploreDNA: string;
        purchase: string;
        templates: string;
        templateText: string;
        viewTemplates: string;
        readyToBegin: string;
        consultFree: string;
        studioStory: string;
        knowMore: string;
    };
    SelectedWork: {
        selected: string;
        work: string;
        collectionDesc: string;
        exploreCase: string;
        comingSoonTitle: string;
        comingSoonDesc: string;
    };
    AestheticShowcase: {
        aesthetic: { title: string; text: string };
        global: { title: string; text: string };
        fast: { title: string; text: string };
        deep: { title: string; text: string };
        mobile: { title: string; text: string };
        adaptation: { title: string; text: string };
        survival: { title: string; text: string };
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
            sayHello: "Say Hello",
            est: "EST.",
            deliveringElegance: "Delivering digital elegance."
        },
        Home: {
            weCreate: "WE CREATE",
            the: "THE",
            extraordinary: "EXTRAORDINARY",
            introText: "In a digital landscape crowded with the mundane, Mowglai Wild stands as a beacon of growth. We don't just build websites; we architect digital ecosystems that breathe life into your brand's vision.",
            exploreDNA: "Explore Our DNA",
            purchase: "Purchase",
            templates: "Templates",
            templateText: "Accelerate your launch with our premium, industry-specific website templates. Handcrafted for performance and designed to convert.",
            viewTemplates: "VIEW TEMPLATES",
            readyToBegin: "Ready to Begin the Journey?",
            consultFree: "Consult for Free",
            studioStory: "THE STUDIO STORY",
            knowMore: "Still not sure? Know more"
        },
        SelectedWork: {
            selected: "Selected",
            work: "Work",
            collectionDesc: "A curated collection of our most impactful digital voyages.",
            exploreCase: "EXPLORE CASE",
            comingSoonTitle: "Case Study Coming Soon",
            comingSoonDesc: "The case study for this project is currently being finalized. Check back shortly!"
        },
        AestheticShowcase: {
            aesthetic: { title: "Aesthetic", text: "Stunning Visuals" },
            global: { title: "Global", text: "Borderless Experiences" },
            fast: { title: "Fast", text: "Blazing Performance" },
            deep: { title: "Deep", text: "Simplified Complexity" },
            mobile: { title: "Mobile", text: "Flawless Everywhere" },
            adaptation: { title: "Adaptation", text: "Constant Evolution" },
            survival: { title: "Survival", text: "Resilient Code" }
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
            sayHello: "नमस्ते कहें",
            est: "स्थापित",
            deliveringElegance: "डिजिटल लालित्य प्रदान करना।"
        },
        Home: {
            weCreate: "हम बनाते हैं",
            the: "",
            extraordinary: "असाधारण",
            introText: "डिजिटल दुनिया में, मोगलाई वाइल्ड विकास का प्रतीक है। हम सिर्फ वेबसाइट नहीं बनाते; हम डिजिटल पारिस्थितिकी तंत्र का निर्माण करते हैं जो आपके ब्रांड में जान डाल देते हैं।",
            exploreDNA: "हमारा डीएनए देखें",
            purchase: "खरीदें",
            templates: "टेम्पलेट्स",
            templateText: "हमारे प्रीमियम, उद्योग-विशिष्ट वेबसाइट टेम्पलेट्स के साथ अपने लॉन्च में तेजी लाएं। प्रदर्शन के लिए हस्तशिल्प और रूपांतरित करने के लिए डिज़ाइन किया गया।",
            viewTemplates: "टेम्पलेट्स देखें",
            readyToBegin: "यात्रा शुरू करने के लिए तैयार?",
            consultFree: "निःशुल्क परामर्श",
            studioStory: "स्टूडियो की कहानी",
            knowMore: "अभी भी अनिश्चित हैं? और जानें"
        },
        SelectedWork: {
            selected: "चुनिंदा",
            work: "काम",
            collectionDesc: "हमारी सबसे प्रभावशाली डिजिटल यात्राओं का एक क्यूरेटेड संग्रह।",
            exploreCase: "केस देखें",
            comingSoonTitle: "केस स्टडी जल्द आ रही है",
            comingSoonDesc: "इस परियोजना के लिए केस स्टडी अभी अंतिम रूप दी जा रही है। शीघ्र ही देखें!"
        },
        AestheticShowcase: {
            aesthetic: { title: "सौंदर्य", text: "शानदार दृश्य" },
            global: { title: "वैश्विक", text: "सीमाहिन अनुभव" },
            fast: { title: "तेज़", text: "तेज़ प्रदर्शन" },
            deep: { title: "गहरा", text: "सरलीकृत जटिलता" },
            mobile: { title: "मोबाइल", text: "हर जगह निर्दोष" },
            adaptation: { title: "अनुकूलन", text: "निरंतर विकास" },
            survival: { title: "उत्तरजीविता", text: "लचीला कोड" }
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
            sayHello: "Di Hola",
            est: "Est.",
            deliveringElegance: "Ofreciendo elegancia digital."
        },
        Home: {
            weCreate: "CREAMOS",
            the: "LO",
            extraordinary: "EXTRAORDINARIO",
            introText: "En un paisaje digital lleno de lo mundano, Mowglai Wild se erige como un faro de crecimiento. No solo construimos sitios web; arquitectamos ecosistemas digitales que dan vida a la visión de su marca.",
            exploreDNA: "Explora Nuestro ADN",
            purchase: "Comprar",
            templates: "Plantillas",
            templateText: "Acelere su lanzamiento con nuestras plantillas web premium específicas para la industria.",
            viewTemplates: "VER PLANTILLAS",
            readyToBegin: "¿Listo para comenzar el viaje?",
            consultFree: "Consulta Gratis",
            studioStory: "LA HISTORIA DEL ESTUDIO",
            knowMore: "¿Aún no estás seguro? Saber más"
        },
        SelectedWork: {
            selected: "Trabajos",
            work: "Seleccionados",
            collectionDesc: "Una colección curada de nuestros viajes digitales más impactantes.",
            exploreCase: "EXPLORAR CASO",
            comingSoonTitle: "Estudio de Caso Próximamente",
            comingSoonDesc: "El estudio de caso para este proyecto se está finalizando actualmente."
        },
        AestheticShowcase: {
            aesthetic: { title: "Estética", text: "Visuales Impresionantes" },
            global: { title: "Global", text: "Experiencias Sin Fronteras" },
            fast: { title: "Rápido", text: "Rendimiento Increíble" },
            deep: { title: "Profundo", text: "Complejidad Simplificada" },
            mobile: { title: "Móvil", text: "Impecable en Todos Lados" },
            adaptation: { title: "Adaptación", text: "Evolución Constante" },
            survival: { title: "Supervivencia", text: "Código Resistente" }
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
            sayHello: "Dites Bonjour",
            est: "Est.",
            deliveringElegance: "Offrant l'élégance numérique."
        },
        Home: {
            weCreate: "NOUS CRÉONS",
            the: "L'",
            extraordinary: "EXTRAORDINAIRE",
            introText: "Dans un paysage numérique encombré, Mowglai Wild se dresse comme un phare. Nous construisons des écosystèmes numériques qui donnent vie à votre marque.",
            exploreDNA: "Explorer Notre ADN",
            purchase: "Acheter",
            templates: "Modèles",
            templateText: "Accélérez votre lancement avec nos modèles de sites Web premium.",
            viewTemplates: "VOIR LES MODÈLES",
            readyToBegin: "Prêt à commencer le voyage ?",
            consultFree: "Consultation Gratuite",
            studioStory: "L'HISTOIRE DU STUDIO",
            knowMore: "Pas encore sûr ? En savoir plus"
        },
        SelectedWork: {
            selected: "Travaux",
            work: "Sélectionnés",
            collectionDesc: "Une collection organisée de nos voyages numériques les plus percutants.",
            exploreCase: "EXPLORER LE CAS",
            comingSoonTitle: "Étude de Cas Bientôt",
            comingSoonDesc: "L'étude de cas pour ce projet est en cours de finalisation."
        },
        AestheticShowcase: {
            aesthetic: { title: "Esthétique", text: "Visuels Époustouflants" },
            global: { title: "Global", text: "Expériences Sans Frontières" },
            fast: { title: "Rapide", text: "Performance Fulgurante" },
            deep: { title: "Profond", text: "Complexité Simplifiée" },
            mobile: { title: "Mobile", text: "Impeccable Partout" },
            adaptation: { title: "Adaptation", text: "Évolution Constante" },
            survival: { title: "Survie", text: "Code Résilient" }
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
