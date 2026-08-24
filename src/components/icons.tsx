import type { ReactNode, SVGProps } from "react";

// Monochrome line icons. Stroke uses currentColor so they inherit the
// black-and-white ink. Consistent 1.5 stroke, 24 grid, round joins.
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---- Principle icons ---- */
export const IconUseful = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
  </Base>
);

export const IconHonest = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v16M6 7h12" />
    <path d="M6 7 3.5 13a2.5 2.5 0 0 0 5 0L6 7ZM18 7l-2.5 6a2.5 2.5 0 0 0 5 0L18 7Z" />
    <path d="M9 20h6" />
  </Base>
);

export const IconUnobtrusive = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 12s3.5-6 9-6 9 6 9 6" />
    <path d="M3 12s3.5 6 9 6 9-6 9-6" opacity={0.35} />
    <path d="M4 4l16 16" />
  </Base>
);

export const IconThorough = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
    <path d="M3.5 9h17M3.5 14.5h17M9 3.5v17M14.5 3.5v17" opacity={0.4} />
    <path d="M6.5 11.8l1.6 1.7 3.4-3.6" />
  </Base>
);

export const IconLongLasting = (p: IconProps) => (
  <Base {...p}>
    <path d="M7.5 12c0-2 1.3-3.5 3-3.5S17 15.5 17 15.5c1.7 0 3-1.5 3-3.5s-1.3-3.5-3-3.5S7.5 12 7.5 12c0 2-1.3 3.5-3 3.5S1.5 14 1.5 12s1.3-3.5 3-3.5" />
  </Base>
);

export const IconAsLittle = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8 12h8" />
  </Base>
);

/* ---- Work illustrations (larger, expressive line art) ---- */
export const ArtLedger = (p: IconProps) => (
  <Base {...p} viewBox="0 0 48 32">
    <rect x="1" y="4" width="30" height="20" rx="2" />
    <rect x="5" y="8" width="30" height="20" rx="2" opacity={0.5} />
    <rect x="9" y="12" width="30" height="16" rx="2" opacity={0.25} />
    <path d="M13 17h14M13 21h9" />
    <path d="M40 6v20M37 9l3-3 3 3M43 23l-3 3-3-3" />
  </Base>
);

export const ArtAtlas = (p: IconProps) => (
  <Base {...p} viewBox="0 0 48 32">
    <circle cx="24" cy="6" r="3" />
    <circle cx="8" cy="26" r="3" />
    <circle cx="24" cy="26" r="3" />
    <circle cx="40" cy="26" r="3" />
    <circle cx="16" cy="16" r="2.4" />
    <circle cx="32" cy="16" r="2.4" />
    <path d="M24 9v4M22 8l-5 6M26 8l5 6M16 18l-6 6M32 18l6 6M18 16h12M24 19v4" opacity={0.7} />
  </Base>
);

export const ArtSignal = (p: IconProps) => (
  <Base {...p} viewBox="0 0 48 32">
    <path d="M1 16h6l3-9 5 18 4-13 3 8 4-6 3 4h15" />
    <path d="M1 26h46" opacity={0.3} />
    <circle cx="14" cy="25" r="1.4" />
    <circle cx="22" cy="12" r="1.4" />
    <circle cx="33" cy="14" r="1.4" />
  </Base>
);

/* ---- Brand mark ---- */
// Rams-style monogram: an "AJ" cut from a rounded ink tile. The tile uses
// currentColor so it inherits the header ink; the letters read as the page
// ground behind them.
export const BrandMark = (p: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" aria-label="Adam Johnson" {...p}>
    <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="currentColor" />
    <g
      stroke="var(--background)"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* A */}
      <path d="M6.5 23 10.5 9l4 14" />
      <path d="M8 18.5h5" />
      {/* J */}
      <path d="M25 9v10.5a3.2 3.2 0 0 1-6.4 0" />
      <path d="M21.5 9H27" />
    </g>
  </svg>
);

/* ---- Contact / misc ---- */
export const IconArrow = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M4 7l8 6 8-6" />
  </Base>
);

export const IconLink = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1.7 1.7" />
    <path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1.7-1.7" />
  </Base>
);

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s6.5-5.5 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.5 6.5 11 6.5 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);
