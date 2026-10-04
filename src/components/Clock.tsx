import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import type { NewYorkTime } from "./useNewYorkTime";

// After the Braun AB 1 / Dietrich Lubs travel clocks: a rounded black housing
// (the only rounded object on the page), a recessed white dial, bar indices,
// black hands. It tells real New York time, so it earns its place on the page.

const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const POWER_ON = { duration: 1.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] } as const;
const QUARTZ_TICK = { type: "spring", stiffness: 560, damping: 24, mass: 0.5 } as const;

// Keep angles continuous so 59s -> 0s steps forward instead of unwinding.
function forward(current: number, target: number) {
  return current + ((((target - current) % 360) + 360) % 360);
}

function Hand({
  angle,
  length,
  tail,
  width,
  className,
}: {
  angle: MotionValue<number>;
  length: number;
  tail: number;
  width: string;
  className: string;
}) {
  return (
    <motion.div className="absolute inset-0" style={{ rotate: angle }}>
      <span
        className={`absolute left-1/2 -translate-x-1/2 rounded-[1px] ${className}`}
        style={{ width, height: `${length + tail}%`, bottom: `${50 - tail}%` }}
      />
    </motion.div>
  );
}

export function Clock({ time, className = "" }: { time: NewYorkTime; className?: string }) {
  const reduce = useReducedMotion();
  const hour = useMotionValue(0);
  const minute = useMotionValue(0);
  const second = useMotionValue(0);
  const settlesAt = useRef<number | null>(null);

  useEffect(() => {
    const s = time.seconds;
    const m = time.minutes + s / 60;
    const h = (time.hours % 12) + m / 60;

    // First reading: sweep all three hands up from twelve, like setting a clock.
    if (settlesAt.current === null) {
      settlesAt.current = performance.now() + (POWER_ON.delay + POWER_ON.duration) * 1000;
      if (reduce) {
        hour.set(h * 30);
        minute.set(m * 6);
        second.set(s * 6);
        return;
      }
      animate(hour, h * 30, POWER_ON);
      animate(minute, m * 6, POWER_ON);
      animate(second, s * 6, POWER_ON);
      return;
    }
    if (performance.now() < settlesAt.current) return;

    hour.set(forward(hour.get(), h * 30));
    minute.set(forward(minute.get(), m * 6));
    const next = forward(second.get(), s * 6);
    // A big jump means the tab was asleep; snap rather than spin.
    if (reduce || next - second.get() > 30) second.set(next);
    else animate(second, next, QUARTZ_TICK);
  }, [time, reduce, hour, minute, second]);

  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={`Clock showing ${time.label} in New York`}
        className="relative aspect-square w-52 rounded-[13%] bg-panel p-[8%] sm:w-60 md:w-full"
      >
        <div className="relative h-full w-full rounded-full bg-ground">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {MINUTES.map((i) => {
              const isHour = i % 5 === 0;
              return (
                <line
                  key={i}
                  x1="50"
                  x2="50"
                  y1="5.5"
                  y2={isHour ? 16 : 9}
                  stroke="var(--ink)"
                  strokeWidth={isHour ? 2.4 : 0.6}
                  transform={`rotate(${i * 6} 50 50)`}
                />
              );
            })}
          </svg>
          <Hand angle={hour} length={27} tail={6} width="3.4%" className="bg-ink" />
          <Hand angle={minute} length={40} tail={8} width="2.4%" className="bg-ink" />
          <Hand angle={second} length={41} tail={14} width="max(1px, 0.6%)" className="bg-ink" />
          <span className="absolute left-1/2 top-1/2 h-[4.5%] w-[4.5%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
        </div>
      </div>
      <figcaption className="mt-5 text-ink-2">
        <span className="tabular-nums text-ink">{time.label}</span> {time.zone} in New York
      </figcaption>
    </figure>
  );
}
