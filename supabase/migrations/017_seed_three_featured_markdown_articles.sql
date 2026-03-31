-- Três artigos longos em Markdown, em destaque (featured).
-- Idempotente: só insere se o slug ainda não existir para o site.
-- Rode no Supabase (SQL Editor ou supabase db push) após migrations anteriores.

INSERT INTO public.articles (
  title,
  description,
  content,
  type,
  category,
  read_time,
  published,
  featured,
  order_index,
  site_id,
  slug,
  seo_title,
  seo_description,
  tags
)
SELECT
  'Guia prático: limite de crédito B2B sem achismo',
  '<p><strong>Em destaque.</strong> Como definir teto por sacado, quando revisar e onde o seguro de crédito entra na conversa entre comercial e financeiro.</p>',
  $hir_md_1$# Guia prático: limite de crédito B2B sem achismo

Vender a prazo é decisão de duas mesas ao mesmo tempo: a que quer faturar e a que precisa dormir sabendo que o caixa fecha. **Limite de crédito** é a ponte entre os dois lados — e quando ele nasce só de conversa de corredor, o problema aparece no primeiro calote grande.

> **Resumo:** limite bom não é o maior possível; é o maior **sustentável** diante do risco do CNPJ, da concentração da sua carteira e das condições da cobertura que você tiver (incluindo seguro de crédito, quando contratado).

---

## 1. O que é “limite” na prática operacional

Em linguagem de gestão, limite é **quanto de valor em aberto** você aceita carregar para um mesmo sacado em determinado intervalo. Pode ser por pedido, por mês ou por exposição total — o importante é que **todo mundo** (comercial, crédito, logística) fala a mesma métrica.

### Erros comuns

- Misturar **limite de pedido** com **limite de carteira** e descobrir tarde que três entregas pequenas estouraram o teto.
- Atualizar limite só quando o cliente pede mais, e não quando **muda o risco** (processo, setor, notícia, atraso leve recorrente).
- Tratar limite como “número fixo eterno”, quando na realidade ele deveria ser **revisão periódica + gatilhos**.

---

## 2. Um roteiro simples para calibrar o teto

Use a tabela abaixo como checklist interno. Preencha com honestidade — meia verdade aqui vira prejuízo depois.

| Pergunta | Por que importa |
|----------|-----------------|
| Qual o **ticket médio** e o maior pedido dos últimos 12 meses? | Mostra ordem de grandeza do rombo se der errado. |
| Qual a **concentração** (% do faturamento a prazo nos top 5 sacados)? | Concentração alta exige limite mais conservador ou camadas extras de garantia. |
| O sacado **atrasou** alguma vez? Como foi resolvido? | Histórico de atraso leve é sinal amarelo antes de aumentar limite. |
| Existe **documentação** padronizada (pedido, NF, comprovação de entrega)? | Sinistro e cobrança costumam pedir rastro; buraco administrativo vira risco real. |

---

## 3. Onde o seguro de crédito muda o jogo

Com **seguro de crédito** (e análise da seguradora, como na linha Coface), o limite deixa de ser só “nossa opinião” e passa a conversar com **parecer, política e apólice**. Isso não elimina risco — **nenhum contrato elimina** —, mas:

1. Você **antecipa** discussão de risco antes de comprometer estoque ou P&D.
2. Ganha parâmetro para dizer **não** ou **só com adiantamento** sem parecer capricho.
3. Em sinistro coberto, há **fluxo de indenização** dentro das regras contratadas, em vez de absorver 100% do prejuízo sozinho.

---

## 4. Próximos passos com a Hirayama

Se a sua operação já usa limite informal e quer estruturar isso com **Coface** e acompanhamento de corretora:

- Monte uma **lista dos principais sacados** (CNPJ, faturamento aproximado a prazo, histórico de atraso).
- Traga **exemplos de pedidos** típicos (valor, prazo, setor).
- Peça um **estudo** — a Hirayama ajuda a traduzir necessidade em produto e a alinhar expectativa com o que a apólice de fato cobre.

**Conteúdo educativo.** Condições, carências, franquias e exclusões dependem do estudo e da apólice. Para o seu caso, fale com um especialista Hirayama.

