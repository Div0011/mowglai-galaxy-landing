"use client";

import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowRight, Filter, X, Check, Search, SlidersHorizontal, ArrowUpDown,
    DollarSign, Layers, Monitor, Zap, ShoppingCart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import PageLayout from '@/components/PageLayout'
import Link from 'next/link'
import { sectors, allTemplates, Template } from '@/data/templates'
import { useLanguage } from "@/context/LanguageContext";
import NextPageButton from "@/components/NextPageButton";

// --- Constants ---
const pageRanges = [
    { label: 'Single Page', value: '1', count: '1' },
    { label: 'Small', value: 'small', count: '2-5' },
    { label: 'Medium', value: 'medium', count: '6-10' },
    { label: 'Large', value: 'large', count: '11+' }
]

const budgetRanges = [] // Removed as per request

const sortOptions = [
    { label: 'Recommended', value: 'relevant' },
    { label: 'Complexity: High', value: 'pages_desc' },
]

// --- Helper Functions ---
const toggleFilter = (state: string[], setState: (val: string[]) => void, value: string) => {
    if (state.includes(value)) {
        setState(state.filter(item => item !== value))
    } else {
        setState([...state, value])
    }
}

// --- Main Page Component ---
export default function ExplorePage() {
    // Filter States
    const [sortBy, setSortBy] = useState<string>('relevant')
    const [selectedSector, setSelectedSector] = useState<string>('all')
    const [pageRange, setPageRange] = useState<string[]>([])
    const [websiteTypes, setWebsiteTypes] = useState<string[]>([])
    const [structures, setStructures] = useState<string[]>([])
    const [cmsTypes, setCmsTypes] = useState<string[]>([])
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [selectedStyles, setSelectedStyles] = useState<string[]>([])
    const [budget, setBudget] = useState<string[]>([])

    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // --- Derived Data ---
    const allTemplatesFlat = useMemo(() => Object.values(allTemplates).flat(), [])

    const uniqueWebsiteTypes = useMemo(() => Array.from(new Set(allTemplatesFlat.map(t => t.type))), [allTemplatesFlat])
    const uniqueStructures = useMemo(() => Array.from(new Set(allTemplatesFlat.map(t => t.structure))), [allTemplatesFlat])
    const uniqueCmsTypes = useMemo(() => Array.from(new Set(allTemplatesFlat.map(t => t.cms))), [allTemplatesFlat])
    const uniqueStyles = useMemo(() => {
        const styleKeywords = ['Professional', 'Minimalist', 'Dynamic', 'Elegant', 'Bold', 'Clean', 'Colorful', 'Dark']
        const styles = new Set<string>()
        allTemplatesFlat.forEach(t => {
            t.tags.forEach(tag => {
                if (styleKeywords.includes(tag)) styles.add(tag)
            })
        })
        return Array.from(styles).sort()
    }, [allTemplatesFlat])

    // --- Filtering Logic ---
    const filteredTemplates = useMemo(() => {
        const result = allTemplatesFlat.filter(template => {
            if (selectedSector !== 'all') {
                const sectorKey = Object.keys(allTemplates).find(key => allTemplates[key].some(t => t.id === template.id))
                if (sectorKey !== selectedSector) return false
            }
            if (pageRange.length > 0) {
                const matchesRange = pageRange.some(range => {
                    if (range === '1') return template.pages === 1
                    if (range === 'small') return template.pages >= 2 && template.pages <= 5
                    if (range === 'medium') return template.pages >= 6 && template.pages <= 10
                    if (range === 'large') return template.pages >= 11
                    return false
                })
                if (!matchesRange) return false
            }
            // Removed budget filtering

            if (websiteTypes.length > 0 && !websiteTypes.includes(template.type)) return false
            if (structures.length > 0 && !structures.includes(template.structure)) return false
            if (cmsTypes.length > 0 && !cmsTypes.includes(template.cms)) return false
            if (selectedFeatures.length > 0 && !selectedFeatures.every(f => template.features.includes(f))) return false
            if (selectedStyles.length > 0 && !selectedStyles.some(s => template.tags.includes(s))) return false

            return true
        })

        // Removed price sorting
        result.sort((a, b) => b.pages - a.pages)

        return result
    }, [selectedSector, pageRange, websiteTypes, structures, cmsTypes, selectedFeatures, selectedStyles, sortBy, budget, allTemplatesFlat])

    // --- Clear All Handler ---
    const clearAllFilters = () => {
        setSelectedSector('all')
        setPageRange([])
        setWebsiteTypes([])
        setStructures([])
        setCmsTypes([])
        setSelectedFeatures([])
        setSelectedStyles([])
        setBudget([])
    }

    const activeFilterCount = pageRange.length + websiteTypes.length + structures.length + cmsTypes.length + selectedFeatures.length + selectedStyles.length + budget.length

    const { t } = useLanguage();
    const { Explore } = t;

    return (
        <PageLayout>
            <div className="min-h-screen bg-transparent text-foreground relative selection:bg-primary/20">

                {/* Hero / Header Section */}
                <div className="relative pt-32 px-6 md:px-12 pb-12 overflow-hidden text-center md:text-left">

                    <div className="max-w-[1800px] mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                            <div className="w-full">
                                <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4">
                                    {Explore.hero.subtitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[200%_auto] animate-text-shimmer">{Explore.hero.title}</span>
                                </h1>
                                <p className="text-lg text-muted-foreground/80 font-light max-w-xl mx-auto md:mx-0 border-l-0 md:border-l-2 border-primary/20 pl-0 md:pl-4">
                                    {Explore.hero.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 justify-center md:justify-end w-full md:w-auto">
                                <div className="text-center md:text-right">
                                    <div className="text-3xl font-bold font-mono">{filteredTemplates.length}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{Explore.stats.systems}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Filter Bar */}
                <div className="sticky top-20 z-40 w-full border-y border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                    <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-4">

                        {/* Left: Sector Chips (Scrollable) */}
                        <div className="flex-1 overflow-x-auto no-scrollbar mask-linear-fade flex items-center gap-2 pr-4 min-w-0">
                            <button
                                onClick={() => setSelectedSector('all')}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border",
                                    selectedSector === 'all'
                                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                                        : "bg-transparent border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {Explore.filters.all}
                            </button>
                            {sectors.map(sector => (
                                <button
                                    key={sector.id}
                                    onClick={() => setSelectedSector(sector.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border",
                                        selectedSector === sector.id
                                            ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"
                                            : "bg-transparent border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {sector.label}
                                </button>
                            ))}
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3 shrink-0 pl-4 border-l border-white/10">
                            {/* Sort Dropdown (Simplified) */}
                            <div className="relative group hidden sm:block">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-transparent text-xs font-bold uppercase tracking-wider pl-3 pr-8 py-2 cursor-pointer hover:text-primary transition-colors focus:outline-none"
                                >
                                    {sortOptions.map(opt => <option key={opt.value} value={opt.value} className="text-foreground bg-background">{opt.label}</option>)}
                                </select>
                                <ArrowUpDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                            </div>

                            {/* Filter Trigger Button */}
                            <button
                                onClick={() => setIsFilterDrawerOpen(true)}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border",
                                    activeFilterCount > 0
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-secondary/50 border-white/5 hover:bg-secondary hover:text-foreground text-muted-foreground"
                                )}
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                {Explore.filters.filterBtn}
                                {activeFilterCount > 0 && (
                                    <span className="ml-1 w-4 h-4 rounded-full bg-white text-primary flex items-center justify-center text-[9px] font-extrabold">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 py-12">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                        >
                            {filteredTemplates.length > 0 ? (
                                filteredTemplates.map((template) => (
                                    <TemplateCard key={template.id} template={template} viewProjectText={Explore.card.viewProject} pagesText={Explore.card.pages} />
                                ))
                            ) : (
                                <div className="col-span-full py-40 flex flex-col items-center justify-center text-center opacity-50">
                                    <Search className="w-24 h-24 mb-6 text-muted-foreground/20" />
                                    <h3 className="text-2xl font-bold mb-2">{Explore.filters.noSignals}</h3>
                                    <p className="text-muted-foreground mb-8">{Explore.filters.broaden}</p>
                                    <button onClick={clearAllFilters} className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all">
                                        {Explore.filters.resetParams}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Filter Drawer (Right Side Sheet) */}
                {mounted && createPortal(
                    <AnimatePresence>
                        {isFilterDrawerOpen && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    onClick={() => setIsFilterDrawerOpen(false)}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                                />
                                <motion.div
                                    initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                    className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-white/10 z-[101] shadow-2xl flex flex-col"
                                >
                                    <div className="flex items-center justify-between p-6 border-b border-white/5">
                                        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                                            <Filter className="w-5 h-5 text-primary" /> REFINEMENT
                                        </h2>
                                        <button onClick={() => setIsFilterDrawerOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar min-h-0">
                                        {/* Filter Sections */}
                                        {/* Budget Section Removed */}

                                        <FilterSection title="Complexity" icon={<Layers className="w-4 h-4" />}>
                                            <div className="grid grid-cols-2 gap-3">
                                                {pageRanges.map(range => (
                                                    <button
                                                        key={range.value}
                                                        onClick={() => toggleFilter(pageRange, setPageRange, range.value)}
                                                        className={cn(
                                                            "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
                                                            pageRange.includes(range.value)
                                                                ? "bg-primary/10 border-primary text-primary"
                                                                : "bg-secondary/20 border-transparent hover:bg-secondary/40 text-muted-foreground"
                                                        )}
                                                    >
                                                        <span className="text-xs font-bold uppercase">{range.label}</span>
                                                        <span className="text-[10px] opacity-60 mt-1">{range.count} Pages</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </FilterSection>

                                        <FilterSection title="Tech Stack" icon={<Monitor className="w-4 h-4" />}>
                                            <div className="flex flex-wrap gap-2">
                                                {[...uniqueWebsiteTypes, ...uniqueCmsTypes, ...uniqueStructures].map(tech => (
                                                    <FilterChip
                                                        key={tech}
                                                        label={tech}
                                                        active={[...websiteTypes, ...cmsTypes, ...structures].includes(tech)}
                                                        onClick={() => {
                                                            if ((uniqueWebsiteTypes as string[]).includes(tech)) toggleFilter(websiteTypes, setWebsiteTypes, tech)
                                                            else if ((uniqueCmsTypes as string[]).includes(tech)) toggleFilter(cmsTypes, setCmsTypes, tech)
                                                            else toggleFilter(structures, setStructures, tech)
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </FilterSection>

                                        <FilterSection title="Aesthetics" icon={<Zap className="w-4 h-4" />}>
                                            <div className="flex flex-wrap gap-2">
                                                {uniqueStyles.map(style => (
                                                    <FilterChip
                                                        key={style}
                                                        label={style}
                                                        active={selectedStyles.includes(style)}
                                                        onClick={() => toggleFilter(selectedStyles, setSelectedStyles, style)}
                                                    />
                                                ))}
                                            </div>
                                        </FilterSection>
                                    </div>

                                    <div className="p-6 border-t border-white/5 bg-secondary/10">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={clearAllFilters}
                                                className="flex-1 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={() => setIsFilterDrawerOpen(false)}
                                                className="flex-[2] py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                            >
                                                Show {filteredTemplates.length} Results
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>,
                    document.body
                )}

            </div>
            <NextPageButton label="INVESTMENT" href="/investment" />
            <NextPageButton label="MOWGLAI ACQUIRE" href="/investment" />

            <style jsx global>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, black 85%, transparent 100%);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </PageLayout>
    )
}

// --- Subcomponents ---

function FilterSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                {icon} {title}
            </h3>
            {children}
        </div>
    )
}

function CheckboxRow({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
    return (
        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
            <div className={cn(
                "w-5 h-5 rounded border flex items-center justify-center transition-all",
                checked ? "bg-primary border-primary" : "border-white/20 group-hover:border-primary/50"
            )}>
                {checked && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
            </div>
            <span className={cn("text-sm font-medium", checked ? "text-foreground" : "text-muted-foreground")}>{label}</span>
            <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
        </label>
    )
}

function FilterChip({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border",
                active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground"
            )}
        >
            {label}
        </button>
    )
}

function TemplateCard({ template, viewProjectText, pagesText }: { template: Template, viewProjectText: string, pagesText: string }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative flex flex-col gap-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Area */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-secondary/20">
                <Link href={`/explore/${template.id}`} className="block w-full h-full">
                    <img
                        src={template.image}
                        alt={template.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                </Link>

                {/* Overhead Status Bar */}
                <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start z-10">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-white border border-white/10 rounded">
                        {template.structure}
                    </span>
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-wider rounded shadow-lg">
                        Enquire
                    </span>
                </div>

                {/* Hover Reveal Overlay */}
                <div
                    className={cn(
                        "absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300",
                        isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <Link
                        href={`/explore/${template.id}`}
                        className="px-6 py-3 bg-white text-black text-xs font-extrabold uppercase tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        {viewProjectText} <ArrowRight className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            {/* Info Area */}
            <div>
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-primary uppercase">{template.type}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{template.pages} {pagesText}</span>
                </div>
                {/*  Using template.title if available or generic. */}
                <h3 className="text-lg font-bold tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                    {template.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    {template.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[9px] font-medium text-muted-foreground border-b border-dotted border-muted-foreground/30">{f}</span>
                    ))}
                </div>

                {/* Added Footer with Enquire Button */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `mailto:hello@mowglai.in?subject=Enquiry for Template: ${template.id}`;
                        }}
                        className="px-4 py-2 bg-primary text-background text-[10px] font-bold uppercase tracking-widest rounded-md shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <ShoppingCart className="w-3 h-3" />
                        Enquire
                    </button>
                    <Link
                        href={`/explore/${template.id}`}
                        className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
