import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiPrisma,
  SiTailwindcss,
  SiJsonwebtokens,
  SiN8n,
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
  { name: "n8n", Icon: SiN8n },
  { name: "Vercel", Icon: SiVercel },
  { name: "Cloudinary", Icon: SiCloudinary },
  { name: "WhatsApp Business API", Icon: SiWhatsapp },
  { name: "Git", Icon: SiGit },
  { name: "GitHub", Icon: SiGithub },
  { name: "Postman", Icon: SiPostman },
  { name: "Claude", Icon: SiAnthropic },
  { name: "Figma", Icon: SiFigma },
];

export function ToolsMarquee() {
  return (
    <section aria-label="Tools and technologies I use" className="py-10">
      <p className="mx-auto mb-6 max-w-[1400px] px-6 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Tools &amp; Technologies I Use
      </p>

      <p className="sr-only">{tools.map((t) => t.name).join(", ")}</p>

      <div aria-hidden className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-32" />
        <div className="flex w-max animate-marquee gap-x-12 group-hover:[animation-play-state:paused]">
          {[...tools, ...tools].map(({ name, Icon }, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-muted-foreground"
            >
              <Icon size={20} color="default" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
