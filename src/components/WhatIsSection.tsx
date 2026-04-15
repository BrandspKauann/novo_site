import { Card, CardContent } from "./ui/card";
import { Search, ShieldCheck, Landmark, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const stages = [
  {
    icon: <Search className="h-7 w-7 text-trust-blue" />,
    eyebrow: "Antes da venda",
    title: "Consulta de Dados Empresariais",
    description:
      "Ajuda a entender se o cliente ou fornecedor tem porte, histórico e solidez compatíveis com o negócio que você quer fechar.",
    bullets: [
      "Avaliação de clientes novos",
      "Análise de fornecedores relevantes",
      "Redução de decisão baseada em achismo",
    ],
  },
  {
    icon: <ShieldCheck className="h-7 w-7 text-trust-blue" />,
    eyebrow: "Durante a exposição",
    title: "Seguro de Crédito",
    description:
      "Ajuda a vender a prazo com critério, monitorar risco da carteira e proteger o fluxo de caixa em caso de não pagamento coberto.",
    bullets: [
      "Mais segurança para conceder prazo",
      "Limites alinhados ao risco do comprador",
      "Proteção financeira da operação",
    ],
  },
  {
    icon: <Landmark className="h-7 w-7 text-trust-blue" />,
    eyebrow: "Depois do atraso",
    title: "Cobrança de Dívida",
    description:
      "Ajuda a recuperar recebíveis vencidos com método, ritmo e abordagem profissional, sem drenar a equipe comercial e financeira.",
    bullets: [
      "Cobrança estruturada",
      "Foco do time preservado",
      "Ação nacional e internacional",
    ],
  },
];

const WhatIsSection = () => {
  return (
    <section id="o-que-e" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-12 max-w-5xl text-center sm:mb-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
              Onde cada solução entra
            </p>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              O risco comercial não aparece em um único momento
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Em algumas empresas o problema nasce antes da venda, em outras durante a concessão de prazo, e em muitas
              só fica visível quando a fatura vence. Por isso as três soluções fazem sentido em momentos diferentes da
              rotina comercial.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stages.map((stage, index) => (
            <AnimatedSection key={stage.title} animationType="slide-up" delay={index * 80}>
              <Card className="h-full border border-border/60 bg-card shadow-card">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-5 inline-flex rounded-2xl bg-trust-blue/10 p-4">{stage.icon}</div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-trust-blue">
                    {stage.eyebrow}
                  </p>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{stage.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">{stage.description}</p>
                  <div className="space-y-3">
                    {stage.bullets.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl bg-muted/35 px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-trust-blue" />
                        <span className="text-sm leading-6 text-foreground/85 sm:text-base">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animationType="slide-up" delay={180}>
          <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-border/60 bg-card/70 p-6 shadow-card sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
              Leitura mais madura da operação
            </p>
            <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              A empresa não precisa depender de uma única resposta para todos os cenários
            </h3>
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Há momentos em que o foco é saber com quem você está fechando. Em outros, o mais importante é proteger a
              venda a prazo. E quando o atraso já existe, a prioridade muda para recuperação. O site precisa mostrar isso
              com clareza para que o visitante entenda rapidamente qual conversa precisa ter com a Hirayama.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhatIsSection;
