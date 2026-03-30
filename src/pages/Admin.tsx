import { useState, useCallback } from "react";
import { useAllArticles, useDeleteArticle } from "@/hooks/useArticles";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArticleList } from "@/components/admin/ArticleList";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import type { Article } from "@/types/article";
import { toast } from "@/components/ui/sonner";
import { SITE_ID } from "@/config/site";

const Admin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { data: articles, isLoading, refetch } = useAllArticles(SITE_ID);
  const deleteArticle = useDeleteArticle();

  // Memoizar handlers para evitar recriação
  const handleEdit = useCallback((article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) {
      return;
    }

    try {
      await deleteArticle.mutateAsync(id);
      toast.success("Artigo excluído com sucesso!");
      refetch();
    } catch (error) {
      console.error("Erro ao excluir artigo:", error);
      toast.error("Erro ao excluir artigo. Tente novamente.");
    }
  }, [deleteArticle, refetch]);

  const handleNewArticle = useCallback(() => {
    setEditingArticle(null);
    setShowForm(true);
  }, []);

  // Não chamar refetch automaticamente ao fechar - apenas quando necessário
  const handleFormClose = useCallback(() => {
    setShowForm(false);
    setEditingArticle(null);
    // Refetch apenas quando necessário (após salvar/deletar)
  }, []);

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Gerenciar artigos</h1>
            <p className="text-corporate-gray mt-2">
              Seguros de Crédito · conteúdo publicado no site e em /conteudo
            </p>
          </div>
          <Button
            onClick={handleNewArticle}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Artigo
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-trust-blue" />
          </div>
        ) : (
          <ArticleList
            articles={articles || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <Dialog open={showForm} onOpenChange={handleFormClose}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingArticle ? "Editar Artigo" : "Novo Artigo"}
              </DialogTitle>
            </DialogHeader>
            <ArticleForm article={editingArticle || undefined} onClose={handleFormClose} />
          </DialogContent>
        </Dialog>
      </div>

      {import.meta.env.DEV && (
        <div className="container mx-auto px-4 pb-8">
          <div className="rounded-xl border border-dashed border-amber-500/50 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-950 dark:border-amber-500/30 dark:bg-amber-950/25 dark:text-amber-50">
            <strong className="font-semibold">Modo dev — qual Supabase?</strong> Este build fala com{" "}
            <code className="rounded-md bg-white/70 px-1.5 py-0.5 font-mono text-[0.7rem] dark:bg-black/40">
              {(() => {
                const raw = import.meta.env.VITE_SUPABASE_URL as string | undefined;
                if (!raw?.trim()) return "VITE_SUPABASE_URL ausente no .env";
                try {
                  return new URL(raw).host;
                } catch {
                  return raw;
                }
              })()}
            </code>
            . Se o erro for <code className="px-0.5">site_id</code> no schema cache, abra o{" "}
            <strong>mesmo</strong> projeto no Dashboard (Settings → API → URL) e rode o SQL da migration{" "}
            <code className="px-0.5">010_ensure_articles_site_id.sql</code> no SQL Editor; depois{" "}
            <code className="px-0.5">NOTIFY pgrst, 'reload schema';</code>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Admin;

