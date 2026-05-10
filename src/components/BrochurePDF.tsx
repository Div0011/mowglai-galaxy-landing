import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

interface BrochurePDFProps {
    variant?: "outline" | "default";
    className?: string;
    planName?: string;
    planPrice?: string;
    planFeatures?: string[];
    clientName?: string;
}

export const BrochurePDF: FC<BrochurePDFProps> = ({
    variant = "outline",
    className = "",
    planName,
    planPrice,
    planFeatures,
    clientName
}) => {

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        const margin = 20;

        // --- DESIGN SYSTEM ---
        const colors: Record<string, [number, number, number]> = {
            forest: [13, 26, 18],
            forestLight: [18, 37, 26],
            gold: [197, 160, 89],
            ivory: [248, 250, 252],
            goldDim: [140, 110, 60]
        };

        const fonts = {
            header: "helvetica",
            body: "helvetica"
        };

        // --- PLAN SPECIFIC LOGIC ---
        const isAdvanced = planName === "ADVANCED";
        const timeline = isAdvanced ? "4-6 WEEKS" : (planName === "BASIC" ? "2-3 WEEKS" : "TBD");

        const narrative = isAdvanced
            ? "For high-growth ventures, mere presence is insufficient. The ADVANCED tier deploys our full interactive suite—complex animations, CMS integration, and SEO dominance—to ensure your brand doesn't just compete, but conquers."
            : "Your digital presence determines your market survival. We build systems that don't just exist—they dominate. By combining Noida's engineering precision with global design standards, we ensure your brand stands apart.";

        const strategyTitle = isAdvanced ? "SCALABILITY ENGINE" : "DIGITAL FOUNDATION";


        // Helpers
        const drawBackground = () => {
            pdf.setFillColor(...colors.forest);
            pdf.rect(0, 0, width, height, 'F');
        };

        // --- PAGE 1: COVER ---
        drawBackground();

        pdf.setDrawColor(...colors.gold);
        pdf.setLineWidth(0.5);
        pdf.line(margin, 40, margin + 40, 40);

        pdf.setTextColor(...colors.gold);
        pdf.setFontSize(10);
        pdf.setFont(fonts.header, 'bold');
        pdf.text("MOWGLAI // 2025", margin, 35);

        pdf.setTextColor(...colors.ivory);
        pdf.setFontSize(42);
        pdf.text("DIGITAL", margin, 70);
        pdf.setTextColor(...colors.gold);
        // Dynamic Title sizing
        if (isAdvanced) {
            pdf.text("ACCELERATION.", margin, 85);
        } else {
            pdf.text("ASCENT.", margin, 85);
        }

        if (clientName) {
            pdf.setTextColor(...colors.ivory);
            pdf.setFontSize(14);
            pdf.setFont(fonts.body, 'normal');
            pdf.text("PREPARED EXCLUSIVELY FOR:", margin, 120);

            pdf.setFontSize(24);
            pdf.setTextColor(...colors.gold);
            pdf.setFont(fonts.header, 'bold');
            pdf.text(clientName.toUpperCase(), margin, 132);

            pdf.setDrawColor(...colors.gold);
            pdf.line(margin, 140, margin + 100, 140);
        }

        // Tagline
        pdf.setFontSize(12);
        pdf.setTextColor(150, 150, 150);
        pdf.setFont(fonts.body, 'normal');
        pdf.text(planName ? `PROPOSAL REF: ${planName}-25-X` : "GENERAL PORTFOLIO", margin, height - 30);

        // --- PAGE 2: PHILOSOPHY ---
        pdf.addPage();
        drawBackground();
        pdf.setFontSize(10);
        pdf.setTextColor(...colors.gold);
        pdf.text("01 // THE VISION", margin, 30);

        pdf.setFontSize(20);
        pdf.setTextColor(...colors.ivory);
        pdf.text("ENGINEERING DOMINANCE.", margin, 50);

        pdf.setFontSize(12);
        pdf.setTextColor(200, 200, 200);
        pdf.text(pdf.splitTextToSize(narrative, width - 2 * margin), margin, 70);


        // --- PAGE 3: OFFICIAL QUOTATION ---
        pdf.addPage();
        drawBackground();

        pdf.setFontSize(10);
        pdf.setTextColor(...colors.gold);
        pdf.text("02 // FINANCIAL SUMMARY & SCOPE", margin, 30);

        // Quote Table Header
        const tableY = 50;
        pdf.setFillColor(...colors.forestLight);
        pdf.rect(margin, tableY, width - 2 * margin, 20, 'F');

        pdf.setTextColor(...colors.gold);
        pdf.setFontSize(12);
        pdf.setFont(fonts.header, 'bold');
        pdf.text("DESCRIPTION", margin + 5, tableY + 14);
        pdf.text("DETAILS", width - margin - 35, tableY + 14);

        pdf.setTextColor(...colors.ivory);
        pdf.setFontSize(12);
        pdf.setFont(fonts.body, 'normal');

        if (planName && planName !== "EPIC") { // Specific Plan

            // Row 1: Plan Name
            pdf.text(`${planName} ARCHITECTURE`, margin + 5, tableY + 40);
            pdf.text(planPrice || "$---", width - margin - 35, tableY + 40);

            // Row 2: Timeline
            pdf.text(`ESTIMATED TIMELINE`, margin + 5, tableY + 55);
            pdf.text(timeline, width - margin - 35, tableY + 55);

            // Row 3: Strategy
            pdf.text(`STRATEGY CLASS`, margin + 5, tableY + 70);
            pdf.text(strategyTitle, width - margin - 35, tableY + 70);

            // Features
            let featureY = tableY + 95;
            pdf.setFontSize(10);
            pdf.setTextColor(...colors.gold);
            pdf.text("INCLUDED MODULES:", margin + 5, featureY - 10);

            pdf.setTextColor(180, 180, 180);
            const features = planFeatures || ["Core Development", "UI Configuration"];
            features.forEach(f => {
                pdf.text(`• ${f}`, margin + 10, featureY);
                featureY += 8;
            });

            // Total Line
            const totalY = featureY + 20;
            pdf.setDrawColor(...colors.gold);
            pdf.line(margin, totalY, width - margin, totalY);

            pdf.setFontSize(16);
            pdf.setTextColor(...colors.gold);
            pdf.setFont(fonts.header, 'bold');
            pdf.text("TOTAL ESTIMATE", margin + 5, totalY + 15);
            pdf.text(planPrice || "TBD", width - margin - 35, totalY + 15);

            // Terms
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.setFont(fonts.body, 'normal');
            pdf.text("VALID FOR 30 DAYS. TERMS: 50% DEPOSIT, 50% COMPLETION.", margin, totalY + 40);

        } else {
            // Generic / Custom
            pdf.text(`CUSTOM ENTERPRISE DEVELOPMENT`, margin + 5, tableY + 40);
            pdf.text("CUSTOM", width - margin - 35, tableY + 40);
        }

        // --- PAGE 4: EXECUTION ---
        pdf.addPage();
        drawBackground();

        pdf.setFontSize(30);
        pdf.setTextColor(...colors.ivory);
        pdf.text("NEXT STEPS.", margin, 50);

        pdf.setFontSize(12);
        pdf.setTextColor(200, 200, 200);

        if (isAdvanced) {
            pdf.text("1. Approve this strategic roadmap.", margin, 70);
            pdf.text("2. Deep-dive architecture session.", margin, 85);
            pdf.text("3. Agile development implementation.", margin, 100);
        } else {
            pdf.text("1. Approve this proposal.", margin, 70);
            pdf.text("2. Technical discovery session.", margin, 85);
            pdf.text("3. Production begins.", margin, 100);
        }

        pdf.setDrawColor(...colors.gold);
        pdf.rect(margin, 130, width - 2 * margin, 60, 'S');
        pdf.setTextColor(...colors.gold);
        pdf.text("MOWGLAI", margin + 10, 150);
        pdf.text("info@mowglai.com", margin + 10, 165);

        pdf.save(clientName ? `Proposal_${clientName.replace(/\s+/g, '_')}_${planName}.pdf` : `Mowglai_Proposal_${planName}.pdf`);
    };

    return (
        <Button
            variant={variant}
            className={className}
            onClick={generatePDF}
        >
            <Download className="w-5 h-5 mr-2" />
            {clientName
                ? `GENERATE ${planName} PROPOSAL`
                : (planName ? `DOWNLOAD ${planName} PROPOSAL` : 'DOWNLOAD BROCHURE')
            }
        </Button>
    );
};

export default BrochurePDF;
