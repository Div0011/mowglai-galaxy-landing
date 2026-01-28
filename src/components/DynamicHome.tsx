"use client";

import { useStyle } from "@/context/StyleContext";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const OriginalHome = dynamic(() => import("@/styles/original/Home"));
const MinimalHome = dynamic(() => import("@/styles/minimal/Home"));
const CandyHome = dynamic(() => import("@/styles/candy/Home"));

export default function DynamicHome() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Style...</div>}>
            {style === "original" && <OriginalHome />}
            {style === "minimal" && <MinimalHome />}
            {style === "candy" && <CandyHome />}
        </Suspense>
    );
}
