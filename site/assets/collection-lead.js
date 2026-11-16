export const endpoint='https://formspree.io/f/xjgppnby';
export function leadPayload(form,url){
 const data=Object.fromEntries(new FormData(form));
 const u=new URL(url);return {...data,_subject:'[Hirayama] Diagnóstico de cobrança B2B',site_id:'seguros-de-credito',interest:'cobranca-b2b',source:'landing-cobranca',page_origin:u.origin+u.pathname,...Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map(k=>[k,u.searchParams.get(k)||'']))};
}
export async function sendLead(payload,request=fetch){const response=await request(endpoint,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw Error('Envio não confirmado');return true;}
if(typeof document!=='undefined'){
 const form=document.querySelector('#collection-form');const steps=[...form.querySelectorAll('fieldset')];let index=0,started=false;
 const event=(name,extra={})=>{if(['www.segurosdecredito.com.br','segurosdecredito.com.br'].includes(location.hostname)&&typeof window.gtag==='function')window.gtag('event',name,{site_id:'seguros-de-credito',form_id:'collection-profile',...extra});};
 const show=()=>{steps.forEach((s,i)=>s.hidden=i!==index);document.querySelector('#progress').textContent=`Etapa ${index+1} de 3`;document.querySelector('#progress-bar').value=index+1;};
 form.addEventListener('input',()=>{if(!started){started=true;event('diagnostico_start');}},{once:false});
 form.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{const invalid=[...steps[index].querySelectorAll('input,select')].find(n=>!n.checkValidity());if(invalid){invalid.reportValidity();return;}event('diagnostico_step_complete',{step_id:['empresa','recebivel','contato'][index],step_index:index+1});index++;show();steps[index].querySelector('input,select')?.focus();}));
 form.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>{index--;show();}));
 form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const button=form.querySelector('[type=submit]'),status=document.querySelector('#form-status');button.disabled=true;status.textContent='Enviando sua solicitação…';try{await sendLead(leadPayload(form,location.href));event('diagnostico_step_complete',{step_id:'contato',step_index:3});event('diagnostic_complete');event('generate_lead');form.hidden=true;status.textContent='Solicitação recebida. A equipe Hirayama entrará em contato para compreender a carteira e combinar os próximos passos. O envio não inicia uma cobrança nem garante a recuperação dos valores.';}catch{status.textContent='Não foi possível confirmar o recebimento. Seus dados continuam no formulário. Tente novamente ou fale com a Hirayama pelo contato no rodapé.';button.disabled=false;}});show();
 document.querySelectorAll('a[href="#diagnostico"]').forEach(a=>a.addEventListener('click',()=>event('cta_click',{placement:a.dataset.placement||'collection-page'})));
}
