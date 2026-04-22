import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useNavigate } from "react-router-dom";

const scenarios = [
  {
    title: "Você ainda vai decidir com quem negociar",
    description: "Se a dúvida é com quem negociar, a prioridade é Consulta de Dados Empresariais.",
    bullets: [
      "Cliente novo ou grande demais para decidir no escuro",
      "Fornecedor crítico para a operação",
      "Expansão para novos mercados ou novas praças",
    ],
    href: "/solucoes/consulta-de-dados-empresariais",
    cta: "Ver Consulta de Dados Empresariais",
  },
  {
    title: "Você já vende a prazo e quer proteger o caixa",
    description: "Se a operação depende de prazo comercial, a prioridade é Seguro de Crédito.",
    bullets: [
      "Carteira relevante em vendas a prazo",
      "Necessidade de previsibilidade financeira",
      "Expansão comercial com mais controle sobre risco",
    ],
    href: "/solucoes/seguro-de-credito",
    cta: "Ver Seguro de Crédito",
  },
  {
    title: "O problema já virou atraso ou inadimplência",
    description: "Se o dinheiro ficou preso em títulos vencidos, a prioridade é Cobrança por Êxito.",
    bullets: [
      "Recebíveis vencidos e pressão no caixa",
      "Cobrança internacional ou mais complexa",
      "Desejo de agir com método sem sobrecarregar o time",
    ],
    href: "/solucoes/cobranca-de-divida",
    cta: "Ver Cobrança por Êxito",
  },
];

const scenarioChart = [
  {
    phase: "Antes da venda",
    focus: "Consulta de dados",
    intensity: 82,
    color: "bg-trust-blue",
    href: "/solucoes/consulta-de-dados-empresariais",
  },
  {
    phase: "Durante a exposição",
    focus: "Seguro de crédito",
    intensity: 91,
    color: "bg-primary",
    href: "/solucoes/seguro-de-credito",
  },
  {
    phase: "Depois do atraso",
    focus: "Cobrança por êxito",
    intensity: 74,
    color: "bg-secondary",
    href: "/solucoes/cobranca-de-divida",
  },
];

const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section id="cenarios" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-10 max-w-5xl text-center sm:mb-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
              Qual solução faz sentido agora
            </p>
            <h2 className="mb-4 text-[1.35rem] font-bold text-foreground sm:text-[1.6rem] md:text-[1.75rem] lg:text-[1.9rem]">
              Decisão rápida por cenário
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Basta bater o olho para entender a direção.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animationType="slide-up">
          <div className="rounded-3xl border border-primary/30 bg-card p-5 shadow-card sm:p-7 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-trust-blue">
                  Leitura visual do cenário
                </p>
                <h3 className="mb-4 text-lg font-bold text-foreground sm:text-xl">
                  Gráfico de prioridade por momento da operação
                </h3>
                <p className="mb-6 text-sm leading-6 text-muted-foreground">
                  Em geral, o melhor resultado vem de calibrar a prioridade de cada solução conforme o momento de risco:
                  antes de vender, durante a exposição e depois do atraso.
                </p>

                <div className="space-y-4">
                  {scenarioChart.map((item) => (
                    <button
                      key={item.phase}
                      type="button"
                      onClick={() => navigate(item.href)}
                      className="w-full text-left group"
                    >
                      <div className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <span>{item.phase}</span>
                        <span>{item.intensity}%</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-muted">
                        <div
                          className={`h-3 rounded-full ${item.color} transition-all duration-500 group-hover:brightness-110`}
                          style={{ width: `${item.intensity}%` }}
                        />
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground/90">{item.focus}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background p-5 sm:p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-trust-blue">
                  Como usar essa leitura
                </p>
                <ul className="space-y-3">
                  {scenarios.map((scenario, index) => (
                    <li key={scenario.title} className="text-sm leading-6 text-foreground/85">
                      <span className="font-semibold text-foreground">{index + 1}. {scenario.title}: </span>
                      {scenario.description}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-3">
                  {scenarios.map((scenario) => (
                    <Button
                      key={scenario.href}
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(scenario.href)}
                      className="group/btn"
                    >
                      {scenario.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HowItWorksSection;
