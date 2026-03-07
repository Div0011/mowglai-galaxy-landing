import { describe, expect, it, mock } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

mock.module('@/styles/original/Home', () => ({
    default: () => <div>Mocked Home</div>,
}));

const { default: Home, metadata } = await import('./page');

describe('Home page', () => {
    it('exports SEO metadata', () => {
        expect(metadata.title).toContain('Mowglai');
        expect(metadata.openGraph?.url).toBe('https://mowglai.in/');
    });

    it('renders schema scripts and page content', () => {
        const html = renderToStaticMarkup(<Home />);

        expect(html).toContain('application/ld+json');
        expect(html).toContain('Mocked Home');
    });
});
