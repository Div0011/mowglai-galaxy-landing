import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import NextPageButton from "@/components/NextPageButton";
import { AestheticShowcase } from "@/components/AestheticShowcase";
import SelectedWork from "@/components/SelectedWork";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";

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

export default function Home() {
    return (
        <PageLayout>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
            <div className="relative w-full h-screen">
                <HeroSection />
            </div>

            {/* Extra Introductory Content */}
            <section className="relative py-16 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
                        <div data-aos="fade-up" className="break-words w-full pt-12 md:pt-0">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                                WE CREATE <span className="opacity-10">THE</span> <span className="text-primary italic">EXTRAORDINARY</span>
                            </h2>
                            <p className="text-xl text-muted-foreground font-body leading-relaxed mb-12">
                                In a digital landscape crowded with the mundane, Mowglai Wild stands as a beacon of growth. We don't just build websites; we architect digital ecosystems that breathe life into your brand's vision.
                            </p>


                        </div>

                        {/* Sequential Cards Presentation - Pulled up */}
                        <div className="md:-mt-24">
                            <AestheticShowcase />
                        </div>
                    </div>
                </div>
            </section>


            <SelectedWork />

            {/* Explore Templates CTA */}
            <section className="relative py-24 overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-3xl md:text-5xl font-display font-black mb-8 uppercase" data-aos="fade-up">
                        Purchase <span className="text-primary italic">Templates</span>
                    </h3>
                    <div className="max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
                        <p className="text-xl text-muted-foreground">
                            Accelerate your launch with our premium, industry-specific website templates. Handcrafted for performance and designed to convert.
                        </p>
                    </div>
                </div>

                {/* Full Width Button */}
                <div className="w-full" data-aos="fade-up" data-aos-delay="200">
                    <NextPageButton label="VIEW SELECTED WORK" href="/explore" />
                </div>
            </section>




            {/* Consult for Free Button */}
            <div className="w-full flex flex-col items-center justify-center pb-12 pt-12 relative z-20">
                <p className="text-sm md:text-base font-display tracking-widest uppercase mb-8 text-muted-foreground/60" data-aos="fade-up">
                    Ready to Begin the Journey?
                </p>
                <Magnetic>
                    <Link
                        href="/contact"
                        className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 bg-primary text-primary-foreground text-sm sm:text-lg font-bold uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-colors duration-300 rounded-full text-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                    >
                        Consult for Free
                    </Link>
                </Magnetic>
            </div>

            <div className="w-full">
                <NextPageButton
                    label="THE STUDIO STORY"
                    href="/about"
                    tagline="Still not sure? Know more"
                />
            </div>
        </PageLayout>
    );
}
