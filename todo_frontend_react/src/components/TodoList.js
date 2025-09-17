import React, { useEffect, useState } from "react";
import { getSupabaseClient } from "../lib/supabaseClient";

/**
 * PUBLIC_INTERFACE
 * TodoList
 * Displays and manages a list of todos for the current user via Supabase.
 */
export default function TodoList({ user }) {
  const supabase = getSupabaseClient();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    setError("");
    setBusy(true);
    try {
      // Assumes a table "todos" with columns: id (uuid), user_id (uuid), title (text), completed (boolean)
      const { data, error: err } = await supabase
        .from("todos")
        .select("id, title, completed")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setTodos(data || []);
    } catch (e) {
      setError("Failed to load todos");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (user) fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError("");
    try {
      const { data, error: err } = await supabase
        .from("todos")
        .insert({ title: title.trim(), completed: false })
        .select();
      if (err) throw err;
      setTodos((prev) => (data ? [...data, ...prev] : prev));
      setTitle("");
    } catch (e) {
      setError("Failed to add todo");
    } finally {
      setBusy(false);
    }
  };

  const toggleTodo = async (id, completed) => {
    setError("");
    try {
      const { data, error: err } = await supabase
        .from("todos")
        .update({ completed: !completed })
        .eq("id", id)
        .select();
      if (err) throw err;
      const updated = data?.[0];
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError("Failed to update todo");
    }
  };

  const removeTodo = async (id) => {
    setError("");
    try {
      const { error: err } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);
      if (err) throw err;
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError("Failed to delete todo");
    }
  };

  return (
    <section className="card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Your Tasks</h3>
        {busy && <span className="text-xs text-gray-500">Loading...</span>}
      </div>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          className="input"
          placeholder="Add a task..."
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <button className="btn" type="submit" disabled={busy}>Add</button>
      </form>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <ul className="space-y-2">
        {todos.length === 0 && <li className="text-sm text-gray-500">No tasks yet. Add your first one!</li>}
        {todos.map((t) => (
          <li key={t.id} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" checked={!!t.completed} onChange={() => toggleTodo(t.id, t.completed)} />
              <span className={`text-sm ${t.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{t.title}</span>
            </label>
            <button aria-label="Delete" onClick={() => removeTodo(t.id)} className="text-red-500 hover:text-red-600 text-sm">Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
