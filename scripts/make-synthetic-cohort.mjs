// Synthetic RMR cohort generator (for DEMONSTRATING the validation pipeline).
// Run: node scripts/make-synthetic-cohort.mjs > scripts/synthetic-cohort.csv
//
// IMPORTANT: This is NOT real measurement data. "measured_rmr" here is generated
// from an INDEPENDENT ground-truth model so the harness can be exercised without
// favoring any of the four tested equations:
//   1. Sample sex, age, height, BMI -> weight.
//   2. Estimate body fat % via Deurenberg (1991): BF = 1.20*BMI + 0.23*age
//      - 10.8*sexMale - 5.4  -> fat-free mass (FFM).
//   3. Ground-truth RMR via Katch-McArdle: RMR = 370 + 21.6*FFM  (NOT one of the
//      tested anthropometric equations).
//   4. Add ~8% between-subject biological noise (real RMR CV is ~8-10%).
// The seed makes the output reproducible.

const N = 200;
let seed = 20260618;
const rng = () => {
  // mulberry32
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const gauss = (mean, sd) => {
  const u = Math.max(rng(), 1e-9);
  const v = rng();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

const rows = [["sex", "age", "height_cm", "weight_kg", "measured_rmr"]];

for (let k = 0; k < N; k++) {
  const male = rng() < 0.5;
  const sex = male ? "male" : "female";
  const age = Math.round(clamp(gauss(45, 14), 20, 75));
  const heightCm = clamp(gauss(male ? 178 : 164, male ? 7 : 6), 150, 200);
  const bmi = clamp(gauss(27, 5), 17, 45);
  const weightKg = bmi * (heightCm / 100) ** 2;

  const bodyFatPct = clamp(
    1.2 * bmi + 0.23 * age - 10.8 * (male ? 1 : 0) - 5.4,
    5,
    55
  );
  const ffm = weightKg * (1 - bodyFatPct / 100);

  const rmrTrue = (370 + 21.6 * ffm) * (1 + gauss(0, 0.08));

  rows.push([
    sex,
    age,
    heightCm.toFixed(1),
    weightKg.toFixed(1),
    Math.round(rmrTrue),
  ]);
}

console.log(
  "# SYNTHETIC data from an independent Katch-McArdle FFM model + 8% noise."
);
console.log("# NOT real measurements. For pipeline demonstration only.");
console.log(rows.map((r) => r.join(",")).join("\n"));
