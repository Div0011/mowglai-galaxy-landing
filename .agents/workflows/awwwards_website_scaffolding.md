---
description: Create the next best Awwwards-level website using modern tech stack
---

# COMPLETE TECH STACK DOCUMENTATION

## Core Technologies Used by Award-Winning Sites:
- Jomor Design uses: Webflow (CMS) + Custom JavaScript + WebGL/Three.js + GSAP
- The Year of Greta uses: Custom build likely with React/Next.js + GSAP + Smooth Scroll

## Modern 2024-2025 Stack for Awwwards-Level Sites:
- **Framework**: Next.js 14/15 (App Router) + React 18/19
- **3D/WebGL**: Three.js + React Three Fiber (R3F) + Drei
- **Animation**: GSAP (ScrollTrigger, ScrollSmoother) + Lenis (smooth scroll)
- **Styling**: Tailwind CSS + CSS Modules/Styled Components
- **Shaders**: GLSL (custom fragment/vertex shaders)
- **Build**: Vite or Next.js native
- **Deployment**: Vercel (optimal for Next.js)

## 📁 FILE STRUCTURE TEMPLATE

```text
my-awwwards-project/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Lenis provider
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles + Lenis CSS
│   └── sections/                # Page sections
│       ├── Hero.tsx
│       ├── WebGLSection.tsx
│       └── ScrollingText.tsx
├── components/
│   ├── providers/
│   │   └── LenisProvider.tsx    # Smooth scroll wrapper
│   ├── three/
│   │   ├── Scene.tsx            # Three.js canvas setup
│   │   ├── ShaderMesh.tsx       # Custom GLSL shader component
│   │   └── Model.tsx            # 3D model loader
│   └── ui/                      # Reusable UI components
├── hooks/
│   ├── useScrollProgress.ts     # Custom scroll hooks
│   └── useWindowSize.ts
├── lib/
│   ├── utils.ts                 # Utility functions
│   └── shaders/                 # GLSL shader files
│       ├── fragment.glsl
│       └── vertex.glsl
├── public/
│   ├── models/                  # 3D models (GLTF/GLB)
│   └── images/
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## 🛠️ STEP 1: PACKAGE.JSON

```json
{
  "name": "awwwards-creative-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    
    "three": "^0.171.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^9.120.0",
    
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.1",
    "lenis": "^1.1.18",
    
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "leva": "^0.9.35"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.170.0",
    "typescript": "^5",
    "eslint": "^8",
    "eslint-config-next": "15.1.0",
    "vite-plugin-glsl": "^1.3.1"
  }
}
```

Install command:
```bash
npm install next@latest react@latest react-dom@latest three @react-three/fiber @react-three/drei gsap @gsap/react lenis tailwindcss autoprefixer postcss clsx tailwind-merge leva
```

## 🎨 STEP 2: GLOBAL STYLES (globals.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Lenis Smooth Scroll CSS */
html.lenis, html.lenis body {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-smooth iframe {
  pointer-events: none;
}

/* Custom Cursor (Award-winning sites often use this) */
.custom-cursor {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s, height 0.3s;
}

.custom-cursor.hover {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
}

/* Hide default scrollbar for premium feel */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

/* Selection styling */
::selection {
  background: #ff6b6b;
  color: white;
}

/* Smooth image loading */
img {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

img.loaded {
  opacity: 1;
}

/* Typography for award sites */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  overflow-x: hidden;
}

/* Grain overlay texture (common in award sites) */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

## 🚀 STEP 3: LENIS PROVIDER (Smooth Scroll)
`components/providers/LenisProvider.tsx`

```typescript
'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with award-winning site settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoRaf: true, // New in Lenis v1.0+
      anchors: true, // Enable anchor link support
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

## ⚛️ STEP 4: ROOT LAYOUT
`app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Studio | Award-Winning Digital Experiences",
  description: "Premium digital experiences crafted with cutting-edge technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body className={inter.className}>
        <LenisProvider>
          {/* Grain overlay for texture */}
          <div className="grain-overlay" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

## 🎭 STEP 5: GSAP SCROLL ANIMATION HOOK
`hooks/useScrollAnimation.ts`

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const useScrollAnimation = (
  animationCallback: (tl: gsap.core.Timeline) => void,
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger || elementRef.current,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        scrub: options.scrub || false,
        pin: options.pin || false,
        markers: options.markers || false,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
      },
    });

    animationCallback(tl);
    timelineRef.current = tl;

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === elementRef.current) {
          st.kill();
        }
      });
    };
  }, [animationCallback, options]);

  return elementRef;
};

// Hook for parallax effects
export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const y = window.innerHeight * speed * 0.1;
    const setY = gsap.quickSetter(ref.current, "y", "px");

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        setY(self.progress * y);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [speed]);

  return ref;
};
```

## 🌊 STEP 6: WEBGL/THREE.JS SCENE COMPONENT
`components/three/Scene.tsx`

```typescript
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, Float, ContactShadows } from '@react-three/drei';

interface SceneProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
}

export default function Scene({ children, cameraPosition = [0, 0, 5] }: SceneProps) {
  return (
    <div className="w-full h-screen fixed top-0 left-0 -z-10">
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Responsive pixel ratio
      >
        <Suspense fallback={null}>
          {/* Lighting setup for award-winning look */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <spotLight position={[-10, 10, -5]} intensity={0.5} />
          
          {/* Environment for realistic reflections */}
          <Environment preset="city" />
          
          {children}
          
          {/* Soft shadows */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
```