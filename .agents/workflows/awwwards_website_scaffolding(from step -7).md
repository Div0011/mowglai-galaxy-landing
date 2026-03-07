---
description: Create the next best Awwwards-level website using modern tech stack
---

## 🎨 STEP 7: CUSTOM GLSL SHADER COMPONENT
`components/three/ShaderMesh.tsx`

```typescript
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vertex Shader: Handles geometry deformation
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    // Wave distortion effect
    vec3 newPosition = position;
    float wave = sin(position.x * 2.0 + uTime) * 0.1;
    wave += sin(position.y * 3.0 + uTime * 0.5) * 0.1;
    newPosition.z += wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment Shader: Handles color and texture
const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColor;
  
  void main() {
    // Dynamic color mixing
    vec3 color = uColor;
    float noise = sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime) * 0.5 + 0.5;
    color = mix(color, vec3(1.0), noise * 0.3);
    
    // Gradient based on position
    float gradient = smoothstep(0.0, 1.0, vUv.y);
    color = mix(color * 0.5, color, gradient);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ShaderMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#ff6b6b') },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 3, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
```

## 📜 STEP 8: SCROLL-TRIGGERED TEXT ANIMATION
`components/ScrollingText.tsx`

```typescript
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollingTextProps {
  text: string;
  className?: string;
}

export default function ScrollingText({ text, className = '' }: ScrollingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Split text into characters for animation
    const chars = textRef.current.innerText.split('');
    textRef.current.innerHTML = chars
      .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const charElements = textRef.current.querySelectorAll('span');

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    });

    tl.fromTo(
      charElements,
      {
        y: 100,
        opacity: 0,
        rotateX: -90,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.02,
        ease: 'power4.out',
      }
    );

    return () => {
      tl.kill();
    };
  }, [text]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <h2
        ref={textRef}
        className="text-6xl md:text-8xl font-bold tracking-tighter will-change-transform"
        style={{ perspective: '1000px' }}
      >
        {text}
      </h2>
    </div>
  );
}
```

## 🏠 STEP 9: MAIN PAGE EXAMPLE
`app/page.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollingText from '@/components/ScrollingText';
import Scene from '@/components/three/Scene';
import ShaderMesh from '@/components/three/ShaderMesh';
import { useParallax } from '@/hooks/useScrollAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useParallax(0.5);

  useEffect(() => {
    // Initial page load animation
    const tl = gsap.timeline();
    tl.from('body', { opacity: 0, duration: 1 })
      .from('.hero-title', { y: 100, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.5');
  }, []);

  return (
    <main className="relative">
      {/* WebGL Background */}
      <Scene>
        <ShaderMesh />
      </Scene>

      {/* Hero Section */}
      <section 
        ref={heroRef as React.RefObject<HTMLDivElement>}
        className="h-screen flex items-center justify-center relative z-10"
      >
        <div className="text-center px-4">
          <h1 className="hero-title text-7xl md:text-9xl font-bold tracking-tighter mb-6 mix-blend-difference">
            DIGITAL
            <br />
            EXPERIENCE
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Crafting award-winning interactive experiences with cutting-edge technology
          </p>
        </div>
      </section>

      {/* Scrolling Text Section */}
      <section className="min-h-screen flex items-center justify-center bg-black relative z-10">
        <ScrollingText text="INNOVATION" className="text-center" />
      </section>

      {/* Parallax Image Section */}
      <section className="min-h-screen relative overflow-hidden">
        <div className="sticky top-0 h-screen">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
          <img
            src="/images/parallax-bg.jpg"
            alt="Parallax"
            className="w-full h-full object-cover scale-110"
            data-speed="auto"
          />
        </div>
        <div className="relative z-20 h-screen flex items-center justify-center">
          <h2 className="text-5xl md:text-7xl font-bold text-center px-4">
            Immersive<br />Storytelling
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 text-center relative z-10 bg-black">
        <p className="text-gray-500">© 2025 Creative Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}
```

## ⚙️ STEP 10: TAILWIND CONFIG
`tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b6b',
        secondary: '#4ecdc4',
        dark: '#0a0a0a',
        light: '#f7f7f7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

## 🎯 STEP 11: NEXT.JS CONFIG
`next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable if using server components with Three.js
    serverComponentsExternalPackages: ['three'],
  },
  webpack: (config) => {
    // Support for GLSL shaders
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    return config;
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
```

## 🧠 AI AGENT LEARNING ROADMAP
To build sites like Jomor Design and The Year of Greta, your AI agent needs to learn:

### Phase 1: Foundation (Week 1-2)
- **React & Next.js Deep Dive**: App Router architecture, Server vs Client Components, Data fetching patterns
- **TypeScript Mastery**: Strict typing for props, Generic components, Type-safe hooks

### Phase 2: Animation & Interaction (Week 3-4)
- **GSAP Specialization**: ScrollTrigger fundamentals, Timeline orchestration, Performance optimization (will-change, transforms)
- **Smooth Scrolling Architecture**: Lenis integration patterns, Sync with animation libraries, Mobile optimization

### Phase 3: 3D & WebGL (Week 5-6)
- **Three.js Core Concepts**: Scene, Camera, Renderer, Geometry, Materials, Lighting, Performance budgeting (draw calls, poly count)
- **React Three Fiber**: Declarative 3D scenes, Custom hooks (useFrame, useThree), Drei utilities
- **GLSL Shaders**: Vertex manipulation, Fragment coloring, Uniforms and varying, Noise functions (Simplex, Perlin)

### Phase 4: Advanced Techniques (Week 7-8)
- **Scroll-Based Storytelling**: Pinning sections, Scrub animations, Parallax layering
- **Performance Optimization**: Code splitting, Lazy loading 3D assets, Texture compression (KTX2, Basis), GPU instancing
- **Accessibility**: `prefers-reduced-motion`, Keyboard navigation, Screen reader support

### Phase 5: Polish & Deployment (Week 9)
- **Micro-interactions**: Custom cursors, Magnetic buttons, Page transitions
- **SEO & Performance**: Core Web Vitals optimization, Structured data, Open Graph meta tags

## 🔥 PRO TIPS FOR AWWWARDS SUBMISSION
- **Performance Budget**: Keep Total Blocking Time < 200ms, LCP < 2.5s
- **Mobile First**: 60fps on mid-range mobile devices
- **Progressive Enhancement**: Works without WebGL, enhanced with it
- **Unique Cursor**: Custom cursor that changes on hover states
- **Typography**: Large, bold typography with careful kerning
- **Whitespace**: Generous negative space for premium feel
- **Transitions**: Seamless page transitions (use Next.js App Router + Framer Motion)
- **Sound**: Optional ambient audio (use Howler.js)