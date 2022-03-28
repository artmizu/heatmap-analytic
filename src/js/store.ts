import { Coordinate } from "./interface";

interface HistoryElement {
  time: number;
  page: Coordinate;
  relativeToElement: Coordinate;
  path: string;
}

export default class Store {
  data: HistoryElement[] = [];

  constructor() {}

  push(el: HistoryElement) {
    this.data.push(el);
  }

  getGrouppedByPath(): { [key: string]: Coordinate[] } {
    let tmp: { [key: string]: Coordinate[] } = {};
    this.data.forEach((el) => {
      if (!tmp[el.path]) tmp[el.path] = [];
      tmp[el.path].push({ ...el.relativeToElement });
    });
    return tmp;
  }

  print() {
    console.dir(this.data);
  }
}
