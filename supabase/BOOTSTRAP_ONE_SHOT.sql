-- =============================================================================
-- Supabase → SQL Editor → colar TUDO → Run (projeto: uvmepwdhynpabsptxggv)
-- Depois: NOTIFY já está no final. Teste: npm run check:supabase
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN ('article', 'video')),
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  external_url TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles (published, order_index);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles (category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles (featured);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Artigos públicos são visíveis para todos" ON public.articles;
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON public.articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON public.articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON public.articles;

CREATE POLICY "Artigos públicos são visíveis para todos"
  ON public.articles FOR SELECT USING (published = true);

CREATE POLICY "Permitir inserção de artigos"
  ON public.articles FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização de artigos"
  ON public.articles FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Permitir deleção de artigos"
  ON public.articles FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_articles_updated_at ON public.articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS seo_title TEXT,
  ADD COLUMN IF NOT EXISTS seo_description TEXT,
  ADD COLUMN IF NOT EXISTS seo_keywords TEXT,
  ADD COLUMN IF NOT EXISTS og_image_url TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_slug ON public.articles (slug) WHERE slug IS NOT NULL;

ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS site_id TEXT DEFAULT 'seguros-de-credito';

UPDATE public.articles SET site_id = 'seguros-de-credito' WHERE site_id IS NULL;

ALTER TABLE public.articles ALTER COLUMN site_id SET DEFAULT 'seguros-de-credito';
ALTER TABLE public.articles ALTER COLUMN site_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_articles_site_id ON public.articles (site_id);

ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS youtube_iframe TEXT;

CREATE TABLE IF NOT EXISTS public.login (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_login_email ON public.login(email);

ALTER TABLE public.login ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura de login para verificação" ON public.login;
DROP POLICY IF EXISTS "Permitir criação de usuários para registro" ON public.login;
DROP POLICY IF EXISTS "Apenas autenticados podem atualizar login" ON public.login;
DROP POLICY IF EXISTS "Apenas autenticados podem deletar login" ON public.login;

CREATE POLICY "Permitir leitura de login para verificação"
  ON public.login FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir criação de usuários para registro"
  ON public.login FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem atualizar login"
  ON public.login FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Apenas autenticados podem deletar login"
  ON public.login FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.update_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_login_updated_at ON public.login;
CREATE TRIGGER update_login_updated_at
  BEFORE UPDATE ON public.login
  FOR EACH ROW
  EXECUTE FUNCTION public.update_login_updated_at();

CREATE TABLE IF NOT EXISTS public.contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  site_id text NOT NULL DEFAULT 'seguros-de-credito',
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_name text NOT NULL,
  job_title text NOT NULL,
  cnpj text,
  monthly_revenue_range text,
  interest text NOT NULL,
  message text,
  source text,
  consent_accepted boolean NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx ON public.contact_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_leads_site_id_idx ON public.contact_leads (site_id);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert contact_leads" ON public.contact_leads;
CREATE POLICY "Allow anonymous insert contact_leads"
  ON public.contact_leads FOR INSERT TO anon, authenticated WITH CHECK (true);

NOTIFY pgrst, 'reload schema';
