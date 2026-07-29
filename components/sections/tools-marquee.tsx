const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Prisma",
  "Tailwind CSS",
  "JWT",
  "n8n",
  "Vercel",
  "Cloudinary",
  "WhatsApp Business API",
  "HDFC SmartGateway",
  "Git & GitHub",
  "VS Code",
  "Postman",
  "Claude",
  "ChatGPT",
  "Figma",
  "Adobe Photoshop",
  "Adobe Illustrator",
];

export function ToolsMarquee() {
  return (
    <section aria-label="Tools and technologies I use" className="py-10">
      <p className="mx-auto mb-6 max-w-[1400px] px-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Tools &amp; Technologies I Use
      </p>

      <p className="sr-only">{tools.join(", ")}</p>

      <div aria-hidden className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-32" />
        <div className="flex w-max animate-marquee gap-x-12 group-hover:[animation-play-state:paused]">
          {[...tools, ...tools].map((tool, i) => (
            <span key={i} className="whitespace-nowrap font-mono text-sm text-muted-foreground">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
