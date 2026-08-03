import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(projectRoot, "content", "article-source");
const siteDir = path.join(projectRoot, "site");
const outputDir = path.join(siteDir, "conteudo");
const siteUrl = "https://www.segurosdecredito.com.br";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugifyAnchor(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function stripHtmlTags(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toPlainText(markdown = "") {
  return stripHtmlTags(
    markdown
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
      .replace(/^>\s?/gm, "")
      .replace(/^#{1,6}\s+/gm, "")
  );
}

function inlineMarkdownToHtml(text = "") {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderItemsList(items = [], formatter) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return `<ul>${items.map((item) => `<li>${formatter(item)}</li>`).join("")}</ul>`;
}

function renderStructuredBlock(type, payload) {
  if (!payload || typeof payload !== "object") return "";

  if (type === "callout") {
    return `<aside class="callout callout--${escapeHtml(payload.variant || "info")}">
      ${payload.title ? `<h3>${escapeHtml(payload.title)}</h3>` : ""}
      ${payload.body ? `<p>${inlineMarkdownToHtml(payload.body)}</p>` : ""}
    </aside>`;
  }

  if (type === "chart") {
    return `<section class="data-card">
      ${payload.title ? `<h3>${escapeHtml(payload.title)}</h3>` : ""}
      ${payload.subtitle ? `<p class="data-card__subtitle">${escapeHtml(payload.subtitle)}</p>` : ""}
      ${renderItemsList(payload.items, (item) => {
        const value = `${item.value}${payload.suffix || ""}`;
        return `<strong>${escapeHtml(value)}</strong><span>${escapeHtml(item.label || "")}</span>`;
      })}
      ${payload.source ? `<p class="data-card__source">Fonte: ${escapeHtml(payload.source)}</p>` : ""}
    </section>`;
  }

  if (type === "stats") {
    return `<section class="data-card">
      ${payload.title ? `<h3>${escapeHtml(payload.title)}</h3>` : ""}
      ${renderItemsList(payload.items, (item) => {
        const hint = item.hint ? ` <em>${escapeHtml(item.hint)}</em>` : "";
        return `<strong>${escapeHtml(item.value || "")}</strong><span>${escapeHtml(item.label || "")}${hint}</span>`;
      })}
      ${payload.source ? `<p class="data-card__source">Fonte: ${escapeHtml(payload.source)}</p>` : ""}
    </section>`;
  }

  if (type === "timeline") {
    return `<section class="timeline">
      ${payload.title ? `<h3>${escapeHtml(payload.title)}</h3>` : ""}
      <ol>${(payload.items || [])
        .map(
          (item) => `<li>
            <strong>${escapeHtml(item.label || "")}</strong>
            <span>${escapeHtml(item.value || "")}</span>
            ${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}
          </li>`,
        )
        .join("")}</ol>
    </section>`;
  }

  return "";
}

function renderTable(lines) {
  const rows = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim()));

  if (rows.length < 2) return `<p>${inlineMarkdownToHtml(lines.join(" "))}</p>`;

  const [header, separator, ...body] = rows;
  const isSeparator = separator.every((cell) => /^:?-{3,}:?$/.test(cell));
  if (!isSeparator) return `<p>${inlineMarkdownToHtml(lines.join(" "))}</p>`;

  return `<div class="table-wrap"><table><thead><tr>${header
    .map((cell) => `<th>${inlineMarkdownToHtml(cell)}</th>`)
    .join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdownToHtml(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table></div>`;
}

function renderMarkdown(markdown = "") {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const blocks = [];

  for (let index = 0; index < lines.length; ) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const type = line.slice(3).trim();
      const content = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        content.push(lines[index]);
        index += 1;
      }
      index += 1;
      const rawBlock = content.join("\n").trim();
      try {
        const payload = JSON.parse(rawBlock);
        blocks.push(renderStructuredBlock(type, payload));
      } catch {
        blocks.push(`<pre>${escapeHtml(rawBlock)}</pre>`);
      }
      continue;
    }

    if (/^##\s+/.test(line)) {
      const title = line.replace(/^##\s+/, "");
      blocks.push(`<h2 id="${slugifyAnchor(title)}">${inlineMarkdownToHtml(title)}</h2>`);
      index += 1;
      continue;
    }

    if (/^###\s+/.test(line)) {
      const title = line.replace(/^###\s+/, "");
      blocks.push(`<h3 id="${slugifyAnchor(title)}">${inlineMarkdownToHtml(title)}</h3>`);
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(`<blockquote><p>${inlineMarkdownToHtml(quote.join(" "))}</p></blockquote>`);
      continue;
    }

    if (line.startsWith("|")) {
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      blocks.push(renderTable(tableLines));
      continue;
    }

    const paragraph = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (!current) break;
      if (/^(```|##\s+|###\s+|>\s*|\|)/.test(current)) break;
      paragraph.push(current);
      index += 1;
    }

    blocks.push(`<p>${inlineMarkdownToHtml(paragraph.join(" "))}</p>`);
  }

  return blocks.filter(Boolean).join("\n");
}

function buildArticlePage(article, relatedArticles) {
  const canonical = `${siteUrl}/conteudo/${article.slug}`;
  const title = article.seo_title?.trim() || article.title;
  const description = stripHtmlTags(article.seo_description?.trim() || article.description || toPlainText(article.content).slice(0, 160));
  const bodyHtml = renderMarkdown(article.content || "");
  const relatedHtml = relatedArticles.length
    ? `<section class="related">
        <div class="related__header">
          <p>Continue lendo</p>
          <h2>Mais artigos para você</h2>
        </div>
        <div class="related__grid">
          ${relatedArticles
            .map(
              (rel) => `<a class="related__card" href="/conteudo/${rel.slug}">
                <span>${escapeHtml(rel.category || "Conteúdo")}</span>
                <strong>${escapeHtml(rel.title)}</strong>
                <p>${escapeHtml(stripHtmlTags(rel.description || "").slice(0, 160))}</p>
              </a>`,
            )
            .join("")}
        </div>
      </section>`
    : "";

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "Hirayama Seguros" },
    publisher: { "@type": "Organization", name: "Hirayama Seguros" },
    articleSection: article.category,
  };

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="Hirayama Seguros" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <style>${sharedStyles}</style>
    <script type="application/ld+json">${JSON.stringify(ldJson)}</script>
  </head>
  <body>
    <header class="site-shell">
      <div class="topbar">
        <a href="/" class="brand">
          <span class="brand__title">Seguros de Crédito</span>
          <span class="brand__subtitle">by Hirayama</span>
        </a>
        <nav class="topnav">
          <a href="/">Início</a>
          <a href="/solucoes/seguro-de-credito">Soluções</a>
          <a href="/conteudo">Conteúdo</a>
        </nav>
      </div>
    </header>
    <main class="page">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Início</a>
          <span>/</span>
          <a href="/conteudo">Conteúdo</a>
          <span>/</span>
          <span aria-current="page">${escapeHtml(article.title)}</span>
        </nav>
        <article class="article-card">
          <div class="article-meta">
            <span class="article-pill">${escapeHtml(article.category || "Conteúdo")}</span>
            <span>${escapeHtml(formatDate(article.updated_at || article.created_at))}</span>
            ${article.read_time ? `<span>${escapeHtml(article.read_time)} de leitura</span>` : ""}
          </div>
          <h1>${escapeHtml(article.title)}</h1>
          <p class="article-lead">${escapeHtml(stripHtmlTags(article.description || ""))}</p>
          <div class="article-body">
            ${bodyHtml}
          </div>
          <div class="article-cta">
            <a href="https://api.whatsapp.com/send?phone=5511972896857&text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20seguro%20de%20cr%C3%A9ditos" target="_blank" rel="noopener noreferrer">Falar com Especialista</a>
            <a class="ghost" href="/conteudo">Ver todos os artigos</a>
          </div>
        </article>
        ${relatedHtml}
      </div>
    </main>
  </body>
</html>`;
}

function buildContentIndex(articles) {
  const description = "Artigos sobre seguro de crédito, análise de empresas, monitoramento de carteira e cobrança B2B.";
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Conteúdo para vender com segurança",
    description,
    url: `${siteUrl}/conteudo`,
  };

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conteúdo para vender com segurança | Hirayama Seguros</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${siteUrl}/conteudo" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Conteúdo para vender com segurança | Hirayama Seguros" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${siteUrl}/conteudo" />
    <style>${sharedStyles}</style>
    <script type="application/ld+json">${JSON.stringify(ldJson)}</script>
  </head>
  <body>
    <header class="site-shell">
      <div class="topbar">
        <a href="/" class="brand">
          <span class="brand__title">Seguros de Crédito</span>
          <span class="brand__subtitle">by Hirayama</span>
        </a>
        <nav class="topnav">
          <a href="/">Início</a>
          <a href="/solucoes/seguro-de-credito">Soluções</a>
          <a href="/conteudo" aria-current="page">Conteúdo</a>
        </nav>
      </div>
    </header>
    <main class="page">
      <div class="container">
        <section class="hero-card">
          <p class="eyebrow">Conteúdo</p>
          <h1>Conteúdo para vender com segurança</h1>
          <p>Os artigos abaixo já ficam visíveis em HTML puro para facilitar a descoberta e a indexação pelos buscadores.</p>
        </section>
        <section class="index-grid">
          ${articles
            .map(
              (article) => `<a class="index-card" href="/conteudo/${article.slug}">
                <span>${escapeHtml(article.category || "Conteúdo")}</span>
                <strong>${escapeHtml(article.title)}</strong>
                <p>${escapeHtml(stripHtmlTags(article.description || "").slice(0, 180))}</p>
              </a>`,
            )
            .join("")}
        </section>
      </div>
    </main>
  </body>
</html>`;
}

const sharedStyles = `
:root{color-scheme:light;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--bg:#f6f8fc;--card:#ffffff;--line:#d9e3f0;--text:#102445;--muted:#5c6d88;--blue:#2563eb;--blue-2:#eff6ff;}
*{box-sizing:border-box}body{margin:0;background:linear-gradient(180deg,#f7f9fc 0%,#eef3fb 100%);color:var(--text)}a{text-decoration:none;color:inherit}.site-shell{background:#fff;border-bottom:1px solid var(--line)}.topbar{max-width:1180px;margin:0 auto;padding:18px 16px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{display:flex;flex-direction:column}.brand__title{font-size:1.65rem;font-weight:800;color:#173f86}.brand__subtitle{font-size:.88rem;color:var(--muted)}.topnav{display:flex;gap:20px;flex-wrap:wrap}.topnav a{color:var(--muted);font-weight:600}.topnav a:hover{color:#173f86}.page{padding:40px 0 72px}.container{max-width:960px;margin:0 auto;padding:0 16px}.breadcrumb{display:flex;gap:10px;flex-wrap:wrap;font-size:.94rem;color:var(--muted);margin:0 0 20px}.breadcrumb a{color:#355aa8}.article-card,.hero-card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:28px;box-shadow:0 20px 50px rgba(13,37,78,.07)}.hero-card h1,.article-card h1{font-size:clamp(2rem,4vw,3.35rem);line-height:1.06;margin:8px 0 14px}.eyebrow{margin:0;font-size:.78rem;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);font-weight:700}.article-meta{display:flex;gap:12px;flex-wrap:wrap;align-items:center;color:var(--muted);font-size:.92rem;margin-bottom:18px}.article-pill{display:inline-flex;align-items:center;padding:6px 10px;border-radius:999px;background:var(--blue-2);color:var(--blue);font-weight:700;text-transform:uppercase;letter-spacing:.08em;font-size:.72rem}.article-lead{font-size:1.1rem;line-height:1.7;color:var(--muted);margin:0 0 28px}.article-body{font-size:1.05rem;line-height:1.85}.article-body h2{font-size:1.8rem;line-height:1.2;margin:34px 0 16px}.article-body h3{font-size:1.3rem;line-height:1.3;margin:24px 0 12px}.article-body p{margin:0 0 18px}.article-body strong{color:#0d254e}.article-body blockquote{margin:24px 0;padding:18px 20px;border-left:4px solid var(--blue);background:#f8fbff;border-radius:16px;font-weight:600}.article-body code{background:#edf3ff;border-radius:6px;padding:.12rem .38rem;font-size:.95em}.data-card,.timeline,.callout{margin:26px 0;padding:22px;border:1px solid var(--line);border-radius:20px;background:#fbfdff}.data-card h3,.timeline h3,.callout h3{margin:0 0 10px;font-size:1.24rem}.data-card__subtitle,.data-card__source{color:var(--muted)}.data-card ul,.timeline ol{margin:16px 0 0;padding-left:20px}.data-card li,.timeline li{margin-bottom:10px}.data-card li strong,.timeline li strong{display:block;margin-bottom:4px}.callout--warning{background:#fff8eb;border-color:#f7d58c}.callout--tip{background:#eff8ff}.callout--info{background:#f7fbff}.table-wrap{overflow:auto;margin:22px 0}table{width:100%;border-collapse:collapse;background:#fff}th,td{text-align:left;padding:12px;border:1px solid var(--line);vertical-align:top}th{background:#f4f7fc;font-size:.92rem}.article-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px} .article-cta a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border-radius:14px;background:#1d4ed8;color:#fff;font-weight:700}.article-cta a.ghost{background:#fff;color:#1d4ed8;border:1px solid #bfd3ff}.related{margin-top:24px}.related__header p{margin:0 0 6px;font-size:.76rem;letter-spacing:.18em;text-transform:uppercase;color:var(--blue);font-weight:700}.related__header h2{margin:0 0 18px;font-size:1.7rem}.related__grid,.index-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.related__card,.index-card{display:block;background:#fff;border:1px solid var(--line);border-radius:20px;padding:20px;box-shadow:0 14px 30px rgba(13,37,78,.05)}.related__card span,.index-card span{display:block;margin-bottom:10px;font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--blue);font-weight:700}.related__card strong,.index-card strong{display:block;font-size:1.05rem;line-height:1.35;margin-bottom:10px}.related__card p,.index-card p,.hero-card p{margin:0;color:var(--muted);line-height:1.65}@media (max-width:720px){.topbar{align-items:flex-start;flex-direction:column}.article-card,.hero-card{padding:22px}.article-body{font-size:1rem}.article-cta a{width:100%}}
`;

async function loadArticles() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));
  const articles = await Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(sourceDir, file.name), "utf8");
      return JSON.parse(source);
    }),
  );

  return articles
    .filter((article) => article?.published && article?.slug)
    .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime());
}

export async function generateStaticContent() {
  const articles = await loadArticles();
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  await fs.writeFile(path.join(outputDir, "index.html"), buildContentIndex(articles), "utf8");

  for (const article of articles) {
    const articleDir = path.join(outputDir, article.slug);
    const relatedArticles = articles.filter((candidate) => candidate.slug !== article.slug).slice(0, 3);
    await fs.mkdir(articleDir, { recursive: true });
    await fs.writeFile(path.join(articleDir, "index.html"), buildArticlePage(article, relatedArticles), "utf8");
  }

  console.log(`Conteúdo estático gerado para ${articles.length} artigos em ${outputDir}`);
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  generateStaticContent().catch((error) => {
    console.error("Falha ao gerar conteúdo estático:", error);
    process.exitCode = 1;
  });
}
