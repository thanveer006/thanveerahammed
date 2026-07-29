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
    <section aria-label="Tools and technologies I use" className="border-b border-border bg-secondary/20 py-10">
      <p className="mb-6 text-center font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Tools &amp; Technologies I Use
      </p>

      <p className="sr-only">{tools.join(", ")}</p>

      <div
        aria-hidden
        className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
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
