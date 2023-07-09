import { constantsAttributes, constantsClasses, constantsTexts } from '../constants';
import { generateDomElement } from '../utilites';
import { Garage } from './Garage';

const {
  TRACK,
  TRACK_BTNS_WRAPPER,
  TRACK_CAR_NAME,
  ENGINE_BTNS_WRAPPER,
  CAR,
  CAR_SVG_FILL_COLOR,
} = constantsClasses;

const {
  BTN_TRACK_SELECT_CAR, BTN_TRACK_REMOVE_CAR, BTN_TRACK_STOP_CAR, BTN_TRACK_START_CAR,
} = constantsTexts;

const { ATTR_CAR_NAME, ATTR_CAR_COLOR } = constantsAttributes;

export class Track extends HTMLElement {
  private car!: HTMLElement;

  private selectBtn!: HTMLButtonElement;

  private removeBtn!: HTMLButtonElement;

  private engineStopBtn!: HTMLButtonElement;

  private engineStartBtn!: HTMLButtonElement;

  private carNameTag!: HTMLElement;

  private carSvgFillLayer!: HTMLElement;

  private carName: string | null | undefined;

  private carColor: string | null | undefined;

  private start = 0;

  private stopId!: number;

  private progress!: number;

  private distance!: number;

  public static get observedAttributes(): string[] {
    return [ATTR_CAR_NAME, ATTR_CAR_COLOR];
  }

