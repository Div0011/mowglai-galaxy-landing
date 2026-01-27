"use client";

import MinimalLayout from "./Layout";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
    {
        id: "01",
        category: "Web Design",
        title: "Aesthetic Excellence",
        desc: "Visual narratives that merge artistic expression with functional precision. Crafting stunning, responsive interfaces."
    },
    {
        id: "02",
        category: "Development",
        title: "Robust Engineering",
        desc: "Scalable, secure, and lightning-fast architectures. Building the solid foundations that drive digital growth."
    },
    {
        id: "03",
        category: "Redesign",
        title: "Digital Evolution",
        desc: "Breathing new life into legacy platforms. Enhancing usability, speed, and security for the modern era."
    },
    {
        id: "04",
        category: "Database",
        title: "Data Intelligence",
        desc: "Sophisticated database solutions ensuring information is organized, accessible, and impenetrable."
    },
    {
        id: "05",
        category: "Strategy",
        title: "Global Reach",
        desc: "Positioning your brand on the global map. Ensuring you resonate with audiences across cultures and borders."
    },
    {
        id: "06",
        category: "Intelligence",
        title: "Intelligent Systems",
        desc: "Empowering platforms with next-gen AI. From smart chatbots to predictive analytics and automation."
    }
];

export default function MinimalServices() {
    return (
        <MinimalLayout>
            <div className="bg-background text-foreground min-h-screen px-4 md:px-24 py-32 font-serif">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 md:mt-32 mb-24 md:mb-32 flex flex-col md:flex-row justify-between items-end border-b border-foreground pb-12"
                >
                    <h1 className="text-[15vw] md:text-[8vw] font-display font-black leading-[0.8] uppercase tracking-tighter">
                        The <br /> <span className="italic text-foreground/40">Services</span>
                    </h1>
                    <div className="text-left md:text-right max-w-xs md:pb-4 mt-8 md:mt-0">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-body text-foreground/40 block mb-4">Capabilities</span>
                        <p className="text-sm font-body leading-tight">
                            Capabilities woven into digital reality. Designing and developing for a world that demands better interaction.
                        </p>
                    </div>
                </motion.div>

                {/* Services List - Magazine Style */}
                <div className="space-y-0">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-12 md:py-16 border-b border-foreground/10 hover:border-foreground transition-colors duration-500"
                        >
                            <div className="md:col-span-1">
                                <span className="text-3xl md:text-4xl font-display font-light opacity-20 group-hover:opacity-100 transition-opacity">/{service.id}</span>
                            </div>
                            <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-center">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-body text-foreground/40 mb-2">{service.category}</span>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase group-hover:italic transition-all duration-500 leading-none">{service.title}</h2>
                            </div>
                            <div className="md:col-span-12 lg:col-span-6 flex flex-col justify-center mt-4 lg:mt-0">
                                <p className="text-lg md:text-xl font-body leading-relaxed text-foreground/60 max-w-xl text-justify">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Methodology Section */}
                <div className="mt-32 md:mt-48 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    <div className="space-y-12">
                        <h3 className="text-3xl font-display uppercase tracking-wider">Methodology</h3>
                        <div className="space-y-8">
                            {[
                                { t: "Immersion", d: "First, we inhabit your brand. Understanding the nuances of your vision and the friction of your challenges." },
                                { t: "Reduction", d: "We strip away the noise. Only what is necessary survives the transition from idea to artifact." },
                                { t: "Refinement", d: "Iteration is constant. We polish every interaction until it feels effortless." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6">
                                    <span className="font-display italic text-2xl pt-1">0{i + 1}</span>
                                    <div>
                                        <h4 className="font-bold uppercase tracking-widest text-sm mb-2 font-body">{item.t}</h4>
                                        <p className="font-body text-foreground/60 leading-tight text-sm text-justify">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="aspect-square bg-foreground/5 border border-foreground relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden group">
                        <img
                            src="/minimal_services_abstract.png"
                            alt="Services Abstract"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[20vw] font-display opacity-[0.08] select-none pointer-events-none group-hover:opacity-[0.1] transition-opacity">S</div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-32 md:mt-48 py-24 md:py-32 border-t-2 border-foreground">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
                        <div className="flex-1">
                            <span className="text-xs uppercase tracking-[0.5em] font-body text-foreground/40 block mb-8 md:mb-12">Next Steps</span>
                            <Link href="/explore" className="group block">
                                <h4 className="text-[10vw] md:text-[6vw] font-display uppercase leading-none hover:italic transition-all duration-700 py-4">
                                    Browse <br /> The <span className="text-foreground/30">Gallery</span>
                                </h4>
                                <p className="mt-6 text-xs md:text-sm font-body uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors">View our latest artifacts and systems</p>
                            </Link>
                        </div>

                        <div className="flex-1 flex flex-col items-start md:items-end text-left md:text-right">
                            <span className="text-xs uppercase tracking-[0.5em] font-body text-foreground/40 block mb-8 md:mb-12">Inquiry</span>
                            <Link href="/contact" className="group">
                                <h4 className="text-[10vw] md:text-[6vw] font-display uppercase leading-none hover:italic transition-all duration-700 py-4">
                                    Start <br /> Dialogue
                                </h4>
                                <p className="mt-6 text-xs md:text-sm font-body uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors">Skip the gallery and discuss your project</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MinimalLayout>
    );
}
