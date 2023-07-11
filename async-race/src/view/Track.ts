import {
  constantsAttributes, constantsClasses, constantsSVGs, constantsTexts,
} from '../constants';
import { generateDomElement } from '../utilites';
import { Car } from './Car';

const {
  TRACK_BTNS_WRAPPER,
  TRACK_CAR_NAME,
  FINISH_FLAG,
  CAR,
  BTN_TRACK_SELECT_CAR_STYLE,
  BTN_TRACK_REMOVE_CAR_STYLE,
  BTN_TRACK_STOP_CAR_STYLE,
  BTN_TRACK_START_CAR_STYLE,
} = constantsClasses;

const { FINISH_FLAG_SVG } = constantsSVGs;

const {
  BTN_TRACK_SELECT_CAR, BTN_TRACK_REMOVE_CAR, BTN_TRACK_STOP_CAR, BTN_TRACK_START_CAR,
} = constantsTexts;

const { ATTR_CAR_NAME, ATTR_CAR_COLOR, MOOVE } = constantsAttributes;

export class Track extends HTMLElement {
  public car!: Car;

  private carElement!: HTMLElement;

  private engineStopBtn!: HTMLButtonElement;

  private engineStartBtn!: HTMLButtonElement;

  private carTitleTag!: HTMLElement;

  private carTitle: string | null | undefined;

  private start = 0;

  private stopId!: number;

  private progress!: number;

  private distance!: number;

  public static get observedAttributes(): string[] {
    return [ATTR_CAR_NAME, ATTR_CAR_COLOR, MOOVE];
  }

  public insertCar(car: Car): void {
    this.car = car;
    this.carTitleTag.innerHTML = car.name;
    this.carElement = generateDomElement('div', car.getImage(), this, CAR);
    generateDomElement('div', FINISH_FLAG_SVG, this, FINISH_FLAG);
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === ATTR_CAR_NAME) {
      this.carTitle = newValue;
      if (this.carTitleTag) this.carTitleTag.innerHTML = newValue;
    } else if (name === ATTR_CAR_COLOR) {
      if (this.carElement) this.carElement.innerHTML = this.car.getImage();
    } else if (name === MOOVE) this.moove();
  }

  private connectedCallback(): void {
    this.generateTrack();
    this.callbackBinding();
    this.setListners();
  }

  private generateTrack(): HTMLElement {
    const trackBtnsWrapper = generateDomElement('div', '', this, TRACK_BTNS_WRAPPER);
    generateDomElement('button', BTN_TRACK_SELECT_CAR, trackBtnsWrapper, BTN_TRACK_SELECT_CAR_STYLE);
    generateDomElement('button', BTN_TRACK_REMOVE_CAR, trackBtnsWrapper, BTN_TRACK_REMOVE_CAR_STYLE);

    this.engineStopBtn = generateDomElement('button', BTN_TRACK_STOP_CAR, trackBtnsWrapper, BTN_TRACK_STOP_CAR_STYLE);
    this.engineStartBtn = generateDomElement('button', BTN_TRACK_START_CAR, trackBtnsWrapper, BTN_TRACK_START_CAR_STYLE);

    this.carTitleTag = generateDomElement('span', this.carTitle || null, trackBtnsWrapper, TRACK_CAR_NAME);

    return this;
  }

  private callbackBinding(): void {
    this.step = this.step.bind(this);
  }

  private setListners(): void {
    this.engineStopBtn.addEventListener('click', () => this.removeAttribute(MOOVE));
    this.engineStartBtn.addEventListener('click', () => this.setAttribute(MOOVE, ''));
  }

  private moove(): void {
    if (this.hasAttribute(MOOVE)) {
      this.engineStartBtn.disabled = true;
      requestAnimationFrame(this.step);
    } else {
      cancelAnimationFrame(this.stopId);
      this.start = 0;
      this.carElement.style.transform = 'translateX(0)';
      this.engineStartBtn.disabled = false;
    }
  }

  private step(timestamp: number): void {
    this.distance = this.clientWidth - this.carElement.clientWidth;
    if (!this.start || this.progress > this.distance) this.start = timestamp;
    this.progress = (timestamp - this.start) / (500 / this.car.velocity);
    // this.progress = (timestamp - this.start) / this.car.velocity + 25;
    this.carElement.style.transform = `translateX(${Math.min(this.progress, this.distance)}px)`;
    if (this.progress < this.distance) {
      this.stopId = requestAnimationFrame(this.step);
    }
  }
}
