# 🔗 Links do Admin

## 📍 Links para Acessar o Painel Admin

### Site Hirayama (Seguro de Crédito)

**Login:**
```
http://localhost:8080/admin/login
```

**Painel Admin (após login):**
```
http://localhost:8080/admin
```

**Registro (se necessário):**
```
http://localhost:8080/admin/signup
```

---

## 🚀 Como Acessar

1. **Inicie o servidor** (se ainda não estiver rodando):
   ```bash
   npm run dev
   ```

2. **Acesse o link de login:**
   - Abra no navegador: `http://localhost:8080/admin/login`

3. **Faça login:**
   - Use suas credenciais (email e senha configurados no sistema)

4. **Após login:**
   - Você será redirecionado para: `http://localhost:8080/admin`
   - Aqui você pode criar, editar e gerenciar artigos

---

## 📝 Notas

- A porta padrão é **8080** (conforme configurado no `vite.config.ts`)
- Se a porta estiver em uso, o Vite pode usar outra porta (verifique no terminal)
- O admin está protegido por autenticação - você precisa fazer login primeiro
- Artigos criados aqui terão automaticamente `site_id = 'hirayama'`

---

## 🔒 Segurança

- Nunca compartilhe suas credenciais
- Use senhas fortes
- Faça logout quando terminar de usar
