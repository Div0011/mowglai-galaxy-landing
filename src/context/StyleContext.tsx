"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type VisualStyle = "original";

interface StyleContextType {
    style: VisualStyle;
    setStyle: (style: VisualStyle) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export function StyleProvider({ children }: { children: React.ReactNode }) {
    const [style, setStyle] = useState<VisualStyle>("original");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("visual-style", "original");

            const root = document.documentElement;
            const body = document.body;

            const classesToRemove = ["style-minimal", "style-candy"];
            root.classList.remove(...classesToRemove);
            body.classList.remove(...classesToRemove);

            root.classList.add("style-original");
            body.classList.add("style-original");
            root.setAttribute("data-style", "original");
        }
    }, [mounted]);

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
