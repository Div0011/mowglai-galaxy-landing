import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$999",
    description: "Perfect for small businesses getting started online",
    features: [
      "Single page website",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "1 month support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$2,499",
    description: "Ideal for growing businesses needing more features",
    features: [
      "Multi-page website (up to 10)",
      "Custom animations",
      "Advanced SEO & Analytics",
      "CMS integration",
      "E-commerce ready",
      "3 months support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
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
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for every stage of your business journey.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "glass-card rounded-3xl p-8 relative transition-all duration-500 hover:scale-105",
                plan.popular && "border-primary/50 glow-box"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-display font-semibold mb-2 text-foreground">{plan.name}</h3>
                <div className="text-4xl font-display font-bold text-primary mb-2">{plan.price}</div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full py-6 rounded-xl font-semibold transition-all duration-300",
                  plan.popular
                    ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                )}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
