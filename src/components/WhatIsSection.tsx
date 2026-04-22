import { Card, CardContent } from "./ui/card";
import { CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stages = [
  {
    eyebrow: "Antes da venda",
    title: "Consulta de Dados Empresariais",
    description: "Ajuda a validar se cliente ou fornecedor tem perfil compatível com o negócio.",
    bullets: [
      "Avaliação de clientes novos",
      "Análise de fornecedores relevantes",
      "Redução de decisão baseada em achismo",
    ],
  },
  {
    eyebrow: "Durante a exposição",
    title: "Seguro de Crédito",
    description: "Ajuda a vender a prazo com critério e proteger o fluxo de caixa.",
    bullets: [
      "Mais segurança para conceder prazo",
      "Limites alinhados ao risco do comprador",
      "Proteção financeira da operação",
    ],
  },
  {
    eyebrow: "Depois do atraso",
    title: "Cobrança por Êxito",
    description: "Ajuda a recuperar recebíveis vencidos com método e cobrança atrelada ao resultado, sem drenar a equipe.",
    bullets: [
      "Cobrança estruturada por êxito",
      "Foco do time preservado",
      "Ação nacional e internacional",
    ],
  },
];

const WhatIsSection = () => {
  return (
    <section
      id="o-que-e"
      className="py-14 sm:py-16 md:py-20 lg:py-24 !bg-primary"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-10 max-w-5xl text-center sm:mb-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
              Onde cada solução entra
            </p>
            <h2 className="mb-4 text-[1.35rem] font-bold leading-tight text-primary-foreground sm:text-[1.6rem] md:text-[1.75rem]">
              O risco nasce em etapas
            </h2>
            <p className="text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              O problema pode nascer antes da venda, no prazo ou no atraso.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stages.map((stage, index) => (
            <AnimatedSection key={stage.title} animationType="slide-up" delay={index * 80}>
              <Card className="group h-full border border-primary/40 bg-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/70 hover:shadow-premium">
                <CardContent className="p-5 sm:p-7">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-trust-blue">
                    {stage.eyebrow}
                  </p>
                  <h3 className="mb-3 text-[1.35rem] font-bold text-foreground sm:text-[1.55rem]">{stage.title}</h3>
                  <p className="mb-5 text-sm leading-6 text-muted-foreground">{stage.description}</p>
                  <div className="space-y-2.5">
                    {stage.bullets.slice(0, 2).map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-muted/35 px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-trust-blue" />
                        <span className="text-sm leading-5 text-foreground/85">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhatIsSection;
