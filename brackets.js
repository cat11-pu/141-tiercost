// brackets.js：档位表（校验并取出上界与单价）
export function buildBrackets(brackets) {
  const bad = () => {
    const error = new Error("E_BAD_BRACKETS");
    error.code = "E_BAD_BRACKETS";
    return error;
  };
  if (!Array.isArray(brackets) || brackets.length === 0) throw bad();
  const ups = [];
  const rates = [];
  let prev = 0;
  for (const bracket of brackets) {
    if (!bracket || typeof bracket !== "object") throw bad();
    const up = bracket.up;
    const rate = bracket.rate;
    if (!Number.isInteger(up) || up <= 0 || up <= prev) throw bad();
    if (!Number.isInteger(rate) || rate < 0) throw bad();
    ups.push(up);
    rates.push(rate);
    prev = up;
  }
  return { ups, rates };
}
