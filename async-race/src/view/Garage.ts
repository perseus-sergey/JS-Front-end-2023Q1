import {
  constantsClasses, constantsTexts, constantsTagName, constantsAttributes,
} from '../constants';
import { generateDomElement } from '../utilites';

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

const {
  ATTR_CAR_NAME,
  ATTR_CAR_COLOR,
} = constantsAttributes;

const { TRACK_TAG } = constantsTagName;

export class Garage {
  public static formUpdateCar: HTMLInputElement;

  public static inputUpdateCarName: HTMLInputElement;

  public static inputUpdateCarColor: HTMLInputElement;

  public static inputUpdateCarSubmit: HTMLInputElement;

  public garage!: HTMLElement;

  public trackWrapper!: HTMLElement;

  public controlPanel!: HTMLElement;

  public inputCreateCarName!: HTMLInputElement;

  public inputCreateCarColor!: HTMLInputElement;

  public inputCreateCarSubmit!: HTMLInputElement;

  public inputUpdateCarColor!: HTMLInputElement;

  public inputUpdateCarSubmit!: HTMLInputElement;

  constructor() {
    this.generateGarage();
    this.generateControlPanel();
    this.generateTrack();
  }

  public static isDisableUpdateForm(isDisable = true): void {
    Garage.inputUpdateCarColor.value = '#ffe942';
    Garage.inputUpdateCarName.value = '';
    Garage.inputUpdateCarName.disabled = isDisable;
    Garage.inputUpdateCarColor.disabled = isDisable;
    Garage.inputUpdateCarSubmit.disabled = isDisable;
  }

  private generateGarage(): void {
    this.garage = generateDomElement('div', '', null, GARAGE);
  }

  private generateTrack(): void {
    const track = generateDomElement(TRACK_TAG, null, this.garage);
    track.setAttribute(ATTR_CAR_NAME, 'Toyota');
    track.setAttribute(ATTR_CAR_COLOR, '#dddddd');
  }

  private generateControlPanel(): void {
    this.controlPanel = generateDomElement('div', null, this.garage, CONTROL_PANEL);
    this.generateFormCreateCar();
    this.generateFormUpdateCar();
  }

  private generateFormCreateCar(): void {
    const formCreateCar = generateDomElement('form', '', this.controlPanel);
    this.inputCreateCarName = generateDomElement('input', '', formCreateCar, INP_CREATE_CAR_NAME);
    this.inputCreateCarName.type = 'text';
    this.inputCreateCarColor = generateDomElement('input', '', formCreateCar, INP_CREATE_CAR_COLOR);
    this.inputCreateCarColor.type = 'color';
    this.inputCreateCarColor.value = '#06a6f6';
    this.inputCreateCarSubmit = generateDomElement('button', CREATE_CAR_SUBMIT, formCreateCar);
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
