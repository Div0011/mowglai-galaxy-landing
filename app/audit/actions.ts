import { z } from "zod";

const auditSchema = z.object({
    url: z.string().url({ message: "Please enter a valid URL (including http:// or https://)" }),
});

export type AuditDetail = {
    title: string;
    status: "pass" | "fail" | "warning";
    value: string;
    description: string; // Layman explanation
    recommendation?: string;
};

export type AuditCategory = {
    score: number;
    title: string;
    description: string;
    items: AuditDetail[];
}

export type AuditResult = {
    url: string;
    success: boolean;
    error?: string;
    timestamp: string;
    categories: {
        seo: AuditCategory;
        performance: AuditCategory;
        security: AuditCategory;
        content: AuditCategory;
    }
};

export async function analyzeWebsite(formData: FormData): Promise<AuditResult> {
    const rawUrl = formData.get("url") as string;

    const validatedFields = auditSchema.safeParse({ url: rawUrl });
    if (!validatedFields.success) {
        return createErrorResult(rawUrl, validatedFields.error.errors[0].message);
    }

    const url = validatedFields.data.url;

    try {
        const response = await fetch('/api/audit.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
            const message = typeof data?.error === 'string' ? data.error : 'Audit request failed.';
            return createErrorResult(url, message);
        }

        return data as AuditResult;
    } catch (error: unknown) {
        let message = "Failed to reach audit endpoint.";
        if (error instanceof Error) {
            message = error.message;
        } else if (typeof error === "string") {
            message = error;
        }
        return createErrorResult(url, message);
    }
}

function createErrorResult(url: string, error: string): AuditResult {
    const emptyCategory = { score: 0, title: "", description: "", items: [] };
    return {
        url,
        success: false,
        error: error,
        timestamp: new Date().toISOString(),
        categories: {
            seo: { ...emptyCategory, title: "Search Visibility" },
            performance: { ...emptyCategory, title: "Speed & Experience" },
            security: { ...emptyCategory, title: "Trust & Security" },
            content: { ...emptyCategory, title: "Content Health" }
        }
    };
}
