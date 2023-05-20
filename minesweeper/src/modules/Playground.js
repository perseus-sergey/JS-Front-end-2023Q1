import Cell from './Cell';
import { constants, menuClasses } from './constants';
import { gameTimer } from './gameTimer';
import { gameLevel } from './Level';
import { generateDomElement } from './utilities';

import boom from '../assets/sounds/boom.wav';
import audioEndLev from '../assets/sounds/end-level.wav';
import deleteSound from '../assets/sounds/delete.wav';
import choise from '../assets/sounds/choise.wav';
import keyboard from '../assets/sounds/keyboard.wav';
import shortBell from '../assets/sounds/upali-dengi-na-igrovoy-schet.wav';

const {
  COUNTER_CLASS,
  CLICK_CLASS,
  CELL_ROW_TAG,
  CELL_ROW_CLASS,
  CELL_TAG,
  END_GAME_TEXT_CLASS,
  END_GAME_TEXT_WIN,
  END_GAME_TEXT_LOSE,
  FONT_RATIO,
  LAST_WINS_KEY,
  LOCAL_DATA_KEY,
  MAIN_CLASS,
  PLAYGROUND_TAG,
  PLAYGROUND_CLASS,
  TIMER_MS_CLASS,
  TIMER_SEC_CLASS,
  TIMER_MIN_CLASS,
} = constants;

const { SOUND_SLIDER, THEME_SLIDER } = menuClasses;

export class Playground {
  constructor(level = gameLevel.easy, savingData = '', isSound = true) {
    this.ROW_NUM = level.rowNum;
    this.COL_NUM = level.colNum;
    this.MINE_NUM = level.mineNum;
    this.savingData = savingData;
    this.isSound = isSound;
    this.setSounds();
    this.getSavingData(savingData);
    this.flagCount();
    this.cellClickHandler = this.cellClickHandler.bind(this);
    this.mediaQueryHandler = this.mediaQueryHandler.bind(this);
    this.appendPlayground();
    this.startListners();
  }

  cells = [];

  mines = [];

  flags = [];

  isSound = true;

  isDarkTheme = true;

  isFirstClick = true;

  isGameFinished = false;

  timer = 0;

  clicks = 0;

  opened = 0;

  getSavingData(data) {
    if (!data) return;

    const oSavingData = JSON.parse(data);

    this.isSound = oSavingData.isSound;
    this.isDarkTheme = oSavingData.isDarkTheme;
    this.timer = oSavingData.timer;
    this.ROW_NUM = oSavingData.ROW_NUM;
    this.COL_NUM = oSavingData.COL_NUM;
    this.MINE_NUM = oSavingData.MINE_NUM;
    this.mines = oSavingData.mines;
    this.flags = oSavingData.flags;
    this.clicks = oSavingData.clicks;

    if (!customElements.get(CELL_TAG)) customElements.define(CELL_TAG, Cell);

    this.cells = [];
    for (let x = 0; x < this.ROW_NUM; x += 1) {
      this.cells[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const sCell = oSavingData.cells[x][y];
        const cell = new Cell(sCell.x, sCell.y, sCell.isOpened, sCell.VALUE);
        if (sCell.isOpened) this.opened += 1;
        cell.isMine = sCell.isMine;
        cell.isFlag = sCell.isFlag;
        cell.textContent = sCell.textContent;

        this.cells[x].push(cell);
      }
    }
    const chbSound = document.getElementById(SOUND_SLIDER);
    chbSound.checked = !this.isSound;
    this.setTimeValues();
    gameTimer.startTimer(this.timer);
    document.querySelector(`.${CLICK_CLASS}`).textContent = this.clicks;
  }

  setTimeValues() {
    const msec = Math.floor((this.timer - Math.floor(this.timer)) * 100);
    const sec = Math.floor(this.timer) - Math.floor(this.timer / 60) * 60;
    const min = Math.floor(this.timer / 60);
    document.querySelector(`.${TIMER_MS_CLASS}`).textContent = msec < 10 ? `0${msec.toString()}` : msec;
    document.querySelector(`.${TIMER_SEC_CLASS}`).textContent = sec < 10 ? `0${sec.toString()}` : sec;
    document.querySelector(`.${TIMER_MIN_CLASS}`).textContent = min < 10 ? `0${min.toString()}` : min;
  }

