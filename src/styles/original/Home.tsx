"use client";

import OriginalLayout from "@/styles/original/Layout";
import HeroSection from "@/components/HeroSection";
import HomeContent from "@/components/HomeContent";

export default function OriginalHome() {
    return (
        <OriginalLayout>
            <div className="relative w-full">
                <HeroSection />
            </div>
            <HomeContent />
        </OriginalLayout>
    );
}
