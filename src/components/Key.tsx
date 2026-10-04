import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkmark, Copy, Icon } from "./icons";

// Keys are the only things on the page that look pressable, and they are.
// Square and flat. solid = the primary action; outline = the second one.
type Variant = "solid" | "outline";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-ground hover:bg-[#2e2e2e]",
  outline: "bg-ground text-ink ring-1 ring-inset ring-ink hover:bg-[#f2f2f2]",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-5 gap-3 text-base",
  sm: "h-10 px-4 gap-2 text-small",
};

const keyClass = (variant: Variant, size: Size) =>
  `inline-flex shrink-0 touch-manipulation items-center justify-center whitespace-nowrap font-medium select-none transition-colors duration-150 ${variants[variant]} ${sizes[size]}`;

const press = { y: 1 };

export function Key({
  href,
  variant = "solid",
  size = "md",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileTap={press}
      className={`${keyClass(variant, size)} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}

type CopyState = "idle" | "copied" | "failed";

const copyLabels: Record<CopyState, string> = {
  idle: "Copy address",
  copied: "Copied",
  failed: "Couldn’t copy. Select the address above",
};

export function CopyKey({ value, className = "" }: { value: string; className?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    window.clearTimeout(timer.current);
    let next: CopyState = "copied";
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      next = "failed";
    }
    setState(next);
    timer.current = window.setTimeout(() => setState("idle"), next === "failed" ? 4000 : 2200);
  };

  const glyph = state === "copied" ? Checkmark : Copy;

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={press}
      className={`${keyClass("outline", "md")} min-w-[11.5rem] ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          className="inline-flex items-center gap-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {state !== "failed" && <Icon as={glyph} size={18} />}
          {copyLabels[state]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Could not copy" : ""}
      </span>
    </motion.button>
  );
}
