# Mowglai Project Context & Guidelines

## 1. Project Overview
**Mowglai** is a premium, high-performance digital agency website with a galaxy/jungle theme.
- **Goal**: Create a stunning, "wow" factor first impression using clean 3D aesthetics, deep dark modes, and fluid animations while maintaining maximum performance.
- **Key Experience**: Smooth transitions, immersive 3D elements, and a feeling of "exploring" the agency.

## 2. Architecture & File Structure
This project uses **Next.js 16 (App Router)** with a split structure:

### Directory Structure
- **`app/`**: Contains ONLY routes, layouts, and pages.
  - All files here are **Server Components** by default.
  - `page.tsx`, `layout.tsx`, `not-found.tsx`, `error.tsx`.
- **`src/`**: Contains all source code logic.
  - **`components/`**: All React components (UI, specific features).
  - **`lib/`**: Utilities, helpers, constants.
  - **`hooks/`**: Custom React hooks.
  - **`types/`**: TypeScript type definitions.
  - **`animations/`**: GSAP/Framer Motion animation configurations.
  - **`data/`**: Static data files (e.g., `templates.ts` for the template registry).
- **`public/`**: Static assets (images, fonts, 3D models).
  - **`previews/`**: Contains bespoke HTML template previews (e.g., `health-1.html`, `school-2.html`).

### Best Practices
- **Colocation**: Keep related logic together, but prefer the `src/` directory for reusable code.
- **Imports**: Use relative imports or configured aliases (check `tsconfig.json`).

## 3. Technology Stack
- **Framework**: Next.js 15 (React 19 RC)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS + Custom CSS Variables (`index.css`)
- **UI Library**: Shadcn UI (Radix Primitives)
- **Animations**:
  - **GSAP**: For complex, timeline-based sequences and scroll triggers.
  - **Framer Motion**: For simple UI interactions and exit transitions.
  - **AOS**: For simple scroll-into-view reveals.
- **3D**: Three.js (@react-three/fiber, @react-three/drei)
- **Icons**: Lucide React
- **Internationalization**: Custom React Context (`LanguageContext`) + Typed Dictionaries
- **Theming**: `next-themes` (Dark/Light/System modes)

## 4. Development Guidelines

### Server vs. Client Components
1. **Server Components (Default)**:
   - Use for fetching data, accessing backend resources, and static content.
   - **Do NOT** use `useState`, `useEffect`, or event listeners here.
2. **Client Components**:
   - Add `"use client"` at the very top of the file.
   - Use only when interactivity (state, effects, browser APIs) is strictly necessary.
   - Push client components down the tree (leaf nodes) to maximize server rendering.

### Performance Rules
1. **Images**: ALWAYS use `next/image`. Set `priority` for LCP images (above the fold).
2. **Heavy Libraries**: Load Three.js and heavy GSAP components lazily if possible, or ensure they don't block the main thread.
3. **Fonts**: Use `next/font` to optimize loading and prevent layout shift.

### Styling & Theming
- **Tailwind First**: Use utility classes for 90% of styling.
- **CSS Variables**: Use CSS variables in `index.css` for theme colors to support potential light/dark switch or dynamic theming.
- **Responsiveness**: Mobile-first approach. Test on small screens (iPhone SE/13 mini size) up to large desktops.
  - **Safe Areas**: Respect `safe-area-inset-*` for mobile devices with notches/home bars.

## 5. Commands
- **Development**: `bun run dev` (Starts server on localhost:3000 with Turbo)
- **Build**: `bun run build` (Creates static export in `out/` directory)
- **Start**: `bun start` (Runs the production build locally)
- **Lint**: `bun run lint` (Run ESLint)
- **Type Check**: `npx tsc --noEmit` (Check TypeScript types without emitting)
- **No Tests**: This project does not have a test framework configured

## 6. Code Style Guidelines

### File & Component Structure
- **File Naming**: PascalCase for components (`HeroSection.tsx`, `ContactForm.tsx`)
- **Component Files**: One component per file, named after the component
- **Shared Components**: Place reusable UI in `src/components/ui/` (Shadcn style)
- **Feature Components**: Place feature-specific components in `src/components/`
- **Pages**: Route files in `app/` directory (`app/page.tsx`, `app/contact/page.tsx`)
- **Single Source of Truth**: logic should reside in `page.tsx` imports or shared components. Avoid creating separate `...Client.tsx` files unless purely for small interactive islands.

### Import Conventions
```typescript
// 1. React & Next.js imports first
import { useState, useEffect } from "react";
import Link from "next/link";

// 2. External libraries
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// 3. Internal imports (use @/ alias)
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Component Patterns
```typescript
// Server Component (default - no "use client")
export default function HeroSection() {
  return <section className="...">Content</section>;
}

// Client Component - add "use client" at top
"use client";
export function InteractiveComponent() {
  const [state, setState] = useState(false);
  return <div>...</div>;
}

// Props Interface Pattern
interface ComponentProps {
  title: string;
  count?: number;
  children?: React.ReactNode;
}

export function Component({ title, count = 0, children }: ComponentProps) {
  return <div>{title} ({count}) {children}</div>;
}
```

### TypeScript Patterns
- **Type Definitions**: Define shared types in `src/types/`
- **Strict Mode**: TypeScript strict mode is enabled
- **No `any` Types**: Avoid `any`; use `unknown` or proper types
- **Props Interfaces**: Always export props interfaces for components

### React Patterns
```typescript
// forwardRef pattern for Shadcn UI components
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

// Custom hooks start with "use"
export function useMobile() { ... }
export function useToast() { ... }

