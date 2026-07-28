"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
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
import { useCommandPalette } from "@/components/command-palette-provider";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#process", label: "Process" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const { setOpen } = useCommandPalette();
  const [menuOpen, setMenuOpen] = React.useState(false);

  // The mobile Sheet's own trigger is hidden past the `md` breakpoint, so if it's left
  // open while the viewport crosses into desktop width, it must close itself — otherwise
  // its overlay blocks the whole page with no visible way to dismiss it.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
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
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Thanveer<span className="text-primary">.</span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden items-center gap-2 text-muted-foreground sm:inline-flex"
            onClick={() => setOpen(true)}
            aria-label="Open command palette"
          >
            <Search className="size-3.5" />
            Search
            <kbd className="ml-1 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px]">
              &#8984;K
            </kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open command palette"
          >
            <Search className="size-4" />
          </Button>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#contact">Contact Me</Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-base text-foreground hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
