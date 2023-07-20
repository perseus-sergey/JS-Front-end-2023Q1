import {
  constantsClasses, constantsTexts, constantsLinks, constantsSVGs, constantsTagName,
} from '../common/constants';
import { generateDomElement } from '../common/utilites';
import { Listners } from '../controller/Listrners';
import { Winner } from './Winner';

const { WIN_TAG } = constantsTagName;

const {
  HEADER,
  SWU_IMG,
  MAIN,
  FOOTER,
  RSS_LINK_CLASS,
  RSS_LINK_IMG,
  COPYRIGHT,
  WIN_SHOW,
  SWITCH_PAGE_BTN_WRAP,
  NEXT_PAGE_BTN,
  PREV_PAGE_BTN,
  GARAGE_HIDE,
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

export class Page extends Listners {
  private header!: HTMLElement;

  private btnNextPage!: HTMLElement;

  private btnPreviusPage!: HTMLElement;

  private main!: HTMLElement;

  private footer!: HTMLElement;

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
    this.main.append(this.garage.layout);
    this.main.append(this.winPage.layout);
  }

  private generateFooter(): void {
    this.footer = generateDomElement('footer', '', document.body, FOOTER);

    const gitLink: HTMLAnchorElement = generateDomElement('a', '', this.footer);
    gitLink.href = GIT_LINK;
    gitLink.target = '_blank';

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

  protected showNextPage():void {
    this.winTag.classList.add(GARAGE_HIDE);
    this.garage.layout.classList.add(GARAGE_HIDE);
    this.winPage.pageUpdate();
    this.winPage.layout.classList.add(WIN_SHOW);
  }

  protected showPreviusPage():void {
    this.garage.layout.classList.remove(GARAGE_HIDE);
    this.winPage.layout.classList.remove(WIN_SHOW);
    this.winTag.classList.remove(GARAGE_HIDE);
  }

  protected hideWinTag():void {
    this.winTag.innerHTML = '';
    this.winTag.classList.remove(WIN_SHOW);
  }
}
