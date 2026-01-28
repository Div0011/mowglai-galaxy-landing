"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalExplore = dynamic(() => import("@/styles/original/Explore"), { ssr: false });
const MinimalExplore = dynamic(() => import("@/styles/minimal/Explore"), { ssr: false });
const CandyExplore = dynamic(() => import("@/styles/candy/Explore"), { ssr: false });

export default function ExploreSwitcher() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Gallery...</div>}>
            {style === "original" && <OriginalExplore />}
            {style === "minimal" && <MinimalExplore />}
            {style === "candy" && <CandyExplore />}
        </Suspense>
    );
}
