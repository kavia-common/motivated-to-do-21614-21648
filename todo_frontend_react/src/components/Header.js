import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header
 * App header with branding and session display.
 */
export default function Header({ user, onSignOut }) {
  return (
    <header className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-amber-400 shadow-sm" />
          <div className="font-semibold text-lg text-gray-800">Motivated To-Do</div>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-600">Signed in as {user.email}</span>
              <button className="btn-secondary" onClick={onSignOut}>Sign out</button>
            </>
          ) : (
            <span className="text-sm text-gray-500">Welcome</span>
          )}
        </div>
      </div>
    </header>
  );
}
