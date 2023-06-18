// import Cell from './Cell';
// import { constants, menuClasses } from './constants';
// import { gameTimer } from './gameTimer';
// import { gameLevel } from './Level';
// import { generateDomElement } from './utilities';

import { constants } from './auxiliary/constants';
import { ILevel } from './auxiliary/types';
import { generateDomElement } from './auxiliary/utilites';
import { gameLevels } from './Levels';

// import boom from '../assets/sounds/boom.wav';
// import audioEndLev from '../assets/sounds/end-level.wav';
// import deleteSound from '../assets/sounds/delete.wav';
// import choise from '../assets/sounds/choise.wav';
// import keyboard from '../assets/sounds/keyboard.wav';
// import shortBell from '../assets/sounds/upali-dengi-na-igrovoy-schet.wav';

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
  EDITOR_INFO_TEXT,
  MAIN_CLASS,
  EDITOR_CLASS,
  VIEWER_CLASS,
  PLAYGROUND_TAG,
  PLAYGROUND_CLASS,
  // TIMER_MS_CLASS,
  // TIMER_SEC_CLASS,
  // TIMER_MIN_CLASS,
} = constants;

// const { SOUND_SLIDER, THEME_SLIDER } = menuClasses;

export class Playground {
  constructor(private level: ILevel = gameLevels[0], private savingData = '', public isSound = true) {
    // this.ROW_NUM = level.rowNum;
    // this.COL_NUM = level.colNum;
    // this.MINE_NUM = level.mineNum;
    // this.savingData = savingData;
    // this.isSound = isSound;
    // this.setSounds();
    // this.getSavingData(savingData);
    // this.flagCount();
    this.playgrMousOverHandler = this.playgrMousOverHandler.bind(this);
    this.playghMousOutHandler = this.playghMousOutHandler.bind(this);
    this.enterPressedHandler = this.enterPressedHandler.bind(this);
    this.inputCheckValue = this.inputCheckValue.bind(this);
    // this.mediaQueryHandler = this.mediaQueryHandler.bind(this);
    this.appendH1();
    this.appendPlayground();
    this.appendEditor();
    this.appendViewer();
    this.appendRightAside();
    this.startListners();
  }

  private h1!: HTMLElement;

  private enterBtn!: HTMLElement;

  private playgroundElement!: HTMLElement;

  private rightElement!: HTMLElement;

  private playgroundHint!: HTMLElement;

  private viewerPre!: HTMLDivElement;

  private editorInput!: HTMLInputElement;

  private sideTitle!: HTMLInputElement;

  private sideNavPrev!: HTMLInputElement;

  private sideNavNext!: HTMLInputElement;

  private sideProgress!: HTMLInputElement;

  private sideLearnSelector!: HTMLInputElement;

  private sideLearnTitle!: HTMLInputElement;

  private sideLearnSintaxis!: HTMLInputElement;

  private sideLearnDescription!: HTMLInputElement;

  private examplesWrapper!: HTMLInputElement;

  private isFinish = false;
  //   cells = [];

  //   mines = [];

  //   flags = [];

  //   isSound = true;

  //   isDarkTheme = true;

  //   isFirstClick = true;

  //   isGameFinished = false;

  //   timer = 0;

  //   clicks = 0;

  //   opened = 0;

  //   getSavingData(data) {
  //     if (!data) return;

  //     const oSavingData = JSON.parse(data);

  //     this.isSound = oSavingData.isSound;
  //     this.isDarkTheme = oSavingData.isDarkTheme;
  //     this.timer = oSavingData.timer;
  //     this.ROW_NUM = oSavingData.ROW_NUM;
  //     this.COL_NUM = oSavingData.COL_NUM;
  //     this.MINE_NUM = oSavingData.MINE_NUM;
  //     this.mines = oSavingData.mines;
  //     this.flags = oSavingData.flags;
  //     this.clicks = oSavingData.clicks;

  //     if (!customElements.get(CELL_TAG)) customElements.define(CELL_TAG, Cell);

  //     this.cells = [];
  //     for (let x = 0; x < this.ROW_NUM; x += 1) {
  //       this.cells[x] = [];
  //       for (let y = 0; y < this.COL_NUM; y += 1) {
  //         const sCell = oSavingData.cells[x][y];
  //         const cell = new Cell(sCell.x, sCell.y, sCell.isOpened, sCell.VALUE);
  //         if (sCell.isOpened) this.opened += 1;
  //         cell.isMine = sCell.isMine;
  //         cell.isFlag = sCell.isFlag;
  //         cell.textContent = sCell.textContent;

