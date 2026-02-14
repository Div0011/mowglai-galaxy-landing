import { Metadata } from 'next';
import OriginalServices from "@/styles/original/Services";

export const metadata: Metadata = {
    title: "Web Development Services | Mowglai Digital Agency",
    description: "Explore Mowglai's premium web development services: SaaS platforms, MVP builds, MVC architecture, custom website design, React & Next.js development, 3D web experiences, e-commerce solutions, SEO optimization, and digital strategy. Serving startups and enterprises worldwide from India.",
    keywords: [
        "Mowglai services",
        "web development services",
        "SaaS development",
        "MVP development",
        "MVC architecture",
        "startup product development",
        "custom website design",
        "React development",
        "Next.js development",
        "3D web design",
        "ecommerce development India",
        "SEO services",
        "digital strategy",
        "UI UX design",
        "mobile app development",
        "database solutions",
        "website maintenance"
    ],
    alternates: {
        canonical: "https://mowglai.in/services",
    },
    openGraph: {
        title: "Web Development Services | Mowglai Digital Agency",
        description: "Premium web development services for startups and enterprises: SaaS, MVPs, MVC architecture, custom websites, React & Next.js, 3D experiences, e-commerce, SEO, and digital strategy.",
        url: "https://mowglai.in/services",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Web Development Services"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Web Development Services | Mowglai Digital Agency",
        description: "Premium web development services: SaaS, MVPs, MVC architecture, custom websites, React & Next.js, 3D experiences, e-commerce, SEO.",
        images: ["https://mowglai.in/mowglai-logo-new.jpg"],
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
            "item": "https://mowglai.in"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://mowglai.in/services"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Web Development and Digital Services",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Development Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Custom Website Development"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "SaaS Platform Development"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "MVP Builds for Startups"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "MVC Architecture Consulting"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "3D Web Experiences"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Development"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "SEO Optimization"
                }
            }
        ]
    }
};

export default function ServicesPage() {
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
            <OriginalServices />
        </>
    );
}
