import {Input} from "@/components/ui/input.tsx";
import type {Ingredient, Recipe} from "@/types";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@radix-ui/react-label";

const RecipeForm = ({onSubmit}: { onSubmit: (data: Recipe) => void }) => {


    const [formData, setFormData] = React.useState<Recipe>({
        title: "",
        description: "",
        ratings: {value: 0},
        imageUrl: "",
        timeInMins: 0,
        price: 0,
        categories: [],
        instructions: [],
        ingredients: []
    });

    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, {name: "", amount: 0, unit: ""}]
        }));
    };

    const removeIngredient = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };
    //Makes a shallow copy
    const handleChange = (
        index: number,
        field: keyof Ingredient,
        value: string | number
    ) => {
        setFormData((prev) => {
            const newIngredients = [...prev.ingredients];
            newIngredients[index] = {
                ...newIngredients[index],
                [field]: value
            };
            return {...prev, ingredients: newIngredients};
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formData);
            }}
            className="space-y-4"
        >
            <div className="flex flex-col gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            title: e.target.value
                        }))
                    }
                    placeholder="Enter title"
                />


                <Label htmlFor="description">Description</Label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            description: e.target.value
                        }))
                    }
                    placeholder="Enter description"
                />


                <Label htmlFor="ratings">Rating</Label>
                <Input
                    id="ratings"
                    type="number"
                    value={formData.ratings.value}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            ratings: {value: e.target.valueAsNumber}
                        }))
                    }
                    placeholder="Enter rating"
                />

                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            imageUrl: e.target.value
                        }))
                    }
                    placeholder="Enter image URL"
                />

                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            price: e.target.valueAsNumber
                        }))
                    }
                    placeholder="Enter price"
                />

                <Label htmlFor="timeInMins">timeInMins</Label>
                <Input
                    id="timeInMins"
                    type="number"
                    value={formData.timeInMins}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            timeInMins: e.target.valueAsNumber
                        }))
                    }
                    placeholder="Enter timeInMins"
                />

                <Label htmlFor="categories">Categories</Label>
                <Input
                    id="categories"
                    value={formData.categories.join(",")}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            categories: e.target.value.split(",").map(cat => cat.trim())
                        }))
                    }
                    placeholder="Enter categories (separate each with a comma)"
                />

                <Label htmlFor="instructions">Instructions</Label>
                <textarea
                    id="instructions"
                    value={formData.instructions.join("\n")}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            instructions: e.target.value.split("\n")
                        }))
                    }
                    placeholder="Enter instructions (one per new line)"
                />
                <div className="flex flex-wrap gap-2">
                    <Label htmlFor="ingredients">Ingredients</Label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={ingredient.name}
                                onChange={(e) => handleChange(index, "name", e.target.value)}
                                placeholder="Name"
                            />
                            <input
                                type="number"
                                value={ingredient.amount}
                                onChange={(e) => handleChange(index, "amount", e.target.valueAsNumber)}
                                placeholder="Amount"
                            />
                            <input
                                type="text"
                                value={ingredient.unit}
                                onChange={(e) => handleChange(index, "unit", e.target.value)}
                                placeholder="Unit"
                            />
                            <button type="button" onClick={() => removeIngredient(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>
                        Add Ingredient
                    </button>
                    <Button type="submit">Submit</Button>
                </div>
            </div>
        </form>
    );
};

export default RecipeForm;