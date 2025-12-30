import { Check, Sparkles, ArrowRight, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { downloadAsHtml } from "@/utils/pdfDownloader";

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
  const navigate = useNavigate();

  const handlePlanClick = (plan: typeof plans[0]) => {
    if (plan.price === "Custom") {
      navigate("/custom-request");
    } else {
      navigate("/project-request", { state: { plan } });
    }
  };

  return (
    <section id="pricing" className="relative w-full py-16 z-20">
      <div className="container mx-auto px-6">

        {/* Header - Two-line style with faded word */}
        <div className="mb-24 text-center">
          <h2 className="text-[10vw] leading-[0.8] font-display font-black tracking-tighter text-foreground mb-8 relative z-10 flex flex-col items-center">
            <span className="opacity-10">THE</span>
            <span className="text-primary -mt-4">INVESTMENT</span>
          </h2>
          <p className="text-xl text-primary font-body tracking-[0.3em] uppercase opacity-60">
            Value Beyond Measurement
          </p>
        </div>

        {/* Plans List - Fixed height cards with hover effect */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              className={cn(
                "relative p-10 md:p-12 glass-card border border-primary/20 transition-all duration-700 hover:-translate-y-4 hover:border-primary group flex flex-col h-full",
                plan.popular ? "bg-primary/5 border-primary/40 shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]" : "bg-background/40"
              )}
            >
              {/* Hover Golden Glow */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-700 rounded-full -z-10" />

              <div className="mb-8 shrink-0">
                {plan.popular && (
                  <span className="inline-block px-4 py-1 rounded-full bg-primary text-background text-[10px] font-bold tracking-widest uppercase mb-6">Most Popular</span>
                )}
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {plan.name}
                </h3>
                <div className="text-5xl md:text-6xl font-display font-black text-foreground mb-4">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg font-normal text-muted-foreground ml-2">/ project</span>}
                </div>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{plan.description}</p>
              </div>

              <div className="h-px w-full bg-primary/10 mb-8" />

              <ul className="space-y-4 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-4 text-xl text-foreground/80 leading-tight">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 mt-auto">
                <Button
                  onClick={() => handlePlanClick(plan)}
                  data-theme={plan.popular ? "gold" : undefined}
                  className={cn(
                    "w-full py-8 text-xl font-display font-black uppercase tracking-widest rounded-full transition-all duration-500 shadow-lg",
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-foreground hover:text-background"
                      : "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background"
                  )}
                >
                  START {plan.price === "Custom" ? "DIALOGUE" : "ASCENT"}
                </Button>

                <a
                  href={`${import.meta.env.BASE_URL}${plan.proposalFile}`}
                  className="flex justify-center items-center gap-2 py-2 text-xs font-bold tracking-widest uppercase text-primary/60 hover:text-primary transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    downloadAsHtml(`${import.meta.env.BASE_URL}${plan.proposalFile}`, `Mowglai_${plan.name}_Proposal.html`);
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
