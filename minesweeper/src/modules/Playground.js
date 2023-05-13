import Cell from './Cell';

// TO_DO: timer
// TO_DO: sound
// TO_DO: start button
// TO_DO: counter design
// TO_DO: UI menu
// TO_DO: try {*} = this

class Playground {
  constructor(rowNumber = 10, colNumber = 10, mineNum = 10) {
    this.ROW_NUM = rowNumber;
    this.COL_NUM = colNumber;
    this.MINE_NUM = mineNum;
    customElements.define(this.CELL_TAG, Cell);
    this.cellClickHandler = this.cellClickHandler.bind(this);
    this.mediaQueryHandler = this.mediaQueryHandler.bind(this);
    // this.rightClickHandler = this.rightClickHandler.bind(this);
    this.makeMainSection();
    this.appendPlayground();
    this.makeCountersSection();
    this.startListners();
  }

  cells = [];

  mines = [];

  flags = [];

  mainSection = '';

  domPlayground = '';

  isFirstClick = true;

  isGameFinished = false;

  timer = 0;

  opened = 0;

  MAIN_TAG = 'main';

  MAIN_CLASS = 'main';

  PLAYGROUND_TAG = 'section';

  PLAYGROUND_STYLE = 'playground';

  CELL_TAG = Cell.CELL_TAG;

  CELL_ROW_TAG = 'div';

  CELL_ROW_STYLE = 'playground__row';

  COUNTER_SECTION_STYLE = 'counter-section';

  COUNTER_STYLE = 'counter-section__counter';

  TIMER_STYLE = 'counter-section__timer';

  startListners() {
    document.addEventListener('click', this.cellClickHandler);
    document.oncontextmenu = () => false;
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
    const domCell = event.target.closest(this.CELL_TAG);

    if (this.isGameFinished || !domCell || domCell.isOpened) return;

    // if it's right click:
    if (event.type === 'contextmenu') {
      this.flagMarkClick(domCell);
      return;
    }

    if (domCell.isFlag) return;

    const { x, y } = domCell;

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

    window.addEventListener('contextmenu', this.cellClickHandler);

    this.startTimer();
    this.flagCount();
    this.openCell(x, y);
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.timer += 1 / 60;
      const msVal = Math.floor((this.timer - Math.floor(this.timer)) * 100);
      const secondVal = Math.floor(this.timer) - Math.floor(this.timer / 60) * 60;
      const minuteVal = Math.floor(this.timer / 60);
      this.ms.innerHTML = msVal < 10 ? `0${msVal.toString()}` : msVal;
      this.second.innerHTML = secondVal < 10 ? `0${secondVal.toString()}` : secondVal;
      this.minute.innerHTML = minuteVal < 10 ? `0${minuteVal.toString()}` : minuteVal;
    }, 1000 / 60);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
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
    this.counterDiv.textContent = this.MINE_NUM - this.flags.length;
  }

  removeFlag(flagId) {
    this.flags = this.flags.filter((el) => el !== flagId);
  }

  finishGame(isWin) {
    this.stopTimer();
    this.isGameFinished = true;

    this.mines.forEach((id) => {
      const [x, y] = id.split('-');
      const domCell = this.cells[x][y];
      domCell.showMine();
      if (this.flags.indexOf(id) !== -1) {
        this.removeFlag(id);
        domCell.isCorrectFlag(true);
      }
    });
    this.flags.forEach((id) => {
      const [x, y] = id.split('-');
      this.cells[x][y].isCorrectFlag(false);
    });
    this.endListners();
  }

  getCellSize() {
    const w = 90 / this.COL_NUM;
    const h = 70 / this.ROW_NUM;

    return (w < h) ? { numb: w.toFixed(2), ext: 'vw' } : { numb: h.toFixed(2), ext: 'vh' };
    // if (w < h) cellSize = `${w.toFixed(2)}vw`;
    // let cellSize = `${h.toFixed(2)}vh`;
    // if (w < h) cellSize = `${w.toFixed(2)}vw`;

    // return cellSize;
  }

  makePlayground() {
    const playgrElem = Playground.generateDomElement(this.PLAYGROUND_TAG, '', this.PLAYGROUND_STYLE);

    this.cells = [];
    const cellSizeNumb = this.getCellSize().numb;
    const cellSizeExt = this.getCellSize().ext;

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      const cellRow = Playground.generateDomElement(this.CELL_ROW_TAG, '', this.CELL_ROW_STYLE);

      this.cells[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const cell = new Cell(x, y);

        cell.style.width = cellSizeNumb + cellSizeExt;
        cell.style.height = cellSizeNumb + cellSizeExt;
        cell.style.fontSize = cellSizeNumb * Cell.FONT_RATIO + cellSizeExt;
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

  makeCountersSection() {
    const counterWrapper = Playground.generateDomElement('section', '', this.COUNTER_SECTION_STYLE);
    this.counterDiv = Playground.generateDomElement('div', '', this.COUNTER_STYLE);
    this.counterDiv.textContent = 0;
    this.timerDiv = Playground.generateDomElement('div', '', this.TIMER_STYLE);

    this.ms = Playground.generateDomElement('div', '00');
    this.second = Playground.generateDomElement('div', '00');
    this.minute = Playground.generateDomElement('div', '00');

    this.timerDiv.append(this.minute);
    this.timerDiv.append(this.second);
    this.timerDiv.append(this.ms);

    counterWrapper.append(this.counterDiv);
    counterWrapper.append(this.timerDiv);

    document.body.append(counterWrapper);
  }

  appendPlayground() {
    if (this.domPlayground) this.domPlayground.remove();

    this.domPlayground = this.makePlayground();

    this.mainSection.append(this.domPlayground);
  }

  makeMainSection() {
    const mainSection = Playground.generateDomElement(
      this.MAIN_TAG,
      '',
      this.MAIN_CLASS,
    );
    document.body.append(mainSection);
    this.mainSection = mainSection;
  }

  appendMonitor() {
    this.mainSection.append(this.oEcran.ecran);
    this.monitor = this.oEcran.monitor;
    this.charReceiver = this.oEcran.charReceiver;
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

  static generateDomElement(tag, text = '', ...classes) {
    const element = document.createElement(tag);
    const arrClasses = [];
    classes.forEach((el) => {
      if (Array.isArray(el)) el.forEach((i) => arrClasses.push(i));
      else el.split(' ').forEach((e) => arrClasses.push(e));
    });
    if (arrClasses.length) element.classList.add(...arrClasses);
    element.textContent = text;
    return element;
  }
}
const playground = new Playground(7, 7, 3);
