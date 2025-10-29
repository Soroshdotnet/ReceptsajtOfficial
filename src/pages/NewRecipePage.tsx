import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../services/recipes";
import type { NewRecipe, Ingredient } from "../types/recipe";

export default function NewRecipePage() {
  const nav = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState<NewRecipe>({
    title: "",
    description: "",
    imageUrl: "",
    timeInMins: 15,
    price: 0,
    categories: [],
    instructions: [""],
    ingredients: [{ name: "", amount: 0, unit: "" }],
    ratings: [],
  });

  // ====== KATEGORIER SOM "CHIPS" ======
  const [catInput, setCatInput] = useState("");

  function addCategory(token: string) {
    const t = token.trim();
    if (!t) return;
    setForm((f) => {
      const existing = new Set(f.categories || []);
      existing.add(t);
      return { ...f, categories: Array.from(existing) };
    });
  }

  function addCategoryFromInput() {
    // dela på komma eller radbrytning om användaren klistrat in flera
    const parts = catInput
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
    parts.forEach(addCategory);
    setCatInput("");
  }

  function removeCategory(index: number) {
    setForm((f) => {
      const next = [...(f.categories || [])];
      next.splice(index, 1);
      return { ...f, categories: next };
    });
  }

  function handleCatKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCategoryFromInput();
    }
  }

  function handleCatPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    if (/[,\n]/.test(text)) {
      e.preventDefault();
      text
        .split(/[,\n]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach(addCategory);
    }
  }

  // ===== Instruktioner: ett fält per steg =====
  function updateStep(index: number, value: string) {
    setForm((f) => {
      const steps = [...f.instructions];
      steps[index] = value;
      return { ...f, instructions: steps };
    });
  }
  function addStep() {
    setForm((f) => ({ ...f, instructions: [...f.instructions, ""] }));
  }
  function removeStep(index: number) {
    setForm((f) => {
      const steps = [...f.instructions];
      steps.splice(index, 1);
      return { ...f, instructions: steps.length ? steps : [""] };
    });
  }

  // ===== Ingredienser =====
  function updateIngredient(
    index: number,
    key: keyof Ingredient,
    value: string
  ) {
    setForm((f) => {
      const next = [...f.ingredients];
      const current = { ...next[index] };
      if (key === "amount") current.amount = Number(value);
      if (key === "name") current.name = value;
      if (key === "unit") current.unit = value;
      next[index] = current;
      return { ...f, ingredients: next };
    });
  }
  function addIngredient() {
    setForm((f) => ({
      ...f,
      ingredients: [...f.ingredients, { name: "", amount: 0, unit: "" }],
    }));
  }
  function removeIngredient(index: number) {
    setForm((f) => {
      const next = [...f.ingredients];
      next.splice(index, 1);
      return {
        ...f,
        ingredients: next.length ? next : [{ name: "", amount: 0, unit: "" }],
      };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const payload: NewRecipe = {
        title: form.title.trim(),
        description: (form.description || "").trim(),
        imageUrl: (form.imageUrl || "").trim(),
        timeInMins: Number(form.timeInMins) || 0,
        price: Number(form.price) || 0,
        categories: (form.categories || [])
          .map((s) => s.trim())
          .filter(Boolean),
        instructions: (form.instructions || [])
          .map((s) => s.replace(/\r\n/g, "\n").trim())
          .filter(Boolean),
        ingredients: (form.ingredients || [])
          .map((i) => ({
            name: (i.name || "").trim(),
            amount: Number(i.amount) || 0,
            unit: (i.unit || "").trim(),
          }))
          .filter((i) => i.name && i.unit),
        ratings: Array.isArray(form.ratings) ? form.ratings : [],
      };

      const created = await createRecipe(payload);
      const rid = (created.id || (created as any)._id) as string;
      nav(`/recept/${rid}`);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Nytt recept</h1>
      {error ? (
        <p style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{error}</p>
      ) : null}

      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 760 }}
      >
        <input
          placeholder="Titel"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />

        <textarea
          placeholder="Beskrivning"
          value={form.description || ""}
          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          rows={3}
        />

        <input
          placeholder="Bild-URL"
          value={form.imageUrl || ""}
          onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
        />

        <div style={{ display: "flex", gap: 12 }}>
          Tid (min){" "}
          <input
            type="number"
            min={0}
            placeholder="Tid (min)"
            value={form.timeInMins ?? 0}
            onChange={(e) =>
              setForm((f) => ({ ...f, timeInMins: Number(e.target.value) }))
            }
          />
          Pris (kr){" "}
          <input
            type="number"
            min={0}
            placeholder="Pris (kr)"
            value={form.price ?? 0}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: Number(e.target.value) }))
            }
          />
        </div>

        {/* ===== Kategorier som chips ===== */}
        <fieldset
          style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}
        >
          <legend>Kategorier</legend>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 8,
            }}
          >
            {(form.categories || []).map((c, i) => (
              <span
                key={`${c}-${i}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 8px",
                  border: "1px solid #ddd",
                  borderRadius: 999,
                }}
              >
                {c}
                <button
                  type="button"
                  onClick={() => removeCategory(i)}
                  title="Ta bort"
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            placeholder="Skriv kategori och tryck Enter eller , (komma)"
            value={catInput}
            onChange={(e) => setCatInput(e.target.value)}
            onKeyDown={handleCatKeyDown}
            onPaste={handleCatPaste}
            onBlur={addCategoryFromInput}
          />
        </fieldset>

        {/* ===== Instruktioner ===== */}
        <fieldset
          style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}
        >
          <legend>Instruktioner (ett steg per rad)</legend>
          <div style={{ display: "grid", gap: 8 }}>
            {form.instructions.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <input
                  placeholder={`Steg ${i + 1}`}
                  value={step}
                  onChange={(e) => updateStep(i, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  style={{ padding: "6px 10px" }}
                >
                  Ta bort
                </button>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={addStep}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                }}
              >
                + Lägg till steg
              </button>
            </div>
          </div>
        </fieldset>

        {/* ===== Ingredienser ===== */}
        <fieldset
          style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}
        >
          <legend>Ingredienser</legend>
          <div style={{ display: "grid", gap: 8 }}>
            {form.ingredients.map((ing, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr auto",
                  gap: 8,
                }}
              >
                <input
                  placeholder="Namn (t.ex. Salt)"
                  value={ing.name}
                  onChange={(e) => updateIngredient(i, "name", e.target.value)}
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Mängd"
                  value={ing.amount}
                  onChange={(e) =>
                    updateIngredient(i, "amount", e.target.value)
                  }
                />
                <input
                  placeholder="Enhet (t.ex. tsk, gram)"
                  value={ing.unit}
                  onChange={(e) => updateIngredient(i, "unit", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  style={{ padding: "6px 10px" }}
                >
                  Ta bort
                </button>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={addIngredient}
                style={{
                  padding: "6px 10px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                }}
              >
                + Lägg till ingrediens
              </button>
            </div>
          </div>
        </fieldset>

        <button
          disabled={busy}
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          {busy ? "Sparar…" : "Spara"}
        </button>
      </form>
    </>
  );
}
