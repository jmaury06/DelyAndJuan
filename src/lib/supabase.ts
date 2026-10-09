import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Crear cliente con valores por defecto si no hay variables de entorno
// Esto permite que la app funcione en modo fallback con datos mock
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

// Storage bucket name
export const WEDDING_PHOTOS_BUCKET = 'wedding-photos'
export const ICONS_BUCKET = 'icons'
