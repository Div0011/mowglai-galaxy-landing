import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import MowglaiLogo from "@/components/MowglaiLogo";
import XLogo from "@/components/icons/XLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "EXPLORE",
      links: [
        { label: "START", href: "/" },
        { label: "STORY", href: "/about" },
        { label: "CRAFT", href: "/services" },
      ],
    },
    {
      title: "ENGAGE",
      links: [
        { label: "BLUEPRINT", href: "/explore" },
        { label: "INVESTMENT", href: "/investment" },
        { label: "HELLO", href: "/contact" },
      ],
    },

  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
    { icon: XLogo, href: "https://x.com/mowglai_in", label: "X" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
  ];

  return (
    <footer id="footer" className="w-full bg-[#020804] border-t border-[#22c55e]/20 relative z-10 overflow-hidden text-white/90">
      <div className="absolute inset-0 bg-gradient-to-t from-[#14532d]/20 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                <MowglaiLogo size="lg" variant="wordmark" className="h-10 w-auto" />
              </div>
            </Link>
            <p className="text-white/60 text-lg max-w-sm leading-relaxed">
              Crafting digital experiences that transcend boundaries. Global standards, local heart.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e]/70 transition-all duration-300 hover:border-[#F5D061]/50 hover:text-[#F5D061] hover:shadow-[0_0_15px_rgba(245,208,97,0.4)] hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="font-display font-bold text-lg text-white tracking-wide uppercase">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-[#22c55e]/60 hover:text-[#F5D061] transition-colors duration-300 flex items-center group w-fit drop-shadow-sm"
                      >
                        <span className="relative overflow-hidden text-sm font-medium tracking-wide">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-full h-px bg-[#F5D061] shadow-[0_0_8px_rgba(245,208,97,0.8)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column */}
            <div className="space-y-6">
              <h4 className="font-display font-bold text-lg text-white tracking-wide uppercase">Say Hello</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="mailto:info@mowglai.com" className="text-[#22c55e]/60 hover:text-[#F5D061] transition-colors flex items-center gap-2 group">
                    info@mowglai.com
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </a>
                </li>
                <li className="text-white/40">
                  Noida, India
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="text-sm text-muted-foreground/40 font-display tracking-widest uppercase">
              © {currentYear} Mowglai Galaxy. All rights reserved.
            </div>
            <div className="hidden md:block w-px h-4 bg-primary/10"></div>
            <div className="flex gap-6 text-sm text-[#22c55e]/40">
              <Link href="/privacy" className="hover:text-[#F5D061] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#F5D061] transition-colors">Terms of Service</Link>
            </div>
          </div>
          {/* Right side left empty for FABs */}
          <div className="md:w-24"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
