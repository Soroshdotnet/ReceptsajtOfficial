// Gemensam API-klient i frontend för receptuppgiften

// src/api/apiClient.ts
const API_BASE_URL = "http://localhost:3000/api"; // Justera vid behov

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `API-fel ${response.status}: ${errorText || response.statusText}`
    );
  }

  // Antag JSON-svar
  return response.json() as Promise<T>;
}

export { apiRequest };