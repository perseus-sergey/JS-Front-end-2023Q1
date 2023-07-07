export const generateDomElement = <T extends HTMLElement>(
  tag: string,
  text: string,
  parent: HTMLElement | null,
  ...classes: string[]
): T => {
  const element = <T>document.createElement(tag);
  const arrClasses: string[] = [];
  classes.forEach((el) => {
    if (Array.isArray(el)) el.forEach((i) => arrClasses.push(i));
    else if (el) el.split(' ').forEach((e) => arrClasses.push(e));
  });
  if (arrClasses.length) element.classList.add(...arrClasses);
  element.textContent = text;
  if (parent) parent.append(element);
  return element;
};

export const delay = (ms = 1000): Promise<void> => new Promise((res) => { setTimeout(res, ms); });
