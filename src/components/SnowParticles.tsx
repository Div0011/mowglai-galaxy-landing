import { useEffect, useRef } from "react";

interface SnowParticlesProps {
    parentRef: React.RefObject<HTMLElement>;
    targetSelector: string; // Selector for elements flakes should land on
    freezeOnCollision?: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    frozen: boolean;
    landedRectIndex: number | null; // Index of the rect it landed on
}

export const SnowParticles = ({ parentRef, targetSelector, freezeOnCollision = true }: SnowParticlesProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = parentRef.current;
        if (!canvas || !parent) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const particles: Particle[] = [];
        let animationFrameId: number;
        let targets: DOMRect[] = [];

        // resize observer to update canvas size and target positions
        const updateDimensions = () => {
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
            // Get all targets relative to the canvas/parent
            const elements = document.querySelectorAll(targetSelector);
            const parentRect = parent.getBoundingClientRect();

            targets = Array.from(elements).map(el => {
                const rect = el.getBoundingClientRect();
                return {
                    x: rect.left - parentRect.left,
                    y: rect.top - parentRect.top,
                    width: rect.width,
                    height: rect.height,
                    top: rect.top - parentRect.top,
                    left: rect.left - parentRect.left,
                    right: rect.right - parentRect.left,
                    bottom: rect.bottom - parentRect.top,
                } as DOMRect;
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        window.addEventListener("scroll", updateDimensions); // Update on scroll mainly for pinned/fixed elements if any, roughly

        // Initialize particles
        const particleCount = 500;
        const colors = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"]; // Purple shades

        const createParticle = (resetY = false): Particle => {
            const x = Math.random() * canvas.width;
            const y = resetY ? -Math.random() * 100 : Math.random() * canvas.height;
            return {
                x,
                y,
                vx: (Math.random() - 0.5) * 1, // Slight drift
                vy: Math.random() * 1 + 0.5, // Fall down
                radius: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                frozen: false,
                landedRectIndex: null
            };
        };

        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        // Animation Loop
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                if (!p.frozen) {
                    p.x += p.vx;
                    p.y += p.vy;

                    // Check collisions with targets
                    // We only check the "top" of the target for "landing"
                    if (freezeOnCollision) {
                        for (let i = 0; i < targets.length; i++) {
                            const t = targets[i];
                            // Check if particle hits the top edge of a target
                            // Allow a small margin of error for "landing"
                            if (
                                p.vy > 0 && // Moving down
                                p.y >= t.top - 2 &&
                                p.y <= t.top + 5 &&
                                p.x >= t.left &&
                                p.x <= t.right
                            ) {
                                p.frozen = true;
                                p.y = t.top; // Snap to top
                                p.landedRectIndex = i;

                                // Spawn a replacement particle at the top so the snow never stops!
                                if (particles.length < 800) {
                                    particles.push(createParticle(true));
                                }
                                break;
                            }
                        }
                    }

                    // Wrap around screen
                    if (p.y > canvas.height) {
                        Object.assign(p, createParticle(true));
                    }
                    if (p.x > canvas.width) {
                        p.x = 0;
                    } else if (p.x < 0) {
                        p.x = canvas.width;
                    }
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Interaction Listener
        const handleInteraction = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the clicked element matches or is inside a target
            if (target.closest(targetSelector)) {
                const clickedEl = target.closest(targetSelector);
                if (!clickedEl) return;

                // Find which index this corresponds to
                // We re-calculate to be safe or assuming order is stable if DOM hasn't changed.
                // Safer to check overlap with the rect again.
                const parentRect = parent.getBoundingClientRect();
                const rect = clickedEl.getBoundingClientRect();
                const relTop = rect.top - parentRect.top;
                const relLeft = rect.left - parentRect.left;

                // "Blow" particles that are frozen on this specific rect
                // We match loosely by position
                particles.forEach(p => {
                    if (p.frozen && Math.abs(p.y - relTop) < 5 && p.x >= relLeft && p.x <= (relLeft + rect.width)) {
                        p.frozen = false;
                        p.vy = -Math.random() * 5 - 2; // Explode up
                        p.vx = (Math.random() - 0.5) * 5; // Explode sideways
                    }
                });
            }
        };

        // Attach to document to catch bubbles, or specific container
        // Using simple click for now as requested "when user clicks"
        // Also adding focusin for keyboard nav users or tabbing
        document.addEventListener("click", handleInteraction);

        // Also listen for focus events to trigger the blow effect
        const handleFocus = (e: FocusEvent) => {
            // reuse interaction logic, cast event
            handleInteraction(e as unknown as MouseEvent);
        };
        document.addEventListener("focusin", handleFocus);


        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", updateDimensions);
            window.removeEventListener("scroll", updateDimensions);
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("focusin", handleFocus);
        };
    }, [targetSelector]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
        />
    );
};
