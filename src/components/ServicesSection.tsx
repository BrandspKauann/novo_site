import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, ArrowRight, Shield, Database, TrendingUp } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "@/config/products";

const ServicesSection = () => {
  const { openSpecialistForm } = useSpecialistContact();
  const navigate = useNavigate();

  const services = [
    {
      icon: PRODUCTS[0].image,
      iconComponent: <Shield className="h-8 w-8 text-trust-blue" />,
      title: PRODUCTS[0].title,
      description: PRODUCTS[0].cardDescription,
      features: PRODUCTS[0].cardFeatures,
      slug: PRODUCTS[0].slug,
      variant: "premium" as const,
    },
    {
      icon: PRODUCTS[1].image,
      iconComponent: <Database className="h-8 w-8 text-trust-blue" />,
      title: PRODUCTS[1].title,
      description: PRODUCTS[1].cardDescription,
      features: PRODUCTS[1].cardFeatures,
      slug: PRODUCTS[1].slug,
      variant: "trust" as const,
    },
    {
      icon: PRODUCTS[2].image,
      iconComponent: <TrendingUp className="h-8 w-8 text-trust-blue" />,
      title: PRODUCTS[2].title,
      description: PRODUCTS[2].cardDescription,
      features: PRODUCTS[2].cardFeatures,
      slug: PRODUCTS[2].slug,
      variant: "secondary" as const,
    },
  ];

  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: "0px 0px -15% 0px",
    triggerOnce: false,
  });

  return (
    <section id="servicos" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="text-center mb-16 sm:mb-20 md:mb-24 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 sm:mb-8">
              Soluções principais
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-corporate-gray leading-relaxed">
              Três frentes para reduzir risco comercial: proteger vendas a prazo, analisar empresas com mais profundidade
              e recuperar recebíveis com método.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => (
            <AnimatedSection 
              key={index}
              animationType="scale" 
              delay={index * 75}
            >
              <Card className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0 h-full flex flex-col group hover:-translate-y-2">
                <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="relative inline-block mb-4 sm:mb-6">
                      <img 
                        src={service.icon} 
                        alt={`${service.title} icon`}
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl object-cover border-2 border-border group-hover:border-trust-blue transition-colors"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-corporate-gray leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex-grow mb-6 sm:mb-8">
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm sm:text-base text-corporate-gray">
                          <div className="w-2 h-2 bg-trust-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant={service.variant} 
                    className="w-full shadow-md hover:shadow-lg transition-shadow group/btn"
                    onClick={() => navigate(`/solucoes/${service.slug}`)}
                  >
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef}
          className={`bg-gradient-hero rounded-3xl p-8 sm:p-10 md:p-12 text-center shadow-premium relative overflow-hidden scroll-animate-fade ${ctaVisible ? "visible" : ""}`}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4 sm:mb-6">
              Entenda qual solução faz mais sentido para sua operação
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-6 sm:mb-8 leading-relaxed">
              Avaliamos seu cenário para indicar se o melhor caminho é seguro de crédito, consulta de dados empresariais
              ou cobrança de dívida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => openSpecialistForm("servicos_cta")}
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
              >
                Falar com Especialista
                <Phone className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
