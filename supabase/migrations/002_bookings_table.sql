create type public.payment_status as enum ('pending','paid','failed','refunded');
create type public.booking_status as enum ('pending','confirmed','completed','cancelled');

create table public.bookings (
    id uuid primary key default gen_random_uuid(),
    client_id uuid not null references public.profiles on delete cascade,
    advocate_id uuid not null references public.advocates on delete cascade,
    date text not null,
    start_time text not null,
    end_time text not null,
    consultation_fee int not null,
    payment_status public.payment_status not null default 'pending',
    booking_status public.booking_status not null default 'pending',
    razorpay_order_id text,
    razorpay_payment_id text,
    meeting_url text,
    created_at timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "bookings client readable" on public.bookings for select using (auth.uid() = client_id);
create policy "bookings advocate readable" on public.bookings for select using (auth.uid() = advocate_id);
create policy "bookings client insert" on public.bookings for insert with check (auth.uid() = client_id);
create policy "bookings client update" on public.bookings for update using (auth.uid() = client_id);
create policy "bookings advocate update" on public.bookings for update using (auth.uid() = advocate_id);
