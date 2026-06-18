// RMR equation comparison harness.
// Run: node scripts/compare-equations.mjs
//
// Compares the RMR estimates produced by:
//   - Pavlidou (2023) revised Harris-Benedict  <-- now used by the app
//   - The previous FFM-based model             <-- old app behavior
//   - Mifflin-St Jeor (1990)
//   - Harris-Benedict (revised 1984)
//
// Inputs use the same units the UI collects (ft/in, lbs) and convert internally.

const LB_TO_KG = 0.453592;
const IN_TO_CM = 2.54;

function toMetric({ ft, inch, lbs }) {
  const heightCm = (ft * 12 + inch) * IN_TO_CM;
  return {
    heightCm,
    heightM: heightCm / 100,
    weightKg: lbs * LB_TO_KG,
  };
}

function pavlidou({ sex, ft, inch, lbs, age }) {
  const { heightM, weightKg } = toMetric({ ft, inch, lbs });
  return sex === "male"
    ? 9.65 * weightKg + 573 * heightM - 5.08 * age + 260
    : 7.38 * weightKg + 607 * heightM - 2.31 * age + 43;
}

function oldFfmModel({ sex, ft, inch, lbs }) {
  const { heightCm, weightKg } = toMetric({ ft, inch, lbs });
  const ffm =
    sex === "male"
      ? 0.407 * weightKg + 0.267 * heightCm - 19.2
      : 0.252 * weightKg + 0.473 * heightCm - 48.3;
  return sex === "male" ? 23.69 * ffm + 372.7 : 21.6 * ffm + 371.2;
}

function mifflin({ sex, ft, inch, lbs, age }) {
  const { heightCm, weightKg } = toMetric({ ft, inch, lbs });
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

function harrisBenedict({ sex, ft, inch, lbs, age }) {
  const { heightCm, weightKg } = toMetric({ ft, inch, lbs });
  return sex === "male"
    ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
    : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
}

const profiles = [
  { label: "M 25y 5'11\" 176lb", sex: "male", ft: 5, inch: 11, lbs: 176, age: 25 },
  { label: "M 45y 5'11\" 200lb", sex: "male", ft: 5, inch: 11, lbs: 200, age: 45 },
  { label: "M 65y 5'9\" 190lb", sex: "male", ft: 5, inch: 9, lbs: 190, age: 65 },
  { label: "F 25y 5'5\" 143lb", sex: "female", ft: 5, inch: 5, lbs: 143, age: 25 },
  { label: "F 45y 5'4\" 160lb", sex: "female", ft: 5, inch: 4, lbs: 160, age: 45 },
  { label: "F 65y 5'3\" 150lb", sex: "female", ft: 5, inch: 3, lbs: 150, age: 65 },
];

const fmt = (n) => String(Math.round(n)).padStart(5);

console.log(
  [
    "Profile".padEnd(22),
    "Pavlidou".padStart(8),
    "OldFFM".padStart(8),
    "Mifflin".padStart(8),
    "Harris".padStart(8),
    "Δ vs Mifflin".padStart(13),
  ].join(" ")
);
console.log("-".repeat(72));

for (const p of profiles) {
  const pav = pavlidou(p);
  const old = oldFfmModel(p);
  const mif = mifflin(p);
  const hb = harrisBenedict(p);
  console.log(
    [
      p.label.padEnd(22),
      fmt(pav),
      fmt(old),
      fmt(mif),
      fmt(hb),
      `${(pav - mif >= 0 ? "+" : "")}${Math.round(pav - mif)}`.padStart(13),
    ].join(" ")
  );
}

console.log(
  "\nAll values are RMR in kcal/day. The app now uses the Pavlidou column."
);
