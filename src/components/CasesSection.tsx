import { Card, CardContent } from "./ui/card";
import { TrendingUp, Shield, DollarSign, Building2, TrendingDown } from "lucide-react";

const CasesSection = () => {
  const cases = [
    {
      icon: <Building2 className="h-8 w-8 text-trust-blue" />,
      title: "Indústria Nacional",
      subtitle: "Cliente em RJ",
      result: "90%",
      description: "Indenização de 90%, fluxo de caixa preservado",
      impact: "Empresa manteve operações sem interrupção"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-trust-blue" />,
      title: "Exportador",
      subtitle: "Atraso de 120 dias",
      result: "87%",
      description: "Indenização antecipada de 87%, exportações mantidas",
      impact: "Continuidade nas vendas internacionais"
    },
    {
      icon: <Shield className="h-8 w-8 text-trust-blue" />,
      title: "Caso Americanas",
      subtitle: "Crise de grande magnitude",
      result: "80%",
      description: "Clientes segurados recuperaram até 80% das perdas",
      impact: "Proteção em meio à maior crise do varejo"
    }
  ];

  return (
    <section id="casos" className="py-12 sm:py-16 md:py-20 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Casos Reais de Sucesso
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-4xl mx-auto leading-relaxed">
            Histórias reais de empresas que protegeram seu fluxo de caixa com o Seguro de Crédito Coface. 
            <span className="block mt-2 font-semibold text-trust-blue">
              Mesmo empresas centenárias podem cair. Sua empresa está preparada?
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16">
          {cases.map((case_, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-premium transition-all duration-300 border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-hero p-5 sm:p-6 text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    {case_.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">{case_.result}</div>
                  <div className="text-sm sm:text-base text-primary-foreground/80">de recuperação</div>
                </div>
                
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{case_.title}</h3>
                  <p className="text-sm sm:text-base text-trust-blue font-semibold mb-3 sm:mb-4">{case_.subtitle}</p>
                  <p className="text-sm sm:text-base text-corporate-gray mb-3 sm:mb-4">{case_.description}</p>
                  <div className="bg-trust-blue/10 rounded-lg p-3">
                    <p className="text-xs sm:text-sm font-semibold text-trust-blue">{case_.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-background rounded-2xl p-6 sm:p-8 text-center shadow-card">
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
            Segundo dados da Coface
          </h3>
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
            <span className="text-3xl sm:text-4xl font-bold text-red-600">40%</span>
          </div>
          <p className="text-base sm:text-lg text-corporate-gray">
            das falências no Brasil têm relação direta com inadimplência em cadeia
          </p>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;