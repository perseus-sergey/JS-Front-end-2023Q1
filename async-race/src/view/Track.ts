import { IStartStopEngine } from '../common/types';
import {
  constantsAttributes,
  constantsClasses,
  constantsNumbers,
  constantsSVGs,
  constantsTexts,
  apiCarEngine,
  constantsTagName,
} from '../common/constants';
import { Crud } from '../controller/Crud';
import { Resp } from '../controller/Response';
import { generateDomElement, getImage } from '../common/utilites';
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
  ATTR_CAR_NAME, ATTR_CAR_COLOR, MOOVE, WINNER, FINISHER, FINISHERS,
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

  private winTag = document.body.querySelector(WIN_TAG);

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
    this.engineStopBtn.disabled = true;
    this.engineStartBtn = generateDomElement('button', BTN_TRACK_START_CAR, trackBtnsWrapper, BTN_TRACK_START_CAR_STYLE);

    this.carTitleTag = generateDomElement('span', this.carTitle || null, trackBtnsWrapper, TRACK_CAR_NAME);

    return this;
  }

  private callbackBinding(): void {
    this.step = this.step.bind(this);
  }

  private setListners(): void {
    this.engineStopBtn.addEventListener('click', () => this.removeAttribute(MOOVE));
    this.engineStartBtn.addEventListener('click', () => {
      this.setAttribute(MOOVE, '');
      this.engineStopBtn.disabled = false;
    });
  }

  private async moove(): Promise<void> {
    if (this.hasAttribute(MOOVE)) {
      this.moveCarToStart();
      await this.setAnimateParams();
      requestAnimationFrame(this.step);
      if (await this.isCrashEngine(this.car.id, drive)) this.carStopped();
    } else {
      this.stopCar();
    }
  }

  private carStopped(): void {
    cancelAnimationFrame(this.stopId);
    if (!this.winTag) return;
    const stoppedTrackNum = this.winTag.getAttribute(FINISHERS) || 0;
    this.winTag.setAttribute(FINISHERS, `${+stoppedTrackNum + 1}`);
  }

  private moveCarToStart(): void {
    this.start = 0;
    this.carElement.style.transform = 'translateX(0)';
  }

  private async stopCar(): Promise<void> {
    await this.isCrashEngine(this.car.id, stopped);
    this.carStopped();
    this.moveCarToStart();
    this.engineStartBtn.disabled = false;
    this.engineStopBtn.disabled = true;
  }

  private sendResultToWinTag(): void {
    this.carStopped();
    this.winTag = document.body.querySelector(WIN_TAG);
    if (this.winTag) {
      this.winTag.setAttribute(FINISHER, [
        this.car.id, this.car.color, this.car.name, this.raceTime,
      ].join('|'));
    }
  }

  private async setAnimateParams(): Promise<void> {
    this.engineStartBtn.disabled = true;
    // this.engineStopBtn.disabled = false;
    this.distance = this.clientWidth - this.carElement.clientWidth;
    const carEngineParams = await this.getApiVelocity(this.car.id, started);
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

  private async isCrashEngine(carId: number, status:string): Promise<boolean> {
    const resp = new Resp(this.makeRequestUrl(carId, status), method);
    const prom = await resp.response;
    return (prom?.status === stopCode);
  }

  private async getApiVelocity(carId: number, status: string):Promise<IStartStopEngine> {
    const url = this.makeRequestUrl(carId, status);
    const crud = new Crud<IStartStopEngine>(url, method);
    return await crud.responseJson || { velocity: null, distance: null };
  }

  private makeRequestUrl(carId: number, status: string):string {
    return `${startStopUrl}?${id}${carId}&${statusUrl + status}`;
  }
}
