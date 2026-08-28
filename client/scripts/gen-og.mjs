/**
 * One-off generator for the static social-share image (public/og.png).
 * Recreates the old Next.js `app/opengraph-image.tsx` design.
 *
 * Run locally to regenerate:  node scripts/gen-og.mjs
 * (satori + @resvg/resvg-js are installed ad hoc; they are NOT project deps.)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(outDir, { recursive: true });

const regular = readFileSync("C:/Windows/Fonts/segoeui.ttf");
const bold = readFileSync("C:/Windows/Fonts/segoeuib.ttf");

const tree = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px",
      backgroundColor: "#070b14",
      backgroundImage:
        "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 45%)",
    },
    children: [
      {
        type: "div",
        props: {
          style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 32 },
          children: [
            {
              type: "div",
              props: {
                style: { width: 14, height: 14, borderRadius: 9999, backgroundColor: "#22c55e", display: "flex" },
              },
            },
            {
              type: "span",
              props: { style: { color: "#94a3b8", fontSize: 24 }, children: "Available for select engineering work" },
            },
          ],
        },
      },
      {
        type: "div",
        props: { style: { display: "flex", color: "#f3f6fb", fontSize: 32, marginBottom: 12 }, children: "Thanveer Ahammed N" },
      },
      {
        type: "div",
        props: {
          style: { display: "flex", color: "#f3f6fb", fontSize: 60, fontWeight: 700, lineHeight: 1.15, maxWidth: 950 },
          children: "Software Developer building production-grade software.",
        },
      },
      {
        type: "div",
        props: { style: { display: "flex", color: "#3b82f6", fontSize: 28, marginTop: 32 }, children: "thanveerahammed.in" },
      },
    ],
  },
};

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Segoe UI", data: regular, weight: 400, style: "normal" },
    { name: "Segoe UI", data: bold, weight: 700, style: "normal" },
  ],
});

const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
writeFileSync(join(outDir, "og.png"), png);
console.log(`wrote ${join(outDir, "og.png")} (${png.length} bytes)`);
