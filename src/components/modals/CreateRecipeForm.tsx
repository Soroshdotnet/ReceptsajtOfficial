import {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import type {Recipe} from "@/types";
import RecipeForm from "@/components/RecipeForm.tsx";

interface CreateRecipeModalProps {
    onSubmit?: (values: Recipe) => void;
}

export const CreateRecipeModal = ({onSubmit}: CreateRecipeModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (values: Recipe) => {
        onSubmit?.(values);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="hover:text-blue-600 transition-colors">
                <Button>
                    <Plus/>
                    Create Recipe
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Recipe</DialogTitle>
                </DialogHeader>
                <RecipeForm onSubmit={handleSubmit}/>
            </DialogContent>
        </Dialog>
    );
};