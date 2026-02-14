import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
    title: "Web Development Agency India | Mowglai",
    description: "Mowglai is a web development agency in India delivering high-performance websites, SaaS platforms, MVPs, and MVC architecture for startups and enterprises.",
    keywords: [
        "web development agency India",
        "web development company India",
        "startup web development",
        "SaaS development India",
        "MVP development",
        "MVC architecture",
        "React Next.js agency",
    ],
    alternates: {
        canonical: "https://mowglai.in/web-development-agency-india",
    },
    openGraph: {
        title: "Web Development Agency India | Mowglai",
        description: "High-performance websites, SaaS platforms, and MVPs for startups and enterprises in India.",
        url: "https://mowglai.in/web-development-agency-india",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Web Development Agency India",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Web Development Agency India | Mowglai",
        description: "Web development for startups and enterprises: SaaS, MVPs, MVC architecture, React and Next.js.",
        images: ["https://mowglai.in/mowglai-logo-new.jpg"],
    },
};

const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Mowglai Digital Agency",
    "url": "https://mowglai.in/web-development-agency-india",
    "areaServed": "India",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN",
    },
    "sameAs": [
        "https://www.instagram.com/mowglai",
        "https://www.linkedin.com/company/mowglai",
        "https://twitter.com/mowglai_in",
    ],
};

export default function WebDevelopmentAgencyIndiaPage() {
    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
            />
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-24 font-body">
                <div className="max-w-6xl mx-auto">
                    <section className="space-y-6 mb-16">
                        <p className="text-xs md:text-sm font-display tracking-[0.4em] uppercase text-primary/80">India Based, Global Delivery</p>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight">
                            Web Development Agency in India
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            Mowglai helps startups and enterprises build fast, reliable, and conversion-driven websites. From SaaS
                            platforms to MVPs and full-stack web apps, we deliver modern digital craftsmanship from India to the world.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform"
                            >
                                Get a Proposal
                            </Link>
                            <Link
                                href="/services"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-primary/30 text-primary font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-primary/10 transition-colors"
                            >
                                See Services
                            </Link>
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-3 mb-16">
                        {[
                            { title: "Startup Ready", text: "MVPs, SaaS platforms, and product-led growth support." },
                            { title: "Enterprise Grade", text: "Secure, scalable, and maintainable web architectures." },
                            { title: "Global Standards", text: "Performance, accessibility, and SEO baked in." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                                <h2 className="text-xl font-display font-bold uppercase mb-3">{item.title}</h2>
                                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </section>

                    <section className="rounded-3xl border border-primary/10 bg-secondary/10 p-8 md:p-12 mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-6">What We Deliver</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <ul className="space-y-3 text-muted-foreground">
                                <li>Custom websites and landing pages</li>
                                <li>SaaS platforms and dashboards</li>
                                <li>MVP builds with rapid iteration</li>
                                <li>CMS integrations and content ops</li>
                            </ul>
                            <ul className="space-y-3 text-muted-foreground">
                                <li>Performance and SEO optimization</li>
                                <li>API integrations and automation</li>
                                <li>Security-first architecture</li>
                                <li>Design systems and UI/UX</li>
                            </ul>
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-2 mb-16">
                        <div className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                            <h2 className="text-2xl font-display font-bold uppercase mb-4">Industries</h2>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "SaaS",
                                    "Fintech",
                                    "Edtech",
                                    "Healthtech",
                                    "E-commerce",
                                    "Real Estate",
                                    "Agencies",
                                    "Consumer Apps",
                                ].map((sector) => (
                                    <span key={sector} className="px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-widest">
                                        {sector}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                            <h2 className="text-2xl font-display font-bold uppercase mb-4">FAQs</h2>
                            <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
                                <p><span className="text-foreground font-semibold">Where are you based?</span> Noida, India with global delivery.</p>
                                <p><span className="text-foreground font-semibold">Do you build MVPs?</span> Yes, for early-stage teams and founders.</p>
                                <p><span className="text-foreground font-semibold">Can you handle ongoing growth?</span> We provide long-term support and scale teams.</p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center rounded-3xl border border-primary/10 bg-primary/10 p-10">
                        <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-4">Work With Mowglai</h2>
                        <p className="text-muted-foreground mb-6">Get a roadmap and proposal tailored to your goals.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform"
                        >
                            Start a Project
                        </Link>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
