import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Shield, TrendingUp, BarChart3, Users, Clock, Target } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useSpecialistContact } from "@/contexts/SpecialistContactContext";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    icon: <Shield className="h-6 w-6 text-trust-blue" />,
    title: "Menos exposição sem critério",
    description: "Você reduz decisões comerciais baseadas apenas em relacionamento ou urgência de fechar o pedido.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-trust-blue" />,
    title: "Mais previsibilidade de caixa",
    description: "A operação fica menos vulnerável quando informação, proteção e cobrança entram no processo certo.",
  },
  {
    icon: <Users className="h-6 w-6 text-trust-blue" />,
    title: "Time comercial mais seguro",
    description: "A equipe passa a vender com parâmetros melhores, sem carregar o risco inteiro no improviso.",
  },
  {
    icon: <Clock className="h-6 w-6 text-trust-blue" />,
    title: "Resposta mais rápida aos sinais de risco",
    description: "Você ganha velocidade para decidir antes de aumentar exposição ou antes que o atraso se torne estrutural.",
  },
  {
    icon: <Target className="h-6 w-6 text-trust-blue" />,
    title: "Melhor escolha de clientes e fornecedores",
    description: "A leitura do parceiro comercial fica mais madura e protege margens, caixa e continuidade operacional.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-trust-blue" />,
    title: "Crescimento com mais disciplina",
    description: "A empresa cresce sem tratar risco como detalhe, o que melhora qualidade comercial e governança.",
  },
];

const BenefitsSection = () => {
  const { openSpecialistForm } = useSpecialistContact();
  const navigate = useNavigate();

  return (
    <section id="ganhos" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="slide-up">
          <div className="mx-auto mb-12 max-w-5xl text-center sm:mb-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
              O que muda na prática
            </p>
            <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              O ganho real não é só vender um produto. É colocar método na operação comercial.
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Quando o site comunica bem as três soluções, o visitante entende que a Hirayama pode apoiar desde a análise
              prévia de uma empresa até a proteção da venda e a recuperação da dívida.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <AnimatedSection key={benefit.title} animationType="slide-up" delay={index * 50} className="h-full">
              <Card className="h-full border border-border/60 bg-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-premium">
                <CardContent className="p-6 sm:p-8 h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-trust-blue/10">
                    {benefit.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{benefit.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base">{benefit.description}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animationType="scale" delay={120}>
          <div className="mt-12 rounded-3xl border border-border/60 bg-card px-6 py-8 shadow-card sm:px-8 sm:py-10 md:px-12">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-trust-blue">
                Próximo passo
              </p>
              <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                Se o visitante chegou até aqui, ele precisa sair com um caminho claro
              </h3>
              <p className="mb-8 text-base leading-8 text-muted-foreground sm:text-lg">
                Ou ele vai para a página da solução mais aderente ao cenário, ou abre o formulário para uma conversa
                guiada. O site precisa fazer esse encaminhamento sem deixar a pessoa perdida em textos genéricos.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" onClick={() => openSpecialistForm("beneficios_cta")}>
                  Falar com Especialista
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/solucoes/consulta-de-dados-empresariais")}>
                  Explorar uma solução
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BenefitsSection;

