// RMR equation ACCURACY validator against measured RMR (the real test).
// Run: node scripts/validate-accuracy.mjs [path/to/data.csv]
// Default CSV: scripts/sample-rmr.csv
//
// Required CSV columns (header row, comma-separated):
//   sex,age,height_cm,weight_kg,measured_rmr
//     sex          : "male" | "female"
//     age          : years
//     height_cm    : centimeters
//     weight_kg    : kilograms
//     measured_rmr : kcal/day from indirect calorimetry (ground truth)
//
// For each equation it reports the field-standard accuracy metrics:
//   n           number of valid rows
//   bias        mean(predicted - measured) kcal/day  (+ = overestimates)
//   bias%       bias as % of mean measured RMR
//   MAE         mean absolute error kcal/day
//   RMSE        root mean square error kcal/day
//   MAPE        mean absolute percentage error
//   acc±10%     % of subjects predicted within 10% of measured  <-- headline metric
//   LoA         Bland-Altman 95% limits of agreement (bias ± 1.96*SD)

import { readFileSync } from "node:fs";
import { EQUATIONS } from "./equations.mjs";

const csvPath = process.argv[2] ?? new URL("./sample-rmr.csv", import.meta.url);

function parseCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
  const header = lines.shift().split(",").map((h) => h.trim().toLowerCase());
  const idx = (name) => header.indexOf(name);
  const need = ["sex", "age", "height_cm", "weight_kg", "measured_rmr"];
  for (const c of need) {
    if (idx(c) === -1) throw new Error(`CSV missing required column: ${c}`);
  }
  return lines.map((line) => {
    const cells = line.split(",");
    return {
      sex: cells[idx("sex")].trim().toLowerCase(),
      ageYears: Number(cells[idx("age")]),
      heightCm: Number(cells[idx("height_cm")]),
      weightKg: Number(cells[idx("weight_kg")]),
      measured: Number(cells[idx("measured_rmr")]),
    };
  });
}

function metrics(rows, eqFn) {
  const errs = [];
  let within10 = 0;
  let sumMeasured = 0;
  for (const r of rows) {
    const pred = eqFn(r);
    const err = pred - r.measured;
    errs.push(err);
    sumMeasured += r.measured;
    if (Math.abs(err) / r.measured <= 0.1) within10++;
  }
  const n = errs.length;
  const bias = errs.reduce((a, b) => a + b, 0) / n;
  const mae = errs.reduce((a, b) => a + Math.abs(b), 0) / n;
  const rmse = Math.sqrt(errs.reduce((a, b) => a + b * b, 0) / n);
  const mape =
    (rows.reduce((a, r) => a + Math.abs(eqFn(r) - r.measured) / r.measured, 0) /
      n) *
    100;
  const meanMeasured = sumMeasured / n;
  const sd = Math.sqrt(
    errs.reduce((a, b) => a + (b - bias) ** 2, 0) / (n - 1 || 1)
  );
  return {
    n,
    bias,
    biasPct: (bias / meanMeasured) * 100,
    mae,
    rmse,
    mape,
    acc10: (within10 / n) * 100,
    loaLow: bias - 1.96 * sd,
    loaHigh: bias + 1.96 * sd,
  };
}

const text =
  typeof csvPath === "string" || csvPath instanceof URL
    ? readFileSync(csvPath, "utf8")
    : "";
const rows = parseCsv(text).filter(
  (r) =>
    (r.sex === "male" || r.sex === "female") &&
    Number.isFinite(r.ageYears) &&
    Number.isFinite(r.heightCm) &&
    Number.isFinite(r.weightKg) &&
    Number.isFinite(r.measured)
);

if (rows.length === 0) {
  console.error("No valid rows found. Check CSV format and columns.");
  process.exit(1);
}

const p = (n, w = 8, d = 1) => Number(n).toFixed(d).padStart(w);
console.log(`Dataset: ${rows.length} subjects\n`);
console.log(
  [
    "Equation".padEnd(10),
    "n".padStart(4),
    "bias".padStart(8),
    "bias%".padStart(7),
    "MAE".padStart(8),
    "RMSE".padStart(8),
    "MAPE%".padStart(7),
    "acc±10%".padStart(8),
    "LoA(95%)".padStart(20),
  ].join(" ")
);
console.log("-".repeat(86));

const ranked = Object.entries(EQUATIONS)
  .map(([name, fn]) => [name, metrics(rows, fn)])
  .sort((a, b) => b[1].acc10 - a[1].acc10);

for (const [name, m] of ranked) {
  console.log(
    [
      name.padEnd(10),
      String(m.n).padStart(4),
      p(m.bias),
      p(m.biasPct, 7),
      p(m.mae),
      p(m.rmse),
      p(m.mape, 7),
      p(m.acc10, 8),
      `${Math.round(m.loaLow)}..${Math.round(m.loaHigh)}`.padStart(20),
    ].join(" ")
  );
}

console.log(
  "\nRanked by acc±10% (the literature's headline accuracy metric)."
);
console.log(
  "Replace scripts/sample-rmr.csv with REAL measured data for a valid result."
);
