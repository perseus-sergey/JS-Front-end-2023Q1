import { ICar } from '../app/tipes';
import {
  constantsClasses, constantsTexts, constantsTagName, constantsAttributes,
} from '../constants';
import {
  freeIdSearche, generateDomElement, getRandomIntBetween, isFormValidate,
} from '../utilites';
import { Car } from './Car';
import { Track } from './Track';

// TO_DO: createCarSubmitHandler clean inputs
// TO_DO: createCarSubmitHandler resolve Dependency cycle

const {
  GARAGE,
  CONTROL_PANEL,
  INP_CREATE_CAR_NAME,
  INP_CREATE_CAR_COLOR,
  INP_UPDATE_CAR_NAME,
  INP_UPDATE_CAR_COLOR,
  BTN_TRACK_SELECT_CAR_STYLE,
} = constantsClasses;

const {
  CREATE_CAR_SUBMIT,
  UPDATE_CAR_SUBMIT,
} = constantsTexts;

const {
  ATTR_CAR_NAME,
  ATTR_CAR_ID,
  ATTR_CAR_COLOR,
} = constantsAttributes;

const { TRACK_TAG } = constantsTagName;

export class Garage {
  private formUpdateCar!: HTMLInputElement;

  private inputUpdateCarName!: HTMLInputElement;

  private inputUpdateCarColor!: HTMLInputElement;

  private inputUpdateCarSubmit!: HTMLInputElement;

  private cars: ICar[] = [];

  public garage!: HTMLElement;

  private chosenTrack!: HTMLElement;

  private chosenCar!: ICar;

  private controlPanel!: HTMLElement;

  private formCreateCar!: HTMLInputElement;

  private inputCreateCarName!: HTMLInputElement;

  private inputCreateCarColor!: HTMLInputElement;

  private inputCreateCarSubmit!: HTMLInputElement;

  constructor() {
    this.generateGarage();
    this.generateControlPanel();
    this.bindCallbacks();
    this.startEventListners();
  }

  private disableUpdateForm(isDisable = true): void {
    this.inputUpdateCarColor.value = '#ffe942';
    this.inputUpdateCarName.value = '';
    this.inputUpdateCarName.disabled = isDisable;
    this.inputUpdateCarColor.disabled = isDisable;
    this.inputUpdateCarSubmit.disabled = isDisable;
  }

  private bindCallbacks(): void {
    this.updateCarSubmitHandler = this.updateCarSubmitHandler.bind(this);
    this.createCarSubmitHandler = this.createCarSubmitHandler.bind(this);
    this.formCreateCarFocusHandler = this.formCreateCarFocusHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
  }

  private startEventListners(): void {
    document.addEventListener('click', this.documentClickHandler);
    this.formCreateCar.addEventListener('submit', this.createCarSubmitHandler);
    this.formCreateCar.addEventListener('focus', this.formCreateCarFocusHandler, true);
  }

  private documentClickHandler(event: Event): void {
    const targ = event.target as HTMLElement;
    if (targ.closest(`.${BTN_TRACK_SELECT_CAR_STYLE}`)) this.updateCarFormHandler(targ);
  }

  private updateCarFormHandler(target: HTMLElement): void {
    const chosenTrack = target.closest(TRACK_TAG) as HTMLElement;
    if (!chosenTrack) return;
    const chosenCar = this.cars
      .find((eachCar) => `${eachCar.id}` === chosenTrack.getAttribute(ATTR_CAR_ID));

    if (!chosenCar) return;
    this.disableUpdateForm(false);
    this.inputUpdateCarName.focus();
    this.inputUpdateCarName.value = chosenCar.name || '';
    this.inputUpdateCarColor.value = chosenCar.color || '#ffffff';
    this.chosenTrack = chosenTrack;
    this.chosenCar = chosenCar;
    this.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
  }

  private updateCarSubmitHandler(event: Event): void {
    event.preventDefault();
    if (!isFormValidate(this.inputUpdateCarName.value)) {
      this.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
      this.inputUpdateCarName.focus();
      return;
    }
    const { chosenCar } = this;
    chosenCar.name = this.inputUpdateCarName.value;
    chosenCar.color = this.inputUpdateCarColor.value;

    this.setTrackAttributes(this.chosenTrack, chosenCar.id, chosenCar.name, chosenCar.color);
    this.disableUpdateForm(true);
    console.log('cars', this.cars);
  }

  private formCreateCarFocusHandler(): void {
    this.disableUpdateForm();
  }

  private resetCreateForm(): void {
    this.inputCreateCarColor.value = '#06a6f6';
    this.inputCreateCarName.value = '';
  }

  private createCarSubmitHandler(event: Event): void {
    event.preventDefault();
    if (!isFormValidate(this.inputCreateCarName.value)) {
      this.inputCreateCarName.focus();
      return;
    }
    const car = new Car(
      freeIdSearche(this.cars),
      this.inputCreateCarColor.value,
      this.inputCreateCarName.value,
      getRandomIntBetween(),
    );
    const track: Track = generateDomElement(TRACK_TAG, null, this.garage);
    this.setTrackAttributes(track, car.id, car.name, car.color);
    track.generateCar(car);
    this.cars.push(car);
    this.resetCreateForm();
  }

  private setTrackAttributes(
    parent: HTMLElement,
    id: string | number,
    name: string,
    color: string,
  ): void {
    parent.setAttribute(ATTR_CAR_ID, `${id}`);
    parent.setAttribute(ATTR_CAR_NAME, `${name}`);
    parent.setAttribute(ATTR_CAR_COLOR, `${color}`);
  }

  private generateGarage(): void {
    this.garage = generateDomElement('div', '', null, GARAGE);
  }

  private generateControlPanel(): void {
    this.controlPanel = generateDomElement('div', null, this.garage, CONTROL_PANEL);
    this.generateFormCreateCar();
    this.generateFormUpdateCar();
  }

  private generateFormCreateCar(): void {
    this.formCreateCar = generateDomElement('form', '', this.controlPanel);
    this.inputCreateCarName = generateDomElement('input', '', this.formCreateCar, INP_CREATE_CAR_NAME);
    this.inputCreateCarName.type = 'text';
    this.inputCreateCarColor = generateDomElement('input', '', this.formCreateCar, INP_CREATE_CAR_COLOR);
    this.inputCreateCarColor.type = 'color';
    this.inputCreateCarSubmit = generateDomElement('button', CREATE_CAR_SUBMIT, this.formCreateCar);
    this.inputCreateCarSubmit.type = 'submit';
    this.resetCreateForm();
  }

  private generateFormUpdateCar(): void {
    this.formUpdateCar = generateDomElement('form', '', this.controlPanel);
    this.inputUpdateCarName = generateDomElement('input', '', this.formUpdateCar, INP_UPDATE_CAR_NAME);
    this.inputUpdateCarName.type = 'text';
    this.inputUpdateCarColor = generateDomElement('input', '', this.formUpdateCar, INP_UPDATE_CAR_COLOR);
    this.inputUpdateCarColor.type = 'color';
    this.inputUpdateCarSubmit = generateDomElement('button', UPDATE_CAR_SUBMIT, this.formUpdateCar);
    this.inputUpdateCarSubmit.type = 'submit';
    this.disableUpdateForm(true);
  }
}