$hir_md_1$,
  'article',
  'Educativo',
  '14 min',
  true,
  true,
  0,
  'seguros-de-credito',
  'guia-limite-credito-b2b',
  'Guia: limite de crédito B2B | Hirayama',
  'Checklist para calibrar limite por sacado, concentração e papel do seguro de crédito Coface.',
  ARRAY['destaque', 'crédito', 'B2B', 'limite', 'Coface']::text[]
WHERE NOT EXISTS (
  SELECT 1 FROM public.articles a
  WHERE a.site_id = 'seguros-de-credito' AND a.slug = 'guia-limite-credito-b2b'
);

INSERT INTO public.articles (
  title,
  description,
  content,
  type,
  category,
  read_time,
  published,
  featured,
  order_index,
  site_id,
  slug,
  seo_title,
  seo_description,
  tags
)
SELECT
  'Sinistro em seguro de crédito: cronograma, papéis e expectativa realista',
  '<p><strong>Em destaque.</strong> O que costuma acontecer depois do não pagamento, quem faz o quê e por que organização documental acelera análise.</p>',
  $hir_md_2$# Sinistro em seguro de crédito: cronograma, papéis e expectativa realista

O momento em que o sacado **não paga** é o que separa operação bem desenhada de operação que vira caça ao tesouro em planilhas, e-mails e prints de WhatsApp. Em **seguro de crédito**, esse momento dispara um **fluxo de sinistro** — e fluxo, aqui, é palavra técnica: há etapas, prazos e documentos.

> **Atenção:** cada apólice é um contrato. O que descrevemos abaixo é **padrão de mercado** para fins didáticos. Prazos, percentuais e exigências do seu caso saem do **texto da apólice** e do posicionamento da seguradora.

---

## Linha do tempo típica (visão macro)

1. **Identificação do inadimplemento** — título vencido, ausência de pagamento dentro do prazo contratual com o comprador.
2. **Comunicação à seguradora** — dentro dos prazos e canais previstos (atraso na comunicação pode prejudicar o direito à indenização).
3. **Análise de documentação** — notas, comprovantes de entrega, contratos, correspondências.
4. **Cobrança administrativa / jurídica** — conforme produto; em muitos casos a **Coface** atua com estrutura própria após o sinistro.
5. **Decisão de indenização** — quando cabível, pagamento conforme cláusulas (franquia, limite, carência etc.).

---

## Papel de cada parte

| Quem | Foco principal |
|------|----------------|
| **Sua empresa** | Manter **documentação** rastreável e comunicar em tempo hábil. |
| **Corretora (Hirayama)** | Interlocução, esclarecimento de dúvidas e apoio na organização do envio de informações. |
| **Seguradora** | Análise técnica do sinistro dentro da **apólice** e, quando aplicável, cobrança e pagamento de indenização. |

---

## Lista de verificação documental (mínimo que vale reunir)

- Notas fiscais e **evidência de entrega** (canhoto, rastreio, recibo assinado — o que fizer sentido para o seu setor).
- **Pedidos** ou contratos comerciais que amarrem prazo e valor.
- Histórico de **cobrança** (e-mails, cartas, tentativas de contato datadas).
- Extrato ou planilha com **posição do título** (vencimento, valor, saldo).

---

## Perguntas frequentes (sem marketing)

### “indenização cai na conta em X dias?”

Só o que estiver **escrito** na apólice e o andamento do processo permitem cravar prazo. Evite promessa genérica.

### “preciso parar de cobrar o cliente?”

Depende do produto e da fase. Siga orientação da seguradora e da corretora para não **prejudicar** o sinistro.

### “todo atraso vira sinistro?”

Nem sempre. Há **carências**, **franquias** e eventos **excluídos**. Por isso a leitura do contrato importa tanto quanto a venda.

---

**Conclusão:** sinistro bem conduzido é menos sobre “sorte” e mais sobre **processo + papelada + prazo**. A Hirayama pode ajudar a navegar isso junto da Coface — começando por um estudo alinhado à sua operação.

$hir_md_2$,
  'article',
  'Operação',
  '12 min',
  true,
  true,
  1,
  'seguros-de-credito',
  'sinistro-seguro-credito-cronograma',
  'Sinistro em seguro de crédito: o que esperar | Hirayama',
  'Cronograma típico, papéis da empresa, corretora e seguradora, e checklist documental.',
  ARRAY['destaque', 'sinistro', 'indenização', 'Coface', 'documentação']::text[]
