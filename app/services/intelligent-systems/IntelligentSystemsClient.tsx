"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bot,
    Sparkles,
    Cpu,
    Brain,
    Zap,
    MessageSquare,
    ArrowRight,
    CheckCircle2,
    Shield,
    Workflow,
    Layers,
    LineChart,
    Terminal,
    ChevronDown,
    ChevronUp,
    Play,
    Database,
    Lock,
    Eye
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";

const aiScenarios = [
    {
        id: "support",
        title: "24/7 Intelligent Support Agent",
        role: "Customer Support & Lead Capture",
        prompt: "A customer asks: 'Can your platform integrate with our existing SAP ERP and sync real-time inventory across 4 continents?'",
        response: "Analyzed technical compatibility. Yes! Mowglai provides a zero-downtime bi-directional SAP connector with sub-100ms multi-region replication and automated failover.",
        metrics: { latency: "180ms", tokens: "420 tokens/sec", confidence: "99.8%" },
        steps: ["Intent Classification", "ERP Knowledge Graph RAG", "Dynamic Context Assembly", "Action Proposal"]
    },
    {
        id: "data",
        title: "Autonomous Document & Data Agent",
        role: "Financial & Legal Data Extraction",
        prompt: "Upload 250-page complex PDF financial statements and calculate cross-subsidiary EBITDA variance.",
        response: "Parsed tables, footnotes, and line items across 250 pages. Discrepancy of +$142,000 detected in Q3 overseas amortization schedule. Summary report generated.",
        metrics: { latency: "420ms", tokens: "850 tokens/sec", confidence: "99.9%" },
        steps: ["Multi-Modal OCR Parse", "Structured JSON Schema Extraction", "Deterministic Math Engine", "Audit Trail Generation"]
    },
    {
        id: "crm",
        title: "Predictive Lead Scoring & Outreach",
        role: "Revenue Growth Automation",
        prompt: "Evaluate 1,200 incoming enterprise website visitors based on firmographics, dwell time, and feature interaction.",
        response: "Flagged 18 high-intent Tier-1 enterprise accounts. Triggered hyper-personalized demo briefs to VP of Sales with customized ROI pitch decks.",
        metrics: { latency: "95ms", tokens: "600 tokens/sec", confidence: "98.7%" },
        steps: ["Visitor Signal Ingestion", "Behavioral Scoring Model", "Dynamic Copy Synthesis", "CRM Webhook Trigger"]
    }
];

const capabilities = [
    {
        icon: Brain,
        title: "Autonomous AI Agents",
        description: "Task-oriented agents capable of complex multi-step reasoning, API execution, error recovery, and autonomous task execution without human bottlenecks."
    },
    {
        icon: MessageSquare,
        title: "Enterprise Conversational AI",
        description: "Bespoke multilingual chatbots trained on your company's proprietary knowledge base with strict guardrails, zero hallucination, and human-in-the-loop escalation."
    },
    {
        icon: Database,
        title: "RAG & Vector Knowledge Bases",
        description: "High-speed semantic search combining embeddings, hybrid keyword reranking, and Pinecone/Qdrant vector stores to retrieve facts in milliseconds."
    },
    {
        icon: Workflow,
        title: "Smart Workflow Orchestration",
        description: "End-to-end automation connecting CRMs, databases, email queues, and third-party APIs via event-driven autonomous pipelines."
    },
    {
        icon: Eye,
        title: "Multi-Modal Intelligence",
        description: "Vision and audio intelligence to extract insights from invoices, product imagery, video feeds, and speech in real time."
    },
    {
        icon: Lock,
        title: "Enterprise Security & Privacy",
        description: "Zero-retention data policies, SOC2/GDPR compliance, prompt injection defense, and isolated private model endpoints."
    }
];

