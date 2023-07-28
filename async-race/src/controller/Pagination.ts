import { constantsClasses, constantsTexts } from '../common/constants';
import { generateDomElement } from '../common/utilites';

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

export class Pagination<T> {
  protected btnPaginPrevius!: HTMLButtonElement;

  protected btnPaginNext!: HTMLButtonElement;

  protected btnPaginLast!: HTMLButtonElement;

  protected btnPaginFirst!: HTMLButtonElement;

  protected paginCurrPage!: HTMLElement;

  protected paginWrapper!: HTMLElement;

  protected layout!: HTMLElement;

  protected maxPage = 1;

  protected rowsPerPage!: number;

  protected currPageNum = 1;

  protected mainArray: T[] = [];

  protected makePagination(): void {
    this.paginWrapper = generateDomElement('div', null, this.layout, PAGIN_WRAPPER, HIDE_PAGINATION);
    this.btnPaginFirst = generateDomElement('button', BTN_PAGIN_TEXT_FIRST, this.paginWrapper, BTN_PAGIN_FIRST);
    this.btnPaginPrevius = generateDomElement('button', BTN_PAGIN_TEXT_LEFT, this.paginWrapper, BTN_PAGIN_LEFT);
    this.paginCurrPage = generateDomElement('div', `${this.currPageNum}`, this.paginWrapper, PAGIN_CURRENT);
    this.btnPaginNext = generateDomElement('button', BTN_PAGIN_TEXT_RIGHT, this.paginWrapper, BTN_PAGIN_RIGHT);
    this.btnPaginLast = generateDomElement('button', BTN_PAGIN_TEXT_LAST, this.paginWrapper, BTN_PAGIN_LAST);
  }

  protected updatePagination(): void {
    if (this.isPaginationVisible()) {
      this.maxPage = Math.ceil(this.mainArray.length / this.rowsPerPage);
      this.currPageNum = Math.min(Math.max(1, this.currPageNum), this.maxPage);
      this.paginCurrPage.innerHTML = `${this.currPageNum}`;

      this.setDisablingPaginBtns();
    }
    this.fillPage(this.currPageNum);
  }

  public paginClickHandler(btnName: 'first' | 'previus' | 'next' | 'last'): void {
    if (btnName === 'first') this.currPageNum = 1;
    else if (btnName === 'previus') this.currPageNum -= 1;
    else if (btnName === 'next') this.currPageNum += 1;
    else if (btnName === 'last') this.currPageNum = this.maxPage;
    this.updatePagination();
  }

  protected fillPage(pageNumber = 1): void {
    console.log(pageNumber);
  }

  protected isTableOverFull(): boolean {
    return this.mainArray.length > this.rowsPerPage;
  }

  private isPaginationVisible(): boolean {
    if (!this.isTableOverFull() && this.currPageNum <= 1) {
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
    }
    if (this.currPageNum <= 1) {
      this.btnPaginPrevius.disabled = true;
      this.btnPaginFirst.disabled = true;
    }
  }
}
