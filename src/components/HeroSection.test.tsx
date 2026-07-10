import { describe, expect, it, mock } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';

mock.module('./TextReveal', () => ({
    default: ({ text }: { text: string }) => <span>{text}</span>,
}));

mock.module('./Magnetic', () => ({
    default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

mock.module('../context/LanguageContext', () => ({
    useLanguage: () => ({
        t: {
            Common: {
                deliveringElegance: 'Delivering digital elegance.',
            },
        },
    }),
}));

const { default: HeroSection } = await import('./HeroSection');

describe('HeroSection', () => {
    it('renders title and main elements', () => {
        const html = renderToStaticMarkup(<HeroSection />);

        expect(html).not.toContain('MOWGLAI');
        expect(html).toContain('YOUR');
        expect(html).toContain('WEBSITE');
        expect(html).toContain('WINDOW');
        expect(html).toContain('WORLD.');
        expect(html).toContain('START');
        expect(html).toContain('PROJECT');
        expect(html).toContain('GET FREE');
        expect(html).toContain('AUDIT');
        expect(html).toContain('href="/investment"');
        expect(html).toContain('href="/audit"');
    });
});
