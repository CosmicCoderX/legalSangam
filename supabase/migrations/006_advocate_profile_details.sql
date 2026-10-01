-- Structured fields for verified advocates. The client currently displays clearly
-- labelled demo fallbacks until these values are supplied by an advocate profile.
alter table public.advocates
  add column if not exists address text,
  add column if not exists title text default 'Advocate',
  add column if not exists primary_practice_area text,
  add column if not exists tagline text,
  add column if not exists consultation_online boolean default true,
  add column if not exists consultation_in_person boolean default true,
  add column if not exists availability_status text default 'available-today'
    check (availability_status in ('available-now', 'available-today'));
