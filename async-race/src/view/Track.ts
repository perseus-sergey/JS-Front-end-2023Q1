import { IStartStopEngine } from '../app/tipes';
import {
  API_BASE_URL,
  constantsAttributes,
  constantsClasses,
  constantsNumbers,
  constantsSVGs,
  constantsTexts,
  apiCarEngine,
  constantsTagName,
} from '../constants';
import { generateDomElement, getImage } from '../utilites';
import { Car } from './Car';

const {
  method,
  startStopUrl,
  required: {
    id,
    status: {
      statusUrl,
      params: {
        started,
        stopped,
        drive,
      },
    },
  },
  respContent: {
    velocity,
    distance,
    success, // true/false
  },
  stopCode,
} = apiCarEngine;

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
  BTN_TRACK_SELECT_CAR,
  BTN_TRACK_REMOVE_CAR,
  BTN_TRACK_STOP_CAR,
  BTN_TRACK_START_CAR,
} = constantsTexts;

const {
  ATTR_CAR_NAME, ATTR_CAR_COLOR, MOOVE, WINNER, FINISHER,
} = constantsAttributes;

const { WIN_TAG } = constantsTagName;
const { DISTANCE } = constantsNumbers;

export class Track extends HTMLElement {
  public car!: Car;

  public raceTime!: number;

  public carVelocity!: number;

  private carElement!: HTMLElement;

  private engineStopBtn!: HTMLButtonElement;

  private engineStartBtn!: HTMLButtonElement;

  private carTitleTag!: HTMLElement;

  private carTitle: string | null | undefined;

  private distance = DISTANCE;

  private start = 0;

  private stopId!: number;

  private progress!: number;

  public static get observedAttributes(): string[] {
    return [ATTR_CAR_NAME, ATTR_CAR_COLOR, MOOVE, WINNER];
  }

  public insertCar(car: Car): void {
    this.car = car;
    this.carTitleTag.innerHTML = car.name;
    this.carElement = generateDomElement('div', getImage(this.car.color), this, CAR);
    generateDomElement('div', FINISH_FLAG_SVG, this, FINISH_FLAG);
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === ATTR_CAR_NAME) {
      this.carTitle = newValue;
      if (this.carTitleTag) this.carTitleTag.innerHTML = newValue;
    } else if (name === ATTR_CAR_COLOR) {
      if (this.carElement) this.carElement.innerHTML = getImage(this.car.color);
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

  private async moove(): Promise<void> {
    if (this.hasAttribute(MOOVE)) {
      await this.setAnimateParams();
      requestAnimationFrame(this.step);
      if (await this.isCrashEngine(this.car.id)) cancelAnimationFrame(this.stopId);
    } else {
      this.stopCar();
    }
  }

  private stopCar(): void {
    cancelAnimationFrame(this.stopId);
    this.start = 0;
    this.carElement.style.transform = 'translateX(0)';
    this.engineStartBtn.disabled = false;
  }

  private sendResultToWinTag(): void {
    const winTag = document.body.querySelector(WIN_TAG);
    if (winTag) {
      winTag.setAttribute(FINISHER, [
        this.car.id, this.car.color, this.car.name, this.raceTime,
      ].join('|'));
    }
  }

  private async setAnimateParams(): Promise<void> {
    this.engineStartBtn.disabled = true;
    this.distance = this.clientWidth - this.carElement.clientWidth;
    const carEngineParams = await this.getApiVelocity(this.car.id);
    this.carVelocity = carEngineParams.velocity || 0;
    this.raceTime = this.getRaceTime();
  }

  private step(timestamp: number): void {
    if (!this.start || this.progress > this.distance) this.start = timestamp;
    this.progress = (timestamp - this.start) / this.raceTime;
    this.carElement.style.transform = `translateX(${Math.min(this.progress, this.distance)}px)`;
    if (this.progress < this.distance) {
      this.stopId = requestAnimationFrame(this.step);
    } else this.sendResultToWinTag();
  }

  private getRaceTime(): number {
    return this.carVelocity ? +(this.distance / this.carVelocity).toFixed(2) : 0;
  }

  private async isCrashEngine(carId: number): Promise<boolean> {
    const url = `${API_BASE_URL + startStopUrl}?${id}${carId}&${statusUrl + drive}`;
    try {
      return this.responseCrash(await fetch(url, { method }));
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private responseCrash(res: Response): boolean {
    if (!res.ok) {
      if (res.status === 500) console.log('Car has been stopped. It\'s engine was broken down.');
      else console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      return true;
    }
    return false;
  }

  private async getApiVelocity(carId: number):Promise<IStartStopEngine> {
    const url = `${API_BASE_URL + startStopUrl}?${id}${carId}&${statusUrl + started}`;
    try {
      const response = this.errorHandler(await fetch(url, { method }));
      return await response.json();
    } catch (error) {
      console.error(error);
      return { velocity: null, distance: null };
    }
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }
    return res;
  }
}
