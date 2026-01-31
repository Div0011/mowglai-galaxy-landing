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
                {/* Price Display - Samsung Now Bar style */}
                <div className="flex flex-col items-start pl-1">
                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-semibold leading-none">Price</span>
                    <span className="text-lg font-bold text-white leading-none tracking-tight font-display mt-0.5">{price || "$49"}</span>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-white/10" />

                {/* Actions */}
                <div className="flex items-center gap-2 pr-1">
                    {/* Preview Button */}
                    <button
                        onClick={() => window.open(`/previews/${templateId}.html`, '_blank')}
                        className="group w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 text-white/70 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95 transition-all duration-200"
                        aria-label="Preview template"
                    >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>

                    {/* Buy Button */}
                    <button className="group w-9 h-9 bg-primary/20 border border-primary/30 text-primary rounded-full flex items-center justify-center hover:bg-primary/30 hover:border-primary/50 hover:scale-105 active:scale-95 transition-all duration-200">
                        <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-4 pt-4">
            <div className="w-full xl:w-auto flex-1">
                <span className="block text-sm text-muted-foreground mb-1">
                    Price
                </span>
                <span className="text-4xl font-bold text-foreground">
                    {price || "$49"}
                </span>
            </div>
            <div className="flex flex-col-reverse xl:flex-row gap-3 flex-1 min-w-[280px]">
                <button
                    onClick={() => window.open(`/previews/${templateId}.html`, '_blank')}
                    className="group w-full xl:w-auto py-4 px-6 bg-transparent border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
                >
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Preview
                </button>
                <button className="w-full xl:w-auto flex-1 py-4 px-6 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/25 whitespace-nowrap">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                </button>
            </div>
        </div>
    );
}

