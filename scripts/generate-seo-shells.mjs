import fs from 'node:fs/promises';

const root = new URL('../site/', import.meta.url);
const origin = 'https://www.segurosdecredito.com.br';
export const seoPages = [
  { path: '', title: 'Seguro de Crédito Empresarial: proteja suas vendas a prazo',
    description: 'Sua empresa vende a prazo? Entenda o seguro de crédito empresarial, a análise de compradores e as condições de cobertura. Converse com a Hirayama.',
    heading: 'Seguro de Crédito Empresarial',
    intro: 'Proteja suas vendas a prazo com seguro de crédito empresarial. Análise de risco, limite de crédito e indenização em caso de inadimplência — com a Hirayama ao seu lado.',
    detail: 'Compare as soluções conforme o momento da operação: consulta de dados empresariais antes da venda, seguro de crédito durante a exposição e cobrança de dívida após o atraso.' },
  { path: 'solucoes/seguro-de-credito/', title: 'Seguro de Crédito Empresarial | Seguro para Crédito e Vendas a Prazo B2B | Hirayama Seguros',
    description: 'Seguro para crédito empresarial que protege vendas a prazo, define limites de crédito e cobre inadimplência. Seguro para vendas B2B com cobertura de até 90% e monitoramento contínuo.',
    heading: 'Seguro de Crédito para vender mais e proteger seu caixa',
    intro: 'Proteja vendas a prazo, defina limites com mais segurança e reduza o impacto financeiro da inadimplência no fluxo de caixa.',
    detail: 'Na análise, confira os compradores, os limites propostos, as condições de cobertura e as responsabilidades previstas na apólice. A contratação e a indenização dependem das regras e da aceitação da seguradora.' },
  { path: 'solucoes/consulta-de-dados-empresariais/', title: 'Consulta de Dados Empresariais | Dados de Empresas, CNPJ e Score de Risco | Hirayama Seguros',
    description: 'Consulta de dados empresariais com score de risco, análise de crédito e alertas de monitoramento. Dados de empresas no Brasil e em mais de 200 mercados — como Serasa empresa, mas com visão global e opinião especializada.',
    heading: 'Consulta de Dados Empresariais para decidir com mais confiança',
    intro: 'Analise clientes, fornecedores e parceiros no Brasil e no exterior com dados financeiros, opinião de crédito e monitoramento contínuo.',
    detail: 'A informação apoia a decisão antes de assumir risco. Avalie a situação da empresa e os limites comerciais adequados ao seu processo, sem tratar uma consulta como garantia de pagamento.' },
  { path: 'solucoes/cobranca-de-divida/', title: 'Empresa de Cobrança B2B | Cobrar Dívida e Recebíveis por Êxito | Hirayama Seguros',
    description: 'Empresa de cobrança especializada em cobrar empresa devedora no Brasil e no exterior. Cobrança de dívida com modelo por êxito: recuperação de recebíveis com abordagem profissional e custo atrelado ao resultado.',
    heading: 'Empresa de Cobrança B2B para recuperar caixa sem travar a operação',
    intro: 'Recupere recebíveis em atraso com apoio especializado no Brasil e no exterior, com modelo de cobrança por êxito e preservação do foco da sua equipe no core business.',
    detail: 'A análise considera os documentos, o devedor e o estágio da cobrança. Condições e possibilidade de recuperação precisam ser avaliadas no caso concreto; não há promessa de recebimento.' },
];
const escape = s => s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
export async function generateSeoShells() {
  for (const page of seoPages) {
    const file = new URL(page.path + 'index.html', root);
    let html = await fs.readFile(file, 'utf8');
    const canonical = origin + (page.path ? '/' + page.path.replace(/\/$/, '') : '/');
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escape(page.title)}</title>`)
      .replace(/<meta (name|property)="(title|og:title|twitter:title)" content="[^"]*"\s*\/?>/gi, (_, kind, key) => `<meta ${kind}="${key}" content="${escape(page.title)}" />`)
      .replace(/<meta (name|property)="(description|og:description|twitter:description)" content="[^"]*"\s*\/?>/gi, (_, kind, key) => `<meta ${kind}="${key}" content="${escape(page.description)}" />`)
      .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`)
      .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`);
    // Visible to every visitor until React mounts; never bot-specific or hidden.
    const shell = `<div id="root"><main data-seo-shell style="max-width:72rem;margin:0 auto;padding:3rem 1.25rem;font-family:system-ui,sans-serif;color:#052e5c;line-height:1.7">
      <a href="/">Seguros de Crédito · Hirayama</a>
      <h1 style="font-size:clamp(2rem,6vw,3.5rem);line-height:1.15">${escape(page.heading)}</h1>
      <p>${escape(page.intro)}</p><p>${escape(page.detail)}</p>
      <h2>Soluções para cada etapa da operação</h2>
      <ul>${seoPages.slice(1).map(p => `<li><a href="/${p.path.replace(/\/$/, '')}">${escape(p.heading)}</a></li>`).join('')}</ul>
      <h2>Entenda antes de contratar</h2>
      <p><a href="/conteudo/seguro-credito-protege-caixa">Como funciona o seguro de crédito empresarial</a></p>
      <p><a href="/conteudo/vender-prazo-seguranca-limite-credito">Vendas a prazo e proteção do caixa</a></p>
      <p><a href="/conteudo">Ver todos os conteúdos</a></p>
      <p>Condições, limites, exclusões e cobertura dependem da análise e do contrato aplicável.</p>
    </main></div>`;
    const expression = /<div id="root">(?:<main data-seo-shell[\s\S]*?<\/main>)?<\/div>/;
    if (!expression.test(html)) throw new Error(`Missing known React root in ${page.path}`);
    html = html.replace(expression, shell);
    await fs.writeFile(file, html);
  }
}
