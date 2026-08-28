import { Head } from "vite-react-ssg";
import { defaultDescription, defaultTitle, siteName, siteUrl } from "@/lib/site";

type SeoProps = {
  /** Page title without the site suffix. Omit on the homepage for the default. */
  title?: string;
  description?: string;
  /** Canonical path beginning with "/", e.g. "/blog". */
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  jsonLd?: Record<string, unknown>;
};

/**
 * Per-route document head. Uses vite-react-ssg's SSG-aware <Head> so the tags are
 * baked into the prerendered HTML and kept in sync on client navigation.
 */
export function Seo({
  title,
  description = defaultDescription,
  path = "",
  type = "website",
  publishedTime,
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const url = `${siteUrl}${path}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" type="application/rss+xml" href={`${siteUrl}/rss.xml`} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      {publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Head>
  );
}
