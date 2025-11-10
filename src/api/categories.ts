import type { Recipe } from '@/types';
import { get } from './client';

export const getAllCategories = async (): Promise<string[]> => {
  return get<string[]>('/categories');
};

export const getRecipesByCategory = async (categoryName: string): Promise<Recipe[]> => {
  return get<Recipe[]>(`/categories/${categoryName}/recipes`);
};
