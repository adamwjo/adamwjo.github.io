import { useRef, useMemo, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  scroll: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
};

const INK = "#141414";
const STEEL = "#8a8a88";
type Pt = [number, number, number];

// Geometry helpers producing point arrays for line-art drawing.
function circle(r: number, segs = 72, z = 0): Pt[] {
  const p: Pt[] = [];
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    p.push([Math.cos(a) * r, Math.sin(a) * r, z]);
  }
  return p;
}

function roundedRect(w: number, h: number, r: number, z = 0): Pt[] {
  const x = w / 2;
  const y = h / 2;
  const p: Pt[] = [];
  const arc = (cx: number, cy: number, a0: number, a1: number) => {
    const n = 8;
    for (let i = 0; i <= n; i++) {
      const a = a0 + (a1 - a0) * (i / n);
      p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r, z]);
    }
  };
  arc(x - r, y - r, 0, Math.PI / 2);
  arc(-x + r, y - r, Math.PI / 2, Math.PI);
  arc(-x + r, -y + r, Math.PI, Math.PI * 1.5);
  arc(x - r, -y + r, Math.PI * 1.5, Math.PI * 2);
  p.push([x, y - r, z]);
  return p;
}

// Flat line-art Braun/Rams still-life — clock + grille speaker, drawn as
// strokes to match the SVG icon language. Monochrome; rotates with scroll.
export default function RamsObject({ scroll, pointer }: Props) {
  const group = useRef<THREE.Group>(null);
  const hourHand = useRef<THREE.Group>(null);
  const minHand = useRef<THREE.Group>(null);
  const secHand = useRef<THREE.Group>(null);

  const ticks = useMemo(() => {
    const arr: { a: Pt; b: Pt; major: boolean }[] = [];
    for (let i = 0; i < 12; i++) {
      const ang = (i / 12) * Math.PI * 2;
      const major = i % 3 === 0;
      const rOut = 0.98;
      const rIn = major ? 0.8 : 0.88;
      arr.push({
        a: [Math.sin(ang) * rIn, Math.cos(ang) * rIn, 0],
        b: [Math.sin(ang) * rOut, Math.cos(ang) * rOut, 0],
        major,
      });
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (group.current) {
      const s = scroll.current;
      const targetRotY = -0.1 + s * Math.PI * 1.4 + pointer.current.x * 0.35;
      const targetRotX = 0.12 - s * 0.3 + pointer.current.y * 0.22;
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotY, 4, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetRotX, 4, delta);
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.sin(s * Math.PI) * 0.12, 4, delta);
    }
    const now = new Date();
    const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes() + sec / 60;
    const hr = (now.getHours() % 12) + min / 60;
    if (secHand.current) secHand.current.rotation.z = -(sec / 60) * Math.PI * 2;
    if (minHand.current) minHand.current.rotation.z = -(min / 60) * Math.PI * 2;
    if (hourHand.current) hourHand.current.rotation.z = -(hr / 12) * Math.PI * 2;
  });

  const lw = 2.4;

  return (
    <group ref={group} scale={1.05}>
      {/* ---------------- CLOCK ---------------- */}
      <group position={[-1.7, 0.15, 0]} rotation={[0, 0.2, 0]}>
        <Line points={circle(1.15)} color={INK} lineWidth={lw} />
        <Line points={circle(1.05)} color={INK} lineWidth={lw * 0.6} />
        {ticks.map((t, i) => (
          <Line
            key={i}
            points={[t.a, t.b]}
            color={INK}
            lineWidth={t.major ? lw : lw * 0.65}
          />
        ))}
        {/* Hands */}
        <group ref={hourHand}>
          <Line points={[[0, -0.12, 0.02], [0, 0.5, 0.02]]} color={INK} lineWidth={lw * 1.4} />
        </group>
        <group ref={minHand}>
          <Line points={[[0, -0.16, 0.03], [0, 0.85, 0.03]]} color={INK} lineWidth={lw} />
        </group>
        <group ref={secHand}>
          <Line points={[[0, -0.22, 0.04], [0, 0.92, 0.04]]} color={STEEL} lineWidth={lw * 0.6} />
        </group>
        <Line points={circle(0.07, 20, 0.05)} color={INK} lineWidth={lw} />
        {/* Setting knob */}
        <Line points={[[0, 1.15, 0], [0, 1.34, 0]]} color={INK} lineWidth={lw} />
        <Line points={circle(0.12, 24, 0).map(([x, y]) => [x, y + 1.46, 0] as Pt)} color={INK} lineWidth={lw} />
      </group>

      {/* ---------------- RADIO (Braun T3 homage) ---------------- */}
      <group position={[1.75, -0.05, 0]} rotation={[0, -0.24, 0]}>
        {/* body */}
        <Line points={roundedRect(2.2, 2.7, 0.16)} color={INK} lineWidth={lw} />

        {/* circular speaker grille — concentric rings */}
        <group position={[0, 0.42, 0]}>
          {[0.18, 0.36, 0.54, 0.72, 0.88].map((r, i) => (
            <Line key={i} points={circle(r, 56)} color={INK} lineWidth={lw * 0.55} />
          ))}
          {/* dot at center */}
          <Line points={circle(0.05, 16)} color={INK} lineWidth={lw * 0.6} />
        </group>

        {/* tuning scale */}
        <group position={[0, -0.72, 0]}>
          <Line points={[[-0.85, 0, 0], [0.85, 0, 0]]} color={INK} lineWidth={lw * 0.7} />
          {Array.from({ length: 9 }, (_, i) => {
            const x = -0.85 + (i / 8) * 1.7;
            const tall = i % 2 === 0;
            return (
              <Line
                key={i}
                points={[[x, 0, 0], [x, tall ? 0.12 : 0.07, 0]]}
                color={INK}
                lineWidth={lw * 0.55}
              />
            );
          })}
          {/* tuning marker */}
          <Line
            points={[[0.25, 0.18, 0], [0.17, 0.32, 0], [0.33, 0.32, 0], [0.25, 0.18, 0]]}
            color={STEEL}
            lineWidth={lw * 0.8}
          />
        </group>

        {/* two knobs */}
        <Line points={circle(0.16, 32).map(([x, y]) => [x - 0.65, y - 1.05, 0] as Pt)} color={INK} lineWidth={lw} />
        <Line points={[[-0.65, -0.95, 0], [-0.65, -0.79, 0]]} color={INK} lineWidth={lw * 0.7} />
        <Line points={circle(0.16, 32).map(([x, y]) => [x + 0.65, y - 1.05, 0] as Pt)} color={INK} lineWidth={lw} />
        <Line points={[[0.65, -1.05, 0], [0.79, -1.05, 0]]} color={INK} lineWidth={lw * 0.7} />
      </group>
    </group>
  );
}
