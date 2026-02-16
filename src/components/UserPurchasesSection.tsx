"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Clock, CheckCircle, AlertCircle, ShoppingBag, CreditCard, Search, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface Purchase {
    id: string;
    plan_name: string;
    purchase_date: string;
    expiration_date: string | null;
    status: string;
    details: string;
}

export default function UserPurchasesModal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Controlled by URL: ?modal=purchases
    const isOpen = searchParams.get("modal") === "purchases";

    const [email, setEmail] = useState("");
    const [searchedEmail, setSearchedEmail] = useState("");
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    // Close handler: Remove query param
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("modal");
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setError("");
        setPurchases([]);
        setHasSearched(true);
        setSearchedEmail(email);

        try {
            const res = await fetch(`/api/get-purchases.php?email=${encodeURIComponent(email)}`);
            const data = await res.json();

            if (data.success) {
                setPurchases(data.purchases);
            } else {
                setError(data.message || "Failed to fetch purchases.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active": return "text-green-500 bg-green-500/10 border-green-500/20";
            case "completed": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
            case "expired": return "text-red-500 bg-red-500/10 border-red-500/20";
            case "cancelled": return "text-gray-500 bg-gray-500/10 border-gray-500/20";
            default: return "text-primary bg-primary/10 border-primary/20";
        }
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20 rounded-[2rem] md:rounded-[2.5rem] p-0 gap-0 shadow-2xl">
                <div className="p-6 md:p-12 pb-0 pt-12 md:pt-12">
                    <DialogHeader className="mb-6 md:mb-8 text-left">
                        <DialogTitle className="text-3xl md:text-5xl font-display font-black uppercase text-foreground leading-tight">
                            Your <span className="text-primary italic">Assets</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground/60 mt-2 md:mt-4">
                            Access your purchase history and subscription details.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Email Search Form */}
                    <div className="max-w-xl mx-auto mb-8 md:mb-12">
                        <form onSubmit={handleSearch} className="relative group">
                            <div className="relative flex items-center bg-secondary/10 border border-primary/20 rounded-full p-1.5 md:p-2 backdrop-blur-sm transition-all focus-within:border-primary/50 focus-within:bg-secondary/20 hover:border-primary/30">
                                <div className="pl-3 md:pl-6 text-primary/50 shrink-0">
                                    <Search className="w-4 h-4 md:w-5 md:h-5" />
                                </div>
                                <Input
                                    type="email"
                                    placeholder="Enter your email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm md:text-lg placeholder:text-muted-foreground/40 h-10 md:h-14 min-w-0"
                                />
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-full px-4 md:px-8 py-3 md:py-6 text-[10px] md:text-sm font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : "Access"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Results Area with Scroll */}
                <div className="px-6 md:px-12 pb-8 md:pb-12">
                    <AnimatePresence mode="wait">
                        {hasSearched && !loading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {error ? (
                                    <div className="text-center p-6 md:p-8 rounded-[2rem] bg-red-500/5 border border-red-500/10">
                                        <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-red-500 mx-auto mb-4" />
                                        <h3 className="text-lg font-display font-bold text-red-500 mb-2">Access Error</h3>
                                        <p className="text-muted-foreground text-sm">{error}</p>
                                    </div>
                                ) : purchases.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        {purchases.map((purchase) => (
                                            <motion.div
                                                key={purchase.id}
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-secondary/5 border border-primary/10 hover:border-primary/30 transition-all p-5 md:p-6"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start md:items-center">
                                                    {/* Icon & Name */}
                                                    <div className="md:col-span-4 flex items-center gap-4">
                                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shrink-0">
                                                            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg md:text-xl font-display font-bold uppercase leading-tight mb-1 md:mb-2 line-clamp-1">
                                                                {purchase.plan_name}
                                                            </h3>
                                                            <div className={cn("inline-flex items-center gap-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border", getStatusColor(purchase.status))}>
                                                                <span className="w-1 h-1 rounded-full bg-current" />
                                                                {purchase.status}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Details Columns */}
                                                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                                                        <div className="p-3 rounded-xl bg-background/30 border border-primary/5">
                                                            <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">
                                                                <Calendar className="w-3 h-3" /> <span className="hidden sm:inline">Purchase</span> Date
                                                                <span className="sm:hidden">Date</span>
                                                            </div>
                                                            <div className="text-xs md:text-sm font-mono font-medium truncate">
                                                                {formatDate(purchase.purchase_date)}
                                                            </div>
                                                        </div>

                                                        <div className="p-3 rounded-xl bg-background/30 border border-primary/5">
                                                            <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">
                                                                <Clock className="w-3 h-3" /> Expiry
                                                            </div>
                                                            <div className={cn("text-xs md:text-sm font-mono font-medium truncate",
                                                                purchase.status === 'expired' ? "text-red-400" : "text-primary"
                                                            )}>
                                                                {formatDate(purchase.expiration_date)}
                                                            </div>
                                                        </div>

                                                        <div className="col-span-2 md:col-span-1 p-3 rounded-xl bg-background/30 border border-primary/5">
                                                            <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">
                                                                <CreditCard className="w-3 h-3" /> Details
                                                            </div>
                                                            <div className="text-[10px] text-muted-foreground leading-relaxed line-clamp-1 md:line-clamp-2 hover:line-clamp-none transition-all">
                                                                {purchase.details || "No details."}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-12">
                                        <p className="text-xl text-muted-foreground font-light">
                                            No purchases found for <span className="text-foreground font-bold">{searchedEmail}</span>.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
