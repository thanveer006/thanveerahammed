import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiPrisma,
  SiTailwindcss,
  SiJsonwebtokens,
  SiVercel,
  SiCloudinary,
  SiWhatsapp,
  SiGit,
  SiGithub,
  SiPostman,
  SiAnthropic,
  SiFigma,
} from "@icons-pack/react-simple-icons";

const tools = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Prisma", Icon: SiPrisma },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "JWT", Icon: SiJsonwebtokens },
  { name: "Vercel", Icon: SiVercel },
  { name: "Cloudinary", Icon: SiCloudinary },
  { name: "WhatsApp Business API", Icon: SiWhatsapp },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Postman", Icon: SiPostman },
  { name: "Claude", Icon: SiAnthropic },
  { name: "Figma", Icon: SiFigma },
];

/** Monochrome logo strip: a single tone keeps it from competing with the accent. */
export function ToolsMarquee() {
  return (
    <section aria-label="Tools and technologies I use" className="border-b border-border py-10">
      <p className="mx-auto mb-7 max-w-6xl px-6 text-center font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
        Tools &amp; technologies I use
      </p>
      <p className="sr-only">{tools.map((t) => t.name).join(", ")}</p>

      <div aria-hidden className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-background to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent sm:w-40" />
        <div className="marquee-track flex w-max animate-marquee gap-x-14">
          {[...tools, ...tools].map(({ name, Icon }, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon size={20} color="currentColor" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
