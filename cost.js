// cost.js：分段计费（一次扫描，逐档取单位数乘单价）
import { buildBrackets } from "./brackets.js";

export function totalCost(amount, brackets) {
  const { ups, rates } = buildBrackets(brackets);
  let remaining = Math.max(0, Math.floor(amount));
  let prev = 0;
  let total = 0;
  const parts = [];
  for (let index = 0; index < ups.length; index += 1) {
    const span = ups[index] - prev;
    const units = Math.min(span, remaining);
    const cost = units * rates[index];
    parts.push({ units, cost });
    total += cost;
    remaining -= units;
    prev = ups[index];
  }
  return { total, parts };
}