  //         this.cells[x].push(cell);
  //       }
  //     }
  //     const chbSound = document.getElementById(SOUND_SLIDER);
  //     chbSound.checked = !this.isSound;
  //     this.setTimeValues();
  //     gameTimer.startTimer(this.timer);
  //     document.querySelector(`.${CLICK_CLASS}`).textContent = this.clicks;
  //   }

  //   setTimeValues() {
  //     const msec = Math.floor((this.timer - Math.floor(this.timer)) * 100);
  //     const sec = Math.floor(this.timer) - Math.floor(this.timer / 60) * 60;
  //     const min = Math.floor(this.timer / 60);
  //     document.querySelector(`.${TIMER_MS_CLASS}`).
  // textContent = msec < 10 ? `0${msec.toString()}` : msec;
  //     document.querySelector(`.${TIMER_SEC_CLASS}`).
  // textContent = sec < 10 ? `0${sec.toString()}` : sec;
  //     document.querySelector(`.${TIMER_MIN_CLASS}`).
  // textContent = min < 10 ? `0${min.toString()}` : min;
  //   }

  //   setSounds() {
  //     this.audioBoom = new Audio(boom);
  //     this.audioRemoveFlag = new Audio(deleteSound);
  //     this.audioRightAnsw = new Audio(shortBell);
  //     this.audioFlagged = new Audio(keyboard);
  //     this.audioFirstClick = new Audio(choise);
  //     this.audioWin = new Audio(audioEndLev);
  //   }

  private startListners(): void {
    document.addEventListener('mouseover', this.playgrMousOverHandler);
    document.addEventListener('mouseout', this.playghMousOutHandler);
    this.editorInput.addEventListener('keypress', this.enterPressedHandler);
    this.enterBtn.addEventListener('click', this.inputCheckValue);

    // document.addEventListener('contextmenu', this.cellClickHandler);
    // document.oncontextmenu = () => false;
    // ============== MEDIAQUERY ======== start ====
    // [
    //   window.matchMedia('(max-width: 1250px)'),
    //   window.matchMedia('(max-width: 767px)'),
    //   window.matchMedia('(orientation: portrait)'),
    //   window.matchMedia('(orientation: landscape)'),
    // ].forEach((mq) => mq.addEventListener('change', this.mediaQueryHandler));

    // ______________ MEDIAQUERY ______ end _______
  }

  //   mediaQueryHandler() {
  //     const cellSizeNumb = this.getCellSize().numb;
  //     const cellSizeExt = this.getCellSize().ext;

  //     for (let x = 0; x < this.ROW_NUM; x += 1) {
  //       for (let y = 0; y < this.COL_NUM; y += 1) {
  //         const cell = this.cells[x][y];
  //         cell.style.width = cellSizeNumb + cellSizeExt;
  //         cell.style.height = cellSizeNumb + cellSizeExt;
  //         cell.style.fontSize = cellSizeNumb * Cell.FONT_RATIO + cellSizeExt;
  //       }
  //     }
  //   }

  //   endListners() {
  //     document.removeEventListener('click', this.cellClickHandler);
  //     document.removeEventListener('contextmenu', this.cellClickHandler);
  //   }

  private enterPressedHandler(event: KeyboardEvent): void {
    if (event.code === 'Enter') this.inputCheckValue();
  }

  private inputCheckValue(): void {
    const { value } = this.editorInput;
    if (!value) return;
    const answerElem = this.playgroundElement.querySelector(value);
    if (answerElem === this.rightElement) alert('You Win!!!');
    else alert('Looooose!!!');
  }

  private playgrMousOverHandler(event: Event):void {
    const el = event.target as HTMLElement;
    if (el === this.playgroundElement || (!el.closest(`.${PLAYGROUND_CLASS}`) && !el.closest('.html-viewer'))) return;

    const playgrElmnts = [...this.playgroundElement.querySelectorAll('*')] as HTMLElement[];
    const viewElements = [...this.viewerPre.querySelectorAll('*')] as HTMLElement[];
    let indx: number;
    let playEl: HTMLElement;
    let equalEl: HTMLElement;
    if (el.closest(`.${PLAYGROUND_CLASS}`)) {
      playEl = el;
      indx = playgrElmnts.indexOf(el);
      equalEl = viewElements[indx];
    } else if (el.closest('.html-viewer')) {
      indx = viewElements.indexOf(el);
      equalEl = playgrElmnts[indx];
      playEl = equalEl;
    } else return;
    el.setAttribute('highlight', 'yes');
    if (equalEl) equalEl.setAttribute('highlight', 'yes');
    this.showHint(playEl);
  }

