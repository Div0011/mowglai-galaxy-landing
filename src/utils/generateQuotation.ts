
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Plan {
    name: string;
    price: string;
    description: string;
    features: string[];
}

const getBreakdown = (planName: string) => {
    if (planName === "BASIC") {
        return [
            { service: "Single Page Architecture", allocation: "Design & Layout", price: "$150" },
            { service: "Responsive Implementation", allocation: "Development", price: "$250" },
            { service: "Basic SEO & Performance", allocation: "Optimization", price: "$99" },
            { total: "$499" }
        ];
    } else if (planName === "ADVANCED") {
        return [
            { service: "Custom UI/UX Architecture", allocation: "Design Phase", price: "$300" },
            { service: "Responsive Web Engineering", allocation: "Development", price: "$450" },
            { service: "SEO Strategy & Speed Optimization", allocation: "Performance", price: "$249" },
            { total: "$999" }
        ];
    }
    return [];
};

const getJustification = (planName: string, price: string) => {
    if (planName === "BASIC") {
        return `
      <p><strong>Why the <span class="accent-text">${planName} Plan (${price})</span> fits you:</strong></p>
      <p>This plan is the perfect launchpad for businesses establishing their digital footprint. It provides a professional, high-performance single-page presence that captures your brand essence without the complexity of larger systems.</p>
    `;
    }
    if (planName === "ADVANCED") {
        return `
      <p><strong>Why the <span class="accent-text">${planName} Plan (${price})</span> fits you:</strong></p>
      <p>This plan is engineered for businesses ready to scale beyond a simple landing page. It justifies its cost through high-conversion UI/UX design and a robust backend that reduces long-term maintenance costs. You aren't just buying a website; you are investing in a 24/7 sales representative.</p>
    `;
    }
    return "";
};

const getUpgradeOption = (planName: string) => {
    if (planName === "BASIC") {
        return `
      <p><em>Need more power?</em> You can upgrade to our <strong>ADVANCED Plan</strong> to include multi-page architecture and deeper SEO integration.</p>
    `;
    }
    if (planName === "ADVANCED") {
        return `
      <p><em>Need more?</em> You can upgrade to our <strong>EPIC (Enterprise) Plan</strong> at any time to include E-commerce modules and dedicated 24/7 priority support.</p>
    `;
    }
    return "";
};

// Helper to convert image to base64
const getBase64Image = async (url: string) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.error("Error loading image", e);
        return "";
    }
};

