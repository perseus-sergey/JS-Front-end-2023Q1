import { CarTag } from '../common/CarTag';
import {
  constantsClasses, constantsTexts, constantsLinks, constantsSVGs,
} from '../constants';
import { generateDomElement } from '../utilites';

const {
  HEADER,
  SWU_IMG,
  MAIN,
  FOOTER,
  RSS_LINK_CLASS,
  RSS_LINK_IMG,
  COPYRIGHT,
} = constantsClasses;

const {
  H1,
  SWU_IMG_ALT,
  RSS_IMG_ALT,
  COPYRIGHT_TEXT,
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

  private main!: HTMLElement;

  private footer!: HTMLElement;

  public generateMainPageElements(): void {
    this.generateHeader();
    this.generateMainTag();
    this.generateFooter();
  }

  private generateHeader(): void {
    this.header = generateDomElement('header', '', document.body, HEADER);

    generateDomElement('h1', H1, this.header);

    const swuImg = generateDomElement('img', '', this.header, SWU_IMG);
    swuImg.setAttribute('alt', SWU_IMG_ALT);
    swuImg.setAttribute('src', SWU_IMG_PATH);
  }

  private generateMainTag(): void {
    this.main = generateDomElement('main', '', document.body, MAIN);
    const carTag = new CarTag();
    this.main.append(carTag);
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
}
