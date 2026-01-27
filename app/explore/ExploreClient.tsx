"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalExplore = dynamic(() => import("@/styles/original/Explore"));
const MinimalExplore = dynamic(() => import("@/styles/minimal/Explore"));
const CandyExplore = dynamic(() => import("@/styles/candy/Explore"));

export default function ExploreClient() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalExplore />}
            {style === "minimal" && <MinimalExplore />}
            {style === "candy" && <CandyExplore />}
        </Suspense>
    );
}
