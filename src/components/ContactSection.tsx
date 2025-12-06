import { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your project? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-6 text-foreground">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                    <Mail className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Email</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">hello@mowglai.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                    <Phone className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Phone</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all">
                    <MapPin className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Location</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="glass-card rounded-2xl p-8">
              <h4 className="font-display font-semibold mb-3 text-foreground">Working Hours</h4>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
              <p className="text-muted-foreground">Weekend: By appointment only</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="glass-card rounded-3xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">
                    Your Name
                  </label>
                  <Input
                    required
                    placeholder="John Doe"
                    className="bg-secondary/50 border-glass-border/30 focus:border-primary rounded-xl h-12 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">
                    Email Address
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="bg-secondary/50 border-glass-border/30 focus:border-primary rounded-xl h-12 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">
                  Subject
                </label>
                <Input
                  required
                  placeholder="How can we help you?"
                  className="bg-secondary/50 border-glass-border/30 focus:border-primary rounded-xl h-12 transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-muted-foreground mb-2 group-focus-within:text-primary transition-colors">
                  Message
                </label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="bg-secondary/50 border-glass-border/30 focus:border-primary rounded-xl resize-none transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:shadow-primary/20"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-6 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