  setSounds() {
    this.audioBoom = new Audio(boom);
    this.audioRemoveFlag = new Audio(deleteSound);
    this.audioRightAnsw = new Audio(shortBell);
    this.audioFlagged = new Audio(keyboard);
    this.audioFirstClick = new Audio(choise);
    this.audioWin = new Audio(audioEndLev);
  }

  startListners() {
    document.addEventListener('click', this.cellClickHandler);
    document.addEventListener('contextmenu', this.cellClickHandler);
    // document.oncontextmenu = () => false;
    // ============== MEDIAQUERY ======== start ====
    [
      window.matchMedia('(max-width: 1250px)'),
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(orientation: portrait)'),
      window.matchMedia('(orientation: landscape)'),
    ].forEach((mq) => mq.addEventListener('change', this.mediaQueryHandler));

    // ______________ MEDIAQUERY ______ end _______
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

  async cellClickHandler(event) {
    const domCell = event.target.closest(CELL_TAG);

    if (this.isGameFinished || !domCell || domCell.isOpened) return;

    // if it's RIGHT CLICK:
    if (event.type === 'contextmenu') {
      event.preventDefault();
      this.flagMarkClick(domCell);
      this.saveDataToLocalStorage();
      return;
    }

    if (domCell.isFlag) return;

    const { x, y } = domCell;

    document.querySelector(`.${CLICK_CLASS}`).textContent = ++this.clicks;

    // to insert mines after FIRST CLICK
    if (this.isFirstClick) {
      if (this.isSound) this.audioFirstClick.play();
      const isSaved = await this.firstClick(x, y);
      this.saveDataToLocalStorage();
      if (!isSaved) return;
    }

    // if it's MINE:
    if (domCell.isMine) {
      this.mineClick(domCell);
      return;
    }

    const isWin = await this.openCell(x, y);
    if (isWin) return;

    if (this.isSound) this.audioRightAnsw.play();
    this.flagCount();
    this.saveDataToLocalStorage();
  }

  saveDataToLocalStorage() {
    const storCells = [];
    for (let x = 0; x < this.ROW_NUM; x += 1) {
      storCells[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const oCell = this.cells[x][y];
        const strCell = {};
        strCell.x = oCell.x;
        strCell.y = oCell.y;
        strCell.VALUE = oCell.VALUE;
        strCell.isOpened = oCell.isOpened;
        strCell.isMine = oCell.isMine;
        strCell.isFlag = oCell.isFlag;
        strCell.textContent = oCell.textContent;

        storCells[x].push(strCell);
      }
    }
    const chbTheme = document.getElementById(THEME_SLIDER).checked;
    const data = {
      isSound: this.isSound,
      isDarkTheme: chbTheme,
      timer: gameTimer.timer,
      ROW_NUM: this.ROW_NUM,
      COL_NUM: this.COL_NUM,
      MINE_NUM: this.MINE_NUM,
      cells: storCells,
      mines: this.mines,
      flags: this.flags,
      clicks: this.clicks,
    };
    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
  }

  async firstClick(x, y) {
    this.isFirstClick = false;
    if (this.savingData) return true;
    do {
      this.appendPlayground();
    } while (this.calcMinesAround(x, y) !== 0);

    document.addEventListener('contextmenu', this.cellClickHandler);

    this.flagCount();
    await this.openCell(x, y);
    gameTimer.startTimer(this.timer);
    return false;
  }

  getLocalSavedWins() {
    localStorage.getItem(LAST_WINS_KEY);
  }

  winClick(winCell) {
    winCell.isWin();

    const oSavingData = JSON.parse(localStorage.getItem(LAST_WINS_KEY)) || '';
    let arrSavingData = Array.from(oSavingData);

    const data = {
      date: new Date(),
      timer: gameTimer.timer.toFixed(1),
      ROW_NUM: this.ROW_NUM,
      COL_NUM: this.COL_NUM,
      MINE_NUM: this.MINE_NUM,
      clicks: this.clicks,
    };
    arrSavingData.push(data);
    if (arrSavingData.length > 10) arrSavingData = arrSavingData.slice(-10);
    localStorage.setItem(LAST_WINS_KEY, JSON.stringify(arrSavingData));

    if (this.isSound) this.audioWin.play();
    this.finishGame();
    this.showEndText(true);
  }

  showEndText(isWin) {
    const endTextDiv = generateDomElement(
      'div',
      isWin ? END_GAME_TEXT_WIN : END_GAME_TEXT_LOSE,
      END_GAME_TEXT_CLASS,
    );
    document.body.append(endTextDiv);
    document.addEventListener('click', () => endTextDiv.remove(), { once: true });
  }

  mineClick(cell) {
    if (this.isSound) this.audioBoom.play();

    cell.isBoom();
    this.mines = this.mines.filter((id) => id !== cell.cellID);
    this.finishGame();
    this.showEndText(false);
  }

  flagMarkClick(cell) {
    cell.changeFlag();
    if (cell.isFlag) {
      if (this.isSound) this.audioFlagged.play();
      this.flags.push(cell.cellID);
    } else {
      if (this.isSound) this.audioRemoveFlag.play();
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

  cleanCurrentStatusData() {
    localStorage.removeItem(LOCAL_DATA_KEY);
  }

  finishGame() {
    this.cleanCurrentStatusData();
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
    const w = 90 / this.COL_NUM;
    const h = 70 / this.ROW_NUM;
    const rat = window.innerWidth / window.innerHeight;

    return { numb: Math.min(w, h).toFixed(2), ext: rat < 1 ? 'vw' : 'vh' };
  }

  makePlayground() {
    // Define custom cell tag
    if (!customElements.get(CELL_TAG)) customElements.define(CELL_TAG, Cell);

    const playgrElem = generateDomElement(PLAYGROUND_TAG, '', PLAYGROUND_CLASS);

    // if saving data alredy exists in local storage
    if (this.savingData) {
      return this.makePlaygrFromSavingData(playgrElem);
    }

    this.cells = [];
    const oCellSize = this.getCellSize();

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      const cellRow = generateDomElement(CELL_ROW_TAG, '', CELL_ROW_CLASS);

      this.cells[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const cell = new Cell(x, y);

        cell.style.width = oCellSize.numb + oCellSize.ext;
        cell.style.height = oCellSize.numb + oCellSize.ext;
        cell.style.fontSize = oCellSize.numb * FONT_RATIO + oCellSize.ext;
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

  makePlaygrFromSavingData(playgrElem) {
    const oCellSize = this.getCellSize();

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      const cellRow = generateDomElement(CELL_ROW_TAG, '', CELL_ROW_CLASS);

      for (let y = 0; y < this.COL_NUM; y += 1) {
        const cell = this.cells[x][y];
        cell.style.width = oCellSize.numb + oCellSize.ext;
        cell.style.height = oCellSize.numb + oCellSize.ext;
        cell.style.fontSize = oCellSize.numb * FONT_RATIO + oCellSize.ext;

        cellRow.append(this.cells[x][y]);
      }
      playgrElem.append(cellRow);
    }
    return playgrElem;
  }

  appendPlayground() {
    let domPlayground = document.querySelector(`.${PLAYGROUND_CLASS}`);
    if (domPlayground) domPlayground.remove();

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
    if (this.outBounds(x, y)) return false;
    const oCell = this.cells[x][y];
    if (oCell.isOpened) return false;

    oCell.openCell();
    this.removeFlag(oCell.cellID);
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    this.opened += 1;

    if (this.opened === this.ROW_NUM * this.COL_NUM - this.MINE_NUM) {
      this.winClick(oCell);
      return true;
    }

    if (oCell.VALUE !== 0) return false;

    await this.openCell(x, y - 1);
    await this.openCell(x, y + 1);
    await this.openCell(x - 1, y);
    await this.openCell(x + 1, y);
    await this.openCell(x - 1, y - 1);
    await this.openCell(x - 1, y + 1);
    await this.openCell(x + 1, y - 1);
    await this.openCell(x + 1, y + 1);
  }

  outBounds(x, y) {
    return x < 0 || y < 0 || x >= this.ROW_NUM || y >= this.COL_NUM;
  }
}
