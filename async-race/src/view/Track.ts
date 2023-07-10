import { constantsAttributes, constantsClasses, constantsTexts } from '../constants';
import { generateDomElement } from '../utilites';
import { Car } from './Car';
import { Garage } from './Garage';

const {
  TRACK,
  TRACK_BTNS_WRAPPER,
  TRACK_CAR_NAME,
  ENGINE_BTNS_WRAPPER,
  CAR,
} = constantsClasses;

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

  private carNameTag!: HTMLElement;

  private carSvgFillLayer!: HTMLElement;

  private carName: string | null | undefined;

  private carColor: string | null | undefined;

  private start = 0;

  private stopId!: number;

  private progress!: number;

  private distance!: number;

  public static get observedAttributes(): string[] {
    return [ATTR_CAR_NAME, ATTR_CAR_COLOR];
  }

  public setCar(car: Car): void {
    this.car = car;
    // this.generateCarElement(car);
    this.carElement = generateDomElement('div', car.getImage(), this, CAR);
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === ATTR_CAR_NAME) {
      this.carName = newValue;
      if (this.carNameTag) this.carNameTag.innerHTML = newValue;
    }
    if (name === ATTR_CAR_COLOR) {
      this.carColor = newValue;
      if (this.carSvgFillLayer) this.carSvgFillLayer.style.fill = newValue;
    }
  }

  private connectedCallback(): void {
    this.generateTrack();
    // this.car = this.generateCar();
    this.callbackBinding();
    this.setListners();
  }

  private generateTrack(): HTMLElement {
    console.log('car name', this.carNameTag);
    const track = generateDomElement('div', '', this, TRACK);
    const trackBtnsWrapper = generateDomElement('div', '', track, TRACK_BTNS_WRAPPER);
    this.selectBtn = generateDomElement('button', BTN_TRACK_SELECT_CAR, trackBtnsWrapper);
    this.removeBtn = generateDomElement('button', BTN_TRACK_REMOVE_CAR, trackBtnsWrapper);
    this.carNameTag = generateDomElement('span', this.carName || null, trackBtnsWrapper, TRACK_CAR_NAME);

    const engineBtnsWrapper = generateDomElement('div', '', track, ENGINE_BTNS_WRAPPER);
    this.engineStopBtn = generateDomElement('button', BTN_TRACK_STOP_CAR, engineBtnsWrapper);
    this.engineStartBtn = generateDomElement('button', BTN_TRACK_START_CAR, engineBtnsWrapper);
    return track;
  }

  private callbackBinding(): void {
    this.stopBtnHandler = this.stopBtnHandler.bind(this);
    this.startBtnHandler = this.startBtnHandler.bind(this);
    this.selectBtnkHandler = this.selectBtnkHandler.bind(this);
    this.updateCarSubmitHandler = this.updateCarSubmitHandler.bind(this);
    this.step = this.step.bind(this);
  }

  private setListners(): void {
    this.selectBtn.addEventListener('click', this.selectBtnkHandler);
    // this.removeBtn.addEventListener('click', this.clickHandler);
    this.engineStopBtn.addEventListener('click', this.stopBtnHandler);
    this.engineStartBtn.addEventListener('click', this.startBtnHandler);
  }

  private selectBtnkHandler(): void {
    Garage.isDisableUpdateForm(false);
    Garage.inputUpdateCarName.focus();
    Garage.inputUpdateCarName.value = this.carName || '';
    Garage.inputUpdateCarColor.value = this.carColor || '#ffffff';
    Garage.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
  }

  private updateCarSubmitHandler(event: Event): void {
    const updatedName = Garage.inputUpdateCarName.value;
    const updatedColor = Garage.inputUpdateCarColor.value;
    this.carName = updatedName;
    this.carNameTag.innerHTML = updatedName;
    this.carColor = updatedColor;
    this.carSvgFillLayer.style.fill = updatedColor;
    Garage.isDisableUpdateForm(true);
    console.log(Garage.inputUpdateCarColor.value);
    event.preventDefault();
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
