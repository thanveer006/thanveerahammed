/**
 * One-off generator for the static social-share image (public/og.png).
 * Matches the site theme: dark "ink" band, teal/amber accents, portrait on the right.
 *
 * Run locally to regenerate:  node scripts/gen-og.mjs
 * (satori + @resvg/resvg-js are installed ad hoc; they are NOT project deps.
 * Set PUBLIC_DIR to read founder.jpg from / write og.png to another folder.)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.PUBLIC_DIR ?? join(here, "..", "public");
mkdirSync(publicDir, { recursive: true });

const regular = readFileSync("C:/Windows/Fonts/segoeui.ttf");
const bold = readFileSync("C:/Windows/Fonts/segoeuib.ttf");
const portrait = `data:image/jpeg;base64,${readFileSync(join(publicDir, "founder.jpg")).toString("base64")}`;

const INK = "#0c1513";
const TEAL = "#2dd4bf";
const AMBER = "#f5b942";
const TEXT = "#e9f1ee";

const tree = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      padding: "70px 80px",
      backgroundColor: INK,
      backgroundImage: "radial-gradient(circle at 85% 10%, rgba(45,212,191,0.22), transparent 45%)",
    },
    children: [
      {
        type: "div",
        props: {
          style: { display: "flex", flexDirection: "column", flexShrink: 1 },
          children: [
            {
              type: "div",
              props: {
                style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 28 },
                children: [
                  {
                    type: "div",
                    props: {
                      style: { width: 14, height: 14, borderRadius: 9999, backgroundColor: "#4ade80", display: "flex" },
                    },
                  },
                  {
                    type: "span",
                    props: { style: { color: "#9aa8a3", fontSize: 24 }, children: "Available for select engineering work" },
                  },
                ],
              },
            },
            {
              type: "div",
              props: { style: { display: "flex", color: AMBER, fontSize: 32, fontWeight: 700, marginBottom: 14 }, children: "Thanveer Ahammed N" },
            },
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column", color: TEXT, fontSize: 56, fontWeight: 700, lineHeight: 1.12 },
                children: [
                  { type: "div", props: { style: { display: "flex" }, children: "Software Developer" } },
                  {
                    type: "div",
                    props: {
                      style: { display: "flex" },
                      children: [
                        { type: "span", props: { style: { marginRight: 14 }, children: "building" } },
                        { type: "span", props: { style: { color: TEAL }, children: "software" } },
                      ],
                    },
                  },
                  { type: "div", props: { style: { display: "flex", color: TEAL }, children: "businesses run on." } },
                ],
              },
            },
            {
              type: "div",
              props: { style: { display: "flex", color: TEAL, fontSize: 28, marginTop: 34 }, children: "thanveerahammed.in" },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: { display: "flex", position: "absolute", left: 780, top: 145, width: 340, height: 340 },
          children: [
            {
              type: "div",
              props: {
                style: {
                  position: "absolute",
                  top: 18,
                  left: 18,
                  width: 340,
                  height: 340,
                  borderRadius: 40,
                  border: "3px solid rgba(45,212,191,0.6)",
                  display: "flex",
                },
              },
            },
            {
              type: "img",
              props: {
                src: portrait,
                width: 340,
                height: 340,
                style: { width: 340, height: 340, borderRadius: 40, objectFit: "cover" },
              },
            },
          ],
        },
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
writeFileSync(join(publicDir, "og.png"), png);
console.log(`wrote ${join(publicDir, "og.png")} (${png.length} bytes)`);
