import { useParams, useNavigate } from "react-router-dom";
import { useArticleBySlug, useAllPublishedArticles } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Loader2, ArrowRight, BookOpen, Phone, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { findRelatedArticles } from "@/utils/articleRecommendation";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { ArticleMarkdown } from "@/components/article/ArticleMarkdown";

/** Prose para HTML legado — alinhado visualmente ao markdown novo */
const articleHtmlProseClass =
  "article-html-content max-w-none text-muted-foreground " +
  "[&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:first:mt-0 sm:[&_h1]:text-3xl " +
  "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-3 [&_h2]:border-b [&_h2]:border-border/80 [&_h2]:pb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground sm:[&_h2]:text-2xl " +
  "[&_h2]:before:inline-block [&_h2]:before:h-8 [&_h2]:before:w-1 [&_h2]:before:shrink-0 [&_h2]:before:rounded-full [&_h2]:before:bg-gradient-to-b [&_h2]:before:from-trust-blue [&_h2]:before:to-trust-blue-light " +
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground sm:[&_h3]:text-xl " +
  "[&_p]:mb-5 [&_p]:text-base [&_p]:leading-[1.75] sm:[&_p]:text-[1.0625rem] " +
  "[&_strong]:font-semibold [&_strong]:text-foreground " +
  "[&_blockquote]:relative [&_blockquote]:my-8 [&_blockquote]:overflow-hidden [&_blockquote]:rounded-2xl [&_blockquote]:border [&_blockquote]:border-trust-blue/20 [&_blockquote]:bg-gradient-to-br [&_blockquote]:from-trust-blue/[0.06] [&_blockquote]:via-muted/30 [&_blockquote]:to-secondary/[0.08] [&_blockquote]:px-5 [&_blockquote]:py-6 [&_blockquote]:text-foreground/95 " +
  "[&_ul]:my-6 [&_ul]:space-y-2 [&_ul]:pl-4 [&_ul]:marker:text-trust-blue " +
  "[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:marker:font-semibold [&_ol]:marker:text-trust-blue " +
  "[&_a]:font-medium [&_a]:text-trust-blue [&_a]:underline [&_a]:decoration-trust-blue/30 [&_a]:underline-offset-4 " +
  "[&_code]:rounded-md [&_code]:border [&_code]:border-border/80 [&_code]:bg-primary/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-trust-blue " +
  "[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border/80 [&_pre]:bg-muted/60 [&_pre]:p-4 [&_pre]:text-sm " +
  "[&_table]:my-8 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-border/60 " +
  "[&_th]:bg-muted/70 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider " +
  "[&_td]:border-t [&_td]:border-border/60 [&_td]:px-4 [&_td]:py-3 " +
  "[&_hr]:my-10 [&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-border [&_hr]:to-transparent " +
  "[&_img]:my-8 [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:border [&_img]:border-border/50 [&_img]:shadow-lg " +
  "[&_iframe]:my-8 [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:max-w-3xl [&_iframe]:rounded-xl [&_iframe]:border [&_iframe]:border-border/50";

const ContentDetail = () => {
  const { openSpecialistForm } = useSpecialistContact();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(slug);
  const { data: allArticles } = useAllPublishedArticles();

  // Buscar artigos relacionados usando sistema inteligente de recomendação
  const relatedArticles = findRelatedArticles(article, allArticles, 3);

  const renderContent = () => {
    if (!article?.content) {
      return (
        <p className="text-corporate-gray">
          Este artigo ainda não possui conteúdo completo cadastrado.
        </p>
      );
    }

    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(article.content);

    // Se contém HTML, renderiza como HTML (para compatibilidade)
    if (looksLikeHtml && !article.content.includes("```") && !article.content.match(/^#{1,6}\s/)) {
      return (
        <div className={articleHtmlProseClass} dangerouslySetInnerHTML={{ __html: article.content }} />
      );
    }

    return <ArticleMarkdown content={article.content} />;
  };

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
      <div className="bg-gradient-hero py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background image com opacidade */}
        {article.image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{ backgroundImage: `url(${article.image_url})` }}
          />
        )}
        
        {/* Overlay escuro com degradê para melhorar legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-trust-blue via-blue-900/90 to-trust-blue" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/50" />
        
        {/* Decorative elements - ocultos no mobile para melhor performance */}
        <div className="absolute inset-0 overflow-hidden hidden sm:block">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
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

          <div className="max-w-4xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
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
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight tracking-tight mb-4 sm:mb-6">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 order-1">
            {article.image_url && (
              <div className="mb-4 sm:mb-6 md:mb-8 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted shadow-card" style={{ aspectRatio: '8/3' }}>
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-card sm:rounded-2xl sm:p-6 md:p-8 lg:p-12">
              {renderContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-2">
            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-6">
              {/* Vídeo do YouTube se existir */}
              {article.youtube_iframe && (
                <Card className="border border-border/50 shadow-card">
                  <CardContent className="p-4 sm:p-6">
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
              )}

              {/* Artigos Relacionados */}
              {relatedArticles.length > 0 && (
                <Card className="border border-border/50 shadow-card">
                  <CardContent className="p-4 sm:p-6">
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
                            {relatedArticle.description}
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
              )}

              {/* CTA de Contato */}
              <Card className="border border-border/50 shadow-card bg-gradient-to-br from-trust-blue/10 to-secondary/10">
                <CardContent className="p-4 sm:p-6">
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

              {/* Links Úteis */}
              <Card className="border border-border/50 shadow-card">
                <CardContent className="p-4 sm:p-6">
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

