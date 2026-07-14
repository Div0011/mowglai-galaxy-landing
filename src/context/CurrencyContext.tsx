"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyType = "USD" | "INR" | "EUR" | "GBP";

interface CurrencyContextProps {
    currency: CurrencyType;
    setCurrency: (currency: CurrencyType) => void;
    formatPrice: (priceStr: string | number) => string;
    convertVal: (usdVal: number) => { val: number; symbol: string };
}

const rates: Record<CurrencyType, number> = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    GBP: 0.79,
};

const symbols: Record<CurrencyType, string> = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
};

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrencyState] = useState<CurrencyType>("USD");

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("mowglai_currency") as CurrencyType;
        if (stored && rates[stored]) {
            setCurrencyState(stored);
        }
    }, []);

    const setCurrency = (cur: CurrencyType) => {
        setCurrencyState(cur);
        localStorage.setItem("mowglai_currency", cur);
    };

    const convertVal = (usdVal: number) => {
        const rate = rates[currency];
        const symbol = symbols[currency];
        return {
            val: Math.round(usdVal * rate),
            symbol,
        };
    };

    const formatPrice = (priceStr: string | number): string => {
        if (typeof priceStr === "number") {
            const { val, symbol } = convertVal(priceStr);
            return `${symbol}${val.toLocaleString()}`;
        }

        const cleanStr = priceStr.trim();

        // Check for non-numeric states
        if (cleanStr.toUpperCase() === "CUSTOM" || cleanStr.toUpperCase() === "COMING SOON" || cleanStr.toUpperCase() === "WAITLIST" || cleanStr.toUpperCase() === "PER FEATURE" || cleanStr.toUpperCase() === "FREE") {
            return cleanStr;
        }

        // Try parsing number
        // Extract numeric part (e.g. "$4,999+" -> 4999, "$15/mo" -> 15)
        const numericMatch = cleanStr.replace(/,/g, "").match(/\d+/);
        if (!numericMatch) {
            return cleanStr; // Fallback
        }

        const usdAmount = parseFloat(numericMatch[0]);
        const { val, symbol } = convertVal(usdAmount);

        // Reconstruct suffix (e.g., "/mo", "+", etc.)
        let suffix = "";
        if (cleanStr.toLowerCase().includes("/mo")) {
            suffix = "/mo";
        } else if (cleanStr.includes("+")) {
            suffix = "+";
        } else if (cleanStr.toLowerCase().includes("from")) {
            return `FROM ${symbol}${val.toLocaleString()}`;
        }

        return `${symbol}${val.toLocaleString()}${suffix}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertVal }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};
