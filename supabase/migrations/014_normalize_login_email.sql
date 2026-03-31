-- Garante email em minúsculas (bate com o que o app envia)
UPDATE login
SET email = lower(trim(email))
WHERE lower(trim(email)) = 'marketingkauann@gmail.com';
