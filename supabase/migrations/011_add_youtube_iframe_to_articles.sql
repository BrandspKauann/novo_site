-- Campo usado pelo admin / página de conteúdo para embed do YouTube
ALTER TABLE public.articles
ADD COLUMN IF NOT EXISTS youtube_iframe TEXT;
