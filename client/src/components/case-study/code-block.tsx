export function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-secondary/50 px-4 py-2 text-xs text-muted-foreground">
        {label}
      </div>
      <pre className="overflow-x-auto bg-card p-4 text-xs leading-relaxed sm:text-sm">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
