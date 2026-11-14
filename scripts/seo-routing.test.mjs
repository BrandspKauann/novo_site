import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
test('unknown editorial and solution routes stop after filesystem, before the SPA fallback',async()=>{
 const config=JSON.parse(await fs.readFile(new URL('../vercel.json',import.meta.url),'utf8'));
 const filesystem=config.routes.findIndex(r=>r.handle==='filesystem');
 const guard=config.routes.findIndex(r=>r.status===404);
 const fallback=config.routes.findIndex(r=>r.dest==='/index.html');
 assert.ok(filesystem<guard&&guard<fallback);
 const pattern=new RegExp('^'+config.routes[guard].src+'$');
 assert.ok(pattern.test('/conteudo/pagina-inexistente-auditoria-seo'));
 assert.ok(pattern.test('/solucoes/inexistente'));
 assert.ok(!pattern.test('/links'));
 assert.ok(!pattern.test('/linkedin'));
 assert.equal(config.routes[guard].dest,'/404.html');
 const html=await fs.readFile(new URL('../site/404.html',import.meta.url),'utf8');
 assert.match(html,/noindex,follow/);
 assert.equal((html.match(/<h1>/g)||[]).length,1);
 // All sitemap routes in the guarded namespaces must resolve before the guard.
 const map=await fs.readFile(new URL('../site/sitemap.xml',import.meta.url),'utf8');
 for(const match of map.matchAll(/<loc>(.*?)<\/loc>/g)){
   const pathname=new URL(match[1]).pathname;
   if(!pattern.test(pathname))continue;
   const file=new URL('../site'+pathname.replace(/\/$/,'')+'/index.html',import.meta.url);
   assert.ok((await fs.stat(file)).isFile(),pathname);
 }
});
