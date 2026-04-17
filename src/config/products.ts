import protectionIcon from "@/assets/protection-icon.jpg";
import intelligenceIcon from "@/assets/intelligence-icon.jpg";
import collectionIcon from "@/assets/collection-icon.jpg";

export type ProductSlug =
  | "seguro-de-credito"
  | "consulta-de-dados-empresariais"
  | "cobranca-de-divida";

type ProductSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type ProductFaq = {
  question: string;
  answer: string;
};

type ProductMetric = {
  label: string;
  value: string;
  description: string;
};

export type ProductDefinition = {
  slug: ProductSlug;
  title: string;
  shortTitle: string;
  navLabel: string;
  cardDescription: string;
  cardFeatures: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroHighlights: string[];
  seoTitle: string;
  seoDescription: string;
  image: string;
  metrics: ProductMetric[];
  sections: ProductSection[];
  faq: ProductFaq[];
  ctaSource: string;
};

export const PRODUCTS: ProductDefinition[] = [
  {
    slug: "seguro-de-credito",
    title: "Seguro de Crédito",
    shortTitle: "Seguro de Crédito",
    navLabel: "Seguro de Crédito",
    cardDescription:
      "Proteja vendas a prazo, defina limites com mais segurança e reduza o impacto financeiro da inadimplência no fluxo de caixa.",
    cardFeatures: [
      "Cobertura de até 90%, conforme apólice",
      "Monitoramento contínuo da carteira",
      "Análise de limite antes da venda",
      "Apoio especializado na cobrança",
    ],
    heroEyebrow: "Gestão de risco comercial",
    heroTitle: "Seguro de Crédito para vender mais e proteger seu caixa",
    heroDescription:
      "Ideal para empresas que vendem a prazo e precisam crescer com mais previsibilidade. A solução combina análise de risco, definição de limite de crédito, monitoramento da carteira e indenização em caso de não pagamento coberto pela apólice.",
    heroHighlights: ["Até 90% de cobertura", "Monitoramento do comprador", "Mais segurança para vender a prazo"],
    seoTitle: "Seguro de Crédito Empresarial | Proteção contra inadimplência",
    seoDescription:
      "Entenda como o Seguro de Crédito ajuda sua empresa a vender a prazo com mais segurança, definir limites e reduzir perdas com inadimplência.",
    image: protectionIcon,
    metrics: [
      {
        label: "Cobertura",
        value: "Até 90%",
        description: "Proteção financeira para créditos garantidos, conforme estrutura da apólice.",
      },
      {
        label: "Análise prévia",
        value: "Antes da venda",
        description: "Ajuda a decidir prazo e limite com base no perfil do comprador.",
      },
      {
        label: "Monitoramento",
        value: "Contínuo",
        description: "A carteira é acompanhada para ajustar exposição e evitar surpresas.",
      },
    ],
    sections: [
      {
        eyebrow: "Para quem faz sentido",
        title: "Quando o Seguro de Crédito se torna estratégico",
        paragraphs: [
          "Essa solução faz mais sentido para empresas B2B que faturam a prazo, dependem de poucos compradores relevantes ou precisam sustentar crescimento sem sacrificar caixa.",
          "Na prática, o seguro transforma risco de crédito em processo: você não depende apenas de feeling comercial para aprovar pedidos, negociar prazo ou expandir a carteira.",
          "Também é especialmente útil quando a empresa está ampliando participação em novos mercados, aumentando ticket médio por cliente ou operando com margens sensíveis a atraso. Nesses cenários, um evento de inadimplência relevante pode comprometer trimestre, investimento e até ritmo de expansão.",
          "Para negócios que já têm governança mínima de crédito, o ganho aparece rápido: decisões mais consistentes entre comercial e financeiro, menor improviso em exceções e maior clareza sobre quanto risco cada comprador realmente representa para a companhia.",
        ],
        bullets: [
          "Operações com vendas recorrentes a prazo",
          "Carteira concentrada em poucos clientes ou setores",
          "Planos de crescimento com abertura de novos compradores",
          "Necessidade de previsibilidade para caixa e financiamento",
          "Empresas com limites comerciais definidos, mas sem proteção para eventos de cauda",
          "Negócios que precisam reduzir dependência de renegociações e prorrogações frequentes",
        ],
      },
      {
        eyebrow: "Como funciona",
        title: "Mais do que indenização: uma rotina de controle de risco",
        paragraphs: [
          "Segundo a própria Coface, o Seguro de Crédito reúne três pilares complementares: informação de risco, cobrança e indenização. Isso significa que a solução começa antes do problema e continua durante todo o relacionamento comercial.",
          "O processo normalmente envolve análise do comprador, definição de limite, acompanhamento da carteira e acionamento da cobrança especializada quando necessário. Se o evento coberto ocorrer, a apólice indeniza os créditos garantidos nos termos contratados.",
          "No dia a dia, isso se traduz em uma rotina contínua: avaliar exposição por cliente, revisar limites quando o contexto muda e registrar a operação com qualidade documental suficiente para sustentar eventual sinistro. O valor está na consistência do processo, não em ações pontuais.",
          "Quando comercial, crédito e financeiro operam com os mesmos critérios, a empresa reduz decisões por urgência e melhora a qualidade das negociações de prazo. A venda continua fluindo, mas com parâmetros claros sobre até onde vale avançar em cada comprador.",
        ],
        bullets: [
          "Definição de limites por comprador",
          "Acompanhamento de sinais de deterioração financeira",
          "Suporte para decisões de prazo e exposição",
          "Recuperação e indenização conforme condições da apólice",
          "Revisão de exposição por setor, concentração e comportamento de pagamento",
          "Governança documental para cobrança e eventual abertura de sinistro",
        ],
      },
      {
        eyebrow: "Valor para o negócio",
        title: "O impacto vai além do sinistro",
        paragraphs: [
          "Empresas costumam buscar o seguro pensando apenas em inadimplência, mas o ganho principal costuma estar na disciplina comercial que ele traz. Com critérios mais claros, a equipe vende com mais segurança e a direção ganha visibilidade sobre concentração de risco.",
          "Além disso, a existência de uma política estruturada de crédito pode fortalecer conversas com bancos e melhorar a qualidade do crescimento, especialmente em momentos de expansão ou de economia volátil.",
          "Com previsibilidade maior sobre exposição e perdas potenciais, a companhia melhora planejamento de caixa, reduz decisões reativas e consegue discutir crescimento com base em cenários mais realistas. Isso impacta orçamento, priorização de investimentos e capacidade de sustentar metas comerciais de médio prazo.",
          "Outro ganho prático é a profissionalização da cultura de risco: exceções passam a ser justificadas, acompanhadas e revistas. Em vez de tratar inadimplência como surpresa, a empresa passa a tratar crédito como variável estratégica de governança.",
        ],
      },
    ],
    faq: [
      {
        question: "O Seguro de Crédito serve apenas quando o cliente quebra?",
        answer:
          "Não. Ele também ajuda a prevenir perdas, porque apoia a definição de limites e o monitoramento da carteira antes que a inadimplência aconteça.",
      },
      {
        question: "Posso usar para clientes no Brasil e no exterior?",
        answer:
          "Depende da estrutura contratada, mas a lógica da solução atende operações domésticas e internacionais, com apoio de informação e cobrança compatíveis com cada caso.",
      },
      {
        question: "Quem mais aproveita esse produto?",
        answer:
          "Empresas com vendas B2B a prazo, margens sensíveis a atraso e necessidade de crescer sem assumir riscos desproporcionais por cliente.",
      },
    ],
    ctaSource: "produto:seguro_credito",
  },
  {
    slug: "consulta-de-dados-empresariais",
    title: "Consulta de Dados Empresariais",
    shortTitle: "Consulta de Dados Empresariais",
    navLabel: "Consulta de Dados Empresariais",
    cardDescription:
      "Analise clientes, fornecedores e parceiros no Brasil e no exterior com dados financeiros, opinião de crédito e monitoramento contínuo.",
    cardFeatures: [
      "Cobertura em mais de 200 mercados",
      "Score e opinião de crédito",
      "Alertas sobre mudanças de risco",
      "Suporte para clientes e fornecedores",
    ],
    heroEyebrow: "Inteligência comercial",
    heroTitle: "Consulta de Dados Empresariais para decidir com mais confiança",
    heroDescription:
      "Se você precisa saber se uma empresa tem histórico compatível com o tamanho do negócio que pretende fechar, essa solução entrega uma visão prática de risco. É útil tanto para aprovar clientes quanto para avaliar fornecedores e parceiros estratégicos.",
    heroHighlights: ["200 mercados", "Score de risco", "Alertas diários"],
    seoTitle: "Consulta de Dados Empresariais | Análise de risco de empresas",
    seoDescription:
      "Avalie clientes, fornecedores e parceiros com consulta de dados empresariais, score de risco e monitoramento contínuo no Brasil e no exterior.",
    image: intelligenceIcon,
    metrics: [
      {
        label: "Cobertura",
        value: "200 mercados",
        description: "Base global para apoiar decisões no Brasil e no exterior.",
      },
      {
        label: "Leitura de risco",
        value: "0 a 10",
        description: "Escala padronizada de probabilidade de default usada pela Coface em seus modelos.",
      },
      {
        label: "Atualização",
        value: "Contínua",
        description: "Alertas ajudam a reagir a mudanças relevantes na saúde financeira das empresas monitoradas.",
      },
    ],
    sections: [
      {
        eyebrow: "O que você descobre",
        title: "Menos achismo, mais critério na aprovação de negócios",
        paragraphs: [
          "A Consulta de Dados Empresariais foi pensada para apoiar decisões de crédito, compras e parcerias. Em vez de avaliar uma empresa apenas por percepção comercial, você passa a considerar histórico, sinais financeiros, opinião de crédito e contexto do mercado.",
          "Isso é especialmente útil quando o valor negociado é relevante, quando o prazo é longo ou quando você está entrando em uma relação comercial nova e precisa reduzir exposição logo no início.",
        ],
        bullets: [
          "Avaliação de clientes antes de conceder prazo",
          "Análise de fornecedores críticos para evitar ruptura",
          "Checagem de parceiros em novos mercados",
          "Monitoramento contínuo de uma carteira já ativa",
        ],
      },
      {
        eyebrow: "O diferencial",
        title: "Dados que dialogam com decisão, não só planilhas",
        paragraphs: [
          "De acordo com a plataforma de Business Information da Coface, a leitura de risco combina visão financeira, opinião especializada e alertas sobre mudanças relevantes. Isso ajuda a enxergar não apenas a fotografia atual, mas a tendência do parceiro comercial.",
          "Na prática, a solução ajuda a responder perguntas simples e valiosas: essa empresa comporta o volume que quero vender? Esse fornecedor é robusto o suficiente? Vale abrir crédito, reduzir exposição ou renegociar condições?",
        ],
        bullets: [
          "Score padronizado de risco",
          "Opinião de crédito especializada",
          "Alertas e acompanhamento do portfólio",
          "Visão integrada para Brasil e exterior",
        ],
      },
      {
        eyebrow: "Resultado esperado",
        title: "Mais segurança para crescer e negociar melhor",
        paragraphs: [
          "Quando o time comercial e o financeiro operam com a mesma referência de risco, as decisões ficam mais rápidas e consistentes. Você evita concentrar exposição em parceiros frágeis e consegue ajustar prazo, limite e condições com base em evidência.",
          "Essa clareza reduz o risco de inadimplência e também diminui erros na seleção de fornecedores, algo decisivo para empresas que dependem de cadeias de suprimento críticas.",
        ],
      },
    ],
    faq: [
      {
        question: "Essa consulta serve só para clientes?",
        answer:
          "Não. Ela também é útil para avaliar fornecedores, distribuidores, parceiros internacionais e qualquer empresa com impacto relevante na sua operação.",
      },
      {
        question: "Ajuda mesmo sem contratar seguro?",
        answer:
          "Sim. A solução pode ser usada isoladamente para melhorar decisões comerciais e reduzir exposição antes de qualquer contratação de seguro.",
      },
      {
        question: "É útil para negócios fora do Brasil?",
        answer:
          "Sim. A proposta é justamente padronizar análise de risco em vários mercados, o que ajuda em exportação, importação e expansão internacional.",
      },
    ],
    ctaSource: "produto:consulta_dados",
  },
  {
    slug: "cobranca-de-divida",
    title: "Cobrança de Dívida",
    shortTitle: "Cobrança de Dívida",
    navLabel: "Cobrança de Dívida",
    cardDescription:
      "Recupere recebíveis em atraso com apoio especializado no Brasil e no exterior, preservando o foco da sua equipe no core business.",
    cardFeatures: [
      "Cobrança amigável e escalonada",
      "Atuação nacional e internacional",
      "Preservação do relacionamento comercial",
      "Modelo com pagamento atrelado à recuperação",
    ],
    heroEyebrow: "Recuperação de recebíveis",
    heroTitle: "Cobrança de Dívida para recuperar caixa sem travar a operação",
    heroDescription:
      "Quando a fatura atrasa, o problema deixa de ser apenas financeiro e passa a consumir tempo, energia e foco da equipe. A solução de Cobrança de Dívida estrutura a recuperação com abordagem profissional, inclusive em operações internacionais, e no seu modelo comercial você só paga se houver recuperação.",
    heroHighlights: ["Brasil e exterior", "Cobrança amigável", "Só paga se recuperar"],
    seoTitle: "Cobrança de Dívida B2B | Recuperação de recebíveis",
    seoDescription:
      "Entenda como a Cobrança de Dívida ajuda a recuperar recebíveis no Brasil e no exterior com abordagem profissional e foco na preservação do caixa.",
    image: collectionIcon,
    metrics: [
      {
        label: "Escopo",
        value: "Nacional e internacional",
        description: "A cobrança pode seguir fluxos adequados ao país e ao perfil do devedor.",
      },
      {
        label: "Abordagem",
        value: "Amigável primeiro",
        description: "A prioridade é recuperar mantendo a relação comercial sempre que possível.",
      },
      {
        label: "Modelo",
        value: "Sucesso",
        description: "No seu posicionamento comercial, o cliente só paga se a dívida for efetivamente recuperada.",
      },
    ],
    sections: [
      {
        eyebrow: "Quando usar",
        title: "Recuperar recebíveis sem sobrecarregar o time interno",
        paragraphs: [
          "Muitas empresas demoram a agir porque a cobrança consome a equipe, desgasta a relação com o cliente e exige repertório jurídico e operacional que nem sempre existe internamente. O resultado costuma ser caixa parado e baixa prioridade para recuperação.",
          "A Cobrança de Dívida entra justamente para dar método, ritmo e especialização ao processo, sem desviar seu time do que realmente gera crescimento.",
        ],
        bullets: [
          "Faturas vencidas que já começaram a impactar o caixa",
          "Carteiras com muitos clientes atrasados",
          "Cobrança internacional com complexidade adicional",
          "Necessidade de manter postura profissional e documentada",
        ],
      },
      {
        eyebrow: "Como a cobrança avança",
        title: "Negociação, formalização e escalonamento com inteligência",
        paragraphs: [
          "A literatura pública da Coface sobre debt collection destaca a importância de começar com abordagem amigável, personalizada e persistente. O objetivo é entender a causa do atraso, formalizar compromissos e aumentar a chance de pagamento sem deteriorar o relacionamento além do necessário.",
          "Quando a via amigável não resolve, a cobrança pode evoluir com medidas mais formais e, se fizer sentido, com apoio jurídico. Isso reduz improviso e melhora a governança da recuperação.",
        ],
        bullets: [
          "Diagnóstico da dívida e do perfil do devedor",
          "Contato estruturado e negociação de pagamento",
          "Formalização de acordos e follow-up",
          "Escalonamento quando a via amigável se esgota",
        ],
      },
      {
        eyebrow: "Valor financeiro",
        title: "Recuperar caixa com custo alinhado ao resultado",
        paragraphs: [
          "No modelo que você descreveu, o cliente só paga se a dívida for paga. Isso torna a proposta especialmente aderente para empresas que querem atacar inadimplência sem adicionar um custo fixo elevado a uma situação que já pressiona a tesouraria.",
          "Além da recuperação em si, a cobrança profissional ajuda a organizar evidências, mapear disputas e criar uma disciplina que reduz reincidência no médio prazo.",
        ],
      },
    ],
    faq: [
      {
        question: "A cobrança precisa começar no jurídico?",
        answer:
          "Não. Em geral, a recuperação começa por uma trilha amigável e estruturada, com escalonamento apenas quando necessário.",
      },
      {
        question: "É possível cobrar clientes fora do Brasil?",
        answer:
          "Sim. A cobrança internacional exige método, idioma, cultura e rito adequados ao país, e justamente por isso se beneficia de uma estrutura especializada.",
      },
      {
        question: "Como funciona o modelo sem custo se não recuperar?",
        answer:
          "No posicionamento comercial informado por você, a cobrança só gera custo quando há recuperação. Isso reduz a barreira para agir sobre títulos já vencidos.",
      },
    ],
    ctaSource: "produto:cobranca_divida",
  },
];

export const PRODUCTS_BY_SLUG = Object.fromEntries(
  PRODUCTS.map((product) => [product.slug, product]),
) as Record<ProductSlug, ProductDefinition>;
