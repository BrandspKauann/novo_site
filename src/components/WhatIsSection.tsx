import { Card, CardContent } from "./ui/card";
import { DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const cobrancaSemSeguroItems = [
  "Após o problema acontecer",
  "Sem garantia de recebimento",
  "Tentativa de recuperação",
  "Prejuízo direto no fluxo de caixa em caso de inadimplência",
  "Crédito concedido sem respaldo objetivo do risco",
  "Custos extras com jurídico, cobrança e tempo da equipe",
  "Dificuldade para planejar receitas com previsibilidade",
  "Relacionamento comercial exposto a calotes",
];

const cobrancaComSeguroItems = [
  "Análise antes da venda",
  "Garantia de recebimento",
  "Indenização automática",
  "Limite de crédito alinhado ao perfil do comprador",
  "Até 90% do valor pode ser indenizado, conforme apólice",
  "Cobrança administrada pela seguradora após sinistro",
  "Decisões de venda a prazo com mais segurança",
  "Fluxo de caixa menos vulnerável a imprevistos",
];

const WhatIsSection = () => {
  const { elementRef: statRef, isVisible: statVisible } = useScrollAnimation({
    threshold: 0.05,
    rootMargin: "0px 0px -15% 0px",
    triggerOnce: false,
  });

  return (
    <section id="o-que-e" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">

        {/* Comparação: com vs sem seguro */}
        <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <AnimatedSection animationType="slide-up" delay={200}>
            <div className="mx-auto mb-10 max-w-4xl px-2 text-center sm:mb-12">
              <h3 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
                Por que eu deveria ter um seguro para minhas cobranças?
              </h3>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {/* Cobrança sem seguro */}
            <AnimatedSection animationType="slide-up" delay={300}>
              <Card className="rounded-sm bg-gradient-to-br from-red-50 via-rose-50/80 to-red-100/60 dark:from-red-950/25 dark:via-red-950/15 dark:to-red-950/20 border-2 border-red-500/35 shadow-card h-full hover:shadow-premium transition-all duration-500">
                <CardContent className="p-5 sm:px-8 sm:py-6">
                  <div className="flex items-center gap-4 mb-5 sm:mb-6 pb-5 border-b border-red-200/60 dark:border-red-900/40">
                    <div className="w-[5.25rem] h-12 sm:w-32 sm:h-14 bg-red-600 rounded-sm flex items-center justify-center shrink-0 shadow-sm">
                      <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xl sm:text-2xl font-bold text-foreground">Cobrança sem seguro</h4>
                      <p className="text-sm text-muted-foreground">Ação reativa</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
                    {cobrancaSemSeguroItems.map((text) => (
                      <div key={text} className="flex items-start gap-2.5">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-muted-foreground leading-snug">{text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Cobrança com seguro */}
            <AnimatedSection animationType="slide-up" delay={400}>
              <Card className="rounded-sm bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-500/30 shadow-card h-full hover:shadow-premium transition-all duration-500">
                <CardContent className="p-5 sm:px-8 sm:py-6">
                  <div className="flex items-center gap-4 mb-5 sm:mb-6 pb-5 border-b border-green-200/60 dark:border-green-900/40">
                    <div className="w-[5.25rem] h-12 sm:w-32 sm:h-14 bg-green-600 rounded-sm flex items-center justify-center shrink-0 shadow-sm">
                      <DollarSign className="h-8 w-8 sm:h-9 sm:w-9 text-white stroke-[2.5]" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xl sm:text-2xl font-bold text-foreground">Cobrança com seguro</h4>
                      <p className="text-sm text-muted-foreground">Proteção preventiva</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
                    {cobrancaComSeguroItems.map((text) => (
                      <div key={text} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-muted-foreground leading-snug">{text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>


        {/* Stat Highlight */}
        <div 
          ref={statRef}
          className={`max-w-4xl mx-auto bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-6 sm:p-8 border-l-4 border-red-500 shadow-card scroll-animate-scale ${statVisible ? "visible delay-200" : ""}`}
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3">
              Segundo dados da Coface:
            </h4>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <span className="text-5xl font-bold text-red-600 sm:text-6xl md:text-7xl">40%</span>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                das empresas no Brasil têm relação direta com inadimplência em suas operações comerciais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;
