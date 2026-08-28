import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** Kept for parity with the old next-themes API — always equals `theme` here. */
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = "theme";
const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

/**
 * Minimal class-based theme provider (replaces next-themes). Dark is opt-in,
 * default is light, choice persists in localStorage. An inline script in
 * index.html applies the stored value before first paint to avoid a flash.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");

  React.useEffect(() => {
    const stored = (typeof localStorage !== "undefined" &&
      localStorage.getItem(STORAGE_KEY)) as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      applyTheme(stored);
    }
  }, []);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode / storage disabled — non-fatal */
    }
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme: theme, setTheme }),
    [theme, setTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    // Safe default when rendered outside a provider (e.g. during SSG probing).
    return { theme: "light", resolvedTheme: "light", setTheme: () => {} };
  }
  return ctx;
}
