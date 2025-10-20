import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Building2, TrendingUp, Globe, Users, CheckCircle, ArrowRight } from "lucide-react";

const WhoCanHire = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=5511972896857&text&type=phone_number&app_absent=0";
  
  const criteria = [
    {
      icon: <TrendingUp className="h-6 w-6 text-trust-blue" />,
      title: "Faturam acima de R$ 10 milhões/ano",
      description: "Empresas com faturamento anual mínimo"
    },
    {
      icon: <Globe className="h-6 w-6 text-trust-blue" />,
      title: "Exportam a partir de US$ 2 milhões/ano",
      description: "Exportadores com volume significativo"
    },
    {
      icon: <Building2 className="h-6 w-6 text-trust-blue" />,
      title: "Realizam vendas B2B a prazo",
      description: "Vendas de 30 a 120 dias para empresas"
    },
    {
      icon: <Users className="h-6 w-6 text-trust-blue" />,
      title: "Concentram receita em poucos clientes",
      description: "Grande parte da receita vem de poucos clientes"
    }
  ];

  const benefits = [
    {
      profile: "CFO / Diretor Financeiro",
      benefits: "Previsibilidade de caixa, proteção contra inadimplência e melhor análise de risco"
    },
    {
      profile: "Diretor Comercial", 
      benefits: "Segurança para ampliar prazos, abrir mercados e conquistar novos clientes"
    },
    {
      profile: "Conselho / Governança",
      benefits: "Reforço de compliance, solidez financeira e credibilidade junto a bancos e investidores"
    }
  ];

  return (
    <section id="beneficios" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Who Can Hire */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
              Quem Pode Contratar
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-3xl mx-auto">
              Esse produto é exclusivo para empresas que:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
            {criteria.map((criterion, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-trust-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {criterion.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-1 sm:mb-2">{criterion.title}</h3>
                      <p className="text-sm sm:text-base text-corporate-gray">{criterion.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">
              Sua empresa ainda não se encaixa nesses critérios?
            </h3>
            <p className="text-sm sm:text-base text-corporate-gray mb-5 sm:mb-6">
              A Coface oferece o <span className="font-semibold text-trust-blue">BI (URBA360)</span> – 
              birô global para análise de clientes e fornecedores.
            </p>
            <Button 
              variant="trust" 
              size="lg"
              onClick={() => window.open(whatsappLink, '_blank')}
              className="w-full sm:w-auto"
            >
              Conheça o BI Coface
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Benefits by Role */}
        <div>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
              Benefícios para o Decisor
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-3xl mx-auto">
              Vantagens específicas para cada perfil de decisor na empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                    <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">{benefit.profile}</h3>
                  <p className="text-sm sm:text-base text-corporate-gray leading-relaxed">{benefit.benefits}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoCanHire;