import { Card, CardContent } from "./ui/card";
import { Shield, FileCheck, Clock, DollarSign, Users, CheckCircle, TrendingDown } from "lucide-react";

const WhatIsSection = () => {
  const steps = [
    {
      icon: <Users className="h-8 w-8 text-trust-blue" />,
      title: "Cadastro da carteira",
      description: "Cadastro da carteira de clientes"
    },
    {
      icon: <FileCheck className="h-8 w-8 text-trust-blue" />,
      title: "Definição de limites",
      description: "Coface define limite de crédito por comprador"
    },
    {
      icon: <Shield className="h-8 w-8 text-trust-blue" />,
      title: "Venda segura",
      description: "Venda segura dentro do limite aprovado"
    },
    {
      icon: <Clock className="h-8 w-8 text-trust-blue" />,
      title: "Indenização rápida",
      description: "Inadimplência: indenização em até 30 dias"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-trust-blue" />,
      title: "Indenização antecipada",
      description: "Atrasos prolongados: indenização antecipada de ~87%"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-trust-blue" />,
      title: "Cobrança especializada",
      description: "Cobrança conduzida pela seguradora"
    }
  ];

  return (
    <section id="o-que-e" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 sm:mb-8">
            O que é Seguro de Crédito
          </h2>
          <div className="max-w-5xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-corporate-gray leading-relaxed mb-6">
              O Seguro de Crédito Empresarial protege as suas vendas a prazo contra riscos de inadimplência. 
              Se um cliente não pagar por atraso prolongado, recuperação judicial ou falência, 
              <span className="font-semibold text-primary"> a seguradora indeniza até 90% do valor e assume a cobrança.</span>
            </p>
            
            <div className="bg-secondary/10 rounded-lg p-4 sm:p-6 mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-primary mb-3">
                <TrendingDown className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" />
                Segundo dados da Coface:
              </h4>
              <p className="text-sm sm:text-base text-corporate-gray">
                <span className="text-2xl sm:text-3xl font-bold text-red-600">40%</span> das empresas no Brasil têm relação direta com inadimplência em suas operações comerciais. 
                Este número representa o percentual de empresas que já enfrentaram ou enfrentam problemas de recebimento de vendas a prazo, 
                demonstrando a importância de uma proteção adequada para o fluxo de caixa empresarial.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12 sm:mb-14 md:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-primary mb-8 sm:mb-10 md:mb-12">Como funciona:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0">
                <CardContent className="p-5 sm:p-6 text-center">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-trust-blue/10 rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="mb-2 text-xs sm:text-sm font-bold text-secondary bg-secondary/10 rounded-full px-2 sm:px-3 py-1 inline-block">
                    {index + 1}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-primary mb-2">{step.title}</h4>
                  <p className="text-sm sm:text-base text-corporate-gray">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center bg-background rounded-2xl p-6 sm:p-8 shadow-card max-w-4xl mx-auto">
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary italic">
            "Você protege estoque, transporte e colaboradores. Mas e seu contas a receber?"
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;