import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Clock } from "./components/Clock";
import { Experience, type Role } from "./components/Experience";
import {
  ArrowDown,
  ArrowUpRight,
  BrandMark,
  Icon,
} from "./components/icons";
import { CopyKey, Key } from "./components/Key";
import { Rule } from "./components/Rule";
import { useActiveSection } from "./components/useActiveSection";
import { useNewYorkTime } from "./components/useNewYorkTime";
import { useVisible } from "./components/useVisible";

/* ------------------------------------------------------------------ */
/* Content. Edit here; the layout below only arranges it.              */
/* ------------------------------------------------------------------ */

const EMAIL = "adamwjo@gmail.com";

const LINKEDIN = {
  href: "https://www.linkedin.com/in/adam-johnson-715175163",
  handle: "in/adam-johnson-715175163",
};

const roles: Role[] = [
  {
    id: "role-product-owner",
    title: "Product Owner",
    org: "Broadway.com · New York",
    years: "2022 – Now",
    start: 2022,
    end: null,
    band: "Product Owner",
    lane: 0,
    desc: "I own the priorities for Broadway.com’s customer-facing product, including the ticketing work. Day to day, that means turning business goals and what customers actually need into a roadmap in a sensible order, then staying with it through discovery, delivery, and the numbers after launch.",
  },
  {
    id: "role-flatiron",
    title: "Senior / Lead Instructor",
    org: "Flatiron School · East Sync",
    years: "2020 – 2022",
    start: 2020,
    end: 2022,
    band: "Flatiron",
    lane: 0,
    desc: "I taught software engineering and led cohorts from start to finish. Most of the job was making hard ideas feel approachable, coaching students and fellow instructors when things got ambiguous, and keeping everyone accountable while the plan kept changing.",
  },
  {
    id: "role-qa",
    title: "QA Engineer",
    org: "Broadway.com · New York",
    years: "2019 – 2020",
    start: 2019,
    end: 2020,
    band: "QA",
    lane: 0,
    desc: "This is where I learned how software breaks. I planned and ran functional and regression testing on the customer-facing site, reproduced bugs, worked with product and engineering to pin down how things should behave, and pushed for releases that went out without drama.",
  },
  {
    id: "role-we-build-black",
    title: "Instructor · Curriculum Designer",
    org: "We Build Black",
    years: "2019 – 2022",
    start: 2019,
    end: 2022,
    band: "We Build Black",
    lane: 1,
    desc: "I taught introductory web development and wrote the lesson plans myself. The point was to give more people in the community a real, practical way into tech.",
  },
];

const principles: [string, string][] = [
  [
    "I own it end to end",
    "From framing the problem and prioritizing with real research, through holding the scope and launching, to reading the numbers afterwards. Shipping isn’t the finish line; finding out whether it worked is.",
  ],
  [
    "I speak engineering",
    "I know JavaScript and Next.js well enough to weigh a dependency, ask good questions about an estimate, and keep product goals and platform goals pointed in the same direction.",
  ],
  [
    "I keep it simple for customers",
    "If a journey is complicated, I keep cutting until a first-time customer can get through it without help. And I write decisions down with the reasoning attached, so nobody has to guess later.",
  ],
  [
    "I test before it ships",
    "I started in QA, and the habit never left. I still go looking for the edge case, the odd state, and the risky dependency before a customer runs into it.",
  ],
  [
    "I raise problems early",
    "Dependencies, scope changes, and timeline risks get raised as soon as I see them, with engineering, design, analytics, operations, and the commercial team in the same conversation.",
  ],
  [
    "I learn new domains quickly",
    "When I land in an unfamiliar problem space, I find the people who know it best, break the big problem into smaller decisions, and start making them together.",
  ],
];

// The four disciplines here and in the hero paragraph must stay in sync.
const spec: [string, string][] = [
  ["Experience", "7+ years across product and technology"],
  ["Disciplines", "Product delivery, QA engineering, web development, software education"],
  ["Broadway.com", "QA engineer from 2019, product owner since 2022"],
  ["Scope", "Discovery to post-launch, the whole PDLC"],
  ["Code", "JavaScript, Next.js"],
  ["Based in", "New York, NY"],
];

const nav = [
  { label: "Experience", id: "work" },
  { label: "How I work", id: "principles" },
  { label: "About", id: "about" },
] as const;

/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;
const wrap = "wrap";
const navIds = nav.map(({ id }) => id);

