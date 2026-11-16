import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {sendLead,endpoint} from '../site/assets/collection-lead.js';
test('lead delivery succeeds only after receiver accepts and preserves failures',async()=>{
 let seen;assert.equal(await sendLead({company:'Empresa de exemplo'},async(url,opts)=>{seen={url,opts};return{ok:true}}),true);assert.equal(seen.url,endpoint);assert.equal(seen.opts.method,'POST');assert.deepEqual(JSON.parse(seen.opts.body),{company:'Empresa de exemplo'});
 await assert.rejects(sendLead({},async()=>({ok:false})),/não confirmado/);
 await assert.rejects(sendLead({},async()=>{throw Error('offline')}),/offline/);
});
test('collection landing is independent, indexable and honest about its dashboard',async()=>{
 const html=await fs.readFile(new URL('../site/solucoes/cobranca-de-divida/index.html',import.meta.url),'utf8');
 assert.equal((html.match(/<h1>/g)||[]).length,1);assert.match(html,/data-collection-landing/);assert.doesNotMatch(html,/index-YhZInFLV/);assert.match(html,/remuneração somente após êxito/i);assert.match(html,/Sem cobrança antecipada/i);assert.match(html,/Exemplo ilustrativo, sem dados reais/);assert.match(html,/formspree.io\/f\/xjgppnby/);assert.match(html,/type="checkbox"[^>]*required/);
 const js=await fs.readFile(new URL('../site/assets/collection-lead.js',import.meta.url),'utf8');assert.ok(js.indexOf("await sendLead(leadPayload")<js.indexOf("event('generate_lead')"));assert.doesNotMatch(js,/gtag\([^\n]*(?:email|phone|company|full_name)/);
});
