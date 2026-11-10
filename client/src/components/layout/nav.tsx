import * as React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/components/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { useActiveSection } from "@/components/motion/use-active-section";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#startup", label: "Startup" },
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

/** Secondary pages, surfaced in the mobile menu so nothing is hidden on small screens. */
const moreLinks = [
  { href: "/resume", label: "Resume" },
  { href: "/uses", label: "Uses" },
  { href: "/now", label: "Now" },
];

// "hero" is observed too so the pill clears while the hero is on screen.
const inPageSectionIds = [
  "hero",
  ...navLinks.filter((link) => link.href.startsWith("/#")).map((link) => link.href.slice(2)),
];

export function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = useLocation().pathname;
  const activeSectionId = useActiveSection(inPageSectionIds);

  // Close the mobile Sheet if the viewport grows past the xl breakpoint while it's open.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setMenuOpen(false);
    };
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/#")
      ? pathname === "/" && href === `/#${activeSectionId}`
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-border bg-background/90 py-2 pr-2 pl-4 shadow-[0_8px_32px_-12px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150"
      >
        <Link
          href="/"
          className="group flex min-h-11 shrink-0 items-center gap-2.5 rounded-full font-semibold tracking-tight whitespace-nowrap text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo className="size-7 shrink-0 transition-transform duration-300 group-hover:-rotate-6" />
          <span className="hidden sm:inline">Thanveer Ahammed</span>
        </Link>

        <div className="hidden xl:flex xl:items-center xl:gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "relative inline-flex min-h-9 items-center rounded-full px-3.5 text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#contact">
              Let&apos;s talk
              <ArrowUpRight />
            </Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-0.5 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "true" : undefined}
                      className={cn(
                        "flex min-h-12 items-center justify-between rounded-xl px-3 text-lg font-medium tracking-tight hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive(link.href) ? "text-accent" : "text-foreground"
                      )}
                    >
                      {link.label}
                      {isActive(link.href) && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="mx-4 mt-2 border-t border-border pt-4">
                <p className="mb-2 px-3 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  More
                </p>
                <div className="flex flex-col gap-0.5">
                  {moreLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-11 items-center rounded-xl px-3 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
