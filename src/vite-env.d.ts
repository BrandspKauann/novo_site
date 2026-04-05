/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** URL pública do webhook n8n (obrigatória em produção / Vercel). */
  readonly VITE_CONTACT_FORM_WEBHOOK_URL?: string;
}
