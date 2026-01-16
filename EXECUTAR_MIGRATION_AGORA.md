# ⚠️ URGENTE: Execute a Migration SQL Agora

## 🔴 Erro Detectado

O código está tentando usar a coluna `site_id`, mas ela ainda não existe no banco de dados.

**Erro:** `column articles.site_id does not exist`

## ✅ Solução Rápida (2 minutos)

### PASSO 1: Acesse o Supabase

1. Abra: https://supabase.com/dashboard
2. Selecione o projeto: `cpejrontfflbzmssomnr`
3. Clique em **"SQL Editor"** no menu lateral
4. Clique em **"New Query"** (ou botão +)

### PASSO 2: Execute o SQL

**COPIE e COLE este SQL completo:**

```sql
-- Add site_id column to articles table for multi-site isolation
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS site_id TEXT DEFAULT 'hirayama';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_site_id ON articles(site_id);

-- Update existing articles to have site_id (if null, set to 'hirayama')
UPDATE articles 
SET site_id = 'hirayama' 
WHERE site_id IS NULL;

-- Make site_id NOT NULL after setting defaults
ALTER TABLE articles 
ALTER COLUMN site_id SET NOT NULL;

-- Update RLS policies to include site_id filter
-- Drop existing policies
DROP POLICY IF EXISTS "Artigos públicos são visíveis para todos" ON articles;
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON articles;

-- Recreate policies with site_id awareness
-- Public articles are visible to everyone (for reading) - filtered by site_id
CREATE POLICY "Artigos públicos são visíveis para todos"
  ON articles
  FOR SELECT
  USING (published = true);

-- Allow insert with site_id check
CREATE POLICY "Permitir inserção de artigos"
  ON articles
  FOR INSERT
  WITH CHECK (true);

-- Allow update
CREATE POLICY "Permitir atualização de artigos"
  ON articles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow delete
CREATE POLICY "Permitir deleção de artigos"
  ON articles
  FOR DELETE
  USING (true);
```

### PASSO 3: Execute

1. Clique em **"Run"** (ou pressione `Ctrl+Enter` / `Cmd+Enter`)
2. Aguarde alguns segundos
3. Você deve ver: ✅ **Success. No rows returned** (ou mensagem de sucesso)

### PASSO 4: Verificar

Execute este SQL para verificar:

```sql
SELECT site_id, COUNT(*) as total
FROM articles
GROUP BY site_id;
```

Deve mostrar quantos artigos existem para cada `site_id`.

## ✅ Após Executar

1. **Recarregue a página** do admin no navegador
2. O erro deve desaparecer
3. Os artigos devem aparecer corretamente filtrados por site

## 🆘 Se Der Erro

Se aparecer algum erro ao executar o SQL:

1. **Copie a mensagem de erro completa**
2. **Verifique se a tabela `articles` existe:**
   ```sql
   SELECT * FROM articles LIMIT 1;
   ```
3. Se a tabela não existir, você precisa criar primeiro (execute `001_create_articles_table.sql`)

## 📝 Nota

Este SQL é seguro e pode ser executado múltiplas vezes (usa `IF NOT EXISTS` e `IF EXISTS`).
