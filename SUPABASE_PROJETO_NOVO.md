# Novo projeto Supabase (passo a passo)

Use quando for **criar um banco do zero** ou trocar de projeto. O site Hirayama lê tudo de **duas variáveis** no front.

## 1. Criar o projeto

1. Acesse [supabase.com](https://supabase.com) → **New project**.
2. Defina senha do banco, região (ex.: **South America** se existir) e aguarde ficar **Active**.

## 2. Copiar credenciais (o que você coloca no `.env`)

1. **Project Settings** (ícone de engrenagem) → **API**.
2. Copie:
   - **Project URL** → vai em `VITE_SUPABASE_URL`
   - **Publishable key** (ou **anon public**) → vai em `VITE_SUPABASE_PUBLISHABLE_KEY`

No arquivo `.env` na raiz do site:

```env
VITE_SUPABASE_URL=https://SEU_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_anon_aqui
```

**Não** coloque a **service_role** no front — só no servidor (n8n, scripts admin), nunca no Vite/React.

Depois de mudar o `.env`: pare e rode de novo `npm run dev`.

## 3. Rodar o SQL (neste projeto, SQL Editor)

No **mesmo** projeto do passo 2, abra **SQL Editor** e execute **nesta ordem** (arquivos em `supabase/migrations/`):

| Ordem | Arquivo | Para quê |
|------|---------|----------|
| 1 | `001_create_articles_table_fix.sql` | Tabela `articles`, RLS básica, trigger `updated_at` |
| 2 | `007_add_seo_fields_to_articles.sql` | `slug`, SEO, `og_image_url` |
| 3 | `010_ensure_articles_site_id.sql` | Coluna `site_id` (evita erro no admin) |
| 4 | `011_add_youtube_iframe_to_articles.sql` | Iframe YouTube no artigo |
| 5 | `005_create_login_table.sql` | Login do admin (tabela `login`) |
| 6 | `009_contact_leads.sql` | Formulário “Fale com especialista” |

Ao final da última query útil, se ainda der erro estranho de schema, rode:

```sql
NOTIFY pgrst, 'reload schema';
```

## 4. Próximos sites / outros projetos

- **Mesmo Supabase para vários sites (Hirayama):** todos usam **as mesmas** `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`. O que muda é só o **`site_id`** no código ou no painel admin (`hirayama`, `vr-consultoria`, etc.).
- **Outro Supabase só para um site:** novo projeto → novo `.env` naquele repositório; repita a tabela de SQL acima nesse projeto.

## 5. Storage (imagens dos artigos)

1. **Storage** → **New bucket** → nome **`article-media`** (ou defina `VITE_SUPABASE_STORAGE_BUCKET` no `.env` com outro nome e crie esse bucket).
2. Deixe **público** se quiser URLs diretas nas imagens dos artigos, ou ajuste políticas RLS do Storage para leitura pública + upload só para usuários autenticados (conforme sua segurança).

## 6. Usuário do admin (`login`)

Depois da tabela `login`, cadastre um registro com e-mail ativo conforme o fluxo que você já usa (dashboard ou SQL do projeto).
