import {
  constantsClasses, constantsTexts, constantsLinks, constantsSVGs, constantsTagName,
} from '../constants';
import { generateDomElement } from '../utilites';
import { Garage } from './Garage';
import { Winner } from './Winner';
import { Winners } from './Winners';

const { WIN_TAG } = constantsTagName;

const {
  HEADER,
  SWU_IMG,
  MAIN,
  FOOTER,
  GARAGE,
  WIN_PAGE,
  RSS_LINK_CLASS,
  RSS_LINK_IMG,
  COPYRIGHT,
  BTN_TRACK_SELECT_CAR_STYLE,
  BTN_TRACK_REMOVE_CAR_STYLE,
  BTN_STOP_RACE,
  BTN_START_RACE,
  BTN_CREATE_CARS,
  BTN_PAGIN_FIRST,
  BTN_PAGIN_LAST,
  BTN_PAGIN_LEFT,
  BTN_PAGIN_RIGHT,
  WIN_SHOW,
  SWITCH_PAGE_BTN_WRAP,
  NEXT_PAGE_BTN,
  PREV_PAGE_BTN,
  GARAGE_HIDE,
  WIN_TBL_WINS_SORT,
  WIN_TBL_TIME_SORT,
} = constantsClasses;

const {
  H1,
  SWU_IMG_ALT,
  RSS_IMG_ALT,
  COPYRIGHT_TEXT,
  NEXT_PAGE,
  PREV_PAGE,
} = constantsTexts;

const {
  SWU_IMG_PATH,
  GIT_LINK,
  RSS_LINK,
  RSS_IMG_PATH,
} = constantsLinks;

const {
  GIT_SVG,
} = constantsSVGs;

export class Page {
  private header!: HTMLElement;

  private btnNextPage!: HTMLElement;

  private btnPreviusPage!: HTMLElement;

  private main!: HTMLElement;

  private footer!: HTMLElement;

  private garage!: Garage;

  private winPage!: Winners;

  private winTag!: Winner;

  public generateMainPageElements(): void {
    this.generateHeader();
    this.generateMainTag();
    this.generateFooter();
    this.startEventListners();
  }

  private generateHeader(): void {
    this.header = generateDomElement('header', '', document.body, HEADER);

    generateDomElement('h1', H1, this.header);

    const swuImg = generateDomElement('img', '', this.header, SWU_IMG);
    swuImg.setAttribute('alt', SWU_IMG_ALT);
    swuImg.setAttribute('src', SWU_IMG_PATH);

    const swithPageBtnsWrapper = generateDomElement('div', null, this.header, SWITCH_PAGE_BTN_WRAP);
    this.btnPreviusPage = generateDomElement('button', PREV_PAGE, swithPageBtnsWrapper, PREV_PAGE_BTN);
    this.btnNextPage = generateDomElement('button', NEXT_PAGE, swithPageBtnsWrapper, NEXT_PAGE_BTN);
  }

  private generateMainTag(): void {
    this.main = generateDomElement('main', '', document.body, MAIN);
    this.winTag = generateDomElement(WIN_TAG, null, this.main);
    this.garage = new Garage();
    this.main.append(this.garage.garage);
    this.winPage = new Winners();
    this.main.append(this.winPage.winPage);
  }

  private generateFooter(): void {
    this.footer = generateDomElement('footer', '', document.body, FOOTER);

    const gitLink = generateDomElement('a', '', this.footer);
    gitLink.setAttribute('target', '_blank');
    gitLink.setAttribute('href', GIT_LINK);
    gitLink.innerHTML = GIT_SVG;
    const rssLink = generateDomElement('a', '', this.footer, RSS_LINK_CLASS);
    rssLink.setAttribute('target', '_blank');
    rssLink.setAttribute('href', RSS_LINK);

    const rssImg = generateDomElement('img', '', rssLink, RSS_LINK_IMG);
    rssImg.setAttribute('alt', RSS_IMG_ALT);
    rssImg.setAttribute('src', RSS_IMG_PATH);

    const copyright = generateDomElement('p', '', this.footer, COPYRIGHT);
    generateDomElement('span', COPYRIGHT_TEXT, copyright);
  }

  private startEventListners(): void {
    document.addEventListener('click', this.documentClickHandler.bind(this));
  }

  private documentClickHandler(event: Event): void {
    this.hideWinTag();
    const targ = event.target as HTMLElement;
    if (targ.closest(`.${BTN_TRACK_SELECT_CAR_STYLE}`)) this.garage.updateCarForm(targ);
    else if (targ.closest(`.${BTN_TRACK_REMOVE_CAR_STYLE}`)) this.garage.removeCarHandler(targ);

    else if (targ.closest(`.${BTN_STOP_RACE}`)) this.garage.stopRace();
    else if (targ.closest(`.${BTN_START_RACE}`)) this.garage.startRace();
    else if (targ.closest(`.${BTN_CREATE_CARS}`)) this.garage.createCars();

    else if (targ.closest(`.${GARAGE} .${BTN_PAGIN_FIRST}`)) this.garage.paginClickHandler('first');
    else if (targ.closest(`.${GARAGE} .${BTN_PAGIN_LAST}`)) this.garage.paginClickHandler('last');
    else if (targ.closest(`.${GARAGE} .${BTN_PAGIN_LEFT}`)) this.garage.paginClickHandler('previus');
    else if (targ.closest(`.${GARAGE} .${BTN_PAGIN_RIGHT}`)) this.garage.paginClickHandler('next');
    else if (targ.closest(`.${WIN_PAGE} .${BTN_PAGIN_FIRST}`)) this.winPage.paginClickHandler('first');
    else if (targ.closest(`.${WIN_PAGE} .${BTN_PAGIN_LAST}`)) this.winPage.paginClickHandler('last');
    else if (targ.closest(`.${WIN_PAGE} .${BTN_PAGIN_LEFT}`)) this.winPage.paginClickHandler('previus');
    else if (targ.closest(`.${WIN_PAGE} .${BTN_PAGIN_RIGHT}`)) this.winPage.paginClickHandler('next');
    else if (targ.closest(`.${WIN_TBL_WINS_SORT}`)) this.winPage.tblSortWinsHandler();
    else if (targ.closest(`.${WIN_TBL_TIME_SORT}`)) this.winPage.tblSortTimeHandler();
    else if (targ.closest(`.${NEXT_PAGE_BTN}`)) this.showNextPage();
    else if (targ.closest(`.${PREV_PAGE_BTN}`)) this.showPreviusPage();
  }

  private showNextPage():void {
    this.winTag.classList.add(GARAGE_HIDE);
    this.garage.garage.classList.add(GARAGE_HIDE);
    this.winPage.pageUpdate();
    this.winPage.winPage.classList.add(WIN_SHOW);
  }

  private showPreviusPage():void {
    this.garage.garage.classList.remove(GARAGE_HIDE);
    this.winPage.winPage.classList.remove(WIN_SHOW);
    this.winTag.classList.remove(GARAGE_HIDE);
  }

  private hideWinTag():void {
    this.winTag.innerHTML = '';
    this.winTag.classList.remove(WIN_SHOW);
  }
}
