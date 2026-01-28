"use client";

import { Check, Sparkles, ArrowRight, Download, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { downloadAsHtml } from "@/utils/pdfDownloader";
import { useTheme } from "next-themes";

const plans = [
  {
    name: "BASIC",
    price: "$499",
    description: "Perfect for small businesses getting started online",
    features: [
      "Single page website",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "1 month support",
    ],
    popular: false,
    proposalFile: "mowglai-proposal-basic.html",
  },
  {
    name: "ADVANCED",
    price: "$999",
    description: "Ideal for growing businesses needing more features",
    features: [
      "Multi-page website (up to 5)",
      "Custom animations",
      "Advanced SEO & Analytics",
      "CMS integration",
      "E-commerce ready",
      "3 months support",
    ],
    popular: true,
    proposalFile: "mowglai-proposal-advanced.html",
  },
  {
    name: "EPIC",
    price: "Custom",
    description: "Full-scale solutions for large organizations",
    features: [
      "Unlimited pages",
      "Custom web applications",
      "API development",
      "Database integration",
      "Priority 24/7 support",
      "Dedicated team",
    ],
    popular: false,
    proposalFile: "mowglai-proposal-epic.html",
  },
];

const PricingSection = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.price === "Custom") {
      router.push("/custom-request");
    } else {
      router.push(`/project-request?plan=${plan.name.toLowerCase()}`);
    }
  };

  return (
    <section id="pricing" className="relative w-full py-16 z-20">
      <div className="container mx-auto px-6">

        <div className="mb-16 text-center">
          <p className="text-xl text-primary font-body tracking-[0.3em] uppercase opacity-60">
            Value Beyond Measurement
          </p>
        </div>

        {/* Plans List - Fixed height cards with hover effect */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch px-4 md:px-0">
          {plans.map((plan, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              className={cn(
                "relative p-10 md:p-12 glass-card border transition-all duration-400 hover:-translate-y-4 group flex flex-col h-full overflow-hidden",
                plan.popular
                  ? (isDark
                    ? "bg-[#253218]/95 border-primary shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]"
                    : "bg-primary/5 border-primary/40 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]")
                  : (isDark
                    ? "bg-[#253218]/95 border-primary/20"
                    : "bg-background/40 border-primary/20")
              )}
            >
              {/* Colored Glow Effects */}
              <div className={cn(
                "absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity rounded-full",
                isDark ? "bg-primary" : "bg-primary/40"
              )} />

              <div className="mb-8 shrink-0 relative z-10">
                {plan.popular && (
                  <span className="inline-block px-4 py-1 rounded-full bg-primary text-black text-[10px] font-bold tracking-widest uppercase mb-6 shadow-lg">Most Popular</span>
                )}
                <h3 className={cn(
                  "text-xl sm:text-3xl md:text-4xl font-display font-bold mb-4 transition-colors",
                  isDark ? "text-primary" : "text-foreground group-hover:text-primary"
                )}>
                  {plan.name}
                </h3>
                <div className={cn(
                  "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black mb-4",
                  isDark ? "text-white" : "text-foreground"
                )}>
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg font-normal opacity-60 ml-2">/ project</span>}
                </div>
                <p className={cn(
                  "text-sm font-body leading-relaxed",
                  isDark ? "text-white/60" : "text-muted-foreground"
                )}>{plan.description}</p>
              </div>

              <div className={cn(
                "h-px w-full mb-8 relative z-10",
                isDark ? "bg-primary/20" : "bg-primary/10"
              )} />

              <ul className="space-y-4 mb-12 flex-grow relative z-10">
                {plan.features.map((feature, j) => (
                  <li key={j} className={cn(
                    "flex items-start gap-4 text-xl leading-tight",
                    isDark ? "text-white/80" : "text-foreground/80"
                  )}>
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      {feature}
                      {feature.includes("Mobile") && <Smartphone className="inline w-4 h-4 ml-2 text-primary" />}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 mt-auto relative z-10">
                <Button
                  onClick={() => handlePlanClick(plan)}
                  className={cn(
                    "w-full py-6 md:py-8 text-xs sm:text-lg md:text-xl font-display font-black uppercase tracking-widest rounded-full transition-all duration-500 shadow-lg",
                    plan.popular
                      ? "bg-primary text-black hover:bg-white hover:text-black"
                      : (isDark
                        ? "bg-white/5 border border-primary text-primary hover:bg-primary hover:text-black"
                        : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white")
                  )}
                >
                  START {plan.price === "Custom" ? "DIALOGUE" : "ASCENT"}
                </Button>

                <a
                  href={`/${plan.proposalFile}`}
                  className="flex justify-center items-center gap-2 py-2 text-xs font-bold tracking-widest uppercase text-primary/60 hover:text-primary transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    downloadAsHtml(`/${plan.proposalFile}`, `Mowglai_${plan.name}_Proposal.html`);
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download Proposal
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
