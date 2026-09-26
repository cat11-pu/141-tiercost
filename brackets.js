// brackets.js：档位表校验与构建

export const BAD_BRACKETS_CODE = "E_BAD_BRACKETS";

function badBrackets(message) {
  const error = new Error(message);
  error.code = BAD_BRACKETS_CODE;
  return error;
}

function isNonNegativeInteger(value) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

export function buildBrackets(brackets) {
  if (!Array.isArray(brackets) || brackets.length === 0) {
    throw badBrackets("档位不能为空");
  }
  const ups = [];
  const rates = [];
  let previousUp = 0; // 第一档隐含从零开始
  for (const bracket of brackets) {
    if (bracket === null || typeof bracket !== "object") {
      throw badBrackets("档位写法不合法");
    }
    const up = bracket.up;
    const rate = bracket.rate;
    if (typeof up !== "number" || !Number.isFinite(up) || up <= 0) {
      throw badBrackets("档位上界必须是正数");
    }
    if (up <= previousUp) {
      throw badBrackets("档位上界必须严格递增");
    }
    if (!isNonNegativeInteger(rate)) {
      throw badBrackets("单价必须是非负整数");
    }
    ups.push(up);
    rates.push(rate);
    previousUp = up;
  }
  return { ups, rates };
}
