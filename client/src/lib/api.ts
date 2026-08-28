/**
 * API base URL. Empty in dev (Vite proxies `/api`, `/rss.xml`, … to the server);
 * set `VITE_API_URL` to the deployed API origin for production builds.
 */
export const apiBase = import.meta.env.VITE_API_URL ?? "";

export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Request failed: ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

export const rssUrl = `${apiBase}/rss.xml`;
