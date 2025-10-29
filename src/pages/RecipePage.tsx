import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Recipe } from "../types/recipe";
import type { Comment } from "../types/comment";
import { getRecipe, getComments, addComment, rateRecipeSafe } from "../services/recipes";
import { getAverage, getCount } from "../lib/rating";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Kommentar-form
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  // show "Tack för ditt betyg!"
  const [hasRated, setHasRated] = useState(false);

  async function load() {
    if (!id) return;
    const [r, c] = await Promise.all([
      getRecipe(id),
      getComments(id).catch(() => [] as Comment[]),
    ]);
    setRecipe(r);
    setComments(c);
  }

  useEffect(() => {
    load().catch((e) => setError(String(e?.message || e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function onRate(value: number) {
    if (!id || !recipe || busy) return;

    // Optimistiskt: uppdatera lokalt avgRating/ratings för snappy UI
    const prev = recipe;
    const prevAvg = getAverage(prev);
    const prevCount = getCount(prev);
    let optimistic: Recipe = { ...prev };

    if (typeof prevAvg === "number" && prevCount === null) {
      // Vi har bara avgRating från servern (ingen count) — bumpa avg “as is”
      optimistic = { ...prev, avgRating: value }; // temporärt, ersätts vid refetch
    } else if (Array.isArray(prev.ratings)) {
      optimistic = { ...prev, ratings: [...(prev.ratings || []), value] };
    }

    setRecipe(optimistic);
    setHasRated(true);

    try {
      setBusy(true);
      const fresh = await rateRecipeSafe(id, value); // POST /ratings, ev. fallback PATCH, sedan GET
      setRecipe(fresh || optimistic);
    } catch (e: any) {
      setRecipe(prev);
      setHasRated(false);
      setError(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  async function sendComment(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    try {
      setBusy(true);
      await addComment(id, { name, comment });
      setName("");
      setComment("");
      const c = await getComments(id);
      setComments(c);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  if (error) return <p style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{error}</p>;
  if (!recipe) return <p>Laddar…</p>;

  const average = getAverage(recipe);
  const count = getCount(recipe);

  return (
    <>
      <p><Link to="..">← Tillbaka</Link></p>
      <h1>{recipe.title}</h1>

      {recipe.imageUrl ? (
        <img src={recipe.imageUrl} alt="" style={{ maxWidth: "100%", borderRadius: 12 }} />
      ) : null}
      {recipe.description ? <p>{recipe.description}</p> : null}
      {recipe.timeInMins ? <p>Tid: {recipe.timeInMins} min</p> : null}
      {recipe.price ? <p>Pris: {recipe.price} kr</p> : null}

      {recipe.categories?.length ? (
        <p style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {recipe.categories.map((c, i) => (
            <span key={`${c}-${i}`} style={{ padding: "2px 8px", border: "1px solid #ddd", borderRadius: 999 }}>
              {c}
            </span>
          ))}
        </p>
      ) : null}

      {/* Betyg */}
      <section style={{ margin: "16px 0" }}>
        <h2 style={{ marginBottom: 8 }}>Betyg</h2>
        {average !== null ? (
          <p>⭐ {average}{typeof count === "number" ? ` (${count} betyg)` : ""}</p>
        ) : (
          <p>Inga betyg ännu.</p>
        )}

        {hasRated ? (
          <p style={{ marginTop: 8 }}>Tack för ditt betyg!</p>
        ) : (
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            {[1,2,3,4,5].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => onRate(n)}
                disabled={busy}
                style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8 }}
                aria-label={`Sätt betyg ${n} stjärnor`}
              >
                {n} ⭐
              </button>
            ))}
          </div>
        )}
      </section>

      {recipe.instructions?.length ? (
        <>
          <h2>Instruktioner</h2>
        <ol>
          {recipe.instructions.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        </>
      ) : null}

      {recipe.ingredients?.length ? (
        <>
          <h2>Ingredienser</h2>
          <ul>
            {recipe.ingredients.map((i, idx) => (
              <li key={idx}>{i.amount} {i.unit} {i.name}</li>
            ))}
          </ul>
        </>
      ) : null}

      {/* Kommentarer */}
      <section style={{ marginTop: 24 }}>
        <h2>Kommentarer</h2>
        {comments.length === 0 ? <p>Inga kommentarer ännu.</p> : (
          <ul style={{ display: "grid", gap: 8 }}>
            {comments.map((c, i) => (
              <li key={c.id || c._id || i} style={{ border: "1px solid #eee", padding: 8, borderRadius: 8 }}>
                <strong>{c.name || "Anonym"}</strong>
                <div>{c.comment}</div>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={sendComment} style={{ display: "grid", gap: 8, maxWidth: 520, marginTop: 12 }}>
          <input placeholder="Ditt namn" value={name} onChange={(e)=>setName(e.target.value)} />
          <textarea placeholder="Din kommentar" value={comment} onChange={(e)=>setComment(e.target.value)} rows={4} />
          <button style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}>
            Skicka kommentar
          </button>
        </form>
      </section>
    </>
  );
}
