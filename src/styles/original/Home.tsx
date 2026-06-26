"use client";

import OriginalLayout from "@/styles/original/Layout";
import Hero from "@/components/hero/Hero";
import HomeContent from "@/components/HomeContent";

export default function OriginalHome() {
    return (
        <OriginalLayout>
            <div className="relative w-full">
                <Hero />
            </div>
            <HomeContent />
        </OriginalLayout>
    );
}
