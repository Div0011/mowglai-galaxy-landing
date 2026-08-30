"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Database,
    Server,
    ShieldCheck,
    Zap,
    HardDrive,
    Key,
    Lock,
    GitBranch,
    ArrowRight,
    CheckCircle2,
    Activity,
    Layers,
    Cpu,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    Network
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Magnetic from "@/components/Magnetic";
import NextPageButton from "@/components/NextPageButton";
import { cn } from "@/lib/utils";

const dbNodes = [
    {
        id: "relational",
        title: "Relational Engine (PostgreSQL / Supabase)",
        tagline: "Transactional Core & Row-Level Security",
        description: "ACID-compliant relational store with custom index optimization, connection pooling with PgBouncer, and automated row-level security (RLS) policies.",
        metrics: { latency: "<1.4ms", concurrency: "10,000+ ops/sec", replication: "Multi-AZ Sync" },
        features: ["B-Tree & GIN Index Tuning", "Row-Level Security (RLS)", "Prisma / Drizzle Type Safety", "Automated Point-in-Time Restore"]
    },
    {
        id: "cache",
        title: "In-Memory Cache (Redis)",
        tagline: "Sub-Millisecond Read Acceleration",
        description: "Ultra-fast in-memory key-value cache handling user session states, distributed rate limiting, global leaderboard counters, and pub/sub message queues.",
        metrics: { latency: "<0.3ms", concurrency: "100,000+ ops/sec", replication: "Cluster Sharded" },
        features: ["Distributed Session Store", "Dynamic API Response Caching", "Sliding Window Rate Limiting", "Pub/Sub Event Streaming"]
    },
    {
        id: "analytics",
        title: "Analytics Warehouse (BigQuery / ClickHouse)",
        tagline: "Petabyte-Scale Event & Telemetry Aggregation",
        description: "Column-oriented analytical warehouse engineered to execute complex multi-table aggregations, user cohort retention, and BI dashboards in seconds.",
        metrics: { latency: "Sub-second OLAP", concurrency: "Petabyte Queries", replication: "Globally Distributed" },
        features: ["Partitioned Columnar Tables", "Zero-Maintenance Serverless", "Automated ETL/ELT Pipelines", "Real-Time BI Synchronization"]
    },
    {
        id: "vector",
        title: "Vector Embeddings (pgvector / Pinecone)",
        tagline: "Semantic Search & AI Memory Store",
        description: "High-dimensional vector indexing (HNSW & IVFFlat) powering semantic document search, AI agent memory, and real-time personalized recommendations.",
        metrics: { latency: "<15ms", concurrency: "1536-Dim Vectors", replication: "Hybrid Keyword Rerank" },
        features: ["HNSW Nearest Neighbor Search", "Cosine & Dot-Product Distance", "RAG Pipeline Grounding", "Hybrid Dense/Sparse Search"]
    }
];

const capabilities = [
    {
        icon: Database,
        title: "High-Availability Relational Modeling",
        description: "Normalized schemas, strict foreign key constraints, composite indexes, and connection pooling engineered to survive high-volume concurrent loads."
    },
    {
        icon: RefreshCw,
        title: "Zero-Downtime Cloud Migrations",
        description: "Safe, automated migration pipelines transitioning legacy databases to modern cloud managed instances without data loss or service disruption."
    },
    {
        icon: Zap,
        title: "In-Memory Cache & Query Tuning",
        description: "Drastically reduce database load and server costs by caching frequent queries with Redis, achieving sub-millisecond API response times."
    },
    {
        icon: Network,
        title: "AI Vector & Semantic Infrastructure",
        description: "Integrate vector databases (pgvector, Pinecone, Qdrant) enabling semantic text search, document indexing, and AI agent memory systems."
    },
    {
        icon: ShieldCheck,
        title: "Automated Backups & Disaster Recovery",
        description: "Multi-region continuous replication, point-in-time recovery (PITR), and automated failover guarantees that protect your mission-critical data."
    },
    {
        icon: Lock,
        title: "Data Governance & SOC2 Compliance",
        description: "AES-256 encryption at rest, TLS 1.3 in transit, strict role-based access control (RBAC), and automated PII data sanitization."
    }
];

const dbSteps = [
    {
        num: "01",
        title: "Data Modeling & Entity Mapping",
        description: "We analyze your business entities, transactional flows, and data relationships to build an optimal, normalized relational schema."
    },
    {
        num: "02",
        title: "Query & Index Optimization",
        description: "We profile slow queries, configure B-Tree and GIN indexes, tune connection pools, and establish in-memory caching policies."
    },
    {
        num: "03",
        title: "Security & Replication Hardening",
        description: "We enforce row-level security, set up multi-region read replicas, and configure automated point-in-time disaster backups."
    },
    {
        num: "04",
        title: "Telemetry & Automated Observability",
        description: "Continuous database health monitoring tracking CPU, memory, connection saturation, and slow query alerts in real time."
    }
];

const faqs = [
    {
        q: "What database engines do you specialize in?",
        a: "We specialize primarily in PostgreSQL, Supabase, Redis, Google Cloud BigQuery, ClickHouse, and SQLite/Turso for edge architectures, managed with Prisma and Drizzle ORMs."
    },
    {
        q: "Can you help optimize slow-running SQL queries in our existing app?",
        a: "Yes. We perform deep EXPLAIN ANALYZE profiling, query rewriting, index restructuring, and Redis caching layers that frequently reduce query execution times from seconds to single-digit milliseconds."
    },
    {
        q: "How do you handle database migrations without taking down our application?",
        a: "We use expand-and-contract migration patterns with backwards-compatible schema transitions, shadow writing, and dual-run verifications to guarantee 100% continuous uptime."
    },
    {
        q: "How is our data protected against catastrophic cloud failures?",
        a: "We configure multi-region asynchronous read replicas, hourly snapshot backups, and point-in-time recovery (PITR) allowing your data to be restored to any exact second in time."
    }
];

