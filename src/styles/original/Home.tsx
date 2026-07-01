"use client";

import OriginalLayout from "@/styles/original/Layout";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/HomeContent"), { ssr: false });

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
