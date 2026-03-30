-- Renomeia identificador do site Seguros de Crédito: hirayama → seguros-de-credito
-- Execute no SQL Editor do projeto (ou via MCP) após atualizar o front.

UPDATE public.articles
SET site_id = 'seguros-de-credito'
WHERE site_id = 'hirayama';

UPDATE public.contact_leads
SET site_id = 'seguros-de-credito'
WHERE site_id = 'hirayama';

ALTER TABLE public.articles
  ALTER COLUMN site_id SET DEFAULT 'seguros-de-credito';

ALTER TABLE public.contact_leads
  ALTER COLUMN site_id SET DEFAULT 'seguros-de-credito';

NOTIFY pgrst, 'reload schema';
