// Denna fil hanterar rating mot Swagger-API:et
// https://grupp2-mqsel.reky.se/recipes/

export async function postRating(recipeId: string, value: number): Promise<void> {
  const url = `https://grupp2-mqsel.reky.se/recipes/${recipeId}/ratings`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating: value }),
  });

  if (!response.ok) {
    throw new Error(`Kunde inte spara betyg till API (status ${response.status})`);
  }

  // Ingen body förväntas – API:t returnerar Content-Length: 0
  return;
}