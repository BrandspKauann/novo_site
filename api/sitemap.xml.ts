import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const baseUrl = "https://www.segurosdecredito.com.br";
  const currentDate = new Date().toISOString().split("T")[0];

  // Páginas estáticas
  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "weekly" },
    { url: `${baseUrl}/conteudo`, priority: "0.8", changefreq: "weekly" },
  ];

  // Buscar artigos do Supabase
  let articles: any[] = [];
  try {
    // Na Vercel, as variáveis de ambiente podem ter prefixo VITE_ ou não
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '';
    
    console.log('Sitemap: Verificando variáveis de ambiente...');
    console.log('Sitemap: Supabase URL configurada:', !!supabaseUrl);
    console.log('Sitemap: Supabase Key configurada:', !!supabaseKey);
    
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      console.log('Sitemap: Buscando artigos publicados...');
      
      const { data, error } = await supabase
        .from("articles")
        .select("id, slug, updated_at")
        .eq("published", true)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Sitemap: Erro ao buscar artigos:", error);
        console.error("Sitemap: Detalhes do erro:", JSON.stringify(error));
      } else if (data) {
        articles = data || [];
        console.log(`Sitemap: ${articles.length} artigos encontrados`);
        if (articles.length > 0) {
          console.log('Sitemap: Primeiro artigo:', articles[0]);
        }
      } else {
        console.log('Sitemap: Nenhum dado retornado do Supabase');
      }
    } else {
      console.error("Sitemap: Variáveis de ambiente do Supabase não configuradas");
      console.error("Sitemap: URL:", supabaseUrl ? 'OK' : 'FALTANDO');
      console.error("Sitemap: Key:", supabaseKey ? 'OK' : 'FALTANDO');
    }
  } catch (error) {
    console.error("Sitemap: Erro ao buscar artigos:", error);
    if (error instanceof Error) {
      console.error("Sitemap: Mensagem de erro:", error.message);
      console.error("Sitemap: Stack:", error.stack);
    }
  }

  // Função para escapar caracteres XML
  function escapeXml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  // URLs dos artigos
  const articleUrls = articles.map((article) => {
    const slug = article.slug || article.id;
    const url = `${baseUrl}/conteudo/${slug}`;
    const lastmod = article.updated_at
      ? new Date(article.updated_at).toISOString().split("T")[0]
      : currentDate;
    return {
      url: escapeXml(url),
      priority: "0.6",
      changefreq: "monthly",
      lastmod: lastmod,
    };
  });

  // Log final antes de gerar XML
  console.log(`Sitemap: Gerando XML com ${staticPages.length} páginas estáticas e ${articleUrls.length} artigos`);

  // Gerar XML com encoding correto
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(page.url)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
${articleUrls.length > 0 ? articleUrls
  .map(
    (article) => `  <url>
    <loc>${article.url}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>${article.changefreq}</changefreq>
    <priority>${article.priority}</priority>
  </url>`
  )
  .join("\n") : ''}
</urlset>`;

  console.log(`Sitemap: XML gerado com sucesso. Tamanho: ${sitemap.length} caracteres`);

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(sitemap);
}

