import DNAClient from "./DNAClient";

export const metadata = {
    title: "Our DNA: Core Values & Development Process",
    description: "Discover Mowglai's DNA: our core values, innovative development process, and workflow methodology. Learn how we deliver world-class digital experiences through precision, creativity, and technical excellence.",
    keywords: ["Mowglai DNA", "web development process", "agency core values", "development workflow", "web development methodology", "digital agency culture", "creative process", "technical excellence", "project workflow"],
    alternates: {
        canonical: "/our-dna",
    },
    openGraph: {
        title: "Our DNA: Core Values & Development Process",
        description: "Discover Mowglai's DNA: our core values, innovative development process, and workflow methodology. Learn how we deliver world-class digital experiences.",
        url: "/our-dna",
        images: [
            {
                url: "/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Our DNA - Core Values"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our DNA: Core Values & Development Process",
        description: "Discover Mowglai's DNA: our core values, innovative development process, and workflow methodology.",
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
            "name": "Our DNA",
            "item": "https://mowglai.in/our-dna"
        }
    ]
};

export default function OurDNA() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <DNAClient />
        </>
    );
}
