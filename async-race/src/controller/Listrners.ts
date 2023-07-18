import { constantsClasses } from '../common/constants';
import { Garage } from '../view/Garage';
import { Winners } from '../view/Winners';

const {
  GARAGE,
  WIN_PAGE,
  BTN_TRACK_SELECT_CAR_STYLE,
  BTN_TRACK_REMOVE_CAR_STYLE,
  BTN_STOP_RACE,
  BTN_START_RACE,
  BTN_CREATE_CARS,
  BTN_PAGIN_FIRST,
  BTN_PAGIN_LAST,
  BTN_PAGIN_LEFT,
  BTN_PAGIN_RIGHT,
  NEXT_PAGE_BTN,
  PREV_PAGE_BTN,
  WIN_TBL_WINS_SORT,
  WIN_TBL_TIME_SORT,
} = constantsClasses;

export class Listners {
  protected garage = new Garage();

  protected winPage = new Winners();

  protected startEventListners(): void {
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

  protected hideWinTag(): void {}

  protected showNextPage(): void {}

  protected showPreviusPage(): void {}
}
