import { Metadata } from "next";
import DigitalStrategyClient from "./DigitalStrategyClient";

export const metadata: Metadata = {
    title: "Global Reach & Digital Strategy | Mowglai Digital Agency",
    description: "Expand your brand globally with international SEO, edge localization, multi-region architecture, conversion rate optimization, and world-class digital strategy.",
    keywords: [
        "digital strategy agency",
        "international SEO services",
        "global web expansion",
        "conversion rate optimization agency",
        "multi language website strategy",
        "edge latency optimization",
        "brand positioning strategy",
        "growth consulting India"
    ],
    alternates: {
        canonical: "https://mowglai.com/services/digital-strategy",
    },
    openGraph: {
        title: "Global Reach & Digital Strategy | Mowglai",
        description: "Position your brand on the global map. International SEO, multi-region edge deployment, and hyper-targeted conversion funnels.",
        url: "https://mowglai.com/services/digital-strategy",
        images: [
            {
                url: "https://mowglai.com/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Digital Strategy Services"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Global Reach & Digital Strategy | Mowglai",
        description: "Engineer your global digital footprint with international SEO, localized edge architectures, and cross-border conversion funnels.",
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
            "name": "Digital Strategy",
            "item": "https://mowglai.com/services/digital-strategy"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Digital Strategy & Global Growth Consulting",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "description": "Cross-border digital strategy, international SEO, multi-language edge architecture, conversion rate optimization, and brand positioning."
};

export default function DigitalStrategyPage() {
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
            <DigitalStrategyClient />
        </>
    );
}
