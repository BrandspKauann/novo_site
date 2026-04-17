import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "@/config/products";

const services = [
  {
    ...PRODUCTS[0],
    stage: "Durante a venda a prazo",
    idealFor: "Para quem vende a prazo e quer mais controle.",
  },
  {
    ...PRODUCTS[1],
    stage: "Antes de aprovar o negócio",
    idealFor: "Para validar empresas antes de assumir risco.",
  },
  {
    ...PRODUCTS[2],
    stage: "Depois que o atraso aparece",
    idealFor: "Para recuperar caixa sem travar o time.",
  },
];

const ServicesSection = () => {
  const { openSpecialistForm } = useSpecialistContact();
  const navigate = useNavigate();
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation({
    triggerOnce: false,
  });

  return (
    <section
      id="servicos"
      className="py-14 sm:py-16 md:py-20 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-12 max-w-5xl text-center sm:mb-16 md:mb-20">
            <h2 className="mb-4 text-[1.35rem] font-bold text-primary sm:text-[1.6rem] md:text-[1.75rem] lg:text-[1.9rem]">
              Três soluções para cada etapa
            </h2>
            <p className="text-sm leading-relaxed text-corporate-gray sm:text-base md:text-[1.05rem]">
              Decidir melhor, vender com mais segurança e agir rápido no atraso.
            </p>
          </div>
        </AnimatedSection>

        <div className="mb-14 grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3 lg:items-stretch">
          {services.map((service, index) => (
            <AnimatedSection key={service.slug} animationType="scale" delay={index * 75}>
              <Card className="h-full border border-primary/40 bg-gradient-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/70 hover:shadow-premium">
                <CardContent className="flex h-full flex-col p-5 sm:p-7">
                  <div className="mb-6">
                    <div className="mb-4">
                      <span className="inline-flex rounded-full border border-trust-blue/20 bg-trust-blue/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-trust-blue">
                        {service.stage}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-primary sm:text-[1.45rem]">{service.title}</h3>
                    <p className="text-sm leading-6 text-corporate-gray">{service.cardDescription}</p>
                  </div>

                  <div className="mb-6 rounded-2xl border border-border/50 bg-background/80 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-trust-blue">
                      Ideal para
                    </p>
                    <p className="text-sm leading-6 text-foreground/85 sm:text-[0.98rem]">{service.idealFor}</p>
                  </div>

                  <div className="mb-8 flex-grow">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-trust-blue">
                      O que você ganha
                    </p>
                    <ul className="space-y-2.5">
                      {service.cardFeatures.slice(0, 2).map((feature) => (
                        <li key={feature} className="text-sm text-corporate-gray sm:text-[0.98rem]">
                          {feature}
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
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <div
          ref={ctaRef}
          className={`relative overflow-hidden rounded-3xl bg-gradient-hero p-7 text-center shadow-premium scroll-animate-fade sm:p-9 md:p-10 ${ctaVisible ? "visible" : ""}`}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <h3 className="mb-3 text-xl font-bold text-primary-foreground sm:text-[1.6rem] md:text-[1.9rem]">
              Não sabe por onde começar?
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-primary-foreground/90 sm:text-[0.98rem]">
              Indicamos qual solução faz mais sentido agora.
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
