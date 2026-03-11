create table if not exists public.contracts (
  id text primary key,
  title text not null,
  body text not null,
  article_url text,
  information_type text not null,
  service_line text not null,
  industry text not null,
  service_provider text not null,
  geography text not null,
  country_signed text not null,
  delivery_location text not null,
  client_name text not null,
  contract_start_date date not null,
  contract_length_months integer not null,
  contract_end_date date not null,
  contract_end_estimated boolean not null default true,
  tcv_usd bigint not null default 0,
  tcv_estimated boolean not null default true,
  contract_type text not null,
  platform text not null,
  saas_platform boolean not null default false,
  source text not null,
  ai_confidence numeric(4,2) not null default 0.5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contracts enable row level security;

drop policy if exists "service_role_all" on public.contracts;
create policy "service_role_all" on public.contracts
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
