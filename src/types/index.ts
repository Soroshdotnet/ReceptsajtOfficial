export interface Recipe {
  _id?: string;
  title: string;
  description: string;
  avgRating: number;
  imageUrl: string;
  timeInMins: number;
  price: number;
  categories: string[];
  instructions: string[];
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Comment {
  comment: string;
  name: string;
}

export interface Rating {
  rating: number;
}

export interface Category {
  name: string;
  count: number;
}