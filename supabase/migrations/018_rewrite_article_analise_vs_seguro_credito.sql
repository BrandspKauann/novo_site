-- Substitui o artigo superficial "análise vs seguro" (conteúdo reconhecido por trechos únicos).
-- Rode no SQL Editor do Supabase ou via supabase db push.
-- Se nenhuma linha for afetada, o artigo antigo já foi removido ou o texto mudou — ajuste o WHERE.

UPDATE public.articles
SET
  title = 'Análise de crédito e seguro de crédito: o que cada um faz — e por que não dá para trocar um pelo outro',
  description =
    '<p>Para <strong>CFO, controller e crédito</strong>: onde a análise de sacado para, onde a <strong>apólice</strong> entra, limites de cada ferramenta e um fluxo combinado para operação B2B a prazo.</p>',
  read_time = '22 min',
  seo_title = 'Análise de crédito x seguro de crédito: diferenças e uso combinado | Hirayama',
  seo_description =
    'Entenda análise de crédito versus seguro de crédito empresarial: prevenção, contrato, sinistro, monitoramento e como integrar na gestão de risco com Coface.',
  slug = COALESCE(NULLIF(slug, ''), 'analise-credito-e-seguro-o-que-cada-um-faz'),
  content = $hir_long$
# Análise de crédito e seguro de crédito: o que cada um faz — e por que não dá para trocar um pelo outro

Empresas B2B costumam ouvir “análise de crédito” e “seguro de crédito” na mesma conversa — e, por pressa ou simplificação, acabam tratando as duas coisas como se fossem **a mesma proteção com nomes diferentes**. Não são. Uma é **processo de decisão antes e durante a relação comercial**; a outra é **contrato de seguro** com cláusulas, exclusões, carências e mecanismo de indenização quando há sinistro coberto.

Este texto é para quem precisa explicar isso para sócio, comercial ou conselho **sem metáfora infantil** e sem promessa vazia. A ideia é separar conceitos com precisão, mostrar **onde cada ferramenta ajuda**, onde **nenhuma das duas elimina risco por completo**, e como uma operação mais madura costuma **combinar** inteligência de crédito com camada seguradora — por exemplo na linha **Coface**, com intermediação da **Hirayama** como corretora.

> **Leitura obrigatória antes de contratar:** condições, limites, franquias e exclusões **só existem no estudo e na apólice**. Nada do que lemos aqui substitui documento contratual nem posicionamento da seguradora no caso concreto.

---

## 1. Por que essa confusão é comum (e perigosa)

Três motivos aparecem com frequência:

1. **Fornecedores de dados e de seguro falam a mesma língua comercial** (“risco”, “limite”, “CNPJ”, “monitoramento”), mas com **objetos jurídicos diferentes**.
2. O time de **vendas** quer ouvir “aprovado”; o **financeiro** quer “seguro”. Se ninguém traduz, vira achismo coletivo.
3. **Marketing genérico** empurra frases curtas demais — “análise elimina risco”, “seguro resolve tudo” — que **não resistem** a uma auditoria interna nem a um calote de porte.

A consequência prática é liberar pedido com **falsa sensação de blindagem** ou, no outro extremo, **travar venda** sem critério porque “ninguém garante nada mesmo”. Os dois extremos custam dinheiro.

---

## 2. O que é, de fato, análise de crédito na operação

**Análise de crédito** (ou gestão de crédito comercial) é o conjunto de **regras, dados e julgamento** que sua empresa usa para decidir **a quem vende a prazo**, **em quanto** e **sob quais condições**. Ela pode incluir:

- **Consulta a bureaus** e bases (Serasa, Boa Vista, cadastros setoriais, **Business Information** internacional quando o sacado está no exterior).
- **Score**, **rating interno** ou classificação por faixa de risco.
- **Histórico comercial** próprio: atrasos, contestações, concentração de faturamento.
- **Política escrita**: quem aprova limite acima de X, quais documentos são obrigatórios, o que acontece após primeiro atraso.

### O que a análise **boa** entrega

| Entrega | O que isso significa na prática |
|--------|----------------------------------|
| **Probabilidade informada** | Você reduz **erros grosseiros** (CNPJ com sinais claros de stress, setor em crise, relacionamento já problemático). |
| **Limite coerente** | Teto de exposição alinhado à **tolerância** do balanço e à concentração da carteira. |
| **Rastreabilidade** | Justificativa para auditoria: “por que aprovamos este sacado neste valor”. |