WHERE NOT EXISTS (
  SELECT 1 FROM public.articles a
  WHERE a.site_id = 'seguros-de-credito' AND a.slug = 'sinistro-seguro-credito-cronograma'
);

INSERT INTO public.articles (
  title,
  description,
  content,
  type,
  category,
  read_time,
  published,
  featured,
  order_index,
  site_id,
  slug,
  seo_title,
  seo_description,
  tags
)
SELECT
  'Comercial e financeiro na mesma página: crédito, risco e apólice',
  '<p><strong>Em destaque.</strong> Como reduzir atrito entre vendas e crédito usando regras claras, dados e seguro como linguagem comum.</p>',
  $hir_md_3$# Comercial e financeiro na mesma página: crédito, risco e apólice

O clássico cenário: o **comercial** promete prazo “porque o cliente é bom pagador”, e o **financeiro** segura o limite “porque já vimos esse filme”. As duas frases podem ser verdade ao mesmo tempo — o erro está em **não ter regra compartilhada** nem dado objetivo para decidir.

---

## 1. Traduza “bom cliente” em critérios

Em vez de adjetivos, use **sinais observáveis**:

- **Histórico de pagamento** (incluindo atrasos pequenos que viraram costume).
- **Participação** do cliente no faturamento a prazo (concentração).
- **Setor e sazonalidade** (alguns segmentos oscilam mais).
- **Garantias** ou compensações comerciais (adiantamento, nota promissória, outro instrumento).

Quando esses sinais entram numa **política escrita**, o “não” do financeiro deixa de parecer obstáculo pessoal.

---

## 2. O seguro como idioma comum

Com **seguro de crédito** na mesa, a conversa muda de tom:

- O **limite** pode ser apoiado por **análise da seguradora** (Coface), o que dá lastro externo à decisão.
- O comercial entende que **estourar limite** sem alinhamento pode **invalidar cobertura** — não é frescura, é contrato.
- Há **transparência** sobre o que acontece em **sinistro**, o que reduz surpresa e briga interna depois do problema.

---

## 3. Rituais simples que funcionam na prática

1. **Reunião quinzenal** comercial + crédito: fila de novos CNPJs, revisão de limites sensíveis, pedidos acima de X mil.
2. **Cartão de cliente** em um só lugar (CRM ou planilha única): último pedido, maior exposição, última revisão de limite.
3. **Gatilhos automáticos**: atraso de +N dias → bloqueio de novo pedido até reavaliação.

---

## 4. Tabela rápida: frase que ajuda vs. frase que atrapalha

| Em vez de… | Prefira… |
|------------|----------|
| “Confio neles.” | “Últimos 12 meses: X% em dia; maior atraso Y dias.” |
| “Preciso fechar o mês.” | “Consigo adiantamento de Z% para liberar prazo?” |
| “Seguro resolve tudo.” | “Seguro cobre o que está na apólice; vamos ler a cláusula juntos.” |

---

## 5. Como a Hirayama entra nesse alinhamento

A corretora não substitui sua gestão — **potencializa** com:

- Estudo de viabilidade e **adequação de produto** Coface ao seu perfil.
- Apoio para o time entender **limite**, **monitoramento** e **sinistro** em linguagem de negócio.
- Continuidade **pós-venda** quando a operação muda (novo sacado grande, exportação, M&A).

---

**Fechar:** alinhamento comercial–financeiro não é slide bonito; é **dado + regra + revisão**. Se quiser puxar isso para o mundo real com **seguro de crédito**, a Hirayama conversa com você e estrutura o próximo passo com a Coface.

$hir_md_3$,
  'article',
  'Gestão',
  '13 min',
  true,
  true,
  2,
  'seguros-de-credito',
  'comercial-financeiro-credito-apolice',
  'Comercial x financeiro: crédito e apólice | Hirayama',
  'Critérios objetivos, política de crédito e papel do seguro na conversa entre vendas e caixa.',
  ARRAY['destaque', 'gestão', 'comercial', 'crédito', 'Coface']::text[]
WHERE NOT EXISTS (
  SELECT 1 FROM public.articles a
  WHERE a.site_id = 'seguros-de-credito' AND a.slug = 'comercial-financeiro-credito-apolice'
);
