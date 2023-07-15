// import { Car } from '../app/tipes';
import { ICar, IWinner } from '../app/tipes';
import {
  constantsClasses,
  constantsTexts,
  constantsNumbers,
  API_BASE_URL,
  apiGarage,
  apiWinner,
} from '../constants';
import {
  generateDomElement, getImage,
} from '../utilites';

const {
  getWinner,
} = apiWinner;

const {
  PAGIN_WRAPPER,
  BTN_PAGIN_LEFT,
  BTN_PAGIN_RIGHT,
  BTN_PAGIN_LAST,
  BTN_PAGIN_FIRST,
  PAGIN_CURRENT,
  HIDE_PAGINATION,
  WIN_PAGE,
  WIN_TABLE,
  WIN_TBL_BODY,
  WIN_TBL_TITLE_ROW,
  WIN_TBL_ROW,
} = constantsClasses;

const {
  WIN_PAGE_TITLE,
  BTN_PAGIN_TEXT_LEFT,
  BTN_PAGIN_TEXT_RIGHT,
  BTN_PAGIN_TEXT_LAST,
  BTN_PAGIN_TEXT_FIRST,
  WIN_TBL_TITLE_ROW_1,
  WIN_TBL_TITLE_ROW_2,
  WIN_TBL_TITLE_ROW_3,
  WIN_TBL_TITLE_ROW_4,
  WIN_TBL_TITLE_ROW_5,
} = constantsTexts;

const {
  NUMBER_ROWS_WIN_TABLE,
} = constantsNumbers;
const {
  getCars,
} = apiGarage;

export class Winners {
  public winPage!: HTMLElement;

  public winTblBody!: HTMLElement;

  public tracksElement!: HTMLElement;

  private winners: IWinner[] = [];

  private winPageTitle!: HTMLElement;

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
    this.pageBuild();
  }

  private async pageBuild(): Promise<void> {
    this.generatePage();
    // this.generateControlPanel();
    this.generatePageTitle();
    this.generateWinTable();
    // this.generateTracksTag();
    await this.createWinnersArray();
    // this.cars = await this.getCars();
    this.fillWinTable();
    this.makePagination();
    // this.startEventListners();
    this.updatePageTitle();
  }

  private generatePage(): void {
    this.winPage = generateDomElement('div', '', null, WIN_PAGE);
  }

  private generateWinTable(): void {
    const winTable = generateDomElement('div', '', this.winPage, WIN_TABLE);
    const titleRow = generateDomElement('div', '', winTable, WIN_TBL_TITLE_ROW);
    [
      WIN_TBL_TITLE_ROW_1,
      WIN_TBL_TITLE_ROW_2,
      WIN_TBL_TITLE_ROW_3,
      WIN_TBL_TITLE_ROW_4,
      WIN_TBL_TITLE_ROW_5,
    ].forEach((elTitle) => generateDomElement('div', elTitle, titleRow));
    this.winTblBody = generateDomElement('div', '', winTable, WIN_TBL_BODY);
  }

  private generatePageTitle(): void {
    this.winPageTitle = generateDomElement('h2', null, this.winPage);
  }

  private updatePageTitle(): void {
    this.winPageTitle.textContent = `${WIN_PAGE_TITLE} (${this.winners.length})`;
    this.updatePagination();
  }

  private fillWinTable(pageNumber = 1): void {
    if (!this.winners.length) return;
    this.winTblBody.innerHTML = '';

    this.winners.slice(
      (pageNumber - 1) * NUMBER_ROWS_WIN_TABLE,
      pageNumber * NUMBER_ROWS_WIN_TABLE,
    ).forEach((winner, idx) => {
      const row = generateDomElement('div', null, this.winTblBody, WIN_TBL_ROW);
      const { name, wins, time } = winner;
      [idx + 1, getImage(winner.color), name, wins, time].forEach((el) => generateDomElement('div', `${el}`, row));
    });
  }

  // ============== PAGINATION ======== start ====

  private makePagination(): void {
    this.paginWrapper = generateDomElement('div', null, this.winPage, PAGIN_WRAPPER, HIDE_PAGINATION);
    this.btnPaginFirst = generateDomElement('button', BTN_PAGIN_TEXT_FIRST, this.paginWrapper, BTN_PAGIN_FIRST);
    this.btnPaginPrevius = generateDomElement('button', BTN_PAGIN_TEXT_LEFT, this.paginWrapper, BTN_PAGIN_LEFT);
    this.paginCurrPage = generateDomElement('div', `${this.currPageNum}`, this.paginWrapper, PAGIN_CURRENT);
    this.btnPaginNext = generateDomElement('button', BTN_PAGIN_TEXT_RIGHT, this.paginWrapper, BTN_PAGIN_RIGHT);
    this.btnPaginLast = generateDomElement('button', BTN_PAGIN_TEXT_LAST, this.paginWrapper, BTN_PAGIN_LAST);
  }

  private updatePagination(): void {
    if (!this.isPaginationVisible()) return;

    this.maxPage = Math.ceil(this.winners.length / NUMBER_ROWS_WIN_TABLE);
    this.currPageNum = Math.min(this.currPageNum, this.maxPage);
    this.paginCurrPage.innerHTML = `${this.currPageNum}`;

    this.setDisablingPaginBtns();

    this.fillWinTable(this.currPageNum);
  }

  public paginClickHandler(btnName: 'first' | 'previus' | 'next' | 'last'): void {
    if (btnName === 'first') this.currPageNum = 1;
    else if (btnName === 'previus') this.currPageNum -= 1;
    else if (btnName === 'next') this.currPageNum += 1;
    else if (btnName === 'last') this.currPageNum = this.maxPage;
    this.updatePagination();
  }

  private isPaginationVisible(): boolean {
    if (this.winners.length <= NUMBER_ROWS_WIN_TABLE) {
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

  private async createWinnersArray(): Promise<void> {
    const cars: ICar[] = await this.load(API_BASE_URL + getCars.getCarsUrl, getCars.method);
    this.winners = await this.load(API_BASE_URL + getWinner.getUrl, getWinner.method);
    this.winners.forEach((winner) => {
      const oCar = cars.find((car) => car.id === winner.id);
      if (!oCar) return;
      const win = winner;
      win.name = oCar.name;
      win.color = oCar.color;
    });
  }

  private async load<T>(url:string, method:string):Promise<T> {
    try {
      const response = await fetch(url, { method });
      await this.errorHandler(response);
      return await response.json();
      // return toJson.map((car: Car) => new Car(car.id, car.color, car.name));
    } catch (error) {
      console.error(error);
      throw error;
    }
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
