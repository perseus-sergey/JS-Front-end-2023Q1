import Cell from './Cell';

// TO_DO: remove listner for flagged (rightClick)
// TO_DO: extend element for Cell
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

    const mediaQueries = [
      window.matchMedia('(max-width: 1250px)'),
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(orientation: portrait)'),
      window.matchMedia('(orientation: landscape)'),
    ];

    mediaQueries.forEach((mq) => mq.addEventListener('change', this.mediaQueryHandler));
    // const medQryIpad = window.matchMedia('(max-width: 1250px)');
    // const medQryIphone = window.matchMedia('(max-width: 767px)');
    // const MQportrait = window.matchMedia('(orientation: portrait)');
    // const MQlandscape = window.matchMedia('(orientation: landscape)');

    // medQryIpad.addEventListener('change', this.mediaQueryHandler);
    // medQryIphone.addEventListener('change', this.mediaQueryHandler);
    // MQportrait.addEventListener('change', this.mediaQueryHandler);
    // MQlandscape.addEventListener('change', this.mediaQueryHandler);

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
    const cellSize = this.getCellSize();
    for (let x = 0; x < this.ROW_NUM; x += 1) {
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const cell = this.cells[x][y];
        cell.style.width = cellSize;
        cell.style.height = cellSize;
        cell.style.fontSyze = cellSize;
      }
    }
  }

  endListners() {
    document.removeEventListener('click', this.cellClickHandler);
    document.removeEventListener('contextmenu', this.cellClickHandler);
  }

  cellClickHandler(event) {
    const domCell = event.target.closest(`.${this.cells[0][0].cellStyle.CELL}`);

    if (this.isGameFinished) return;
    if (domCell) {
      // this.moovingCharColor = window.getComputedStyle(element).color;
      // this.addKeyBtnPressedClass(element);

      if (domCell.isOpened) return;

      // if it's right click:
      if (event.type === 'contextmenu') {
        domCell.changeFlag();
        if (domCell.isFlag) {
          this.flags.push(domCell.cellID);
        } else {
          this.removeFlag(domCell.cellID);
          // this.flags.filter((id) => id !== domCell.cellID);
        }
        this.flagCount();
        return;
      }

      if (domCell.isFlag) return;

      const { x, y } = domCell;

      // to insert mines after first click
      if (this.isFirstClick) {
        this.isFirstClick = false;
        do {
          this.appendPlayground();
        } while (this.calcMinesAround(x, y) !== 0);

        window.addEventListener('contextmenu', this.cellClickHandler);

        this.openCell(x, y);
        return;
      }

      // if it's mine:
      if (domCell.isMine) {
        domCell.textContent = domCell.cellIcon.BOOM;
        this.mines = this.mines.filter((id) => id !== domCell.cellID);
        this.finishGame();
      } else {
        this.openCell(x, y);
        this.flagCount();
      }
      // console.log(this.flags.length);
      // this.removeKeyBtnPressedClass(element);
    }
  }

  flagCount() {
    this.counterDiv.textContent = this.MINE_NUM - this.flags.length;
  }

  removeFlag(flagId) {
    this.flags = this.flags.filter((el) => el !== flagId);
  }

  finishGame() {
    this.isGameFinished = true;

    this.mines.forEach((id) => {
      const [x, y] = id.split('-');
      const domCell = this.cells[x][y];
      domCell.showMine();
      if (this.flags.indexOf(id) !== -1) {
        this.removeFlag(id);
        // this.flags = this.flags.filter((el) => el !== id);
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

    let cellSize = `${h.toFixed(2)}vh`;
    if (w < h) cellSize = `${w.toFixed(2)}vw`;

    return cellSize;
  }

  makePlayground() {
    const playgrElem = Playground.generateDomElement(this.PLAYGROUND_TAG, '', this.PLAYGROUND_STYLE);

    this.cells = [];
    const cellSize = this.getCellSize();

    for (let x = 0; x < this.ROW_NUM; x += 1) {
      const cellRow = Playground.generateDomElement(this.CELL_ROW_TAG, '', this.CELL_ROW_STYLE);

      this.cells[x] = [];
      for (let y = 0; y < this.COL_NUM; y += 1) {
        const cell = new Cell(x, y);

        cell.style.width = cellSize;
        cell.style.height = cellSize;
        cell.style.fontSize = cellSize;
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

    counterWrapper.append(this.counterDiv);
    counterWrapper.append(this.timerDiv);

    // this.cells = [];
    document.body.append(counterWrapper);
    // return counterWrapper;
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

  openCell(x, y) {
    if (this.outBounds(x, y)) return;
    const oCell = this.cells[x][y];
    if (oCell.isOpened) return;

    oCell.openCell();
    this.removeFlag(oCell.cellID);
    if (oCell.VALUE !== 0) return;

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
const playground = new Playground(25, 7, 22);
