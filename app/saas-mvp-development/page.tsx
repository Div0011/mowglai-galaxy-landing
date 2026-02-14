import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
    title: "SaaS MVP Development India | Mowglai",
    description: "Launch a SaaS MVP fast with Mowglai. We design, build, and scale MVPs with React, Next.js, and MVC architecture for startups in India and worldwide.",
    keywords: [
        "SaaS MVP development India",
        "MVP development agency",
        "startup product development",
        "MVP build",
        "MVC architecture",
        "React MVP",
        "Next.js MVP",
        "SaaS product development",
    ],
    alternates: {
        canonical: "https://mowglai.in/saas-mvp-development",
    },
    openGraph: {
        title: "SaaS MVP Development India | Mowglai",
        description: "Design, build, and launch SaaS MVPs fast. React, Next.js, MVC architecture, and startup-ready delivery.",
        url: "https://mowglai.in/saas-mvp-development",
        images: [
            {
                url: "https://mowglai.in/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai SaaS MVP Development",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "SaaS MVP Development India | Mowglai",
        description: "Launch a SaaS MVP fast with React, Next.js, and MVC architecture.",
        images: ["https://mowglai.in/mowglai-logo-new.jpg"],
    },
};

const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "SaaS MVP Development",
    "provider": {
        "@type": "Organization",
        "name": "Mowglai Digital Agency",
        "url": "https://mowglai.in",
    },
    "areaServed": "Worldwide",
    "offers": {
        "@type": "Offer",
        "name": "SaaS MVP Build",
        "url": "https://mowglai.in/saas-mvp-development",
    },
};

export default function SaasMvpDevelopmentPage() {
    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
            />
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-24 py-24 font-body">
                <div className="max-w-6xl mx-auto">
                    <section className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center mb-20">
                        <div className="space-y-6">
                            <p className="text-xs md:text-sm font-display tracking-[0.4em] uppercase text-primary/80">Startup Launch</p>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black uppercase tracking-tight">
                                SaaS MVP Development
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Validate your idea fast with a production-grade MVP. We build SaaS products with clean MVC architecture,
                                rapid iteration cycles, and scalable foundations using React and Next.js.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform"
                                >
                                    Start Your MVP
                                </Link>
                                <Link
                                    href="/services"
                                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-primary/30 text-primary font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-primary/10 transition-colors"
                                >
                                    View Services
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-primary/15 bg-secondary/10 p-8 backdrop-blur-xl">
                            <p className="text-xs font-display uppercase tracking-[0.3em] text-primary/70">What You Get</p>
                            <ul className="mt-5 space-y-3 text-sm sm:text-base text-foreground/80">
                                <li>Product strategy and scope in 7-10 days</li>
                                <li>Clickable prototype and UX flows</li>
                                <li>Core feature build with MVC foundations</li>
                                <li>Analytics, auth, and payments ready</li>
                                <li>Launch plan and post-MVP roadmap</li>
                            </ul>
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-3 mb-20">
                        {[
                            {
                                title: "Built for Startups",
                                text: "Rapid sprints, pragmatic scope, and a roadmap that investors understand.",
                            },
                            {
                                title: "Scalable Architecture",
                                text: "Clean MVC patterns, modular services, and future-proof foundations.",
                            },
                            {
                                title: "Speed + Quality",
                                text: "Ship fast without cutting corners on performance, security, and UX.",
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                                <h2 className="text-xl font-display font-bold uppercase mb-3">{item.title}</h2>
                                <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </section>

                    <section className="rounded-3xl border border-primary/10 bg-secondary/10 p-8 md:p-12 mb-20">
                        <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-6">MVP Delivery Process</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {[
                                { title: "Discovery", text: "Market, scope, and UX mapping to define the MVP core." },
                                { title: "Build", text: "Sprints for features, API, and UI with weekly demos." },
                                { title: "Launch", text: "Deployment, analytics, and roadmap for iteration." },
                            ].map((step) => (
                                <div key={step.title} className="rounded-2xl border border-primary/10 bg-background/5 p-6">
                                    <h3 className="text-lg font-display font-bold uppercase mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-2 mb-20">
                        <div className="rounded-3xl border border-primary/10 bg-background/5 p-8">
                            <h2 className="text-2xl font-display font-bold uppercase mb-4">Tech Stack</h2>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "React",
                                    "Next.js",
                                    "TypeScript",
                                    "Node.js",
                                    "PostgreSQL",
                                    "Redis",
                                    "Stripe",
                                    "AWS/Vercel",
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
                                <p><span className="text-foreground font-semibold">How fast can we ship?</span> Typically 4-8 weeks for a focused MVP.</p>
                                <p><span className="text-foreground font-semibold">Do you handle product strategy?</span> Yes, we align scope, market, and metrics early.</p>
                                <p><span className="text-foreground font-semibold">Can you scale after MVP?</span> We design for growth and add teams post-launch.</p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center rounded-3xl border border-primary/10 bg-primary/10 p-10">
                        <h2 className="text-3xl md:text-4xl font-display font-black uppercase mb-4">Launch Your SaaS MVP</h2>
                        <p className="text-muted-foreground mb-6">Tell us your idea and timeline. We will map the MVP and ship fast.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs sm:text-sm hover:scale-105 transition-transform"
                        >
                            Book a Strategy Call
                        </Link>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
