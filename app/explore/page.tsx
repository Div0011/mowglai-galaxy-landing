import ExploreClient from "./ExploreClient";

export const metadata = {
    title: "Explore Premium Website Templates | Mowglai",
    description: "Browse our collection of high-performance, aesthetically pleasing website templates. Perfect for agencies, startups, and creative professionals.",
    keywords: ["website templates", "webflow templates", "nextjs templates", "premium web designs", "agency templates", "portfolio website templates", "landing page templates", "mowglai templates"],
    openGraph: {
        title: "Explore Premium Website Templates | Mowglai",
        description: "Browse our collection of high-performance, aesthetically pleasing website templates. Perfect for agencies, startups, and creative professionals.",
        url: "/explore",
        images: [
            {
                url: "/mowglai-logo-new.jpg",
                width: 1200,
                height: 1200,
                alt: "Mowglai Premium Templates"
            }
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Explore Premium Website Templates | Mowglai",
        description: "Browse our collection of high-performance, aesthetically pleasing website templates. Perfect for agencies, startups, and creative professionals.",
        images: ["/mowglai-logo-new.jpg"],
    },
};

export default function ExplorePage() {
    return <ExploreClient />;
}
