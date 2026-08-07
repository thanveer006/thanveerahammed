"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Activity, GitBranch, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { SnapSection } from "@/components/motion/snap-section";

const trustItems = [
  "Production Systems Shipped",
  "Enterprise Clients",
  "Based in Kerala, India",
];

export function Hero() {
  return (
    <SnapSection id="hero" bleed className="overflow-hidden border-b border-border">
      <HeroCanvas className="pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto grid min-h-[calc(100svh-var(--nav-height))] max-w-350 grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-0">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-success" />
            Available for select engineering work
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.02 }}
            className="mb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Thanveer Ahammed N
          </motion.p>

          <Tilt3D>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-heading text-(length:--text-display) leading-[1.05] font-semibold tracking-tight text-balance"
            >
              Software Engineer building{" "}
              <span className="text-primary">production-grade software</span> for real businesses.
            </motion.h1>
          </Tilt3D>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty"
          >
            I design and develop secure, scalable web applications, enterprise
            management systems, workflow automation platforms, and AI-powered
            solutions — from architecture to deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <Link href="/#projects">
                View Projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/resume.pdf" download="Thanveer_Ahammed_Resume.pdf">
                <Download className="size-4" />
                Download Resume
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/#contact">Contact Me</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
          >
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-success" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative hidden h-105 lg:block" aria-hidden>
          <ParallaxLayer
            className="absolute left-0 top-6 w-64"
            yRange={[24, -60]}
          >
            <div className="rounded-xl border border-border bg-card/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Deployment</span>
                <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  Live
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="size-4 text-primary" />
                <span className="font-mono text-sm">main @ a1c93f2</span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-full rounded-full bg-primary" />
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            className="absolute right-2 top-40 w-60"
            yRange={[-20, 40]}
          >
            <div className="rounded-xl border border-border bg-card/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-primary" />
                Access Control
              </div>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between rounded-md bg-secondary px-2 py-1.5">
                  <span>role: admin</span>
                  <span className="text-success">allow</span>
                </div>
                <div className="flex justify-between rounded-md bg-secondary px-2 py-1.5">
                  <span>role: mentor</span>
                  <span className="text-success">allow</span>
                </div>
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer
            className="absolute bottom-4 left-10 w-56"
            yRange={[40, -30]}
          >
            <div className="rounded-xl border border-border bg-card/80 p-4 shadow-lg backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Activity className="size-4 text-primary" />
                Uptime
              </div>
              <div className="flex items-end gap-1">
                {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-sm bg-primary/70"
                    style={{ height: `${h * 0.5}px` }}
                  />
                ))}
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </SnapSection>
  );
}
