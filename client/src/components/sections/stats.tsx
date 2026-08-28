import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { SnapSection } from "@/components/motion/snap-section";
import { ParallaxLayer } from "@/components/motion/parallax-layer";

type Stat = {
  label: string;
  value?: number;
  suffix?: string;
  staticValue?: string;
};

const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Production Applications" },
  { value: 6, suffix: "", label: "Major Enterprise Systems" },
  { value: 100, suffix: "%", label: "Full Stack Development" },
  { label: "Business Domains", staticValue: "Multiple" },
];

export function Stats() {
  return (
    <SnapSection className="border-b border-border">
      <div className="mx-auto max-w-350 px-6">
        <ParallaxLayer
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          yRange={[24, -24]}
        >
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <p className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                {stat.staticValue ?? (
                  <StatCounter value={stat.value!} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </ParallaxLayer>
      </div>
    </SnapSection>
  );
}
