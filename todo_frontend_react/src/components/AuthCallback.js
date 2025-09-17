import { useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabaseClient';

export default function AuthCallback() {
  const supabase = getSupabaseClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // supabase-js v2 handles session via URL automatically when detectSessionInUrl is true (we enabled it).
        // This component just exists to show a "processing" state and could redirect elsewhere if needed.
        // Optionally, you can force a refresh of the session:
        await supabase.auth.getSession();
        // Redirect to root/dashboard
        window.location.replace('/');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Auth callback error:', e);
        window.location.replace('/auth/error');
      }
    };
    handleAuthCallback();
  }, [supabase]);

  return <div style={{ padding: 16 }}>Processing authentication...</div>;
}
