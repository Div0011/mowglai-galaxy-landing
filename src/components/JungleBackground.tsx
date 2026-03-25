"use client";

const JungleBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full -z-[100] overflow-hidden pointer-events-none">

            {/* 1. Base Gradient Layer - Spans entire page height (Unified, no mask) */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-b transition-colors duration-1000 
                /* Dark Mode: Palm Leaf -> Dark Green -> Deep Green */
                dark:from-[#799851] dark:via-[#47622A] dark:to-[#374426] 
                /* Light Mode: Off-white/Peach (#FDF3E7) -> Golden (#D4AF37) */
                from-[#FDF3E7] via-[#EBD5B3] to-[#D4AF37]"
            />

            {/* 2. Fixed Atmosphere Layer - Overlays that stay with the viewport */}
            <div className="fixed inset-0 w-full h-full pointer-events-none">
                {/* Global Noise Overlay for texture consistency */}
                <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />

                {/* Dappled light effects - Subtle pulses */}
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-white/5 dark:bg-green-900/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-[#D4AF37]/5 dark:bg-emerald-900/5 rounded-full blur-[150px] animate-bounce-slow" />

                {/* Vignette for depth - Stronger in dark mode */}
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
            </div>

            {/* 3. Floating Yellow Fireflies */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute w-2 h-2 rounded-full bg-[#E6B93D] blur-[1px] animate-firefly-1" />
                <div className="absolute w-3 h-3 rounded-full bg-[#F5D061] blur-[2px] animate-firefly-2" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-[#FFFFFF] blur-[1px] animate-firefly-3" />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#E6B93D] blur-[2px] animate-firefly-4" />
                <div className="absolute w-2 h-2 rounded-full bg-[#F5D061] blur-[1px] animate-firefly-5" />
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -30px, 0); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 15s ease-in-out infinite;
                }
                
                @keyframes fly-1 {
                    0% { top: 10%; left: -10%; transform: scale(1); opacity: 0; }
                    20% { opacity: 0.8; }
                    80% { opacity: 0.6; }
                    100% { top: 40%; left: 110%; transform: scale(1.5); opacity: 0; }
                }
                @keyframes fly-2 {
                    0% { top: 80%; left: 110%; transform: scale(1.2); opacity: 0; }
                    20% { opacity: 0.5; }
                    80% { opacity: 0.9; }
                    100% { top: 20%; left: -10%; transform: scale(0.8); opacity: 0; }
                }
                @keyframes fly-3 {
                    0% { top: -10%; left: 30%; transform: scale(0.8); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 0.3; }
                    100% { top: 110%; left: 70%; transform: scale(1.2); opacity: 0; }
                }
                @keyframes fly-4 {
                    0% { top: 110%; left: 60%; transform: scale(1.5); opacity: 0; }
                    20% { opacity: 0.7; }
                    80% { opacity: 0.4; }
                    100% { top: -10%; left: 20%; transform: scale(1); opacity: 0; }
                }
                @keyframes fly-5 {
                    0% { top: 50%; left: -10%; transform: scale(1); opacity: 0; }
                    20% { opacity: 0.6; }
                    80% { opacity: 0.9; }
                    100% { top: 80%; left: 110%; transform: scale(1.3); opacity: 0; }
                }

                .animate-firefly-1 { animation: fly-1 18s ease-in-out infinite; }
                .animate-firefly-2 { animation: fly-2 24s ease-in-out infinite 2s; }
                .animate-firefly-3 { animation: fly-3 20s ease-in-out infinite 5s; }
                .animate-firefly-4 { animation: fly-4 28s ease-in-out infinite 1s; }
                .animate-firefly-5 { animation: fly-5 22s ease-in-out infinite 7s; }
            `}</style>
        </div>
    );
};

export default JungleBackground;
