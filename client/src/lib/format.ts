const dateFormats = {
  short: { year: "numeric", month: "short", day: "numeric" },
  long: { year: "numeric", month: "long", day: "numeric" },
} as const satisfies Record<string, Intl.DateTimeFormatOptions>;

/**
 * Formats a calendar date such as "2026-05-12" for display.
 *
 * Date-only strings parse as UTC midnight, so formatting them in the viewer's
 * local zone shows the previous day anywhere west of UTC, and also makes the
 * prerendered HTML (built in UTC) disagree with the client render (a hydration
 * mismatch). Formatting in UTC keeps the calendar date exactly as written.
 * Returns the input unchanged if it isn't a parseable date.
 */
export function formatDate(value: string, style: keyof typeof dateFormats = "short"): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { ...dateFormats[style], timeZone: "UTC" });
}
