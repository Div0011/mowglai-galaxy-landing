"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalCustomRequest = dynamic(() => import("@/styles/original/CustomRequest"));
const MinimalCustomRequest = dynamic(() => import("@/styles/minimal/CustomRequest"));
const CandyCustomRequest = dynamic(() => import("@/styles/candy/CustomRequest"));

export default function CustomRequestClient() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalCustomRequest />}
            {style === "minimal" && <MinimalCustomRequest />}
            {style === "candy" && <CandyCustomRequest />}
        </Suspense>
    );
}
