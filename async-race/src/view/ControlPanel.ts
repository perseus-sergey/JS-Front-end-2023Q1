// import { constantsClasses, constantsTexts, constantsTagName } from '../constants';
// import { generateDomElement } from '../utilites';
// import { Car } from './Car';
// import { Garage } from './Garage';
// import { Track } from './Track';
// // import { Car } from './Car';
// // import { Track } from './Track';

// // TO_DO: createCarSubmitHandler clean inputs
// // TO_DO: createCarSubmitHandler resolve Dependency cycle

// const {
//   CONTROL_PANEL,
//   INP_CREATE_CAR_NAME,
//   INP_CREATE_CAR_COLOR,
//   INP_UPDATE_CAR_NAME,
//   INP_UPDATE_CAR_COLOR,
// } = constantsClasses;

// const { CREATE_CAR_SUBMIT, UPDATE_CAR_SUBMIT } = constantsTexts;

// const { TRACK_TAG } = constantsTagName;

// export class ControlPanel {
//   public static formUpdateCar: HTMLInputElement;

//   public static inputUpdateCarName: HTMLInputElement;

//   public static inputUpdateCarColor: HTMLInputElement;

//   public static inputUpdateCarSubmit: HTMLInputElement;

//   // public static cars: Car[] = [];

//   // private garage!: HTMLElement;

//   // private trackWrapper!: HTMLElement;

//   public controlPanel!: HTMLElement;

//   private formCreateCar!: HTMLInputElement;

//   private inputCreateCarName!: HTMLInputElement;

//   private inputCreateCarColor!: HTMLInputElement;

//   private inputCreateCarSubmit!: HTMLInputElement;

//   private inputUpdateCarColor!: HTMLInputElement;

//   private inputUpdateCarSubmit!: HTMLInputElement;

//   private track = new Track();

//   private car = new Car();

//   private garage = new Garage();

//   constructor() {
//     this.generateControlPanel();
//     this.startEventListners();
//   }

//   public static disableUpdatingForm(isDisable = true): void {
//     ControlPanel.inputUpdateCarColor.value = '#ffe942';
//     ControlPanel.inputUpdateCarName.value = '';
//     ControlPanel.inputUpdateCarName.disabled = isDisable;
//     ControlPanel.inputUpdateCarColor.disabled = isDisable;
//     ControlPanel.inputUpdateCarSubmit.disabled = isDisable;
//   }

//   private startEventListners(): void {
//     this.createCarSubmitHandler = this.createCarSubmitHandler.bind(this);
//     this.formUpdateCarOnBlurHandler = this.formUpdateCarOnBlurHandler.bind(this);
//     this.createCarSubmitHandler = this.createCarSubmitHandler.bind(this);
//     this.formCreateCar.addEventListener('submit', this.createCarSubmitHandler);
//     ControlPanel.formUpdateCar.addEventListener('blur', this.formUpdateCarOnBlurHandler);
//   }

//   private formUpdateCarOnBlurHandler(): void {
//     console.log('formUpdateCarOnBlurHandler');
//     ControlPanel.disableUpdatingForm();
//   }

//   private createCarSubmitHandler(event: Event): void {
//     console.log('createCarSubmitHandler');
//     const createdName = this.inputCreateCarName.value;
//     const createdColor = this.inputCreateCarColor.value;
//     Garage.createCarTrack(createdName, createdColor);
//     // track.setCar(car);
//     // Garage.cars.push(car);

//     event.preventDefault();
//   }

//   private updatingFormHandler(carName: string, carColor = '#ffffff'): void {
//     ControlPanel.disableUpdatingForm(false);
//     ControlPanel.inputUpdateCarName.focus();
//     ControlPanel.inputUpdateCarName.value = carName;
//     ControlPanel.inputUpdateCarColor.value = carColor;
//     ControlPanel.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
//   }

//   private updateCarSubmitHandler(event: Event): void {
//     const updatedName = ControlPanel.inputUpdateCarName.value;
//     const updatedColor = ControlPanel.inputUpdateCarColor.value;
//     this.carName = updatedName;
//     this.carNameTag.innerHTML = updatedName;
//     this.carColor = updatedColor;
//     this.carSvgFillLayer.style.fill = updatedColor;
//     ControlPanel.disableUpdatingForm(true);
//     console.log(ControlPanel.inputUpdateCarColor.value);
//     event.preventDefault();
//   }

//   private createCar(): void {}

//   private generateControlPanel(): void {
//     this.controlPanel = generateDomElement('div', null, null, CONTROL_PANEL);
//     this.generateFormCreateCar();
//     this.generateFormUpdateCar();
//   }

//   private generateFormCreateCar(): void {
//     this.formCreateCar = generateDomElement('form', '', this.controlPanel);
//     this.inputCreateCarName = generateDomElement('input', '', this.formCreateCar, INP_CREATE_CAR_NAME);
//     this.inputCreateCarName.type = 'text';
//     this.inputCreateCarColor = generateDomElement('input', '', this.formCreateCar, INP_CREATE_CAR_COLOR);
//     this.inputCreateCarColor.type = 'color';
//     this.inputCreateCarColor.value = '#06a6f6';
//     this.inputCreateCarSubmit = generateDomElement('button', CREATE_CAR_SUBMIT, this.formCreateCar);
//     this.inputCreateCarSubmit.type = 'submit';
//   }

//   private generateFormUpdateCar(): void {
//     ControlPanel.formUpdateCar = generateDomElement('form', '', this.controlPanel);
//     ControlPanel.inputUpdateCarName = generateDomElement('input', '', ControlPanel.formUpdateCar, INP_UPDATE_CAR_NAME);
//     ControlPanel.inputUpdateCarName.type = 'text';
//     ControlPanel.inputUpdateCarColor = generateDomElement('input', '', ControlPanel.formUpdateCar, INP_UPDATE_CAR_COLOR);
//     ControlPanel.inputUpdateCarColor.type = 'color';
//     ControlPanel.inputUpdateCarSubmit = generateDomElement('button', UPDATE_CAR_SUBMIT, ControlPanel.formUpdateCar);
//     ControlPanel.inputUpdateCarSubmit.type = 'submit';
//     ControlPanel.disableUpdatingForm(true);
//   }
// }
