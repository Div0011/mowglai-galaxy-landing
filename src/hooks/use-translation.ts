"use client";

import { useLanguage } from '@/context/LanguageContext';

export function useTranslation(namespace?: string) {
    const { t: resources } = useLanguage();

    const t = (key: string) => {
        if (namespace) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return (resources as any)[namespace]?.[key] || key;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (resources as any)[key] || key;
    };

    return t;
}
