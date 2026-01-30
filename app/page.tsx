
export const metadata = {
    title: "Premium Digital Agency - Web Development & Design",
    description: "Mowglai is a premium digital agency creating stunning, high-performance websites and web applications. Expert web development, 3D design, and immersive digital experiences. Transform your brand with cutting-edge technology and creative excellence.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Premium Digital Agency - Web Development & Design",
        description: "Mowglai is a premium digital agency creating stunning, high-performance websites and web applications. Expert web development, 3D design, and immersive digital experiences.",
        url: "/",
        images: [
            {
                url: "/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai - Premium Digital Agency"
            }
        ],
        type: "website",
        siteName: "Mowglai",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Premium Digital Agency - Web Development & Design",
        description: "Mowglai is a premium digital agency creating stunning, high-performance websites and web applications.",
        images: ["/mowglai-logo-new.jpg"],
        creator: "@mowglai",
        site: "@mowglai",
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

import UnderMaintenance from "@/components/UnderMaintenance";
import OriginalHome from "@/styles/original/Home";

export default function Home() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <UnderMaintenance />
            {/* <OriginalHome /> */}
        </>
    );
}