### O que a análise **não** entrega

Ela **não transfere** o risco de inadimplência para terceiro. Se o cliente **quebra**, **some** ou **entra em recuperação judicial**, a análise anterior pode ter sido **perfeitamente razoável** com as informações da época — **risco residual** continua existindo. Prever não é garantir.

---

## 3. O que é seguro de crédito (visão de gestão, não de slogan)

**Seguro de crédito empresarial** é um **contrato** com seguradora. Em linhas muito gerais (sempre dependentes da apólice), ele pode:

- Estabelecer **limite de crédito** aprovado pela seguradora para sacados **enquadrados** na política.
- Prever **indenização** quando ocorre **sinistro coberto** (insolvência, inadimplemento prolongado etc., conforme definições contratuais).
- Incluir **monitoramento** e, em muitos produtos, **cobrança administrada** pela seguradora após o gatilho de sinistro.
- Trazer **exclusões**, **franquias**, **carências** e obrigações de **comunicação** em prazo — o descumprimento pode **afetar** ou **impedir** a indenização.

Ou seja: não é “opinião sobre o cliente”. É **instrumento jurídico** que distribui parte do impacto financeiro de certos eventos entre **segurado** e **seguradora**, dentro do que foi **pactuado** e **precificado**.

---

## 4. Comparativo direto — sem equivalências falsas

| Dimensão | Análise de crédito | Seguro de crédito |
|----------|-------------------|-------------------|
| **Natureza** | Processo decisório + dados | Contrato de seguro |
| **Momento central** | Antes e durante a venda | Vigência da apólice; sinistro após o evento coberto |
| **Principal saída** | Aprovar / negar / condicionar (prazo, garantia) | Limite segurado, indenização (se cabível), cobrança conforme produto |
| **“Elimina risco?”** | Não. Reduz erro e organiza exposição. | Não. Transfere **parte** do risco **previsto no contrato**. |
| **Custo típico** | Pessoal, sistema, consultas | Prêmio e condições de mercado |

A frase correta não é “análise **ou** seguro”, e muito menos “análise **substitui** seguro”. Em operações estruturadas, a lógica é: **análise para decidir bem**; **seguro para não carregar sozinho o tail risk** que nenhuma análise consegue zerar (choque de setor, fraude, evento de cauda).

---

## 5. Passo a passo: fluxo combinado (referência para política interna)

Use como **esqueleto** para crédito + comercial + financeiro — adapte ao seu porte.

1. **Cadastro e consulta** — CNPJ, grupo econômico, histórico próprio, bureaus; se exportação/importação, **BI** adequado (ex.: linha **URBA360** / Coface para visão internacional).
2. **Política de limite** — Teto por sacado, por grupo e concentração máxima; gatilhos de revisão (atraso, notícia, mudança societária).
3. **Enquadramento no seguro** — Sacados e limites **aceitos** pela seguradora; o que **não** está coberto fica explícito para não haver surpresa.
4. **Operação corrente** — Pedido, NF, comprovação de entrega; tudo que **documenta** a relação comercial (útil também em sinistro).
5. **Monitoramento** — Alertas de atraso, revisão periódica de limites, comunicação com corretora quando o risco muda.
6. **Sinistro** — Abertura em tempo e forma; organização de papelada; acompanhamento com **Hirayama** e seguradora.

Não é “checklist de marketing”. É **disciplina operacional**. Onde falta registro, falta defesa em cobrança e em sinistro.

---

## 6. Onde entram dados internacionais e cobrança (Coface)

A discussão não se esgota em “Serasa sim ou não”. Quando o sacado — ou parte relevante da cadeia — está **fora do Brasil**, a análise de crédito costuma precisar de **base internacional** (por exemplo, soluções de **Business Information** como o ecossistema **URBA360** / Coface). Isso **não** é seguro de crédito; é **informação** para calibrar decisão.

Já quando o título **já venceu** e a prioridade é **recuperação**, entra outro braço da operação Coface: **Debt Collection** — cobrança com método e alcance multijurisdicional, **sem confundir** com indenização de seguro. São peças diferentes do mesmo grupo, para **momentos diferentes** do ciclo.

