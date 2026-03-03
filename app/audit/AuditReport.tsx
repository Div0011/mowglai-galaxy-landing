'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import jsPDF from 'jspdf';
import { AuditResult, AuditCategory } from './actions';

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
    const handleDownloadPDF = async () => {
        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 12;
            const contentWidth = pageWidth - (margin * 2);
            const colors = {
                forest: [13, 26, 18] as const,
                card: [19, 35, 25] as const,
                gold: [197, 160, 89] as const,
                ivory: [242, 244, 248] as const,
                muted: [160, 168, 175] as const,
                pass: [74, 222, 128] as const,
                warn: [250, 204, 21] as const,
                fail: [248, 113, 113] as const,
            };
            const timestamp = new Date().toLocaleString();
            let y = 54;

            const drawPageBackground = () => {
                pdf.setFillColor(...colors.forest);
                pdf.rect(0, 0, pageWidth, pageHeight, 'F');

                pdf.setFillColor(26, 41, 31);
                pdf.circle(pageWidth + 20, -10, 42, 'F');

                pdf.setFillColor(22, 36, 49);
                pdf.circle(-10, pageHeight + 8, 34, 'F');

                pdf.setDrawColor(60, 74, 64);
                pdf.setLineWidth(0.4);
                pdf.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(8);
                pdf.setTextColor(...colors.muted);
                pdf.text('MOWGLAI  |  DIGITAL HEALTH AUDIT', margin, pageHeight - 6.5);
                pdf.text(`Generated ${timestamp}`, pageWidth - margin, pageHeight - 6.5, { align: 'right' });
            };

            const drawHeader = () => {
                pdf.setDrawColor(...colors.gold);
                pdf.setLineWidth(0.5);
                pdf.roundedRect(margin, 14, contentWidth, 34, 3, 3, 'S');

                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(9);
                pdf.setTextColor(...colors.gold);
                pdf.text('MOWGLAI INTELLIGENCE', margin + 4, 20);

                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(19);
                pdf.setTextColor(...colors.ivory);
                pdf.text('Digital Health Audit', margin + 4, 30);

                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.setTextColor(...colors.muted);
                const target = pdf.splitTextToSize(`Target: ${result.url}`, contentWidth - 52);
                pdf.text(target, margin + 4, 37);

                pdf.setFillColor(31, 47, 36);
                pdf.roundedRect(pageWidth - margin - 34, 19, 30, 24, 2.5, 2.5, 'F');
                pdf.setDrawColor(...colors.gold);
                pdf.roundedRect(pageWidth - margin - 34, 19, 30, 24, 2.5, 2.5, 'S');
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(7);
                pdf.setTextColor(...colors.gold);
                pdf.text('OVERALL', pageWidth - margin - 19, 25, { align: 'center' });
                pdf.text('GRADE', pageWidth - margin - 19, 29, { align: 'center' });
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(17);
                pdf.text(grade, pageWidth - margin - 19, 38, { align: 'center' });
                y = 54;
            };

            const nextPage = () => {
                pdf.addPage();
                drawPageBackground();
                drawHeader();
            };

            const ensureSpace = (requiredHeight: number) => {
                if (y + requiredHeight > pageHeight - 16) {
                    nextPage();
                }
            };

            const addWrappedText = (
                text: string,
                x: number,
                maxWidth: number,
                size = 9,
                lineGap = 4.3,
                weight: 'normal' | 'bold' = 'normal',
                color: readonly [number, number, number] = colors.ivory
            ) => {
                pdf.setFont('helvetica', weight);
                pdf.setFontSize(size);
                pdf.setTextColor(...color);
                const lines = pdf.splitTextToSize(text, maxWidth);
                pdf.text(lines, x, y);
                return lines.length * lineGap;
            };

            const getStatusColor = (status: 'pass' | 'warning' | 'fail') => {
                if (status === 'pass') return colors.pass;
                if (status === 'warning') return colors.warn;
                return colors.fail;
            };

            const categoryList = [
                categories.seo,
                categories.performance,
                categories.security,
                categories.content,
            ];

            drawPageBackground();
            drawHeader();

            categoryList.forEach((category) => {
                ensureSpace(28);
                const titleLines = pdf.splitTextToSize(category.description, contentWidth - 40);
                const categoryHeight = Math.max(22, 14 + (titleLines.length * 4.2));

                pdf.setFillColor(...colors.card);
                pdf.roundedRect(margin, y, contentWidth, categoryHeight, 3, 3, 'F');
                pdf.setDrawColor(...colors.gold);
                pdf.roundedRect(margin, y, contentWidth, categoryHeight, 3, 3, 'S');

                y += 6;
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(12);
                pdf.setTextColor(...colors.gold);
                pdf.text(category.title, margin + 4, y);

                pdf.setFillColor(33, 50, 39);
                pdf.roundedRect(pageWidth - margin - 26, y - 4.5, 22, 7, 1.8, 1.8, 'F');
                pdf.setDrawColor(...colors.gold);
                pdf.roundedRect(pageWidth - margin - 26, y - 4.5, 22, 7, 1.8, 1.8, 'S');
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(9);
                pdf.text(`${category.score}/100`, pageWidth - margin - 15, y + 0.5, { align: 'center' });

                y += 5;
                const categoryDescHeight = addWrappedText(category.description, margin + 4, contentWidth - 8, 9, 4.2, 'normal', colors.muted);
                y += categoryDescHeight + 3;

                category.items.forEach((item) => {
                    const descLines = pdf.splitTextToSize(item.description, contentWidth - 24);
                    const recLines = item.recommendation ? pdf.splitTextToSize(`Tip: ${item.recommendation}`, contentWidth - 24) : [];
                    const itemHeight = 12 + (descLines.length * 4.1) + (recLines.length * 4.1);
                    ensureSpace(itemHeight + 2);

                    pdf.setFillColor(23, 39, 29);
                    pdf.roundedRect(margin + 2, y, contentWidth - 4, itemHeight, 2.3, 2.3, 'F');

                    const statusColor = getStatusColor(item.status);
                    const statusLabel = item.status.toUpperCase();
                    pdf.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
                    pdf.roundedRect(margin + 5, y + 3, 15, 5.5, 1.5, 1.5, 'F');
                    pdf.setFont('helvetica', 'bold');
                    pdf.setFontSize(7);
                    pdf.setTextColor(16, 23, 18);
                    pdf.text(statusLabel, margin + 12.5, y + 6.8, { align: 'center' });

                    pdf.setFont('helvetica', 'bold');
                    pdf.setFontSize(10);
                    pdf.setTextColor(...colors.ivory);
                    pdf.text(item.title, margin + 23, y + 6.8);
                    pdf.setFont('helvetica', 'normal');
                    pdf.setFontSize(8.5);
                    pdf.setTextColor(...colors.muted);
                    pdf.text(item.value, pageWidth - margin - 5, y + 6.8, { align: 'right' });

                    y += 12;
                    const descHeight = addWrappedText(item.description, margin + 23, contentWidth - 28, 8.5, 4.1, 'normal', colors.muted);
                    y += descHeight;
                    if (item.recommendation) {
                        const recHeight = addWrappedText(`Tip: ${item.recommendation}`, margin + 23, contentWidth - 28, 8.5, 4.1, 'normal', colors.gold);
                        y += recHeight;
                    }
                    y += 2;
                });

                y += 4;
            });

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
            <div className="bg-[#0d1a12] text-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#c5a059]/20 relative overflow-hidden">

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
                        <p className="mb-2">This report is automatically generated using simulated analysis metrics for demonstration purposes.</p>
                        <p>Mowglai uses advanced heuristics to estimate performance and SEO health.</p>
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
