import Cell from './Cell';
import { constants } from './constants';
import { gameTimer } from './gameTimer';

const {
  COUNTER_CLASS,
  COUNTER_WRAPPER_CLASS,
  COUNTER_TITLE_CLASS,
  CLICK_WRAPPER_CLASS,
  CLICK_TITLE_CLASS,
  CLICK_CLASS,
  CELL_ROW_TAG,
  CELL_ROW_CLASS,
  CELL_TAG,
  FONT_RATIO,
  INFO_SECTION_CLASS,
  MAIN_TAG,
  MAIN_CLASS,
  NAV_CLASS,
  PLAYGROUND_TAG,
  PLAYGROUND_CLASS,
  START_BTN_CLASS,
  SETTINGS_BTN_CLASS,
  TIMER_CLASS,
  TIMER_MS_CLASS,
  TIMER_SEC_CLASS,
  TIMER_MIN_CLASS,
} = constants;

// TO_DO: MENU - Theme: option to choose different themes for the game board (dark/light themes)
// TO_DO: MENU - Sound: sound accompaniment (on/off) when clicking on cell and at the end of the game
// TO_DO: MENU - Level: implement ability to change the size (easy - 10x10, medium - 15x15, hard - 25x25)
//        and number of mines for each size of the field (from 10 to 99)
// TO_DO: MENU - Score: implemented saving the latest 10 results using LocalStorage
// TO_DO: implemented saving the state of the game
// TO_DO: game duration and number of clicks are displayed
// TO_DO: the game should end when the player reveals all cells that do not contain mines (win)
//        or clicks on mine (lose) and related message is displayed at the end of the game:

const mainLayout = {
  start() {
    this.makeMainSection();
    this.makeInfoSection();
    this.makeMenuNav();
    this.addListners();
  },

  makeMainSection() {
    this.mainSection = mainLayout.generateDomElement(MAIN_TAG, '', MAIN_CLASS);
    document.body.append(this.mainSection);
  },

  makeMenuNav() {
    const menuNav = mainLayout.generateDomElement('nav', '', NAV_CLASS);
    document.body.append(menuNav);
  },

  makeInfoSection() {
    const infoSection = mainLayout.generateDomElement('section', '', INFO_SECTION_CLASS);

    const countWrapperDiv = mainLayout.generateDomElement('div', '', COUNTER_WRAPPER_CLASS);
    const countTitleDiv = mainLayout.generateDomElement('div', 'Mines: ', COUNTER_TITLE_CLASS);
    this.counterDiv = mainLayout.generateDomElement('div', '0', COUNTER_CLASS);
    countWrapperDiv.append(countTitleDiv);
    countWrapperDiv.append(this.counterDiv);

    const clickWrapperDiv = mainLayout.generateDomElement('div', '', CLICK_WRAPPER_CLASS);
    const clickTitleDiv = mainLayout.generateDomElement('div', 'Clicks: ', CLICK_TITLE_CLASS);
    this.clickDiv = mainLayout.generateDomElement('div', '0', CLICK_CLASS);
    clickWrapperDiv.append(clickTitleDiv);
    clickWrapperDiv.append(this.clickDiv);

    this.startBtn = mainLayout.generateDomElement('div', 'Restart', START_BTN_CLASS);
    this.settingsBtn = mainLayout.generateDomElement('div', '≓', SETTINGS_BTN_CLASS);

    const timerDiv = mainLayout.generateDomElement('div', '', TIMER_CLASS);

    this.ms = mainLayout.generateDomElement('div', '00', TIMER_MS_CLASS);
    this.second = mainLayout.generateDomElement('div', '00', TIMER_SEC_CLASS);
    this.minute = mainLayout.generateDomElement('div', '00', TIMER_MIN_CLASS);

    timerDiv.append(this.minute);
    timerDiv.append(this.second);
    timerDiv.append(this.ms);

    infoSection.append(countWrapperDiv);
    infoSection.append(clickWrapperDiv);
    infoSection.append(this.startBtn);
    infoSection.append(timerDiv);
    infoSection.append(this.settingsBtn);
    document.body.append(infoSection);
  },

  restartBtnHandler() {
    if (typeof play !== 'undefined') {
      gameTimer.stopTimer();
      this.ms.textContent = '00';
      this.second.textContent = '00';
      this.minute.textContent = '00';
      this.counterDiv.textContent = '0';
      this.clickDiv.textContent = '0';
      this.mainSection.innerHTML = '';
      play.finishGame();
      play = new Playground();
    }
  },

  addListners() {
    this.startBtn.addEventListener('click', (event) => this.restartBtnHandler(event));
  },

  generateDomElement(tag, text = '', ...classes) {
    const element = document.createElement(tag);
    const arrClasses = [];
    classes.forEach((el) => {
      if (Array.isArray(el)) el.forEach((i) => arrClasses.push(i));
      else el.split(' ').forEach((e) => arrClasses.push(e));
    });
    if (arrClasses.length) element.classList.add(...arrClasses);
    element.textContent = text;
    return element;
  },
};