  private playghMousOutHandler(event: Event):void {
    const elem = event.target as HTMLElement;

    if (elem === this.playgroundElement || (!elem.closest(`.${PLAYGROUND_CLASS}`) && !elem.closest('.html-viewer'))) return;
    const highlightes = document.querySelectorAll('[highlight]');
    highlightes.forEach((el) => el.removeAttribute('highlight'));
    this.playgroundHint.classList.remove('show');
  }

  private showHint(playgrElem: HTMLElement): void {
    const elPosition = playgrElem.getBoundingClientRect();
    this.playgroundHint.style.top = `${elPosition.top - 65}px`;
    this.playgroundHint.style.left = `${elPosition.left + (elPosition.width / 2)}px`;

    this.playgroundHint.textContent = this.getTagText(playgrElem.outerHTML);
    this.playgroundHint.classList.add('show');
  }

  private getTagText(outerHTML: string): string {
    const tag = outerHTML.replace(/^(<[^>]*>).*(<\/[^>]*>)$/si, '$1$2');
    const highlight = 'highlight';
    const twist = 'twist';
    const regex = new RegExp(`( ${highlight}| ${twist})=".*"`);
    return tag.replace(regex, '');
  }

  //   async cellClickHandler(event) {
  //     const domCell = event.target.closest(CELL_TAG);

  //     if (this.isGameFinished || !domCell || domCell.isOpened) return;

  //     // if it's RIGHT CLICK:
  //     if (event.type === 'contextmenu') {
  //       event.preventDefault();
  //       this.flagMarkClick(domCell);
  //       this.saveDataToLocalStorage();
  //       return;
  //     }

  //     if (domCell.isFlag) return;

  //     const { x, y } = domCell;

  //     document.querySelector(`.${CLICK_CLASS}`).textContent = ++this.clicks;

  //     // to insert mines after FIRST CLICK
  //     if (this.isFirstClick) {
  //       if (this.isSound) this.audioFirstClick.play();
  //       const isSaved = await this.firstClick(x, y);
  //       this.saveDataToLocalStorage();
  //       if (!isSaved) return;
  //     }

  //     // if it's MINE:
  //     if (domCell.isMine) {
  //       this.mineClick(domCell);
  //       return;
  //     }

  //     const isWin = await this.openCell(x, y);
  //     if (isWin) return;

  //     if (this.isSound) this.audioRightAnsw.play();
  //     this.flagCount();
  //     this.saveDataToLocalStorage();
  //   }

  //   saveDataToLocalStorage() {
  //     const storCells = [];
  //     for (let x = 0; x < this.ROW_NUM; x += 1) {
  //       storCells[x] = [];
  //       for (let y = 0; y < this.COL_NUM; y += 1) {
  //         const oCell = this.cells[x][y];
  //         const strCell = {};
  //         strCell.x = oCell.x;
  //         strCell.y = oCell.y;
  //         strCell.VALUE = oCell.VALUE;
  //         strCell.isOpened = oCell.isOpened;
  //         strCell.isMine = oCell.isMine;
  //         strCell.isFlag = oCell.isFlag;
  //         strCell.textContent = oCell.textContent;

  //         storCells[x].push(strCell);
  //       }
  //     }
  //     const chbTheme = document.getElementById(THEME_SLIDER).checked;
  //     const data = {
  //       isSound: this.isSound,
  //       isDarkTheme: chbTheme,
  //       timer: gameTimer.timer,
  //       ROW_NUM: this.ROW_NUM,
  //       COL_NUM: this.COL_NUM,
  //       MINE_NUM: this.MINE_NUM,
  //       cells: storCells,
  //       mines: this.mines,
  //       flags: this.flags,
  //       clicks: this.clicks,
  //     };
  //     localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(data));
  //   }

  //   async firstClick(x, y) {
  //     this.isFirstClick = false;
  //     if (this.savingData) return true;
  //     do {
  //       this.appendPlayground();
  //     } while (this.calcMinesAround(x, y) !== 0);

  //     document.addEventListener('contextmenu', this.cellClickHandler);

  //     this.flagCount();
  //     await this.openCell(x, y);
  //     gameTimer.startTimer(this.timer);
  //     return false;
  //   }

  //   getLocalSavedWins() {
  //     localStorage.getItem(LAST_WINS_KEY);
  //   }

