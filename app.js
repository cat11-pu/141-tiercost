// app.js：渲染结果
import { buildBrackets } from "./brackets.js";
import { totalCost } from "./cost.js";

export function render(spec) {
  const amount = spec.amount || 0;
  const built = buildBrackets(spec.brackets || []);
  const view = totalCost(amount, spec.brackets || []);
  const costs = (view.parts || []).map((item) => item.cost);
  let monotonic = true;
  for (let spot = 1; spot < costs.length; spot += 1) {
    if (costs[spot] < 0) monotonic = false;
  }
  return { total: view.total, parts: view.parts || [], costs: costs,
           ups: built.ups, monotonic: monotonic, count: built.ups.length };
}
