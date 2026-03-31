-- Volta políticas permissivas para o cliente anônimo (sem Supabase Auth no admin).
-- Use se você tiver aplicado 015 e o painel parou de salvar artigos.

DROP POLICY IF EXISTS "articles_anon_select_published" ON public.articles;
DROP POLICY IF EXISTS "articles_authenticated_select_all" ON public.articles;
DROP POLICY IF EXISTS "articles_authenticated_insert" ON public.articles;
DROP POLICY IF EXISTS "articles_authenticated_update" ON public.articles;
DROP POLICY IF EXISTS "articles_authenticated_delete" ON public.articles;

CREATE POLICY "Artigos públicos são visíveis para todos"
  ON public.articles FOR SELECT
  USING (published = true);

CREATE POLICY "Permitir inserção de artigos"
  ON public.articles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de artigos"
  ON public.articles FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir deleção de artigos"
  ON public.articles FOR DELETE
  USING (true);
