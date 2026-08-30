import { Metadata } from "next";
import EcommerceServiceClient from "./EcommerceServiceClient";

export const metadata: Metadata = {
    title: "E-Commerce & Online Store Architecture | Mowglai Digital Agency",
    description: "Build high-converting custom online stores and e-commerce platforms. Custom catalogs, secure 1-step checkout, multi-gateway payments (Stripe, Razorpay, UPI), real-time inventory, and live order tracking.",
    keywords: [
        "ecommerce development agency",
        "custom online store development",
        "Shopify headless development",
        "Next.js ecommerce",
        "high conversion checkout",
        "multi currency ecommerce",
        "Razorpay Stripe integration",
        "order tracking system",
        "ecommerce agency India"
    ],
    alternates: {
        canonical: "https://mowglai.com/services/ecommerce",
    },
    openGraph: {
        title: "E-Commerce & Online Store Architecture | Mowglai",
        description: "Transform your retail business with custom high-speed online stores, frictionless checkout flows, and automated inventory logistics.",
        url: "https://mowglai.com/services/ecommerce",
        images: [
            {
                url: "https://mowglai.com/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai E-Commerce Development Services"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "E-Commerce & Online Store Architecture | Mowglai",
        description: "Launch an indestructible, high-converting digital storefront with global payment rails and automated order tracking.",
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
            "name": "E-Commerce",
            "item": "https://mowglai.com/services/ecommerce"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "E-Commerce Store Development & Architecture",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "description": "Custom headless e-commerce development, high-converting checkout funnels, multi-currency payment integration, and automated inventory sync."
};

export default function EcommerceServicePage() {
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
            <EcommerceServiceClient />
        </>
    );
}
