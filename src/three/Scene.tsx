import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import RamsObject from "./RamsObject";

// Fixed full-viewport canvas that sits behind the content and reacts to
// page scroll + pointer. Deliberately quiet — motion as function, not decoration.
export default function Scene() {
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    const onPointer = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    onScroll();
    // Respect the OS reduced-motion preference: keep the still-life, drop the parallax.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <RamsObject scroll={scroll} pointer={pointer} />
    </Canvas>
  );
}
