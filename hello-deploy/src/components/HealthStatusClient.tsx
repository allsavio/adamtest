"use client";

import { useCallback, useState } from "react";
import type { HealthResponse } from "../lib/health";

type Props = {
  initial: HealthResponse;
};

export function HealthStatusClient({ initial }: Props) {
  const [health, setHealth] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/health", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data: HealthResponse = await response.json();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="stack">
      <p>
        <strong>Status:</strong> {health.ok ? "Healthy" : "Unhealthy"}
      </p>
      <p>
        <strong>Last checked:</strong>
        <br />
        <code>{health.now}</code>
      </p>
      {error ? <p className="error">{error}</p> : null}
      <button onClick={refresh} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}
