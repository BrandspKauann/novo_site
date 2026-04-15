import { useEffect, useRef } from "react";

const INJECTED = "data-static-seo-injected";

type Params = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
};

function getMetaContent(selector: string): string | null {
  const el = document.querySelector(selector);
  return el?.getAttribute("content") ?? null;
}

export function useStaticPageMeta({ title, description, canonicalPath, image }: Params) {
  const backupRef = useRef<{
    title: string;
    description: string | null;
    ogTitle: string | null;
    ogDesc: string | null;
    ogUrl: string | null;
    ogImage: string | null;
    twitterTitle: string | null;
    twitterDesc: string | null;
    twitterImage: string | null;
    canonicalHref: string | null;
  } | null>(null);

  useEffect(() => {
    backupRef.current = {
      title: document.title,
      description: getMetaContent('meta[name="description"]'),
      ogTitle: getMetaContent('meta[property="og:title"]'),
      ogDesc: getMetaContent('meta[property="og:description"]'),
      ogUrl: getMetaContent('meta[property="og:url"]'),
      ogImage: getMetaContent('meta[property="og:image"]'),
      twitterTitle: getMetaContent('meta[name="twitter:title"]'),
      twitterDesc: getMetaContent('meta[name="twitter:description"]'),
      twitterImage: getMetaContent('meta[name="twitter:image"]'),
      canonicalHref: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    };

    const origin = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || window.location.origin;
    const url = `${origin}${canonicalPath}`;
    const resolvedImage = image ? (image.startsWith("http") ? image : `${origin}${image}`) : undefined;

    document.title = title;

    const set = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };

    set('meta[name="description"]', description);
    set('meta[property="og:title"]', title);
    set('meta[property="og:description"]', description);
    set('meta[property="og:url"]', url);
    set('meta[name="twitter:title"]', title);
    set('meta[name="twitter:description"]', description);

    if (resolvedImage) {
      set('meta[property="og:image"]', resolvedImage);
      set('meta[name="twitter:image"]', resolvedImage);
    }

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = url;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(INJECTED, "1");
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      description,
      provider: {
        "@type": "Organization",
        name: "Hirayama Seguros",
      },
      url,
    });
    document.head.appendChild(script);

    return () => {
      const backup = backupRef.current;
      if (!backup) return;

      document.title = backup.title;

      const restore = (selector: string, value: string | null) => {
        if (value == null) return;
        const el = document.querySelector(selector);
        if (el) el.setAttribute("content", value);
      };

      restore('meta[name="description"]', backup.description);
      restore('meta[property="og:title"]', backup.ogTitle);
      restore('meta[property="og:description"]', backup.ogDesc);
      restore('meta[property="og:url"]', backup.ogUrl);
      restore('meta[property="og:image"]', backup.ogImage);
      restore('meta[name="twitter:title"]', backup.twitterTitle);
      restore('meta[name="twitter:description"]', backup.twitterDesc);
      restore('meta[name="twitter:image"]', backup.twitterImage);

      const canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (canonicalEl && backup.canonicalHref != null) canonicalEl.href = backup.canonicalHref;

      document.querySelectorAll(`[${INJECTED}]`).forEach((node) => node.remove());
    };
  }, [title, description, canonicalPath, image]);
}
