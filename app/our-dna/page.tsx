import { Metadata } from 'next';
import OriginalDNA from "@/styles/original/DNA";

export const metadata: Metadata = {
    title: "Our DNA & Process | How Mowglai Creates Digital Excellence",
    description: "Discover Mowglai's unique approach to web development and digital design. Learn about our process, methodology, and the principles that drive our award-winning websites and digital experiences.",
    keywords: [
        "Mowglai process",
        "Mowglai methodology",
        "web development process",
        "digital agency approach",
        "website design methodology",
        "our DNA Mowglai",
        "how we work",
        "web development workflow",
        "digital excellence principles",
        "agency culture"
    ],
    alternates: {
        canonical: "https://mowglai.in/our-dna",
    },
    openGraph: {
        title: "Our DNA & Process | How Mowglai Creates Digital Excellence",
        description: "Discover Mowglai's unique approach to web development. Learn about our process, methodology, and principles.",
        url: "https://mowglai.in/our-dna",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai DNA and Process"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our DNA & Process | How Mowglai Creates Digital Excellence",
        description: "Discover Mowglai's unique approach to web development and digital design.",
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
            "name": "Our DNA",
            "item": "https://mowglai.in/our-dna"
        }
    ]
};

export default function DnaPage() {
    return (
        <>
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} 
            />
            <OriginalDNA />
        </>
    );
}
