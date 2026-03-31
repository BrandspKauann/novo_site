-- Painel: apenas marketingkauann@gmail.com (senha = hash SHA-256 armazenado; altere via app ou novo UPDATE se trocar senha)
-- Remove outros registros e fixa/atualiza o usuário autorizado.

DELETE FROM login WHERE lower(trim(email)) <> 'marketingkauann@gmail.com';

INSERT INTO login (email, password_hash, role, active)
VALUES (
  'marketingkauann@gmail.com',
  '1510ba892f4d31b06d63165a9cde8001f6b92abe26a984abdda6061f0e41b79b',
  'admin',
  true
)
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  active = true,
  updated_at = NOW();
