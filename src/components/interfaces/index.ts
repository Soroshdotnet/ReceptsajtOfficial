export interface IRecipe {
    title: string;
    description: string;
    ratings: number[];
    imageUrl: string;
    timeInMins: number;
    price: number;
    category: string[];
    instructions: string[];
    ingredients: IIngredients[];
}

interface IIngredients {
    name: string;
    amount: number;
    unit: string;
}

