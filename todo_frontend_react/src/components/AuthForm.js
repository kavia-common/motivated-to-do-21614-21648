import React, { useState } from "react";
import { getSupabaseClient } from "../lib/supabaseClient";
import { getURL } from "../lib/getURL";

/**
 * PUBLIC_INTERFACE
 * AuthForm
 * Handles sign up and sign in with Supabase email+password.
 */
export default function AuthForm({ onAuth }) {
  const supabase = getSupabaseClient();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${getURL()}auth/callback`,
          }
        });
        if (err) throw err;
        onAuth?.(data?.user || null);
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        onAuth?.(data?.user || null);
      }
    } catch (e2) {
      setError(e2.message || "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-1">{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
      <p className="text-sm text-gray-500 mb-4">Use email and password to {mode === "signup" ? "sign up" : "sign in"}.</p>
      <form onSubmit={handleAuth} className="space-y-3">
        <input className="input" type="email" required placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="input" type="password" required placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button className="btn w-full" disabled={busy}>{busy ? "Please wait..." : (mode === "signup" ? "Sign up" : "Sign in")}</button>
      </form>
      <div className="text-sm text-gray-500 mt-4">
        {mode === "signup" ? (
          <>Already have an account?{" "}
            <button className="text-blue-600 hover:underline" onClick={()=>setMode("signin")}>Sign in</button></>
        ) : (
          <>New here?{" "}
            <button className="text-blue-600 hover:underline" onClick={()=>setMode("signup")}>Create an account</button></>
        )}
      </div>
    </div>
  );
}
