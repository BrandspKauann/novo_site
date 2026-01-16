# 🔒 Aplicar Isolamento de Site

Este documento explica como aplicar o isolamento de dados entre o site Hirayama e o site de Vale Refeição.

## 🎯 O Problema

Ambos os projetos estavam compartilhando a mesma tabela `articles` no Supabase, causando:
- Artigos criados no site Hirayama aparecendo no site de Vale Refeição
- Artigos criados no site de Vale Refeição aparecendo no site Hirayama

## ✅ A Solução

Foi adicionado um campo `site_id` na tabela `articles` para identificar qual site pertence cada artigo:
- Site Hirayama: `site_id = 'hirayama'`
- Site Vale Refeição: `site_id = 'vale-refeicao'` (ou outro identificador que você definir)

## 📋 Passos para Aplicar

### PASSO 1: Executar Migration SQL no Supabase

1. **Acesse o Supabase Dashboard:**
   - Vá para: https://supabase.com/dashboard
   - Selecione o projeto: `cpejrontfflbzmssomnr` (ou o projeto que você está usando)

2. **Abra o SQL Editor:**
   - No menu lateral, clique em **"SQL Editor"**
   - Clique em **"New Query"** (ou botão +)

3. **Execute a Migration:**
   - Abra o arquivo: `supabase/migrations/006_add_site_id_to_articles.sql`
   - **COPIE TODO o conteúdo** do arquivo
   - **COLE no SQL Editor** do Supabase
   - Clique em **"Run"** (ou pressione `Ctrl+Enter` / `Cmd+Enter`)

4. **Verifique o resultado:**
   - Você deve ver: ✅ **Success. No rows returned** (ou mensagem de sucesso)
   - Se houver erro, verifique se a tabela `articles` existe

### PASSO 2: Verificar se a Migration Funcionou

1. **No Supabase Dashboard:**
   - Vá em **Table Editor**
   - Selecione a tabela `articles`
   - Verifique se a coluna `site_id` existe
   - Verifique se os artigos existentes têm `site_id = 'hirayama'`

2. **Se os artigos não tiverem `site_id`:**
   - Execute este SQL adicional:
   ```sql
   UPDATE articles 
   SET site_id = 'hirayama' 
   WHERE site_id IS NULL OR site_id = '';
   ```

### PASSO 3: Configurar o Outro Site (Vale Refeição)

**IMPORTANTE:** O outro projeto (site de Vale Refeição) também precisa ser atualizado:

1. **No projeto do Vale Refeição:**
   - Adicione um arquivo similar a `src/config/site.ts` com:
     ```typescript
     export const SITE_ID = 'vale-refeicao';
     ```
   - Atualize todas as queries para incluir `.eq("site_id", SITE_ID)`
   - Execute a mesma migration SQL (ela já atualiza os artigos existentes)

2. **Ou, se preferir usar outro identificador:**
   - Você pode usar qualquer string como `site_id`
   - Exemplos: `'vale-refeicao'`, `'vr'`, `'site2'`, etc.
   - Apenas certifique-se de que cada site use um identificador único

### PASSO 4: Testar o Isolamento

1. **No site Hirayama:**
   - Acesse o painel admin
   - Crie um novo artigo de teste
   - Verifique se ele aparece apenas no site Hirayama

2. **No site de Vale Refeição:**
   - Verifique se o artigo criado no Hirayama NÃO aparece
   - Crie um artigo de teste no Vale Refeição
   - Verifique se ele aparece apenas no site de Vale Refeição

## 🔍 Verificação

Para verificar se está funcionando corretamente:

1. **No Supabase SQL Editor, execute:**
   ```sql
   SELECT site_id, COUNT(*) as total
   FROM articles
   GROUP BY site_id;
   ```
   
   Isso mostrará quantos artigos existem para cada `site_id`.

2. **Verifique artigos específicos:**
   ```sql
   SELECT id, title, site_id, created_at
   FROM articles
   ORDER BY created_at DESC
   LIMIT 10;
   ```

## ⚠️ Importante

- **Nunca remova o campo `site_id`** - ele é essencial para o isolamento
- **Sempre inclua `site_id` ao criar novos artigos** - o código já faz isso automaticamente
- **Mantenha os identificadores únicos** - cada site deve ter seu próprio `site_id`
- **Faça backup antes de executar migrations** - especialmente se houver muitos dados

## 🆘 Problemas Comuns

### Erro: "column site_id does not exist"
- **Solução:** Execute a migration SQL primeiro (PASSO 1)

### Artigos antigos não têm site_id
- **Solução:** Execute o SQL do PASSO 2 para atualizar artigos existentes

### Artigos ainda aparecem em ambos os sites
- **Solução:** Verifique se ambos os projetos foram atualizados com o filtro `site_id`
- Verifique se o `SITE_ID` está configurado corretamente em cada projeto

## ✅ Após Aplicar

Após executar a migration e atualizar ambos os projetos:
- ✅ Artigos do Hirayama aparecerão apenas no site Hirayama
- ✅ Artigos do Vale Refeição aparecerão apenas no site de Vale Refeição
- ✅ Novos artigos serão automaticamente associados ao site correto
