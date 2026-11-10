export function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-ink text-ink-foreground">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 font-mono text-xs text-ink-foreground/60">
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2">{label}</span>
      </div>
      <pre className="overflow-x-auto p-5 text-xs leading-relaxed sm:text-sm" tabIndex={0}>
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
