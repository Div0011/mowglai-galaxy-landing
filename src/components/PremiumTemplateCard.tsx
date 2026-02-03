"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Layers, Smartphone, Layout, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Template } from '@/data/templates'

export default function PremiumTemplateCard({ template }: { template: Template }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    // Use gallery images if available, otherwise fallback to generating mocks
    const images = template.gallery && template.gallery.length > 0
        ? [template.image, ...template.gallery]
        : [
            template.image, // Main Home
            template.image.replace('text=', 'text=Services+%26+Features+'),
            template.image.replace('text=', 'text=Portfolio+%26+Contact+')
        ]

    // Auto-play slider on hover
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isHovered) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length)
            }, 2500)
        } else {
            setCurrentImageIndex(0)
        }
        return () => clearInterval(interval)
    }, [isHovered, images.length])

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glassmorphic Background / Border Container */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl z-0 transition-all duration-500 group-hover:bg-white/10 group-hover:border-primary/30 group-hover:shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.3)] shadow-2xl" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Image Section - Strict 16:9 Aspect Ratio */}
                <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl border-b border-white/5">
                    {/* Gradient Overlay for Top protection */}
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/60 to-transparent z-20 opacity-60" />

                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={images[currentImageIndex]}
                            alt={`${template.title} view ${currentImageIndex + 1}`}
                            initial={{ scale: 1.1, opacity: 0.8 }}
                            animate={{ scale: isHovered ? 1.05 : 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* View Details Overlay Button */}
                    <div className={cn(
                        "absolute inset-0 z-30 flex items-center justify-center transition-all duration-500 bg-black/20 backdrop-blur-[2px]",
                        isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}>
                        <Link
                            href={`/explore/${template.id}`}
                            className="group/btn relative px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-md rounded-full text-white font-medium flex items-center gap-3 transition-all transform hover:scale-105 shadow-xl"
                        >
                            <span>View Template</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>

                    {/* Badge Tags Top Right */}
                    <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 items-end">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                            {template.pages} Pages
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-primary text-xs font-display font-bold tracking-[0.2em] uppercase mb-1 block opacity-80">
                                {template.type}
                            </span>
                            <h3 className="text-2xl font-display font-medium text-white group-hover:text-primary transition-colors duration-300">
                                {template.title}
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            {/* Tech Icons (Mock representation for aesthetics) */}
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-muted-foreground" title="Responsive">
                                <Smartphone size={14} />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-muted-foreground" title="Modern Layout">
                                <Layout size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 font-light">
                        {template.description}
                    </p>

                    {/* Footer Actions */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <button
                            className="px-6 py-2.5 bg-primary text-background font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `mailto:hello@mowglai.in?subject=Enquiry for Template: ${template.id}`;
                            }}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Enquire
                        </button>
                    </div>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[-1]" />
        </motion.div>
    )
}
