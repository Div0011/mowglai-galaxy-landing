const Footer = () => {
  return (
    <footer id="footer" className="w-full py-16 flex flex-col items-center justify-center bg-background/5 relative z-10 overflow-hidden">
      {/* Copyright - Subtle at bottom */}
      <div className="text-xs text-muted-foreground/30 font-display tracking-widest uppercase">
        © {new Date().getFullYear()} Mowglai Galaxy
      </div>
    </footer>
  );
};

export default Footer;