const processSteps = [
    {
        num: "01",
        title: "AI Readiness & Data Audit",
        description: "We analyze your workflows, data repositories, and integration points to identify high-ROI AI automation opportunities."
    },
    {
        num: "02",
        title: "Architecture & RAG Prototyping",
        description: "We design custom system prompts, vector indexes, and agentic workflows, deploying a working prototype in under 2 weeks."
    },
    {
        num: "03",
        title: "Production Engineering & Guardrails",
        description: "We connect APIs, configure evaluation benchmarks, enforce safety guardrails, and stress-test performance under load."
    },
    {
        num: "04",
        title: "Continuous Evaluation & Scale",
        description: "Telemetry tracking token usage, latency, and accuracy with automated fine-tuning loops for continuous improvement."
    }
];

const faqs = [
    {
        q: "What AI models do you support and integrate?",
        a: "We integrate state-of-the-art models including Google Gemini 2.0 / 1.5 Pro, OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, and open-source models like Llama 3 and DeepSeek via self-hosted vLLM or Ollama for full data privacy."
    },
    {
        q: "How do you guarantee that the AI won't hallucinate?",
        a: "We implement rigorous Retrieval-Augmented Generation (RAG) with source-grounding, strict temperature controls, structured JSON output validation, and fallback verification rules."
    },
    {
        q: "Is our proprietary company data used to train public models?",
        a: "Never. We use enterprise API contracts with strict zero-data-retention terms and can deploy models entirely within your dedicated private VPC or on-premise infrastructure."
    },
    {
        q: "How fast can we launch an AI solution?",
        a: "Our rapid prototyping cycle typically delivers an interactive, working MVP in 10 to 14 days, with full production deployment in 3 to 6 weeks."
    }
];

