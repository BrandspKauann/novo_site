-- Corrige: "Could not find the 'site_id' column of 'articles' in the schema cache"
-- Execute no Supabase: SQL Editor → New query → colar → Run.
-- Idempotente: pode rodar mais de uma vez.

ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS site_id TEXT DEFAULT 'hirayama';

UPDATE public.articles
SET site_id = 'hirayama'
WHERE site_id IS NULL;

ALTER TABLE public.articles
ALTER COLUMN site_id SET DEFAULT 'hirayama';

ALTER TABLE public.articles
ALTER COLUMN site_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_articles_site_id ON public.articles (site_id);

-- Opcional: avisa o PostgREST a recarregar o schema (em projetos recentes costuma atualizar sozinho em segundos)
NOTIFY pgrst, 'reload schema';
