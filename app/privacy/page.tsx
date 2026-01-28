import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "Privacy Policy | Mowglai",
    description: "Privacy Policy for Mowglai Digital Agency and Template Store.",
};

export default function PrivacyPage() {
    return (
        <PageLayout>
            <div className="pt-32 pb-12 px-6 container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-foreground">Privacy Policy</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Transparency in every pixel and practice.</p>
            </div>

            {/* Glassmorphic Container */}
            <div className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
                <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl p-8 md:p-12">
                    <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-8
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

                        {/* Section 1 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">1. Introduction and Scope</p>
                            <p>
                                This Privacy Policy governs the manner in which Mowglai (mowglai.in) collects, uses, maintains,
                                and discloses information collected from users and clients. We are committed to protecting your
                                privacy and ensuring that your personal and business data is handled with the highest level of
                                security. This policy applies to all services offered by Mowglai, including custom website
                                development, database management, and AI-driven optimizations. By utilizing our services, you
                                acknowledge that you have read and understood how we process your data to deliver
                                high-quality technical solutions.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">2. Data Collection and Usage</p>
                            <p>
                                We collect information through various channels, primarily during the onboarding and execution
                                phases of our projects. This includes personal identifiers such as names and contact details, as
                                well as highly sensitive technical data like server credentials, API keys, and database schemas.
                                This information is used exclusively to facilitate project upgrades, maintain system integrity, and
                                personalize your experience. We do not sell or lease your data to third parties; any data sharing
                                is restricted to essential service providers, such as cloud hosting or AI model processing
                                platforms, and is conducted under strict confidentiality agreements.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">4. Cookies and Tracking Technologies</p>
                            <p>
                                Our website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                                We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device).
                                You can control cookie preferences through your browser settings, but disabling some cookies may affect the functionality of our services.
                                We also employ analytics tools to understand user behavior, which helps us improve our digital solutions.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">5. Third-Party Services and Data Sharing</p>
                            <p>
                                Mowglai integrates with trusted third-party service providers to deliver our comprehensive suite of solutions.
                                This includes payment processors (such as Stripe or Razorpay) for secure transactions, cloud hosting providers (like Vercel or AWS) for infrastructure,
                                and specialized AI API providers (such as OpenAI or Anthropic) for our intelligent features.
                                While we select partners with high security standards, we encourage you to review their respective privacy policies.
                                Mowglai is not liable for the data handling practices of these external entities once your data leaves our direct control.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">6. Data Retention</p>
                            <p>
                                We retain personal and business data only for as long as necessary to fulfill the purposes for which it was collected, including
                                for the purposes of satisfying any legal, accounting, or reporting requirements.
                                Project-specific technical data (credentials, schemas) is securely deleted or transferred upon project completion or termination,
                                typically within 30 days of the final handover, unless a maintenance agreement requires otherwise.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="mb-0">
                            <p className="font-display font-bold text-primary text-xl mb-3">7. Your Rights</p>
                            <p className="mb-0">
                                As a user, you have the right to request access to the personal data we hold about you, request corrections to any inaccuracies,
                                or request the deletion of your personal data ("Right to be Forgotten"). To exercise these rights, please contact our support team.
                                We will respond to all legitimate requests within a reasonable timeframe, subject to identity verification.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
