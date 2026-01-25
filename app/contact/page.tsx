import PageLayout from "@/components/PageLayout";
import ContactSection from "@/components/ContactSection";
import NextPageButton from "@/components/NextPageButton";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import Link from "next/link";

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
        <PageLayout>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <ContactSection />

            <section className="relative py-20">
                <div className="container mx-auto px-6">
                    <div className="glass-card p-8 sm:p-12 md:p-20 rounded-[2.5rem] sm:rounded-[3rem] border-primary/20 text-center relative overflow-hidden group mx-4 md:mx-0" data-aos="zoom-in">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-primary/10" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32 transition-all group-hover:bg-primary/10" />

                        <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-8 opacity-50" />
                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-black text-foreground mb-8 uppercase leading-tight px-2">
                            NEED <span className="opacity-20">A</span> CUSTOMIZED QUOTATION?
                        </h2>
                        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 px-4">
                            Every project is unique. Let us provide a detailed, tailored breakdown of costs and timelines for your specific requirements.
                        </p>
                        <Button asChild className="w-full sm:w-auto px-4 sm:px-12 py-6 sm:py-8 text-sm sm:text-xl font-display font-black uppercase tracking-widest bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-all rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] mx-auto inline-flex items-center justify-center">
                            <Link href="/custom-request" className="flex flex-col sm:flex-row items-center leading-tight">
                                <span className="whitespace-nowrap">REQUEST CUSTOM</span>
                                <span className="sm:ml-2 whitespace-nowrap">QUOTATION</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

<<<<<<< HEAD
            <NextPageButton label="BACK TO START" href="/" />
=======
<<<<<<< HEAD
            <NextPageButton label="BACK TO START" href="/" />
=======
            <NextPageButton label="RETURN HOME" href="/" />
>>>>>>> main
>>>>>>> refactor/nav-and-content-updates
        </PageLayout>
    );
}
