import type { SVGProps } from "react";

/** TA monogram: a volt tile with one cut corner and a "T/A" glyph knocked out of it. */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path d="M0 8a8 8 0 0 1 8-8h24v24a8 8 0 0 1-8 8H0V8Z" fill="currentColor" />
      <path
        d="M7 9h12v3.2h-4.4V24h-3.2V12.2H7V9Zm13.2 15 3.4-15h3.2l-3.4 15h-3.2Z"
        fill="var(--primary-foreground)"
      />
    </svg>
  );
}
