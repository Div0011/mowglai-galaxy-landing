const JungleBackground = () => {
    return (
        <div className="absolute inset-x-0 top-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
            {/* 1. Base Gradient Layer - Spans entire page height */}
            <div className="absolute inset-0 bg-gradient-to-b transition-colors duration-1000 
                /* Dark Mode: Palm Leaf -> Dark Green -> Deep Green */
                dark:from-[#799851] dark:via-[#47622A] dark:to-[#374426] 
                /* Light Mode: Off-white/Peach (#FDF3E7) -> Golden (#D4AF37) */
                from-[#FDF3E7] via-[#EBD5B3] to-[#D4AF37]"
            />

            {/* 2. Fixed Atmosphere Layer - Overlays that stay with the viewport */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Dappled light effects - Subtle pulses */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 dark:bg-green-900/10 rounded-full blur-[120px] animate-pulse will-change-[opacity]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 dark:bg-emerald-900/10 rounded-full blur-[150px] animate-bounce-slow will-change-transform" />

                {/* Subtle leaf/texture overlay */}
                <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />

                {/* Vignette for depth - Stronger in dark mode */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -30px, 0); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 15s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default JungleBackground;
