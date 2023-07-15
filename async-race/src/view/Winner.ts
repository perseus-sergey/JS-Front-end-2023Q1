import {
  IFinisher, IWinner,
} from '../app/tipes';
import { Car } from './Car';

import {
  API_BASE_URL,
  constantsAttributes,
  constantsClasses,
  constantsTexts,
  apiWinner,
} from '../constants';

const {
  getWinner,
  createWinner,
  deleteWinner,
  updateWinner,
} = apiWinner;

const {
  WIN_SHOW,
} = constantsClasses;

const {
  TRACK_CAR_WINNER_TITLE,
} = constantsTexts;

const {
  FINISHER,
} = constantsAttributes;

export class Winner extends HTMLElement {
  private oFinisher!: IFinisher;

  public static get observedAttributes(): string[] {
    return [FINISHER];
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    console.log('win');
    if (name !== FINISHER || this.classList.contains(WIN_SHOW)) return;
    this.raceFinished(newValue);
  }

  private async raceFinished(attr: string):Promise<void> {
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
    await this.getWinners();
  }

  private async saveWinner():Promise<void> {
    const { method } = getWinner;
    const url = `${API_BASE_URL + getWinner.getUrl + this.oFinisher.id}`;
    try {
      this.getWinnerHendler(await fetch(url, { method }));
    } catch (error) {
      console.error(error);
    }
  }

  private async getWinnerHendler(res: Response): Promise<void> {
    console.log('getWinnerHendler response', res);
    if (!res.ok) {
      if (res.status === 404) this.createWinner();
      else this.errorServerMessage(res);
      return;
    }
    this.updateWinner(await res.json());
  }

  private async createWinner():Promise<void> {
    const { id, time } = this.oFinisher;
    const { method, createUrl, headers } = createWinner;
    const url = `${API_BASE_URL + createUrl}`;
    try {
      this.createWinnerHendler(
        await fetch(url, {
          method,
          headers,
          body: JSON.stringify({ id, wins: 1, time }),
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  private async createWinnerHendler(res: Response): Promise<void> {
    console.log('createWinnerHendler response', res);

    if (!res.ok) {
      this.errorServerMessage(res);
      return;
    }
    console.log('Added new winner:', await res.json());
  }

  private async updateWinner(oldValue: IWinner):Promise<void> {
    const time = this.oFinisher.time < oldValue.time ? this.oFinisher.time : oldValue.time;
    const { id } = this.oFinisher;
    const {
      method, updateUrl, headers,
    } = updateWinner;
    const url = `${API_BASE_URL + updateUrl + id}`;
    try {
      this.updateWinnerHendler(
        await fetch(url, {
          method,
          headers,
          body: JSON.stringify({ wins: oldValue.wins + 1, time }),
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  private async updateWinnerHendler(res: Response): Promise<void> {
    console.log('updateWinnerHendler response', res);

    if (!res.ok) {
      this.errorServerMessage(res);
      return;
    }
    console.log('Winner Updated:', await res.json());
  }

  private async getWinners():Promise<void> {
    const { method } = getWinner;
    const url = `${API_BASE_URL + getWinner.getUrl}`;
    try {
      this.getWinnersHendler(await fetch(url, { method }));
    } catch (error) {
      console.error(error);
    }
  }

  private async getWinnersHendler(res: Response): Promise<void> {
    console.log('getWinners response', await res.json());
    if (!res.ok) this.errorServerMessage(res);
  }

  private errorServerMessage(res: Response): void {
    console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
  }
}