---

## 7. “Só análise” — quando a equação quebra

Situações em que **só** fortalecer análise **não** responde à pergunta do conselho (“e se vier um calote grande?”):

- **Concentração** alta em poucos sacados: um evento corrói o EBITDA de um trimestre.
- **Informação defasada**: dados públicos atrasam em relação à realidade do balanço do comprador.
- **Choques sistêmicos**: setor inteiro sofre; “score” médio não captura correlação.
- **Relacionamento longo** com aparente bom histórico — até **não** ter mais.

Aí entra o seguro **como peça de arquitetura de risco**, não como substituto da análise.

---

## 8. “Só seguro” — onde também falha

Contratar apólice **sem** política de crédito interna é receita para:

- **Estourar limites** não comunicados ou **fora** do que a seguradora aprova — com risco de **não haver cobertura** no caso concreto.
- **Acumular sinistros** por desorganização documental ou por **venda fora** das condições.
- **Briga interna** entre comercial e financeiro sem critério objetivo além da “aprovação da seguradora”.

O seguro **presume** que você **opera dentro** das regras do contrato **e** com mínimo de governança comercial.

---

## 9. Indicadores que o CFO costuma cobrar (e como as duas alavancas respondem)

| Indicador | O que mede | Análise de crédito | Seguro de crédito |
|-----------|------------|-------------------|-------------------|
| Concentração (Top N) | Dependência de poucos sacados | Reduz aprovação “no feeling” em cliente gigante | Limita exposição **dentro** do aprovado pela apólice |
| Inadimplência média (dias) | Atraso antes de virar perda | Política de bloqueio e renegociação | Comunicação e sinistro conforme contrato |
| Limite médio por sacado | Agressividade comercial | Ajuste fino por risco | Deve **conversar** com limite segurado |
| Custo de cobrança interna | Horas de financeiro/jurídico | Processo antes do vencimento | Cobrança administrada (quando prevista no produto) |

Ninguém “ganha” escondendo número. O board pergunta **exposição** e **caixa**; a resposta integrada passa por **dado + contrato**, não por frase de e-mail.

---

## 10. Glossário mínimo (para alinhar comercial e jurídico na mesma reunião)

- **Sacado / comprador:** quem deve pelo crédito de fornecimento após a entrega acordada.
- **Limite de crédito (interno):** teto que **sua** política autoriza — pode ser maior ou menor que o limite segurado.
- **Limite aprovado pela seguradora:** quanto da exposição está **enquadrada** na apólice para aquele CNPJ, quando aplicável.
- **Sinistro:** formalização do evento de perda **dentro** das hipóteses contratuais; não é “ligar cobrando”.
- **Carência / franquia / exclusão:** mecanismos contratuais que definem **o que não paga**, **quando** começa a contar e **quanto** fica por conta do segurado.

---

## 11. Conclusão para quem apresenta em reunião

- **Análise de crédito** = **melhor decisão** com informação, política e limite.
- **Seguro de crédito** = **contrato** que pode **indenizar** parte do prejuízo em **eventos cobertos**, segundo apólice.
- Operações sérias **combinam** as duas coisas: uma **não** é “versão barata” da outra.

Se a sua empresa já investe em análise mas ainda **absorve sozinha** o tail risk da carteira a prazo, o próximo passo **razoável** é conversar com a **Hirayama** sobre **estudo** e enquadramento em produtos **Coface** — com leitura **transparente** de cláusulas, não com promessa de slide.

---

**Sobre este conteúdo:** material educativo. Dúvidas jurídicas ou fiscais exigem assessoria especializada. Cobertura e condições comerciais dependem da seguradora e da apólice.

$hir_long$,
  updated_at = NOW()
WHERE site_id = 'seguros-de-credito'
  AND (
    content ILIKE '%Analisar reduz risco, proteger garante segurança%'
    OR content ILIKE '%Usar apenas análise é como dirigir%'
    OR content ILIKE '%👉 Se sua empresa já faz análise%'
    OR (
      content ILIKE '%O que é análise de crédito%'
      AND content ILIKE '%O que é seguro de crédito%'
      AND content ILIKE '%Diferenças principais%'
      AND length(content) < 4000
    )
  );
