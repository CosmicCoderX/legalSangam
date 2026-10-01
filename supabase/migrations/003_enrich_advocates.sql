alter table public.advocates
add column photo_url text,
add column courts text,
add column rating numeric(3, 1),
add column reviews int,
add column bio text,
add column enrollment text,
add column languages text[];
