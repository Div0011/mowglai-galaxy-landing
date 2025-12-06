import { Code2, Palette, Rocket, Shield } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "We write maintainable, scalable code following industry best practices and modern standards.",
  },
  {
    icon: Palette,
    title: "Stunning Design",
    description: "Beautiful, intuitive interfaces that captivate users and elevate your brand presence.",
  },
  {
    icon: Rocket,
    title: "Performance First",
    description: "Lightning-fast load times and smooth interactions for the best user experience.",
  },
  {
    icon: Shield,
    title: "Security Built-In",
    description: "Enterprise-grade security measures to protect your data and your users.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a team of passionate developers and designers dedicated to crafting exceptional digital experiences.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-500 group ripple-effect"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission statement */}
        <div className="mt-20 glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-foreground">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              To empower businesses with cutting-edge web solutions that drive growth, enhance user engagement, 
              and establish a powerful digital presence. We believe great software should be beautiful, fast, and accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
