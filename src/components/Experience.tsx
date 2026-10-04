import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Rule } from "./Rule";

// Experience as a radio tuning dial (after the Braun T 1000 / RT 20 scales).
// The scale runs in years; each role is a band; the needle glides to the
// role you are reading. Two lanes because the record genuinely overlaps:
// the main line (QA → teaching → product) and the community teaching beside it.

export type Role = {
  id: string;
  title: string;
  org: string;
  years: string;
  start: number;
  /** null = current */
  end: number | null;
  /** Short name printed on the dial band. */
  band: string;
  lane: 0 | 1;
  desc: string;
};

const today = new Date();
const NOW = today.getFullYear() + today.getMonth() / 12;
const FIRST = 2019;
const LAST = today.getFullYear() + 1;
const SPAN = LAST - FIRST;
const YEARS = Array.from({ length: SPAN }, (_, i) => FIRST + i);
const TICKS = Array.from({ length: SPAN * 4 + 1 }, (_, i) => i);

const at = (year: number) => `${((year - FIRST) / SPAN) * 100}%`;
const endOf = (r: Role) => r.end ?? NOW;
const GLIDE = { type: "spring", stiffness: 70, damping: 17, mass: 1 } as const;

function Dial({ roles, active }: { roles: Role[]; active: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const tuned = roles[active];
  const needle = seen ? (tuned.start + endOf(tuned)) / 2 : FIRST;

  return (
    <div className="sticky top-(--chrome-top) z-20 bg-ground pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:-z-10 after:h-12 after:bg-linear-to-b after:from-ground after:from-55% after:to-transparent after:content-[''] short:static short:after:hidden sm:pb-4 sm:pt-4">
      <div
        ref={ref}
        className="on-panel bg-panel px-5 pb-4 pt-4 text-panel-ink sm:px-8 sm:pb-5 sm:pt-5"
      >
        <div className="relative">
          {/* Year legend, centred in each year's span like a printed scale */}
          <div className="relative h-5" aria-hidden="true">
            {YEARS.map((y) => (
              <span
                key={y}
                className="absolute top-0 -translate-x-1/2 text-legend tabular-nums text-panel-ink/65"
                style={{ left: at(y + 0.5) }}
              >
                <span className="sm:hidden">’{String(y).slice(2)}</span>
                <span className="hidden sm:inline">{y}</span>
              </span>
            ))}
          </div>

          {/* Graduations: years long, quarters short, a heavier tick at today */}
          <div className="relative mt-1.5 h-3 border-b border-panel-mute/70" aria-hidden="true">
            {TICKS.map((i) => (
              <span
                key={i}
                className={`absolute bottom-0 w-px -translate-x-1/2 ${
                  i % 4 === 0 ? "h-3 bg-panel-ink/70" : "h-1.5 bg-panel-mute/70"
                }`}
                style={{ left: at(FIRST + i / 4) }}
              />
            ))}
            <span
              className="absolute bottom-0 h-4 w-[2px] -translate-x-1/2 bg-panel-ink"
              style={{ left: at(NOW) }}
            />
          </div>

          {/* Bands */}
          <nav aria-label="Roles on the timeline" className="mt-3 space-y-4">
            {[0, 1].map((lane) => (
              <div key={lane} className="relative h-8">
                {roles.map((r, i) =>
                  r.lane !== lane ? null : (
                    <a
                      key={r.id}
                      href={`#${r.id}`}
                      aria-current={i === active ? "true" : undefined}
                      className="group absolute inset-y-0 flex flex-col justify-between before:absolute before:-inset-y-1.5 before:inset-x-0 before:content-['']"
                      style={{
                        left: `calc(${at(r.start)} + 2px)`,
                        width: `calc(${at(endOf(r) - r.start + FIRST)} - 4px)`,
                      }}
                    >
                      {/* Printed on a panel-coloured knockout so the needle passes behind the text */}
                      <span
                        className={`relative z-20 max-w-full self-start truncate bg-panel pr-1.5 text-legend transition-colors duration-300 sm:text-small ${
                          i === active
                            ? "text-panel-ink"
                            : "text-panel-ink/55 group-hover:text-panel-ink/85"
                        }`}
                      >
                        {r.band}
                      </span>
                      <span
                        className={`block transition-[height,background-color] duration-300 ${
                          i === active
                            ? "h-[3px] bg-panel-ink"
                            : "h-[2px] bg-panel-mute/60 group-hover:bg-panel-mute"
                        }`}
                      />
                    </a>
                  ),
                )}
              </div>
            ))}
          </nav>

          {/* Needle */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-1 top-[1.625rem] z-10 w-0"
            initial={false}
            animate={{ left: at(needle) }}
            transition={GLIDE}
          >
            <span className="absolute -left-[5px] -top-[7px] h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-panel-ink" />
            <span className="absolute inset-y-0 -left-px w-[2px] bg-panel-ink" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Entry({ role, onRead }: { role: Role; onRead: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  // The reading line sits just below the sticky dial.
  const reading = useInView(ref, { margin: "-38% 0px -52% 0px" });

  useEffect(() => {
    if (reading) onRead();
  }, [reading, onRead]);

  return (
    <li id={role.id} ref={ref} className="scroll-mt-[10.5rem] short:scroll-mt-4 md:scroll-mt-[14rem]">
      <Rule />
      <article className="grid gap-x-8 gap-y-4 py-12 md:grid-cols-12 md:py-16">
        <p className="meta tabular-nums md:col-span-3 md:pt-2">{role.years}</p>
        <div className="md:col-span-9">
          <h3 className="text-title font-medium">{role.title}</h3>
          <p className="meta mt-2">{role.org}</p>
          <p className="mt-6 max-w-[62ch] text-ink-soft">{role.desc}</p>
        </div>
      </article>
    </li>
  );
}

export function Experience({ roles }: { roles: Role[] }) {
  const [active, setActive] = useState(0);
  const setters = useRef(roles.map((_, i) => () => setActive(i)));

  return (
    <>
      <Dial roles={roles} active={active} />
      <ol className="mt-12">
        {roles.map((r, i) => (
          <Entry key={r.id} role={r} onRead={setters.current[i]} />
        ))}
      </ol>
    </>
  );
}
