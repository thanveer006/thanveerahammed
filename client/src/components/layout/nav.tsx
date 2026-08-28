import * as React from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
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
import { useSnapWouldBeActive } from "@/components/motion/use-reduced-motion";
import { useActiveSection } from "@/components/motion/use-active-section";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

const inPageSectionIds = navLinks
  .filter((link) => link.href.startsWith("/#"))
  .map((link) => link.href.slice(2));

export function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = useLocation().pathname;
  // Shares SnapContainer's exact activation predicate so the two can't drift.
  const snapWouldBeActive = useSnapWouldBeActive();
  const snapLikelyActive = pathname === "/" && snapWouldBeActive;
  const activeSectionId = useActiveSection(inPageSectionIds);

  const handleInPageLink = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!snapLikelyActive || !href.startsWith("/#")) return;
    const id = href.slice(2);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    window.history.pushState(null, "", href);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Close the mobile Sheet if the viewport grows past the lg breakpoint while it's open.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setMenuOpen(false);
    };
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-350 items-center justify-between px-6"
      >
        <Link
          href="/"
          className="mr-4 flex shrink-0 items-center gap-2 font-semibold tracking-tight whitespace-nowrap text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <Logo className="size-6 shrink-0 text-primary" />
          <span className="hidden xl:inline">Thanveer Ahammed N</span>
          <span className="xl:hidden">Thanveer</span>
          <span className="text-primary">.</span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === "/" && link.href === `/#${activeSectionId}`;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleInPageLink(link.href)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#contact" onClick={handleInPageLink("/#contact")}>
              Contact Me
            </Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => {
                  const isActive = pathname === "/" && link.href === `/#${activeSectionId}`;
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        onClick={handleInPageLink(link.href)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "rounded-md px-3 py-2.5 text-base hover:bg-secondary",
                          isActive ? "text-primary font-medium" : "text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
