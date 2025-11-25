export interface Recipe {
  _id?: string;
  title: string;
  description: string;
  ratings: Rating;
  imageUrl: string;
  timeInMins: number;
  price: number;
  categories: string[];
  instructions: string[];
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Comment {
  _id?: string;
  author: string;
  text: string;
  createdAt?: string;
}

export interface Rating {
  value: number;
}