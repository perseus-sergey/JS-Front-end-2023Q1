import {
  IFinisher, IStartStopEngine,
} from '../app/tipes';
import { Car } from './Car';

import {
  API_BASE_URL,
  constantsAttributes,
  constantsClasses,
  constantsTexts,
  apiCarEngine,
  constantsNumbers,
  constantsTagName,
} from '../constants';
import { delay, generateDomElement } from '../utilites';

const {
  method,
  startStopUrl,
  required: {
    id,
    status: {
      statusUrl,
      params: {
        started,
        stopped,
        drive,
      },
    },
  },
  respContent: {
    velocity,
    distance,
    success, // true/false
  },
  stopCode,
} = apiCarEngine;

const {
  NUMBER_TRACKS_PER_PAGE,
} = constantsNumbers;

const {
  TRACK_CAR_WINNER_TAG,
  WIN_SHOW,
} = constantsClasses;

const {
  TRACK_CAR_WINNER_TITLE,
} = constantsTexts;

const { TRACK_TAG } = constantsTagName;

const {
  FINISHER,
} = constantsAttributes;

export class Winner extends HTMLElement {
  private winnersCounter = 1;

  private cars!: Car[];

  private finishers:IFinisher[] = [];

  public static get observedAttributes(): string[] {
    return [FINISHER];
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    console.log('win');
    if (name !== FINISHER) return;
    if (this.winnersCounter >= document.body.querySelectorAll(TRACK_TAG).length) {
    // if (this.winnersCounter >= NUMBER_TRACKS_PER_PAGE) {
      this.raceFinished();
      return;
    }
    this.addFinisher(newValue);
    // this.carTitle = newValue;
    // if (this.carTitleTag) this.carTitleTag.innerHTML = newValue;
  }

  private connectedCallback(): void {
    // this.generateWinnerTitleTag();
  }

  private raceFinished():void {
    this.showWinner();
    this.winnersCounter = 1;
    this.finishers = [];
  }

  private addFinisher(attr: string):void {
    this.winnersCounter += 1;

    // const attr = this.getAttribute(FINISHER);
    // if (!attr) return;
    const [carId, color, carName, time] = attr.split('|');
    // const oCar: Car = {
    //   id: +carId,
    // };
    const oFinisher: IFinisher = {
      id: +carId,
      name: carName,
      color,
      time: +time,
    };
    this.finishers.push(oFinisher);
  }

  private async showWinner(): Promise<void> {
    const carRaceTimes = this.finishers.map((finisher) => finisher.time);
    const minTime = Math.min(...carRaceTimes);
    const minTimeIndx = carRaceTimes.indexOf(minTime);
    const winCar = this.finishers[minTimeIndx];
    if (!winCar) return;
    await delay(minTime * 1000);
    this.textContent = `${TRACK_CAR_WINNER_TITLE} - ${winCar.name} - (${minTime}s)`;
    this.classList.add(WIN_SHOW);
  }

  private async getApiVelocity(carId: number):Promise<IStartStopEngine> {
    const url = `${API_BASE_URL + startStopUrl}?${id}${carId}&${statusUrl + started}`;
    try {
      const response = await fetch(url, { method });
      if (!response.ok) {
        console.error(`HTTP response: (${response.status}) - ${response.text}`);
        return { velocity: null, distance: null };
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return { velocity: null, distance: null };
    }
    // return toJson.map((car: Car) => new Car(car.id, car.color, car.name));
  }

  // private async isServerStartAllowed():Promise<boolean> {
  //   const url = 'http://127.0.0.1:3000/garage';
  //   const method = 'GET';
  //   const response = await fetch(url, { method });
  //   console.log('Starus ', response.status);
  //   const toJson = await response.json();
  //   console.log('response ', JSON.stringify(toJson));
  //   return false;

  //   // .then(this.errorHandler)
  //   // .then((res) => res.json())
  //   // .then((data) => callback(data))
  //   // .catch((err) => console.error(err));
  // }

  // private errorHandler(res: Response): Response {
  //   if (!res.ok) {
  //     if (res.status === 401 || res.status === 404) {
  //   console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
  // }
  //     const errorElement: HTMLElement = document.createElement('h2');
  //     errorElement.textContent = 'Sorry, content is not available at the moment!';
  //     document.querySelector('.main')?.prepend();

  //     throw Error(res.statusText);
  //   }

  //   return res;
  // }
}
