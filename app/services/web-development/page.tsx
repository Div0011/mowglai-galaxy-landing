import { Metadata } from "next";
import WebDevelopmentClient from "./WebDevelopmentClient";

export const metadata: Metadata = {
    title: "Robust Engineering & Web Development | Mowglai Digital Agency",
    description: "High-performance full-stack web development and software engineering. Next.js 16, React 19, TypeScript, scalable cloud architectures, sub-second load times, and enterprise security.",
    keywords: [
        "web development agency",
        "Next.js 16 development",
        "React 19 development",
        "full stack engineering",
        "TypeScript agency",
        "enterprise web apps",
        "SaaS development company",
        "API integration services",
        "high performance web development",
        "custom software development India"
    ],
    alternates: {
        canonical: "https://mowglai.com/services/web-development",
    },
    openGraph: {
        title: "Robust Engineering & Web Development | Mowglai",
        description: "Enterprise-grade web applications engineered on Next.js 16, React 19, and TypeScript for infinite scalability and sub-second load times.",
        url: "https://mowglai.com/services/web-development",
        images: [
            {
                url: "https://mowglai.com/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Web Development Services"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Robust Engineering & Web Development | Mowglai",
        description: "Scale your digital footprint with high-velocity full-stack engineering, clean MVC architecture, and 100/100 Core Web Vitals.",
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
            "name": "Web Development",
            "item": "https://mowglai.com/services/web-development"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Full-Stack Web Development & Software Engineering",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "description": "High-performance full-stack web application engineering, Next.js 16 architecture, custom API design, database modeling, and enterprise security."
};

export default function WebDevelopmentPage() {
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
            <WebDevelopmentClient />
        </>
    );
}
