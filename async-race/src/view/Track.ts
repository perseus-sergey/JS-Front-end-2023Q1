import {
  constantsClasses, constantsTexts, constantsLinks, constantsSVGs,
} from '../constants';
import { generateDomElement } from '../utilites';
import { Garage } from './Garage';
// <div class="track">
//   <div class="top-btns-wrapper">
//     <div class="btn-select"></div>
//     <div class="btn-remove"></div>
//     <div class="car-name"></div>
//   </div>
//   <div class="engine-btn-wrapper">
//     <div class="engine-start"></div>
//     <div class="engine-stop"></div>
//   </div>
//   <car-tag></car-tag>
// </div>
export class Track {
  public selectBtn!: HTMLElement;

  public removeBtn!: HTMLElement;

  public carName!: HTMLElement;

  public generateTrack(): void {
    const trackWrapper = document.body.querySelector('.track-wrapper') as HTMLElement;
    if (!trackWrapper) return;

    const track = generateDomElement('div', '', trackWrapper, 'track');
    const trackBtnsWrapper = generateDomElement('div', '', track, 'track-btns-wrapper');
    this.selectBtn = generateDomElement('button', 'SELECT', trackBtnsWrapper);
    this.removeBtn = generateDomElement('button', 'SELECT', trackBtnsWrapper);
    this.carName = generateDomElement('span', '', trackBtnsWrapper, 'track__car-name');
  }
}
