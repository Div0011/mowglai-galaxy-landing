import type { Metadata } from "next";
import localFont from "next/font/local";
import "../src/index.css";
import { Providers } from "@/components/Providers";
import { AOSInit } from "@/components/AOSInit";
import { LanguageProvider } from "@/context/LanguageContext";

const boldonse = localFont({
    src: "../public/fonts/Boldonse-Regular.ttf",
    variable: "--font-display",
});

const josefinSans = localFont({
    src: "../public/fonts/Josefin_Sans/JosefinSans-VariableFont_wght.ttf",
    variable: "--font-body",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://mowglai.in"),
    title: {
        default: "Mowglai | Premium Digital Agency & Web Development",
        template: "%s | Mowglai"
    },
    description: "Mowglai is a premium digital agency crafting award-winning websites, 3D experiences, and high-performance web apps. Dominate your industry with our digital excellence.",
    keywords: ["web development", "web design", "digital agency", "3D websites", "React developer", "Next.js", "SEO services", "premium website templates", "creative agency", "Mowglai"],
    authors: [{ name: "Mowglai" }],
    creator: "Mowglai",
    publisher: "Mowglai",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        url: "https://mowglai.in/",
        title: "Mowglai | Premium Digital Agency & Web Development",
        description: "Mowglai creates stunning, high-performance websites and web applications.",
        siteName: "Mowglai",
        images: [{
            url: "https://mowglai.in/mowglai-logo-new.jpg",
            width: 1200,
            height: 1200,
            alt: "Mowglai Digital Excellence"
        }],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mowglai | Premium Digital Agency & Web Development",
        description: "Mowglai creates stunning, high-performance websites and web applications.",
        images: ["https://mowglai.in/mowglai-logo-new.jpg"],
        creator: "@mowglai",
    },
    icons: {
        icon: [
            { url: "/mowglai-logo-new.jpg", type: "image/jpeg", sizes: "any" }
        ],
        apple: [
            { url: "/mowglai-logo-new.jpg", sizes: "180x180", type: "image/jpeg" }
        ],
    },
    manifest: "/site.webmanifest",
    alternates: {
        canonical: "https://mowglai.in",
    },
    verification: {
        google: "google-site-verification-code", // Replace with actual code if available
    },
    category: "technology",
    classification: "Digital Agency",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${boldonse.variable} ${josefinSans.variable}`} suppressHydrationWarning>
            <body className="antialiased">
                <LanguageProvider>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                document.documentElement.classList.add('js-enabled');
                            `
                        }}
                    />
                    <noscript>
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#0a0a0a',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            zIndex: 999999,
                            textAlign: 'center',
                            padding: '20px'
                        }}>
                            <h1 style={{
                                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                                fontWeight: 'bold',
                                marginBottom: '1rem'
                            }}>
                                JavaScript Required
                            </h1>
                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                                maxWidth: '600px',
                                lineHeight: 1.6
                            }}>
                                To continue exploring our website, please enable JavaScript in your browser settings.
                            </p>
                        </div>
                    </noscript>
                    <div id="main-content" style={{ display: 'none' }}>
                        <Providers>
                            <AOSInit />
                            {children}
                        </Providers>
                    </div>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                document.getElementById('main-content').style.display = 'block';
                            `
                        }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@graph": [
                                    {
                                        "@type": "WebSite",
                                        "@id": "https://mowglai.in/#website",
                                        "url": "https://mowglai.in",
                                        "name": "Mowglai Digital Agency",
                                        "description": "Premium digital agency specializing in high-performance web development, 3D experiences, and digital transformation.",
                                        "publisher": {
                                            "@id": "https://mowglai.in/#organization"
                                        },
                                        "potentialAction": {
                                            "@type": "SearchAction",
                                            "target": {
                                                "@type": "EntryPoint",
                                                "urlTemplate": "https://mowglai.in/search?q={search_term_string}"
                                            },
                                            "query-input": "required name=search_term_string"
                                        }
                                    },
                                    {
                                        "@type": "ProfessionalService",
                                        "@id": "https://mowglai.in/#organization",
                                        "name": "Mowglai Digital Agency",
                                        "url": "https://mowglai.in",
                                        "logo": "https://mowglai.in/logo1.png",
                                        "image": "https://mowglai.in/logo1.png",
                                        "priceRange": "$$-$$$",
                                        "description": "Premium digital agency providing web development, 3D design, and digital transformation services.",
                                        "address": {
                                            "@type": "PostalAddress",
                                            "addressLocality": "Noida",
                                            "addressRegion": "Uttar Pradesh",
                                            "addressCountry": "IN"
                                        },
                                        "geo": {
                                            "@type": "GeoCoordinates",
                                            "latitude": "28.5355",
                                            "longitude": "77.3910"
                                        },
                                        "contactPoint": {
                                            "@type": "ContactPoint",
                                            "telephone": "+91-9528545302",
                                            "contactType": "customer service",
                                            "areaServed": "Worldwide",
                                            "availableLanguage": ["English", "Hindi"]
                                        },
                                        "sameAs": [
                                            "https://www.instagram.com/mowglai",
                                            "https://www.linkedin.com/company/mowglai",
                                            "https://twitter.com/mowglai"
                                        ],
                                        "openingHoursSpecification": {
                                            "@type": "OpeningHoursSpecification",
                                            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                            "opens": "09:00",
                                            "closes": "20:00"
                                        },
                                        "areaServed": "Worldwide"
                                    }
                                ]
                            }),
                        }}
                    />
                </LanguageProvider>
            </body>
        </html>
    );
}
