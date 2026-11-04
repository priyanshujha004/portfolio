
"use client";

import { useEffect, useRef, useState } from "react";

export default function SmoothFollower() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: -100, y: -100 });
    const dot = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let animationId = 0;
        let active = true;

        const lerp = (start: number, end: number, factor: number) =>
            start + (end - start) * factor;

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current = {
                x: event.clientX,
                y: event.clientY,
            };
        };

        const handlePointerOver = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Element)) return;

            const interactive = target.closest(
                "a, button, [role='button'], input, textarea, select, img"
            );

            setIsHovering(Boolean(interactive));
        };

        const animate = () => {
            if (!active || !cursorRef.current) return;

            dot.current.x = lerp(dot.current.x, mouse.current.x, 0.2);
            dot.current.y = lerp(dot.current.y, mouse.current.y, 0.2);

            ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
            ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);

            cursorRef.current.style.setProperty("--dot-x", `${dot.current.x}px`);
            cursorRef.current.style.setProperty("--dot-y", `${dot.current.y}px`);
            cursorRef.current.style.setProperty("--ring-x", `${ring.current.x}px`);
            cursorRef.current.style.setProperty("--ring-y", `${ring.current.y}px`);

            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("pointerover", handlePointerOver);

        animationId = requestAnimationFrame(animate);

        return () => {
            active = false;
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("pointerover", handlePointerOver);
        };
    }, []);

    if (typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
            aria-hidden="true"
        >
            <div
                className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white"
                style={{
                    transform: "translate3d(var(--dot-x), var(--dot-y), 0) translate(-50%, -50%)",
                }}
            />

            <div
                className={`absolute left-0 top-0 rounded-full border border-white/80 transition-[width,height,background-color] duration-300 ease-out ${isHovering
                        ? "h-11 w-11 bg-white/10"
                        : "h-7 w-7 bg-transparent"
                    }`}
                style={{
                    transform: "translate3d(var(--ring-x), var(--ring-y), 0) translate(-50%, -50%)",
                }}
            />
        </div>
    );
}
