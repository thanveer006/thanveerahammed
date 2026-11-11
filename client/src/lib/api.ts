/**
 * API base URL. Empty in dev (Vite proxies `/api`, `/rss.xml`, … to the server);
 * set `VITE_API_URL` to the deployed API origin for production builds.
 */
export const apiBase = import.meta.env.VITE_API_URL ?? "";

/** The API runs on a free tier that can cold-start; bound every wait. */
const REQUEST_TIMEOUT_MS = 30_000;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(path: string, signal?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  else signal?.addEventListener("abort", onAbort, { once: true });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${apiBase}${path}`, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) throw new ApiError(`Request failed: ${path} → ${res.status}`, res.status);
    return (await res.json()) as T;
  } catch (err) {
    if (timedOut) throw new ApiError(`Request timed out: ${path}`);
    throw err;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}

/**
 * Site-relative on purpose: production serves a static copy generated at build
 * time by scripts/snapshot-content.mjs (no cold-start wait on the API), and the
 * Vite dev server proxies it to the API.
 */
export const rssUrl = "/rss.xml";
