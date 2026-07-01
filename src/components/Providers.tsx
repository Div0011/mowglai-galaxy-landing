"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { StyleProvider } from "@/context/StyleContext";
import { usePerformanceMonitor } from "@/hooks/use-performance";

// Optimized QueryClient configuration for better performance
function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Reduce stale time to improve cache behavior
                staleTime: 60 * 1000, // 1 minute
                // Refetch on window focus disabled for better UX
                refetchOnWindowFocus: false,
                // Retry failed requests only once
                retry: 1,
                // Keep previous data while fetching
                placeholderData: (previousData: unknown) => previousData,
            },
        },
    });
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(createQueryClient);
    
    // Initialize performance monitoring
    usePerformanceMonitor();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <StyleProvider>
                    <TooltipProvider delayDuration={0}>
                        {children}
                        <Toaster />
                        <Sonner />
                    </TooltipProvider>
                </StyleProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
