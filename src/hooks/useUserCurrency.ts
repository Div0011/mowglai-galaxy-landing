
import { useState, useEffect } from 'react';
import { DEFAULT_CURRENCY } from '@/utils/pricing';

interface UserCurrencyState {
    currency: string;
    exchangeRate: number;
    locale: string; // for formatting
    isLoading: boolean;
    error: string | null;
}

export const useUserCurrency = (): UserCurrencyState => {
    const [state, setState] = useState<UserCurrencyState>({
        currency: DEFAULT_CURRENCY,
        exchangeRate: 1,
        locale: 'en-US',
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const fetchCurrencyData = async () => {
            try {
                // 1. Check Cache
                const cachedData = localStorage.getItem('currency_data');
                const cacheTimestamp = localStorage.getItem('currency_timestamp');
                const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

                if (cachedData && cacheTimestamp) {
                    const now = Date.now();
                    if (now - parseInt(cacheTimestamp) < CACHE_DURATION) {
                        setState({ ...JSON.parse(cachedData), isLoading: false, error: null });
                        return;
                    }
                }

                // 2. Fetch User Location & Currency Code
                const locationResponse = await fetch('https://ipapi.co/json/');
                if (!locationResponse.ok) throw new Error('Location fetch failed');
                const locationData = await locationResponse.json();
                const userCurrency = locationData.currency || DEFAULT_CURRENCY;
                // fallback locale based on country if possible, or just use en-US/user-agent
                // ipapi doesn't give locale, but we can try to guess or just let Intl handle it with 'undefined'
                // For now, let's store a locale that might be useful, or just rely on browser default for Intl

                // 3. Fetch Exchange Rates
                let rate = 1;
                if (userCurrency !== 'USD') {
                    const rateResponse = await fetch('https://open.er-api.com/v6/latest/USD');
                    if (!rateResponse.ok) throw new Error('Rate fetch failed');
                    const rateData = await rateResponse.json();
                    rate = rateData.rates[userCurrency] || 1;
                }

                const newState = {
                    currency: userCurrency,
                    exchangeRate: rate,
                    locale: 'en-US', // We'll let the component use browser default or specific logic if needed, but for now simple
                    isLoading: false,
                    error: null
                };

                localStorage.setItem('currency_data', JSON.stringify(newState));
                localStorage.setItem('currency_timestamp', Date.now().toString());

                setState(newState);

            } catch (err) {
                console.error('Currency fetch error:', err);
                setState(prev => ({ ...prev, isLoading: false, error: (err as Error).message }));
            }
        };

        fetchCurrencyData();
    }, []);

    return state;
};
