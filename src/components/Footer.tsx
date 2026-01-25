import Link from "next/link";
import { Instagram, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import MowglaiLogo from "@/components/MowglaiLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "EXPLORE",
      links: [
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> refactor/nav-and-content-updates
        { label: "START", href: "/" },
        { label: "CRAFT", href: "/services" },
        { label: "VALUE", href: "/investment" },
        { label: "BLUEPRINT", href: "/explore" },
<<<<<<< HEAD
=======
=======
        { label: "HOME", href: "/" },
        { label: "EXPERTISE", href: "/services" },
        { label: "INVESTMENT", href: "/investment" },
        { label: "WORK", href: "/explore" },
>>>>>>> main
>>>>>>> refactor/nav-and-content-updates
      ],
    },
    {
      title: "AGENCY",
      links: [
<<<<<<< HEAD
        { label: "STORY", href: "/about" },
        { label: "OUR DNA", href: "/our-dna" },
        { label: "HELLO", href: "/contact" },
=======
<<<<<<< HEAD
        { label: "STORY", href: "/about" },
        { label: "OUR DNA", href: "/our-dna" },
        { label: "HELLO", href: "/contact" },
=======
        { label: "STUDIO", href: "/about" },
        { label: "OUR DNA", href: "/our-dna" },
        { label: "CONNECT", href: "/contact" },
>>>>>>> main
>>>>>>> refactor/nav-and-content-updates
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/mowglai.in", label: "Instagram" },
    { icon: Twitter, href: "https://x.com/Mowglai11", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mowglai-in-47b3103a6/", label: "LinkedIn" },
  ];

  return (
    <footer id="footer" className="w-full bg-background border-t border-primary/10 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                <MowglaiLogo size="sm" />
                <span className="font-display font-black text-2xl tracking-tight text-foreground">MOWGLAI</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
              Crafting digital experiences that transcend boundaries. Global standards, local heart.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 hover:bg-primary hover:text-background hover:scale-110"
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
                <h4 className="font-display font-bold text-lg text-foreground tracking-wide uppercase">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group w-fit"
                      >
                        <span className="relative overflow-hidden">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-full h-px bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column */}
            <div className="space-y-6">
              <h4 className="font-display font-bold text-lg text-foreground tracking-wide uppercase">Say Hello</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:info@mowglai.in" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    info@mowglai.in
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </a>
                </li>
                <li className="text-muted-foreground">
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
            <div className="flex gap-6 text-sm text-muted-foreground/40">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
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
