import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

/** Resets scroll on route change (not for in-page hash navigation). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <ScrollToTop />
        <div className="min-h-full flex flex-col bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main-content" className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Analytics />
      </TooltipProvider>
    </ThemeProvider>
  );
}
