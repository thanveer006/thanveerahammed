import * as React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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

const inPageSectionIds = navLinks
  .filter((link) => link.href.startsWith("/#"))
  .map((link) => link.href.slice(2));

export function Nav() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = useLocation().pathname;
  const activeSectionId = useActiveSection(inPageSectionIds);

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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="group mr-4 flex min-h-11 shrink-0 items-center gap-2 font-semibold tracking-tight whitespace-nowrap text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <Logo className="size-6 shrink-0 text-primary" />
          <span>Thanveer Ahammed</span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === "/" && link.href === `/#${activeSectionId}`;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative inline-flex min-h-8 items-center py-1 text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute inset-x-0 -bottom-[1px] h-px bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#contact">
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
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "block rounded-md px-3 py-3 text-base hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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
