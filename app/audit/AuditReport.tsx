'use client';

import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuditResult, AuditCategory, AuditDetail } from './actions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

interface AuditReportProps {
    result: AuditResult;
}

const CategoryCard = ({ category, delay }: { category: AuditCategory, delay: number }) => {
    let colorClass = "text-red-500";
    let bgClass = "bg-red-500/10 border-red-500/20";
    if (category.score >= 80) {
        colorClass = "text-[#c5a059]"; // Gold
        bgClass = "bg-[#c5a059]/10 border-[#c5a059]/30";
    } else if (category.score >= 50) {
        colorClass = "text-yellow-500";
        bgClass = "bg-yellow-500/10 border-yellow-500/20";
    }

    return (
        <div className={`rounded-xl border backdrop-blur-md p-6 ${bgClass} animate-in fade-in slide-in-from-bottom-4 duration-700`} style={{ animationDelay: `${delay}ms` }}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className={`text-lg font-bold tracking-tight ${colorClass}`}>{category.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">{category.description}</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className={`text-4xl font-display font-bold ${colorClass}`}>{category.score}</span>
                </div>
            </div>

            <div className="space-y-3 mt-6">
                {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm border-t border-white/5 pt-3 first:border-0 first:pt-0">
                        <div className="mt-0.5 shrink-0">
                            {item.status === 'pass' && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {item.status === 'fail' && <XCircle className="w-4 h-4 text-red-500" />}
                            {item.status === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between">
                                <span className="font-medium text-white/90">{item.title}</span>
                                <span className="font-mono text-xs text-white/60">{item.value}</span>
                            </div>
                            <p className="text-white/50 text-xs mt-0.5">{item.description}</p>
                            {item.recommendation && (
                                <p className="text-blue-400/80 text-xs mt-1 italic">Tip: {item.recommendation}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AuditReport: React.FC<AuditReportProps> = ({ result }) => {
    const reportRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;

        try {
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#0d1a12' // Forest Green Background
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Mowglai_Audit_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF Generation failed", error);
        }
    };

    const { categories } = result;

    // Calculate specific overall grade
    const totalScore = (categories.seo.score + categories.performance.score + categories.security.score + categories.content.score) / 4;
    const grade = totalScore >= 90 ? "A+"
        : totalScore >= 80 ? "A"
            : totalScore >= 70 ? "B"
                : totalScore >= 60 ? "C"
                    : "D";


    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">

            {/* Controls */}
            <div className="flex justify-end gap-3 print:hidden">
                <Button onClick={handleDownloadPDF} className="bg-[#c5a059] hover:bg-[#b08d4b] text-black font-bold">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Report
                </Button>
            </div>

            {/* Printable Area */}
            <div ref={reportRef} className="bg-[#0d1a12] text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#c5a059]/20 relative overflow-hidden">

                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Header */}
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start border-b border-[#c5a059]/20 pb-8 mb-8">
                    <div>
                        <div className="text-[#c5a059] text-sm font-bold tracking-widest uppercase mb-2">Mowglai Intelligence</div>
                        <h2 className="text-4xl md:text-5xl font-display font-light text-[#f8fafc]">Digital Health Audit</h2>
                        <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
                            <span>Target:</span>
                            <span className="text-[#c5a059] font-mono">{result.url}</span>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 text-right">
                        <div className="inline-flex flex-col items-center justify-center p-4 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-2xl backdrop-blur-sm">
                            <span className="text-xs text-[#c5a059] uppercase tracking-wider mb-1">Overall Grade</span>
                            <span className="text-5xl font-display font-bold text-[#c5a059]">{grade}</span>
                        </div>
                        <div className="text-xs text-white/40 mt-2">{new Date().toLocaleString()}</div>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CategoryCard category={categories.seo} delay={100} />
                    <CategoryCard category={categories.performance} delay={200} />
                    <CategoryCard category={categories.security} delay={300} />
                    <CategoryCard category={categories.content} delay={400} />
                </div>

                {/* Footer */}
                <div className="relative z-10 mt-12 pt-8 border-t border-[#c5a059]/20 flex justify-between items-end text-xs text-white/40">
                    <div className="max-w-md">
                        <p className="mb-2">This report is generated using real-time automated analysis heuristics.</p>
                        <p>Mowglai analyzes performance, SEO health, and security posture.</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-[#c5a059]">MOWGLAI</p>
                        <p>mowglai.in</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuditReport;
