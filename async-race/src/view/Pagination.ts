import {
  constantsClasses,
  constantsTexts,
  constantsNumbers,
  apiGarage,
} from '../constants';
import {
  generateDomElement,
} from '../utilites';

const {
  PAGIN_WRAPPER,
  BTN_PAGIN_LEFT,
  BTN_PAGIN_RIGHT,
  BTN_PAGIN_LAST,
  BTN_PAGIN_FIRST,
  PAGIN_CURRENT,
  HIDE_PAGINATION,
} = constantsClasses;

const {
  BTN_PAGIN_TEXT_LEFT,
  BTN_PAGIN_TEXT_RIGHT,
  BTN_PAGIN_TEXT_LAST,
  BTN_PAGIN_TEXT_FIRST,
} = constantsTexts;

const {
  NUMBER_ROWS_WIN_TABLE,
} = constantsNumbers;

export class Pagination {
  private btnPaginPrevius!: HTMLButtonElement;

  private btnPaginNext!: HTMLButtonElement;

  private btnPaginLast!: HTMLButtonElement;

  private btnPaginFirst!: HTMLButtonElement;

  private paginCurrPage!: HTMLElement;

  private paginWrapper!: HTMLElement;

  private currPageNum = 1;

  private maxPage = 1;

  constructor(
    private parentTag: HTMLElement,
    private numberElemPerPage: number,
    private numberOfElements: number,
  ) {
    this.makePagination();
  }

  private makePagination(): void {
    this.paginWrapper = generateDomElement('div', null, this.parentTag, PAGIN_WRAPPER, HIDE_PAGINATION);
    this.btnPaginFirst = generateDomElement('button', BTN_PAGIN_TEXT_FIRST, this.paginWrapper, BTN_PAGIN_FIRST);
    this.btnPaginPrevius = generateDomElement('button', BTN_PAGIN_TEXT_LEFT, this.paginWrapper, BTN_PAGIN_LEFT);
    this.paginCurrPage = generateDomElement('div', `${this.currPageNum}`, this.paginWrapper, PAGIN_CURRENT);
    this.btnPaginNext = generateDomElement('button', BTN_PAGIN_TEXT_RIGHT, this.paginWrapper, BTN_PAGIN_RIGHT);
    this.btnPaginLast = generateDomElement('button', BTN_PAGIN_TEXT_LAST, this.paginWrapper, BTN_PAGIN_LAST);
  }

  public getCurentPageNumber(numberOfElements = this.numberOfElements): number {
    this.numberOfElements = numberOfElements;
    if (!this.isPaginationVisible()) return 1;

    this.maxPage = Math.ceil(this.numberOfElements / this.numberElemPerPage);
    this.currPageNum = Math.min(this.currPageNum, this.maxPage);
    this.updatePagination();
    return this.currPageNum;
  }

  public paginClickHandler(btnName: 'first' | 'previus' | 'next' | 'last'): void {
    if (btnName === 'first') this.currPageNum = 1;
    else if (btnName === 'previus') this.currPageNum -= 1;
    else if (btnName === 'next') this.currPageNum += 1;
    else if (btnName === 'last') this.currPageNum = this.maxPage;
    this.getCurentPageNumber();
  }

  private updatePagination():void {
    this.paginCurrPage.innerHTML = `${this.currPageNum}`;
    this.setDisablingPaginBtns();
  }

  private isPaginationVisible(): boolean {
    if (this.numberOfElements <= this.numberElemPerPage) {
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
}
