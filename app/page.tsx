import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Mowglai - Web Development & Digital Agency",
    description: "Mowglai is India's premier web development and digital agency. We specialize in creating stunning, high-performance websites, 3D web experiences, and custom web applications using React, Next.js, and cutting-edge technologies. Transform your digital presence today.",
    keywords: [
        "Mowglai",
        "Mowglai web development",
        "Mowglai digital agency",
        "web development company India",
        "best web design agency",
        "custom website development",
        "React development services",
        "Next.js developers India",
        "3D website design",
        "premium digital agency",
        "award winning web design",
        "ecommerce development",
        "mobile app development",
        "UI UX design services"
    ],
    alternates: {
        canonical: "https://mowglai.in/",
    },
    openGraph: {
        title: "Mowglai - Web Development & Digital Agency",
        description: "India's premier web development agency creating stunning, high-performance websites and 3D web experiences. Expert React & Next.js developers.",
        url: "https://mowglai.in/",
        siteName: "Mowglai",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai - Premium Web Development Agency"
            }
        ],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mowglai - Web Development & Digital Agency",
        description: "India's premier web development agency creating stunning, high-performance websites and 3D web experiences.",
        images: ["https://mowglai.in/mowglai-logo-new.jpg"],
        creator: "@mowglai_in",
        site: "@mowglai_in",
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
        }
    ]
};

const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mowglai - Web Development & Digital Agency",
    "description": "Premium web development and digital agency based in India. Specializing in React, Next.js, 3D websites, and custom web applications.",
    "url": "https://mowglai.in/",
    "image": "https://mowglai.in/mowglai-logo-new.jpg",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai"
    }
};

import OriginalHome from "@/styles/original/Home";

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
            />
            <OriginalHome />
        </>
    );
}
