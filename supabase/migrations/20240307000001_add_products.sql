-- Create products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  embed_code text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.products enable row level security;

-- Create policies
create policy "Products are viewable by everyone"
  on public.products for select
  using ( active = true );

create policy "Only authenticated users can manage products"
  on public.products for all
  using ( auth.role() = 'authenticated' );

-- Create updated_at trigger
create trigger handle_updated_at_products
  before update on public.products
  for each row
  execute function public.handle_updated_at();