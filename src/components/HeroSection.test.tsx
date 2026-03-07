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
    it('renders title and main CTAs', () => {
        const html = renderToStaticMarkup(<HeroSection />);

        expect(html).toContain('MOWGLAI');
        expect(html).toContain('START THE PROJECT');
        expect(html).toContain('GET FREE AUDIT');
        expect(html).toContain('href="/investment"');
        expect(html).toContain('href="/audit"');
    });

    it('renders translated subtitle text', () => {
        const html = renderToStaticMarkup(<HeroSection />);

        expect(html).toContain('Delivering digital elegance.');
    });
});
