-- Tabla de precios/disponibilidad dinámicos, alimentada por Keepa vía
-- scripts/sync-keepa-prices.ts (cron diario). Los datasets JSON siguen
-- siendo la fuente de verdad para specs y contenido editorial; esta tabla
-- solo aporta precio, disponibilidad e imagen actualizados por ASIN.
create table if not exists public.product_prices (
  asin text primary key,
  price_current numeric(10, 2),
  price_previous numeric(10, 2),
  currency text not null default 'EUR',
  availability text,
  image_url text,
  rating numeric(2, 1),
  review_count integer,
  last_updated timestamptz not null default now()
);

alter table public.product_prices enable row level security;

-- Lectura pública (rol anon/authenticated vía publishable key). Las
-- escrituras NO tienen policy para esos roles, así que solo la secret key
-- (que se salta RLS como service role) puede hacer upsert.
-- drop+create (en vez de "create policy if not exists", que no existe en
-- Postgres) para que el script se pueda re-ejecutar sin abortar a mitad.
drop policy if exists "product_prices_public_read" on public.product_prices;
create policy "product_prices_public_read"
  on public.product_prices
  for select
  to anon, authenticated
  using (true);

-- Grants explícitos. service_role ya debería tener bypass de RLS + acceso
-- completo por defecto en Supabase, pero se declara explícito por si la
-- tabla se creó fuera del flujo normal del dashboard y los privilegios por
-- defecto del schema "public" no se propagaron.
grant select on public.product_prices to anon, authenticated;
grant select, insert, update, delete on public.product_prices to service_role;
