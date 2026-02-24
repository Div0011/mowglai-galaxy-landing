"use client";

import { useState, useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";
import TextReveal from "./TextReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from "@/utils/emailSender";
import { useLanguage } from "@/context/LanguageContext";
import { cn as clsx } from "@/lib/utils";


const CONTACT_EMAIL = "info@mowglai.in";
const COUNTRY_CODE = "91";
const LOCAL_PHONE_NUMBER = "9452476331";
const FULL_PHONE_NUMBER = `${COUNTRY_CODE}${LOCAL_PHONE_NUMBER}`;


const COUNTRY_CODE_OPTIONS = [
  { value: "+1", label: "United States (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+64", label: "New Zealand (+64)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+39", label: "Italy (+39)" },
  { value: "+34", label: "Spain (+34)" },
  { value: "+31", label: "Netherlands (+31)" },
  { value: "+46", label: "Sweden (+46)" },
  { value: "+41", label: "Switzerland (+41)" },
  { value: "+52", label: "Mexico (+52)" },
  { value: "+55", label: "Brazil (+55)" },
  { value: "+91", label: "India (+91)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+82", label: "South Korea (+82)" },
  { value: "+86", label: "China (+86)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+966", label: "Saudi Arabia (+966)" },
  { value: "+65", label: "Singapore (+65)" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { Contact } = t;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneCountryCode: "",
    phoneNumber: "",
    socialMedia: "",
    preferredContactMethod: "",
  });
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
      message: formData.message,
      phone_country_code: formData.phoneCountryCode,
      phone_number: formData.phoneNumber,
      social_media: formData.socialMedia,
      preferred_contact_method: formData.preferredContactMethod,
    });

    if (result.status === 'success') {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        message: "",
        phoneCountryCode: "",
        phoneNumber: "",
        socialMedia: "",
        preferredContactMethod: "",
      });
    } else {
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone Country Code: ${formData.phoneCountryCode || "Not provided"}
Phone Number: ${formData.phoneNumber || "Not provided"}
Social Media: ${formData.socialMedia || "Not provided"}
Preferred Contact Method: ${formData.preferredContactMethod || "Not provided"}

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
    <section id="contact" ref={sectionRef} className="relative w-full py-32 z-20 overflow-hidden text-body">
      <div className="container mx-auto px-6">

        {/* Huge Header */}
        <div className="mb-24 relative">
          <h2 className="text-[13vw] sm:text-[12vw] md:text-[10vw] font-display font-black text-foreground select-none relative z-10 py-4 leading-[0.85]">
            <TextReveal text={Contact.hero.titleMain} />
            <span className="text-primary ml-0 -mr-12 md:ml-[38vw] block -mt-[1vw] md:-mt-[2vw]"><TextReveal text={Contact.hero.titleSub} delay={2} /></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info - Minimal & Large */}
          <div className="space-y-12 lg:pt-10">
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
          <div className={clsx("p-10 md:p-14 rounded-[2rem] border border-primary/20 bg-secondary/10 backdrop-blur-xl shadow-2xl")}>
            <form onSubmit={handleSubmit} className="space-y-8 font-sans">
              <div className="space-y-6">
                <Input
                  required
                  placeholder={Contact.form.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-6 text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/30 transition-all font-sans"
                />
                <Input
                  required
                  type="email"
                  placeholder={Contact.form.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-6 text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/30 transition-all font-sans"
                />
                <div className="rounded-3xl border border-primary/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.01)_100%)] px-6 py-5 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70 font-sans">
                      {Contact.form.optionalLabel}
                    </span>
                    <span className="h-px flex-1 bg-primary/15" />
                  </div>
                  <Select
                    value={formData.preferredContactMethod}
                    onValueChange={(value) => setFormData({ ...formData, preferredContactMethod: value })}
                  >
                    <SelectTrigger className="bg-secondary/20 border border-primary/15 rounded-2xl px-4 py-4 text-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-sans font-bold shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur">
                      <SelectValue placeholder={Contact.form.preferredContactPlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-background/90 border border-primary/15 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur max-h-72 overflow-y-auto">
                      <SelectItem value={Contact.form.preferredContactOptions.phoneCall} className="font-sans">{Contact.form.preferredContactOptions.phoneCall}</SelectItem>
                      <SelectItem value={Contact.form.preferredContactOptions.whatsappCall} className="font-sans">{Contact.form.preferredContactOptions.whatsappCall}</SelectItem>
                      <SelectItem value={Contact.form.preferredContactOptions.whatsappMessage} className="font-sans">{Contact.form.preferredContactOptions.whatsappMessage}</SelectItem>
                      <SelectItem value={Contact.form.preferredContactOptions.email} className="font-sans">{Contact.form.preferredContactOptions.email}</SelectItem>
                      <SelectItem value={Contact.form.preferredContactOptions.otherSocial} className="font-sans">{Contact.form.preferredContactOptions.otherSocial}</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-5">
                    <Select
                      value={formData.phoneCountryCode}
                      onValueChange={(value) => setFormData({ ...formData, phoneCountryCode: value })}
                    >
                      <SelectTrigger className="bg-secondary/20 border border-primary/15 rounded-2xl px-4 py-4 text-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-sans font-bold shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur">
                        <SelectValue placeholder={Contact.form.countryCodePlaceholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-background/90 border border-primary/15 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur max-h-72 overflow-y-auto">
                        {COUNTRY_CODE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="font-sans">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      placeholder={Contact.form.phonePlaceholder}
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-4 text-lg focus:border-primary focus:ring-0 placeholder:text-foreground/30 transition-all font-sans font-bold"
                    />
                  </div>
                  <Input
                    placeholder={Contact.form.socialPlaceholder}
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                    className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-4 text-lg focus:border-primary focus:ring-0 placeholder:text-foreground/30 transition-all font-sans font-bold"
                  />
                </div>
                <Textarea
                  required
                  rows={4}
                  placeholder={Contact.form.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-0 border-b-2 border-foreground/20 rounded-none px-0 py-6 text-xl focus:border-primary focus:ring-0 placeholder:text-foreground/30 resize-none transition-all font-sans"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-auto px-8 sm:px-10 py-6 bg-primary text-primary-foreground font-sans font-black text-sm sm:text-lg md:text-xl rounded-full transition-all uppercase tracking-widest hover:bg-primary-foreground hover:text-primary shadow-lg"
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
