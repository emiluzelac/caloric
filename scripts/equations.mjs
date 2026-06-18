// Shared RMR prediction equations (single source of truth).
// All functions take metric inputs: { sex, ageYears, heightCm, weightKg }
// and return RMR in kcal/day. sex is "male" | "female".

export const LB_TO_KG = 0.453592;
export const IN_TO_CM = 2.54;

export function fromImperial({ ft, inch, lbs }) {
  return {
    heightCm: (ft * 12 + inch) * IN_TO_CM,
    weightKg: lbs * LB_TO_KG,
  };
}

// Pavlidou (2023) revised Harris-Benedict — the equation the app now uses.
export function pavlidou({ sex, ageYears, heightCm, weightKg }) {
  const heightM = heightCm / 100;
  return sex === "male"
    ? 9.65 * weightKg + 573 * heightM - 5.08 * ageYears + 260
    : 7.38 * weightKg + 607 * heightM - 2.31 * ageYears + 43;
}

// Previous app behavior: FFM-based model (ignores age).
export function oldFfmModel({ sex, heightCm, weightKg }) {
  const ffm =
    sex === "male"
      ? 0.407 * weightKg + 0.267 * heightCm - 19.2
      : 0.252 * weightKg + 0.473 * heightCm - 48.3;
  return sex === "male" ? 23.69 * ffm + 372.7 : 21.6 * ffm + 371.2;
}

// Mifflin-St Jeor (1990).
export function mifflin({ sex, ageYears, heightCm, weightKg }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === "male" ? base + 5 : base - 161;
}

// Harris-Benedict, Roza revision (1984).
export function harrisBenedict({ sex, ageYears, heightCm, weightKg }) {
  return sex === "male"
    ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears
    : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears;
}

export const EQUATIONS = {
  Pavlidou: pavlidou,
  OldFFM: oldFfmModel,
  Mifflin: mifflin,
  Harris: harrisBenedict,
};
