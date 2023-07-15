// import { Car } from '../app/tipes';
import {
  constantsClasses,
  constantsTexts,
  constantsTagName,
  constantsAttributes,
  constantsNumbers,
  carNames,
  API_BASE_URL,
  apiGarage,
} from '../constants';
import {
  delay,
  freeIdSearche, generateDomElement, getRandomIntBetween, isFormValidate, randomColor,
} from '../utilites';
import { Car } from './Car';
import { Track } from './Track';

const {
  GARAGE,
  TRACKS_TAG,
  CONTROL_PANEL,
  INP_CREATE_CAR_NAME,
  INP_CREATE_CAR_COLOR,
  INP_UPDATE_CAR_NAME,
  INP_UPDATE_CAR_COLOR,
  BTN_TRACK_SELECT_CAR_STYLE,
  BTN_TRACK_REMOVE_CAR_STYLE,
  WRAP_RACE_BUTTONS,
  BTN_STOP_RACE,
  BTN_START_RACE,
  BTN_CREATE_CARS,
  PAGIN_WRAPPER,
  BTN_PAGIN_LEFT,
  BTN_PAGIN_RIGHT,
  BTN_PAGIN_LAST,
  BTN_PAGIN_FIRST,
  PAGIN_CURRENT,
  HIDE_PAGINATION,
  WIN_SHOW,
} = constantsClasses;

const {
  GARAGE_TITLE,
  CREATE_CAR_SUBMIT,
  UPDATE_CAR_SUBMIT,
  DEFAULT_UPDATE_COLOR,
  DEFAULT_CREATE_COLOR,
  BTN_STOP_RACE_TEXT,
  BTN_START_RACE_TEXT,
  BTN_CREATE_CARS_TEXT,
  BTN_PAGIN_TEXT_LEFT,
  BTN_PAGIN_TEXT_RIGHT,
  BTN_PAGIN_TEXT_LAST,
  BTN_PAGIN_TEXT_FIRST,
} = constantsTexts;

const {
  ATTR_CAR_NAME,
  ATTR_CAR_ID,
  ATTR_CAR_COLOR,
  MOOVE,
  WINNER,
} = constantsAttributes;

const { TRACK_TAG, WIN_TAG } = constantsTagName;
const {
  NUMBER_RANDOM_CREATED_CAR,
  NUMBER_TRACKS_PER_PAGE,
  MAX_SPEED,
  MIN_SPEED,
} = constantsNumbers;
const {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
} = apiGarage;

export class Garage {
  private formUpdateCar!: HTMLInputElement;

  private inputUpdateCarName!: HTMLInputElement;

  private inputUpdateCarColor!: HTMLInputElement;

  private inputUpdateCarSubmit!: HTMLInputElement;

  private cars: Car[] = [];

  public garage!: HTMLElement;

  public tracksElement!: HTMLElement;

  private garageTitle!: HTMLElement;

  private chosenTrack!: HTMLElement;

  private chosenCar!: Car;

  private controlPanel!: HTMLElement;

  private formCreateCar!: HTMLInputElement;

  private inputCreateCarName!: HTMLInputElement;

  private inputCreateCarColor!: HTMLInputElement;

  private inputCreateCarSubmit!: HTMLInputElement;

  private btnPaginPrevius!: HTMLButtonElement;

  private btnPaginNext!: HTMLButtonElement;

  private btnPaginLast!: HTMLButtonElement;

  private btnPaginFirst!: HTMLButtonElement;

  private paginCurrPage!: HTMLElement;

  private paginWrapper!: HTMLElement;

  private isRace = false;

  private currPageNum = 1;

  private maxPage = 1;

  constructor() {
    this.garageBuild();
  }

  private async garageBuild(): Promise<void> {
    this.generateGarage();
    this.generateControlPanel();
    this.generateGarageTitle();
    this.generateTracksTag();
    this.cars = await this.getCarsFromServer();
    if (this.cars.length) this.fillTracksHtml();
    this.makePagination();
    this.bindCallbacks();
    this.startEventListners();
    this.updateGarageTitle();
  }

