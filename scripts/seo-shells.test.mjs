import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { generateSeoShells, seoPages } from './generate-seo-shells.mjs';

test('public HTML has unique SEO, visible fallback, crawlable links and unchanged React assets', async () => {
  const before = await Promise.all(seoPages.map(p => fs.readFile(new URL(`../site/${p.path}index.html`, import.meta.url), 'utf8')));
  await generateSeoShells();
  const after = await Promise.all(seoPages.map(p => fs.readFile(new URL(`../site/${p.path}index.html`, import.meta.url), 'utf8')));
  for (let i = 0; i < after.length; i++) {
    assert.equal((after[i].match(/<title>/g) || []).length, 1);
    assert.equal((after[i].match(/<h1\b/g) || []).length, 1);
    assert.equal((after[i].match(/name="description"/g) || []).length, 1);
    assert.match(after[i], /<main data-seo-shell/);
    assert.match(after[i], /href="\/conteudo\/seguro-credito-protege-caixa"/);
    assert.doesNotMatch(after[i], /<meta name="robots" content="noindex"/);
    const modules = html => html.match(/<script type="module"[^>]+>/g);
    assert.deepEqual(modules(after[i]), modules(before[i]));
  }
  assert.equal(new Set(after.map(html => html.match(/rel="canonical" href="([^"]+)"/)[1])).size, 4);
  await generateSeoShells();
  for (let i = 0; i < after.length; i++) assert.equal(await fs.readFile(new URL(`../site/${seoPages[i].path}index.html`, import.meta.url), 'utf8'), after[i]);
});
