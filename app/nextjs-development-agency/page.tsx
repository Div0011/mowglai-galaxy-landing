import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
    title: "Next.js Development Agency India | Mowglai",
    description: "Mowglai is a Next.js development agency in India building high-performance web apps, SaaS platforms, and MVC-ready architectures for startups and enterprises.",
    keywords: [
        "Next.js development agency",
        "Next.js developers India",
        "React agency India",
        "SaaS web apps",
        "MVP development",
        "MVC architecture",
        "performance optimization",
    ],
    alternates: {
        canonical: "https://mowglai.in/nextjs-development-agency",
    },
    openGraph: {
        title: "Next.js Development Agency India | Mowglai",
        description: "High-performance Next.js web apps, SaaS platforms, and MVPs built by Mowglai.",
        url: "https://mowglai.in/nextjs-development-agency",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Next.js Development",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Next.js Development Agency India | Mowglai",
        description: "Next.js web apps, SaaS platforms, and MVPs built for speed and scale.",
        images: ["https://mowglai.in/mowglai-logo-new.jpg"],
    },
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Next.js Development",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency",
        "url": "https://mowglai.in",
    },
    "areaServed": "Worldwide",
    "offers": {
        "@type": "Offer",
        "name": "Next.js Web App Development",
        "url": "https://mowglai.in/nextjs-development-agency",
    },
};

export default function NextJsDevelopmentAgencyPage() {
    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
            />
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-24 font-body">
                <div className="max-w-6xl mx-auto">
                    <section className="space-y-6 mb-16">
                        <p className="text-xs md:text-sm font-display tracking-[0.4em] uppercase text-primary/80">Next.js Specialists</p>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight">
                            Next.js Development Agency
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            We build blazing-fast web apps, SaaS platforms, and MVPs with Next.js. Expect clean MVC architecture, seamless
                            integrations, and performance-first engineering.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform"
                            >
                                Hire Next.js Team
                            </Link>
                            <Link
                                href="/services"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-primary/30 text-primary font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-primary/10 transition-colors"
                            >
                                Explore Services
                            </Link>
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-3 mb-16">
                        {[
                            { title: "Performance", text: "Core Web Vitals, caching, and optimized rendering for speed." },
                            { title: "Scalability", text: "Modular architecture and clean API layers for growth." },
                            { title: "Product UX", text: "Intuitive flows and conversion-focused interfaces." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                                <h2 className="text-xl font-display font-bold uppercase mb-3">{item.title}</h2>
                                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </section>

                    <section className="rounded-3xl border border-primary/10 bg-secondary/10 p-8 md:p-12 mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-6">Services for Startups</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <ul className="space-y-3 text-muted-foreground">
                                <li>Next.js SaaS platforms</li>
                                <li>MVP builds with rapid sprints</li>
                                <li>Landing pages that convert</li>
                                <li>API integration and dashboards</li>
                            </ul>
                            <ul className="space-y-3 text-muted-foreground">
                                <li>Authentication and payments</li>
                                <li>CMS and content pipelines</li>
                                <li>Performance and SEO tuning</li>
                                <li>Scaling and maintenance</li>
                            </ul>
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-2 mb-16">
                        <div className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                            <h2 className="text-2xl font-display font-bold uppercase mb-4">Stack</h2>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "Next.js",
                                    "React",
                                    "TypeScript",
                                    "Node.js",
                                    "PostgreSQL",
                                    "Prisma",
                                    "Vercel",
                                    "AWS",
                                ].map((tech) => (
                                    <span key={tech} className="px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-widest">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                            <h2 className="text-2xl font-display font-bold uppercase mb-4">FAQs</h2>
                            <div className="space-y-4 text-sm sm:text-base text-muted-foreground">
                                <p><span className="text-foreground font-semibold">Do you optimize for SEO?</span> Yes, on-page SEO and performance are built in.</p>
                                <p><span className="text-foreground font-semibold">Can you migrate to Next.js?</span> We handle audits, migration, and re-platforming.</p>
                                <p><span className="text-foreground font-semibold">Do you support ongoing updates?</span> We offer maintenance and growth sprints.</p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center rounded-3xl border border-primary/10 bg-primary/10 p-10">
                        <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-4">Build With Next.js</h2>
                        <p className="text-muted-foreground mb-6">Ready for a fast, scalable product? Let us build it with Next.js.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform"
                        >
                            Talk to Our Team
                        </Link>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
