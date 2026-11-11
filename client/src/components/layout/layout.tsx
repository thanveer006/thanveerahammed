import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/scroll-progress";
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
  const prevPathname = useRef<string | null>(null);
  useEffect(() => {
    // Animate only same-page hash jumps; a cross-route hash lands instantly so it
    // can't start mid-animation while the new page is still mounting.
    const samePage = prevPathname.current === pathname;
    prevPathname.current = pathname;
    const smooth =
      samePage &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hash) {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // Malformed escape in a hand-typed URL: fall back to the raw fragment.
      }
      let tries = 0;
      let frame = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            block: "start",
            behavior: smooth ? "smooth" : "auto",
          });
        } else if (tries++ < 10) {
          frame = requestAnimationFrame(tryScroll);
        }
      };
      frame = requestAnimationFrame(tryScroll);
      // A newer navigation must not be yanked back to this one's target.
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
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
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export function Layout() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <ScrollManager />
        <div className="min-h-dvh flex flex-col bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Nav />
          <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
            <PageTransition />
          </main>
          <Footer />
        </div>
        <Analytics />
      </MotionConfig>
    </ThemeProvider>
  );
}
