import h337 from "heatmap.js";

export default class Heatmap {
  private overlay: HTMLElement;
  private heatmap: h337.Heatmap<"value", "x", "y">;

  constructor({ overlay = ".overlay" } = {}) {
    const $overlay = document.querySelector(overlay);
    if ($overlay instanceof HTMLElement) {
      this.overlay = $overlay;
      this.heatmap = this.init();
    } else {
      throw new Error("Cannot find overlay element for Heatmap.js");
    }
  }

  init() {
    return h337.create({
      radius: 10,
      container: this.overlay,
    });
  }

  repaint() {
    this.overlay.innerHTML = "";
    this.heatmap = this.init();
  }

  setData(data: h337.DataPoint[]) {
    this.heatmap.setData({
      min: 1,
      max: 60,
      data,
    });
  }
}
