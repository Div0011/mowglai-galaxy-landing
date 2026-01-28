import ServicesClient from "./ServicesClient";

export const metadata = {
    title: "Our Services: Web Development & Digital Solutions",
    description: "Explore Mowglai's comprehensive web development services: custom websites, 3D web experiences, React & Next.js applications, UI/UX design, and digital transformation solutions. Expert development for your business.",
    keywords: ["web development services", "custom website development", "React development", "Next.js development", "3D web development", "UI/UX design services", "mobile app development", "digital transformation", "software development", "web application development"],
    alternates: {
        canonical: "/services",
    },
    openGraph: {
        title: "Our Services: Web Development & Digital Solutions",
        description: "Explore Mowglai's comprehensive web development services: custom websites, 3D web experiences, React & Next.js applications, UI/UX design.",
        url: "/services",
        images: [
            {
                url: "/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Web Development Services"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our Services: Web Development & Digital Solutions",
        description: "Explore Mowglai's comprehensive web development services: custom websites, 3D web experiences, React & Next.js applications.",
        images: ["/mowglai-logo-new.jpg"],
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

const jsonLdServices = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mowglai Web Development Services",
    "description": "Explore Mowglai's comprehensive web development services: custom websites, 3D web experiences, React & Next.js applications, UI/UX design, and digital transformation solutions.",
    "provider": {
        "@id": "https://mowglai.in/#organization"
    },
    "areaServed": "Worldwide",
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
                    "name": "3D Web Development"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "React & Next.js Development"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design"
                }
            }
        ]
    }
};

export default function ServicesPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }} />
            <ServicesClient />
        </>
    );
}
