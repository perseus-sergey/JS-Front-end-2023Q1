import { ICar, ICarCreate } from '../common/types';
import {
  constantsClasses,
  constantsTexts,
  constantsTagName,
  constantsAttributes,
  constantsNumbers,
  apiGarage,
  apiWinner,
  constantsLinks,
} from '../common/constants';
import { Crud } from '../controller/Crud';
import {
  generateDomElement, getRandomName, isFormValidate, getRandomColor,
} from '../common/utilites';
import { Car } from './Car';
import { Track } from './Track';
import { Pagination } from '../controller/Pagination';

const {
  INSTALL_SERVER,
  GARAGE,
  TRACKS_TAG,
  CONTROL_PANEL,
  INP_CREATE_CAR_NAME,
  INP_CREATE_CAR_COLOR,
  INP_UPDATE_CAR_NAME,
  INP_UPDATE_CAR_COLOR,
  WRAP_RACE_BUTTONS,
  BTN_STOP_RACE,
  BTN_START_RACE,
  BTN_CREATE_CARS,
  CREATE_CAR_SUBMIT_CLASS,
  UPDATE_CAR_SUBMIT_CLASS,
  IS_RACING,
  PAGIN_WRAPPER,
} = constantsClasses;

const {
  ATTENTION_INSTALL_SERVER,
  GARAGE_TITLE,
  CREATE_CAR_SUBMIT,
  UPDATE_CAR_SUBMIT,
  DEFAULT_UPDATE_COLOR,
  DEFAULT_CREATE_COLOR,
  BTN_STOP_RACE_TEXT,
  BTN_START_RACE_TEXT,
  BTN_CREATE_CARS_TEXT,
} = constantsTexts;

const {
  ATTR_CAR_NAME,
  ATTR_CAR_ID,
  ATTR_CAR_COLOR,
  MOOVE,
  FINISHERS,
} = constantsAttributes;

const { TRACK_TAG, WIN_TAG } = constantsTagName;
const { API_LINK } = constantsLinks;
const {
  NUMBER_RANDOM_CREATED_CAR,
  NUMBER_TRACKS_PER_PAGE,
} = constantsNumbers;
const {
  getCars,
  createCar,
  deleteCar,
  updateCar,
} = apiGarage;

const {
  deleteWinner,
} = apiWinner;

export class Garage extends Pagination<Car> {
  protected rowsPerPage = NUMBER_TRACKS_PER_PAGE;

  private formUpdateCar!: HTMLInputElement;

  private inputUpdateCarName!: HTMLInputElement;

  private inputUpdateCarColor!: HTMLInputElement;

  private inputUpdateCarSubmit!: HTMLInputElement;

  public layout!: HTMLElement;

  public apiLink!: HTMLAnchorElement;

  public tracksElement!: HTMLElement;

  private garageTitle!: HTMLElement;

  private chosenTrack!: HTMLElement;

  private chosenCar!: Car;

  private controlPanel!: HTMLElement;

  private formCreateCar!: HTMLInputElement;

  private inputCreateCarName!: HTMLInputElement;

  private inputCreateCarColor!: HTMLInputElement;

  private inputCreateCarSubmit!: HTMLInputElement;

  private startRaceBtn!: HTMLButtonElement;

  private resetRaceBtn!: HTMLButtonElement;

  private createCarsBtn!: HTMLButtonElement;

  private isRace = false;

  constructor() {
    super();
    this.garageBuild();
  }

  private async garageBuild(): Promise<void> {
    this.generateGarage();
    this.generateControlPanel();
    this.generateGarageTitle();
    this.generateTracksTag();
    await this.getCars();
    // if (this.mainArray.length) this.fillPage();
    this.makePagination();
    this.bindCallbacks();
    this.startEventListners();
    this.updateGarageTitle();
  }

  private async getCars(): Promise<void> {
    const crud = new Crud<Car[]>(this.makeRequestUrlCarEdit());

    const data = await crud.responseJson;
    if (data) this.mainArray = data.map((car: Car) => new Car(car.id, car.color, car.name));
    if (!this.mainArray.length) this.checkEmptyGarage();
  }

  private checkEmptyGarage(): void {
    if (!this.mainArray.length) {
      if (this.apiLink) return;
      this.apiLink = generateDomElement('a', ATTENTION_INSTALL_SERVER, this.layout, INSTALL_SERVER);
      this.apiLink.href = API_LINK;
      this.apiLink.target = '_blank';
    } else
    if (this.apiLink) this.apiLink.remove();
  }

