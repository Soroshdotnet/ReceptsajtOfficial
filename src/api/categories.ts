import type { Recipe, Category } from '@/types';
import { get } from './client';

export const getAllCategories = async (): Promise<Category[]> => {
  return get<Category[]>('/categories');
};

export const getRecipesByCategory = async (categoryName: string): Promise<Recipe[]> => {
  return get<Recipe[]>(`/categories/${categoryName}/recipes`);
};
