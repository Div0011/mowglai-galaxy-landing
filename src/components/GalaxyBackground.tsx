import { useEffect, useRef, useState } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  id: number;
}

const GalaxyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastRippleRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add ripple every 100ms during movement
      const now = Date.now();
      if (now - lastRippleRef.current > 100) {
        lastRippleRef.current = now;
        setRipples(prev => [
          ...prev.slice(-8), // Keep only last 8 ripples
          { x: e.clientX, y: e.clientY, radius: 0, opacity: 0.5, id: now }
        ]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate ripples
  useEffect(() => {
    const interval = setInterval(() => {
      setRipples(prev => 
        prev
          .map(r => ({ ...r, radius: r.radius + 3, opacity: r.opacity - 0.01 }))
          .filter(r => r.opacity > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Purple dots
    const dots: { x: number; y: number; size: number; opacity: number; pulseSpeed: number }[] = [];
    for (let i = 0; i < 300; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Dark black background
      ctx.fillStyle = "rgb(5, 3, 8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw purple dots
      dots.forEach((dot) => {
        const pulse = Math.sin(time * dot.pulseSpeed) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, dot.size * 2
        );
        gradient.addColorStop(0, `rgba(147, 51, 234, ${dot.opacity * pulse})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${dot.opacity * pulse * 0.5})`);
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ background: "rgb(5, 3, 8)" }}
      />
      {/* Water ripples */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 border-primary/30"
            style={{
              left: ripple.x - ripple.radius,
              top: ripple.y - ripple.radius,
              width: ripple.radius * 2,
              height: ripple.radius * 2,
              opacity: ripple.opacity,
              boxShadow: `0 0 20px hsl(270 80% 60% / ${ripple.opacity}), inset 0 0 20px hsl(270 80% 60% / ${ripple.opacity * 0.3})`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GalaxyBackground;