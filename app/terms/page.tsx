import PageLayout from "@/components/PageLayout";

export const metadata = {
    title: "Terms of Service | Mowglai",
    description: "Terms of Service for Mowglai Digital Agency and Template Store.",
};

export default function TermsPage() {
    return (
        <PageLayout>
            <div className="pt-32 pb-12 px-6 container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-foreground">Terms of Service</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Defining our digital partnership.</p>
            </div>

            {/* Glassmorphic Container */}
            <div className="max-w-4xl mx-auto px-6 pb-24 relative z-10">
                <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl p-8 md:p-12">
                    <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-8
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline">

                        {/* Last Updated Date */}
                        <div className="mb-8 border-b border-white/10 pb-6">
                            <p className="text-sm text-muted-foreground font-medium">Last updated: January 28, 2026</p>
                        </div>

                        {/* Section 1 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">1. Engagement of Services</p>
                            <p>
                                By accessing mowglai.in or entering into a service agreement with Mowglai, you agree to be
                                bound by these Terms and Conditions. Our services encompass the end-to-end lifecycle of web
                                development, from initial scratch-builds to complex project upgrades and SEO strategy
                                implementation. Each project is defined by a specific scope of work, and any deviations or
                                additions will be treated as supplemental tasks. We strive for excellence in every line of code
                                and every database query, ensuring that your digital infrastructure is robust, scalable, and
                                optimized for modern search engine standards.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">2. Intellectual Property and Ownership</p>
                            <p className="mb-4">
                                Mowglai believes in empowering our clients. Upon receipt of full and final payment, the
                                ownership of the custom source code, website designs, and database architectures created
                                specifically for your project will be transferred to you. However, specific retentions apply:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-primary text-muted-foreground">
                                <li><strong>Client Ownership:</strong> You own the final website, design assets, and unique database structures.</li>
                                <li><strong>Mowglai Retentions:</strong> We retain rights to pre-existing libraries, proprietary AI prompts, and reusable utility scripts.</li>
                                <li><strong>License:</strong> You are granted a non-exclusive, perpetual license to use our internal tools as they function within your project.</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">3. Client Responsibilities and Data Access</p>
                            <p className="mb-4">
                                To ensure the success of your project, particularly in areas like SEO and database migration, we
                                require cooperation. You agree to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-primary text-muted-foreground">
                                <li>Provide timely access to existing hosting, domains, and data sets.</li>
                                <li>Ensure you have legal rights to all content (text, images, data) provided to us.</li>
                                <li>Review and approve deliverables within agreed timelines to prevent delays.</li>
                            </ul>
                            <p className="mt-4">
                                Mowglai is not responsible for delays caused by incomplete information or lack of access provided by the client.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">4. Payment Structure and Schedules</p>
                            <p>
                                Unless otherwise specified in a separate Scope of Work (SOW), our standard payment terms require an upfront deposit
                                (typically 50%) to commence work, with the remaining balance due upon project completion or defined milestones.
                                Late payments may incur interest charges. Mowglai reserves the right to suspend work or withhold deliverables
                                if payments are not received according to the agreed schedule.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">5. Scope of Work and Revisions</p>
                            <p>
                                Each project is bound by the specific deliverables outlined in the initial agreement. To ensure timely delivery,
                                we include a standard limit of two (2) rounds of revisions for design and development tasks.
                                Any additional revisions or features requested outside the original scope will be considered "Scope Creep" and
                                will be billed at our standard hourly rate or as a separate fixed-cost addendum.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">6. Third-Party Costs</p>
                            <p className="mb-4">
                                The Client is responsible for all direct costs associated with third-party services required for the project.
                                Common third-party costs include:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 marker:text-primary text-muted-foreground">
                                <li><strong>Domains & Hosting:</strong> Registration fees, SSL certificates, and monthly server costs (e.g., Vercel, AWS).</li>
                                <li><strong>Assets:</strong> Paid fonts, stock imagery, or premium plugins.</li>
                                <li><strong>API Usage:</strong> Fees for services like OpenAI, Google Maps, or SendGrid.</li>
                            </ul>
                            <p className="mt-4">
                                Mowglai will advise on these potential costs, but they are not included in our agency service fees unless explicitly stated.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">7. Confidentiality</p>
                            <p>
                                Both parties agree to keep confidential all proprietary information exchanged during the course of the project.
                                Mowglai will not disclose your business strategies, customer data, or trade secrets to third parties without consent.
                                Similarly, the Client agrees not to disclose Mowglai's proprietary development methods, pricing structures,
                                or internal tools to competitors.
                            </p>
                        </div>

                        {/* Section 8 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">8. Project Inactivity and Termination</p>
                            <div className="space-y-4">
                                <p>
                                    To maintain efficient project timelines, we have a strict policy regarding client unresponsiveness. If a client
                                    fails to respond to our team for a period of four (4) weeks, the project will be scheduled for termination.
                                    If unresponsiveness continues for a total of six (6) weeks, the project will be fully dismantled.
                                </p>
                                <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                                    <li>
                                        <strong>Full Payment Made:</strong> If full payment has been received, we will provide a ZIP file of the source code as-is.
                                        However, no further support for hosting, deployment, or maintenance will be provided.
                                    </li>
                                    <li>
                                        <strong>Incomplete Payment:</strong> If full payment has not been made, the project will be permanently
                                        deleted, and we will not be responsible for any refunds or data recovery.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 9 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">9. Force Majeure</p>
                            <p>
                                Neither party shall be liable for any failure or delay in performance due to circumstances beyond their reasonable control,
                                including but not limited to acts of God, war, riots, cyber-attacks, extensive internet outages, or government restrictions.
                                In such events, the affected party will notify the other as soon as possible, and project timelines will be adjusted accordingly.
                            </p>
                        </div>

                        {/* Section 10 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">10. AI Handling and SEO Performance</p>
                            <p>
                                Our AI-driven services and SEO optimizations are performed using the latest industry
                                methodologies. However, because search engine algorithms and third-party AI models (such as
                                those from OpenAI or Google) are subject to frequent, unannounced changes, Mowglai cannot
                                guarantee specific ranking positions or permanent AI output consistency. We provide "White
                                Hat" SEO services designed for long-term growth and implement AI logic that aims for accuracy,
                                but we are not liable for the independent actions of these external platforms. Our role is to
                                provide the best technical framework to navigate these evolving landscapes.
                            </p>
                        </div>

                        {/* Section 11 */}
                        <div className="mb-8">
                            <p className="font-display font-bold text-primary text-xl mb-3">11. Limitation of Liability and Indemnification</p>
                            <p>
                                In no event shall Mowglai, its founders, or employees be held liable for any indirect, incidental,
                                or consequential damages arising from the use of our services, including but not limited to loss
                                of data, business interruption, or system downtime during project upgrades. Our total liability for
                                any claim related to our services is strictly limited to the amount paid by the client for the specific
                                service in question. You agree to indemnify and hold Mowglai harmless from any claims or legal
                                fees arising from your breach of these terms or your use of the final deliverables in a manner
                                that violates local or international laws.
                            </p>
                        </div>

                        {/* Section 12 */}
                        <div className="mb-0">
                            <p className="font-display font-bold text-primary text-xl mb-3">12. Amendments and Governing Law</p>
                            <p className="mb-0">
                                Mowglai reserves the right to update these policies at any time to reflect changes in our service
                                offerings or legal requirements. We encourage clients to review this page periodically. These
                                terms are governed by the laws of the jurisdiction in which Mowglai operates. Any disputes
                                arising from these agreements shall be resolved through good-faith negotiations or, if necessary,
                                through the appropriate legal channels in our local jurisdiction. Your continued use of our
                                services following any updates constitutes your acceptance of the revised terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
