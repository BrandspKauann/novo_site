import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
test('new B2B article renders with cover, citations and no raw markdown links',async()=>{
 const slug='pedido-fim-ano-acima-limite-credito-cliente';
 const html=await fs.readFile(new URL('../site/conteudo/'+slug+'/index.html',import.meta.url),'utf8');
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 assert.match(html,/href="https:\/\/www.wtwco.com/);
 assert.match(html,/href="https:\/\/www.allianz-trade.com/);
 assert.doesNotMatch(html,/\]\(https:/);
 assert.match(html,/property="og:image"/);
 assert.ok(html.includes('inteiramente hipotético'));
 assert.ok(html.includes('Imagem ilustrativa gerada por IA.'));
 assert.ok((await fs.stat(new URL('../site/assets/blog/'+slug+'.webp',import.meta.url))).size<150000);
 assert.ok((await fs.readFile(new URL('../site/sitemap.xml',import.meta.url),'utf8')).includes(slug));
});
