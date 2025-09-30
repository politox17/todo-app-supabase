
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  // Avviso in console se mancano env; Vite richiede prefisso VITE_
  // e riavvio del dev server dopo aver creato/modificato .env
  // Questo aiuta a capire perché le chiamate al DB falliscono silenziosamente.
  console.warn("Supabase env mancanti: verifica VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY");
}