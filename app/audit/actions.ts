'use server'

import { string, z } from "zod";

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

    // Basic Validation
    const validatedFields = auditSchema.safeParse({ url: rawUrl });

    if (!validatedFields.success) {
        return createErrorResult(rawUrl, validatedFields.error.errors[0].message);
    }

    const url = validatedFields.data.url;
    const startTime = Date.now();

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mowglai-Audit-Bot/1.0',
            },
            next: { revalidate: 0 } // No cache
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        const headers = response.headers;
        const endTime = Date.now();
        const loadTimeMs = endTime - startTime;

        // --- SIMULATED ANALYSIS ---

        // 1. SSL & Security Headers
        const isSSL = url.startsWith("https://");
        const hsts = headers.get('strict-transport-security');
        const xFrame = headers.get('x-frame-options');
        const xContentType = headers.get('x-content-type-options');
        const referrerPolicy = headers.get('referrer-policy');

        // Email Privacy
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const emailsFound = [...html.matchAll(emailRegex)];
        const uniqueEmails = [...new Set(emailsFound.map(m => m[0]))];


        // 2. SEO Basics
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1].trim() : null;

        const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
        const description = descMatch ? descMatch[1].trim() : null;

        const h1Matches = [...html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)];

        const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
        const canonical = canonicalMatch ? canonicalMatch[1] : null;

        const viewportMatch = html.match(/<meta\s+name=["']viewport["'][^>]*>/i);

        // Check for Language and Charset
        const langMatch = html.match(/<html[^>]+lang=["']([^"']+)["'][^>]*>/i);
        const lang = langMatch ? langMatch[1] : null;

        const charsetMatch = html.match(/<meta\s+charset=["']([^"']+)["'][^>]*>/i);
        const charset = charsetMatch ? charsetMatch[1] : null;

        // Favicon
        const faviconMatch = html.match(/<link\s+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+)["'][^>]*>/i);
        const favicon = faviconMatch ? faviconMatch[1] : null;


        // 3. Content
        const wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).length;

        // 4. Images
        const imgMatches = [...html.matchAll(/<img[^>]+>/gi)];
        const imageCount = imgMatches.length;
        const altMatches = [...html.matchAll(/<img[^>]+alt=["']([^"']+)["'][^>]*>/gi)];
        const imagesWithAlt = altMatches.length;

        // 5. Social / Open Graph
        const ogTitle = html.match(/<meta\s+property=["']og:title["']/i);
        const ogImage = html.match(/<meta\s+property=["']og:image["']/i);

        // 6. Scripts & CSS (Simplistic count)
        const scriptCount = (html.match(/<script/gi) || []).length;
        const cssCount = (html.match(/<link\s+rel=["']stylesheet["']/gi) || []).length;


        // --- SCORING & CATEGORIZATION ---

        // SEO
        let seoScore = 0;
        const seoItems: AuditDetail[] = [];

        // Title
        if (title) {
            seoScore += 15;
            seoItems.push({
                title: "Page Title",
                status: "pass",
                value: "Found",
                description: "Your page has a title tag. This is the first thing users see in search results."
            });
        } else {
            seoItems.push({
                title: "Page Title",
                status: "fail",
                value: "Missing",
                description: "Your page is missing a title tag.",
                recommendation: "Add a descriptive title tag (<title>) to the <head> of your page."
            });
        }

        // Meta Description
        if (description) {
            seoScore += 15;
            seoItems.push({
                title: "Meta Description",
                status: "pass",
                value: "Found",
                description: "A summary of your page is present for search engines."
            });
        } else {
            seoItems.push({
                title: "Meta Description",
                status: "fail",
                value: "Missing",
                description: "No summary found. Search engines will guess what your page is about.",
                recommendation: "Add a <meta name='description'> tag with a concise summary."
            });
        }

        // H1
        if (h1Matches.length > 0) {
            seoScore += 15;
            seoItems.push({
                title: "Main Heading (H1)",
                status: "pass",
                value: `${h1Matches.length} Found`,
                description: "Your page has a clear main topic heading."
            });
        } else {
            seoItems.push({
                title: "Main Heading (H1)",
                status: "fail",
                value: "Missing",
                description: "No main heading found. It's hard to tell what the main topic is.",
                recommendation: "Add one <h1> tag that describes the main content of the page."
            });
        }

        // Mobile Viewport
        if (viewportMatch) {
            seoScore += 15;
            seoItems.push({
                title: "Mobile Optimization",
                status: "pass",
                value: "Optimized",
                description: "Your page is configured to scale correctly on mobile devices."
            });
        } else {
            seoItems.push({
                title: "Mobile Optimization",
                status: "fail",
                value: "Missing Viewport",
                description: "This page might look broken on mobile phones.",
                recommendation: "Add a <meta name='viewport'> tag to ensure mobile responsiveness."
            });
        }

        // Canonical
        if (canonical) {
            seoScore += 15;
            seoItems.push({
                title: "Canonical Tag",
                status: "pass",
                value: "Found",
                description: "You're preventing duplicate content issues correctly."
            });
        } else {
            seoScore += 10;
            seoItems.push({
                title: "Canonical Tag",
                status: "warning",
                value: "Missing",
                description: "Helps prevent duplicate content issues if your site is accessed via multiple URLs.",
                recommendation: "Add a <link rel='canonical'> tag."
            });
        }

        // Language
        if (lang) {
            seoScore += 15;
            seoItems.push({
                title: "Language Tag",
                status: "pass",
                value: lang,
                description: "Search engines know the language of your content."
            });
        } else {
            seoItems.push({
                title: "Language Tag",
                status: "fail",
                value: "Missing",
                description: "Search engines might guess the wrong language.",
                recommendation: "Add a 'lang' attribute to your <html> tag."
            });
        }

        // Favicon
        if (favicon) {
            seoScore += 10;
            seoItems.push({
                title: "Favicon",
                status: "pass",
                value: "Found",
                description: "Brand icon found. Helps with recognition in browser tabs."
            });
        } else {
            seoItems.push({
                title: "Favicon",
                status: "warning",
                value: "Missing",
                description: "No brand icon found.",
                recommendation: "Add a favicon to look more professional."
            });
        }


        // PERFORMANCE
        let perfScore = 0;
        const perfItems: AuditDetail[] = [];
        const loadTimeSec = (loadTimeMs / 1000).toFixed(2);

        // Load Time
        if (loadTimeMs < 800) {
            perfScore += 60;
            perfItems.push({
                title: "Server Response Time",
                status: "pass",
                value: `${loadTimeSec}s`,
                description: "Incredible! Your website server responds instantly."
            });
        } else if (loadTimeMs < 2000) {
            perfScore += 40;
            perfItems.push({
                title: "Server Response Time",
                status: "warning",
                value: `${loadTimeSec}s`,
                description: "Good, but could be faster. Aim for under 0.8 seconds.",
                recommendation: "Optimize server cache or upgrade hosting."
            });
        } else {
            perfScore += 10;
            perfItems.push({
                title: "Server Response Time",
                status: "fail",
                value: `${loadTimeSec}s`,
                description: "Slow. Users may leave before the page loads.",
                recommendation: "Critical: Investigate server response times."
            });
        }

        // Code Bloat (Scripts)
        if (scriptCount < 15) {
            perfScore += 20;
            perfItems.push({
                title: "JavaScript Bloat",
                status: "pass",
                value: `${scriptCount} scripts`,
                description: "Low code usage. Helps with faster rendering."
            });
        } else if (scriptCount < 30) {
            perfScore += 10;
            perfItems.push({
                title: "JavaScript Bloat",
                status: "warning",
                value: `${scriptCount} scripts`,
                description: "Moderate amount of external code. Watch out for slowdowns.",
                recommendation: "Combine or remove unnecessary script tags."
            });
        } else {
            perfItems.push({
                title: "JavaScript Bloat",
                status: "fail",
                value: `${scriptCount} scripts`,
                description: "High amount of third-party code. Likely slowing down your site.",
                recommendation: "Audit and remove unused JavaScript libraries."
            });
        }

        // Code Bloat (CSS)
        if (cssCount < 10) {
            perfScore += 20;
            perfItems.push({
                title: "CSS Requests",
                status: "pass",
                value: `${cssCount} files`,
                description: "Efficient styling structure."
            });
        } else {
            perfScore += 10;
            perfItems.push({
                title: "CSS Requests",
                status: "warning",
                value: `${cssCount} files`,
                description: "Many separate style files. Each one delays rendering.",
                recommendation: "Combine certain CSS files to reduce requests."
            });
        }

        // SECURITY
        let secScore = 0;
        const secItems: AuditDetail[] = [];

        // SSL
        if (isSSL) {
            secScore += 40;
            secItems.push({
                title: "SSL Certificate",
                status: "pass",
                value: "Active",
                description: "Your site is secure. Data is encrypted specifically for your visitors."
            });
        } else {
            secItems.push({
                title: "SSL Certificate",
                status: "fail",
                value: "Missing",
                description: "Not Secure. Browsers may warn users not to visit.",
                recommendation: "Install an SSL certificate immediately (HTTPS)."
            });
        }

        // HSTS
        if (hsts) {
            secScore += 20;
            secItems.push({
                title: "HSTS Header",
                status: "pass",
                value: "Active",
                description: "You are enforcing secure connections strictly."
            });
        } else {
            secItems.push({
                title: "HSTS Header",
                status: "warning",
                value: "Missing",
                description: "Strict-Transport-Security header is missing.",
                recommendation: "Enable HSTS to prevent protocol downgrade attacks."
            });
        }

        // X-Content-Type-Options
        if (xContentType === 'nosniff') {
            secScore += 20;
            secItems.push({
                title: "MIME Sniffing Protection",
                status: "pass",
                value: "Active",
                description: "Prevents browsers from incorrectly detecting file types."
            });
        } else {
            secItems.push({
                title: "MIME Sniffing Protection",
                status: "warning",
                value: "Missing",
                description: "X-Content-Type-Options header is missing.",
                recommendation: "Add 'X-Content-Type-Options: nosniff' header."
            });
        }

        // Email Privacy
        if (uniqueEmails.length === 0) {
            secScore += 20;
            secItems.push({
                title: "Email Privacy",
                status: "pass",
                value: "Secure",
                description: "No plain-text email addresses found. Good for spam prevention."
            });
        } else {
            secItems.push({
                title: "Email Privacy",
                status: "warning",
                value: `${uniqueEmails.length} Emails Exposed`,
                description: "Plain text emails found. Bots can scrape these for spam.",
                recommendation: "Use contact forms or obfuscate email addresses."
            });
        }

        // CONTENT / STRUCTURE
        let contentScore = 0;
        const contentItems: AuditDetail[] = [];

        // Word Count
        if (wordCount > 300) {
            contentScore += 40;
            contentItems.push({
                title: "Content Volume",
                status: "pass",
                value: "~" + wordCount + " words",
                description: "Good amount of text content for search engines to understand."
            });
        } else {
            contentScore += 20;
            contentItems.push({
                title: "Content Volume",
                status: "warning",
                value: "~" + wordCount + " words",
                description: "Thin content. It's hard search engines to rank pages with little text.",
                recommendation: "Add more descriptive text."
            });
        }

        // Images
        const missingAlt = imageCount - imagesWithAlt;
        if (imageCount === 0) {
            contentScore += 30; // Not a fail, but warning
            contentItems.push({
                title: "Images",
                status: "warning",
                value: "None",
                description: "Visuals help engagement, but you have none.",
                recommendation: "Consider adding relevant images."
            });
        } else if (missingAlt === 0) {
            contentScore += 30;
            contentItems.push({
                title: "Image Accessibility",
                status: "pass",
                value: "Perfect",
                description: "All images have descriptions (Alt text). Great for accessibility."
            });
        } else {
            contentScore += 10;
            contentItems.push({
                title: "Image Accessibility",
                status: "warning",
                value: `${missingAlt} missing descriptions`,
                description: "Some images are missing descriptions for screen readers.",
                recommendation: "Add 'alt' attributes to describe your images."
            });
        }

        // Social Graph
        if (ogTitle && ogImage) {
            contentScore += 30;
            contentItems.push({
                title: "Social Sharing",
                status: "pass",
                value: "Optimized",
                description: "Your site looks good when shared on social media (Open Graph)."
            });
        } else if (ogTitle || ogImage) {
            contentScore += 15;
            contentItems.push({
                title: "Social Sharing",
                status: "warning",
                value: "Partial",
                description: "Partial social configuration found.",
                recommendation: "Ensure both og:title and og:image tags are present."
            });
        } else {
            contentItems.push({
                title: "Social Sharing",
                status: "fail",
                value: "Missing",
                description: "Links will look broken or empty when shared on social media.",
                recommendation: "Add Open Graph (og:) meta tags."
            });
        }


        return {
            url,
            success: true,
            timestamp: new Date().toISOString(),
            categories: {
                seo: {
                    score: Math.min(100, Math.max(0, seoScore)),
                    title: "Search Visibility",
                    description: "How easily potential customers can find you on Google.",
                    items: seoItems
                },
                performance: {
                    score: Math.min(100, Math.max(0, perfScore)),
                    title: "Speed & Experience",
                    description: "How fast your site feels. Slow sites lose customers.",
                    items: perfItems
                },
                security: {
                    score: secScore,
                    title: "Trust & Security",
                    description: "Is your site safe for visitors? Essential for trust.",
                    items: secItems
                },
                content: {
                    score: Math.min(100, Math.max(0, contentScore)),
                    title: "Content Health",
                    description: "Does your content follow best practices for engagement?",
                    items: contentItems
                }
            }
        };

    } catch (error: unknown) {
        let message = "Failed to analyze website. It might be blocking bots."
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
