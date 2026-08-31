import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { EASE_OUT_EXPO } from "@/components/motion/easing";

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

/** Fades/slides each route in on navigation. Skipped (no motion) on first load
 * and under reduced motion, so it never delays first paint or fights SSG hydration. */
function PageTransition() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <Outlet />;

  // popLayout (not "wait"): the incoming route mounts immediately, in normal
  // flow, while the outgoing one is popped to absolute positioning and fades
  // out on top of it. That keeps navigation feeling instant — no blank gap
  // while the old page's exit finishes, and ScrollManager's hash-scroll can
  // find the new page's elements right away instead of racing the transition.
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
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
            <PageTransition />
          </main>
          <Footer />
        </div>
        <Analytics />
      </TooltipProvider>
    </ThemeProvider>
  );
}
