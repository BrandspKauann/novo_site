/** Formspree — formulário “Fale com um especialista” (Hirayama Seguro de Crédito). */
export const FORMSPREE_FORM_ENDPOINT = "https://formspree.io/f/xjgppnby";

export type SubmitFormspreeResult = { ok: true } | { ok: false; message: string };

export async function submitToFormspree(
  payload: Record<string, unknown>,
): Promise<SubmitFormspreeResult> {
  try {
    const res = await fetch(FORMSPREE_FORM_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      const message =
        typeof data.error === "string" && data.error.trim()
          ? data.error
          : "Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.";
      return { ok: false, message };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Falha de conexão. Verifique a internet." };
  }
}
