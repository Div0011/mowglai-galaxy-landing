import { describe, expect, it } from 'bun:test';

import { formatPrice, roundPrice } from './pricing';

describe('roundPrice', () => {
    it('rounds values below 1000 to nearest 10', () => {
        expect(roundPrice(994)).toBe(990);
        expect(roundPrice(995)).toBe(1000);
    });

    it('rounds values below 10000 to nearest 100', () => {
        expect(roundPrice(1499)).toBe(1500);
        expect(roundPrice(1549)).toBe(1500);
    });

    it('rounds values at or above 10000 to nearest 1000', () => {
        expect(roundPrice(10499)).toBe(10000);
        expect(roundPrice(10500)).toBe(11000);
    });
});

describe('formatPrice', () => {
    it('formats USD values for a locale', () => {
        expect(formatPrice(499, 'USD', 'en-US')).toBe('$499');
    });

    it('falls back for invalid currency code', () => {
        expect(formatPrice(1200, 'BAD_CODE', 'en-US')).toBe('BAD_CODE 1,200');
    });
});
