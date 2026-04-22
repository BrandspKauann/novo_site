import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useArticleBySlug, useAllPublishedArticles } from "@/hooks/useArticles";
import { useArticlePageMeta } from "@/hooks/useArticlePageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Clock,
  Calendar,
  Loader2,
  Phone,
  Share2,
  Tag,
  ArrowRight,
  Folder,
  Mail,
  Link2,
} from "lucide-react";
import { SiWhatsapp, SiFacebook, SiTelegram } from "react-icons/si";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { findRelatedArticles } from "@/utils/articleRecommendation";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { ArticleLandingContent } from "@/components/article/ArticleLandingContent";
import { useToast } from "@/hooks/use-toast";
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
  const slug = (article.slug || "").toLowerCase();
  const cat = (article.category || "").toLowerCase();
  if (slug.includes("seguro-credito") || cat.includes("seguro"))
    return "/solucoes/seguro-de-credito";
  if (slug.includes("consulta-dados") || slug.includes("dados-empresariais") || cat.includes("consulta"))
    return "/solucoes/consulta-de-dados-empresariais";
  if (slug.includes("cobranca-divida") || cat.includes("cobran"))
    return "/solucoes/cobranca-de-divida";
  return null;
}

const ContentDetail = () => {
  const { openSpecialistForm, openNewsletterForm } = useSpecialistContact();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(slug);
  const { data: allArticles } = useAllPublishedArticles();

  useArticlePageMeta(article ?? null, slug);

  const relatedArticles = findRelatedArticles(article, allArticles, 3);
  const productPath = article ? getProductPathFromArticle(article) : null;

  const { toast } = useToast();

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = article?.title ?? "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const [canNativeShare, setCanNativeShare] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [shareMenuReady, setShareMenuReady] = useState(true);
  const shareMenuOpenedByPointer = useRef(false);

  useEffect(() => {
    if (typeof navigator === "undefined" || typeof window === "undefined") return;
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(navigator.userAgent) ||
      (typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches);
    setCanNativeShare(typeof navigator.share === "function" && isMobile);
  }, []);

  const openShare = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareTitle,
        url: shareUrl,
      });
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      toast({
        title: "Não foi possível compartilhar",
        description: "Tente novamente em instantes.",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copiado", description: "O link do artigo foi copiado para a área de transferência." });
    } catch {
      toast({ title: "Não foi possível copiar", description: "Tente novamente ou copie a URL manualmente.", variant: "destructive" });
    }
  };

  const handleShareMenuOpenChange = (nextOpen: boolean) => {
    setShareMenuOpen(nextOpen);

    if (!nextOpen) {
      setShareMenuReady(true);
      shareMenuOpenedByPointer.current = false;
      return;
    }

    if (!shareMenuOpenedByPointer.current) {
      setShareMenuReady(true);
      return;
    }

    setShareMenuReady(false);

    const releasePointerLock = () => {
      setShareMenuReady(true);
      shareMenuOpenedByPointer.current = false;
      window.removeEventListener("pointerup", releasePointerLock);
      window.removeEventListener("mouseup", releasePointerLock);
      window.removeEventListener("touchend", releasePointerLock);
    };

    window.addEventListener("pointerup", releasePointerLock, { once: true });
    window.addEventListener("mouseup", releasePointerLock, { once: true });
    window.addEventListener("touchend", releasePointerLock, { once: true });
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

  const formattedDate = new Date(article.updated_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const cleanDescription = stripHtmlTags(article.description);
  const categoryLabel = article.category;

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Header />

      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="bg-background border-b border-border"
      >
        <div className="container mx-auto px-4 py-3.5">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link to="/" className="hover:text-trust-blue transition-colors" data-testid="breadcrumb-home">
                Início
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <li>
              <Link to="/conteudo" className="hover:text-trust-blue transition-colors" data-testid="breadcrumb-conteudo">
                Conteúdo
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <li className="text-foreground font-medium truncate max-w-[40ch]" aria-current="page">
              {article.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Main 2-column layout ──────────────────────────────── */}
      <main className="flex-1 py-8 sm:py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ═════ ARTICLE COLUMN ═════ */}
            <article className="lg:col-span-8 bg-background rounded-xl border border-border shadow-sm overflow-hidden">
              {/* Featured image */}
              {article.image_url && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-5 sm:p-8 lg:p-10">
                {/* Category + meta */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
                  <Badge
                    onClick={() => productPath && navigate(productPath)}
                    className="bg-trust-blue/10 text-trust-blue hover:bg-trust-blue/15 border-0 cursor-pointer font-semibold uppercase tracking-wide text-[0.7rem] px-2.5 py-1"
                    data-testid="badge-category"
                  >
                    <Folder className="h-3 w-3 mr-1.5" />
                    {categoryLabel}
                  </Badge>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={article.updated_at}>{formattedDate}</time>
                  </span>
                  {article.read_time && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {article.read_time} de leitura
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1
                  className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-foreground leading-[1.2] tracking-tight normal-case mb-4"
                  data-testid="text-article-title"
                >
                  {article.title}
                </h1>

                {/* Lead / description */}
                {cleanDescription && (
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                    {cleanDescription}
                  </p>
                )}

                {/* Author + share row */}
                <div className="flex items-center justify-between gap-4 py-4 border-y border-border mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-trust-blue to-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      H
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight">
                        Equipe Hirayama
                      </p>
                      <p className="text-xs text-muted-foreground sm:hidden">{formattedDate}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        Especialistas em proteção de crédito B2B
                      </p>
                    </div>
                  </div>
                  {canNativeShare ? (
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid="button-share"
                      className="gap-1.5 shrink-0"
                      onClick={handleNativeShare}
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Compartilhar</span>
                    </Button>
                  ) : (
                  <DropdownMenu open={shareMenuOpen} onOpenChange={handleShareMenuOpenChange}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        data-testid="button-share"
                        className="gap-1.5 shrink-0"
                        onPointerDown={() => {
                          shareMenuOpenedByPointer.current = true;
                        }}
                        onKeyDown={() => {
                          shareMenuOpenedByPointer.current = false;
                        }}
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Compartilhar</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className={`w-56 ${shareMenuReady ? "" : "pointer-events-none"}`}
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          openShare(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`)
                        }
                        data-testid="share-whatsapp"
                        className="gap-2.5 cursor-pointer"
                      >
                        <SiWhatsapp className="h-4 w-4 text-[#25D366]" />
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)
                        }
                        data-testid="share-linkedin"
                        className="gap-2.5 cursor-pointer"
                      >
                        <FaLinkedinIn className="h-4 w-4 text-[#0A66C2]" />
                        LinkedIn
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          openShare(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`)
                        }
                        data-testid="share-twitter"
                        className="gap-2.5 cursor-pointer"
                      >
                        <FaXTwitter className="h-4 w-4 text-foreground" />
                        X (Twitter)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          openShare(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
                        }
                        data-testid="share-facebook"
                        className="gap-2.5 cursor-pointer"
                      >
                        <SiFacebook className="h-4 w-4 text-[#1877F2]" />
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          openShare(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`)
                        }
                        data-testid="share-telegram"
                        className="gap-2.5 cursor-pointer"
                      >
                        <SiTelegram className="h-4 w-4 text-[#26A5E4]" />
                        Telegram
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          openShare(
                            `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`,
                          )
                        }
                        data-testid="share-email"
                        className="gap-2.5 cursor-pointer"
                      >
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        E-mail
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleCopyLink}
                        data-testid="share-copy-link"
                        className="gap-2.5 cursor-pointer"
                      >
                        <Link2 className="h-4 w-4 text-muted-foreground" />
                        Copiar link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  )}
                </div>

                {/* Body */}
                {article.content ? (
                  <ArticleLandingContent content={article.content} />
                ) : (
                  <p className="text-muted-foreground text-center py-12">
                    Este artigo ainda não possui conteúdo completo cadastrado.
                  </p>
                )}

                {article.youtube_iframe && (
                  <div
                    className="mt-8 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: article.youtube_iframe }}
                  />
                )}

                {/* Final CTA — compact, single button to specific product */}
                {productPath && (
                  <aside
                    data-testid="cta-final-produto"
                    className="mt-10 rounded-xl border border-trust-blue/20 bg-trust-blue/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-trust-blue mb-1">
                        Próximo passo
                      </p>
                      <h3 className="text-base sm:text-lg font-bold text-foreground normal-case leading-snug">
                        Quer aplicar isso na sua empresa?
                      </h3>
                    </div>
                    <Button
                      onClick={() => navigate(productPath)}
                      data-testid="cta-final-ver-produto"
                      className="bg-trust-blue hover:bg-trust-blue-light text-white font-semibold shrink-0 group"
                    >
                      Conhecer {categoryLabel}
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </aside>
                )}

                {/* Tags-like footer */}
                <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
                    <Tag className="h-3.5 w-3.5" />
                    Tópico:
                  </span>
                  <Badge
                    variant="outline"
                    onClick={() => productPath && navigate(productPath)}
                    className="cursor-pointer hover:bg-muted font-normal"
                    data-testid="tag-category"
                  >
                    {categoryLabel}
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    Hirayama
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    Crédito B2B
                  </Badge>
                </div>
              </div>
            </article>

            {/* ═════ SIDEBAR ═════ */}
            <aside className="lg:col-span-4 space-y-6">
              {/* CTA card */}
              <div className="bg-background rounded-xl border border-border shadow-sm p-6">
                <div className="h-10 w-10 rounded-lg bg-trust-blue/10 flex items-center justify-center mb-4">
                  <Phone className="h-5 w-5 text-trust-blue" />
                </div>
                <h3 className="font-bold text-foreground text-lg leading-tight mb-2 normal-case">
                  Precisa de ajuda?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Fale com um especialista da Hirayama e descubra como aplicar essa solução na sua
                  empresa.
                </p>
                <Button
                  onClick={() => openSpecialistForm(`conteudo:${slug ?? ""}`)}
                  data-testid="cta-fale-especialista"
                  className="w-full bg-trust-blue hover:bg-trust-blue-light text-white font-semibold"
                >
                  Falar com Especialista
                </Button>
                {productPath && (
                  <Button
                    variant="ghost"
                    onClick={() => navigate(productPath)}
                    data-testid="cta-product-page"
                    className="w-full mt-2 text-trust-blue hover:text-trust-blue-light hover:bg-trust-blue/5"
                  >
                    Ver {categoryLabel}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Related posts list */}
              {relatedArticles.length > 0 && (
                <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
                  <div className="px-6 pt-6 pb-4 border-b border-border bg-gradient-to-br from-trust-blue/5 to-transparent">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-trust-blue">
                      Continue lendo
                    </p>
                    <h3 className="text-base font-bold text-foreground mt-1 normal-case">
                      Mais artigos para você
                    </h3>
                  </div>
                  <ul>
                    {relatedArticles.map((rel, idx) => (
                      <li key={rel.id} className="border-b border-border last:border-b-0">
                        <button
                          onClick={() => navigate(`/conteudo/${rel.slug || rel.id}`)}
                          data-testid={`sidebar-related-${rel.id}`}
                          className="w-full text-left px-6 py-4 flex gap-4 group hover:bg-muted/40 transition-colors"
                        >
                          <div className="shrink-0 flex flex-col items-center">
                            <span className="font-bold text-trust-blue/30 group-hover:text-trust-blue transition-colors text-2xl leading-none tabular-nums">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 space-y-1.5">
                            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-trust-blue transition-colors">
                              {rel.category}
                            </p>
                            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-3 group-hover:text-trust-blue transition-colors normal-case">
                              {rel.title}
                            </p>
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-trust-blue opacity-0 group-hover:opacity-100 transition-opacity">
                              Ler artigo
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-6 py-4 bg-muted/30">
                    <Link
                      to="/conteudo"
                      data-testid="sidebar-link-todos"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-trust-blue hover:text-trust-blue-light"
                    >
                      Ver todos os artigos
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Newsletter-style mini card */}
              <div className="bg-primary text-primary-foreground rounded-xl shadow-sm p-6">
                <div className="h-10 w-10 rounded-lg bg-secondary/20 flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="font-bold text-base mb-2 normal-case">
                  Receba conteúdos exclusivos
                </h3>
                <p className="text-sm text-primary-foreground/75 leading-relaxed mb-4">
                  Materiais sobre proteção de crédito, inadimplência e gestão de risco direto da
                  Hirayama.
                </p>
                <Button
                  onClick={() => openNewsletterForm(`newsletter-sidebar:${slug ?? ""}`)}
                  data-testid="cta-newsletter"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold"
                >
                  Quero receber
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* ── Related grid (full width below) ──────────────────── */}
      {relatedArticles.length > 0 && (
        <section className="bg-background border-t border-border py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-trust-blue mb-1.5">
                  Continue lendo
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground normal-case">
                  Posts relacionados
                </h2>
              </div>
              <Link
                to="/conteudo"
                data-testid="link-todos-conteudos"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-trust-blue hover:text-trust-blue-light"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => navigate(`/conteudo/${rel.slug || rel.id}`)}
                  data-testid={`grid-related-${rel.id}`}
                  className="group text-left bg-background rounded-xl border border-border p-6 hover:shadow-md hover:border-trust-blue/40 transition-all duration-300 flex flex-col gap-3"
                >
                  <Badge className="self-start bg-trust-blue/10 text-trust-blue hover:bg-trust-blue/10 border-0 font-semibold text-[0.65rem] uppercase tracking-wider">
                    {rel.category}
                  </Badge>
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-trust-blue transition-colors normal-case leading-snug line-clamp-3">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                    {stripHtmlTags(rel.description)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-trust-blue group-hover:gap-2 transition-all pt-2 mt-auto border-t border-border pt-3">
                    Ler artigo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ContentDetail;