  private disableUpdateForm(isDisable = true): void {
    this.inputUpdateCarColor.value = DEFAULT_UPDATE_COLOR;
    this.inputUpdateCarName.value = '';
    this.inputUpdateCarName.disabled = isDisable;
    this.inputUpdateCarColor.disabled = isDisable;
    this.inputUpdateCarSubmit.disabled = isDisable;
  }

  private disableCreateForm(isDisable = true): void {
    this.inputCreateCarColor.value = DEFAULT_CREATE_COLOR;
    this.inputCreateCarName.value = '';
    this.inputCreateCarName.disabled = isDisable;
    this.inputCreateCarColor.disabled = isDisable;
    this.inputCreateCarSubmit.disabled = isDisable;
  }

  protected fillPage(pageNumber = 1): void {
    this.checkEmptyGarage();
    this.tracksElement.innerHTML = '';

    this.mainArray.slice(
      (pageNumber - 1) * NUMBER_TRACKS_PER_PAGE,
      pageNumber * NUMBER_TRACKS_PER_PAGE,
    ).forEach((car) => {
      const track: Track = generateDomElement(TRACK_TAG, null, this.tracksElement);
      this.setTrackAttributes(track, car.id, car.name, car.color);
      track.insertCar(car);
    });
  }

  private bindCallbacks(): void {
    this.updateCarSubmitHandler = this.updateCarSubmitHandler.bind(this);
    this.createCarFormSubmitHandler = this.createCarFormSubmitHandler.bind(this);
  }

  private startEventListners(): void {
    this.formCreateCar.addEventListener('submit', this.createCarFormSubmitHandler);
    this.formCreateCar.addEventListener('focus', this.disableUpdateForm.bind(this, true), true);
  }

  public updateCarForm(target: HTMLElement): void {
    const chosenTrack = target.closest(TRACK_TAG) as Track;
    if (!chosenTrack) return;
    const chosenCar = this.mainArray
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

  private updateCarSubmitHandler(event: Event): void {
    event.preventDefault();
    if (!isFormValidate(this.inputUpdateCarName.value)) {
      this.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
      this.inputUpdateCarName.focus();
      return;
    }
    this.updateCar();
    this.disableUpdateForm(true);
  }

  public stopRace(): void {
    this.isRace = false;
    const tracks = this.getTrackTags();
    if (tracks.length) tracks.forEach((track) => track.removeAttribute(MOOVE));
  }

  public startRace(): void {
    this.disableBtns();
    this.resetFinishersCounter();
    this.isRace = true;
    const tracks = this.getTrackTags();
    if (tracks.length) {
      tracks.forEach((track) => {
        track.setAttribute(MOOVE, '');
      });
    }
  }

  private disableBtns(): void {
    const allBtns = [...document.body.querySelectorAll(`button:not(.${PAGIN_WRAPPER} button)`)] as HTMLButtonElement[];
    if (allBtns.length) {
      allBtns.forEach(((btn) => {
        const button = btn;
        button.disabled = true;
      }));
    }
    this.paginWrapper.classList.add(IS_RACING);
    this.disableCreateForm();
    this.disableUpdateForm();
  }

  private resetFinishersCounter(): void {
    const winTag = document.body.querySelector(WIN_TAG);
    if (winTag) winTag.setAttribute(FINISHERS, `${0}`);
  }

  private createCarFormSubmitHandler(event: Event): void {
    event.preventDefault();
    if (!isFormValidate(this.inputCreateCarName.value)) {
      this.inputCreateCarName.focus();
      return;
    }
    this.createCar({
      name: this.inputCreateCarName.value,
      color: this.inputCreateCarColor.value,
    });
    this.resetCreateForm();
  }

  public async removeCarHandler(target: HTMLElement): Promise<void> {
    const chosenTrack = target.closest(TRACK_TAG) as Track;
    if (!chosenTrack) return;

    await this.removeCar(chosenTrack);
    this.disableUpdateForm();
    // this.fillPage();
    this.updateGarageTitle();
  }

  private resetCreateForm(): void {
    this.inputCreateCarColor.value = DEFAULT_CREATE_COLOR;
    this.inputCreateCarName.value = '';
  }

  // ============== CRUD CAR ======== start ==========

  public createCars(): void {
    for (let n = 0; n < NUMBER_RANDOM_CREATED_CAR; n += 1) {
      this.createCar({
        name: getRandomName(),
        color: getRandomColor(),
      });
    }
  }

  private async createCar(car: ICarCreate): Promise<void> {
    const crud = new Crud<ICar, ICarCreate>(this.makeRequestUrlCarEdit(), createCar.method, car);
    const createdCar = await crud.responseJson;
    if (!createdCar) return;
    this.mainArray.push(createdCar);
    // this.fillPage();
    this.updateGarageTitle();
  }

  private async updateCar(): Promise<void> {
    const { chosenCar } = this;
    const crud = new Crud<ICar, ICarCreate>(
      this.makeRequestUrlCarEdit(chosenCar.id),
      updateCar.method,
      {
        name: this.inputUpdateCarName.value,
        color: this.inputUpdateCarColor.value,
      },
    );
    const updatedCar = await crud.responseJson;
    if (!updatedCar) return;

    chosenCar.name = updatedCar.name;
    chosenCar.color = updatedCar.color;

    this.setTrackAttributes(this.chosenTrack, chosenCar.id, chosenCar.name, chosenCar.color);
  }

  private async removeCar(track: Track): Promise<void> {
    const { id } = track.car;
    const indxInThisCars = this.mainArray
      .findIndex((eachCar) => eachCar.id === id);
    if (indxInThisCars === undefined || indxInThisCars === -1) return;

    const delCar = new Crud<ICar, ICarCreate>(this.makeRequestUrlCarEdit(id), deleteCar.method);
    const delWin = new Crud<ICar, ICarCreate>(`${deleteWinner.deleteUrl + id}`, deleteWinner.method);
    if (delCar.responseJson && await delWin.responseJson) {
      this.mainArray.splice(indxInThisCars, 1);
    }
  }

  private makeRequestUrlCarEdit(carId?: number):string {
    const id = (carId !== undefined) ? `/${carId}` : '';
    return `${getCars.getCarsUrl + id}`;
  }
  // ============== CRUD CAR ======== end ==========

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
    this.layout = generateDomElement('div', '', null, GARAGE);
  }

