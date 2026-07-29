"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  Briefcase,
  FolderKanban,
  Wrench,
  Lightbulb,
  Mail,
  FileText,
  Sun,
  Moon,
  Download,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { projects } from "@/lib/data/projects";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import type { PostMeta } from "@/lib/blog";

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

const sections = [
  { label: "About", href: "/#about", icon: User },
  { label: "Experience", href: "/#experience", icon: Briefcase },
  { label: "Projects", href: "/#projects", icon: FolderKanban },
  { label: "Skills", href: "/#skills", icon: Wrench },
  { label: "Philosophy", href: "/#philosophy", icon: Lightbulb },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Contact", href: "/#contact", icon: Mail },
];

export function CommandPaletteProvider({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: PostMeta[];
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.key === "/" && (e.target as HTMLElement)?.tagName?.match(/INPUT|TEXTAREA/)) return;
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      // Next's router doesn't reliably re-scroll to a hash when already on the target
      // path (e.g. selecting "About" while on "/"), so handle same-page anchors manually.
      if (href.startsWith("/#") && pathname === "/") {
        const id = href.slice(2);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      router.push(href);
    },
    [router, pathname]
  );

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, projects, and writing..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigate">
            {sections.map((s) => (
              <CommandItem key={s.href} onSelect={() => go(s.href)} value={s.label}>
                <s.icon />
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <CommandItem
                key={p.slug}
                onSelect={() => go(`/projects/${p.slug}`)}
                value={`${p.name} ${p.category}`}
              >
                <FolderKanban />
                {p.name}
              </CommandItem>
            ))}
          </CommandGroup>

          {posts.length > 0 && (
            <CommandGroup heading="Writing">
              {posts.map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() => go(`/blog/${post.slug}`)}
                  value={post.title}
                >
                  <FileText />
                  {post.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
              }}
              value="toggle theme dark light"
            >
              {resolvedTheme === "dark" ? <Sun /> : <Moon />}
              Toggle theme
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                const a = document.createElement("a");
                a.href = "/resume.pdf";
                a.download = "Thanveer_Ahammed_Resume.pdf";
                a.click();
              }}
              value="download resume"
            >
              <Download />
              Download Resume
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.open("https://github.com/thanveer006", "_blank", "noopener,noreferrer");
              }}
              value="github"
            >
              <GitHubIcon className="size-4" />
              Open GitHub
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                window.open(
                  "https://www.linkedin.com/in/thanveer-ahammed-dev",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              value="linkedin"
            >
              <LinkedInIcon className="size-4" />
              Open LinkedIn
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}
