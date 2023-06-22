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

export class CreateElement<T extends HTMLElement> {
  // const inp = new CreateElement<HTMLInputElement>('input', '', 'editor-input')
  // inp.element.placeholder = ''

  public element: T;

  private classes;

  constructor(tag: string, private innerText = '', ...classes: string[]) {
    this.classes = classes;
    this.element = <T>document.createElement(tag);
    this.setupEl();
  }

  private setupEl(): void {
    const arrClasses: string[] = [];
    this.classes.forEach((el: string) => {
      if (Array.isArray(el)) el.forEach((i) => arrClasses.push(i));
      else if (el) el.split(' ').forEach((e) => arrClasses.push(e));
    });
    if (arrClasses.length) this.element.classList.add(...arrClasses);
    this.element.textContent = this.innerText;
  }
}
// https://stackoverflow.com/questions/1787322/what-is-the-htmlspecialchars-equivalent-in-javascript
// private escapeHtml(text:string): string {
//   const map: { [key: string]: string } = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&#039;',
//   };
//   return text.replace(/[&<>"']/g, (m) => map[m]);
// }
