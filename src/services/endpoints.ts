export const endpoints = {
  recipes:        "/api/recipes",
  recipe:         (id: string) => `/api/recipes/${id}`,
  ratings:        (id: string) => `/api/recipes/${id}/ratings`,
  comments:       (id: string) => `/api/recipes/${id}/comments`,
  categories:     "/api/categories",
  categoryRecipes:(name: string) => `/api/categories/${encodeURIComponent(name)}/recipes`,
  clear:          "/api/clear",
} as const;
