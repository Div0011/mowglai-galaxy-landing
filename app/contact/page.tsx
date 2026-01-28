"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalContact = dynamic(() => import("@/styles/original/Contact"));
const MinimalContact = dynamic(() => import("@/styles/minimal/Contact"));
const CandyContact = dynamic(() => import("@/styles/candy/Contact"));

export default function Contact() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalContact />}
            {style === "minimal" && <MinimalContact />}
            {style === "candy" && <CandyContact />}
        </Suspense>
    );
}
