import { describe, expect, it } from 'bun:test';

import { cn } from './utils';

describe('cn', () => {
    it('merges class names and resolves tailwind conflicts', () => {
        expect(cn('p-2', 'p-4', 'text-white', 'text-black')).toBe('p-4 text-black');
    });

    it('ignores falsey values', () => {
        expect(cn('block', '', undefined, null)).toBe('block');
    });
});
