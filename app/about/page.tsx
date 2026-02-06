import { Metadata } from 'next';
import OriginalAbout from "@/styles/original/About";

export const metadata: Metadata = {
    title: "About Mowglai | Leading Web Development Company in India",
    description: "Learn about Mowglai, India's premier web development and digital agency. Discover our mission to create award-winning websites, our expert team of React & Next.js developers, and our commitment to digital excellence. Based in Noida, serving clients worldwide.",
    keywords: [
        "about Mowglai",
        "Mowglai team",
        "Mowglai company",
        "web development company India",
        "digital agency Noida",
        "React developers India",
        "web design team",
        "Mowglai mission",
        "Mowglai vision",
        "best web agency India"
    ],
    alternates: {
        canonical: "https://mowglai.in/about",
    },
    openGraph: {
        title: "About Mowglai | Leading Web Development Company in India",
        description: "Discover India's premier web development agency. Learn about our mission, expert team, and commitment to digital excellence.",
        url: "https://mowglai.in/about",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "About Mowglai Digital Agency"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Mowglai | Leading Web Development Company in India",
        description: "Discover India's premier web development agency. Learn about our mission and expert team.",
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
            "name": "About Us",
            "item": "https://mowglai.in/about"
        }
    ]
};

const jsonLdAboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Mowglai - Web Development Company",
    "description": "Learn about Mowglai, India's premier web development and digital agency.",
    "url": "https://mowglai.in/about",
    "mainEntity": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency",
        "description": "Premium web development and digital agency based in Noida, India",
        "url": "https://mowglai.in",
        "foundingDate": "2024",
        "areaServed": "Worldwide"
    }
};

export default function AboutPage() {
    return (
        <>
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} 
            />
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAboutPage) }} 
            />
            <OriginalAbout />
        </>
    );
}
