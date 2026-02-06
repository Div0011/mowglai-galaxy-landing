import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // Experimental optimizations for better performance
    experimental: {
        optimizePackageImports: [
            'lucide-react',
            '@radix-ui/react-icons',
            'recharts',
            'framer-motion',
            'gsap',
            '@gsap/react',
        ],
        webpackBuildWorker: true,
        parallelServerBuildTraces: true,
    },
    // Ensure that GSAP and Three.js work correctly
    transpilePackages: ['gsap', 'three', '@react-three/fiber', '@react-three/drei'],
    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Performance optimizations for static export
    poweredByHeader: false,
    generateEtags: false,
};

export default withBundleAnalyzer(nextConfig);
