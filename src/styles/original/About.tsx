"use client";

import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import NextPageButton from "@/components/NextPageButton";
import PageLayout from "@/components/PageLayout";

export default function OriginalAbout() {
    return (
        <PageLayout>
            <AboutSection />
            <MissionSection />
            <NextPageButton label="CRAFT" href="/services" />
        </PageLayout>
    );
}