  private attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (name === ATTR_CAR_NAME) {
      this.carName = newValue;
      if (this.carNameTag) this.carNameTag.innerHTML = newValue;
    }
    if (name === ATTR_CAR_COLOR) {
      this.carColor = newValue;
      if (this.carSvgFillLayer) this.carSvgFillLayer.style.fill = newValue;
    }
  }

  private connectedCallback(): void {
    this.car = this.generateCar(this.generateTrack());
    this.distance = this.clientWidth - this.car.clientWidth;
    this.callbackBinding();
    this.setListners();
  }

  private generateTrack(): HTMLElement {
    console.log('car name', this.carNameTag);
    const track = generateDomElement('div', '', this, TRACK);
    const trackBtnsWrapper = generateDomElement('div', '', track, TRACK_BTNS_WRAPPER);
    this.selectBtn = generateDomElement('button', BTN_TRACK_SELECT_CAR, trackBtnsWrapper);
    this.removeBtn = generateDomElement('button', BTN_TRACK_REMOVE_CAR, trackBtnsWrapper);
    this.carNameTag = generateDomElement('span', this.carName || null, trackBtnsWrapper, TRACK_CAR_NAME);

    const engineBtnsWrapper = generateDomElement('div', '', track, ENGINE_BTNS_WRAPPER);
    this.engineStopBtn = generateDomElement('button', BTN_TRACK_STOP_CAR, engineBtnsWrapper);
    this.engineStartBtn = generateDomElement('button', BTN_TRACK_START_CAR, engineBtnsWrapper);
    return track;
  }

  private callbackBinding(): void {
    this.stopBtnHandler = this.stopBtnHandler.bind(this);
    this.startBtnHandler = this.startBtnHandler.bind(this);
    this.selectBtnkHandler = this.selectBtnkHandler.bind(this);
    this.updateCarSubmitHandler = this.updateCarSubmitHandler.bind(this);
    this.step = this.step.bind(this);
  }

  private setListners(): void {
    this.selectBtn.addEventListener('click', this.selectBtnkHandler);
    // this.removeBtn.addEventListener('click', this.clickHandler);
    this.engineStopBtn.addEventListener('click', this.stopBtnHandler);
    this.engineStartBtn.addEventListener('click', this.startBtnHandler);
  }

  private selectBtnkHandler(): void {
    Garage.isDisableUpdateForm(false);
    Garage.inputUpdateCarName.focus();
    Garage.inputUpdateCarName.value = this.carName || '';
    Garage.inputUpdateCarColor.value = this.carColor || '#ffffff';
    Garage.formUpdateCar.addEventListener('submit', this.updateCarSubmitHandler, { once: true });
  }

  private updateCarSubmitHandler(event: Event): void {
    const updatedName = Garage.inputUpdateCarName.value;
    const updatedColor = Garage.inputUpdateCarColor.value;
    this.carName = updatedName;
    this.carNameTag.innerHTML = updatedName;
    this.carColor = updatedColor;
    this.carSvgFillLayer.style.fill = updatedColor;
    Garage.isDisableUpdateForm(true);
    console.log(Garage.inputUpdateCarColor.value);
    event.preventDefault();
  }

  private startBtnHandler(): void {
    this.engineStartBtn.disabled = true;
    requestAnimationFrame(this.step);
  }

  private stopBtnHandler(): void {
    cancelAnimationFrame(this.stopId);
    this.start = 0;
    this.car.style.transform = 'translateX(0)';
    this.engineStartBtn.disabled = false;
  }

  private step(timestamp: number): void {
    if (!this.start || this.progress > this.distance) this.start = timestamp;
    this.progress = (timestamp - this.start) / 3 + 25;
    this.car.style.transform = `translateX(${Math.min(this.progress, this.distance)}px)`;
    if (this.progress < this.distance) {
      this.stopId = requestAnimationFrame(this.step);
    }
  }

  private generateCar(track: HTMLElement): HTMLElement {
    const carSvg = `
    <svg
        class="svg-car"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        version="1.1"
        viewBox="0 4200 8500 2600"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          class="${CAR_SVG_FILL_COLOR} fil0 str0"
          d="M6952 4281l1534 -75c26,91 15,189 -30,272 23,260 -93,513 -306,664 51,46 77,114 69,183l-34 302c0,60 -37,115 -94,137 -33,69 -28,151 16,214l-898 258 0 -3c-48,-139 -131,-264 -240,-363 -3,-1 -6,-1 -8,0 -3,2 -5,4 -5,7 56,287 -54,580 -285,760 -84,68 -184,114 -291,134 -225,37 -456,-16 -642,-149l-1315 62c-41,50 -103,79 -168,81 -65,1 -127,-26 -171,-74 -42,50 -103,79 -168,81 -65,1 -128,-26 -171,-74 -42,50 -103,79 -168,81 -65,1 -128,-26 -172,-74 -42,51 -105,80 -171,80 -66,1 -129,-28 -172,-78l-1381 58c-14,7 -30,7 -44,1 -14,-6 -25,-18 -30,-33l-48 -134c-2,-7 -7,-11 -13,-13 -6,-1 -13,1 -17,6 -104,158 -294,233 -479,191 -185,-42 -324,-195 -349,-383 -91,92 -110,233 -47,346l-624 -2c-7,-2 -13,-8 -16,-15 -2,-8 -1,-16 3,-22 45,-43 51,-112 16,-162l-33 -49c39,-79 88,-152 145,-219 90,-93 195,-170 311,-227 113,-53 231,-95 351,-126l1781 -434c47,-128 163,-217 299,-230l100 -10 -3 -41 -102 9 0 -331c27,-23 60,-38 96,-42 124,-9 247,32 341,113l157 122c105,8 207,47 291,112l39 -1c205,-132 425,-239 654,-321 365,-125 749,-178 1134,-159 140,3 280,20 418,50 222,53 429,159 601,309l339 -789z"
        />
        <path
          class="fil1 str1"
          d="M8370 4284c19,0 34,16 34,35 0,19 -15,35 -34,35 -19,0 -35,-16 -35,-35 0,-19 16,-35 35,-35zm-44 119c19,0 34,16 34,35 0,19 -15,34 -34,34 -19,0 -35,-15 -35,-34 0,-19 16,-35 35,-35zm-50 115c19,0 34,16 34,35 0,19 -15,34 -34,34 -19,0 -35,-15 -35,-34 0,-19 16,-35 35,-35zm-54 107c19,0 35,16 35,35 0,19 -16,34 -35,34 -19,0 -34,-15 -34,-34 0,-19 15,-35 34,-35zm-1484 629l1144 -104 2 30 -1143 104 -3 -30zm-918 -447c241,37 467,139 655,295 5,7 7,16 5,24 -3,8 -9,15 -17,17l-201 49c-52,19 -110,3 -146,-38l-308 -326c-3,-4 -3,-10 -1,-15 3,-4 8,-7 13,-6zm-180 131c62,90 82,203 54,308 -509,73 -1022,117 -1537,131 -4,0 -8,-3 -10,-7 -2,-3 -1,-8 2,-12l445 -380c96,-67 205,-113 321,-134 171,-37 346,-55 522,-51 27,0 55,4 82,11 11,4 22,12 28,23l93 111zm-446 474c186,28 377,20 560,-25 11,-2 20,5 24,15 3,10 -1,21 -10,27 -203,57 -413,81 -624,69 -74,-7 -149,-1 -221,17 -47,9 -84,47 -89,95 -6,47 21,93 65,111 80,15 162,13 242,-4 185,-36 366,-91 540,-163 206,-108 432,-174 664,-194 8,1 14,7 15,15 2,8 -3,16 -10,19 -201,32 -394,106 -564,218 -126,85 -266,147 -414,183 -218,69 -449,91 -676,63 -246,-48 -496,-78 -746,-89 -82,-5 -165,6 -243,33 -33,8 -58,36 -61,70 -3,33 16,65 47,78 51,4 103,1 153,-11l4 9c-147,87 -318,119 -487,93 -281,-60 -574,-38 -844,63 -241,94 -502,129 -760,101 -9,-1 -15,-8 -16,-17 -1,-9 5,-18 14,-20 243,-20 480,-86 699,-194 219,-108 461,-159 705,-151 271,-11 536,-84 773,-214 106,-69 236,-88 357,-52l-1 4c-32,-1 -64,4 -95,15 -24,7 -42,29 -43,54 0,25 16,48 40,55 46,6 92,-1 134,-20 96,-61 195,-114 299,-159 178,-82 374,-115 569,-94zm-3309 936l3656 -334c14,-1 27,9 30,23 2,14 -11,28 -25,32l-3656 334c-14,1 -26,-9 -27,-23 -2,-7 0,-15 4,-21 4,-6 11,-10 18,-11zm1871 -15c54,-13 111,8 143,54 14,20 12,47 -5,65 -9,6 -17,12 -24,19l-222 212c-8,9 -22,11 -32,4 -10,-7 -13,-21 -8,-32l179 -171c4,-4 6,-11 4,-17 -2,-6 -7,-11 -13,-11 -28,-12 -49,-34 -59,-62 -7,-24 5,-48 27,-57l10 -4zm-226 152l-221 212c-9,9 -22,11 -32,4 -10,-7 -13,-22 -8,-33l178 -170c5,-4 7,-11 5,-17 -2,-6 -7,-11 -13,-12 -28,-11 -49,-33 -60,-61 -6,-24 6,-48 28,-57l9 -4c55,-13 111,8 143,54 15,20 13,47 -5,64 -8,7 -16,13 -24,20zm904 -162c55,-13 111,9 143,54 15,20 13,47 -5,65 -8,6 -16,12 -24,19l-221 212c-9,9 -22,11 -32,4 -10,-7 -13,-21 -8,-32l178 -171c5,-4 7,-11 5,-17 -2,-6 -7,-10 -13,-11 -28,-12 -49,-34 -60,-62 -6,-23 6,-48 28,-57l9 -4zm-215 138l-222 212c-8,9 -22,11 -32,4 -10,-7 -13,-21 -8,-32l179 -171c4,-4 6,-11 4,-17 -1,-6 -6,-10 -13,-11 -27,-12 -49,-34 -59,-62 -7,-23 5,-48 28,-57l9 -4c54,-13 111,9 143,54 15,20 12,47 -5,65 -8,6 -17,12 -24,19zm229 -1523c4,-1 8,1 10,4 2,3 2,8 0,11l-488 369c-50,48 -117,74 -186,73 -30,-3 -58,-11 -84,-25 228,-178 480,-323 748,-432zm2553 466c252,36 508,-3 737,-112 12,-4 25,1 31,12 5,11 -2,26 -13,33 -183,117 -394,183 -611,191 -47,1 -93,-5 -139,-16 -194,-41 -395,-40 -588,5 -11,-1 -21,-8 -24,-19 -3,-11 1,-23 11,-29 188,-78 395,-100 596,-65zm-518 442c60,74 83,171 62,263 -1,5 -5,9 -9,11 -5,2 -10,3 -15,1l-126 -65c-12,-10 -19,-25 -19,-41 -5,-17 -9,-34 -15,-50 0,-9 2,-17 6,-25l69 -102c7,-6 16,-9 25,-7 10,2 18,7 22,15zm-110 283l119 33c7,5 13,13 14,22 2,10 -1,19 -8,26 -51,80 -135,132 -230,141 -5,0 -10,-2 -13,-5 -4,-4 -6,-9 -6,-14l23 -140c6,-15 18,-26 33,-31 14,-10 29,-20 43,-30 8,-3 16,-4 25,-2zm-389 41l137 -36c13,-5 27,-2 37,8 19,8 32,25 36,45l-7 140c-1,10 -9,17 -18,18 -83,-18 -154,-69 -197,-143 -4,-5 -5,-12 -3,-19 3,-6 8,-11 15,-13zm-158 -98c122,-275 403,-445 704,-425 6,4 9,11 8,18 -1,7 -6,13 -13,15 -86,-1 -173,14 -254,43 -3,1 -6,4 -6,7 0,3 2,6 5,7 43,5 85,19 123,41 4,3 7,8 7,13 1,5 0,10 -3,14l-101 99c-9,6 -19,8 -29,8 -16,-3 -33,-4 -50,-4 -15,3 -30,-2 -40,-13l-66 -85 -2 -2 -3 -1c-15,7 -29,16 -41,27 -3,2 -4,6 -2,9l60 104c3,10 3,20 1,30 -7,15 -13,31 -16,47 -1,15 -10,29 -23,36l-113 49c-14,2 -28,-6 -34,-19 -6,-37 -5,-75 3,-111 1,-3 0,-7 -3,-9 -2,-2 -5,-2 -8,-1 -29,36 -54,74 -74,115 -4,6 -12,8 -19,6 -8,-3 -12,-10 -11,-18zm-5493 179c295,-258 698,-357 1079,-265 210,46 425,60 638,42 10,1 17,8 18,17 1,10 -5,19 -14,22 -199,41 -404,42 -603,4 -379,-89 -777,-16 -1101,199 -6,3 -12,1 -16,-3 -3,-4 -4,-11 -1,-16zm1840 -520c152,-65 321,-81 483,-46 121,24 247,23 368,-1 10,-1 19,6 22,15 2,10 -3,20 -12,24 -149,47 -307,61 -462,41 -131,-21 -265,-2 -384,56 -129,61 -269,96 -412,103 -4,-2 -7,-5 -8,-10 -1,-5 1,-9 5,-12 140,-40 274,-97 400,-170zm-1104 526c-15,19 -24,42 -26,66 2,8 -3,17 -10,20l-146 51c-5,2 -10,2 -15,0 -5,-2 -9,-6 -11,-11 -9,-52 -4,-105 13,-154 4,-13 11,-25 22,-34 33,-18 69,-31 106,-38 10,-2 20,2 27,10l39 60c6,9 6,20 1,30zm404 126c-3,6 -11,9 -18,7l-134 -55c-7,-4 -12,-10 -15,-17 -2,-17 -8,-33 -16,-48 -4,-6 -3,-15 3,-20l37 -28c5,-3 12,-3 18,-1 45,29 84,67 116,110 10,10 14,24 11,38l-2 14zm-244 -179c-4,5 -10,7 -15,4 -18,-5 -37,-7 -56,-5 -8,3 -16,1 -22,-5l-17 -36c-1,-6 2,-11 7,-14 36,1 72,7 106,19 3,0 6,2 7,5 1,2 2,5 1,8l-11 24zm544 361l429 -14c10,-1 19,3 26,9 7,7 11,16 11,25l1 18c0,10 -3,19 -10,26 -6,7 -15,11 -25,11l-429 14c-22,1 -40,-16 -40,-38 -4,-12 -1,-25 6,-35 7,-9 19,-16 31,-16zm-345 -63c-51,79 -136,131 -230,141 -5,0 -10,-2 -13,-6 -4,-4 -6,-8 -6,-13l22 -140c6,-15 19,-26 33,-32 15,-9 29,-19 43,-29 8,-3 17,-4 25,-3l119 34c8,5 13,13 15,22 1,9 -2,19 -8,26zm-517 -42l137 -37c13,-4 28,-1 38,8 18,9 32,25 35,46l-6 140c-1,9 -9,17 -19,18 -82,-18 -154,-70 -196,-143 -4,-6 -5,-13 -3,-19 2,-7 8,-12 14,-13z"
        />
      </svg>
    `;
    const car = generateDomElement('div', carSvg, track, CAR);
    this.carSvgFillLayer = car.querySelector(`.${CAR_SVG_FILL_COLOR}`) as HTMLElement;
    if (this.carColor) this.carSvgFillLayer.style.fill = this.carColor;
    return car;
  }
}
