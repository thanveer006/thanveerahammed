import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  href: string;
};

const isExternal = (href: string) =>
  /^(https?:|mailto:|tel:|\/\/)/i.test(href) ||
  href.endsWith(".pdf") ||
  href.endsWith(".xml") ||
  href.endsWith(".txt");

/**
 * Drop-in replacement for `next/link` used across ported components: keeps the
 * `href` prop, routes internal paths through React Router, and renders external
 * / asset / feed URLs as a plain anchor. Forwards refs so it composes with Radix
 * `asChild` (Button, SheetClose, …).
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...rest }, ref) => {
    if (isExternal(href) || rest.target === "_blank") {
      // Any new-tab link must not leak window.opener.
      const rel =
        rest.target === "_blank" ? [rest.rel, "noopener noreferrer"].filter(Boolean).join(" ") : rest.rel;
      return (
        <a ref={ref} href={href} {...rest} rel={rel}>
          {children}
        </a>
      );
    }
    return (
      <RouterLink ref={ref} to={href} {...rest}>
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = "Link";
