import { Metadata } from 'next';
import RedesignedHome from "@/components/RedesignedHome";

export const metadata: Metadata = {
  title: "Mowglai - Premium Web Design, 3D Experiences & Agency",
  description: "Mowglai is a high-performance web development and digital agency. Build SaaS platforms, MVPs, custom 3D web experiences, and premium templates using React and Next.js.",
  keywords: [
    "Mowglai landing page",
    "Mowglai web development",
    "3D website design",
    "premium digital agency",
    "SaaS MVP development"
  ],
  alternates: {
    canonical: "https://mowglai.com/landing/",
  }
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mowglai.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Landing",
      "item": "https://mowglai.com/landing"
    }
  ]
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <RedesignedHome />
    </>
  );
}
