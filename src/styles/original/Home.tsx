"use client";

import OriginalLayout from "@/styles/original/Layout";
import HeroSection from "@/components/HeroSection";
import HomeContent from "@/components/HomeContent";
import { useLanguage } from "@/context/LanguageContext";

export default function OriginalHome() {
    return (
        <OriginalLayout>
            <div className="relative w-full h-screen">
                <HeroSection />
            </div>
            <HomeContent />
        </OriginalLayout>
    );
}
