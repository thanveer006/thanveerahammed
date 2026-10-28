import { useState } from "react";
import { Pause, Play } from "lucide-react";
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

export function ToolsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="Tools and technologies I use" className="border-y border-border py-8">
      <p className="mx-auto mb-6 max-w-6xl px-6 text-center text-sm font-medium text-muted-foreground">
        Tools &amp; Technologies I Use
      </p>
      <div className="mx-auto mb-4 flex max-w-6xl justify-center px-6 motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
          {paused ? "Play tools animation" : "Pause tools animation"}
        </button>
      </div>

      <p className="sr-only">{tools.map((t) => t.name).join(", ")}</p>

      <div aria-hidden className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-32" />
        <div className={`marquee-track flex w-max animate-marquee gap-x-12 ${paused ? "[animation-play-state:paused]" : ""}`}>
          {[...tools, ...tools].map(({ name, Icon }, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground"
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
