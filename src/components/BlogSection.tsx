import { Button } from "./ui/button";
import { BookOpen, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useArticles } from "@/hooks/useArticles";
import type { Article } from "@/types/article";
import { useNavigate } from "react-router-dom";

/** Texto plano a partir de HTML (descrição do artigo) para resumo no card */
function plainTextFromDescription(html: string, maxLen = 280): string {
  if (!html?.trim()) return "";
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}…`;
}

const BlogSection = () => {
  const { data: articles, isLoading, error } = useArticles();
  const navigate = useNavigate();

  const openArticle = (article: Article) => {
    navigate(`/conteudo/${article.slug || article.id}`);
  };

  return (
    <section className="bg-background py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <AnimatedSection animationType="slide-up">
          <header className="mx-auto mb-16 max-w-4xl text-center sm:mb-20 md:mb-24">
            <div className="mb-6 flex justify-center sm:mb-7">
              <BookOpen
                className="h-14 w-14 text-trust-blue sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
                strokeWidth={1.15}
                aria-hidden
              />
            </div>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.12]">
              Conteúdo sobre seguro de crédito empresarial
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-[1.25rem] md:leading-relaxed">
              Veja os últimos artigos da nossa biblioteca sobre seguro de crédito, Coface e gestão de risco comercial.
            </p>
          </header>
        </AnimatedSection>

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-trust-blue sm:h-12 sm:w-12" />
          </div>
        )}

        {error && (
          <div className="py-20 text-center">
            <p className="mb-2 text-corporate-gray">Erro ao carregar artigos. Tente novamente.</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </p>
          </div>
        )}

        {articles && articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
              {articles.map((article, index) => (
                <AnimatedSection key={article.id} animationType="fade" delay={index * 50}>
                  <article
                    className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-8 shadow-sm transition-shadow duration-200 hover:border-trust-blue/25 hover:shadow-md dark:border-border sm:p-9"
                  >
                    <p className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-trust-blue dark:text-trust-blue-light">
                      {(article.type === "video" ? "Vídeo" : article.category).toUpperCase()}
                    </p>
                    <h3 className="mb-4 line-clamp-3 text-xl font-bold leading-snug text-foreground sm:text-2xl sm:leading-tight">
                      <button
                        type="button"
                        onClick={() => openArticle(article)}
                        className="text-left transition-colors hover:text-trust-blue dark:hover:text-trust-blue-light"
                      >
                        {article.title}
                      </button>
                    </h3>
                    <p className="mb-10 flex-1 text-base leading-relaxed text-muted-foreground line-clamp-4 sm:text-lg">
                      {plainTextFromDescription(article.description)}
                    </p>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-border/70 pt-6 dark:border-border">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm">
                        {article.read_time
                          ? article.read_time.replace(/\s*min\s*/i, " min").trim().toUpperCase()
                          : "—"}
                      </span>
                      <button
                        type="button"
                        onClick={() => openArticle(article)}
                        className="shrink-0 text-base font-semibold text-trust-blue transition-colors hover:text-trust-blue-light sm:text-lg"
                      >
                        Ler artigo →
                      </button>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
            <div className="mt-14 flex justify-center sm:mt-16">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/conteudo")}
                className="h-12 border-2 border-trust-blue/45 px-8 text-base font-semibold text-trust-blue hover:bg-trust-blue/10 hover:text-trust-blue sm:h-14 sm:px-10 sm:text-lg dark:hover:bg-trust-blue/20"
              >
                Ver todos os conteúdos
              </Button>
            </div>
          </>
        )}

        {articles && articles.length === 0 && !isLoading && (
          <p className="py-20 text-center text-muted-foreground">Nenhum artigo disponível no momento.</p>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
