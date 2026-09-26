// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let amount = spec.amount || 0;
  parts.log.textContent = "用量 " + amount + "，档位 " + (spec.brackets || []).length + " 个。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { amount: amount }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.parts.forEach(function (part, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 档";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, part.units) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = part.units + " 个单位 " + part.cost + " 分";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "合计 " + view.total + " 分";
    parts.log.textContent = "是否单调 " + view.monotonic;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算费用";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "用量加一百";
  moreButton.addEventListener("click", function () {
    amount = amount + 100;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "用量减一百";
  lessButton.addEventListener("click", function () {
    amount = Math.max(0, amount - 100);
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "用量";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(amount);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (parsed >= 0) { amount = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看合计";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { amount: amount }));
    parts.out.textContent = "合计 " + view.total + " 分，分档 " + JSON.stringify(view.costs);
  });
  parts.controls.appendChild(readButton);

  draw();
}
