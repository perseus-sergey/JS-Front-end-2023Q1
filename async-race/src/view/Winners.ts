import { ICar, IWinner } from '../common/tipes';
import {
  constantsClasses,
  constantsTexts,
  constantsNumbers,
  apiGarage,
  apiWinner,
} from '../common/constants';
import { Crud } from '../controller/Crud';
import {
  generateDomElement, getImage,
} from '../common/utilites';
import { Pagination } from '../controller/Pagination';

const {
  getWinner,
} = apiWinner;

const {
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

export class Winners extends Pagination<IWinner> {
  public layout!: HTMLElement;

  public winTblBody!: HTMLElement;

  public tracksElement!: HTMLElement;

  protected rowsPerPage = NUMBER_ROWS_WIN_TABLE;

  private winPageTitle!: HTMLElement;

  private sortWinsBtn!: HTMLElement;

  private sortTimeBtn!: HTMLElement;

  constructor() {
    super();
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
    this.fillPage();
    this.updatePageTitle();
  }

  private generatePage(): void {
    this.layout = generateDomElement('div', '', null, WIN_PAGE);
  }

  private generateWinTable(): void {
    const winTable = generateDomElement('div', '', this.layout, WIN_TABLE);
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
      this.mainArray = this.mainArray.sort((first, sec) => (first[field] > sec[field] ? 1 : -1));
      chosenBtn.classList.remove(ASC_SORT);
    } else {
      this.mainArray = this.mainArray.sort((first, sec) => (first[field] > sec[field] ? -1 : 1));
      chosenBtn.classList.add(ASC_SORT);
    }
    chosenBtn.classList.add(ACTIVE);
    this.currPageNum = 1;
    if (!this.isTableOverFull()) this.fillPage();
    else this.updatePagination();
  }

  private generatePageTitle(): void {
    this.winPageTitle = generateDomElement('h2', null, this.layout);
  }

  private updatePageTitle(): void {
    this.winPageTitle.textContent = `${WIN_PAGE_TITLE} (${this.mainArray.length})`;
    this.updatePagination();
  }

  protected fillPage(pageNumber = 1): void {
    if (!this.mainArray.length) return;
    this.winTblBody.innerHTML = '';

    this.mainArray.slice(
      (pageNumber - 1) * NUMBER_ROWS_WIN_TABLE,
      pageNumber * NUMBER_ROWS_WIN_TABLE,
    ).forEach((winner, idx) => {
      const row = generateDomElement('div', null, this.winTblBody, WIN_TBL_ROW);
      const { name, wins, time } = winner;
      [(this.currPageNum - 1) * NUMBER_ROWS_WIN_TABLE + idx + 1, getImage(winner.color), name, wins, time].forEach((el) => generateDomElement('div', `${el}`, row));
    });
  }

  private async createWinnersArray(): Promise<void> {
    const crudCars = new Crud<ICar[]>(getCars.getCarsUrl, getCars.method);
    const cars = await crudCars.responseJson;
    if (!cars) return;
    const crudWinners = new Crud<IWinner[]>(getWinner.getUrl, getWinner.method);
    const mainArray = await crudWinners.responseJson;
    if (!mainArray) return;
    this.mainArray = mainArray;
    this.mainArray.forEach((winner) => {
      const oCar = cars.find((car) => car.id === winner.id);
      if (!oCar) return;
      const win = winner;
      win.name = oCar.name;
      win.color = oCar.color;
    });
  }
}