  private generateControlPanel(): void {
    this.controlPanel = generateDomElement('div', null, this.layout, CONTROL_PANEL);
    this.generateFormCreateCar();
    this.generateFormUpdateCar();
    this.generateFormRace();
  }

  private generateTracksTag(): void {
    this.tracksElement = generateDomElement('div', '', this.layout, TRACKS_TAG);
  }

  private generateFormRace(): void {
    const raceBtnsWrapper = generateDomElement('div', null, this.controlPanel, WRAP_RACE_BUTTONS);
    this.resetRaceBtn = generateDomElement('button', BTN_STOP_RACE_TEXT, raceBtnsWrapper, BTN_STOP_RACE);
    this.startRaceBtn = generateDomElement('button', BTN_START_RACE_TEXT, raceBtnsWrapper, BTN_START_RACE);
    this.createCarsBtn = generateDomElement('button', BTN_CREATE_CARS_TEXT, raceBtnsWrapper, BTN_CREATE_CARS);
  }

  private generateFormCreateCar(): void {
    this.formCreateCar = generateDomElement('form', '', this.controlPanel);
    this.inputCreateCarName = generateDomElement('input', '', this.formCreateCar, INP_CREATE_CAR_NAME);
    this.inputCreateCarName.type = 'text';
    this.inputCreateCarColor = generateDomElement('input', '', this.formCreateCar, INP_CREATE_CAR_COLOR);
    this.inputCreateCarColor.type = 'color';
    this.inputCreateCarSubmit = generateDomElement('button', CREATE_CAR_SUBMIT, this.formCreateCar, CREATE_CAR_SUBMIT_CLASS);
    this.inputCreateCarSubmit.type = 'submit';
    this.resetCreateForm();
  }

  private generateFormUpdateCar(): void {
    this.formUpdateCar = generateDomElement('form', '', this.controlPanel);
    this.inputUpdateCarName = generateDomElement('input', '', this.formUpdateCar, INP_UPDATE_CAR_NAME);
    this.inputUpdateCarName.type = 'text';
    this.inputUpdateCarColor = generateDomElement('input', '', this.formUpdateCar, INP_UPDATE_CAR_COLOR);
    this.inputUpdateCarColor.type = 'color';
    this.inputUpdateCarSubmit = generateDomElement('button', UPDATE_CAR_SUBMIT, this.formUpdateCar, UPDATE_CAR_SUBMIT_CLASS);
    this.inputUpdateCarSubmit.type = 'submit';
    this.disableUpdateForm(true);
  }

  private generateGarageTitle(): void {
    this.garageTitle = generateDomElement('h2', null, this.layout);
  }

  private updateGarageTitle(): void {
    this.garageTitle.textContent = `${GARAGE_TITLE} (${this.mainArray.length})`;
    this.updatePagination();
  }

  private getTrackTags(): Track[] {
    return [...document.querySelectorAll(TRACK_TAG)] as Track[];
  }
}
