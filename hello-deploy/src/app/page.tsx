import { headers } from "next/headers";
import { HealthStatusClient } from "../components/HealthStatusClient";
import type { HealthResponse } from "../lib/health";

async function fetchHealthStatus(): Promise<HealthResponse> {
  const headerList = headers();
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("host") ?? "localhost:3000";
  const response = await fetch(`${protocol}://${host}/api/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load health status: ${response.status}`);
  }

  const data: HealthResponse = await response.json();
  return data;
}

export default async function HomePage() {
  const health = await fetchHealthStatus();

  return (
    <section className="stack">
      <h1>hello-deploy</h1>
      <p>A tiny Next.js starter ready to deploy on Vercel.</p>
      <HealthStatusClient initial={health} />
    </section>
  );
}
