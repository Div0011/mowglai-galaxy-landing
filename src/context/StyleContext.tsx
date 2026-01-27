"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type VisualStyle = "original" | "minimal" | "candy";

interface StyleContextType {
    style: VisualStyle;
    setStyle: (style: VisualStyle) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: React.ReactNode }) {
    const [style, setStyle] = useState<VisualStyle>("original");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedStyle = localStorage.getItem("visual-style") as VisualStyle;
        if (savedStyle && ["original", "minimal", "candy"].includes(savedStyle)) {
            setStyle(savedStyle);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("visual-style", style);

            // Update body class for global CSS variable overrides
            document.body.classList.remove("style-original", "style-minimal", "style-candy");
            document.body.classList.add(`style-${style}`);
        }
    }, [style, mounted]);

    // Avoid hydration mismatch by rendering children only after mount, 
    // or just accept that server renders default and client updates it.
    // For style changes that affect layout significantly, a loading state might be better
    // or just initial render matches server (default).

    return (
        <StyleContext.Provider value={{ style, setStyle }}>
            {children}
        </StyleContext.Provider>
    );
}

export function useStyle() {
    const context = useContext(StyleContext);
    if (context === undefined) {
        throw new Error("useStyle must be used within a StyleProvider");
    }
    return context;
}