class Playground {
  constructor(rowNumber = 10, colNumber = 10, mineNum = 10) {
    this.ROW_NUM = rowNumber;
    this.COL_NUM = colNumber;
    this.MINE_NUM = mineNum;
    this.cellClickHandler = this.cellClickHandler.bind(this);
    this.mediaQueryHandler = this.mediaQueryHandler.bind(this);
    this.appendPlayground();
    this.startListners();
  }

  cells = [];

  mines = [];

  flags = [];

  isFirstClick = true;

  isGameFinished = false;

  clicks = 0;

  opened = 0;

  startListners() {
    document.addEventListener('click', this.cellClickHandler);
    // document.oncontextmenu = () => false;
    // ============== MEDIAQUERY ======== start ====
    [
      window.matchMedia('(max-width: 1250px)'),
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(orientation: portrait)'),
      window.matchMedia('(orientation: landscape)'),
    ].forEach((mq) => mq.addEventListener('change', this.mediaQueryHandler));

    // ______________ MEDIAQUERY ______ end _______

    // document.addEventListener('keydown', (event) => {
    //   if (!this.isMeta) this.keyDownHandler(event);
    // });
    // document.addEventListener('keyup', (event) => {
    //   if (event.key === 'Shift') this.keyDownHandler(event);
    //   this.isMeta = false;
    // });
  }

