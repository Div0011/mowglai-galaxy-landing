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

## Razorpay Subscription Setup (Hostinger)

- Frontend requires `NEXT_PUBLIC_RAZORPAY_KEY_ID` at build time for the checkout key to be embedded in the static bundle.
- PHP endpoint (`public/api/create-subscription.php`) reads server env vars:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
- On shared Hostinger, set the PHP env vars in `public/.htaccess` (server-only; do not commit secrets).

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

## Docker Development

This project supports Docker for both development (with hot reload) and production.

### Quick Start (Development with Hot Reload)

```bash
# Start the development server with hot reload
docker compose up
```

Access the app at http://localhost:3000

Changes you make to files will be instantly reflected in the browser.

### Development Commands

```bash
# Start in foreground (see logs)
docker compose up

# Start in background
docker compose up -d

# Stop the container
docker compose down

# Rebuild after package.json changes
docker compose up --build

# View logs
docker compose logs -f
```

### Production Build

To build a production-optimized image:

```bash
# Build production image
docker build -t mowglai:latest .

# Run production container
docker run -p 80:80 mowglai:latest
```

Access the production build at http://localhost

### Publishing to GitHub Container Registry (GHCR)

```bash
# Login to GitHub Container Registry
# Use your GitHub Personal Access Token as the password
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

# Build and tag the image
docker build -t ghcr.io/div0011/mowglai:latest .

# Push to GHCR
docker push ghcr.io/div0011/mowglai:latest
```

#### Automated Builds with GitHub Actions

The repository includes GitHub Actions workflows for automated Docker builds and pushes to GHCR on every push to the main branch.

### Docker Configuration

- **Development**: Uses `docker-compose.yml` with volume mounts for hot reload
- **Production**: Multi-stage build with Nginx serving static files
- **Environment Variables**: 
  - `CHOKIDAR_USEPOLLING=true` - Enables file watching in Docker
  - `WATCHPACK_POLLING=true` - Webpack polling for hot reload

## License

[Add your license information here]
