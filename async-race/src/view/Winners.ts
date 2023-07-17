import { ICar, IWinner } from '../app/tipes';
import {
  constantsClasses,
  constantsTexts,
  constantsNumbers,
  apiGarage,
  apiWinner,
} from '../constants';
import { Crud } from '../controller/Crud';
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
  WIN_TBL_WINS_SORT,
  WIN_TBL_TIME_SORT,
  ASC_SORT,
  ACTIVE,
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

  private sortWinsBtn!: HTMLElement;

  private sortTimeBtn!: HTMLElement;

  private currPageNum = 1;

  private maxPage = 1;

  constructor() {
    this.pageBuild();
  }

  private async pageBuild(): Promise<void> {
    this.generatePage();
    this.generatePageTitle();
    this.generateWinTable();
    this.makePagination();
    await this.pageUpdate();
  }

  public async pageUpdate(): Promise<void> {
    await this.createWinnersArray();
    this.fillWinTable();
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
    ].forEach((elTitle) => generateDomElement('div', elTitle, titleRow));
    this.winTblBody = generateDomElement('div', '', winTable, WIN_TBL_BODY);
    this.sortWinsBtn = generateDomElement('div', WIN_TBL_TITLE_ROW_4, titleRow, WIN_TBL_WINS_SORT);
    this.sortTimeBtn = generateDomElement('div', WIN_TBL_TITLE_ROW_5, titleRow, WIN_TBL_TIME_SORT);
  }

  public tblSortTimeHandler(): void {
    this.sortTable(this.sortTimeBtn, 'time');
    this.sortWinsBtn.classList.remove(ACTIVE);
  }

  public tblSortWinsHandler(): void {
    this.sortTable(this.sortWinsBtn, 'wins');
    this.sortTimeBtn.classList.remove(ACTIVE);
  }

  private sortTable(chosenBtn: HTMLElement, field: 'time' | 'wins'): void {
    if (chosenBtn.classList.contains(ASC_SORT)) {
      this.winners = this.winners.sort((first, sec) => (first[field] > sec[field] ? 1 : -1));
      chosenBtn.classList.remove(ASC_SORT);
    } else {
      this.winners = this.winners.sort((first, sec) => (first[field] > sec[field] ? -1 : 1));
      chosenBtn.classList.add(ASC_SORT);
    }
    chosenBtn.classList.add(ACTIVE);
    this.currPageNum = 1;
    this.updatePagination();
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
      [(this.currPageNum - 1) * NUMBER_ROWS_WIN_TABLE + idx + 1, getImage(winner.color), name, wins, time].forEach((el) => generateDomElement('div', `${el}`, row));
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

  private async createWinnersArray(): Promise<void> {
    const crudCars = new Crud<ICar[]>(getCars.getCarsUrl, getCars.method);
    const cars = await crudCars.responseJson;
    if (!cars) return;
    const crudWinners = new Crud<IWinner[]>(getWinner.getUrl, getWinner.method);
    const winners = await crudWinners.responseJson;
    if (!winners) return;
    this.winners = winners;
    this.winners.forEach((winner) => {
      const oCar = cars.find((car) => car.id === winner.id);
      if (!oCar) return;
      const win = winner;
      win.name = oCar.name;
      win.color = oCar.color;
    });
  }
}
