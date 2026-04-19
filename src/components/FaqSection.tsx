import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "O que é Seguro de Crédito e como ele funciona na prática?",
    a: "É uma apólice que protege a sua empresa contra inadimplência de clientes B2B. Quando um comprador coberto deixa de pagar, a seguradora indeniza a sua empresa dentro do limite contratado — em geral entre 70% e 90% do valor do título. Antes do calote, ela analisa e monitora cada cliente; durante o atraso, assume a cobrança; após confirmada a perda, paga a indenização.",
  },
  {
    q: "Para quem o Seguro de Crédito faz sentido?",
    a: "Para qualquer empresa que vende a prazo no B2B — indústrias, distribuidoras, atacadistas, prestadores de serviços recorrentes e exportadores. Faz especialmente sentido quando há concentração de carteira (poucos clientes representando grande parte do faturamento), expansão para clientes ou regiões novas, ou histórico de perdas que afetou o caixa.",
  },
  {
    q: "Quanto custa contratar uma apólice?",
    a: "O custo é calculado como um percentual sobre o faturamento a prazo segurado e varia conforme o setor, perfil da carteira e histórico de inadimplência. Na maioria dos casos fica em fração de ponto percentual sobre o faturamento, valor que costuma ser muito inferior ao custo real da inadimplência média do setor.",
  },
  {
    q: "Qual a diferença entre Consulta de Dados Empresariais e Seguro de Crédito?",
    a: "A Consulta é uma análise pontual ou recorrente sobre um CNPJ específico — útil para decisões individuais como aprovar um novo cliente ou ampliar limite. O Seguro de Crédito é uma estrutura contínua que combina análise, monitoramento da carteira inteira, cobrança em caso de atraso e indenização. Muitas empresas começam pela Consulta e evoluem para o Seguro à medida que o volume cresce.",
  },
  {
    q: "Como funciona a Cobrança de Dívida B2B?",
    a: "Atuamos com cobrança extrajudicial e, quando necessário, judicial — no Brasil e no exterior. A operação combina contato administrativo profissional, notificações formais, protesto, negativação e ações judiciais quando cabíveis. Para clientes com apólice ativa, a cobrança costuma estar embutida no serviço; para os demais, oferecemos como serviço independente.",
  },
  {
    q: "Quanto tempo leva para implantar o Seguro de Crédito?",
    a: "O processo padrão leva de duas a quatro semanas: levantamento da carteira atual, análise técnica dos compradores principais, proposta com limites recomendados e ativação. Em casos urgentes, conseguimos acelerar etapas para colocar a proteção em vigor mais rápido.",
  },
  {
    q: "A Hirayama atende empresas de qualquer porte?",
    a: "Sim. Trabalhamos desde médias empresas até grandes corporações com operações nacionais e internacionais. O desenho da apólice é sempre adaptado ao perfil da carteira, do setor e do volume.",
  },
];

const FaqSection = () => {
  return (
    <section
      id="faq"
      className="py-14 sm:py-16 bg-muted/30 border-t border-border"
      data-testid="section-faq"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header — centered, minimal */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight normal-case">
              Perguntas frequentes
            </h2>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="divide-y divide-border border-y border-border">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-0"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-left text-[0.95rem] font-medium text-foreground hover:text-trust-blue hover:no-underline py-4 normal-case [&[data-state=open]]:text-trust-blue">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 pr-2">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
