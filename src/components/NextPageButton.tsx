import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NextPageButtonProps {
    label: string;
    href: string;
    tagline?: string;
}

const NextPageButton = ({ label, href, tagline }: NextPageButtonProps) => {
    return (
        <div className="w-screen ml-[calc(50%-50vw)] h-[300px] flex flex-col items-center justify-center relative overflow-hidden bg-background/5">

            {/* Tagline - Just above button */}
            {tagline && (
                <p className="relative z-10 text-xs md:text-sm font-display tracking-widest uppercase mb-6 text-muted-foreground/60" data-aos="fade-up">
                    {tagline}
                </p>
            )}

            {/* Button + Marquee Container - Linked together for alignment */}
            <div className="relative w-full flex items-center justify-center">

                {/* Marquee Trail - Absolute centered to this wrapper */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 transform pointer-events-none opacity-40 z-0">
                    <div className="relative w-full flex overflow-visible group/marquee">
                        <div className="flex animate-marquee-infinite group-hover/marquee:[animation-play-state:paused] whitespace-nowrap items-center flex-shrink-0">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="inline-flex items-center gap-4 mx-8 text-4xl sm:text-6xl md:text-8xl font-display font-black text-foreground/10 uppercase tracking-widest"
                                >
                                    <span>{label}</span>
                                    <ArrowRight className="w-12 h-12" strokeWidth={3} />
                                </div>
                            ))}
                        </div>
                        <div className="flex animate-marquee-infinite group-hover/marquee:[animation-play-state:paused] whitespace-nowrap items-center flex-shrink-0" aria-hidden="true">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="inline-flex items-center gap-4 mx-8 text-4xl sm:text-6xl md:text-8xl font-display font-black text-foreground/10 uppercase tracking-widest"
                                >
                                    <span>{label}</span>
                                    <ArrowRight className="w-12 h-12" strokeWidth={3} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Big Button - Now in Foreground */}
                <Link
                    href={href}
                    className="group relative z-10 px-6 sm:px-12 py-4 sm:py-6 rounded-full border-2 border-primary/20 bg-background/40 hover:bg-primary/20 hover:border-primary/50 transition-all duration-400 overflow-hidden backdrop-blur-xl scale-100 sm:scale-110 md:scale-125"
                >
                    <div className="flex items-center gap-3 sm:gap-4 text-xl sm:text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight uppercase leading-none">
                        <span>{label}</span>
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                            {/* Dash - Visible by default, hidden on hover */}
                            <span className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-4 font-light text-4xl sm:text-5xl leading-none">
                                -
                            </span>
                            <ArrowRight strokeWidth={1.5} className="absolute transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                    </div>
                </Link>
            </div>

            <style>{`
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-infinite {
          animation: marquee-infinite 40s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default NextPageButton;
