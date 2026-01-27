import AboutClient from "./AboutClient";

export const metadata = {
    title: "About Us: Our Mission & Team",
    description: "Discover Mowglai's mission to transform the digital landscape through innovation, creativity, and technical excellence. Meet our expert team of developers and designers crafting world-class digital experiences.",
    keywords: ["about Mowglai", "digital agency team", "web development mission", "creative agency philosophy", "Mowglai values", "tech team", "design experts", "development studio"],
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About Us: Our Mission & Team",
        description: "Discover Mowglai's mission to transform the digital landscape through innovation, creativity, and technical excellence. Meet our expert team.",
        url: "/about",
        images: [
            {
                url: "/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "About Mowglai Digital Agency"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us: Our Mission & Team",
        description: "Discover Mowglai's mission to transform the digital landscape through innovation, creativity, and technical excellence.",
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
            "name": "About Us",
            "item": "https://mowglai.in/about"
        }
    ]
};

const jsonLdAbout = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Mowglai",
    "description": "Discover Mowglai's mission to transform the digital landscape through innovation, creativity, and technical excellence. Meet our expert team of developers and designers crafting world-class digital experiences.",
    "url": "https://mowglai.in/about",
    "mainEntity": {
        "@type": "Organization",
        "name": "Mowglai",
        "foundingDate": "2024",
        "description": "Premium digital agency creating stunning, high-performance websites and web applications"
    }
};

export default function About() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }} />
            <AboutClient />
        </>
    );
}
