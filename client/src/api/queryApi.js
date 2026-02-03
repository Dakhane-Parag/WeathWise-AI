export async function queryRagBackend(question) {
  const response = await fetch("http://localhost:8000/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query: question })
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json();
}
