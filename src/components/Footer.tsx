import MowglaiLogo from "./MowglaiLogo";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-glass-border/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and brand */}
          <div className="flex items-center gap-4">
            <MowglaiLogo size="sm" />
            <div>
              <h3 className="font-display font-bold text-xl text-foreground">MOWGLAI</h3>
              <p className="text-sm text-muted-foreground">Crafting Digital Excellence</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-glass-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mowglai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
