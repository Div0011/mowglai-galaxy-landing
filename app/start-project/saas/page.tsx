"use client";

import ServiceRequestForm, { FormField } from "@/components/ServiceRequestForm";
import { Rocket } from "lucide-react";

export default function SaasProjectPage() {
    const fields: FormField[] = [
        { id: "startupName", label: "Startup Name", type: "text", placeholder: "Your Venture Name", required: true },
        { id: "founderName", label: "Founder Name", type: "text", placeholder: "Your Full Name", required: true },
        { id: "email", label: "Business Email", type: "email", placeholder: "you@venture.com", required: true },
        { id: "idea", label: "Elevator Pitch", type: "textarea", placeholder: "Describe your idea in one sentence...", required: true },
        { id: "audience", label: "Target Audience", type: "text", placeholder: "Who is this product for?", required: true },
        { id: "features", label: "Core Features (MVP)", type: "textarea", placeholder: "List 3-5 must-have features for V1...", required: true },
        { id: "budget", label: "Budget Range", type: "select", options: ["$5k - $10k", "$10k - $25k", "$25k - $50k", "$50k+"], required: true },
        { id: "timeline", label: "Target Launch", type: "text", placeholder: "e.g. 2 months", required: false },
    ];

    return (
        <ServiceRequestForm
            title="SaaS MVP Incubator"
            subtitle="Validate your startup idea fast with a production-grade MVP. We handle the tech while you focus on growth."
            heroImage={<div className="aspect-video bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center"><Rocket className="w-24 h-24 text-white/50" /></div>}
            fields={fields}
            serviceName="SaaS MVP"
        />
    );
}
