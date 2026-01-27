"use client";

import { useLanguage } from '@/context/LanguageContext';

export function useTranslation(namespace?: string) {
    const { t: resources } = useLanguage();

    const t = (key: string) => {
        if (namespace) {
            return (resources as any)[namespace]?.[key] || key;
        }
        return (resources as any)[key] || key;
    };

    return t;
}
