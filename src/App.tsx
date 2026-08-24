import { lazy, Suspense, useRef, type ReactNode } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "motion/react";
// three.js is ~1 MB of JS; load it after the page content has painted.
const Scene = lazy(() => import("./three/Scene"));
import {
  IconUseful,
  IconHonest,
  IconUnobtrusive,
  IconThorough,
  IconLongLasting,
  IconAsLittle,
  ArtLedger,
  ArtAtlas,
  ArtSignal,
  IconMail,
  IconLink,
  IconPin,
  BrandMark,
} from "./components/icons";

const principleIcons = [
  IconUseful,
  IconHonest,
  IconUnobtrusive,
  IconThorough,
  IconLongLasting,
  IconAsLittle,
];

const workArt = [ArtLedger, ArtAtlas, ArtSignal];

type StatusKind = "success" | "warning" | "info";

const statusColor: Record<StatusKind, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  info: "var(--info)",
};

function StatusBadge({ kind, label }: { kind: StatusKind; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: statusColor[kind] }}
      />
      {label}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </span>
  );
}

const work = [
  {
    idx: "01",
    year: "2022 — Present",
    title: "Product Owner",
    role: "Broadway.com · New York",
    desc: "Own and communicate priorities for customer-facing digital experiences, including ticketing-related initiatives — translating business objectives and user needs into a sequenced roadmap and clear delivery outcomes across the full PDLC.",
    tags: ["Roadmap", "Ticketing systems", "Next.js", "Agile"],
    status: { kind: "success" as const, label: "Current" },
  },
  {
    idx: "02",
    year: "2020 — 2022",
    title: "Senior / Lead Instructor",
    role: "Flatiron School · East Sync",
    desc: "Led technical instruction and cohort delivery, turning complex software concepts into clear, actionable guidance. Coached students and instructors through ambiguity and changing priorities in an inclusive, accountable environment.",
    tags: ["Teaching", "Mentorship", "Curriculum"],
    status: { kind: "info" as const, label: "Education" },
  },
  {
    idx: "03",
    year: "2019 — 2020",
    title: "QA Engineer",
    role: "Broadway.com · New York",
    desc: "Planned and executed functional and regression testing for customer-facing web experiences. Partnered with product and engineering to reproduce issues, clarify expected behavior, and strengthen release readiness.",
    tags: ["QA", "Regression", "Release readiness"],
    status: { kind: "info" as const, label: "Quality" },
  },
  {
    idx: "04",
    year: "2019 — 2022",
    title: "Instructor · Curriculum Designer",
    role: "We Build Black",
    desc: "Contributed to instruction and designed lesson plans for introductory web development, helping make technical learning accessible to a broader community.",
    tags: ["Curriculum", "Web dev", "Community"],
    status: { kind: "info" as const, label: "Community" },
  },
];

const principles = [
  ["End-to-end ownership", "Clear problem framing, research-informed prioritization, and disciplined scope from discovery through post-launch analysis."],
  ["Technical partnership", "JavaScript and Next.js fluency to evaluate dependencies, weigh tradeoffs, and keep product and platform goals aligned."],
  ["Customer-centered clarity", "Simplify complex user journeys and communicate product decisions with empathy, transparency, and precision."],
  ["Release quality", "A QA-grounded eye for edge cases, system behavior, and risk that holds a high bar for usability and quality."],
  ["Stakeholder alignment", "Surface dependencies and align scope with timelines across engineering, design, analytics, ops, and commercial teams."],
  ["Learn the domain fast", "Master complex landscapes quickly, break large problems into manageable decisions, and work closely with domain experts."],
];

const contact = [
  {
    icon: IconLink,
    label: "LinkedIn",
    value: "in/adam-johnson-715175163",
    href: "https://www.linkedin.com/in/adam-johnson-715175163",
  },
  { icon: IconMail, label: "Availability", value: "Open to Product roles" },
  { icon: IconPin, label: "Location", value: "New York, NY" },
];

