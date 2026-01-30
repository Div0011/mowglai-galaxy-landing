
import OriginalCustomRequest from "@/styles/original/CustomRequest";
import { Suspense } from "react";

export const metadata = {
    title: "Start Project | Mowglai",
    description: "Begin your journey with Mowglai. Select your plan and tell us about your vision. We are ready to build.",
};

export default function ProjectRequestPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OriginalCustomRequest />
        </Suspense>
    );
}