  mediaQueryHandler() {
    const cellSizeNumb = this.getCellSize().numb;
    const cellSizeExt = this.getCellSize().ext;

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const cell = this.cells[x][y];
        cell.style.width = cellSizeNumb + cellSizeExt;
        cell.style.height = cellSizeNumb + cellSizeExt;
        cell.style.fontSize = cellSizeNumb * Cell.FONT_RATIO + cellSizeExt;
      }
    }
  }

  endListners() {
    document.removeEventListener('click', this.cellClickHandler);
    document.removeEventListener('contextmenu', this.cellClickHandler);
  }

  cellClickHandler(event) {
    const domCell = event.target.closest(CELL_TAG);

    if (this.isGameFinished || !domCell || domCell.isOpened) return;

    // if it's right click:
    if (event.type === 'contextmenu') {
      event.preventDefault();
      this.flagMarkClick(domCell);
      return;
    }

    if (domCell.isFlag) return;

    const { x, y } = domCell;

    document.querySelector(`.${CLICK_CLASS}`).textContent = ++this.clicks;

    // to insert mines after first click
    if (this.isFirstClick) {
      this.firstClick(x, y);
      return;
    }

    // if it's mine:
    if (domCell.isMine) {
      this.mineClick(domCell);
      return;
    }

    // this.moovigCharColor = window.getComputedStyle(element).color;
    // this.addKeyBtnPressedClass(element);

    this.openCell(x, y);
    this.flagCount();
    // console.log(this.flags.length);
    // this.removeKeyBtnPressedClass(element);
  }

  firstClick(x, y) {
    this.isFirstClick = false;
    do {
      this.appendPlayground();
    } while (this.calcMinesAround(x, y) !== 0);

    document.addEventListener('contextmenu', this.cellClickHandler);

    gameTimer.startTimer();
    this.flagCount();
    this.openCell(x, y);
  }

  winClick(cell) {
    cell.isWin();
    this.finishGame(true);
    // alert('YOU WIN !!!!!!!!');
  }

  mineClick(cell) {
    cell.isBoom();
    this.mines = this.mines.filter((id) => id !== cell.cellID);
    this.finishGame(false);
  }

  flagMarkClick(cell) {
    cell.changeFlag();
    if (cell.isFlag) {
      this.flags.push(cell.cellID);
    } else {
      this.removeFlag(cell.cellID);
    }
    this.flagCount();
  }

  flagCount() {
    document.querySelector(`.${COUNTER_CLASS}`).textContent = this.MINE_NUM - this.flags.length;
  }

  removeFlag(flagId) {
    this.flags = this.flags.filter((el) => el !== flagId);
  }

  finishGame(isWin) {
    this.endListners();
    gameTimer.stopTimer();
    this.isGameFinished = true;

    // show all mines except boom one
    this.mines.forEach((id) => {
      const [x, y] = id.split('-');
      const domCell = this.cells[x][y];
      domCell.showMine();

      // if cell marked with correct flag
      if (this.flags.indexOf(id) !== -1) {
        this.removeFlag(id);
        domCell.isCorrectFlag(true);
      }
    });
    // show incorrect flags
    this.flags.forEach((id) => {
      const [x, y] = id.split('-');
      this.cells[x][y].isCorrectFlag(false);
    });
  }

  getCellSize() {
    // window.innerWidth * 0.9 px  -  100
    // window.innerWidth * 0.9 / this.COL_NUM px  -  x
    const w = 90 / this.COL_NUM;
    const h = 70 / this.ROW_NUM;
    const rat = window.innerWidth / window.innerHeight;

    return (rat < 1) ? { numb: w.toFixed(2), ext: 'vw' } : { numb: h.toFixed(2), ext: 'vh' };
    // return (w < h) ? { numb: w.toFixed(2), ext: 'vw' } : { numb: h.toFixed(2), ext: 'vh' };
  }

  makePlayground() {
    if (!customElements.get(CELL_TAG)) customElements.define(CELL_TAG, Cell);
    const playgrElem = mainLayout.generateDomElement(PLAYGROUND_TAG, '', PLAYGROUND_CLASS);

    this.cells = [];
    const cellSizeNumb = this.getCellSize().numb;
    const cellSizeExt = this.getCellSize().ext;

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      const cellRow = mainLayout.generateDomElement(CELL_ROW_TAG, '', CELL_ROW_CLASS);

      this.cells[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const cell = new Cell(x, y);

        cell.style.width = cellSizeNumb + cellSizeExt;
        cell.style.height = cellSizeNumb + cellSizeExt;
        cell.style.fontSize = cellSizeNumb * FONT_RATIO + cellSizeExt;
        this.cells[x].push(cell);

        cellRow.append(cell);
      }
      playgrElem.append(cellRow);
    }

    this.insertMines();

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      for (let y = 0; y < this.COL_NUM; y += 1) {
        this.cells[x][y].VALUE = this.calcMinesAround(x, y);
      }
    }

    return playgrElem;
  }

  appendPlayground() {
    let domPlayground = document.querySelector(`.${PLAYGROUND_CLASS}`);
    if (domPlayground) domPlayground.remove();
    // if (this.domPlayground) this.domPlayground.remove();

    domPlayground = this.makePlayground();

    document.querySelector(MAIN_CLASS).append(domPlayground);
  }

  insertMines() {
    let counter = 0;
    this.mines = [];

    while (counter < this.MINE_NUM) {
      const randX = Math.floor(Math.random() * this.ROW_NUM);
      const randY = Math.floor(Math.random() * this.COL_NUM);

      if (!this.cells[randX][randY].isMine) {
        this.cells[randX][randY].isMine = 1;
        this.mines.push(this.cells[randX][randY].cellID);
        counter += 1;
      }
    }
  }

  // removeMines() {
  //   for (let x = 0; x < this.ROW_NUM; x += 1) {
  //     for (let y = 0; y < this.COL_NUM; y += 1) {
  //       this.cells[x][y].isMine = 0;
  //     }
  //   }
  // }

  calcMinesAround(x, y) {
    if (this.outBounds(x, y)) return 0;

    let counter = 0;
    for (let aroundX = -1; aroundX <= 1; aroundX += 1) {
      for (let aroundY = -1; aroundY <= 1; aroundY += 1) {
        const calcX = aroundX + x;
        const calcY = aroundY + y;
        if (!this.outBounds(calcX, calcY)) {
          counter += this.cells[calcX][calcY].isMine;
        }
      }
    }
    return counter;
  }

  async openCell(x, y) {
    if (this.outBounds(x, y)) return;
    const oCell = this.cells[x][y];
    if (oCell.isOpened) return;

    oCell.openCell();
    this.removeFlag(oCell.cellID);
    this.opened += 1;

    if (this.opened === this.ROW_NUM * this.COL_NUM - this.MINE_NUM) {
      this.winClick(oCell);
      return;
    }

    if (oCell.VALUE !== 0) return;

    await new Promise((resolve) => {
      setTimeout(resolve, 30);
    });

    this.openCell(x, y - 1);
    this.openCell(x, y + 1);
    this.openCell(x - 1, y);
    this.openCell(x + 1, y);
    this.openCell(x - 1, y - 1);
    this.openCell(x - 1, y + 1);
    this.openCell(x + 1, y - 1);
    this.openCell(x + 1, y + 1);
  }

  outBounds(x, y) {
    return x < 0 || y < 0 || x >= this.ROW_NUM || y >= this.COL_NUM;
  }
}

mainLayout.start();
let play = new Playground();
