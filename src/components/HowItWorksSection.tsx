import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Search, Shield, HandCoins, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useNavigate } from "react-router-dom";

const scenarios = [
  {
    icon: <Search className="h-8 w-8 text-trust-blue" />,
    title: "Você ainda vai decidir com quem negociar",
    description:
      "Se a dúvida principal é se a empresa tem histórico, porte e finanças compatíveis com o negócio, a prioridade é Consulta de Dados Empresariais.",
    bullets: [
      "Cliente novo ou grande demais para decidir no escuro",
      "Fornecedor crítico para a operação",
      "Expansão para novos mercados ou novas praças",
    ],
    href: "/solucoes/consulta-de-dados-empresariais",
    cta: "Ver Consulta de Dados Empresariais",
  },
  {
    icon: <Shield className="h-8 w-8 text-trust-blue" />,
    title: "Você já vende a prazo e quer proteger o caixa",
    description:
      "Se sua empresa depende de prazo comercial e quer crescer sem ficar exposta demais a poucos compradores, a prioridade é Seguro de Crédito.",
    bullets: [
      "Carteira relevante em vendas a prazo",
      "Necessidade de previsibilidade financeira",
      "Expansão comercial com mais controle sobre risco",
    ],
    href: "/solucoes/seguro-de-credito",
    cta: "Ver Seguro de Crédito",
  },
  {
    icon: <HandCoins className="h-8 w-8 text-trust-blue" />,
    title: "O problema já virou atraso ou inadimplência",
    description:
      "Se o dinheiro ficou preso em títulos vencidos e a equipe não pode parar para cobrar, a prioridade é Cobrança de Dívida.",
    bullets: [
      "Recebíveis vencidos e pressão no caixa",
      "Cobrança internacional ou mais complexa",
      "Desejo de agir com método sem sobrecarregar o time",
    ],
    href: "/solucoes/cobranca-de-divida",
    cta: "Ver Cobrança de Dívida",
  },
];

const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section id="cenarios" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-12 max-w-5xl text-center sm:mb-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
              Qual solução faz sentido agora
            </p>
            <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              A decisão fica mais simples quando você olha para o momento do problema
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Em vez de navegar por termos genéricos, o visitante precisa bater o olho e identificar em qual cenário se
              encontra hoje. A partir daí, o site deve levar para a página certa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {scenarios.map((scenario, index) => (
            <AnimatedSection key={scenario.title} animationType="slide-up" delay={index * 90}>
              <Card className="h-full border border-border/60 bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-premium">
                <CardContent className="flex h-full flex-col p-6 sm:p-8">
                  <div className="mb-5 rounded-2xl bg-trust-blue/10 p-4 w-fit">{scenario.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{scenario.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">{scenario.description}</p>

                  <div className="mb-8 flex-grow space-y-3">
                    {scenario.bullets.map((item) => (
                      <div key={item} className="rounded-2xl border border-border/50 bg-muted/30 px-4 py-3">
                        <p className="text-sm leading-6 text-foreground/85 sm:text-base">{item}</p>
                      </div>
                    ))}
                  </div>

                  <Button onClick={() => navigate(scenario.href)} className="w-full group/btn">
                    {scenario.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

