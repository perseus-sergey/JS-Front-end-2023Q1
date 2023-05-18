export const generateDomElement = (tag, text = '', ...classes) => {
  const element = document.createElement(tag);
  const arrClasses = [];
  classes.forEach((el) => {
    if (Array.isArray(el)) el.forEach((i) => arrClasses.push(i));
    else if (el) el.split(' ').forEach((e) => arrClasses.push(e));
  });
  if (arrClasses.length) element.classList.add(...arrClasses);
  element.textContent = text;
  return element;
};
