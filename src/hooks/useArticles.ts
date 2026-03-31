import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Article } from "@/types/article";
import { SITE_ID } from "@/config/site";

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
        .order("featured", { ascending: false })
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
