"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface MagneticProps {
    children: React.ReactElement;
    amount?: number; // How strong the magnetic pull is (0.1 to 1)
    className?: string;
}

const Magnetic = ({ children, amount = 0.3, className = "" }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const mousePosRef = useRef({ x: 0, y: 0 });
    const isHoveringRef = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        // Animation loop for smooth 60fps updates
        const animate = () => {
            if (isHoveringRef.current) {
                const { x, y } = mousePosRef.current;
                xTo(x * amount);
                yTo(y * amount);
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            mousePosRef.current = {
                x: clientX - (left + width / 2),
                y: clientY - (top + height / 2)
            };
        };

        const handleMouseEnter = () => {
            isHoveringRef.current = true;
        };

        const handleMouseLeave = () => {
            isHoveringRef.current = false;
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", handleMouseMove, { passive: true });
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [amount]);

    return (
        <div ref={ref} className={`inline-block ${className}`}>
            {children}
        </div>
    );
};

export default Magnetic;
