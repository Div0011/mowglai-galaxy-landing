import { Metadata } from "next";
import DatabaseSolutionsClient from "./DatabaseSolutionsClient";

export const metadata: Metadata = {
    title: "Data Intelligence & Database Solutions | Mowglai Digital Agency",
    description: "Enterprise database architecture, cloud data migrations, and high-performance data intelligence. Scalable PostgreSQL, Supabase, Redis caching, vector databases, and zero-downtime backups.",
    keywords: [
        "database architecture services",
        "cloud database migration",
        "PostgreSQL performance tuning",
        "Supabase development agency",
        "Redis caching solutions",
        "vector database integration",
        "Prisma Drizzle ORM",
        "enterprise data security",
        "database consulting India"
    ],
    alternates: {
        canonical: "https://mowglai.com/services/database-solutions",
    },
    openGraph: {
        title: "Data Intelligence & Database Solutions | Mowglai",
        description: "Organize, secure, and scale your mission-critical data with enterprise cloud architectures, sub-millisecond caching, and zero-downtime replication.",
        url: "https://mowglai.com/services/database-solutions",
        images: [
            {
                url: "https://mowglai.com/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Database Solutions"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Data Intelligence & Database Solutions | Mowglai",
        description: "Enterprise database modeling, high-concurrency replication, and indestructible data security.",
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
            "name": "Database Solutions",
            "item": "https://mowglai.com/services/database-solutions"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Database Architecture & Data Intelligence",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "description": "High-availability relational database engineering, cloud data migrations, sub-millisecond Redis caching, vector databases, and compliance security."
};

export default function DatabaseSolutionsPage() {
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
            <DatabaseSolutionsClient />
        </>
    );
}
