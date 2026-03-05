import { describe, expect, it } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import NextPageButton from './NextPageButton';

describe('NextPageButton', () => {
    it('renders the CTA label and href', () => {
        const html = renderToStaticMarkup(
            <NextPageButton label="BLUEPRINT" href="/explore" />,
        );

        expect(html).toContain('BLUEPRINT');
        expect(html).toContain('href="/explore"');
    });

    it('renders optional tagline when provided', () => {
        const html = renderToStaticMarkup(
            <NextPageButton label="STORY" href="/about" tagline="Know more" />,
        );

        expect(html).toContain('Know more');
    });
});
