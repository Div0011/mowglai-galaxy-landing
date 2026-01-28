"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

const OriginalInvestment = dynamic(() => import("@/styles/original/Investment"));
const MinimalInvestment = dynamic(() => import("@/styles/minimal/Investment"));
const CandyInvestment = dynamic(() => import("@/styles/candy/Investment"));

export default function InvestmentClient() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalInvestment />}
            {style === "minimal" && <MinimalInvestment />}
            {style === "candy" && <CandyInvestment />}
        </Suspense>
    );
}
