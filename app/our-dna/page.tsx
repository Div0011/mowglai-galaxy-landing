"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalDNA = dynamic(() => import("@/styles/original/DNA"));
const MinimalDNA = dynamic(() => import("@/styles/minimal/DNA"));
const CandyDNA = dynamic(() => import("@/styles/candy/DNA"));

export default function OurDNA() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalDNA />}
            {style === "minimal" && <MinimalDNA />}
            {style === "candy" && <CandyDNA />}
        </Suspense>
    );
}
