import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, ArrowRight, Shield, Database, TrendingUp, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "@/config/products";

const services = [
  {
    ...PRODUCTS[0],
    iconComponent: <Shield className="h-8 w-8 text-trust-blue" />,
    stage: "Durante a venda a prazo",
    idealFor: "Empresas que querem crescer sem assumir exposição excessiva por cliente.",
  },
  {
    ...PRODUCTS[1],
    iconComponent: <Database className="h-8 w-8 text-trust-blue" />,
    stage: "Antes de aprovar o negócio",
    idealFor: "Empresas que precisam validar clientes, fornecedores e parceiros com mais profundidade.",
  },
  {
    ...PRODUCTS[2],
    iconComponent: <TrendingUp className="h-8 w-8 text-trust-blue" />,
    stage: "Depois que o atraso aparece",
    idealFor: "Empresas com recebíveis vencidos que não querem travar o time interno com cobrança.",
  },
];

const solutionFlow = [
  {
    title: "Avalie a empresa antes de assumir risco",
    description:
      "Use Consulta de Dados Empresariais para entender histórico, solidez e sinais de risco antes de conceder prazo ou fechar com um fornecedor crítico.",
  },
  {
    title: "Proteja a operação quando a venda é a prazo",
    description:
      "Use Seguro de Crédito para estruturar limite, monitoramento da carteira e proteção financeira contra não pagamento coberto pela apólice.",
  },
  {
    title: "Recupere caixa quando o atraso já existe",
    description:
      "Use Cobrança de Dívida para profissionalizar a recuperação, preservar energia do time e agir com método no Brasil e no exterior.",
  },
];

const ServicesSection = () => {
  const { openSpecialistForm } = useSpecialistContact();
  const navigate = useNavigate();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: "0px 0px -15% 0px",
    triggerOnce: false,
  });

  return (
    <section id="servicos" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-16 max-w-5xl text-center sm:mb-20 md:mb-24">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
              Soluções principais
            </p>
            <h2 className="mb-6 text-3xl font-bold text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              O site precisa explicar claramente qual problema cada produto resolve
            </h2>
            <p className="text-lg leading-relaxed text-corporate-gray sm:text-xl md:text-2xl">
              A proposta da Hirayama não é vender só uma apólice. É ajudar a empresa a decidir melhor, vender com mais
              segurança e agir rápido quando o atraso já bateu no caixa.
            </p>
          </div>
        </AnimatedSection>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 lg:items-stretch">
          {services.map((service, index) => (
            <AnimatedSection key={service.slug} animationType="scale" delay={index * 75}>
              <Card className="h-full border border-border/60 bg-gradient-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-premium">
                <CardContent className="flex h-full flex-col p-6 sm:p-8">
                  <div className="mb-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div className="rounded-2xl bg-trust-blue/10 p-4">{service.iconComponent}</div>
                      <span className="rounded-full border border-trust-blue/20 bg-trust-blue/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-trust-blue">
                        {service.stage}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-primary sm:text-2xl">{service.title}</h3>
                    <p className="text-sm leading-7 text-corporate-gray sm:text-base">{service.cardDescription}</p>
                  </div>

                  <div className="mb-6 rounded-2xl border border-border/50 bg-background/80 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-trust-blue">
                      Ideal para
                    </p>
                    <p className="text-sm leading-6 text-foreground/85 sm:text-base">{service.idealFor}</p>
                  </div>

                  <div className="mb-8 flex-grow">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-trust-blue">
                      O que você ganha
                    </p>
                    <ul className="space-y-3">
                      {service.cardFeatures.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-corporate-gray sm:text-base">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-trust-blue" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full shadow-md hover:shadow-lg group/btn"
                    onClick={() => navigate(`/solucoes/${service.slug}`)}
                  >
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animationType="slide-up" delay={120}>
          <Card className="mb-16 border border-border/60 bg-muted/30 shadow-card">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="mx-auto max-w-4xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
                  Como essas soluções se conectam
                </p>
                <h3 className="mb-5 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                  Em muitas operações, o melhor resultado vem da combinação entre prevenção, informação e recuperação
                </h3>
                <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                  A própria lógica global da Coface conecta informação de risco, cobrança e proteção financeira. Na
                  prática, isso significa atuar antes da venda, durante a exposição e depois do atraso, em vez de reagir
                  tarde demais.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {solutionFlow.map((item, index) => (
                  <div key={item.title} className="rounded-2xl border border-border/50 bg-card px-5 py-5 shadow-sm">
                    <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-trust-blue/10 text-sm font-bold text-trust-blue">
                      {index + 1}
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm leading-6 text-muted-foreground sm:text-base">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <div
          ref={ctaRef}
          className={`relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-center shadow-premium scroll-animate-fade sm:p-10 md:p-12 ${ctaVisible ? "visible" : ""}`}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <h3 className="mb-4 text-2xl font-bold text-primary-foreground sm:text-3xl md:text-4xl">
              Não sabe por onde começar?
            </h3>
            <p className="mb-6 text-base leading-relaxed text-primary-foreground/90 sm:text-lg md:text-xl">
              Nós avaliamos seu cenário comercial e indicamos se a prioridade agora é proteger vendas a prazo, consultar
              empresas com mais profundidade ou atacar recebíveis em atraso.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="hero"
                size="lg"
                onClick={() => openSpecialistForm("servicos_cta")}
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl"
              >
                Falar com Especialista
                <Phone className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/70 bg-white/5 text-white hover:bg-white/10"
                onClick={() => navigate("/solucoes/seguro-de-credito")}
              >
                Ver exemplo de solução
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
