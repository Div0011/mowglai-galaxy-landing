import { Metadata } from 'next';
import OriginalHome from "@/styles/original/Home";

export const metadata: Metadata = {
  title: "Mowglai Home - Premium Web Development & Digital Agency",
  description: "Experience Mowglai's custom digital interactive experience. High-performance design, 3D elements, and smooth interactions.",
  alternates: {
    canonical: "https://mowglai.com/home/",
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
      "name": "Agency",
      "item": "https://mowglai.com/home"
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <OriginalHome />
    </>
  );
}
