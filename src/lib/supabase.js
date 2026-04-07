import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Bypass navigator.locks: las extensiones de browser (MetaMask, Rabby, etc.)
// inyectan un "SES lockdown" que interfiere con la API navigator.locks,
// causando NavigatorLockAcquireTimeoutError y colgando la inicialización de auth.
// Para una app de pestaña única esto es completamente seguro.
const noopLock = (_name, _timeout, fn) => fn();

export const supabase = createClient(url, key, {
  auth: { lock: noopLock },
});
