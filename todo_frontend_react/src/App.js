import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import TodoList from "./components/TodoList";
import QuotePanel from "./components/QuotePanel";
import HealthBadge from "./components/HealthBadge";
import { getSupabaseClient } from "./lib/supabaseClient";

// PUBLIC_INTERFACE
function App() {
  /** Root application: handles theme, session, and layout */
  const supabase = getSupabaseClient();
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // On load: get session
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setUser(data.session?.user || null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      sub?.subscription?.unsubscribe?.();
      mounted = false;
    };
  }, [supabase]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen">
      <button
        className="theme-toggle btn-secondary"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <Header user={user} onSignOut={handleSignOut} />

      <main className="max-w-5xl mx-auto px-4 py-6 grid gap-6 md:grid-cols-3">
        <section className="md:col-span-2 space-y-6">
          <div className="card p-6 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
                <p className="text-gray-500 text-sm">Add tasks and stay motivated.</p>
              </div>
              <HealthBadge />
            </div>
          </div>

          {!user ? (
            <AuthForm onAuth={() => { /* user state updates via listener */ }} />
          ) : (
            <TodoList user={user} />
          )}
        </section>

        <div className="md:col-span-1 space-y-6">
          <QuotePanel />
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Theme</h3>
            <p className="text-sm text-gray-500 mb-3">Ocean Professional</p>
            <div className="flex gap-2">
              <span className="h-6 w-6 rounded-full bg-ocean-primary" title="Primary" />
              <span className="h-6 w-6 rounded-full bg-ocean-secondary" title="Secondary" />
              <span className="h-6 w-6 rounded-full bg-gray-900" title="Text" />
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 pb-8 text-xs text-gray-500">
        <div className="rounded-xl border border-gray-200 p-3 bg-white">Backend URL: {process.env.REACT_APP_BACKEND_URL || "(not set)"} · Supabase URL: {process.env.REACT_APP_SUPABASE_URL || "(not set)"}</div>
      </footer>
    </div>
  );
}

export default App;
