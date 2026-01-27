import ContactClient from "./ContactClient";

export const metadata = {
    title: "Contact Us: Start Your Project Today",
    description: "Get in touch with Mowglai's expert development team. Request a custom web development quote, discuss your project vision, or schedule a consultation. We're ready to build your extraordinary digital experience.",
    keywords: ["contact Mowglai", "web development quote", "request project quote", "hire web developers", "custom web development", "digital agency contact", "start web project", "web development consultation"],
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Us: Start Your Project Today",
        description: "Get in touch with Mowglai's expert development team. Request a custom web development quote or schedule a consultation.",
        url: "/contact",
        images: [
            {
                url: "/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Contact Mowglai Digital Agency"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us: Start Your Project Today",
        description: "Get in touch with Mowglai's expert development team. Request a custom web development quote or schedule a consultation.",
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
            "name": "Contact Us",
            "item": "https://mowglai.in/contact"
        }
    ]
};

export default function Contact() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <ContactClient />
        </>
    );
}
