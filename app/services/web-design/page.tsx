import { Metadata } from "next";
import WebDesignClient from "./WebDesignClient";

export const metadata: Metadata = {
    title: "Aesthetic Excellence & Web Design | Mowglai Digital Agency",
    description: "Award-winning bespoke web design and UI/UX engineering. Immersive 3D experiences, spatial typography, fluid micro-interactions, responsive design systems, and high-converting interfaces.",
    keywords: [
        "web design agency",
        "UI UX design",
        "aesthetic website design",
        "3D web design",
        "Figma to Next.js",
        "creative agency India",
        "luxury website design",
        "custom design systems",
        "motion design web",
        "responsive design"
    ],
    alternates: {
        canonical: "https://mowglai.com/services/web-design",
    },
    openGraph: {
        title: "Aesthetic Excellence & Web Design | Mowglai",
        description: "Transform your digital presence with world-class aesthetic UI/UX web design, spatial 3D interactions, and responsive design systems.",
        url: "https://mowglai.com/services/web-design",
        images: [
            {
                url: "https://mowglai.com/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Web Design Services"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Aesthetic Excellence & Web Design | Mowglai",
        description: "Bespoke UI/UX design, 3D web experiences, and high-performance design systems crafted to captivate audiences.",
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
            "name": "Web Design",
            "item": "https://mowglai.com/services/web-design"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "UI/UX Web Design & Digital Aesthetics",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "description": "Award-winning UI/UX web design, design systems, 3D spatial experiences, GSAP motion choreography, and high-conversion interfaces."
};

export default function WebDesignPage() {
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
            <WebDesignClient />
        </>
    );
}
