"use client";

import { useLanguage } from '@/context/LanguageContext';

export function useTranslation(namespace?: string) {
    const { dictionary } = useLanguage();

    const t = (key: string) => {
        if (namespace) {
            return dictionary[namespace]?.[key] || key;
        }
        return dictionary[key] || key;
    };

    return t;
}
