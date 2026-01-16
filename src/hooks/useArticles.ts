import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article, ArticleInsert, ArticleUpdate } from "@/types/article";
import { SITE_ID } from "@/config/site";

// Buscar artigos destacados e publicados (para a home - máximo 6)
export const useArticles = () => {
  return useQuery({
    queryKey: ["articles", "published", "featured"],
    queryFn: async () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/28d736e8-2ade-4952-ab85-87fba4e338a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useArticles.ts:11',message:'Query articles - before fetch',data:{table:'articles',filters:['published=true','featured=true','site_id='+SITE_ID],siteId:SITE_ID},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .eq("featured", true)
        .eq("site_id", SITE_ID)
        .order("created_at", { ascending: false })
        .limit(6);

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/28d736e8-2ade-4952-ab85-87fba4e338a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useArticles.ts:20',message:'Query articles - after fetch',data:{articleCount:data?.length||0,firstArticleTitle:data?.[0]?.title||'none',firstArticleSiteId:data?.[0]?.site_id||'none',hasError:!!error,errorMessage:error?.message||''},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (error) throw error;
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
  });
};

export const useAllPublishedArticles = () => {
  return useQuery({
    queryKey: ["articles", "published", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .eq("site_id", SITE_ID)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useArticleBySlug = (rawSlug?: string) => {
  const normalized = rawSlug?.trim();
  const looksLikeUuid = normalized ? /^[0-9a-fA-F-]{36}$/.test(normalized) : false;

  return useQuery({
    queryKey: ["articles", "detail", normalized],
    enabled: Boolean(normalized),
    queryFn: async () => {
      if (!normalized) return null;

      let query = supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .eq("site_id", SITE_ID)
        .limit(1);

      query = looksLikeUuid ? query.eq("id", normalized) : query.eq("slug", normalized);

      const { data, error } = await query.maybeSingle();

      if (error) throw error;
      return (data as Article) ?? null;
    },
  });
};

// Buscar todos os artigos (para admin - inclui não publicados)
export const useAllArticles = () => {
  return useQuery({
    queryKey: ["articles", "all"],
    queryFn: async () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/28d736e8-2ade-4952-ab85-87fba4e338a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useArticles.ts:72',message:'Query all articles - before fetch',data:{table:'articles',siteIdFilter:SITE_ID},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("site_id", SITE_ID)
        .order("created_at", { ascending: false });

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/28d736e8-2ade-4952-ab85-87fba4e338a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useArticles.ts:79',message:'Query all articles - after fetch',data:{totalArticles:data?.length||0,sampleTitles:data?.slice(0,3).map(a=>a.title)||[],sampleSiteIds:data?.slice(0,3).map(a=>a.site_id)||[],hasError:!!error},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      if (error) throw error;
      return data as Article[];
    },
  });
};

// Criar novo artigo
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: ArticleInsert) => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/28d736e8-2ade-4952-ab85-87fba4e338a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useArticles.ts:89',message:'Create article - before insert',data:{articleTitle:article.title,siteId:article.site_id||SITE_ID,articleKeys:Object.keys(article)},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      const articleWithSiteId = { ...article, site_id: article.site_id || SITE_ID };
      const { data, error } = await supabase
        .from("articles")
        .insert([articleWithSiteId])
        .select()
        .single();

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/28d736e8-2ade-4952-ab85-87fba4e338a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useArticles.ts:97',message:'Create article - after insert',data:{createdId:data?.id,createdTitle:data?.title,createdSiteId:data?.site_id,hasError:!!error},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      if (error) throw error;
      return data as Article;
    },
    onSuccess: () => {
      // Invalidar apenas queries específicas, não todas
      queryClient.invalidateQueries({ queryKey: ["articles", "all"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "published"] });
    },
  });
};

// Atualizar artigo
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ArticleUpdate }) => {
      const { data, error } = await supabase
        .from("articles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: () => {
      // Invalidar apenas queries específicas, não todas
      queryClient.invalidateQueries({ queryKey: ["articles", "all"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "published"] });
    },
  });
};

// Deletar artigo
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidar apenas queries específicas, não todas
      queryClient.invalidateQueries({ queryKey: ["articles", "all"] });
      queryClient.invalidateQueries({ queryKey: ["articles", "published"] });
    },
  });
};

// Contar artigos destacados e publicados (excluindo um artigo específico se fornecido)
export const useFeaturedCount = (excludeArticleId?: string) => {
  return useQuery({
    queryKey: ["articles", "featured", "count", excludeArticleId],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("featured", true)
        .eq("published", true)
        .eq("site_id", SITE_ID);

      if (excludeArticleId) {
        query = query.neq("id", excludeArticleId);
      }

      const { count, error } = await query;

      if (error) throw error;
      return count || 0;
    },
    staleTime: 1 * 60 * 1000, // Cache por 1 minuto
  });
};

