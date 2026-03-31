-- Artigos: visitantes (anon) só leem publicados; quem fez login (Supabase Auth = role authenticated) gerencia tudo.
-- Rode após criar o usuário em Authentication → Users no Dashboard.

DROP POLICY IF EXISTS "Artigos públicos são visíveis para todos" ON public.articles;
DROP POLICY IF EXISTS "Artigos públicos são visíveis para visitantes" ON public.articles;
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON public.articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON public.articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON public.articles;
DROP POLICY IF EXISTS "Usuários autenticados podem ver todos os artigos" ON public.articles;
DROP POLICY IF EXISTS "Usuários autenticados podem criar artigos" ON public.articles;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar artigos" ON public.articles;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar artigos" ON public.articles;

CREATE POLICY "articles_anon_select_published"
  ON public.articles FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "articles_authenticated_select_all"
  ON public.articles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "articles_authenticated_insert"
  ON public.articles FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "articles_authenticated_update"
  ON public.articles FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "articles_authenticated_delete"
  ON public.articles FOR DELETE TO authenticated
  USING (true);
