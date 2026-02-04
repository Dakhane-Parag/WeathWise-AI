const API_BASE = import.meta.env.VITE_API_URL;

export async function queryRagBackend(question) {
  const response = await fetch(`${API_BASE}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: question }),
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
}
