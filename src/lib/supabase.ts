import { createClient } from '@supabase/supabase-js'

/*
  SQL para crear la tabla en Supabase Dashboard → SQL Editor:

  create table if not exists proposals (
    id uuid default gen_random_uuid() primary key,
    slug text unique not null,
    client_name text not null,
    client_company text not null,
    agent_name text default 'Mafe',
    whatsapp_number text not null,
    start_date text not null,
    deadline_date text not null,
    expiry_date text not null,
    deadline_iso timestamptz not null,
    diagnosis jsonb not null default '[]',
    urgency_text text not null default '',
    stats jsonb not null default '[]',
    opportunity_quote text not null default '',
    plans jsonb not null default '[]',
    recommendation_text text not null default '',
    closing_headline text not null default '',
    closing_body text not null default '',
    ai_client_context text not null default '',
    terms_url text default 'https://ferova.com.co/terminos',
    is_active boolean default true,
    views_count integer default 0,
    approved_at timestamptz,
    created_at timestamptz default now(),
    expires_at timestamptz
  );

  -- Política de seguridad
  alter table proposals enable row level security;

  create policy "lectura_publica" on proposals
    for select using (is_active = true);

  create policy "admin_todo" on proposals
    for all using (auth.role() = 'authenticated');
*/

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
