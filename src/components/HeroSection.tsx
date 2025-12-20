import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section id="home" className="relative w-full h-screen z-10 overflow-hidden flex flex-col items-center justify-center">

            {/* Background Gradient/Glow - Subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Main Content Container */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">

                {/* Pre-title */}
                <p className="text-primary font-display tracking-[0.5em] text-sm md:text-lg uppercase mb-6" data-aos="fade-down" data-aos-delay="100">
                    Est. 2024
                </p>

                {/* Massive Title Block */}
                <div className="flex flex-col items-center leading-none">
                    <h1 className="text-[12vw] md:text-[13vw] font-display font-black text-foreground tracking-tighter hover:tracking-wide transition-all duration-700 cursor-default select-none" data-aos="zoom-out" data-aos-duration="1200">
                        MOWGLAI
                    </h1>
                </div>

                {/* Subtitle / Value Prop */}
                <div className="mt-8 md:mt-12 max-w-3xl" data-aos="fade-up" data-aos-delay="300">
                    <p className="text-xl md:text-3xl text-foreground/80 font-body font-light leading-relaxed">
                        We craft <span className="text-primary font-semibold">immersive digital experiences</span> that captivate audiences and define industry standards.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div
                    className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6 opacity-0 animate-fade-in px-4"
                    style={{ animationDelay: "1s", animationFillMode: "forwards" }}
                >
                    <Link
                        to="/contact"
                        className="w-full sm:w-auto px-10 py-4 bg-primary text-background text-lg font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300 rounded-full text-center"
                    >
                        Start a Project
                    </Link>
                    <Link
                        to="/investment"
                        className="w-full sm:w-auto px-10 py-4 border border-foreground/30 text-foreground text-lg font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors duration-300 rounded-full text-center"
                    >
                        Learn More
                    </Link>
                </div>

            </div>

            {/* Bottom Indicators */}
            <div className="absolute bottom-12 left-10 hidden md:block text-xs font-display tracking-widest text-foreground/40 uppercase">
                San Francisco, CA
            </div>
            <div className="absolute bottom-12 right-10 hidden md:block text-xs font-display tracking-widest text-foreground/40 uppercase">
                Scroll to Explore
            </div>

        </section>
    );
};
export default HeroSection;
