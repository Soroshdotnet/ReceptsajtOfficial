// Kommentar API i frontend för receptuppgiften

// src/api/commentApi.ts
// Ändrar alias från CommentApi till commentApi för konsekvens med övriga API-filer
import { apiRequest } from "@/api/apiClient";

export type Comment = {
  id: string;
  recipeId: string;
  authorName: string;
  text: string;
  createdAt: string;
};

export async function getComments(recipeId: string): Promise<Comment[]> {
  return apiRequest<Comment[]>(`/recipes/${recipeId}/comments`);
}

export async function addComment(
  recipeId: string,
  payload: { authorName: string; text: string }
): Promise<Comment> {
  return apiRequest<Comment>(`/recipes/${recipeId}/comments`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteComment(
  recipeId: string,
  commentId: string
): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>(
    `/recipes/${recipeId}/comments/${commentId}`,
    { method: "DELETE" }
  );
}