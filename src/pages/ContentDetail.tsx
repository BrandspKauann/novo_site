import { useParams, useNavigate } from "react-router-dom";
import { useArticleBySlug, useAllPublishedArticles } from "@/hooks/useArticles";
import { useArticlePageMeta } from "@/hooks/useArticlePageMeta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2, ArrowRight, BookOpen, Phone, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { findRelatedArticles } from "@/utils/articleRecommendation";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { ArticleLandingContent } from "@/components/article/ArticleLandingContent";
import AnimatedSection from "@/components/AnimatedSection";
import type { Article } from "@/types/article";

function stripHtmlTags(value: string): string {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getProductPathFromArticle(article: Article): string | null {
  const normalizedSlug = (article.slug || "").toLowerCase();
  const normalizedCategory = (article.category || "").toLowerCase();

  if (normalizedSlug.includes("seguro-credito") || normalizedCategory.includes("seguro")) {
    return "/solucoes/seguro-de-credito";
  }

  if (
    normalizedSlug.includes("consulta-dados") ||
    normalizedSlug.includes("dados-empresariais") ||
    normalizedCategory.includes("consulta")
  ) {
    return "/solucoes/consulta-de-dados-empresariais";
  }

  if (normalizedSlug.includes("cobranca-divida") || normalizedCategory.includes("cobran")) {
    return "/solucoes/cobranca-de-divida";
  }

  return null;
}

const ContentDetail = () => {
  const { openSpecialistForm } = useSpecialistContact();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(slug);
  const { data: allArticles } = useAllPublishedArticles();

  useArticlePageMeta(article ?? null, slug);

  const relatedArticles = findRelatedArticles(article, allArticles, 3);
  const productPath = article ? getProductPathFromArticle(article) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-trust-blue" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold text-primary mb-3">Conteúdo não encontrado</h1>
          <p className="text-corporate-gray mb-6">
            O material que você tentou acessar não está disponível ou foi movido.
          </p>
          <Button onClick={() => navigate("/conteudo")}>Voltar aos conteúdos</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="bg-background min-h-screen">
        <div className="bg-gradient-hero py-10 sm:py-14 md:py-16 lg:py-20 relative overflow-hidden">
          {article.image_url && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
              style={{ backgroundImage: `url(${article.image_url})` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-trust-blue via-blue-900/90 to-trust-blue" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50" />

          <div className="absolute inset-0 overflow-hidden hidden sm:block">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Button
              variant="ghost"
              className="text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10 mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              onClick={() => navigate("/conteudo")}
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>

            <AnimatedSection animationType="slide-up">
              <div className="max-w-4xl space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-md text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full inline-flex items-center border border-white/30 shadow-lg">
                  {article.category}
                </span>
                <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/15 backdrop-blur-md rounded-full font-semibold border border-white/20 shadow-lg text-xs sm:text-sm">
                  {article.type === "video" ? "Vídeo" : "Artigo"}
                </div>
                {article.read_time && (
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/15 backdrop-blur-md rounded-full font-semibold border border-white/20 shadow-lg text-xs sm:text-sm">
                    {article.read_time}
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-[2.7rem] lg:text-[3.25rem] xl:text-[3.65rem] font-bold text-primary-foreground leading-[1.18] tracking-[0.01em] normal-case text-balance font-sans">
                {article.title}
              </h1>

              {article.description ? (
                <p className="text-base sm:text-[1.02rem] md:text-[1.12rem] text-primary-foreground/90 leading-relaxed max-w-3xl">
                  {stripHtmlTags(article.description)}
                </p>
              ) : null}

              <p className="text-xs sm:text-sm text-primary-foreground/70">
                <time dateTime={article.updated_at}>
                  Atualizado em{" "}
                  {new Date(article.updated_at).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </p>
            </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 order-1 space-y-9">
              <AnimatedSection animationType="slide-up">
                <div className="mx-auto w-full">
                  {article.content ? (
                    <ArticleLandingContent content={article.content} />
                  ) : (
                    <p className="text-muted-foreground">
                      Este artigo ainda não possui conteúdo completo cadastrado.
                    </p>
                  )}
                </div>
              </AnimatedSection>

              {productPath && (
                <AnimatedSection animationType="slide-up" delay={80}>
                  <div className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => navigate(productPath)}
                    >
                      Conheça nossa solução
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </AnimatedSection>
              )}
            </div>

            <div className="lg:col-span-1 order-2">
              <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-6">
                {article.youtube_iframe && (
                  <AnimatedSection animationType="slide-left">
                    <Card className="border border-border/50 shadow-card">
                    <CardContent className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-trust-blue" />
                        Vídeo
                      </h3>
                      <div
                        className="w-full [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:border-0"
                        dangerouslySetInnerHTML={{ __html: article.youtube_iframe }}
                      />
                    </CardContent>
                  </Card>
                  </AnimatedSection>
                )}

                {relatedArticles.length > 0 && (
                  <AnimatedSection animationType="slide-left" delay={60}>
                    <Card className="border border-border/50 shadow-card">
                    <CardContent className="p-4 sm:p-5">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-trust-blue" />
                        Artigos Relacionados
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {relatedArticles.map((relatedArticle) => (
                          <button
                            key={relatedArticle.id}
                            onClick={() => navigate(`/conteudo/${relatedArticle.slug || relatedArticle.id}`)}
                            className="text-left w-full group hover:bg-muted/50 p-2.5 sm:p-3 rounded-lg transition-colors"
                          >
                            <h4 className="font-semibold text-foreground group-hover:text-trust-blue transition-colors mb-1.5 sm:mb-2 line-clamp-2 text-sm sm:text-base">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {stripHtmlTags(relatedArticle.description)}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5 sm:mt-2 text-xs text-trust-blue">
                              Ler mais
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  </AnimatedSection>
                )}

                <AnimatedSection animationType="slide-left" delay={120}>
                  <Card className="border border-border/50 shadow-card bg-gradient-to-br from-trust-blue/10 to-secondary/10">
                  <CardContent className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                      Precisa de ajuda?
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      Fale com nossos especialistas em Seguro de Crédito e proteja o fluxo de caixa da sua empresa.
                    </p>
                    <div className="space-y-2 sm:space-y-3">
                      <Button
                        onClick={() => openSpecialistForm(`conteudo:${slug ?? ""}`)}
                        className="w-full bg-trust-blue hover:bg-trust-blue-light text-white text-sm sm:text-base h-10 sm:h-11"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Falar com Especialista
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate("/conteudo")}
                        className="w-full text-sm sm:text-base h-10 sm:h-11"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Ver mais conteúdos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                </AnimatedSection>

                <AnimatedSection animationType="slide-left" delay={180}>
                  <Card className="border border-border/50 shadow-card">
                  <CardContent className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                      Links Úteis
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <button
                        onClick={() => navigate("/")}
                        className="w-full text-left text-xs sm:text-sm text-muted-foreground hover:text-trust-blue transition-colors py-1.5 sm:py-2 flex items-center justify-between group"
                      >
                        <span>Página Inicial</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button
                        onClick={() => navigate("/conteudo")}
                        className="w-full text-left text-xs sm:text-sm text-muted-foreground hover:text-trust-blue transition-colors py-1.5 sm:py-2 flex items-center justify-between group"
                      >
                        <span>Todos os conteúdos</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                      {article.external_url && (
                        <a
                          href={article.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left text-xs sm:text-sm text-muted-foreground hover:text-trust-blue transition-colors py-1.5 sm:py-2 flex items-center justify-between group"
                        >
                          <span>Link Externo</span>
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 group-hover:opacity-100 transition-all" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default ContentDetail;
