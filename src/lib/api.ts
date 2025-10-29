const BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const rel = path.startsWith("/") ? path : `/${path}`;
  const url = BASE ? `${BASE}${rel.replace(/^\/api/, "")}` : rel;

  const res = await fetch(url, {
    headers: { Accept: "application/json", "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error("API ERROR", res.status, res.statusText, url, txt);
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${url}\n${txt}`);
  }

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return undefined as unknown as T;
  }
  return res.json() as Promise<T>;
}