  //   winClick(winCell) {
  //     winCell.isWin();

  //     const oSavingData = JSON.parse(localStorage.getItem(LAST_WINS_KEY)) || '';
  //     let arrSavingData = Array.from(oSavingData);

  //     const data = {
  //       date: new Date(),
  //       timer: gameTimer.timer.toFixed(1),
  //       ROW_NUM: this.ROW_NUM,
  //       COL_NUM: this.COL_NUM,
  //       MINE_NUM: this.MINE_NUM,
  //       clicks: this.clicks,
  //     };
  //     arrSavingData.push(data);
  //     if (arrSavingData.length > 10) arrSavingData = arrSavingData.slice(-10);
  //     localStorage.setItem(LAST_WINS_KEY, JSON.stringify(arrSavingData));

  //     if (this.isSound) this.audioWin.play();
  //     this.finishGame();
  //     this.showEndText(true);
  //   }

  //   showEndText(isWin) {
  //     const endTextDiv = generateDomElement(
  //       'div',
  //       isWin ? END_GAME_TEXT_WIN : END_GAME_TEXT_LOSE,
  //       END_GAME_TEXT_CLASS,
  //     );
  //     document.body.append(endTextDiv);
  //     document.addEventListener('click', () => endTextDiv.remove(), { once: true });
  //   }

  //   mineClick(cell) {
  //     if (this.isSound) this.audioBoom.play();

  //     cell.isBoom();
  //     this.mines = this.mines.filter((id) => id !== cell.cellID);
  //     this.finishGame();
  //     this.showEndText(false);
  //   }

  //   flagMarkClick(cell) {
  //     cell.changeFlag();
  //     if (cell.isFlag) {
  //       if (this.isSound) this.audioFlagged.play();
  //       this.flags.push(cell.cellID);
  //     } else {
  //       if (this.isSound) this.audioRemoveFlag.play();
  //       this.removeFlag(cell.cellID);
  //     }
  //     this.flagCount();
  //   }

  //   flagCount() {
  //     document.querySelector(`.${COUNTER_CLASS}`)
  // .textContent = this.MINE_NUM - this.flags.length;
  //   }

  //   removeFlag(flagId) {
  //     this.flags = this.flags.filter((el) => el !== flagId);
  //   }

  //   cleanCurrentStatusData() {
  //     localStorage.removeItem(LOCAL_DATA_KEY);
  //   }

  //   finishGame() {
  //     this.cleanCurrentStatusData();
  //     this.endListners();
  //     gameTimer.stopTimer();
  //     this.isGameFinished = true;

  //     // show all mines except boom one
  //     this.mines.forEach((id) => {
  //       const [x, y] = id.split('-');
  //       const domCell = this.cells[x][y];
  //       domCell.showMine();

  //       // if cell marked with correct flag
  //       if (this.flags.indexOf(id) !== -1) {
  //         this.removeFlag(id);
  //         domCell.isCorrectFlag(true);
  //       }
  //     });
  //     // show incorrect flags
  //     this.flags.forEach((id) => {
  //       const [x, y] = id.split('-');
  //       this.cells[x][y].isCorrectFlag(false);
  //     });
  //   }

  //   getCellSize() {
  //     const w = 90 / this.COL_NUM;
  //     const h = 70 / this.ROW_NUM;
  //     const rat = window.innerWidth / window.innerHeight;

  //     return { numb: Math.min(w, h).toFixed(2), ext: rat < 1 ? 'vw' : 'vh' };
  //   }

  private appendH1(): void {
    this.h1 = document.body.querySelector('h1') as HTMLElement;
    this.h1.textContent = this.level.levelH1;
  }

  private appendPlayground(): void {
    const domPlayground = document.querySelector(`.${PLAYGROUND_CLASS}`);
    if (domPlayground) domPlayground.remove();

    const playgrElem = generateDomElement('div', '', null, PLAYGROUND_CLASS);

    this.playgroundElement = this.savingData
      ? this.makePlaygrFromSavingData(playgrElem) : playgrElem;

    const main = document.querySelector(`.${MAIN_CLASS}`);
    if (main) {
      main.append(this.playgroundElement);
      this.playgroundElement.insertAdjacentHTML('afterbegin', this.level.levelTask);
    }
    this.playgroundHint = generateDomElement('div', '', document.body, 'playground-hint');

    this.rightElement = this.playgroundElement
      .querySelector(this.level.levelRightAnswer) as HTMLElement;
  }