// Lazy load heavy components
const ThreeDScene = dynamic(() => import("@/components/ThreeDScene"), { ssr: false });
```

### Naming Conventions
- **Components**: PascalCase (`HeroSection`, `CustomCursor`)
- **Hooks**: camelCase with "use" prefix (`useMobile`, `useToast`)
- **Functions**: camelCase (`formatDate`, `calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRIES`)
- **CSS Classes**: kebab-case in Tailwind (`bg-primary`, `text-foreground`)

## 7. Animation Best Practices

### When to Use Which Animation Library
- **GSAP**: Complex timeline sequences, scroll-triggered animations, performance-critical animations
- **Framer Motion**: Simple UI interactions, hover effects, modal transitions, page transitions
- **AOS**: Simple scroll-into-view reveals with minimal code

### Performance Rules
- **Heavy Animations**: Always use `ssr: false` for Three.js and complex animations via `dynamic()`
- **Cleanup**: Always return cleanup functions in `useEffect` for GSAP/Framer Motion animations
- **Throttle**: Debounce scroll/resize event listeners to prevent performance issues
- **GPU Acceleration**: Use `transform` and `opacity` for smooth animations (avoid `left`, `top`)

### Example Animation Pattern
```typescript
"use client";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";

export function AnimatedSection() {
  useGSAP(() => {
    gsap.from(".animate-me", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  return <div className="animate-me">Content</div>;
}
```

## 8. Template System & Bespoke Previews
We are creating bespoke, hand-coded HTML templates for the template marketplace to ensure high quality and variety.
- **Location**: `public/previews/[id].html`
- **Registry**: `src/data/templates.ts`
- **Process**:
    1.  Create a single-file HTML/Tailwind template in `public/previews`.
    2.  Update the template registry in `templates.ts` with metadata (ID, title, features).
    3.  Verify the preview works in the browser.

## 9. Component Composition Rules

### Server vs Client Component Placement
- **Pages in `app/`**: Server Components by default (no "use client")
- **Shared Layout Components**: Server Components when possible
- **Interactive Components**: Client Components with "use client" directive
- **Wrap Interactivity**: Keep client components as leaf nodes, not page-level

### Lazy Loading Heavy Components
```typescript
// Load heavy components only when needed
const ThreeDScene = dynamic(() => import("@/components/ThreeDScene"), { ssr: false });
const ChatbotModal = dynamic(() => import("@/components/ChatbotModal"), { ssr: false });
```

### Provider Wrapping
- **Root Provider**: `app/layout.tsx` wraps entire app with `Providers` component
- **Global Context**: TanStack Query, theme providers, toast providers
- **Feature Context**: Keep context providers specific to feature sections

## 10. Formatting & Linting

### Code Formatting
- **Indentation**: 4 spaces (tabs converted to spaces)
- **Quotes**: Prefer single quotes `'` for strings, double for JSX attributes
- **Semicolons**: Include semicolons at end of statements
- **Trailing Commas**: Include in multi-line objects/arrays
- **No Auto-formatter**: This project uses ESLint but not Prettier

### Linting
- **Run Lint**: `npm run lint` checks all TypeScript files
- **ESLint Config**: Located in `eslint.config.js`
- **Unused Variables**: Disabled (`@typescript-eslint/no-unused-vars: "off"`)
- **React Hooks**: Enforces rules of hooks
- **React Refresh**: Warns on non-component exports

## 11. Deployment

### Hosting
- **Provider**: Hostinger (Shared hosting plan)
- **Type**: Static site deployed via SSH/rsync
- **No Node.js server**: Uses static export (Next.js output mode)

### Backend Policy (Shared Hosting)
- **PHP only**: Any server-side logic must be implemented as PHP scripts.
- **Location**: Place PHP endpoints under `public/api/` so they are included in the static export.
- **No server actions**: Avoid Next.js Server Actions or any Node.js backend requirements.

### Automated Deployment
- **GitHub Actions**: Push to `main` branch triggers automatic deployment
- **Build**: Next.js static export builds to `out/` directory
- **Transfer**: rsync transfers changed files to Hostinger via SSH
- **Speed**: Incremental transfers (seconds for small changes)

### Deployment Secrets
Set these in GitHub repository settings:
- `SSH_PRIVATE_KEY`: SSH private key for Hostinger server
- `SSH_HOST`: Hostinger server IP (82.25.120.199)
- `SSH_USERNAME`: SSH username (u707591712)
- `SSH_PORT`: SSH port (65002)
- `REMOTE_PATH`: Target directory on server

See `DEPLOYMENT.md` for detailed setup instructions.

## 12. Common Issues & Fixes

### Hydration Errors
- **Cause**: Invalid HTML nesting or random values during render
- **Fix**: Use `useEffect` for random values, ensure valid HTML structure
- **Example**: `<div>` inside `<p>` causes hydration errors

### GSAP Animation Issues
- **Double-firing in strict mode**: Always clean up in `useEffect` or use `useGSAP` hook
- **Memory leaks**: Return cleanup function to kill animations
- **Scroll triggers**: Ensure ScrollTrigger is registered and cleaned up

### Three.js Performance
- **SSR false**: Always use `{ ssr: false }` when importing Three.js components
- **Lazy loading**: Use `dynamic()` for heavy 3D components
- **Canvas cleanup**: Dispose geometries, materials, and renderers when unmounting

### Image Optimization
- **ALWAYS use next/image**: Never use `<img>` tag
- **Set priority**: Add `priority` to LCP images (above the fold)
- **Unoptimized**: Static export mode requires `unoptimized: true` in next.config

### Import Path Issues
- **Use @/ alias**: Import from `@/components` instead of `../components`
- **TypeScript paths**: Configured in `tsconfig.json` for clean imports
- **Absolute imports**: Prefer over relative imports for shared code
