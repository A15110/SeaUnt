-- Create videos table
create table if not exists public.videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  embed_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.videos enable row level security;

-- Create policies
create policy "Videos are viewable by everyone"
  on public.videos for select
  using ( true );

create policy "Only authenticated users can manage videos"
  on public.videos for all
  using ( auth.role() = 'authenticated' );

-- Create updated_at trigger
create trigger handle_updated_at_videos
  before update on public.videos
  for each row
  execute function public.handle_updated_at();