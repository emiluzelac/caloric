// RMR equation AGREEMENT harness (no ground-truth data needed).
// Run: node scripts/compare-equations.mjs
//
// Shows how far the equations diverge across sample profiles. This measures
// agreement only -- NOT accuracy. For accuracy vs measured RMR, use
// scripts/validate-accuracy.mjs with real indirect-calorimetry data.

import { EQUATIONS, fromImperial } from "./equations.mjs";

const profiles = [
  { label: "M 25y 5'11\" 176lb", sex: "male", ft: 5, inch: 11, lbs: 176, age: 25 },
  { label: "M 45y 5'11\" 200lb", sex: "male", ft: 5, inch: 11, lbs: 200, age: 45 },
  { label: "M 65y 5'9\" 190lb", sex: "male", ft: 5, inch: 9, lbs: 190, age: 65 },
  { label: "F 25y 5'5\" 143lb", sex: "female", ft: 5, inch: 5, lbs: 143, age: 25 },
  { label: "F 45y 5'4\" 160lb", sex: "female", ft: 5, inch: 4, lbs: 160, age: 45 },
  { label: "F 65y 5'3\" 150lb", sex: "female", ft: 5, inch: 3, lbs: 150, age: 65 },
];

const names = Object.keys(EQUATIONS);
const fmt = (n) => String(Math.round(n)).padStart(8);

console.log(
  ["Profile".padEnd(22), ...names.map((n) => n.padStart(8))].join(" ")
);
console.log("-".repeat(22 + names.length * 9));

for (const p of profiles) {
  const input = {
    sex: p.sex,
    ageYears: p.age,
    ...fromImperial({ ft: p.ft, inch: p.inch, lbs: p.lbs }),
  };
  const row = names.map((n) => fmt(EQUATIONS[n](input)));
  console.log([p.label.padEnd(22), ...row].join(" "));
}

console.log("\nValues are RMR kcal/day. Agreement only -- not accuracy.");
