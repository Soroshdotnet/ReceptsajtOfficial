"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChefHat, Star } from "lucide-react";

import type { Recipe, Comment } from "@/types";

import {
  getRecipeById,
  getComments,
  addComment,
  addRating,
} from "@/api";

import { RecipeCardDefault } from "@/components/recipe-card";
import CommentForm from "@/CommentForm";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const RecipePage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  if (!recipeId) return null;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>();
  const [_, setRating] = useState<number>(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {  
    async function load() {
      if (!recipeId) return;
      try {
        setLoading(true);

        const [rec, comm] = await Promise.all([
          getRecipeById(recipeId),
          getComments(recipeId)
        ]);

        console.log("Loaded recipe:", rec);
        setRecipe(rec);
        setComments(comm);
        setRating(rec.avgRating); 
        
      } catch {
        setError("Kunde inte ladda receptet.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [recipeId]);

  // -------------------------------------------------------------
  // Spara kommentar
  // -------------------------------------------------------------
  async function submitComment() {
    if (!recipeId) return;

    if (!name.trim() && !comment.trim()) {
      setError("Skriv minst namn eller kommentar.");
      return;
    }

    try {
      setError(null);

      const saved: Comment = {
        name: name || "Anonym",
        comment: comment,
      }

      console.log("Skickar kommentar:", saved);
      await addComment(recipeId, saved);
      if(currentRating > 0){
          addRating(recipeId, { rating: currentRating })
      }
      setCurrentRating(0);
      setComments((prev) => [...(prev || []), saved]);
      setName("");
      setComment("");
    } catch(e) {
      console.error("Fel vid sparande av kommentar:", e);
      setError("Kunde inte spara kommentaren. " + (e instanceof Error ? e.message : String(e)));
    }
  }

  if (loading) {
    return <div className="text-center py-8">Laddar…</div>;
  }

  if (!recipe) {
    return <div className="text-center py-8">Receptet hittades inte.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">

      {/* Rubrik */}
      <div className="flex items-center gap-2 mb-8 justify-center">
        <ChefHat className="w-8 h-8 text-primary" />
        <h1 className="text-4xl text-primary font-bold">{recipe.title}</h1>
      </div>

      {error && (
        <p className="text-center text-red-500 text-sm">{error}</p>
      )}

      {/* Receptkort */}
      <RecipeCardDefault recipe={recipe} />

      <Card className="p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">Betygsätt receptet</CardTitle>
        </CardHeader>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((stars) => (
            <Button
              key={stars}
              variant={currentRating === stars ? "default" : "outline"}
              onClick={() => setCurrentRating(stars)}
              className="flex items-center gap-1"
            >
              <Star
                className={`h-4 w-4 ${
                  currentRating === stars ? "fill-yellow-500 text-yellow-500" : ""
                }`}
              />
              {stars}
            </Button>
          ))}
        </div>
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl">Kommentarer</CardTitle>
        </CardHeader>

        <CommentForm
          name={name}
          comment={comment}
          onNameChange={setName}
          onCommentChange={setComment}
          onSubmit={submitComment}
        />

        <Separator className="my-6" />

        {!comments || comments.length === 0 ? (
          <p className="text-muted-foreground">Inga kommentarer ännu.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c, index) => (
              <Card key={index} className="p-4 border-border">
                <div className="flex justify-between mb-1">
                  <strong>{c.name}</strong>
                </div>
                <p>{c.comment}</p>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
