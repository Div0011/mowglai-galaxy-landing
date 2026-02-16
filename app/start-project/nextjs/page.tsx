"use client";

import ServiceRequestForm, { FormField } from "@/components/ServiceRequestForm";
import { Code2 } from "lucide-react";

export default function NextJsProjectPage() {
    const fields: FormField[] = [
        { id: "projectName", label: "Project Name", type: "text", placeholder: "e.g. E-commerce Platform", required: true },
        { id: "contactName", label: "Contact Name", type: "text", placeholder: "Your Name", required: true },
        { id: "email", label: "Email Address", type: "email", placeholder: "you@company.com", required: true },
        { id: "projectType", label: "Project Type", type: "select", options: ["New Web App", "Migration to Next.js", "Performance Optimization", "Headless CMS Integration"], required: true },
        { id: "requirements", label: "Key Requirements", type: "textarea", placeholder: "Describe the core functionality...", required: true },
        { id: "designStatus", label: "Design Status", type: "select", options: ["Ready (Figma/Sketch)", "Wireframes Only", "Need Design Help"], required: true },
        { id: "timeline", label: "Timeline", type: "text", placeholder: "When do you need this live?", required: false },
    ];

    return (
        <ServiceRequestForm
            title="Next.js Development"
            subtitle="Build high-performance, SEO-friendly web applications with the React framework for production."
            heroImage={<div className="aspect-video bg-gradient-to-br from-black/80 to-gray-900 border border-white/10 flex items-center justify-center"><Code2 className="w-24 h-24 text-white" /></div>}
            fields={fields}
            serviceName="Next.js Development"
        />
    );
}
