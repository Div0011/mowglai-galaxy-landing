"use client";

import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NextPageButton from "@/components/NextPageButton";
import PageLayout from "@/components/PageLayout";

export default function OriginalAbout() {
    return (
        <PageLayout>
            <AboutSection />
            <MissionSection />
            <TestimonialsSection />
            <NextPageButton label="THE CRAFT" href="/services" />
        </PageLayout>
    );
}
