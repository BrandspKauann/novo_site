/**
 * Envio do formulário “Fale com especialista” via HTTP (n8n / automação).
 * Em produção defina VITE_CONTACT_FORM_WEBHOOK_URL (URL pública HTTPS).
 * Em dev, se não houver env, usa host Docker local do n8n.
 */
const LOCAL_N8N_FALLBACK = "http://host.docker.internal:5678/webhook/seguros-de-credito";

function resolveWebhookUrl(): string | null {
  const fromEnv = import.meta.env.VITE_CONTACT_FORM_WEBHOOK_URL?.trim();
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return LOCAL_N8N_FALLBACK;
  return null;
}

export type PostContactLeadResult = { ok: true } | { ok: false; message: string };

/** POST JSON para o webhook (único caminho de persistência do lead no fluxo atual). */
export async function postContactLead(body: Record<string, unknown>): Promise<PostContactLeadResult> {
  const url = resolveWebhookUrl();
  if (!url) {
    return {
      ok: false,
      message:
        "URL do webhook não configurada. Defina VITE_CONTACT_FORM_WEBHOOK_URL na Vercel (URL pública do n8n).",
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        event: "contact_lead",
        submitted_at: new Date().toISOString(),
        ...body,
      }),
      mode: "cors",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn("[contact webhook]", res.status, text);
      return {
        ok: false,
        message: "Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.",
      };
    }
    return { ok: true };
  } catch (e) {
    console.warn("[contact webhook] rede/CORS", e);
    return {
      ok: false,
      message: "Falha de conexão. Verifique a URL do webhook e o CORS no n8n.",
    };
  }
}
