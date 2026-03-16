import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL 
  || 'https://evevdlqezaielsyzkzit.supabase.co'

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY 
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2ZXZkbHFlemFpZWxzeXpreml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODY3MDAsImV4cCI6MjA4OTE2MjcwMH0.cpV8NpMQ4gltBQlbXs3Ft_0hnUIsITI0d5dPRT4iQcA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
