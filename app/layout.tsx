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
        default: "Mowglai - Premium Web Development & Digital Agency India",
        template: "%s | Mowglai - Web Development Agency"
    },
    description: "Mowglai is a premium web development and digital agency based in India. We create award-winning websites, 3D experiences, high-performance web apps, and provide expert SEO services. Specializing in React, Next.js, and modern web technologies.",
    keywords: [
        "Mowglai",
        "Mowglai web development",
        "Mowglai digital agency",
        "web development India",
        "web design agency",
        "digital agency Noida",
        "3D website development",
        "React developer India",
        "Next.js development",
        "SEO services India",
        "premium website templates",
        "custom web development",
        "e-commerce development",
        "mobile app development",
        "UI UX design agency",
        "creative agency India",
        "website redesign services",
        "frontend development",
        "full stack development"
    ],
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
        title: "Mowglai - Premium Web Development & Digital Agency India",
        description: "Award-winning web development and digital agency. We create stunning websites, 3D experiences, and high-performance web apps using React, Next.js, and modern technologies.",
        siteName: "Mowglai - Web Development Agency",
        images: [{
            url: "https://mowglai.in/mowglai-logo-new.jpg",
            width: 1200,
            height: 1200,
            alt: "Mowglai - Premium Digital Agency & Web Development"
        }],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mowglai - Premium Web Development & Digital Agency India",
        description: "Award-winning web development and digital agency. We create stunning websites, 3D experiences, and high-performance web apps.",
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
        google: "Evz63X8emo75NARUTxWl7zuik4hstQOoYls6MKipByA",
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
                    <div id="main-content" style={{ display: 'none' }} suppressHydrationWarning>
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
