import {
  constantsClasses, constantsTexts, constantsTagName,
} from '../constants';
import { generateDomElement } from '../utilites';
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
} = constantsClasses;

const {
  CREATE_CAR_SUBMIT,
  UPDATE_CAR_SUBMIT,
} = constantsTexts;

// const {
//   ATTR_CAR_NAME,
//   ATTR_CAR_COLOR,
// } = constantsAttributes;

const { TRACK_TAG } = constantsTagName;

export class Garage {
  public static formUpdateCar: HTMLInputElement;

  public static inputUpdateCarName: HTMLInputElement;

  public static inputUpdateCarColor: HTMLInputElement;

  public static inputUpdateCarSubmit: HTMLInputElement;

  public static cars: Car[] = [];

  private garage!: HTMLElement;

  private trackWrapper!: HTMLElement;

  private controlPanel!: HTMLElement;

  private formCreateCar!: HTMLInputElement;

  private inputCreateCarName!: HTMLInputElement;

  private inputCreateCarColor!: HTMLInputElement;

  private inputCreateCarSubmit!: HTMLInputElement;

  private inputUpdateCarColor!: HTMLInputElement;

  private inputUpdateCarSubmit!: HTMLInputElement;

  constructor() {
    this.generateGarage();
    this.generateControlPanel();
    this.startEventListners();
    this.generateTrack();
  }

  public static isDisableUpdateForm(isDisable = true): void {
    Garage.inputUpdateCarColor.value = '#ffe942';
    Garage.inputUpdateCarName.value = '';
    Garage.inputUpdateCarName.disabled = isDisable;
    Garage.inputUpdateCarColor.disabled = isDisable;
    Garage.inputUpdateCarSubmit.disabled = isDisable;
  }

  private startEventListners(): void {
    this.createCarSubmitHandler = this.createCarSubmitHandler.bind(this);
    this.formCreateCar.addEventListener('submit', this.createCarSubmitHandler);
  }

  private createCarSubmitHandler(event: Event): void {
    const createdName = this.inputCreateCarName.value;
    const createdColor = this.inputCreateCarColor.value;
    const car = new Car(createdColor, createdName, 5);
    const track: Track = generateDomElement(TRACK_TAG, null, this.garage);
    track.setCar(car);
    Garage.cars.push(car);
    event.preventDefault();
  }

  private generateGarage(): void {
    this.garage = generateDomElement('div', '', null, GARAGE);
  }

  private generateTrack(): void {
    // const track = generateDomElement(TRACK_TAG, null, this.garage);
    // track.setAttribute(ATTR_CAR_NAME, 'Toyota');
    // track.setAttribute(ATTR_CAR_COLOR, '#000000');
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
    this.inputCreateCarColor.value = '#06a6f6';
    this.inputCreateCarSubmit = generateDomElement('button', CREATE_CAR_SUBMIT, this.formCreateCar);
    this.inputCreateCarSubmit.type = 'submit';
  }

  private generateFormUpdateCar(): void {
    Garage.formUpdateCar = generateDomElement('form', '', this.controlPanel);
    Garage.inputUpdateCarName = generateDomElement('input', '', Garage.formUpdateCar, INP_UPDATE_CAR_NAME);
    Garage.inputUpdateCarName.type = 'text';
    Garage.inputUpdateCarColor = generateDomElement('input', '', Garage.formUpdateCar, INP_UPDATE_CAR_COLOR);
    Garage.inputUpdateCarColor.type = 'color';
    Garage.inputUpdateCarSubmit = generateDomElement('button', UPDATE_CAR_SUBMIT, Garage.formUpdateCar);
    Garage.inputUpdateCarSubmit.type = 'submit';
    Garage.isDisableUpdateForm(true);
  }
}
