// RecipePage.tsx hanterar både visning av receptdetaljer,

import React, { useState, useEffect } from "react";
import type { Recipe } from "@/types";
import { ChefHat } from "lucide-react";
import { getRecipeById } from "@/api";
import { useParams } from "react-router-dom";
import { RecipeCardDefault } from "@/components/recipe-card";
import CommentForm from "@/CommentForm";
import { postRating } from "@/api/rating"; // <-- NY IMPORT

export const RecipePage: React.FC = () => {
  // 1. Hooks från React & router
  const { recipeId } = useParams<{ recipeId: string }>();

  // 2. State för receptet
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  // 3. State för kommentar- och rating-delen

  // Visar om vi håller på att skicka en kommentar
  const [isSending, setIsSending] = useState(false);

  // Flagga för om användaren redan har betygsatt
  const [hasRated, setHasRated] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [busy, setBusy] = useState(false); // används för att undvika dubbelklick vid rating

  // Namn och kommentar som skrivs i formuläret
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // Feedback-meddelande till användaren (både kommentarer och rating)
  const [message, setMessage] = useState<string | null>(null);

  // Lokal lista med kommentarer (sparas i denna komponent)
  type LocalComment = {
    id: number;
    name: string;
    comment: string;
    createdAt: string; // t.ex. "2025-11-29 09:41"
  };

  const [localComments, setLocalComments] = useState<LocalComment[]>([]);

  // 4. Skickar en ny kommentar från formuläret till API:t
  // -----------------------------------------------------
  async function sendComment() {
    if (!recipeId) {
      // edge case – om route-param saknas
      setMessage("Kunde inte identifiera recept-id för kommentaren.");
      return;
    }

    // 1. Grundvalidering – tillåt inte helt tomt formulär
    if (!name.trim() && !comment.trim()) {
      setMessage("Skriv minst namn eller kommentar.");
      return;
    }

    // 2. Sätt "skickar"-flaggan så att UI kan visa att något pågår
    setIsSending(true);
    setMessage(null); // nollställ eventuellt gammalt meddelande

    // 3. Bygg upp ett lokalt kommentarsobjekt (visas direkt i sidan)
    const newComment: LocalComment = {
      id: Date.now(), // enkel lokal id
      name: name || "Anonym", // fallback om namn saknas
      comment: comment,
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    // 4. Optimistisk uppdatering – lägg till i listan direkt
    setLocalComments((prev) => [...prev, newComment]);

    try {
      // 5. Skicka kommentaren till backend-API:t (Swagger: POST /recipes/{recipeId}/comments)
      const response = await fetch(
        `https://grupp2-mqsel.reky.se/recipes/${recipeId}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newComment.name,
            comment: newComment.comment,
            // skicka bara fält som API:t förväntar sig
          }),
        }
      );

      // 6. Kontrollera att servern svarade OK
      if (!response.ok) {
        throw new Error(`Serverfel: ${response.status}`);
      }

      // 7. Allt gick bra – visa positivt feedbackmeddelande
      setMessage("Tack för din kommentar! (sparad mot servern)");
    } catch (error) {
      console.error("Fel vid skickande av kommentar:", error);
      // 8. Felmeddelande till användaren
      setMessage("Kunde inte spara kommentaren mot servern just nu.");
      // TODO vid behov: rulla tillbaka sista localComments-posten
    } finally {
      // 9. Återställ formuläret oavsett om det lyckades eller ej
      setIsSending(false);
      setName("");
      setComment("");
    }
  }

  // 5. Skickar betyg (rating 1–5) till API:t via postRating
  // --------------------------------------------------------
  async function handleRate(stars: number) {
    // 1. Avbryt om vi redan skickar eller om användaren redan röstat
    if (busy || hasRated || !recipeId) {
      return;
    }

    setBusy(true);
    setMessage(null);

    try {
      // 2. Skicka betyget till API:t (Swagger: POST /recipes/{recipeId}/ratings)
      await postRating(recipeId, stars);

      // 3. Uppdatera lokalt state när det lyckats
      setRating(stars);
      setHasRated(true);
      setMessage(`Tack för ditt betyg: ${stars} / 5`);
    } catch (error) {
      console.error("Fel vid skickande av betyg:", error);
      setMessage("Kunde inte spara ditt betyg just nu.");
    } finally {
      setBusy(false);
    }
  }

  // 6. useEffect: hämta recept från API och räkna ut ev. genomsnittsbetyg
  useEffect(() => {
    async function fetchRecipe() {
      if (!recipeId) return;

      try {
        setLoading(true);
        const data = await getRecipeById(recipeId);
        setRecipe(data);

        // Gör om ratings till en säker number[] oavsett API-typ
        const raw = (data as any).ratings;
        const ratings: number[] = Array.isArray(raw)
          ? raw
          : typeof raw === "number" && !Number.isNaN(raw)
          ? [raw]
          : [];

        if (ratings.length > 0) {
          const avg =
            ratings.reduce((a, b) => a + b, 0) / ratings.length;
          setRating(avg);
        }
      } catch (err) {
        console.error("Fel vid hämtning av recept:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);


useEffect(() => {
  async function fetchComments() {
    if (!recipeId) return;

    try {
      const res = await fetch(`https://grupp2-mqsel.reky.se/recipes/${recipeId}/comments`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const comments = await res.json();

      setLocalComments(
        comments.map((c: any) => ({
          id: c._id,
          name: c.author || c.name,
          comment: c.text || c.comment,
          createdAt: c.createdAt?.slice(0,16).replace("T"," ") ?? ""
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }

  fetchComments();
}, [recipeId]);



  if (loading) {
    return (
      <div className="text-center py-8">
        Laddar recept…
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center py-8">Recipe not found</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-8 justify-center">
        <ChefHat className="w-8 h-8 text-primary" />
        <h1 className="text-4xl text-primary font-bold">{recipe.title}</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <RecipeCardDefault recipe={recipe} />
      </div>

      {/* Enkel ratingsektion med 1–5 stjärnor */}
      <section style={{ marginTop: 16, textAlign: "center" }}>
        <p>Betygsätt receptet:</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            marginTop: 8,
          }}
        >
          {[1, 2, 3, 4, 5].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => handleRate(stars)}
              disabled={busy || hasRated}
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                border: "1px solid #ddd",
                cursor: busy || hasRated ? "default" : "pointer",
                backgroundColor: rating === stars ? "#facc15" : "#fff", // gul om vald
              }}
            >
              {stars} ★
            </button>
          ))}
        </div>

        {hasRated && (
          <p style={{ marginTop: 8 }}>Tack för ditt betyg: {rating} / 5</p>
        )}
      </section>

      {/* Kommentarer – enkel version */}
      <section style={{ marginTop: 24 }}>
        <h2>Kommentarer</h2>

        {/* Själva formuläret – styrs av state i RecipePage */}
        <CommentForm
          name={name}
          comment={comment}
          onNameChange={setName}
          onCommentChange={setComment}
          onSubmit={sendComment}
        />

        {/* Liten indikator om vi skickar just nu */}
        {isSending && (
          <p style={{ marginTop: 8, color: "#555" }}>Skickar kommentar…</p>
        )}

        {/* Feedback-text under knappen (t.ex. "Tack för din kommentar") */}
        {message && (
          <p style={{ marginTop: 8, color: "#555" }}>{message}</p>
        )}

        {/* Lista med sparade kommentarer (endast lokalt i denna sida) */}
        {localComments.length === 0 ? (
          <p style={{ marginTop: 16 }}>Inga kommentarer ännu.</p>
        ) : (
          <ul
            style={{
              marginTop: 16,
              listStyleType: "none",
              paddingLeft: 0,
            }}
          >
            {localComments.map((c) => (
              <li
                key={c.id}
                style={{
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <strong>{c.name}</strong>{" "}
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "#888",
                  }}
                >
                  ({c.createdAt})
                </span>
                <div>{c.comment}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};