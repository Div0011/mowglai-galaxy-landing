"use client";

const JungleBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-dvh -z-[100] overflow-hidden pointer-events-none">

            {/* 1. Base Gradient Layer - Spans entire page height (Unified, no mask) */}
            <div className="fixed inset-0 w-full h-dvh bg-gradient-to-b transition-colors duration-1000 
                /* Dark Mode: Palm Leaf -> Dark Green -> Deep Green */
                dark:from-[#799851] dark:via-[#47622A] dark:to-[#374426] 
                /* Light Mode: Off-white/Peach (#FDF3E7) -> Golden (#D4AF37) */
                from-[#FDF3E7] via-[#EBD5B3] to-[#D4AF37]"
            />

            {/* 2. Fixed Atmosphere Layer - Overlays that stay with the viewport */}
            <div className="fixed inset-0 w-full h-full pointer-events-none">
                {/* Global Noise Overlay for texture consistency */}
                <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />

                {/* Dappled light effects - Mobile optimized GPU pulses */}
                <div className="absolute top-0 left-1/4 w-[320px] sm:w-[500px] md:w-[800px] h-[320px] sm:h-[500px] md:h-[800px] bg-white/5 dark:bg-green-900/10 rounded-full blur-2xl md:blur-[120px] animate-pulse transform-gpu" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[450px] md:w-[700px] h-[300px] sm:h-[450px] md:h-[700px] bg-[#D4AF37]/5 dark:bg-emerald-900/5 rounded-full blur-3xl md:blur-[150px] animate-bounce-slow transform-gpu" />

                {/* Vignette for depth - Stronger in dark mode */}
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
            </div>

            {/* 3. Floating Yellow Fireflies - GPU hardware compositor driven */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#E6B93D] blur-[1px] animate-firefly-1 will-change-transform" />
                <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#F5D061] blur-[2px] animate-firefly-2 will-change-transform" />
                <div className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#FFFFFF] blur-[1px] animate-firefly-3 will-change-transform" />
                <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#E6B93D] blur-[2px] animate-firefly-4 will-change-transform" />
                <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#F5D061] blur-[1px] animate-firefly-5 will-change-transform" />
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
                    0% { transform: translate3d(-10vw, 15vh, 0) scale(0.8); opacity: 0; }
                    20% { opacity: 0.8; }
                    80% { opacity: 0.6; }
                    100% { transform: translate3d(110vw, 45vh, 0) scale(1.4); opacity: 0; }
                }
                @keyframes fly-2 {
                    0% { transform: translate3d(110vw, 80vh, 0) scale(1.2); opacity: 0; }
                    20% { opacity: 0.5; }
                    80% { opacity: 0.9; }
                    100% { transform: translate3d(-10vw, 20vh, 0) scale(0.8); opacity: 0; }
                }
                @keyframes fly-3 {
                    0% { transform: translate3d(30vw, -10vh, 0) scale(0.8); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 0.3; }
                    100% { transform: translate3d(70vw, 110vh, 0) scale(1.2); opacity: 0; }
                }
                @keyframes fly-4 {
                    0% { transform: translate3d(60vw, 110vh, 0) scale(1.3); opacity: 0; }
                    20% { opacity: 0.7; }
                    80% { opacity: 0.4; }
                    100% { transform: translate3d(20vw, -10vh, 0) scale(0.9); opacity: 0; }
                }
                @keyframes fly-5 {
                    0% { transform: translate3d(-10vw, 55vh, 0) scale(1); opacity: 0; }
                    20% { opacity: 0.6; }
                    80% { opacity: 0.9; }
                    100% { transform: translate3d(110vw, 85vh, 0) scale(1.3); opacity: 0; }
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
