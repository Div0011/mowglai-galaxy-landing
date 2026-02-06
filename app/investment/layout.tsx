import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Pricing & Investment | Mowglai Web Development Services",
    description: "Explore Mowglai's transparent pricing for web development services. From $499 basic websites to custom enterprise solutions. View our website packages, maintenance plans, and add-on services. Get 10% off with code MOWGLAI10.",
    keywords: [
        "Mowglai pricing",
        "web development cost",
        "website design pricing",
        "custom website cost India",
        "web development packages",
        "affordable web design",
        "website maintenance plans",
        "ecommerce development cost",
        "React development pricing",
        "Next.js development cost"
    ],
    alternates: {
        canonical: "https://mowglai.in/investment",
    },
    openGraph: {
        title: "Pricing & Investment | Mowglai Web Development Services",
        description: "Transparent pricing for web development services. From $499 basic websites to custom enterprise solutions. View packages and get 10% off.",
        url: "https://mowglai.in/investment",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Pricing and Investment"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pricing & Investment | Mowglai Web Development Services",
        description: "Transparent pricing for web development services. From $499 basic websites to enterprise solutions.",
        images: ["https://mowglai.in/mowglai-logo-new.jpg"],
    },
};

export default function InvestmentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