  private makePlayground(): void {
    // const playgrElem = generateDomElement('div', '', PLAYGROUND_CLASS);

    // if saving data alredy exists in local storage
    // if (this.savingData) {
    //   this.playgroundElement = this.makePlaygrFromSavingData(playgrElem);
    // }
    // this.playgroundElement = playgrElem;
    // this.playgroundElement.append('beforebegin', this.level.levelTask);
    // return playgrElem;
  }

  private makePlaygrFromSavingData(playgrElem: HTMLElement): HTMLElement {
    // const oCellSize = this.getCellSize();

    // for (let x = 0; x < this.ROW_NUM; x += 1) {
    //   const cellRow = generateDomElement(CELL_ROW_TAG, '', CELL_ROW_CLASS);

    //   for (let y = 0; y < this.COL_NUM; y += 1) {
    //     const cell = this.cells[x][y];
    //     cell.style.width = oCellSize.numb + oCellSize.ext;
    //     cell.style.height = oCellSize.numb + oCellSize.ext;
    //     cell.style.fontSize = oCellSize.numb * FONT_RATIO + oCellSize.ext;

    //     cellRow.append(this.cells[x][y]);
    //   }
    //   playgrElem.append(cellRow);
    // }
    return playgrElem;
  }

  private appendEditor(): void {
    const editors = document.querySelector('.editors');
    if (!editors) return;
    const editorWrap = editors.querySelector(`.${EDITOR_CLASS}`) as HTMLDivElement;
    generateDomElement('div', '', editorWrap, 'editor-header');
    const editorField = generateDomElement('div', '', editorWrap, 'editor-field');
    const lefNumbers = generateDomElement('div', '', editorField, 'editor-numbers');
    for (let i = 1; i < 21; i += 1) {
      generateDomElement('span', `${i}`, lefNumbers);
    }
    const editorInfoField = generateDomElement('div', '', editorField, 'editor-info');
    const inputWrapper = generateDomElement('div', '', editorInfoField, 'input-wrapper');
    this.editorInput = generateDomElement('input', '', inputWrapper, 'editor-input');
    this.editorInput.placeholder = 'Tipe in a CSS selector';
    this.enterBtn = generateDomElement('div', 'Enter', inputWrapper, 'enter-btn');
    generateDomElement('pre', EDITOR_INFO_TEXT, editorInfoField, 'editor-info__pre');

    editors.append(editorWrap);
  }

  private appendRightAside(): void {
    const rightAside = document.querySelector('.learn-side') as HTMLElement;

    const sideHeader = generateDomElement('div', '', rightAside, 'side-header');
    this.sideTitle = generateDomElement('h2', this.level.levelDescr, sideHeader, 'side-title');
    const sideNav = generateDomElement('nav', '', sideHeader, 'side-header__nav');

    this.sideNavPrev = generateDomElement('div', '', sideNav, 'nav-prev');
    this.sideNavNext = generateDomElement('div', '', sideNav, 'nav-next');

    const progressWrapper = generateDomElement('div', '', rightAside, 'side-progress-wrap');
    this.sideProgress = generateDomElement('div', '', progressWrapper, 'side-progress');

    const learnWrapper = generateDomElement('div', '', rightAside, 'side-learn-wrap');
    this.sideLearnSelector = generateDomElement('h3', this.level.learnSelector, learnWrapper, 'side-learn-selector');
    this.sideLearnTitle = generateDomElement('h2', this.level.learnTitle, learnWrapper, 'side-learn-title');
    this.sideLearnSintaxis = generateDomElement('h3', this.level.learnSelector, learnWrapper, 'side-learn-sintaxis');
    this.sideLearnDescription = generateDomElement('div', this.level.promptText, learnWrapper, 'side-learn-descr');

    this.appendExamples();
    if (this.examplesWrapper) {
      generateDomElement('h3', 'Examples', learnWrapper, 'side-examples-title');
      learnWrapper.append(this.examplesWrapper);
    }
  }

  private appendExamples(): void {
    if (!this.level.examples || !this.level.examples.length) return;
    this.examplesWrapper = generateDomElement('div', '', null);
    this.level.examples.forEach((exmpl) => { this.examplesWrapper.innerHTML += exmpl; });
  }

