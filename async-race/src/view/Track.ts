import {
  constantsAttributes, constantsClasses, constantsSVGs, constantsTexts,
} from '../constants';
import { generateDomElement, isFormValidate } from '../utilites';
import { Car } from './Car';
import { Garage } from './Garage';

const {
  TRACK,
  TRACK_BTNS_WRAPPER,
  TRACK_CAR_NAME,
  FINISH_FLAG,
  ENGINE_BTNS_WRAPPER,
  CAR,
} = constantsClasses;

const { FINISH_FLAG_SVG } = constantsSVGs;

const {
  BTN_TRACK_SELECT_CAR, BTN_TRACK_REMOVE_CAR, BTN_TRACK_STOP_CAR, BTN_TRACK_START_CAR,
} = constantsTexts;

const { ATTR_CAR_NAME, ATTR_CAR_COLOR } = constantsAttributes;

export class Track extends HTMLElement {
  private car!: Car;

  private carElement!: HTMLElement;

  private selectBtn!: HTMLButtonElement;

  private removeBtn!: HTMLButtonElement;

  private engineStopBtn!: HTMLButtonElement;

  private engineStartBtn!: HTMLButtonElement;

  private carTitleTag!: HTMLElement;

  private carSvgFillLayer!: HTMLElement;

  private carTitle: string | null | undefined;

  private carColor: string | null | undefined;

  private start = 0;

  private stopId!: number;

  private progress!: number;

  private distance!: number;

  // public static get observedAttributes(): string[] {
  //   return [ATTR_CAR_NAME, ATTR_CAR_COLOR];
  // }

  public generateCar(car: Car): void {
    this.car = car;
    this.carTitleTag.innerHTML = car.name;
    // this.generateCarElement(car);
    this.carElement = generateDomElement('div', car.getImage(), this, CAR);
    generateDomElement('div', FINISH_FLAG_SVG, this, FINISH_FLAG);
  }

  // private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
  //   if (name === ATTR_CAR_NAME) {
  //     this.carTitle = newValue;
  //     if (this.carTitleTag) this.carTitleTag.innerHTML = newValue;
  //   }
  //   if (name === ATTR_CAR_COLOR) {
  //     this.carColor = newValue;
  //     if (this.carSvgFillLayer) this.carSvgFillLayer.style.fill = newValue;
  //   }
  // }

  private connectedCallback(): void {
    this.generateTrack();
    // this.car = this.generateCar();
    this.callbackBinding();
    this.setListners();
  }

  private generateTrack(): HTMLElement {
    // const track = generateDomElement('div', '', this, TRACK);

    const trackBtnsWrapper = generateDomElement('div', '', this, TRACK_BTNS_WRAPPER);
    this.selectBtn = generateDomElement('button', BTN_TRACK_SELECT_CAR, trackBtnsWrapper);
    this.removeBtn = generateDomElement('button', BTN_TRACK_REMOVE_CAR, trackBtnsWrapper);

    this.engineStopBtn = generateDomElement('button', BTN_TRACK_STOP_CAR, trackBtnsWrapper);
    this.engineStartBtn = generateDomElement('button', BTN_TRACK_START_CAR, trackBtnsWrapper);

    this.carTitleTag = generateDomElement('span', this.carTitle || null, trackBtnsWrapper, TRACK_CAR_NAME);

    return this;
  }

  private callbackBinding(): void {
    this.stopBtnHandler = this.stopBtnHandler.bind(this);
    this.startBtnHandler = this.startBtnHandler.bind(this);
    this.selectBtnHandler = this.selectBtnHandler.bind(this);
    this.updateCarSubmitHandler = this.updateCarSubmitHandler.bind(this);
    this.step = this.step.bind(this);
  }

  private setListners(): void {
    this.selectBtn.addEventListener('click', this.selectBtnHandler);
    // this.removeBtn.addEventListener('click', this.clickHandler);
    this.engineStopBtn.addEventListener('click', this.stopBtnHandler);
    this.engineStartBtn.addEventListener('click', this.startBtnHandler);
  }

  private selectBtnHandler(): void {
    Garage.isDisableUpdateForm(false);
    Garage.inputUpdateCarName.focus();
    Garage.inputUpdateCarName.value = this.car.name || '';
    Garage.inputUpdateCarColor.value = this.car.color || '#ffffff';
    Garage.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
  }

  private updateCarSubmitHandler(event: Event): void {
    event.preventDefault();
    if (!isFormValidate(Garage.inputUpdateCarName.value)) {
      Garage.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
      Garage.inputUpdateCarName.focus();
      return;
    }
    const updatedName = Garage.inputUpdateCarName.value;
    const updatedColor = Garage.inputUpdateCarColor.value;
    // this.carTitle = updatedName;
    this.carTitleTag.innerHTML = updatedName;
    // this.carColor = updatedColor;
    this.car.name = updatedName;
    this.car.color = updatedColor;
    this.carElement.innerHTML = this.car.getImage();
    // this.carSvgFillLayer.style.fill = updatedColor;
    Garage.isDisableUpdateForm(true);
    // console.log(Garage.inputUpdateCarColor.value);
  }

  private startBtnHandler(): void {
    this.engineStartBtn.disabled = true;
    requestAnimationFrame(this.step);
  }

  private stopBtnHandler(): void {
    cancelAnimationFrame(this.stopId);
    this.start = 0;
    this.carElement.style.transform = 'translateX(0)';
    this.engineStartBtn.disabled = false;
  }

  private step(timestamp: number): void {
    this.distance = this.clientWidth - this.carElement.clientWidth;
    if (!this.start || this.progress > this.distance) this.start = timestamp;
    this.progress = (timestamp - this.start) / this.car.velocity + 25;
    this.carElement.style.transform = `translateX(${Math.min(this.progress, this.distance)}px)`;
    if (this.progress < this.distance) {
      this.stopId = requestAnimationFrame(this.step);
    }
  }

  // private generateCarElement(car: Car): HTMLElement {
  //   return generateDomElement('div', car.getImage(), this, CAR);
  // }
}
