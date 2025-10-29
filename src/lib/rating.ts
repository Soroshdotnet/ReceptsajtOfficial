import type { Recipe } from "../types/recipe";

/** Returnera snittbetyg – helst serverns avgRating, annars beräkna från ratings[] */
export function getAverage(r: Recipe | null | undefined): number | null {
  if (!r) return null;
  if (typeof r.avgRating === "number" && !Number.isNaN(r.avgRating)) {
    // runda till 1 decimal
    return Math.round(r.avgRating * 10) / 10;
  }
  const arr = r.ratings || [];
  if (arr.length === 0) return null;
  const sum = arr.reduce((a, b) => a + (Number(b) || 0), 0);
  return Math.round((sum / arr.length) * 10) / 10;
}

/** Antal betyg – API:t exponerar inte count separat. */
export function getCount(r: Recipe | null | undefined): number | null {
  const n = r?.ratings?.length;
  return typeof n === "number" ? n : null;
}
