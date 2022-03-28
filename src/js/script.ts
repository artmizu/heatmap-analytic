import Store from "./store";
import { getElementByPath, encodePath } from "./path";
import Heatmap from "./heatmap";
import debounce from "lodash.debounce";

/**
 * Нужно группировать события по элементам и после проходиться по
 * этому массиву элементов и рендерить клики по этому элементу
 */

declare global {
  interface Window {
    store: any;
  }
}

interface HeatmapElement {
  x: number;
  y: number;
  value: number;
}

const startTime = Date.now();
const store = new Store();
const heatmap = new Heatmap();
window.store = store;

window.addEventListener(
  "resize",
  debounce(function () {
    heatmap.repaint();
    printStoreToCanvas();
  }, 400)
);

document.addEventListener("click", (event: MouseEvent) => {
  if (event.target instanceof HTMLElement) {
    store.push({
      time: Date.now() - startTime,
      page: {
        x: event.clientX,
        y: event.clientY + window.scrollY,
      },
      relativeToElement: {
        x: Math.round((event.offsetX / event.target.offsetWidth) * 100),
        y: Math.round((event.offsetY / event.target.offsetHeight) * 100),
      },
      path: encodePath(event.target),
    });

    printStoreToCanvas();
  }
});

function printStoreToCanvas(): void {
  let data: HeatmapElement[] = [];
  let groupped = store.getGrouppedByPath();
  for (const path in groupped) {
    const $el = getElementByPath(path);
    if (!$el) continue;

    // https://stackoverflow.com/a/59096915
    const isVisible = isElementVisible($el);
    if (!isVisible) continue;

    const { x, y, width, height } = $el.getBoundingClientRect();
    groupped[path].forEach((c) => {
      data.push({
        x: Math.round(x + (c.x / 100) * width),
        y: Math.round(y + (c.y / 100) * height) + window.scrollY,
        value: 10,
      });
    });
  }

  console.log(data);
  heatmap.setData(data);
}

function isElementVisible(el?: Element): boolean {
  return el?.getClientRects().length !== 0 ? true : false;
}
