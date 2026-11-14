# Seguro de Crédito — correção técnica de SEO em 13/11/2026

Base Search Console: 04–10/11 contra 28/10–03/11. Dez aparições e zero cliques contra 16 e zero. Posição 14,10 contra 15,50. A amostra não sustenta um diagnóstico de CTR nem crescimento relativo com base zero. Consultas visíveis são empresariais; não é preciso ampliar o escopo para crédito pessoal. Não foi reescrita a home a partir de dez impressões.

## Problema comprovado e correção

Antes da alteração, GET https://www.segurosdecredito.com.br/conteudo/pagina-inexistente-auditoria-seo respondeu 200 com o título da home. A rota genérica da SPA entregava a home para qualquer endereço desconhecido de artigo ou solução. Esse comportamento pode criar soft 404 e confundir processamento e navegação; não há evidência de que seja a causa da pequena audiência.

A configuração Vercel agora consulta os arquivos existentes primeiro; se uma URL sob /conteudo ou /solucoes não existir, retorna uma página 404 própria com status 404 e noindex. Artigos e soluções existentes continuam disponíveis. A navegação da SPA fora desses namespaces e os redirecionamentos de redes sociais permanecem inalterados. A página de erro oferece caminhos para conteúdos, seguro empresarial e início, preservando cores e identidade. Nenhuma alteração em tags, bundle React, formulários, conteúdo comercial ou URLs existentes.

## Validação

Build aprovado e quatro testes aprovados: precedência de rotas e preservação de todos os endereços do sitemap; HTML SEO das soluções; regressões dos artigos de 28/10 e 04/11. O Supabase continua sem resolução DNS e o build usa a fonte local publicada já existente (oito artigos). A correção não depende desse CMS. Somente vercel.json, site/404.html, scripts/seo-routing.test.mjs e este documento devem entrar no commit. Arquivos reemitidos pelo build ficam de fora.

Após publicação, confirmar produção READY do commit exato, HTTP404 na URL inexistente e HTTP200 nos artigos/soluções reais, home e sitemap. Monitorar relatório de indexação e cliques nas próximas semanas; não prometer aumento de visitas por essa correção.

Referência: https://developers.google.com/crawling/docs/troubleshooting/http-status-codes