  private appendViewer(): void {
    const viewerWrap = document.querySelector('.html-viewer') as HTMLElement;
    generateDomElement('div', '', viewerWrap, 'viewer-header');
    const viewerField = generateDomElement('div', '', viewerWrap, 'viewer-field');

    const viewerNumbers = generateDomElement('div', '', viewerField, 'viewer-numbers');
    for (let i = 1; i < 21; i += 1) {
      generateDomElement('span', `${i}`, viewerNumbers);
    }

    const viewerInfoField = generateDomElement('div', '', viewerField, 'viewer-info');
    const viewerInfoPre = generateDomElement('pre', '', viewerInfoField);

    const tableElmts = [...this.playgroundElement.children] as HTMLElement[];
    this.viewerPre = generateDomElement('div', '', viewerInfoPre, 'viewer-pre');

    tableElmts.forEach((el) => {
      const divWrapped = this.wrapToDiv(el);
      this.viewerPre.append(divWrapped);
    });
    this.rightElement.setAttribute('twist', 'y');
  }

  private wrapToDiv(elem: HTMLElement): HTMLElement {
    const tagName = elem.localName;
    const wrapDiv = generateDomElement('div', '', null);
    let attrStr = '';
    const attrs = elem.attributes;
    for (let k = 0; k < attrs.length; k += 1) {
      attrStr = `${attrStr} ${attrs[k].name}="${attrs[k].value}"`;
    }

    const separ = attrStr ? '' : '';
    const childLen = elem.children.length;
    const wrapStartDivText = `<${tagName}${separ}${attrStr}>`;

    if (childLen > 0) {
      wrapDiv.textContent = wrapStartDivText;

      const elChildren = [...elem.children] as HTMLElement[];
      elChildren.forEach((el: HTMLElement) => wrapDiv.append(this.wrapToDiv(el)));

      wrapDiv.append(`</${tagName}>`);
    } else {
      wrapDiv.textContent = `${wrapStartDivText}</${tagName}>`;
    }
    return wrapDiv;
  }

  // https://stackoverflow.com/questions/1787322/what-is-the-htmlspecialchars-equivalent-in-javascript
  // private escapeHtml(text:string): string {
  //   const map: { [key: string]: string } = {
  //     '&': '&amp;',
  //     '<': '&lt;',
  //     '>': '&gt;',
  //     '"': '&quot;',
  //     "'": '&#039;',
  //   };
  //   return text.replace(/[&<>"']/g, (m) => map[m]);
  // }

  //   insertMines() {
  //     let counter = 0;
  //     this.mines = [];

  //     while (counter < this.MINE_NUM) {
  //       const randX = Math.floor(Math.random() * this.ROW_NUM);
  //       const randY = Math.floor(Math.random() * this.COL_NUM);

  //       if (!this.cells[randX][randY].isMine) {
  //         this.cells[randX][randY].isMine = 1;
  //         this.mines.push(this.cells[randX][randY].cellID);
  //         counter += 1;
  //       }
  //     }
  //   }

  //   calcMinesAround(x, y) {
  //     if (this.outBounds(x, y)) return 0;

  //     let counter = 0;
  //     for (let aroundX = -1; aroundX <= 1; aroundX += 1) {
  //       for (let aroundY = -1; aroundY <= 1; aroundY += 1) {
  //         const calcX = aroundX + x;
  //         const calcY = aroundY + y;
  //         if (!this.outBounds(calcX, calcY)) {
  //           counter += this.cells[calcX][calcY].isMine;
  //         }
  //       }
  //     }
  //     return counter;
  //   }

  //   async openCell(x, y) {
  //     if (this.outBounds(x, y)) return false;
  //     const oCell = this.cells[x][y];
  //     if (oCell.isOpened) return false;

  //     oCell.openCell();
  //     this.removeFlag(oCell.cellID);
  //     await new Promise((resolve) => {
  //       setTimeout(resolve, 10);
  //     });
  //     this.opened += 1;

  //     if (this.opened === this.ROW_NUM * this.COL_NUM - this.MINE_NUM) {
  //       this.winClick(oCell);
  //       return true;
  //     }

  //     if (oCell.VALUE !== 0) return false;

  //     await this.openCell(x, y - 1);
  //     await this.openCell(x, y + 1);
  //     await this.openCell(x - 1, y);
  //     await this.openCell(x + 1, y);
  //     await this.openCell(x - 1, y - 1);
  //     await this.openCell(x - 1, y + 1);
  //     await this.openCell(x + 1, y - 1);
  //     await this.openCell(x + 1, y + 1);
  //   }

//   outBounds(x, y) {
//     return x < 0 || y < 0 || x >= this.ROW_NUM || y >= this.COL_NUM;
//   }
}
