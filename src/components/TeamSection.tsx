"use client";

import { Github, Mail, Linkedin, Globe } from "lucide-react";
import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
import NextImage from "next/image";
import XLogo from "@/components/icons/XLogo";

const teamMembers = [
    {
        id: 1,
        name: "Ajay Ahlawat",
        role: "Chief Executive Officer",
        image: "/team/aa.jpeg",
        socials: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:ajay@mowglai.com",
        },
    },
    {
        id: 3,
        name: "Aryan Singh",
        role: "Chief Technical Officer",
        image: "/team/aj.jpeg",
        socials: {
            twitter: "https://twitter.com/aryan_447",
            github: "https://github.com/aryan447",
            email: "mailto:singharyan4477@gmail.com",
        },
    },
    {
        id: 2,
        name: "Ankit Baghel",
        role: "Chief Marketing Officer",
        image: "/team/ab.jpeg",
        socials: {
            linkedin: "#",
            github: "#",
            email: "mailto:akshay@mowglai.com",
        },
    },
    {
        id: 4,
        name: "Divyansh Awasthi",
        role: "Chief Financial Officer",
        image: "/team/da.jpeg",
        socials: {
            github: "https://github.com/div0011",
            linkedin: "#",
            email: "mailto:divyanshawasthi90@gmail.com",
        },
    },
];

const TeamSection = () => {
    return (
        <section className="relative w-full py-24 z-20 overflow-hidden bg-transparent">
            {/* Gradient blending for top and bottom */}
            {/* Gradient blending removed for seamless look */}
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16 space-y-4 text-center" data-aos="fade-up">
                    <h2 className="text-[10vw] md:text-6xl font-display font-black tracking-tighter text-foreground relative z-10 drop-shadow-sm flex flex-col md:block">
                        <span className="opacity-30 uppercase mr-4">Meet</span>
                        <span className="text-primary uppercase">Our Team</span>
                    </h2>
                    <p className="max-w-2xl text-lg text-foreground/70 font-light">
                        The creative minds and technical wizards behind Mowglai's innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative flex flex-col items-center"
                        >
                            {/* Image Container */}
                            <div
                                className="relative w-full aspect-[4/5] overflow-hidden rounded-[50%] mb-6"
                                style={{
                                    maskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)",
                                    WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 100%)"
                                }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-4xl font-black uppercase tracking-widest">
                                    {/* Fallback initials if image missing */}
                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <NextImage
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Overlay with Socials */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                    <div className="flex justify-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                        {member.socials.twitter && (
                                            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                                <XLogo size={20} />
                                            </a>
                                        )}
                                        {member.socials.github && (
                                            <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                                <Github size={20} />
                                            </a>
                                        )}
                                        {member.socials.linkedin && (
                                            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                        {member.socials.email && (
                                            <a href={member.socials.email} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                                <Mail size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center space-y-1">
                                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-body text-primary/80 uppercase tracking-wider font-medium">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
