"use client";

import OriginalLayout from "@/styles/original/Layout";
import HeroSection from "@/components/HeroSection";
import { useLanguage } from "@/context/LanguageContext";
import SettingsToggle from "@/components/SettingsToggle";
import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/HomeContent"), { ssr: false });

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
