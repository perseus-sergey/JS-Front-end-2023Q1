import {
  IFinisher, IWinner, IWinnerApi, IWinnerCreate,
} from '../common/tipes';

import {
  constantsAttributes,
  constantsClasses,
  constantsTexts,
  apiWinner,
  constantsTagName,
} from '../common/constants';
import { Crud } from '../controller/Crud';

const {
  getWinner,
  createWinner,
  updateWinner,
} = apiWinner;

const {
  WIN_SHOW, BTN_START_RACE, BTN_CREATE_CARS,
} = constantsClasses;

const {
  TRACK_CAR_WINNER_TITLE,
} = constantsTexts;

const {
  FINISHER, FINISHERS,
} = constantsAttributes;

const { TRACK_TAG } = constantsTagName;

export class Winner extends HTMLElement {
  private oFinisher!: IFinisher;

  public static get observedAttributes(): string[] {
    return [FINISHER, FINISHERS];
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === FINISHERS) {
      if (+newValue >= document.body.querySelectorAll(TRACK_TAG).length) {
        this.raceFinished();
      }
      return;
    }
    if (name !== FINISHER || this.classList.contains(WIN_SHOW)) return;
    this.setWinner(newValue);
  }

  private raceFinished():void {
    const startRaceBtn = document.body.querySelector(`.${BTN_START_RACE}`) as HTMLButtonElement;
    const createCarsBtn = document.body.querySelector(`.${BTN_CREATE_CARS}`) as HTMLButtonElement;
    startRaceBtn.disabled = false;
    createCarsBtn.disabled = false;
  }

  private async setWinner(attr: string):Promise<void> {
    const [carId, color, name, time] = attr.split('|');
    this.oFinisher = {
      id: +carId,
      name,
      color,
      time: +time,
    };
    this.textContent = `${TRACK_CAR_WINNER_TITLE} - ${name} - (${time}s)`;
    this.classList.add(WIN_SHOW);
    await this.saveWinner();
  }

  private async saveWinner():Promise<void> {
    const { method } = getWinner;
    const url = `${getWinner.getUrl + this.oFinisher.id}`;
    const crud = new Crud<IWinner>(url, method);
    const oldWinner = await crud.responseJson;
    if (oldWinner && oldWinner.id !== undefined) this.updateWinner(oldWinner);
    else this.createWinner();
  }

  private async createWinner():Promise<void> {
    const { id, time } = this.oFinisher;
    const { method, createUrl } = createWinner;
    const crud = new Crud<IWinner, IWinnerCreate>(createUrl, method, { id, wins: 1, time });
    if (!crud.responseJson) console.log('!Can\'t create winner');
  }

  private async updateWinner(oldValue: IWinner | null):Promise<void> {
    if (!oldValue) return;
    const time = this.oFinisher.time < oldValue.time ? this.oFinisher.time : oldValue.time;
    const { id } = this.oFinisher;
    const {
      method, updateUrl,
    } = updateWinner;
    const url = `${updateUrl + id}`;
    const crud = new Crud<IWinner, IWinnerApi>(url, method, { wins: oldValue.wins + 1, time });
    if (!crud.responseJson) console.log('Wrong Update Winner');
  }
}
