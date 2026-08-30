import { Metadata } from "next";
import WebsiteRedesignClient from "./WebsiteRedesignClient";

export const metadata: Metadata = {
    title: "Website Redesign & Digital Evolution | Mowglai Digital Agency",
    description: "Transform your outdated website into a blazing-fast, modern digital experience. Next.js modernization, 100/100 Core Web Vitals, zero SEO loss, and high-conversion UI/UX redesigns.",
    keywords: [
        "website redesign services",
        "website modernization",
        "WordPress to Next.js migration",
        "legacy website overhaul",
        "Core Web Vitals speed optimization",
        "SEO safe website migration",
        "UI UX redesign agency",
        "convert WordPress to React",
        "website upgrade India"
    ],
    alternates: {
        canonical: "https://mowglai.com/services/website-redesign",
    },
    openGraph: {
        title: "Website Redesign & Digital Evolution | Mowglai",
        description: "Breathe new life into legacy platforms. 10x faster load speeds, modern 3D spatial aesthetics, and zero SEO ranking loss.",
        url: "https://mowglai.com/services/website-redesign",
        images: [
            {
                url: "https://mowglai.com/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Website Redesign Services"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Website Redesign & Digital Evolution | Mowglai",
        description: "Upgrade your legacy web presence with modern UI/UX, sub-second speed, and unbreakable security.",
        images: ["https://mowglai.com/mowglai-logo-new.jpg"],
    },
};

const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://mowglai.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://mowglai.com/services"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Website Redesign",
            "item": "https://mowglai.com/services/website-redesign"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Website Redesign & Digital Modernization",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "description": "Legacy website overhaul, WordPress to Next.js migration, Core Web Vitals speed optimization, UI/UX modernizations, and zero-loss SEO transitions."
};

export default function WebsiteRedesignPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
            />
            <WebsiteRedesignClient />
        </>
    );
}
