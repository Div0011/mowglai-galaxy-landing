"use client";

import MinimalLayout from "./Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/utils/emailSender";

export default function MinimalContact() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await sendEmail({
            subject: `Minimal Inquiry from ${formData.name}`,
            ...formData
        });
        if (result.status === 'success') {
            toast({ title: "Message Sent", description: "The message has been logged in our archives." });
            setFormData({ name: "", email: "", message: "" });
        }
        setIsSubmitting(false);
    };

    return (
        <MinimalLayout>
            <div className="bg-white text-black min-h-screen px-4 md:px-24 py-24 font-serif">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-32 border-b border-black pb-12"
                >
                    <h1 className="text-[15vw] md:text-[10vw] font-display font-black leading-[0.7] uppercase tracking-tighter">
                        Start <br /> <span className="italic">Dialogue</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
                    {/* Left Info */}
                    <div className="md:col-span-5 space-y-24">
                        <section>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-body text-neutral-400 block mb-6">Correspondence</span>
                            <div className="space-y-4">
                                <p className="text-2xl font-display">hello@mowglai.in</p>
                                <p className="text-2xl font-display">+91 95285 45302</p>
                            </div>
                        </section>

                        <section>
                            <span className="text-[10px] uppercase tracking-[0.4em] font-body text-neutral-400 block mb-6">Presence</span>
                            <p className="text-xl font-body leading-relaxed max-w-xs text-neutral-600">
                                Digital First. <br /> Primarily operating from Noida, India. Serving the global digital landscape.
                            </p>
                        </section>

                        <section className="pt-24 md:pt-48 border-t border-black/10">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-body text-neutral-400 block mb-6">Archives</span>
                            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest font-body">
                                <a href="#" className="hover:italic transition-all">Instagram</a>
                                <a href="#" className="hover:italic transition-all">LinkedIn</a>
                                <a href="#" className="hover:italic transition-all">Twitter</a>
                            </div>
                        </section>
                    </div>

                    {/* Right Form */}
                    <div className="md:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-body font-bold">Identity</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-black py-4 text-2xl font-display focus:outline-none focus:placeholder:opacity-0 placeholder:text-neutral-200 transition-all"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-body font-bold">Coordinate</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-black py-4 text-2xl font-display focus:outline-none focus:placeholder:opacity-0 placeholder:text-neutral-200 transition-all"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest font-body font-bold">Objective</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell us about your project or vision"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-transparent border-b border-black py-4 text-2xl font-display focus:outline-none focus:placeholder:opacity-0 placeholder:text-neutral-200 transition-all resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group flex items-center gap-6 pt-12"
                            >
                                <div className="w-16 h-16 border border-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 19L19 1M19 1H1M19 1V19" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold uppercase tracking-widest font-body group-hover:translate-x-2 transition-transform duration-500">
                                    {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Narrative */}
                <div className="mt-48 flex justify-end">
                    <p className="max-w-xs text-xs font-body text-neutral-400 uppercase leading-relaxed tracking-widest">
                        Your data is processed with the highest level of confidentiality. Mowglai operates as a secured creative collective.
                    </p>
                </div>
            </div>
        </MinimalLayout>
    );
}
