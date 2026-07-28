"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { GitHubIcon } from "@/components/icons";

export function GitHubActivity() {
  const [failed, setFailed] = useState(false);

  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Activity"
          title="Shipping in public."
          align="center"
          className="mb-10"
        />
        <Reveal className="flex min-h-32 items-center justify-center overflow-x-auto rounded-xl border border-border bg-card p-6">
          {failed ? (
            <Link
              href="https://github.com/thanveer006"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
              View contribution history on GitHub
            </Link>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- external, unoptimizable SVG service
            <img
              src="https://ghchart.rshah.org/2563eb/thanveer006"
              alt="Thanveer Ahammed N's GitHub contribution graph"
              width={825}
              height={112}
              className="mx-auto w-full min-w-150 max-w-3xl"
              loading="lazy"
              onError={() => setFailed(true)}
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
