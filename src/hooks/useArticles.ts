import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article, ArticleInsert, ArticleUpdate } from "@/types/article";
import { SITE_ID } from "@/config/site";

// Home "Conteúdo Educativo": publicados deste site, até 6 (destaques primeiro, depois os mais recentes)
export const useArticles = () => {
  return useQuery({
    queryKey: ["articles", "published", "home", SITE_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .eq("site_id", SITE_ID)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data as Article[];
    },
    staleTime: 5 * 60 * 1000,
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

// Buscar todos os artigos (para admin - inclui não publicados), filtrado por site_id
export const useAllArticles = (siteId: string) => {
  return useQuery({
    queryKey: ["articles", "all", siteId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("site_id", siteId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });
};

// Criar novo artigo (site_id do admin sobrescreve o padrão do build)
export const useCreateArticle = (siteId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: ArticleInsert) => {
      const articleWithSiteId = { ...article, site_id: article.site_id || siteId };
      const { data, error } = await supabase
        .from("articles")
        .insert([articleWithSiteId])
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: () => {
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
export const useFeaturedCount = (
  excludeArticleId?: string,
  siteId: string = SITE_ID
) => {
  return useQuery({
    queryKey: ["articles", "featured", "count", siteId, excludeArticleId],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("featured", true)
        .eq("published", true)
        .eq("site_id", siteId);

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

