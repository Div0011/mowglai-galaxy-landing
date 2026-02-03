"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Template } from '@/data/templates'

export default function TemplateCard({ template }: { template: Template }) {
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
            }, 2000)
        } else {
            setCurrentImageIndex(0)
        }
        return () => clearInterval(interval)
    }, [isHovered, images.length])

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="group relative bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10 border border-border/50 transition-all duration-300 flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Slider - Strict 16:9 Aspect Ratio */}
            <div className="aspect-video relative overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={`${template.title} view ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </AnimatePresence>

                {/* Overlay with View Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Link
                        href={`/explore/${template.id}`}
                        className="px-6 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:scale-105 shadow-lg"
                    >
                        View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 z-10">
                    {template.pages} Page{template.pages > 1 ? 's' : ''}
                </div>
            </div>

            {/* Content Section - Always Visible */}
            <div className="p-6 flex-1 flex flex-col relative bg-card/30 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <span className="text-primary font-display font-bold tracking-widest uppercase text-[10px]">
                            {template.type}
                        </span>
                        <h3 className="text-xl font-display font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                            {template.title}
                        </h3>
                    </div>
                </div>

                <p className="text-muted-foreground text-sm font-light line-clamp-2 mb-6 leading-relaxed">
                    {template.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/30">
                    <button
                        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 group/btn"
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
        </motion.div>
    )
}
