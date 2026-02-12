import { Metadata } from 'next';
import OriginalContact from "@/styles/original/Contact";

export const metadata: Metadata = {
    title: "Contact Mowglai | Web Development Agency India",
    description: "Get in touch with Mowglai, India's leading web development agency. Contact us for custom website design, web development projects, digital strategy, or to request a quote. Based in Noida, serving clients worldwide.",
    keywords: [
        "contact Mowglai",
        "Mowglai contact",
        "web development inquiry",
        "hire web developers India",
        "website design quote",
        "contact digital agency",
        "web development consultation",
        "custom website request",
        "Mowglai Noida",
        "web agency contact"
    ],
    alternates: {
        canonical: "https://mowglai.in/contact",
    },
    openGraph: {
        title: "Contact Mowglai | Web Development Agency India",
        description: "Get in touch with India's leading web development agency. Contact us for custom website design and development projects.",
        url: "https://mowglai.in/contact",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Contact Mowglai Digital Agency"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Mowglai | Web Development Agency India",
        description: "Get in touch with India's leading web development agency for custom website design and development.",
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
            "name": "Contact",
            "item": "https://mowglai.in/contact"
        }
    ]
};

const jsonLdContactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Mowglai - Web Development Agency",
    "description": "Contact India's leading web development agency for custom website design and development projects.",
    "url": "https://mowglai.in/contact",
    "mainEntity": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency",
        "telephone": "+91-9452476331",
        "email": "hello@mowglai.in",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Noida",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN"
        }
    }
};

export default function ContactPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContactPage) }}
            />
            <OriginalContact />
        </>
    );
}
