"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalAbout = dynamic(() => import("@/styles/original/About"));
const MinimalAbout = dynamic(() => import("@/styles/minimal/About"));
const CandyAbout = dynamic(() => import("@/styles/candy/About"));

export default function AboutClient() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalAbout />}
            {style === "minimal" && <MinimalAbout />}
            {style === "candy" && <CandyAbout />}
        </Suspense>
    );
}
