"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalServices = dynamic(() => import("@/styles/original/Services"));
const MinimalServices = dynamic(() => import("@/styles/minimal/Services"));
const CandyServices = dynamic(() => import("@/styles/candy/Services"));

export default function ServicesPage() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Services...</div>}>
            {style === "original" && <OriginalServices />}
            {style === "minimal" && <MinimalServices />}
            {style === "candy" && <CandyServices />}
        </Suspense>
    );
}