  private disableUpdateForm(isDisable = true): void {
    this.inputUpdateCarColor.value = DEFAULT_UPDATE_COLOR;
    this.inputUpdateCarName.value = '';
    this.inputUpdateCarName.disabled = isDisable;
    this.inputUpdateCarColor.disabled = isDisable;
    this.inputUpdateCarSubmit.disabled = isDisable;
  }

  private bindCallbacks(): void {
    this.updateCarSubmitHandler = this.updateCarSubmitHandler.bind(this);
    this.createCarSubmitHandler = this.createCarSubmitHandler.bind(this);
    this.formCreateCarFocusHandler = this.formCreateCarFocusHandler.bind(this);
  }

  private startEventListners(): void {
    this.formCreateCar.addEventListener('submit', this.createCarSubmitHandler);
    this.formCreateCar.addEventListener('focus', this.formCreateCarFocusHandler, true);
  }

  public removeCar(target: HTMLElement): void {
    const chosenTrack = target.closest(TRACK_TAG) as Track;
    if (!chosenTrack) return;
    const chosenCarID = this.cars
      .findIndex((eachCar) => eachCar.id === chosenTrack.car.id);

    if (chosenCarID === undefined || chosenCarID === -1) return;
    this.cars.splice(chosenCarID, 1);
    this.fillTracksHtml();
    this.updateGarageTitle();
    // console.log('cars remove', this.cars);
  }

  public updateCarForm(target: HTMLElement): void {
    const chosenTrack = target.closest(TRACK_TAG) as Track;
    if (!chosenTrack) return;
    const chosenCar = this.cars
      .find((eachCar) => eachCar.id === chosenTrack.car.id);

    if (!chosenCar) return;
    this.disableUpdateForm(false);
    this.inputUpdateCarName.focus();
    this.inputUpdateCarName.value = chosenCar.name || '';
    this.inputUpdateCarColor.value = chosenCar.color || DEFAULT_CREATE_COLOR;
    this.chosenTrack = chosenTrack;
    this.chosenCar = chosenCar;
    this.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
  }

  public updateCarSubmitHandler(event: Event): void {
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
    this.updateGarageTitle();
    // console.log('cars add', this.cars);
  }

  public formCreateCarFocusHandler(): void {
    this.disableUpdateForm();
  }

  public stopRace(): void {
    this.isRace = false;
    const tracks = this.getTrackTags();
    if (tracks.length) tracks.forEach((track) => track.removeAttribute(MOOVE));
  }

  public startRace(): void {
    this.isRace = true;
    const tracks = this.getTrackTags();
    if (tracks.length) {
      tracks.forEach((track) => {
        console.log('moove');
        track.setAttribute(MOOVE, '');
      });
    }
  }

  public createCars(): void {
    const startID = freeIdSearche(this.cars);
    const randomCars = new Array(NUMBER_RANDOM_CREATED_CAR)
      .fill(null).map((car, index) => new Car(
        startID + index,
        randomColor(),
        carNames[getRandomIntBetween(0, carNames.length - 1)],
      ));
    this.cars = [...this.cars, ...randomCars];
    this.fillTracksHtml();
    this.updateGarageTitle();
  }

  private resetCreateForm(): void {
    this.inputCreateCarColor.value = DEFAULT_CREATE_COLOR;
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
    );
    const track: Track = generateDomElement(TRACK_TAG, null, this.tracksElement);
    this.setTrackAttributes(track, car.id, car.name, car.color);

