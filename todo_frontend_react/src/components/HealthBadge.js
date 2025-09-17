import React, { useEffect, useState } from "react";
import { getHealth } from "../lib/api";

/**
 * PUBLIC_INTERFACE
 * HealthBadge
 * Shows backend health status as a small badge.
 */
export default function HealthBadge() {
  const [status, setStatus] = useState("unknown");

  useEffect(() => {
    let mounted = true;
    getHealth()
      .then((h) => {
        if (!mounted) return;
        setStatus(h?.status || "unknown");
      })
      .catch(() => mounted && setStatus("down"));
    return () => { mounted = false; };
  }, []);

  const color =
    status === "ok" ? "bg-green-100 text-green-800" :
    status === "down" ? "bg-red-100 text-red-700" :
    "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
      Backend: {status}
    </span>
  );
}
