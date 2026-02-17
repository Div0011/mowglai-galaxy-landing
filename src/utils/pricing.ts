
export const BASE_PRICES_USD = {
    basic: 499,
    advanced: 999,
    apex: 4999
};

// Helper to round prices to look "clean" (e.g. 41234 -> 41200 or 41000)
// Strategy: 
// < 1000: nearest 10
// < 10000: nearest 100
// >= 10000: nearest 1000
export const roundPrice = (price: number): number => {
    if (price < 1000) return Math.round(price / 10) * 10;
    if (price < 10000) return Math.round(price / 100) * 100;
    return Math.round(price / 1000) * 1000;
};

export const DEFAULT_CURRENCY = 'USD';

export const formatPrice = (amount: number, currency: string, locale: string = 'en-US'): string => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0,
        }).format(amount);
    } catch (e) {
        // Fallback for invalid currency codes
        return `${currency} ${amount.toLocaleString()}`;
    }
};
