import { buildBrackets } from "./brackets.js";

export function totalCost(amount, brackets) {
  const { ups, rates } = buildBrackets(brackets);
  let remaining = Number(amount) > 0 ? Math.floor(Number(amount)) : 0;
  const parts = [];
  let total = 0;
  let previousUp = 0;
  for (let index = 0; index < ups.length; index += 1) {
    const span = ups[index] - previousUp;
    const units = remaining > 0 ? Math.min(span, remaining) : 0;
    const cost = units * rates[index];
    parts.push({ up: ups[index], rate: rates[index], units, cost });
    total += cost;
    remaining -= units;
    previousUp = ups[index];
  }
  // 超出最后一档的用量留存在 remaining 中，不计费。
  return { total, parts };
}
