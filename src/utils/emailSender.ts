const PHP_ENDPOINT = "/send_email.php";
const API_ENDPOINT = "/api/send-email/";

/**
 * Sends form data to info@mowglai.com via the PHP backend endpoint (production)
 * or Next.js TLS SMTP API route (local dev / fallback).
 * Saves details to database and dispatches email notifications seamlessly.
 */
export const sendEmail = async (
    data: Record<string, string>
): Promise<{ status: "success" | "error"; message: string }> => {
    // 1. Try production PHP endpoint first
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const response = await fetch(PHP_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const result = await response.json();
            if (result.status === "success") {
                return {
                    status: "success",
                    message: result.message || "Thank you! Your message has been submitted and sent to info@mowglai.com successfully."
                };
            }
        }
    } catch {
        // PHP endpoint not available (e.g. running on Next.js dev server localhost:3000)
    }

    // 2. Fallback to Next.js API route for instant Hostinger SMTP delivery
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const result = await response.json();
        if (response.ok && result.status === "success") {
            return {
                status: "success",
                message: result.message || "Thank you! Your message has been submitted and emailed to info@mowglai.com instantly!"
            };
        }

        return {
            status: "error",
            message: result.message || "Unable to complete submission. Please try again shortly."
        };
    } catch (err: unknown) {
        console.error("[sendEmail] In-website submission error:", err);
        return {
            status: "error",
            message: "Unable to connect to mail server. Please check your internet connection or email info@mowglai.com directly.",
        };
    }
};
