import type { Recipe, Comment, Rating } from '@/types';
import { get, post, patch, del } from './client';

export const getAllRecipes = async (): Promise<Recipe[]> => {
  return get<Recipe[]>('/recipes');
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  return get<Recipe>(`/recipes/${recipeId}`);
};

export const createRecipe = async (recipe: Omit<Recipe, '_id'>): Promise<Recipe> => {
  return post<Recipe>('/recipes', recipe);
};

export const updateRecipe = async (recipeId: string, recipe: Partial<Recipe>): Promise<Recipe> => {
  return patch<Recipe>(`/recipes/${recipeId}`, recipe);
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
  return del<void>(`/recipes/${recipeId}`);
};

export const addRating = async (recipeId: string, rating: Rating): Promise<Recipe> => {
  return post<Recipe>(`/recipes/${recipeId}/ratings`, rating);
};

export const getComments = async (recipeId: string): Promise<Comment[]> => {
  return get<Comment[]>(`/recipes/${recipeId}/comments`);
};

export const addComment = async (recipeId: string, comment: Omit<Comment, '_id' | 'createdAt'>): Promise<Comment> => {
  return post<Comment>(`/recipes/${recipeId}/comments`, comment);
};
