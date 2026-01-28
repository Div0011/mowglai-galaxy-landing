"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";

// Fallback for Original Investment if it doesn't exist - using Minimal for now or create one?
// I'll create a simple OriginalInvestment if needed, but for now let's assume one exists or use Minimal.
// Actually, I'll use Minimal as fallback for Original for now to prevent breaking, 
// OR I will create OriginalInvestment.tsx. I'll create it next. 

const OriginalInvestment = dynamic(() => import("@/styles/original/Investment"));
const MinimalInvestment = dynamic(() => import("@/styles/minimal/Investment"));
const CandyInvestment = dynamic(() => import("@/styles/candy/Investment"));

export default function InvestmentPage() {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Content...</div>}>
            {style === "original" && <OriginalInvestment />}
            {style === "minimal" && <MinimalInvestment />}
            {style === "candy" && <CandyInvestment />}
        </Suspense>
    );
}