export const generateQuotationPDF = async (plan: Plan) => {
    const breakdown = getBreakdown(plan.name);
    const justification = getJustification(plan.name, plan.price);
    const upgradeOption = getUpgradeOption(plan.name);
    const logoBase64 = await getBase64Image("/mowglai-logo-new.jpg");

    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    const refStr = `MW-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    const rows = (breakdown.slice(0, -1) as { service: string; allocation: string; price: string }[]).map((item) => `
    <tr>
        <td>${item.service}</td>
        <td>${item.allocation}</td>
        <td>${item.price}</td>
    </tr>
  `).join("");
    const totalRow = breakdown[breakdown.length - 1];

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Mowglai | Project Quotation</title>
        <style>
            :root {
                --primary: #1B3022; /* Deep Forest Green */
                --secondary: #F4F1EA; /* Cream */
                --accent: #C5A059; /* Copper/Gold */
                --text-dark: #2c2c2c;
                --white: #ffffff;
            }

            body {
                background-color: #f0f0f0;
                margin: 0;
                padding: 0;
                font-family: 'Helvetica Neue', Arial, sans-serif;
                color: #2c2c2c;
                width: 850px; /* Fixed width for A4 PDF scaling */
            }

            .quotation-wrapper {
                width: 100%;
                background: #ffffff;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }

            /* Header Section */
            header {
                background-color: #1B3022;
                color: #F4F1EA;
                padding: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 5px solid #C5A059;
            }

            .brand-container {
                display: flex;
                align-items: center;
                gap: 20px;
            }

            .brand-logo {
                width: 60px;
                height: 60px;
                object-fit: contain;
            }

            .brand-h1 { margin: 0; letter-spacing: 5px; color: #C5A059; font-size: 32px; }
            .quote-label { font-size: 14px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.8; }

            /* Document Body */
            .page-content { background-color: #F4F1EA; padding: 50px; }

            .section-title {
                border-left: 4px solid #C5A059;
                padding-left: 15px;
                margin: 40px 0 20px 0;
                color: #1B3022;
                text-transform: uppercase;
                font-size: 18px;
                letter-spacing: 1px;
            }

            /* Pricing Breakthrough Table */
            table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; border-radius: 8px; overflow: hidden; }
            th { background: #1B3022; color: #C5A059; text-align: left; padding: 15px; }
            td { padding: 15px; border-bottom: 1px solid #ddd; }
            .total-row { background: #eee; font-weight: bold; font-size: 20px; }

            /* Logic/Justification Boxes */
            .justification-box {
                background: white;
                border: 1px solid #ddd;
                padding: 25px;
                border-radius: 8px;
                margin-top: 20px;
                line-height: 1.6;
            }

            .accent-text { color: #C5A059; font-weight: bold; }

            /* Footer/Legal */
            .legal-footer {
                background: #e9e6df;
                padding: 40px;
                font-size: 12px;
                color: #666;
                line-height: 1.5;
            }
        </style>
    </head>
    <body>

    <div class="quotation-wrapper">
        <header>
            <div class="brand-container">
                ${logoBase64 ? `<img src="${logoBase64}" class="brand-logo" alt="Mowglai Logo" />` : ''}
                <div>
                    <h1 class="brand-h1">MOWGLAI</h1>
                    <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Noida | London | Singapore</p>
                </div>
            </div>
            <div style="text-align: right;">
                <p class="quote-label">Project Quotation</p>
                <p style="margin: 5px 0;">Date: ${dateStr}</p>
                <p style="margin: 0;">Ref: ${refStr}</p>
            </div>
        </header>

        <div class="page-content">
            <div class="section-title">01. About Us</div>
            <p>Founded in 2025, Mowglai specializes in performance-driven web architecture. With a footprint in Noida and active partnerships in the UK and Singapore, we deliver international standards of digital excellence to every project.</p>

            <div class="section-title">02. Plan Justification</div>
            <div class="justification-box">
                ${justification}
                ${upgradeOption}
            </div>

            <div class="section-title">03. Price Breakthrough</div>
            <table>
                <tr>
                    <th>Service Description</th>
                    <th>Allocation</th>
                    <th>Price</th>
                </tr>
                ${rows}
                <tr class="total-row">
                    <td colspan="2">TOTAL INVESTMENT</td>
                    <td style="color: #1B3022;">${(totalRow as { total: string }).total}</td>
                </tr>
            </table>
        </div>

        <div class="legal-footer">
            <div style="margin-bottom: 20px;">
                <strong>Privacy & Security Terms:</strong><br>
                Mowglai adheres to strict GDPR and Indian IT Act standards. All client data and project files are encrypted. We guarantee 100% intellectual property transfer upon final payment.
            </div>
            <div>
                <strong>Service Charges:</strong><br>
                A 50% upfront deposit is required to initiate the project. The remaining 50% is due upon completion of the UAT (User Acceptance Testing) phase. Prices are exclusive of domain and hosting fees unless specified.
            </div>
            <div style="margin-top: 30px; text-align: center; border-top: 1px solid #ccc; padding-top: 20px;">
                <p>mowglai.in | Support: info@mowglai.in</p>
            </div>
        </div>
    </div>

    </body>
    </html>
  `;

    // Create a hidden container
    const container = document.createElement("div");
    container.innerHTML = htmlContent;
    container.style.position = "absolute";
    container.style.top = "-9999px";
    container.style.left = "0";
    container.style.width = "850px"; // Match the CSS width
    document.body.appendChild(container);

    try {
        const canvas = await html2canvas(container.querySelector(".quotation-wrapper") as HTMLElement, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Mowglai_Quotation_${plan.name}.pdf`);
    } catch (error) {
        console.error("Error generating PDF:", error);
    } finally {
        document.body.removeChild(container);
    }
};
