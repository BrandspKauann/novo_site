import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Globe, Phone, ArrowRight } from "lucide-react";
import protectionIcon from "@/assets/protection-icon.jpg";
import intelligenceIcon from "@/assets/intelligence-icon.jpg";
import collectionIcon from "@/assets/collection-icon.jpg";

const ServicesSection = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";
  
  const services = [
    {
      icon: protectionIcon,
      title: "Seguro de Crédito",
      description: "Proteção das vendas a prazo. Se um cliente não pagar, a seguradora indeniza até 90% do valor e assume a cobrança.",
      features: [
        "Cobertura de até 90%",
        "Indenização em até 30 dias",
        "Indenização antecipada em atrasos prolongados",
        "Cobrança especializada incluída"
      ],
      cta: "Solicitar Análise",
      variant: "premium" as const
    },
    {
      icon: intelligenceIcon,
      title: "Business Information (URBA360)",
      description: "Banco de dados global em mais de 200 países. O 'Serasa internacional' para validar clientes e fornecedores.",
      features: [
        "Dados de empresas em 200+ países",
        "Análise de risco em tempo real",
        "Relatórios detalhados",
        "Monitoramento contínuo"
      ],
      cta: "Conhecer BI",
      variant: "trust" as const
    },
    {
      icon: collectionIcon,
      title: "Debt Collection",
      description: "Cobrança nacional e internacional com estrutura própria da Coface. Expertise global em recuperação de créditos.",
      features: [
        "Cobrança nacional e internacional",
        "Estrutura própria Coface",
        "Expertise em recuperação",
        "Processo transparente"
      ],
      cta: "Saiba Mais",
      variant: "secondary" as const
    }
  ];

  return (
    <section id="servicos" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Serviços Coface
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-4xl mx-auto leading-relaxed">
            Além do seguro de crédito, a Coface oferece uma gama completa de soluções 
            para proteger e fortalecer o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0 h-full">
              <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                <div className="text-center mb-5 sm:mb-6">
                  <img 
                    src={service.icon} 
                    alt={`${service.title} icon`}
                    className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-lg object-cover"
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">{service.title}</h3>
                  <p className="text-sm sm:text-base text-corporate-gray leading-relaxed">{service.description}</p>
                </div>

                <div className="flex-grow mb-5 sm:mb-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-corporate-gray">
                        <div className="w-2 h-2 bg-trust-blue rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant={service.variant} 
                  className="w-full"
                  onClick={() => window.open(whatsappLink, '_blank')}
                >
                  {service.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 md:mt-16 bg-gradient-hero rounded-2xl p-6 sm:p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-3 sm:mb-4">
              Parceria oficial com a Coface
            </h3>
            <p className="text-sm sm:text-base text-primary-foreground/90 mb-5 sm:mb-6 leading-relaxed">
              Líder mundial em seguro de crédito e inteligência de riscos, 
              a Coface está presente em mais de 100 países e protege empresas há mais de 70 anos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => window.open(whatsappLink, '_blank')}
                className="w-full sm:w-auto"
              >
                Falar com Especialista
                <Phone className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto"
                onClick={() => window.open(whatsappLink, '_blank')}
              >
                Mais sobre a Coface
                <Globe className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;