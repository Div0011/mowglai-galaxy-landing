import PageLayout from "@/components/PageLayout";
import { Code2, Layers, Zap, Target, Users, Rocket, CheckCircle2 } from "lucide-react";
import NextPageButton from "@/components/NextPageButton";

const workflowSteps = [
    {
        number: "01",
        title: "Discovery & Strategy",
        description: "We dive deep into your business, understanding your goals, audience, and competitive landscape.",
        icon: Target,
        details: ["Market Research", "Competitor Analysis", "User Personas", "Business Objectives Mapping"]
    },
    {
        number: "02",
        title: "Design & Architecture",
        description: "Crafting wireframes and visual designs that blend aesthetics with functionality.",
        icon: Layers,
        details: ["UI/UX Design", "Information Architecture", "Brand Integration", "Responsive Mockups"]
    },
    {
        number: "03",
        title: "Development & Engineering",
        description: "Building robust, scalable code with the latest technologies and best practices.",
        icon: Code2,
        details: ["Frontend Development", "Backend Integration", "Database Design", "API Development"]
    },
    {
        number: "04",
        title: "Testing & Optimization",
        description: "Rigorous testing ensures every pixel and line of code works flawlessly.",
        icon: Zap,
        details: ["Performance Testing", "Cross-browser Testing", "SEO Optimization", "Security Audits"]
    },
    {
        number: "05",
        title: "Launch & Beyond",
        description: "Deployment with ongoing support, monitoring, and continuous improvement.",
        icon: Rocket,
        details: ["Deployment Strategy", "Analytics Setup", "Training & Documentation", "24/7 Support"]
    }
];

const principles = [
    {
        title: "User-Centric Design",
        description: "Every decision is made with your end user in mind.",
        icon: Users
    },
    {
        title: "Performance First",
        description: "Lightning-fast load times and smooth interactions.",
        icon: Zap
    },
    {
        title: "Scalable Architecture",
        description: "Built to grow with your business needs.",
        icon: Layers
    },
    {
        title: "Clean Code",
        description: "Maintainable, well-documented, future-proof code.",
        icon: Code2
    }
];

export const metadata = {
    title: "Our DNA: Core Values & Development Process",
    description: "Discover Mowglai's DNA: our core values, innovative development process, and workflow methodology. Learn how we deliver world-class digital experiences through precision, creativity, and technical excellence.",
    keywords: ["Mowglai DNA", "web development process", "agency core values", "development workflow", "web development methodology", "digital agency culture", "creative process", "technical excellence", "project workflow"],
    alternates: {
        canonical: "/our-dna",
    },
    openGraph: {
        title: "Our DNA: Core Values & Development Process",
        description: "Discover Mowglai's DNA: our core values, innovative development process, and workflow methodology. Learn how we deliver world-class digital experiences.",
        url: "/our-dna",
        images: [
            {
                url: "/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Our DNA - Core Values"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Our DNA: Core Values & Development Process",
        description: "Discover Mowglai's DNA: our core values, innovative development process, and workflow methodology.",
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
            "name": "Our DNA",
            "item": "https://mowglai.in/our-dna"
        }
    ]
};

export default function OurDNA() {
    return (
        <PageLayout>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <section className="relative min-h-screen flex items-center justify-center py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-5xl mx-auto" data-aos="fade-up">
                        <div className="inline-block glassmorphism px-6 py-2 rounded-full border border-primary/30 mb-8">
                            <p className="text-primary font-display text-sm uppercase tracking-[0.3em]">
                                🧬 Global Design Standards
                            </p>
                        </div>

                        <h1 className="text-6xl sm:text-7xl md:text-[10vw] font-display font-black text-foreground mb-6 leading-[0.85] uppercase">
                            <span className="block opacity-10">Our</span>
                            <span className="block text-primary -mt-4">DNA</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Welcome to Mowglai. Here is how we craft world-class digital experiences for international clients through precision and creativity.
                        </p>

                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <div className="glassmorphism px-6 py-3 rounded-full border border-primary/20">
                                <p className="font-display text-primary font-bold">Immersive Design</p>
                            </div>
                            <div className="glassmorphism px-6 py-3 rounded-full border border-primary/20">
                                <p className="font-display text-primary font-bold">Technical Precision</p>
                            </div>
                            <div className="glassmorphism px-6 py-3 rounded-full border border-primary/20">
                                <p className="font-display text-primary font-bold">Strategic Growth</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-5xl md:text-7xl font-display font-black text-foreground mb-4 uppercase">
                            Our <span className="text-primary">Workflow</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            A proven process refined over hundreds of projects to ensure excellence at every stage.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-8">
                        {workflowSteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={index}
                                    data-aos="fade-right"
                                    data-aos-delay={index * 100}
                                    className="group relative glassmorphism p-8 rounded-[2rem] border border-primary/20 hover:border-primary transition-all duration-500"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="flex items-center gap-6">
                                            <div className="text-8xl font-display font-black text-primary/10 select-none">
                                                {step.number}
                                            </div>
                                            <Icon className="hidden md:block w-12 h-12 text-primary flex-shrink-0" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-3xl font-display font-bold text-primary mb-3 uppercase">
                                                {step.title}
                                            </h3>
                                            <p className="text-[22px] text-muted-foreground mb-4 leading-relaxed">
                                                {step.description}
                                            </p>
                                            <div className="grid grid-cols-2 gap-3">
                                                {step.details.map((detail, detailIndex) => (
                                                    <div key={detailIndex} className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                                        <span className="text-lg text-foreground">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative py-24 bg-gradient-to-b from-primary/5 to-transparent">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-5xl md:text-7xl font-display font-black text-foreground mb-4 uppercase">
                            Core <span className="text-primary">Principles</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The fundamental values that guide every project we undertake.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {principles.map((principle, index) => {
                            const Icon = principle.icon;
                            return (
                                <div
                                    key={index}
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 100}
                                    className="glassmorphism p-8 rounded-[2rem] border border-primary/20 hover:border-primary transition-all duration-500 text-center group"
                                >
                                    <Icon className="w-16 h-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-display font-bold text-primary mb-2 uppercase">
                                        {principle.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {principle.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <NextPageButton label="OUR EXPERTISE" href="/services" />
        </PageLayout>
    );
}
