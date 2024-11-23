-- Create tables for the blog
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  author_id uuid not null,
  author_name text not null
);

-- Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Create policies
create policy "Public posts are viewable by everyone"
  on public.posts for select
  using ( true );

create policy "Users can insert their own posts"
  on public.posts for insert
  with check ( auth.uid() = author_id );

create policy "Users can update their own posts"
  on public.posts for update
  using ( auth.uid() = author_id );

create policy "Users can delete their own posts"
  on public.posts for delete
  using ( auth.uid() = author_id );

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_updated_at
  before update on public.posts
  for each row
  execute function public.handle_updated_at();