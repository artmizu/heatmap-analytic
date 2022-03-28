export function encodePath(el: Element): string {
  let current = el;
  let path: string[] = [];

  while (current !== document.body) {
    const parent: Element | null = current.parentElement;
    if (parent) {
      let index = Array.from(parent.children).indexOf(current);
      path.unshift(index.toString(36));
      current = parent;
    } else {
      break;
    }
  }

  return path.join(":");
}

export function parsePath(str: string): number[] {
  const arr: string[] = str.split(":");
  return arr.map((el) => parseInt(el, 36));
}

export function getElementByPath(path: string): Element | null {
  let parsed = parsePath(path);
  let current: Element = document.body;
  let target: Element | null = null;

  parsed.forEach((el, index) => {
    let tmp: Element = current.children[el];
    if (index === parsed.length - 1 && tmp) {
      target = tmp;
    } else {
      current = tmp;
    }
  });

  return target;
}
