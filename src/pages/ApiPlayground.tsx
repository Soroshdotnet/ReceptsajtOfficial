import { useState } from "react";
import * as R from "../services/recipes";
import type { Recipe } from "../types/recipe";

/**
 * Enkel testsida för alla endpoints.
 * Körs i dev-läge: Vite-proxy rewritar /api -> https://grupp2-mqsel.reky.se
 * I prod: sätt VITE_API_BASE_URL och bygg.
 */
export default function ApiPlayground() {
  const [out, setOut] = useState<any>(null);
  const [rid, setRid] = useState("");
  const [category, setCategory] = useState("");

  const demo: Recipe = {
    title: "Toast skagen",
    description: "Gott till champagne",
    imageUrl: "https://assets.icanet.se/e_sharpen:80,q_auto,dpr_1.25,w_718,h_718,c_lfill/imagevaultfiles/id_223427/cf_259/korvstroganoff_med_ris.jpg",
    timeInMins: 15,
    price: 150,
    categories: ["Förrätt","Skaldjur","Smaskigt"],
    instructions: ["Stek brödet","Lägg på röran","Toppa med dill"],
    ingredients: ["Räkor","Majonnäs","Dill","Citron","Toast"],
  };

  async function run<T>(fn: () => Promise<T>) {
    try {
      setOut("Kör...");
      const res = await fn();
      setOut(res);
    } catch (e: any) {
      setOut(String(e?.message || e));
    }
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1>API Playground</h1>

      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => run(() => R.getRecipes())}>GET /recipes</button>
          <button onClick={() => run(() => R.createRecipe(demo))}>POST /recipes</button>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <input placeholder="recipeId" value={rid} onChange={e=>setRid(e.target.value)} />
          <button onClick={() => run(() => R.getRecipe(rid))}>GET /recipes/{`{id}`}</button>
          <button onClick={() => run(() => R.updateRecipe(rid, { title: "Uppdaterad titel" }))}>PATCH /recipes/{`{id}`}</button>
          <button onClick={() => run(() => R.deleteRecipe(rid))}>DELETE /recipes/{`{id}`}</button>
          <button onClick={() => run(() => R.rateRecipe(rid, 5))}>POST /recipes/{`{id}`}/ratings</button>
          <button onClick={() => run(() => R.getComments(rid))}>GET /recipes/{`{id}`}/comments</button>
          <button onClick={() => run(() => R.addComment(rid, { author: "Test", text: "Bra recept!" }))}>POST /recipes/{`{id}`}/comments</button>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button onClick={() => run(() => R.getCategories())}>GET /categories</button>
          <input placeholder="categoryName" value={category} onChange={e=>setCategory(e.target.value)} />
          <button onClick={() => run(() => R.getCategoryRecipes(category))}>GET /categories/{`{name}`}/recipes</button>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => run(() => R.clearAll())}>GET /clear</button>
        </div>
      </div>

      <pre style={{ background: "#111", color: "#0f0", padding: 12, borderRadius: 8, overflow: "auto" }}>
        {typeof out === "string" ? out : JSON.stringify(out, null, 2)}
      </pre>
    </div>
  );
}
