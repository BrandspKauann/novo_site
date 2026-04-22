import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const envPath = path.join(projectRoot, ".env");
const publicDir = path.join(projectRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const robotsPath = path.join(publicDir, "robots.txt");

function parseEnv(text) {
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

function xmlEscape(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function loadEnv() {
  const text = await fs.readFile(envPath, "utf8");
  return parseEnv(text);
}

function toIsoDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}

async function main() {
  const env = await loadEnv();
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY;
  const siteUrl = (env.VITE_SITE_URL || "https://www.segurosdecredito.com.br").replace(/\/$/, "");
  const siteId = env.VITE_SITE_ID || "seguros-de-credito";

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("VITE_SUPABASE_URL e chave pública do Supabase são obrigatórios para gerar o sitemap.");
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, slug, updated_at, created_at, published, site_id")
    .eq("published", true)
    .eq("site_id", siteId)
    .order("updated_at", { ascending: false });

  if (error) throw error;

  const staticPages = [
    { loc: `${siteUrl}/`, lastmod: new Date().toISOString(), changefreq: "weekly", priority: "1.0" },
    { loc: `${siteUrl}/conteudo`, lastmod: new Date().toISOString(), changefreq: "daily", priority: "0.9" },
    { loc: `${siteUrl}/solucoes/seguro-de-credito`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: "0.8" },
    { loc: `${siteUrl}/solucoes/consulta-de-dados-empresariais`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: "0.8" },
    { loc: `${siteUrl}/solucoes/cobranca-de-divida`, lastmod: new Date().toISOString(), changefreq: "monthly", priority: "0.8" },
  ];

  const articlePages = (articles ?? []).map((article) => {
    const slugOrId = article.slug?.trim() || article.id;
    return {
      loc: `${siteUrl}/conteudo/${slugOrId}`,
      lastmod: toIsoDate(article.updated_at || article.created_at),
      changefreq: "monthly",
      priority: "0.8",
    };
  });

  const urls = [...staticPages, ...articlePages];

  const sitemapXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (url) => `  <url>
    <loc>${xmlEscape(url.loc)}</loc>
    <lastmod>${xmlEscape(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(sitemapPath, sitemapXml, "utf8");
  await fs.writeFile(robotsPath, robotsTxt, "utf8");

  console.log(`Sitemap gerado com ${urls.length} URLs em ${sitemapPath}`);
}

main().catch((error) => {
  console.error("Falha ao gerar sitemap:", error);
  process.exitCode = 1;
});
