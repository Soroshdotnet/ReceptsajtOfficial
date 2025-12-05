// src/models/comment.ts

// Domänmodell som kan användas i UI-lager
export interface CommentModel {
  id: string | number;
  recipeId: string;
  authorName: string;
  text: string;
  createdAt: string; // ISO 8601-sträng, t.ex. "2025-12-01T06:30:00Z"
}

// DTO (Data Transfer Object) för att skapa en ny kommentar mot API:t
export interface CreateCommentDTO {
  authorName: string;
  text: string;
}

// DTO för svar från API:t (om du vill skilja på intern modell och servermodell)
export interface CommentResponseDTO {
  id: string | number;
  recipeId: string;
  authorName: string;
  text: string;
  createdAt: string;
}