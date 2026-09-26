import assert from "node:assert";
import { buildBrackets } from "../brackets.js";
import { totalCost } from "../cost.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("buildBrackets returns ups", () => {
  assert.ok(Array.isArray(buildBrackets([{ up: 10, rate: 1 }]).ups));
});

check("totalCost returns a total", () => {
  assert.strictEqual(typeof totalCost(5, [{ up: 10, rate: 1 }]).total, "number");
});

check("totalCost returns parts", () => {
  assert.ok(Array.isArray(totalCost(5, [{ up: 10, rate: 1 }]).parts));
});

check("render counts brackets", () => {
  assert.strictEqual(typeof render({ amount: 5, brackets: [{ up: 10, rate: 1 }] }).count, "number");
});

check("render exposes total", () => {
  assert.strictEqual(typeof render({ amount: 5, brackets: [{ up: 10, rate: 1 }] }).total, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
