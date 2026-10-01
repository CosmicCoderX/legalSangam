-- Alter documents for Gemini Summarization
alter table public.documents
  add column if not exists summary_status text not null default 'not_started'
    check (summary_status in ('not_started','processing','completed','failed')),
  add column if not exists summary_content text,
  add column if not exists summary_generated_at timestamptz;

-- Create reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings on delete cascade,
  client_id uuid not null references public.profiles on delete cascade,
  advocate_id uuid not null references public.advocates on delete cascade,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now(),
  unique (booking_id)
);

-- Create notifications table
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  type text not null,
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz default now()
);

-- Create news_cache table
create table if not exists public.news_cache (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  description text,
  image_url text,
  source_name text,
  source_url text not null,
  published_at text,
  fetched_at timestamptz default now(),
  unique (source_url)
);

-- Enable RLS
alter table public.reviews       enable row level security;
alter table public.notifications enable row level security;
alter table public.news_cache    enable row level security;

-- Policies (drop first so re-runs are safe)
drop policy if exists "reviews readable"              on public.reviews;
drop policy if exists "reviews client insert"         on public.reviews;
drop policy if exists "notifications user readable"   on public.notifications;
drop policy if exists "notifications user update"     on public.notifications;
drop policy if exists "notifications user insert"     on public.notifications;
drop policy if exists "news readable"                 on public.news_cache;

create policy "reviews readable" on public.reviews for select
  using (true);

create policy "reviews client insert" on public.reviews for insert
  with check (auth.uid() = client_id);

create policy "notifications user readable" on public.notifications for select
  using (auth.uid() = user_id);

create policy "notifications user update" on public.notifications for update
  using (auth.uid() = user_id);

create policy "notifications user insert" on public.notifications for insert
  with check (auth.uid() = user_id);

create policy "news readable" on public.news_cache for select
  using (true);