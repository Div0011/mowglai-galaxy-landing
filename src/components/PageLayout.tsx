"use client";

import dynamic from "next/dynamic";
import { useStyle } from "@/context/StyleContext";
import { Suspense } from "react";
import OriginalLayout from "@/styles/original/Layout";

const MinimalLayout = dynamic(() => import("@/styles/minimal/Layout"));
const CandyLayout = dynamic(() => import("@/styles/candy/Layout"));

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    const { style } = useStyle();

    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Layout...</div>}>
            {style === "original" && <OriginalLayout>{children}</OriginalLayout>}
            {style === "minimal" && <MinimalLayout>{children}</MinimalLayout>}
            {style === "candy" && <CandyLayout>{children}</CandyLayout>}
        </Suspense>
    );
};

export default PageLayout;
