import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Recipe } from "../types/recipe";
import { getRecipes, deleteRecipe, clearAll } from "../services/recipes";
import { getAverage } from "../lib/rating";

function idOf(r: Recipe): string {
  return (r.id || (r as any)._id || "").toString();
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getRecipes()
      .then(setRecipes)
      .catch((e) => setError(e.message));
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return recipes;
    return recipes.filter((r) => {
      const inTitle = (r.title || "").toLowerCase().includes(term);
      const inCats  = (r.categories || []).some(c => c.toLowerCase().includes(term));
      return inTitle || inCats;
    });
  }, [q, recipes]);

  async function handleDelete(id: string) {
    try {
      setBusy(true);
      await deleteRecipe(id);
      setRecipes((list) => list.filter((r) => idOf(r) !== id));
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  async function handleClear() {
    if (!confirm("Töm API:et på all data?")) return;
    try {
      setBusy(true);
      await clearAll();
      setRecipes([]);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Alla recept</h1>
      {error ? <p style={{ color: "crimson" }}>Fel: {error}</p> : null}

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          placeholder="Sök på titel eller kategori…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ padding: 8, flex: 1 }}
        />
        <Link
          to="/nytt"
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}
        >
          + Nytt recept
        </Link>
        <button
          onClick={handleClear}
          disabled={busy}
          style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8 }}
        >
          Töm allt
        </button>
      </div>

      <ul style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {filtered.map((r) => {
          const rid = idOf(r);
          const avg = getAverage(r); // använder avgRating om den finns

          return (
            <li
              key={rid}
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: 12,
                alignItems: "center",
              }}
            >
              {/* Thumbnail */}
              <Link to={`/recept/${rid}`} style={{ display: "block" }}>
                {r.imageUrl ? (
                  <img
                    src={r.imageUrl}
                    alt=""
                    style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }}
                  />
                ) : (
                  <div
                    style={{
                      width: 120,
                      height: 80,
                      borderRadius: 8,
                      background: "#f4f4f4",
                      display: "grid",
                      placeItems: "center",
                      color: "#888",
                      fontSize: 12,
                    }}
                  >
                    Ingen bild
                  </div>
                )}
              </Link>

              {/* Info */}
              <div style={{ display: "grid", gap: 6 }}>
                <Link
                  to={`/recept/${rid}`}
                  style={{ fontWeight: 600, textDecoration: "none" }}
                >
                  {r.title}
                </Link>

                {/* Betyg (avgRating eller "Inga betyg") */}
                <div>
                  {avg !== null ? (
                    <span>⭐ {avg}</span>
                  ) : (
                    <span style={{ color: "#666" }}>Inga betyg</span>
                  )}
                </div>

                {/* Tid/Pris */}
                <div style={{ display: "flex", gap: 16, color: "#444" }}>
                  {typeof r.timeInMins === "number" ? <span>Tid: {r.timeInMins} min</span> : null}
                  {typeof r.price === "number" ? <span>Pris: {r.price} kr</span> : null}
                </div>

                {/* Kategorier som “chips” */}
                {r.categories?.length ? (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {r.categories.map((c, i) => (
                      <span
                        key={`${c}-${i}`}
                        style={{
                          padding: "2px 8px",
                          border: "1px solid #ddd",
                          borderRadius: 999,
                          fontSize: 12,
                          color: "#444",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => handleDelete(rid)}
                  disabled={busy}
                  style={{ padding: "6px 10px", border: "1px solid #ddd", borderRadius: 8 }}
                >
                  Ta bort
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
