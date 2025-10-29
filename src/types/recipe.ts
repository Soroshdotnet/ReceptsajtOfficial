export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

export type Recipe = {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  ratings?: number[];
  avgRating?: number;   // beräknas på servern
  imageUrl?: string;
  timeInMins?: number;
  price?: number;
  categories?: string[];
  instructions?: string[];
  ingredients?: Ingredient[];
};

export type NewRecipe = {
  title: string;
  description?: string;
  imageUrl?: string;
  timeInMins?: number;
  price?: number;
  categories: string[];
  instructions: string[];
  ingredients: Ingredient[];
  ratings?: number[];   // vid skapande skickar vi tom parameter []
};
