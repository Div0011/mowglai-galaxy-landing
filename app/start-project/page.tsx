import StartProjectWizard from "@/components/StartProjectWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Start Your Project | Mowglai",
    description: "Begin your journey with Mowglai. Tell us about your idea and let's build something extraordinary.",
};

export default function StartProjectPage() {
    return (
        <main className="min-h-screen bg-background relative selection:bg-primary/30 pt-32 pb-20 px-6">
            {/* Background Gradients */}
            <div className="fixed inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none z-0" />
            <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="relative z-10 container mx-auto flex items-center justify-center min-h-[calc(100vh-160px)]">
                <StartProjectWizard />
            </div>
        </main>
    );
}
