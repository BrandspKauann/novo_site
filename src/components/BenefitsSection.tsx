import { Card, CardContent } from "./ui/card";
import { Shield, TrendingUp, BarChart3, Users, Clock, Target } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const benefits = [
  {
    icon: Shield,
    title: "Menos exposição sem critério",
    description: "Você reduz decisões comerciais baseadas apenas em relacionamento ou urgência de fechar o pedido.",
  },
  {
    icon: BarChart3,
    title: "Mais previsibilidade de caixa",
    description: "A operação fica menos vulnerável quando informação, proteção e cobrança entram no processo certo.",
  },
  {
    icon: Users,
    title: "Time comercial mais seguro",
    description: "A equipe passa a vender com parâmetros melhores, sem carregar o risco inteiro no improviso.",
  },
  {
    icon: Clock,
    title: "Resposta mais rápida aos sinais de risco",
    description: "Você ganha velocidade para decidir antes de aumentar exposição ou antes que o atraso se torne estrutural.",
  },
  {
    icon: Target,
    title: "Melhor escolha de clientes e fornecedores",
    description: "A leitura do parceiro comercial fica mais madura e protege margens, caixa e continuidade operacional.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento com mais disciplina",
    description: "A empresa cresce sem tratar risco como detalhe, o que melhora qualidade comercial e governança.",
  },
];

const BenefitsSection = () => {
  return (
    <section
      id="ganhos"
      className="py-14 sm:py-16 md:py-20 lg:py-24 !bg-primary"
    >
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-10 max-w-5xl text-center sm:mb-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
              O que muda na prática
            </p>
            <h2 className="mb-4 text-[1.35rem] font-bold text-primary-foreground sm:text-[1.6rem] md:text-[1.75rem] lg:text-[1.9rem]">
              Ganhos reais na operação
            </h2>
            <p className="text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              Da análise prévia até a proteção e recuperação.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {benefits.slice(0, 4).map((benefit, index) => (
            <AnimatedSection key={benefit.title} animationType="slide-up" delay={index * 50} className="h-full">
              <Card className="h-full border border-primary/40 bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/70 hover:shadow-premium">
                <CardContent className="p-5 sm:p-7 h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-trust-blue/10">
                    <benefit.icon className="h-6 w-6 text-trust-blue" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{benefit.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground sm:text-[0.98rem]">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

