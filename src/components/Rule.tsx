import { motion } from "motion/react";

// A hairline that draws itself across once it scrolls into view. Only the
// rule moves; the content it separates is always visible.
export function Rule({ tone = "ground" }: { tone?: "ground" | "panel" }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left ${tone === "panel" ? "bg-panel-rule" : "bg-rule"}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
