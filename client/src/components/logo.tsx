import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect
        x="4"
        y="18"
        width="6"
        height="10"
        rx="2"
        fill="currentColor"
        opacity="0.45"
        className="origin-bottom transition-transform duration-300 ease-out motion-safe:group-hover:scale-y-90"
      />
      <rect
        x="13"
        y="11"
        width="6"
        height="17"
        rx="2"
        fill="currentColor"
        opacity="0.75"
        className="origin-bottom transition-transform duration-300 ease-out motion-safe:group-hover:scale-y-110"
      />
      <rect
        x="22"
        y="4"
        width="6"
        height="24"
        rx="2"
        fill="currentColor"
        className="origin-bottom transition-transform delay-75 duration-300 ease-out motion-safe:group-hover:scale-y-125"
      />
    </svg>
  );
}
