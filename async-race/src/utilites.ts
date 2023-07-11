/* eslint-disable max-len */
import { ICar } from './app/tipes';
import { constantsTagName } from './constants';

const { TRACK_TAG } = constantsTagName;

export const generateDomElement = <T extends HTMLElement>(
  tag: string,
  innerHTML: string | null,
  parent: HTMLElement | null,
  ...classes: string[]
): T => {
  const element = <T>document.createElement(tag);
  const arrClasses: string[] = [];
  classes.forEach((className) => {
    if (Array.isArray(className)) className.forEach((classInside) => arrClasses.push(classInside));
    else if (className) className.split(' ').forEach((splittedClass) => arrClasses.push(splittedClass));
  });
  if (arrClasses.length) element.classList.add(...arrClasses);
  if (innerHTML) element.innerHTML = innerHTML;
  if (parent) parent.append(element);
  return element;
};

// https:// learn.javascript.ru/js-animation

// export const animate = ({ timing, draw, duration }):void => {
//   const start = performance.now();

//   requestAnimationFrame(function step(time) {
//     // timeFraction can change from 0 to 1
//     let timeFraction = (time - start) / duration;
//     if (timeFraction > 1) timeFraction = 1;

//     // calculate the current animation state
//     const progress = timing(timeFraction);

//     draw(progress); // draw it

//     if (timeFraction < 1) {
//       requestAnimationFrame(step);
//     }
//   });
// };

export const isFormValidate = (value: string | null | undefined): boolean => !!value;

export const delay = (ms = 1000): Promise<void> => new Promise((res) => { setTimeout(res, ms); });

export const getRandomIntBetween = (min = 1, max = 10): number => {
  const minInteger = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minInteger + 1)) + minInteger;
};

export const freeIdSearche = (
  cars: ICar[],
): number => (cars.length ? Math.max(...cars.map((car) => car.id)) + 1 : 0);

export const getTrackTags = (): HTMLElement[] => [...document.querySelectorAll(TRACK_TAG)] as HTMLElement[];

export const randomColor = (): string => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
