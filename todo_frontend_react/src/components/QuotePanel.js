import React, { useEffect, useState } from "react";
import { getQuote } from "../lib/api";

/**
 * PUBLIC_INTERFACE
 * QuotePanel
 * Shows a motivational quote fetched from backend /quote.
 */
export default function QuotePanel() {
  const [quote, setQuote] = useState(null);
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    try {
      const q = await getQuote();
      setQuote(q);
    } catch (e) {
      setErr("Unable to load quote right now.");
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside className="card p-5 bg-gradient-to-br from-blue-500/10 to-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-2 w-2 rounded-full bg-ocean-secondary" />
        <h3 className="font-semibold text-gray-800">Motivational Quote</h3>
      </div>
      {err && <div className="text-sm text-red-600">{err}</div>}
      {quote ? (
        <blockquote className="text-gray-700">
          <p className="text-lg leading-relaxed">“{quote.quote}”</p>
          <footer className="mt-2 text-sm text-gray-500">— {quote.author || "Unknown"} <span className="text-gray-400">({quote.source})</span></footer>
        </blockquote>
      ) : !err ? (
        <div className="text-sm text-gray-500">Fetching words of wisdom...</div>
      ) : null}
      <div className="mt-4">
        <button onClick={load} className="btn-secondary">Refresh</button>
      </div>
    </aside>
  );
}
