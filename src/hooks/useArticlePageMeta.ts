import { useEffect, useRef } from "react";
import type { Article } from "@/types/article";
import { SITE_BRAND_NAME, SITE_DEFAULT_DOCUMENT_TITLE } from "@/config/brand";

const INJECTED = "data-article-seo-injected";

function getMetaContent(selector: string): string | null {
  const el = document.querySelector(selector);
  return el?.getAttribute("content") ?? null;
}

/**
 * Atualiza título, meta tags, canonical, OG/Twitter e JSON-LD do artigo (SPA).
 * Restaura valores do index.html ao sair da página.
 */
export function useArticlePageMeta(article: Article | null | undefined, slug: string | undefined) {
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
    keywords: string | null;
    canonicalHref: string | null;
  } | null>(null);

  useEffect(() => {
    if (!article) return;

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
      keywords: getMetaContent('meta[name="keywords"]'),
      canonicalHref: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    };

    const pageTitle = `${article.seo_title?.trim() || article.title} | ${SITE_BRAND_NAME}`;
    const description = (article.seo_description?.trim() || article.description || "").slice(0, 320);
    const keywords = article.seo_keywords?.trim();
    const origin =
      import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const path = `/conteudo/${article.slug || slug || ""}`;
    const pageUrl = origin ? `${origin}${path}` : path;
    const imageUrl =
      article.og_image_url?.trim() || article.image_url?.trim() || `${origin}/og-image.jpg`;

    document.title = pageTitle;

    const set = (sel: string, content: string) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute("content", content);
    };
    set('meta[name="description"]', description);
    if (keywords) set('meta[name="keywords"]', keywords);

    set('meta[property="og:title"]', article.seo_title?.trim() || article.title);
    set('meta[property="og:description"]', description);
    set('meta[property="og:url"]', pageUrl);
    set('meta[property="og:image"]', imageUrl);

    set('meta[name="twitter:title"]', article.seo_title?.trim() || article.title);
    set('meta[name="twitter:description"]', description);
    set('meta[name="twitter:image"]', imageUrl);

    const canonical = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement | null;
    if (canonical) canonical.href = pageUrl;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description,
      ...(imageUrl ? { image: [imageUrl] } : {}),
      datePublished: article.created_at,
      dateModified: article.updated_at,
      author: { "@type": "Organization", name: SITE_BRAND_NAME },
      publisher: { "@type": "Organization", name: SITE_BRAND_NAME },
      ...(pageUrl ? { mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl } } : {}),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(INJECTED, "1");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const b = backupRef.current;
      if (b) {
        document.title = b.title || SITE_DEFAULT_DOCUMENT_TITLE;
        const restore = (sel: string, val: string | null) => {
          if (val == null) return;
          const el = document.querySelector(sel);
          if (el) el.setAttribute("content", val);
        };
        restore('meta[name="description"]', b.description);
        restore('meta[name="keywords"]', b.keywords);
        restore('meta[property="og:title"]', b.ogTitle);
        restore('meta[property="og:description"]', b.ogDesc);
        restore('meta[property="og:url"]', b.ogUrl);
        restore('meta[property="og:image"]', b.ogImage);
        restore('meta[name="twitter:title"]', b.twitterTitle);
        restore('meta[name="twitter:description"]', b.twitterDesc);
        restore('meta[name="twitter:image"]', b.twitterImage);
        const can = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (can && b.canonicalHref != null) can.href = b.canonicalHref;
      }
      document.querySelectorAll(`[${INJECTED}]`).forEach((n) => n.remove());
    };
  }, [article, slug]);
}
