// @ts-nocheck
"use client";

import { useEffect, useState } from "react";



export default function Guardian3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dynamically load the model-viewer module only on the client side
    import("@google/model-viewer").then(() => {
      setMounted(true);
    }).catch(err => {
      console.error("Failed to load model-viewer", err);
      setMounted(true); // Still mount to show fallback or let script tag handle it
    });
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center z-10">
        
        {/* Glow effect behind the model */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

        {/* @ts-ignore */}
        <model-viewer
          src="/assets/lion.glb"
          alt="Mowglai 3D Guardian Asset"
          ar
          auto-rotate
          camera-controls
          shadow-intensity="1.5"
          shadow-softness="0.8"
          exposure="1.2"
          environment-image="neutral"
          style={{ width: "100%", height: "100%", "--poster-color": "transparent" } as React.CSSProperties}
        >
          <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-transparent">
            {/* Custom premium loader while model loads */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-primary font-display uppercase tracking-widest text-xs font-bold">
                Summoning Guardian...
              </p>
            </div>
          </div>
        </model-viewer>

        {/* Floating tooltip to encourage interaction */}
        <div className="absolute bottom-4 right-4 text-xs text-primary/50 font-display uppercase tracking-widest hidden lg:block pointer-events-none">
          Drag to Rotate
        </div>
      </div>
    </>
  );
}
