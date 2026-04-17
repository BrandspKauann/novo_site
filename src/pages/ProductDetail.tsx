import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { PRODUCTS, PRODUCTS_BY_SLUG, type ProductSlug } from "@/config/products";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { useStaticPageMeta } from "@/hooks/useStaticPageMeta";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: ProductSlug }>();
  const navigate = useNavigate();
  const { openSpecialistForm } = useSpecialistContact();

  const product = slug ? PRODUCTS_BY_SLUG[slug] : undefined;

  const otherProducts = useMemo(
    () => PRODUCTS.filter((item) => item.slug !== slug).slice(0, 2),
    [slug],
  );

  useStaticPageMeta({
    title: product ? `${product.seoTitle} | Hirayama Seguros` : "Soluções | Hirayama Seguros",
    description: product ? product.seoDescription : "Conheça as soluções da Hirayama Seguros.",
    canonicalPath: product ? `/solucoes/${product.slug}` : "/solucoes",
    image: product?.image,
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            A página solicitada não existe ou foi movida.
          </p>
          <Button onClick={() => navigate("/")}>Voltar para a home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-gradient-hero">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${product.image})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--primary)_/_0.96)_0%,hsl(var(--primary)_/_0.88)_36%,hsl(var(--trust-blue)_/_0.72)_100%)]" />
          <div className="container relative z-10 mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
            <Button
              variant="ghost"
              className="mb-6 text-primary-foreground/90 hover:bg-white/10 hover:text-primary-foreground"
              onClick={() => navigate("/#servicos")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para soluções
            </Button>

            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <AnimatedSection animationType="slide-up">
                <div className="max-w-3xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                    {product.heroEyebrow}
                  </p>
                  <h1 className="mb-5 text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-[3.2rem]">
                    {product.heroTitle}
                  </h1>
                  <p className="mb-6 text-sm leading-relaxed text-primary-foreground/90 sm:text-[0.98rem] md:text-[1.04rem]">
                    {product.heroDescription}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.heroHighlights.slice(0, 2).map((item) => (
                      <div
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animationType="scale" delay={100}>
                <Card className="border-white/10 bg-white/10 text-primary-foreground shadow-2xl backdrop-blur-sm">
                  <CardContent className="p-5 sm:p-7">
                    <h2 className="mb-5 text-[1.35rem] font-semibold sm:text-[1.55rem]">Por que avaliar agora</h2>
                    <div className="space-y-5">
                      {product.metrics.slice(0, 2).map((metric) => (
                        <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/10 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/65">
                            {metric.label}
                          </p>
                          <p className="mt-2 text-[1.4rem] font-bold text-secondary sm:text-[1.65rem]">{metric.value}</p>
                          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                            {metric.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container mx-auto grid gap-7 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              {product.sections.map((section, index) => (
                <AnimatedSection key={section.title} animationType="slide-up" delay={index * 60}>
                  <Card className="border border-border/60 bg-card/80 shadow-card">
                    <CardContent className="p-5 sm:p-7 md:p-8">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-trust-blue">
                        {section.eyebrow}
                      </p>
                      <h2 className="mb-4 text-[1.45rem] font-bold leading-tight text-foreground sm:text-[1.8rem]">
                        {section.title}
                      </h2>
                      <div className="space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-[0.98rem] leading-7 text-muted-foreground sm:text-[1.02rem]">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {section.bullets?.length ? (
                        <div className="mt-8 grid gap-3 sm:grid-cols-2">
                          {section.bullets.map((bullet) => (
                            <div
                              key={bullet}
                              className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/30 px-4 py-4"
                            >
                              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-trust-blue" />
                              <span className="text-sm leading-6 text-foreground/90 sm:text-[0.98rem]">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}

              <AnimatedSection animationType="slide-up" delay={120}>
                <Card className="border border-border/60 shadow-card">
                  <CardContent className="p-5 sm:p-7">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-trust-blue">
                      Perguntas frequentes
                    </p>
                    <h2 className="mb-4 text-[1.45rem] font-bold text-foreground sm:text-[1.8rem]">
                      Dúvidas comuns sobre {product.shortTitle}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {product.faq.map((item, index) => (
                        <AccordionItem key={item.question} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left text-[0.98rem] font-semibold text-foreground hover:no-underline sm:text-base">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-[0.98rem] leading-7 text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <AnimatedSection animationType="scale">
                <Card className="border border-border/60 bg-gradient-to-br from-trust-blue/10 to-secondary/10 shadow-card">
                  <CardContent className="p-5">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-trust-blue">
                      Próximo passo
                    </p>
                    <h3 className="mb-3 text-[1.45rem] font-bold text-foreground">
                      Conheça nosso produto {product.shortTitle}
                    </h3>
                    <p className="mb-5 text-sm leading-6 text-muted-foreground">
                      Fale com um especialista para avaliar aderência, cenário da sua carteira e próximos passos.
                    </p>
                    <div className="space-y-3">
                      <Button
                        className="w-full min-h-12 whitespace-normal text-center leading-5"
                        size="lg"
                        onClick={() => openSpecialistForm(product.ctaSource)}
                      >
                        <span className="flex-1">Conhecer {product.shortTitle}</span>
                        <Phone className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full min-h-12 whitespace-normal text-center leading-5"
                        onClick={() => navigate("/conteudo")}
                      >
                        <span className="flex-1">Ver conteúdos relacionados</span>
                        <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animationType="slide-left" delay={120}>
                <Card className="border border-border/60 shadow-card">
                  <CardContent className="p-5">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-trust-blue">
                      Outras soluções
                    </p>
                    <div className="space-y-4">
                      {otherProducts.slice(0, 1).map((item) => (
                        <button
                          key={item.slug}
                          onClick={() => navigate(`/solucoes/${item.slug}`)}
                          className="w-full rounded-2xl border border-border/50 p-4 text-left transition-colors hover:bg-muted/40"
                        >
                          <h4 className="text-base font-semibold text-foreground">{item.shortTitle}</h4>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {item.cardDescription}
                          </p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
