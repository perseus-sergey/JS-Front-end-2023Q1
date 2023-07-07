import {
  constantsClasses, constantsTexts, constantsLinks, constantsSVGs,
} from '../constants';
import { generateDomElement } from '../utilites';

export class Garage {
  public garage!: HTMLElement;

  public trackWrapper!: HTMLElement;

  constructor() {
    this.generateGarage();
  }

  private generateGarage(): void {
    const main = document.body.querySelector('main');
    if (!main) return;
    this.garage = generateDomElement('div', '', main, 'track');
    this.trackWrapper = generateDomElement('div', '', this.garage, 'track-wrapper');
  }
}