// Phones: the header scrolls away with the page; navigation and the email
// key live in the bottom deck instead. Tablet and up: a fixed header strip.
function Header() {
  const active = useActiveSection(navIds);

  return (
    <header className="absolute inset-x-0 top-0 z-40 bg-ground pt-[env(safe-area-inset-top)] not-phone:fixed">
      <div className={`${wrap} flex h-(--header-h) items-center justify-between gap-6`}>
        <a href="#top" className="flex items-center gap-3">
          <BrandMark className="h-7 w-7 text-ink" />
          <span className="font-medium">Adam Johnson</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-8 not-phone:flex">
          <ul className="flex items-center gap-7">
            {nav.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className={`relative block py-2 transition-colors duration-200 hover:text-ink ${
                    active === id ? "text-ink" : "text-ink-2"
                  }`}
                >
                  {label}
                  {active === id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-0 bottom-0 h-px bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <Key href="#contact" size="sm">
            Contact
          </Key>
        </nav>
      </div>
      <div className={wrap}>
        <div className="h-px bg-rule" />
      </div>
    </header>
  );
}

// The phone's control strip: a black bar along the bottom edge with the
// sections under the thumb and Email at the end. It rises once the hero's own
// Email key has scrolled away and steps aside when the Contact keys arrive.
function Deck() {
  const active = useActiveSection(navIds);
  const heroKeysInView = useVisible("hero-actions");
  const contactKeysInView = useVisible("contact-actions", false);
  const show = !heroKeysInView && !contactKeysInView;

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          key="deck"
          aria-label="Sections"
          className="on-panel fixed inset-x-0 bottom-0 z-50 hidden bg-panel pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] text-panel-ink phone:block"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 420, damping: 40 }}
        >
          <div className="grid h-14 grid-cols-[1fr_1fr_1fr_auto]">
            {nav.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={`relative flex touch-manipulation items-center justify-center text-small transition-colors duration-200 ${
                  active === id ? "text-panel-ink" : "text-panel-ink/60"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="deck-indicator"
                    className="absolute inset-x-3 top-0 h-[2px] bg-panel-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                {label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              className="flex touch-manipulation items-center bg-ground px-6 text-small font-medium text-ink active:bg-[#e6e6e6]"
            >
              Email
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function LocalClock({ className }: { className?: string }) {
  const time = useNewYorkTime();
  return <Clock time={time} className={className} />;
}

function LocalTime() {
  const time = useNewYorkTime();
  return (
    <span className="tabular-nums">
      {time.label} {time.zone}
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const clockY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  // Scroll-linked styles bypass MotionConfig, so parallax is opted out by hand.
  const drift = (y: typeof textY) => (reduce ? undefined : { y });

  return (
    <section id="top" ref={ref}>
      <div
        className={`${wrap} grid grid-cols-1 content-center gap-x-8 pb-20 pt-[calc(var(--header-h)+env(safe-area-inset-top)+2.75rem)] md:min-h-[100svh] md:grid-cols-12 md:pb-14 md:pt-[calc(var(--header-h)+2.5rem)]`}
      >
        <motion.div style={drift(textY)} className="md:col-span-11 xl:col-span-10">
          <motion.h1
            className="text-display font-medium [text-wrap:wrap]"
            initial={reduce ? false : { clipPath: "inset(100% -4% -25% -4%)", y: 36 }}
            animate={{ clipPath: "inset(-15% -4% -25% -4%)", y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            Product owner with an engineer’s habits.
          </motion.h1>
        </motion.div>

        <motion.div style={drift(textY)} className="mt-8 md:col-span-6 md:mt-14">
          <p className="max-w-[46ch] text-lead text-ink-soft">
            Hi, I’m Adam. I’m the product owner for Broadway.com’s customer-facing product here in
            New York, ticketing included. I got here by way of QA and teaching people to code, and
            both stuck: I write scope engineers can build from, and I look for the edge cases
            before customers find them.
          </p>
          <div
            id="hero-actions"
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-10"
          >
            <Key href={`mailto:${EMAIL}`}>
              Email me
              <Icon as={ArrowUpRight} />
            </Key>
            <a
              href="#work"
              className="group inline-flex min-h-12 items-center gap-2 underline decoration-rule underline-offset-4 transition-colors hover:decoration-ink"
            >
              See my experience
              <Icon
                as={ArrowDown}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          style={drift(clockY)}
          className="mt-12 w-full md:col-span-4 md:col-start-9 md:mt-14 md:max-w-[22rem] md:justify-self-end"
        >
          <LocalClock />
        </motion.div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-(--chrome-top)">
      <div className={`${wrap} pb-12 pt-20 md:pt-36`}>
        <div className="grid gap-x-8 gap-y-5 md:grid-cols-12 md:items-end">
          <h2 className="text-heading font-medium md:col-span-6">Experience</h2>
          <p className="max-w-[40ch] text-lead text-ink-2 md:col-span-5 md:col-start-8">
            I started out testing software, spent three years teaching people how to build it, and
            now I help decide what gets built. For a few of those years I was doing two at once.
          </p>
        </div>
        <div className="mt-10 md:mt-16">
          <Experience roles={roles} />
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="principles" className="scroll-mt-(--chrome-top)">
      <div className={`${wrap} grid gap-x-8 gap-y-10 py-20 md:grid-cols-12 md:gap-y-12 md:py-36`}>
        <div className="md:col-span-4">
          <div className="md:sticky md:top-[calc(var(--header-h)+3rem)] short:static">
            <h2 className="text-heading font-medium">How I work</h2>
            <p className="mt-5 max-w-[32ch] text-lead text-ink-2 md:mt-6">
              None of this is new or clever. These are six habits I try to keep on every
              project, especially when things get busy.
            </p>
          </div>
        </div>
        <ul className="md:col-span-8 md:col-start-5">
          {principles.map(([title, body]) => (
            <li key={title}>
              <Rule />
              <div className="grid gap-x-8 gap-y-2.5 py-7 md:py-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                <h3 className="text-[1.375rem] font-medium leading-tight tracking-[-0.015em]">
                  {title}
                </h3>
                <p className="max-w-[56ch] text-ink-soft">{body}</p>
              </div>
            </li>
          ))}
          <li aria-hidden="true">
            <Rule />
          </li>
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="on-panel scroll-mt-(--chrome-top) bg-panel text-panel-ink">
      <div className={`${wrap} py-20 md:py-36`}>
        <h2 className="max-w-[22ch] text-[clamp(1.875rem,1.2rem+2.4vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.028em]">
          I work where product, engineering, and the business overlap.
        </h2>
        <div className="mt-10 grid gap-x-8 gap-y-12 md:mt-20 lg:grid-cols-12">
          <div className="max-w-[60ch] space-y-5 text-panel-ink/75 lg:col-span-6">
            <p>
              My job is to leave the room with one plan that all three can build from. Since 2022
              I’ve guided customer-facing work at Broadway.com from the first framing of a problem
              through launch and iteration, including our ticketing systems and how they’re put
              together.
            </p>
            <p>
              QA taught me where software tends to break. Teaching at Flatiron School taught me how
              to explain technical ideas to anyone, whatever their background. And JavaScript and
              Next.js are how I keep up with the engineers I work with: enough to talk through
              dependencies and tradeoffs with them, and to know when it’s better to stay out of the
              way.
            </p>
          </div>
          {/* A rating plate: rows divided by hairlines, ruled top and bottom, no box. */}
          <dl className="border-y border-panel-ink/25 lg:col-span-5 lg:col-start-8">
            {spec.map(([term, value], i) => (
              <div
                key={term}
                className={`grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] ${
                  i ? "border-t border-panel-rule" : ""
                }`}
              >
                <dt className="text-small text-panel-ink/60">{term}</dt>
                <dd className="text-panel-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-(--chrome-top)">
      <div className={`${wrap} pb-16 pt-20 md:pb-28 md:pt-36`}>
        <h2 className="max-w-[20ch] text-heading font-medium">
          Working on something? I’d like to hear about it.
        </h2>
        <p className="mt-5 max-w-[46ch] text-lead text-ink-2 md:mt-6">
          Whether it’s a project, a product problem, or just a question, email is the best way to
          reach me. I’m on LinkedIn too.
        </p>

        <a
          href={`mailto:${EMAIL}`}
          className="mt-12 inline-block text-[clamp(2.125rem,0.9rem+5.2vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.035em] underline decoration-rule decoration-2 underline-offset-[0.16em] transition-[text-decoration-color] duration-200 [overflow-wrap:anywhere] hover:decoration-ink md:mt-20"
        >
          {EMAIL}
        </a>

        <div id="contact-actions" className="mt-8 grid gap-3 sm:flex sm:flex-wrap md:mt-10">
          <Key href={`mailto:${EMAIL}`} className="w-full sm:w-auto">
            Email me
            <Icon as={ArrowUpRight} />
          </Key>
          <CopyKey value={EMAIL} className="w-full sm:w-auto" />
        </div>

        {/* Set like the About spec sheet: hairline rows, label and value. */}
        <dl className="mt-16 border-y border-rule md:mt-28 md:max-w-[40rem]">
          <div className="grid gap-x-4 gap-y-1 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
            <dt className="meta pt-px">LinkedIn</dt>
            <dd>
              <a
                href={LINKEDIN.href}
                target="_blank"
                rel="noreferrer"
                className="-my-2.5 inline-flex min-h-11 items-center underline decoration-rule [overflow-wrap:anywhere] hover:decoration-ink"
              >
                {LINKEDIN.handle}
              </a>
            </dd>
          </div>
          <div className="grid gap-x-4 gap-y-1 border-t border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
            <dt className="meta pt-px">Based in</dt>
            <dd>New York, NY</dd>
          </div>
          <div className="grid gap-x-4 gap-y-1 border-t border-rule py-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
            <dt className="meta pt-px">Local time</dt>
            <dd>
              <LocalTime />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className={`${wrap} pb-[max(2.5rem,env(safe-area-inset-bottom))]`}>
      <p className="meta">© {new Date().getFullYear()} Adam Johnson</p>
    </footer>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Work />
        <Approach />
        <About />
        <Contact />
      </main>
      <Footer />
      <Deck />
    </MotionConfig>
  );
}