    // REFACTOR
    track.insertCar(car);
    this.cars.push(car);
    this.resetCreateForm();
    this.updateGarageTitle();
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
    this.generateFormRace();
  }

  private generateTracksTag(): void {
    this.tracksElement = generateDomElement('div', '', this.garage, TRACKS_TAG);
  }

  private generateFormRace(): void {
    const raceBtnsWrapper = generateDomElement('div', null, this.controlPanel, WRAP_RACE_BUTTONS);
    generateDomElement('button', BTN_STOP_RACE_TEXT, raceBtnsWrapper, BTN_STOP_RACE);
    generateDomElement('button', BTN_START_RACE_TEXT, raceBtnsWrapper, BTN_START_RACE);
    generateDomElement('button', BTN_CREATE_CARS_TEXT, raceBtnsWrapper, BTN_CREATE_CARS);
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

  private generateGarageTitle(): void {
    this.garageTitle = generateDomElement('h2', null, this.garage);
  }

  private updateGarageTitle(): void {
    this.garageTitle.textContent = `${GARAGE_TITLE} (${this.cars.length})`;
    this.updatePagination();
  }

  private getTrackTags(): Track[] {
    return [...document.querySelectorAll(TRACK_TAG)] as Track[];
  }

  // ============== PAGINATION ======== start ====

  private makePagination(): void {
    this.paginWrapper = generateDomElement('div', null, this.garage, PAGIN_WRAPPER, HIDE_PAGINATION);
    this.btnPaginFirst = generateDomElement('button', BTN_PAGIN_TEXT_FIRST, this.paginWrapper, BTN_PAGIN_FIRST);
    this.btnPaginPrevius = generateDomElement('button', BTN_PAGIN_TEXT_LEFT, this.paginWrapper, BTN_PAGIN_LEFT);
    this.paginCurrPage = generateDomElement('div', `${this.currPageNum}`, this.paginWrapper, PAGIN_CURRENT);
    this.btnPaginNext = generateDomElement('button', BTN_PAGIN_TEXT_RIGHT, this.paginWrapper, BTN_PAGIN_RIGHT);
    this.btnPaginLast = generateDomElement('button', BTN_PAGIN_TEXT_LAST, this.paginWrapper, BTN_PAGIN_LAST);
  }

  private updatePagination(): void {
    if (!this.isPaginationVisible()) return;

    this.maxPage = Math.ceil(this.cars.length / NUMBER_TRACKS_PER_PAGE);
    this.currPageNum = Math.min(this.currPageNum, this.maxPage);
    this.paginCurrPage.innerHTML = `${this.currPageNum}`;

    this.setDisablingPaginBtns();

    this.fillTracksHtml(this.currPageNum);
  }

  private fillTracksHtml(pageNumber = 1): void {
    this.tracksElement.innerHTML = '';

    this.cars.slice(
      (pageNumber - 1) * NUMBER_TRACKS_PER_PAGE,
      pageNumber * NUMBER_TRACKS_PER_PAGE,
    ).forEach((car) => {
      const track: Track = generateDomElement(TRACK_TAG, null, this.tracksElement);
      this.setTrackAttributes(track, car.id, car.name, car.color);
      track.insertCar(car);
    });
  }

  public paginClickHandler(btnName: 'first' | 'previus' | 'next' | 'last'): void {
    if (btnName === 'first') this.currPageNum = 1;
    else if (btnName === 'previus') this.currPageNum -= 1;
    else if (btnName === 'next') this.currPageNum += 1;
    else if (btnName === 'last') this.currPageNum = this.maxPage;
    this.updatePagination();
  }

  private isPaginationVisible(): boolean {
    if (this.cars.length <= NUMBER_TRACKS_PER_PAGE) {
      this.paginWrapper.classList.add(HIDE_PAGINATION);
      return false;
    }
    this.paginWrapper.classList.remove(HIDE_PAGINATION);
    return true;
  }

  private setDisablingPaginBtns(): void {
    this.btnPaginNext.disabled = false;
    this.btnPaginLast.disabled = false;
    this.btnPaginPrevius.disabled = false;
    this.btnPaginFirst.disabled = false;

    if (this.currPageNum >= this.maxPage) {
      this.btnPaginNext.disabled = true;
      this.btnPaginLast.disabled = true;
    } else if (this.currPageNum <= 1) {
      this.btnPaginPrevius.disabled = true;
      this.btnPaginFirst.disabled = true;
    }
  }

  // ______________ PAGINATION ______ end _______

  // ______________ FETCH ______ start _______

  private async getCarsFromServer():Promise<Car[]> {
    const url = API_BASE_URL + getCars.getCarsUrl;
    const response = await fetch(url);
    await this.errorHandler(response);
    const toJson = await response.json();
    return toJson.map((car: Car) => new Car(car.id, car.color, car.name));
  }

  private async errorHandler(res: Response): Promise<void> {
    if (!res.ok) {
      this.errorServerMessage(res);
    }
  }

  private errorServerMessage(res: Response): void {
    console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
  }

  // ______________ FETCH ______ end _______
}
