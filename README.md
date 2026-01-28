# Mowglai Galaxy Landing

This is the Mowglai Galaxy Landing page project, built with **Next.js 16 (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**.

## Project Info

**URL**: [https://mowglai.in](https://mowglai.in)

## Optimization Features

- **Server Components**: Core pages are rendered on the server to minimize client-side JavaScript (the "JavaScript Tax").
- **Image Optimization**: Powered by `next/image` with automatic WebP conversion and priority loading for LCP.
- **Dynamic Imports**: Heavy animation libraries (GSAP, Three.js) are loaded asynchronously.
- **Advanced SEO**: Automated metadata generation with JSON-LD schema support.

## Getting Started

To run this project locally:

1.  Clone the repository.
2.  Install dependencies:
    ```sh
    npm install
    # or
    bun install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```

## Technologies

- **Framework**: Next.js 15
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Interactivity**: Framer Motion
- **Animations**: GSAP
- **3D Visuals**: Three.js (@react-three/fiber, @react-three/drei)
- **Internationalization**: Custom React Context (`LanguageContext`) + Typed Dictionaries
- **Theming**: `next-themes` (Dark/Light/System modes)
- **Deployment**: Optimized for Vercel/Cloudflare
- **Bespoke Templates**: Custom HTML/Tailwind templates for various sectors (Healthcare, Education, Real Estate, etc.) available in `public/previews`.

## Project Structure

A quick look at the top-level files and directories you'll see in this project.

```
.
├── app/                  # Next.js App Router pages and API routes
│   ├── explore/          # Explore Templates page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── src/
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components (shadcn/ui)
│   │   └── ...           # Feature-specific components
│   └── lib/              # Utility functions and shared logic
├── public/               # Static assets (images, fonts, etc.)
├── .github/              # GitHub Actions workflows (CI/CD)
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Docker Deployment

This project can be containerized using Docker.

1.  **Build the image**:
    ```bash
    docker build -t mowglai-app .
    ```

2.  **Run the container**:
    ```bash
    docker run -p 3000:3000 mowglai-app
    ```

> Note: Make sure you have a `Dockerfile` in the root directory configured for Next.js.
