import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
test('4 November article is complete, crawlable and illustrated',async()=>{
 const root=new URL('../',import.meta.url);
 const html=await fs.readFile(new URL('site/conteudo/cliente-recuperacao-judicial-recebiveis-novas-vendas/index.html',root),'utf8');
 assert.equal((html.match(/<h1(?:\s[^>]*)?>/g)||[]).length,1);
 assert.ok(html.includes("Cliente em recuperação judicial: como revisar recebíveis e novas vendas"));
 for(const heading of ["A notícia precisa virar uma informação verificável","Organize a exposição antes de discutir a próxima venda","A comunicação à seguradora não deve esperar uma conclusão informal","Novas entregas precisam de uma decisão própria","Evite renegociar sem alinhar as responsabilidades"])assert.ok(html.includes(heading));
 assert.ok(html.includes('Imagem ilustrativa gerada por IA')||html.includes('imagem de capa ilustrativa gerada por IA'));
 assert.ok(html.includes('"@type":"Organization"'));
 const map=await fs.readFile(new URL('site/sitemap.xml',root),'utf8');
 assert.ok(map.includes('cliente-recuperacao-judicial-recebiveis-novas-vendas'));

});
