import type { SVGProps } from "react";
import type { IconComponent, IconProps } from "iconoteka-react";

// Icons come from Iconoteka (iconoteka-react): square-cut, geometric line
// icons that sit well beside Switzer. One weight across the
// site (medium) so every icon reads like it was printed by the same press.
export { ArrowDown, ArrowUpRight, Checkmark, Copy } from "iconoteka-react";

export function Icon({
  as: Glyph,
  size = 18,
  ...props
}: { as: IconComponent } & IconProps) {
  return <Glyph weight="medium" size={size} aria-hidden="true" focusable="false" {...props} />;
}

/* ---- Brand mark ---- */
// "AJ" set in Switzer Medium (the page's own face, converted to outlines),
// knocked out of a square ink tile. The tile uses currentColor; the letters
// show the page ground through it.
const AJ = "M17.58 22.34L15.35 22.34L14.25 19.43L8.36 19.43L7.26 22.34L5.13 22.34L10.11 9.42L12.60 9.42L17.58 22.34ZM11.31 11.47L10.93 12.72L9.01 17.76L13.61 17.76L11.69 12.72L11.31 11.47ZM18.39 18.40L18.39 18.40L20.52 18.40Q20.73 20.80 22.63 20.80L22.63 20.80Q23.62 20.80 24.18 20.08Q24.74 19.35 24.74 18.06L24.74 18.06L24.74 9.42L26.87 9.42L26.87 17.87Q26.87 20.06 25.73 21.32Q24.59 22.58 22.63 22.58L22.63 22.58Q20.75 22.58 19.63 21.45Q18.51 20.32 18.39 18.40Z";

export const BrandMark = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" {...p}>
    <path fill="currentColor" fillRule="evenodd" d={`M0 0H32V32H0Z${AJ}`} />
  </svg>
);
