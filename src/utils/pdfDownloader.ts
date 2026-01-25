import html2pdf from 'html2pdf.js';

export const downloadAsHtml = async (url: string, filename: string) => {
    try {
        const response = await fetch(url);
        const text = await response.text();

        // Ensure filename ends in .html
        let finalFilename = filename;
        if (finalFilename.toLowerCase().endsWith('.pdf')) {
            finalFilename = finalFilename.replace(/\.pdf$/i, '.html');
        } else if (!finalFilename.toLowerCase().endsWith('.html')) {
            finalFilename += '.html';
        }

        const blob = new Blob([text], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = finalFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error("HTML download failed:", error);
        window.open(url, '_blank');
    }
};

export const downloadFromHtml = async (url: string, filename: string) => {
    // Redirect to downloadAsHtml as per user request to start downloading HTMLs instead of PDFs
    return downloadAsHtml(url, filename);
};
