// Rating-API i frontend för receptuppgiften

// src/api/ratingApi.ts
// Ändrar alias från RatingApi till ratingApi för konsekvens med övriga API-filer
import { apiRequest } from "@/api/apiClient";

export type RatingSummary = {
  recipeId: string;
  average: number;
  count: number;
  userRating?: number | null;
};

export async function getRating(recipeId: string): Promise<RatingSummary> {
  return apiRequest<RatingSummary>(`/recipes/${recipeId}/rating`);
}

export async function submitRating(
  recipeId: string,
  value: number
): Promise<RatingSummary> {
  return apiRequest<RatingSummary>(`/recipes/${recipeId}/rating`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
}

export async function resetRating(
  recipeId: string
): Promise<RatingSummary> {
  return apiRequest<RatingSummary>(`/recipes/${recipeId}/rating/reset`, {
    method: "POST",
  });
}