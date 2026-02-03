"use client";

import { ShoppingCart, Eye } from "lucide-react";

interface TemplateActionsProps {
    templateId: string;
    price: string;
    isMobileBar?: boolean;
}

export default function TemplateActions({ templateId, price, isMobileBar }: TemplateActionsProps) {
    if (isMobileBar) {
        return (
            <div className="flex items-center gap-3">
                {/* Enquire Button - Replaced Price block */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.location.href = `mailto:hello@mowglai.in?subject=Enquiry for Template: ${templateId}`}
                        className="group h-10 px-4 bg-primary text-primary-foreground font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/25 whitespace-nowrap"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-sm">Enquire</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-white/10" />

                {/* Preview Button */}
                <button
                    onClick={() => window.open(`/previews/${templateId}.html`, '_blank')}
                    className="group w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 text-white/70 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
                    aria-label="Preview template"
                >
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3 pt-4">
            {/* Primary Action - Enquire */}
            <button
                onClick={() => window.location.href = `mailto:hello@mowglai.in?subject=Enquiry for Template: ${templateId}`}
                className="w-full py-5 px-8 bg-primary text-primary-foreground font-black text-lg uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_25px_50px_-12px_rgba(var(--primary-rgb),0.4)] whitespace-nowrap group"
            >
                <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Enquire for price
            </button>

            {/* Secondary Action - Preview */}
            <button
                onClick={() => window.open(`/previews/${templateId}.html`, '_blank')}
                className="w-full py-4 px-8 border border-white/10 hover:bg-white/5 text-white/70 hover:text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
                <Eye className="w-5 h-5" />
                Preview Mode
            </button>
        </div>
    );
}
