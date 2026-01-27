
const dictionaries = {
    en: () => import('@/messages/en.json').then((module) => module.default),
    hi: () => import('@/messages/hi.json').then((module) => module.default),
    es: () => import('@/messages/es.json').then((module) => module.default),
    fr: () => import('@/messages/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => {
    return dictionaries[locale]();
};