export default function DatabaseSolutionsClient() {
    const [selectedNode, setSelectedNode] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const activeNode = dbNodes[selectedNode];

    return (
        <PageLayout>
            <div className="bg-transparent text-foreground min-h-screen px-4 md:px-12 lg:px-24 py-32 font-sans relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none -mr-20 -mt-20 animate-pookie-float" />
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none -ml-20" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Hero Section */}
                <div className="relative z-10 max-w-7xl mx-auto mt-8 md:mt-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-8"
                    >
                        <Database className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-[0.3em]">
                            Service 06 / Database
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
                                <span>Data</span>
                                <span className="text-primary italic">Intelligence & Database</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="mt-8 text-lg sm:text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-3xl"
                            >
                                Sophisticated database solutions ensuring your mission-critical data is perfectly organized, blazing-fast to query, and impenetrably secured across global cloud infrastructure.
                            </motion.p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-6">
                            <Magnetic>
                                <Link
                                    href="/contact?subject=Database%20Architecture%20Project"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-display font-bold uppercase tracking-widest text-sm md:text-base hover:scale-105 transition-all shadow-[0_0_35px_rgba(var(--primary-rgb),0.3)]"
                                >
                                    Architect Database
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </Magnetic>
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                Sub-Millisecond • Zero-Downtime • SOC2 Compliant
                            </span>
                        </div>
                    </div>
                </div>

                {/* Interactive Database Architecture & Topology Sandbox */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-6 sm:p-10 md:p-14 rounded-[2.5rem] bg-secondary/10 border border-primary/20 backdrop-blur-2xl shadow-2xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-primary/10">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
                                    <Network className="w-3.5 h-3.5" /> Distributed Data Topology Visualizer
                                </div>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-[1.25] sm:leading-[1.3] mt-2">
                                    Multi-Tier Data Architecture
                                </h2>
                            </div>

                            {/* Node Switchers */}
                            <div className="flex flex-wrap gap-2">
                                {dbNodes.map((node, i) => (
                                    <button
                                        key={node.id}
                                        type="button"
                                        onClick={() => setSelectedNode(i)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
                                            selectedNode === i
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                                : "bg-background/40 text-muted-foreground hover:text-foreground border border-primary/10"
                                        )}
                                    >
                                        {node.title.split(" ")[0]} Tier
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Node Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
                            {/* Left: Active Node Information */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="p-6 sm:p-8 rounded-2xl bg-background/50 border border-primary/15 backdrop-blur-md">
                                    <span className="text-xs font-mono text-primary uppercase tracking-widest block mb-2">
                                        {activeNode.tagline}
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-display font-black uppercase text-foreground mb-4 leading-snug">
                                        {activeNode.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-body">
                                        {activeNode.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {activeNode.features.map((feat, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-primary/10 text-xs sm:text-sm font-mono"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                            <span className="text-foreground">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Security & SLA Telemetry Card */}
                            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-background/40 border border-primary/15 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
                                        Tier Telemetry & SLAs
                                    </span>
                                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono">
                                        <Activity className="w-3.5 h-3.5 animate-pulse" /> Real-Time
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="p-3 rounded-xl bg-background/80 border border-primary/10 text-center">
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Latency</div>
                                        <div className="text-sm sm:text-base font-display font-bold text-primary">{activeNode.metrics.latency}</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-background/80 border border-primary/10 text-center">
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Capacity</div>
                                        <div className="text-sm sm:text-base font-display font-bold text-foreground truncate">{activeNode.metrics.concurrency}</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-background/80 border border-primary/10 text-center">
                                        <div className="text-[10px] font-mono text-muted-foreground uppercase">Replication</div>
                                        <div className="text-sm sm:text-base font-display font-bold text-emerald-400 truncate">{activeNode.metrics.replication}</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-primary/10 space-y-2.5">
                                    <div className="text-xs font-mono text-muted-foreground uppercase font-bold">
                                        Security & Compliance Checklist
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>256-bit AES Encryption at Rest & TLS 1.3 in Transit</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>Automated Hourly Snapshots & Point-In-Time Restore</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-foreground/90">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span>GDPR & SOC2 Privacy Compliant Masking</span>
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
                            Engineered For <span className="text-primary italic">Absolute Integrity</span>
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

                {/* 4-Step Engineering Lifecycle */}
                <div className="relative z-10 max-w-7xl mx-auto mb-32">
                    <div className="p-8 sm:p-12 md:p-16 rounded-[2.5rem] bg-secondary/10 border border-primary/15 backdrop-blur-xl">
                        <div className="max-w-3xl mb-16">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-primary block mb-4">
                                Methodology
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight leading-[1.2] sm:leading-[1.25]">
                                From Data Modeling To High-Scale Replication
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {dbSteps.map((step) => (
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
                        label="STRATEGY"
                        href="/services/digital-strategy"
                        tagline="Explore Next Service (07)"
                    />
                </div>
            </div>
        </PageLayout>
    );
}
