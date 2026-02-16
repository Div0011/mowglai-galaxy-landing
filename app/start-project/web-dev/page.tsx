"use client";

import ServiceRequestForm, { FormField } from "@/components/ServiceRequestForm";
import { Globe } from "lucide-react";

export default function WebDevProjectPage() {
    const fields: FormField[] = [
        { id: "businessName", label: "Business Name", type: "text", placeholder: "Your Company", required: true },
        { id: "contactPerson", label: "Contact Person", type: "text", placeholder: "Full Name", required: true },
        { id: "email", label: "Work Email", type: "email", placeholder: "you@business.com", required: true },
        { id: "services", label: "Services Needed", type: "checkbox-group", options: ["Custom Web Development", "E-commerce", "Corporate Website", "API Integration", "Ongoing Maintenance"], required: true, maxSelections: 5 },
        { id: "techStack", label: "Preferred Tech Stack", type: "text", placeholder: "e.g. React, Node, Laravel (Optional)" },
        { id: "brief", label: "Project Brief", type: "textarea", placeholder: "Tell us about your goals...", required: true },
        { id: "teamSize", label: "Team Size Needed", type: "select", options: ["1-2 Developers", "3-5 Developers", "Full Product Team"], required: true },
    ];

    return (
        <ServiceRequestForm
            title="Web Development India"
            subtitle="Hire expert development teams in India. Silicon Valley quality code at competitive rates."
            heroImage={<div className="aspect-video bg-gradient-to-br from-orange-500/20 to-green-500/20 flex items-center justify-center"><Globe className="w-24 h-24 text-orange-500" /></div>}
            fields={fields}
            serviceName="Web Development Team"
        />
    );
}
