import { api } from "../lib/api";
import { endpoints } from "./endpoints";
import type { Recipe, NewRecipe } from "../types/recipe";
import type { Comment } from "../types/comment";

export async function getRecipes() {
  return api<Recipe[]>(endpoints.recipes);
}

export async function getRecipe(id: string) {
  if (!id) throw new Error("recipeId saknas");
  return api<Recipe>(endpoints.recipe(id));
}

export async function createRecipe(data: NewRecipe) {
  return api<Recipe>(endpoints.recipes, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateRecipe(
  id: string,
  patch: Partial<NewRecipe> & Partial<Recipe>
) {
  if (!id) throw new Error("recipeId saknas");
  return api<Recipe>(endpoints.recipe(id), {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteRecipe(id: string) {
  if (!id) throw new Error("recipeId saknas");
  return api<void>(endpoints.recipe(id), { method: "DELETE" });
}
export async function rateRecipeSafe(id: string, rating: number) {
  if (!id) throw new Error("recipeId saknas");
  const value = Math.max(0, Math.min(5, Math.round(Number(rating))));

  const before = await getRecipe(id);
  const beforeCount = Array.isArray(before.ratings)
    ? before.ratings.length
    : null;
  const beforeAvg =
    typeof before.avgRating === "number" ? before.avgRating : null;

  await api<void>(endpoints.ratings(id), {
    method: "POST",
    body: JSON.stringify({ rating: value }),
  });

  const afterPost = await getRecipe(id);
  const afterCount = Array.isArray(afterPost.ratings)
    ? afterPost.ratings.length
    : null;
  const afterAvg =
    typeof afterPost.avgRating === "number" ? afterPost.avgRating : null;

  let persisted = false;
  if (afterCount !== null && beforeCount !== null) {
    persisted = afterCount > beforeCount; // arrayen växte
  } else if (afterAvg !== null && beforeAvg !== null) {
    persisted = afterAvg !== beforeAvg; // avg ändrades
  } else if (afterAvg !== null && beforeAvg === null) {
    persisted = true; // vi har åtminstone ett medel nu
  }
  if (persisted) return afterPost;

  const base = Array.isArray(afterPost.ratings)
    ? afterPost.ratings
    : Array.isArray(before.ratings)
    ? before.ratings
    : [];
  const nextRatings = [...base, value];

  await updateRecipe(id, { ratings: nextRatings });
  return getRecipe(id);
}

export async function getComments(recipeId: string) {
  if (!recipeId) throw new Error("recipeId saknas");
  return api<Comment[]>(endpoints.comments(recipeId));
}

export async function addComment(
  recipeId: string,
  input: { name: string; comment: string }
) {
  if (!recipeId) throw new Error("recipeId saknas");
  return api<void>(endpoints.comments(recipeId), {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getCategories() {
  return api<string[]>(endpoints.categories);
}

export async function getCategoryRecipes(categoryName: string) {
  if (!categoryName) throw new Error("categoryName saknas");
  return api<Recipe[]>(endpoints.categoryRecipes(categoryName));
}

export async function clearAll() {
  return api<void>(endpoints.clear);
}
