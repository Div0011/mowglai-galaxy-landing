import { Metadata } from "next";
import IntelligentSystemsClient from "./IntelligentSystemsClient";

export const metadata: Metadata = {
    title: "Intelligent Systems & AI Automation | Mowglai Digital Agency",
    description: "Empower your web applications with next-generation AI. Custom AI agents, LLM integrations (Gemini, Claude, GPT), automated workflows, intelligent chatbots, and predictive data pipelines.",
    keywords: [
        "AI automation",
        "intelligent systems",
        "LLM integration",
        "custom AI chatbots",
        "Gemini AI development",
        "Claude API integration",
        "OpenAI solutions",
        "AI web applications",
        "workflow automation",
        "predictive analytics"
    ],
    alternates: {
        canonical: "https://mowglai.com/services/intelligent-systems",
    },
    openGraph: {
        title: "Intelligent Systems & AI Automation | Mowglai",
        description: "Scale your business with bespoke AI agents, automated workflows, and intelligent integrations engineered for speed and precision.",
        url: "https://mowglai.com/services/intelligent-systems",
        images: [
            {
                url: "https://mowglai.com/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Intelligent Systems"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Intelligent Systems & AI Automation | Mowglai",
        description: "Transform operations with intelligent agents, automated workflows, and high-performance AI web applications.",
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
            "name": "Intelligent Systems",
            "item": "https://mowglai.com/services/intelligent-systems"
        }
    ]
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Intelligent Systems & AI Automation",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
    },
    "description": "Enterprise AI agent development, LLM fine-tuning, automated chatbots, workflow orchestration, and predictive analytics platforms."
};

export default function IntelligentSystemsPage() {
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
            <IntelligentSystemsClient />
        </>
    );
}