const metrics = [
  ["7+", "years across product & tech"],
  ["4", "disciplines spanned"],
  ["2022", "owning product at Broadway.com"],
  ["PDLC", "owned end to end"],
];

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen w-full bg-background text-foreground font-sans">
      {/* Fixed 3D backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 md:left-1/2">
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>
      </div>

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-30 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <BrandMark className="h-6 w-6 text-foreground" />
            <span className="font-display text-sm font-bold tracking-tight">
              ADAM JOHNSON
            </span>
          </div>
          <nav className="hidden gap-8 md:flex">
            {[
              ["Experience", "work"],
              ["Approach", "principles"],
              ["About", "about"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground underline decoration-accent decoration-2 underline-offset-4"
          >
            New York, NY
          </a>
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-px w-full bg-border" />
        </div>
      </header>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-28"
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-2xl">
          <Reveal>
            <Label>Product Owner · Technical Product Leader</Label>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              From ambiguity
              <br />
              <span className="text-accent">to roadmaps.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              I&apos;m Adam Johnson — a product owner and technically grounded
              leader with 7+ years across product delivery, QA engineering, web
              development, and software education. I frame the problem, sequence
              the work, and make complex decisions clear to everyone in the room.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-primary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
              >
                Experience
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-foreground"
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </motion.div>
        <div className="absolute bottom-8 left-6 hidden md:block">
          <Label>Scroll to explore ↓</Label>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative z-10 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Experience
              </h2>
              <Label>2019 — Present</Label>
            </div>
          </Reveal>
          <div>
            {work.map((w, i) => {
              const Art = workArt[i % workArt.length];
              return (
                <Reveal key={w.idx} delay={i * 0.05}>
                  <article className="group grid grid-cols-1 gap-6 border-b border-border py-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10">
                    <div className="flex items-center gap-5 md:block">
                      <div className="font-mono text-sm text-muted-foreground">
                        {w.idx}
                      </div>
                      <Art className="h-12 w-auto text-foreground transition-transform duration-500 group-hover:scale-105 md:mt-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                          {w.title}
                        </h3>
                        <StatusBadge kind={w.status.kind} label={w.status.label} />
                      </div>
                      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {w.role}
                      </p>
                      <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                        {w.desc}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {w.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="font-mono text-sm text-muted-foreground md:text-right">
                      {w.year}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <Label>How I work</Label>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
              Turn ambiguity into simple, dependable products.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {principles.map(([title, body], i) => {
              const Icon = principleIcons[i];
              return (
              <Reveal key={title} delay={(i % 3) * 0.06} className="bg-card">
                <div className="flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-foreground" />
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* About / metrics */}
      <section id="about" className="relative z-10 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <Label>About</Label>
              <p className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                I sit where product, engineering, and the business meet — and I
                leave with one roadmap everyone can get behind.
              </p>
              <p className="mt-8 max-w-xl leading-relaxed text-primary-foreground/70">
                Since 2022 I&apos;ve guided customer-facing digital work at
                Broadway.com from problem framing through launch and iteration,
                including projects involving ticketing systems and their
                architecture. A QA background gave me an eye for edge cases and
                risk; teaching at Flatiron School sharpened how I make technical
                concepts clear and build alignment across diverse teams. With
                JavaScript and Next.js fluency, I can evaluate dependencies and
                keep product and platform goals moving together.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-px self-start bg-primary-foreground/15">
              {metrics.map(([n, l], i) => (
                <Reveal key={l} delay={i * 0.06} className="bg-primary">
                  <div className="p-6">
                    <div className="font-display text-4xl font-extrabold tracking-tight text-primary-foreground">
                      {n}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground/60">
                      {l}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <Label>Contact</Label>
            <h2 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              Let&apos;s build
              <br />
              <span className="text-accent">something dependable.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3">
              {contact.map(({ icon: I, label, value, href }) => (
                <div key={label} className="group">
                  <div className="flex items-center gap-2">
                    <I className="h-4 w-4 text-muted-foreground" />
                    <Label>{label}</Label>
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block font-display text-lg font-semibold tracking-tight underline-offset-4 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="mt-3 font-display text-lg font-semibold tracking-tight">
                      {value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              © 2026 Adam Johnson
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Designed in the spirit of Dieter Rams
            </span>
          </div>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}
