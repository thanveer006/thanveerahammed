import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

/**
 * Route-change scroll behaviour. With a hash, scroll to that element once it
 * exists (the target section may mount a frame or two after navigation);
 * otherwise reset to the top. In-page hash clicks on the homepage are handled
 * separately in Nav (smooth-scroll), so this only fires on real navigations.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ block: "start" });
        } else if (tries++ < 10) {
          requestAnimationFrame(tryScroll);
        }
      };
      requestAnimationFrame(tryScroll);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <ScrollManager />
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
