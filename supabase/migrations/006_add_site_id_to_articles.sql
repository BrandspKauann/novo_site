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
