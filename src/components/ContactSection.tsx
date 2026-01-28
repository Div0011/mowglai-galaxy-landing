"use client";

import { useState, useRef } from "react";
import { Send, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import TextReveal from "./TextReveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/utils/emailSender";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";


const CONTACT_EMAIL = "info@mowglai.in"; // REPLACE THIS WITH YOUR PERSONAL EMAIL FOR TESTING
const COUNTRY_CODE = "91";
const LOCAL_PHONE_NUMBER = "9528545302";
const FULL_PHONE_NUMBER = `${COUNTRY_CODE}${LOCAL_PHONE_NUMBER}`;


const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { Contact } = t;

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `New Contact Message from ${formData.name}`;
    const result = await sendEmail({
      subject: subject,
      email: formData.email,
      name: formData.name,
      message: formData.message
    });

    if (result.status === 'success') {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      // Fallback
      const body = `
Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}
        `;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast({
        title: "Opening Email Client",
        description: "Server unreachable. Please check your email client.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full py-32 z-20 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Huge Header */}
        <div className="mb-24 relative">
          <h2 className="text-[13vw] sm:text-[12vw] md:text-[10vw] font-display font-black text-foreground select-none relative z-10 py-4 leading-[0.85]">
            <TextReveal text={Contact.hero.titleMain} />
            <span className="text-primary ml-0 -mr-12 md:ml-[38vw] block -mt-[1vw] md:-mt-[2vw]"><TextReveal text={Contact.hero.titleSub} delay={2} /></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Contact Info - Minimal & Large */}
          <div className="space-y-12">
            <p className="text-3xl font-light text-foreground/80 max-w-lg leading-snug">
              {Contact.hero.subtitle}
            </p>

            <div className="space-y-8">
              <div className="group cursor-pointer">
                <p className="text-sm text-foreground/50 uppercase tracking-widest mb-1">{Contact.info.email}</p>
                <p className="text-2xl sm:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{CONTACT_EMAIL}</p>
              </div>

              <div className="group flex flex-col gap-2">
                <p className="text-sm text-foreground/50 uppercase tracking-widest mb-1">{Contact.info.phone}</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href={`tel:+${FULL_PHONE_NUMBER}`}
                    className="flex items-center gap-2 text-xl sm:text-2xl font-display font-bold text-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    <span>{`+${COUNTRY_CODE} ${LOCAL_PHONE_NUMBER}`}</span>
                  </a>
                  <a
                    href={`https://wa.me/${FULL_PHONE_NUMBER}?text=${encodeURIComponent("Hi, I’m interested in Mowglai’s web & digital experience services. I’d like a quote and next steps.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-bold">{Contact.info.whatsapp}</span>
                  </a>
                </div>
              </div>

              <div className="group cursor-pointer">
                <p className="text-sm text-foreground/50 uppercase tracking-widest mb-1">{Contact.info.hours}</p>
                <p className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{Contact.info.hoursValue}</p>
              </div>

              <div className="group cursor-pointer">
                <p className="text-sm text-foreground/50 uppercase tracking-widest mb-1">{Contact.info.location}</p>
                <p className="text-2xl sm:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{Contact.info.locationValue}</p>
              </div>
            </div>
          </div>

          {/* Form - Clean & underlined */}
          <div className={cn("p-10 md:p-14 rounded-[2rem] border border-primary/20", isDark ? "bg-[#253218]/95" : "glass-card")}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <Input
                  required
                  placeholder={Contact.form.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-6 text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/30 transition-all font-display font-bold"
                />
                <Input
                  required
                  type="email"
                  placeholder={Contact.form.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-6 text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/30 transition-all font-display font-bold"
                />
                <Textarea
                  required
                  rows={4}
                  placeholder={Contact.form.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-6 text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/30 resize-none transition-all font-display font-bold"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-background hover:text-foreground border-2 border-foreground font-display font-black text-sm sm:text-lg md:text-xl py-6 md:py-8 rounded-xl transition-all uppercase tracking-widest"
              >
                {isSubmitting ? Contact.form.buttonSending : Contact.form.buttonSend}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
