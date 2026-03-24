-- Leads do formulário "Falar com especialista" (site público)
-- Execute no SQL Editor do Supabase ou via CLI após fazer deploy.

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  site_id text not null default 'hirayama',
  full_name text not null,
  email text not null,
  phone text not null,
  company_name text not null,
  job_title text not null,
  cnpj text,
  monthly_revenue_range text,
  interest text not null,
  message text,
  source text,
  consent_accepted boolean not null default true
);

create index if not exists contact_leads_created_at_idx on public.contact_leads (created_at desc);
create index if not exists contact_leads_site_id_idx on public.contact_leads (site_id);

alter table public.contact_leads enable row level security;

drop policy if exists "Allow anonymous insert contact_leads" on public.contact_leads;
create policy "Allow anonymous insert contact_leads"
  on public.contact_leads
  for insert
  to anon, authenticated
  with check (true);