export default function IntelligentSystemsClient() {
    const [activeScenario, setActiveScenario] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const scenario = aiScenarios[activeScenario];

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-12 lg:px-24 py-32 font-sans relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -mr-20 -mt-20 animate-pookie-float" />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -ml-20" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-16 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
                    >
                        <Bot className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.3em]">
                            Service 01 / Intelligence
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-b border-primary/20 pb-16">
                        <div className="lg:col-span-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25] flex flex-col gap-2 sm:gap-3"
                            >
                                <span>Intelligent</span>
                                <span className="text-primary italic">Systems & AI</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-3xl"
                            >
                                Empower your digital platforms with next-generation autonomous AI agents, enterprise RAG search, and automated workflows engineered for unmatched speed, reliability, and precision.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
                            <Magnetic>
                                <Link
                                    href="/contact?subject=AI%20%26%20Intelligent%20Systems"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_35px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    Build AI Solution
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                Enterprise-Grade • SOC2 Ready • Zero Hallucination
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interactive AI Simulation Sandbox */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-secondary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-primary/10">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
                                    <Terminal className="w-3.5 h-3.5" /> Interactive Agent Sandbox
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[1.25] sm:leading-[1.3] mt-2">
                                    Experience Autonomous AI In Action
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {aiScenarios.map((sc, i) => (
                                    <button
                                        key={sc.id}
                                        type="button"
                                        onClick={() => setActiveScenario(i)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                            activeScenario === i
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                                : "bg-background/40 text-muted-foreground hover:text-foreground border border-primary/10 hover:border-primary/30"
                                        )}
                                    >
                                        {sc.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
                            {/* Input / Output Simulation */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="p-6 rounded-2xl bg-background/50 border border-primary/15 backdrop-blur-md">
                                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                                        <span className="flex items-center gap-2 text-primary">
                                            <MessageSquare className="w-4 h-4" /> Trigger Prompt
                                        </span>
                                        <span>Role: {scenario.role}</span>
                                    </div>
                                    <p className="text-base sm:text-lg font-mono text-foreground/90 leading-relaxed">
                                        &quot;{scenario.prompt}&quot;
                                    </p>
                                </div>

                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/30 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                                    <div className="flex items-center justify-between text-xs font-mono text-primary uppercase tracking-wider mb-3">
                                        <span className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 animate-spin" /> Autonomous Agent Output
                                        </span>
                                        <span className="text-emerald-400 font-bold">Verified Fact Grounded</span>
                                    </div>
                                    <p className="text-base sm:text-lg font-mono text-foreground leading-relaxed">
                                        {scenario.response}
                                    </p>
                                </div>
                            </div>

                            {/* Live Agentic Execution Steps & Metrics */}
                            <div className="lg:col-span-5 p-6 rounded-2xl bg-background/40 border border-primary/15 space-y-6">
                                <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                                    Execution Pipeline & Telemetry
                                </div>

                                <div className="space-y-3">
                                    {scenario.steps.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/20 border border-primary/10 text-xs sm:text-sm font-mono"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                            <span className="text-muted-foreground">0{idx + 1}.</span>
                                            <span className="text-foreground font-semibold">{step}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-primary/10">
                                    <div className="text-center p-3 rounded-xl bg-background/60 border border-primary/10">
                                        <div className="text-[10px] uppercase font-mono text-muted-foreground">TTFT</div>
                                        <div className="text-sm sm:text-base font-display font-bold text-primary">{scenario.metrics.latency}</div>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-background/60 border border-primary/10">
                                        <div className="text-[10px] uppercase font-mono text-muted-foreground">Throughput</div>
                                        <div className="text-sm sm:text-base font-display font-bold text-foreground">{scenario.metrics.tokens}</div>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-background/60 border border-primary/10">
                                        <div className="text-[10px] uppercase font-mono text-muted-foreground">Accuracy</div>
                                        <div className="text-sm sm:text-base font-display font-bold text-emerald-400">{scenario.metrics.confidence}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Capabilities Grid */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                            Capabilities
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                            Engineered For <span className="text-primary italic">Autonomous Impact</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {capabilities.map((cap, idx) => {
                            const IconComponent = cap.icon;
                            return (
                                <motion.div
                                    key={cap.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="p-8 rounded-[2rem] bg-secondary/10 border border-primary/10 hover:border-primary/40 hover:bg-secondary/20 transition-all duration-500 group backdrop-blur-xl"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-500">
                                        <IconComponent className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-display font-bold uppercase mb-3 text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {cap.title}
                                    </h3>
                                    <p className="text-sm sm:text-base font-body text-muted-foreground leading-relaxed">
                                        {cap.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* 4-Step Engineering Process */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-secondary/10 border border-primary/15 backdrop-blur-xl">
                        <div className="max-w-3xl mb-16">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                                Our Methodology
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                                From Data Audit To Production AI
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((step) => (
                                <div
                                    key={step.num}
                                    className="p-6 rounded-2xl bg-background/30 border border-primary/10 hover:border-primary/30 transition-all duration-300 relative group"
                                >
                                    <div className="text-4xl sm:text-5xl font-display font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-4">
                                        {step.num}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-display font-bold uppercase mb-2 text-foreground leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tech Stack & Models */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32 text-center">
                    <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-6">
                        Supported Ecosystem
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase mb-10 text-foreground leading-[1.25]">
                        Built on State-of-the-Art Foundations
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
                        {[
                            "Google Gemini 2.0 / 1.5",
                            "OpenAI GPT-4o",
                            "Anthropic Claude 3.5",
                            "DeepSeek R1 / V3",
                            "LangChain & LlamaIndex",
                            "Pinecone & Qdrant",
                            "Next.js AI SDK",
                            "PostgreSQL pgvector",
                            "Python FastAPI & vLLM",
                            "HuggingFace Transformers"
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="px-5 py-2.5 rounded-full border border-primary/20 bg-background/40 text-foreground font-mono text-xs sm:text-sm tracking-wider hover:border-primary hover:bg-primary/10 transition-all"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="relative z-10 max-w-5xl mx-auto mb-32">
                    <div className="text-center mb-12">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-3">
                            Questions
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-display font-black uppercase leading-[1.2] sm:leading-[1.25]">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-primary/15 bg-secondary/10 overflow-hidden backdrop-blur-md transition-all"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-primary/5 transition-colors"
                                    >
                                        <span className="text-base sm:text-lg font-display font-bold uppercase text-foreground">
                                            {faq.q}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-6 pb-6 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-primary/10 pt-4"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Next Page Navigator */}
                <div className="relative z-10 max-w-7xl mx-auto pt-10">
                    <NextPageButton
                        label="WEB DESIGN"
                        href="/services/web-design"
                        tagline="Explore Next Service (02)"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
