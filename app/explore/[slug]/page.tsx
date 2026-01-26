import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getTemplateById, allTemplates, type Template } from "@/data/templates";
import TemplateActions from "./TemplateActions";
import TemplateGallery from "./TemplateGallery";
import PremiumTemplateCard from "@/components/PremiumTemplateCard";

// Required for static export
export function generateStaticParams() {
    const params: { slug: string }[] = [];
    for (const sector in allTemplates) {
        allTemplates[sector].forEach((template) => {
            params.push({ slug: template.id });
        });
    }
    return params;
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const template = getTemplateById(slug);

    if (!template) {
        return {
            title: "Template Not Found | Mowglai",
            description: "The requested website template could not be found.",
        };
    }

    return {
        title: `${template.title} - ${template.type} Website Template | Mowglai`,
        description: template.description,
        openGraph: {
            title: `${template.title} - Premium ${template.type} Template | Mowglai`,
            description: template.description,
            images: [
                {
                    url: template.image,
                    width: 1200,
                    height: 630,
                    alt: template.title,
                },
            ],
            type: "website",
        },
    };
}

export default async function TemplateDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const template = getTemplateById(slug);

    if (!template) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": template.title,
        "image": [template.image],
        "description": template.description,
        "brand": {
            "@type": "Brand",
            "name": "Mowglai"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://mowglai.in/explore/${template.id}`,
            "priceCurrency": "USD", // Assuming USD for now based on standard
            "price": template.price === "Free" ? "0" : template.price.replace(/[^0-9.]/g, ''),
            "availability": "https://schema.org/InStock"
        }
    };

    // Find related templates (same sector, excluding current)
    let relatedTemplates: Template[] = []
    for (const sector in allTemplates) {
        if (allTemplates[sector].some(t => t.id === template.id)) {
            relatedTemplates = allTemplates[sector]
                .filter(t => t.id !== template.id)
                .slice(0, 3)
            break
        }
    }

    return (
        <PageLayout>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-background relative overflow-x-hidden">
                {/* Visual Background layer */}
                <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none -z-20" />
                <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen animate-pulse-glow" />
                <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none -z-10" />

                <div className="max-w-[1700px] mx-auto pt-32 pb-48 px-4 md:px-8 lg:px-12">

                    {/* Top Navigation Bar */}
                    <div className="flex items-center justify-between mb-12">
                        <Link
                            href="/explore"
                            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors px-5 py-2.5 rounded-full border border-white/5 hover:bg-white/5 backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            <span className="font-medium">Back to Collection</span>
                        </Link>

                        {/* Breadcrumbs or Category Tag */}
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-muted-foreground/60">{template.type}</span>
                            <span className="text-muted-foreground/40">/</span>
                            <span className="text-white font-medium">{template.title}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                        {/* Image Gallery Section (Left - 8 cols) */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Main Image Container with premium shadow/glow */}
                            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60" />
                                <TemplateGallery
                                    images={[template.image, ...(template.gallery || [])]}
                                    title={template.title}
                                />
                                {/* Overlay Content on Image */}
                                <div className="hidden absolute bottom-8 left-8 z-20 md:flex flex-col">
                                    <h2 className="text-3xl font-display font-bold text-white drop-shadow-lg">{template.title}</h2>
                                    <p className="text-white/80 text-sm font-light tracking-wide">{template.type} Template</p>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Details Sidebar (Right - 4 cols) */}
                        <div className="lg:col-span-4 relative">
                            <div className="lg:sticky lg:top-32 space-y-6">

                                {/* Info Card */}
                                <div className="p-8 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none -z-10 group-hover:bg-primary/30 transition-all duration-700" />

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {template.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
                                        {template.title}
                                    </h1>

                                    <div className="prose prose-sm dark:prose-invert mb-8">
                                        <p className="text-muted-foreground leading-relaxed font-light text-base">
                                            {template.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between py-6 border-t border-white/10 mb-6">
                                        <div>
                                            <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Price</span>
                                            <span className="text-3xl font-display font-bold text-white">{template.price}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-1">Pages</span>
                                            <span className="text-xl font-bold text-white">{template.pages}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="hidden lg:block">
                                        <TemplateActions templateId={template.id} price={template.price} />
                                    </div>

                                    {/* Features Grid */}
                                    {template.features && (
                                        <div className="mt-8 pt-8 border-t border-white/10">
                                            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-primary">
                                                Highlights
                                            </h3>
                                            <ul className="grid grid-cols-1 gap-3">
                                                {template.features.map((feature) => (
                                                    <li
                                                        key={feature}
                                                        className="flex items-center gap-3 text-sm text-white/80"
                                                    >
                                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Templates */}
                    {relatedTemplates.length > 0 && (
                        <div className="mt-40 mb-20 relative">
                            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                                <div>
                                    <span className="text-primary font-display text-sm tracking-widest uppercase">Keep Exploring</span>
                                    <h2 className="text-4xl font-display font-bold text-white mt-2">Similar Templates</h2>
                                </div>
                                <Link href="/explore" className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                                    View Collection <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relatedTemplates.map(t => (
                                    <PremiumTemplateCard key={t.id} template={t} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Floating Bottom Bar for Actions */}
                <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-9rem)] max-w-sm bg-[#050a08]/90 backdrop-blur-3xl border border-white/10 p-2 pl-6 rounded-full z-50 shadow-2xl safe-area-bottom flex items-center justify-between">
                    <TemplateActions templateId={template.id} price={template.price} isMobileBar />
                </div>
            </div>
        </PageLayout>
    );
}
