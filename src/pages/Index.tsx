import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import NextPageButton from "@/components/NextPageButton";
import { Sparkles, Globe, Zap, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { icon: Sparkles, title: "Aesthetic" },
    { icon: Globe, title: "Global" },
    { icon: Zap, title: "Fast" },
    { icon: Layers, title: "Deep" }
  ];

  return (
    <PageLayout>
      <div className="relative w-full h-screen">
        <HeroSection />
      </div>

      {/* Extra Introductory Content */}
      <section className="relative py-16 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div data-aos="fade-right">
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                WE CREATE <span className="opacity-10">THE</span> <span className="text-primary italic">EXTRAORDINARY</span>
              </h2>
              <p className="text-xl text-muted-foreground font-body leading-relaxed mb-12">
                In a digital landscape crowded with the mundane, Mowglai Wild stands as a beacon of growth. We don't just build websites; we architect digital ecosystems that breathe life into your brand's vision.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-primary font-display font-bold text-lg mb-2 uppercase tracking-widest">Adaptation</h4>
                  <p className="text-lg text-foreground/70">Evolving with every pixel we place in the wild.</p>
                </div>
                <div>
                  <h4 className="text-primary font-display font-bold text-lg mb-2 uppercase tracking-widest">Survival</h4>
                  <p className="text-lg text-foreground/70">Resilient codebases that thrive in any environment.</p>
                </div>
              </div>
            </div>

            {/* Sequential Cards Presentation - Simplified */}
            <div className="relative h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.2, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full max-w-[300px] aspect-square flex flex-col items-center justify-center p-12 relative"
                >
                  {(() => {
                    const ItemIcon = cards[activeCard].icon;
                    return (
                      <>
                        <ItemIcon className="w-24 h-24 text-primary mb-8 animate-pulse drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]" strokeWidth={1} />
                        <span className="text-3xl md:text-5xl font-display font-black uppercase tracking-[0.2em] text-foreground text-center">
                          {cards[activeCard].title}
                        </span>
                      </>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-6xl font-display font-black mb-16 uppercase">
            Beyond <span className="opacity-10 text-foreground">The</span> Horizon
          </h3>
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <p className="text-2xl md:text-4xl font-light leading-relaxed italic text-foreground/90">
              "To the deepest jungle and beyond; we explore the uncharted territories of web design to bring back the extraordinary."
            </p>
          </div>
        </div>
      </section>

      <NextPageButton label="About Us" to="/about" />
    </PageLayout>
  );
};

export default Home;